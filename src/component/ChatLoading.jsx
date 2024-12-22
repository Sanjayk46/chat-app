import React from 'react';
import { Skeleton, Stack } from '@mui/material';

const ChatLoading = () => {
  return (
    <Stack spacing={2} alignItems="center">
      <Skeleton
        variant="rectangular"
        height={45}
        width="80%"
        sx={{
          borderRadius: '8px', // Subtle rounded corners for a modern look
          background: 'linear-gradient(135deg, #e0e0e0, #f5f5f5)', // Smooth gradient for the background
        }}
      />
      <Skeleton
        variant="rectangular"
        height={45}
        width="85%"
        sx={{
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #e0e0e0, #f5f5f5)',
        }}
      />
      <Skeleton
        variant="rectangular"
        height={45}
        width="75%"
        sx={{
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #e0e0e0, #f5f5f5)',
        }}
      />
      <Skeleton
        variant="rectangular"
        height={45}
        width="90%"
        sx={{
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #e0e0e0, #f5f5f5)',
        }}
      />
      <Skeleton
        variant="rectangular"
        height={45}
        width="80%"
        sx={{
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #e0e0e0, #f5f5f5)',
        }}
      />
      <Skeleton
        variant="rectangular"
        height={45}
        width="88%"
        sx={{
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #e0e0e0, #f5f5f5)',
        }}
      />
    </Stack>
  );
};

export default ChatLoading;
