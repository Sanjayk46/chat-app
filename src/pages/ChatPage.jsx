import React, { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import {  Stack } from '@mui/material';
import SideDrawer from '../component/Miscellaneous/SideDrawer';
import MyChats from '../component/MyChats';
import ChatBox from '../component/ChatBox';

const ChatPage = () => {
  const { user } = ChatState();
  
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: '100%' }}>
      {user && <SideDrawer />}
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ width: '100%', height: '91.5vh', padding: 1 }}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </Stack>
    </div>
  );
};

export default ChatPage;
