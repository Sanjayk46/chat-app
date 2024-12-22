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
        alignItems: 'center',
        flexDirection: 'column',
        padding: 3,
        backgroundColor: 'white',
        width: {
          xs: '100%',
          md: '68%',
        },
        borderRadius: '8px',
        border: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
