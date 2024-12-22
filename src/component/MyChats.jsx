import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import {
  Box,
  Button,
  Typography,
  Stack,
  useTheme,
} from '@mui/material';
import AxiosService from '../axiosConfig';
import AddIcon from '@mui/icons-material/Add';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogics';
import GroupChatModal from './Miscellaneous/GroupChatModal';

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const theme = useTheme();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await AxiosService.get('/api/chat', config);
      console.log(data);
      setChats(data);
    } catch (error) {
      console.error('Failed to load chats', error);
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ xs: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDirection="column"
      alignItems="center"
      padding={2}
      backgroundColor="white"
      width={{ xs: '100%', md: '31%' }}
      borderRadius={2}
      border={1}
      borderColor="grey.300"
    >
      <Box
        paddingBottom={2}
        paddingX={2}
        fontSize={{ xs: 24, md: 28 }}
        fontFamily="'Work Sans', sans-serif"
        display="flex"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6">My Chats</Typography>
        <GroupChatModal>
          <Button
            variant="contained"
            size="small"
            endIcon={<AddIcon />}
            style={{ textTransform: 'none' }}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        padding={2}
        backgroundColor={theme.palette.grey[200]}
        width="100%"
        height="100%"
        borderRadius={2}
        overflow="auto"
      >
        {chats ? (
          <Stack spacing={1}>
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                backgroundColor={
                  selectedChat === chat ? theme.palette.primary.main : theme.palette.grey[300]
                }
                color={selectedChat === chat ? 'white' : 'black'}
                paddingX={2}
                paddingY={1}
                borderRadius={2}
                key={chat._id}
                style={{ cursor: 'pointer' }}
              >
                <Typography>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
