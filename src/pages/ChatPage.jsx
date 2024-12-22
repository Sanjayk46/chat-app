import React, { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Stack, Box } from '@mui/material';
import SideDrawer from '../component/Miscellaneous/SideDrawer';
import MyChats from '../component/MyChats';
import ChatBox from '../component/ChatBox';

const ChatPage = () => {
  const { user } = ChatState();
  
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <Box sx={{ width: '100%', height: '100vh', backgroundColor: 'background.default' }}>
      {user && <SideDrawer />}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        spacing={2}
        sx={{
          width: '100%',
          height: 'calc(100vh - 64px)', // Adjusting for header height if any
          padding: 1,
          marginTop: 2,
        }}
      >
        {/* Left Section (MyChats) */}
        {user && (
          <Box
            sx={{
              width: { xs: '100%', md: '30%' },
              height: '100%',
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 3,
              padding: 2,
              overflowY: 'auto',
            }}
          >
            <MyChats fetchAgain={fetchAgain} />
          </Box>
        )}

        {/* Right Section (ChatBox) */}
        {user && (
          <Box
            sx={{
              width: { xs: '100%', md: '65%' },
              height: '100%',
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: 3,
              padding: 2,
              overflowY: 'auto',
            }}
          >
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default ChatPage;
