import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, FormControl, IconButton, TextField, CircularProgress, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getSender, getSenderFull } from './../config/ChatLogics';
import ProfileModal from './Miscellaneous/ProfileModal';
import UpdateGroupChatModal from './Miscellaneous/UpdateGroupChatModal';
import AxiosService from '../axiosConfig';
import './styles.css';
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client';
import Lottie from 'react-lottie';
import animationData from '../animations/typing.json';
import { toast } from 'react-toastify';

const ENDPOINT = 'https://chat-app-backend-qxkv.onrender.com';
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { user, selectedChat, setSelectedChat, notification, setNotification } = ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await AxiosService.get(`/api/message/${selectedChat._id}`, config);

      setMessages(data);
      setLoading(false);

      socket.emit('join chat', selectedChat._id);
    } catch (error) {
      toast.error('Failed to fetch messages. Please try again.', { position: 'top-right' });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
  }, []);

  const sendMessage = async (event) => {
    if (event.key === 'Enter' && newMessage) {
      socket.emit('stop typing', selectedChat._id);
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        };

        setNewMessage('');

        const { data } = await AxiosService.post(
          '/api/message',
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );

        socket.emit('new message', data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error('Failed to send the message. Please try again.', { position: 'top-right' });
      }
    }
  };

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Typography
            variant="h5"
            pb={3}
            px={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{ color: '#4a90e2' }}
          >
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              onClick={() => setSelectedChat('')}
            >
              <ArrowBackIcon />
            </IconButton>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            width="100%"
            height="100%"
            borderRadius="lg"
            overflow="hidden"
            sx={{
              backgroundImage: `url(/assets/chat.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {loading ? (
              <CircularProgress size={50} sx={{ margin: 'auto' }} />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={sendMessage} required mt={3}>
              {isTyping && (
                <Lottie
                  options={defaultOptions}
                  width={70}
                  style={{ marginBottom: 15 }}
                />
              )}
              <TextField
                variant="filled"
                placeholder="Enter a message..."
                onChange={typingHandler}
                value={newMessage}
                fullWidth
                sx={{
                  backgroundColor: '#E0E0E0',
                  borderRadius: '20px',
                  '& .MuiInputBase-root': {
                    paddingLeft: '15px',
                  },
                  '& .MuiFilledInput-root': {
                    borderRadius: '25px',
                    padding: '5px',
                  },
                }}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%">
          <Typography variant="h4" pb={3}>
            Click on a user to start chatting
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
