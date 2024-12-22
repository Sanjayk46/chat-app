import React from 'react';
import { Box } from '@mui/material';
import { ChatState } from './../Context/ChatProvider';
import SingleChat from './SingleChat';

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      sx={{
        display: {
          xs: selectedChat ? 'flex' : 'none',
          md: 'flex',
        },
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 3,
        backgroundColor: '#fff', // Light background for the chat box
        width: {
          xs: '100%',
          md: '68%',
        },
        borderRadius: '12px',
        border: '1px solid rgba(0, 0, 0, 0.12)', // Subtle border
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        overflow: 'hidden',
        maxHeight: '100vh', // To ensure chat box is scrollable on larger screens
        background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)', // Subtle gradient background
        margin: '0 auto',
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
