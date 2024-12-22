import React from 'react';
import { Skeleton, Stack } from '@mui/material';

const ChatLoading = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height={45} />
      <Skeleton variant="rectangular" height={45} />
      <Skeleton variant="rectangular" height={45} />
      <Skeleton variant="rectangular" height={45} />
      <Skeleton variant="rectangular" height={45} />
      <Skeleton variant="rectangular" height={45} />
      <Skeleton variant="rectangular" height={45} />
      <Skeleton variant="rectangular" height={45} />
      <Skeleton variant="rectangular" height={45} />
      <Skeleton variant="rectangular" height={45} />
      <Skeleton variant="rectangular" height={45} />
      <Skeleton variant="rectangular" height={45} />
    </Stack>
  );
};

export default ChatLoading;