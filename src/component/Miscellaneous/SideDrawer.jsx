import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Drawer,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import SearchIcon  from '@mui/icons-material/Search';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../../axiosConfig';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/ChatLogics';
import { ChatState } from './../../Context/ChatProvider';

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
  const navigate = useNavigate();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const handleSearch = async () => {
    if (!search) {
      alert('Please enter something in search');
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await AxiosService.get(`/api/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      alert('Error occurred while fetching search results');
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await AxiosService.post('/api/chat', { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setDrawerOpen(false);
    } catch (error) {
      alert('Error fetching the chat');
      setLoadingChat(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate('/');
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <Tooltip title="Search users to chat">
            <IconButton onClick={() => setDrawerOpen(true)}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Chat App
          </Typography>
          <IconButton
            onClick={(event) => setNotificationAnchorEl(event.currentTarget)}
          >
            <Badge badgeContent={notification.length} color="error">
              <NotificationsActiveIcon />
            </Badge>
          </IconButton>
          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={() => setNotificationAnchorEl(null)}
          >
            {!notification.length && <MenuItem>No new messages</MenuItem>}
            {notification.map((notif) => (
              <MenuItem
                key={notif._id}
                onClick={() => {
                  setSelectedChat(notif.chat);
                  setNotification(notification.filter((n) => n !== notif));
                  setNotificationAnchorEl(null);
                }}
              >
                {notif.chat.isGroupChat
                  ? `New Message in ${notif.chat.chatName}`
                  : `New Message from ${getSender(user, notif.chat.users)}`}
              </MenuItem>
            ))}
          </Menu>
          <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
            <Avatar alt={user.name} src={user.pic} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem onClick={() => navigate(user.isAdmin ? '/admin/profile' : '/profile')}>My Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box p={2} width="300px" role="presentation">
          <Typography variant="h6" gutterBottom>
            Search Users
          </Typography>
          <Box display="flex" mb={2}>
            <Input
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              style={{ marginRight: '8px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Go
            </Button>
          </Box>
          {loading ? (
            <CircularProgress />
          ) : (
            <List>
              {searchResult.map((user) => (
                <ListItem
                  button
                  key={user._id}
                  onClick={() => accessChat(user._id)}
                >
                  <UserListItem user={user} />
                </ListItem>
              ))}
            </List>
          )}
          {loadingChat && <CircularProgress />}
        </Box>
      </Drawer>
    </>
  );
};

export default SideDrawer;
