import React from 'react';
import { Chip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Chip
      label={`${user.firstName} ${user.lastName}`}
      onDelete={handleFunction}
      deleteIcon={<CancelIcon />}
      sx={{
        margin: '6px', // Increased margin for more spacing
        backgroundColor: '#6a1b9a', // Using a purple shade for background
        color: 'white',
        '& .MuiChip-deleteIcon': {
          color: 'white', // White color for delete icon
        },
        fontSize: '14px', // Slightly increased font size for better readability
        padding: '6px 12px', // Adjusted padding for better visual appeal
        borderRadius: '16px', // Slightly larger border radius for a more rounded look
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#9c4dcc', // Lighter shade of purple on hover
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)', // Stronger shadow on hover
        },
      }}
    />
  );
};

export default UserBadgeItem;
