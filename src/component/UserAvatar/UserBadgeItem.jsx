import React from 'react';
import { Box, Chip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Chip
      label={`${user.firstName} ${user.lastName}`}
      onDelete={handleFunction}
      deleteIcon={<CancelIcon />}
      sx={{
        margin: '4px',
        backgroundColor: 'purple',
        color: 'white',
        '& .MuiChip-deleteIcon': {
          color: 'white',
        },
        fontSize: '12px',
        padding: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
      }}
    />
  );
};

export default UserBadgeItem;
