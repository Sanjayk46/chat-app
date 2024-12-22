import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      sx={{
        cursor: 'pointer',
        backgroundColor: '#E8E8E8',
        '&:hover': {
          backgroundColor: '#38B2AC',
          color: 'white',
        },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'black',
        px: 2,
        py: 1,
        mb: 1,
        borderRadius: 1,
      }}
    >
      <Avatar
        sx={{ marginRight: 2, cursor: 'pointer' }}
        alt={user.firstName}
        src={user.pic}
      />
      <Box>
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          {user.firstName}
        </Typography>
        <Typography variant="body2">{user.lastName}</Typography>
        <Typography variant="caption">
          <strong>Email:</strong> {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
