import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  CircularProgress,
  Chip,
  Box,
  IconButton
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { ChatState } from '../../Context/ChatProvider';
import AxiosService from '../../axiosConfig';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        handleSearch(search);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResult([]);
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await AxiosService.get(`/api/user?search=${query}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Failed to load search results");
    }
  };

  const handleSubmit = async () => {
    if (!groupChatName || selectedUsers.length === 0) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await AxiosService.post(
        '/api/chat/group',
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      handleClose();
      alert("New group chat created!");
    } catch (error) {
      alert("Failed to create the chat");
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      alert("User already added!");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  return (
    <>
      <span onClick={handleOpen}>{children}</span>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{ borderRadius: '8px' }}>
        <DialogTitle sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
          Manage Group Chat
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ paddingTop: 2 }}>
          <TextField
            fullWidth
            label="Chat Name"
            margin="dense"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiInputBase-root': {
                borderRadius: '8px',
              },
            }}
          />
          <TextField
            fullWidth
            label="Add Users"
            margin="dense"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              mb: 2,
              '& .MuiInputBase-root': {
                borderRadius: '8px',
              },
            }}
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
            {selectedUsers.map((u) => (
              <UserBadgeItem key={u._id} user={u} handleFunction={() => handleDelete(u)} />
            ))}
          </Box>
          {loading ? (
            <CircularProgress sx={{ display: 'block', margin: '10px auto' }} />
          ) : (
            searchResult?.slice(0, 4).map((user) => (
              <UserListItem key={user._id} user={user} handleFunction={() => handleGroup(user)} />
            ))
          )}
        </DialogContent>
        <DialogActions sx={{ padding: '16px 24px' }}>
          <Button
            color="primary"
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#38B2AC',
              color: 'white',
              '&:hover': { backgroundColor: '#319e94' },
              padding: '8px 16px',
              borderRadius: '8px',
            }}
          >
            Create Group
          </Button>
          <Button
            onClick={handleClose}
            color="secondary"
            sx={{
              padding: '8px 16px',
              borderRadius: '8px',
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GroupChatModal;
