import React, { useState } from 'react';
import {
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, 
  IconButton, CircularProgress, Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import AxiosService from '../../axiosConfig';
import UserListItem from './../UserAvatar/UserListItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const [open, setOpen] = useState(false);
  const [groupChatName, setGroupChatName] = useState('');
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      alert('Only admins can remove someone!');
      return;
    }

    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await AxiosService.put('/api/chat/groupremove', {
        chatId: selectedChat._id,
        userId: user1._id,
      }, config);

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      alert('Error occurred: ' + error.response.data.message);
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await AxiosService.put('/api/chat/rename', {
        chatId: selectedChat._id,
        chatName: groupChatName,
      }, config);

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      alert('Error occurred: ' + error.response.data.message);
      setRenameLoading(false);
    }
    setGroupChatName('');
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await AxiosService.get(`/api/user?search=${query}`, config);
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      alert('Failed to load search results');
      setLoading(false);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      alert('User is already in the group!');
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      alert('Only admins can add someone!');
      return;
    }

    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await AxiosService.put('/api/chat/groupadd', {
        chatId: selectedChat._id,
        userId: user1._id,
      }, config);

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      alert('Error occurred: ' + error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton onClick={handleOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
        <CloseIcon sx={{ color: '#000' }} />
      </IconButton>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }}>
          {selectedChat.chatName}
        </DialogTitle>
        <DialogContent sx={{ padding: '16px' }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {selectedChat.users.map((u) => (
              <UserBadgeItem key={u._id} user={u} handleFunction={() => handleRemove(u)} />
            ))}
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            label="Chat Name"
            value={groupChatName}
            onChange={(e) => setGroupChatName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRename}
            disabled={renameLoading}
            sx={{ width: '100%', mb: 2 }}
          >
            {renameLoading ? <CircularProgress size={20} /> : 'Update Chat Name'}
          </Button>
          <TextField
            fullWidth
            variant="outlined"
            label="Add User to Group"
            onChange={(e) => handleSearch(e.target.value)}
            sx={{ my: 2 }}
          />
          {loading ? (
            <CircularProgress />
          ) : (
            searchResult.map((user) => (
              <UserListItem key={user._id} user={user} handleFunction={() => handleAddUser(user)} />
            ))
          )}
        </DialogContent>
        <DialogActions sx={{ padding: '16px' }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemove(user)}
            sx={{ width: '100%' }}
          >
            Leave Group
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateGroupChatModal;
