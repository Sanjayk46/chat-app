import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      sx={{
        cursor: 'pointer',
        backgroundColor: '#f5f5f5', // Slightly lighter background for a softer look
        '&:hover': {
          backgroundColor: '#38B2AC', // Vibrant color on hover
          color: 'white', // Text color changes to white on hover
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Adding shadow on hover for depth
        },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'black',
        px: 2,
        py: 2, // Slightly more padding for better spacing
        mb: 2, // Increased margin at the bottom for separation between items
        borderRadius: '12px', // Slightly more rounded corners for a modern look
        transition: 'all 0.3s ease', // Smooth transition for hover effect
      }}
    >
      <Avatar
        sx={{
          marginRight: 2,
          cursor: 'pointer',
          width: 40, // Fixed width for avatar for consistent size
          height: 40, // Fixed height for avatar for consistent size
          borderRadius: '50%', // Ensuring the avatar is round
        }}
        alt={user.firstName}
        src={user.pic}
      />
      <Box>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 'bold',
            fontSize: '16px', // Increased font size for better readability
            color: 'inherit', // Inherit the text color for non-hovered state
          }}
        >
          {user.firstName}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: '14px', // Smaller font size for last name
            color: 'inherit',
          }}
        >
          {user.lastName}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'inherit',
            fontSize: '12px', // Smaller font size for email
          }}
        >
          <strong>Email:</strong> {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
