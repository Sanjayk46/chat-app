import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { Visibility as ViewIcon } from '@mui/icons-material';
import { ChatState } from '../../Context/ChatProvider';

const ProfileModal = ({ children }) => {
  const { user } = ChatState();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {children ? (
        <span onClick={handleOpen}>{children}</span>
      ) : (
        <IconButton onClick={handleOpen} sx={{ color: 'primary.main' }}>
          <ViewIcon />
        </IconButton>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" sx={{ borderRadius: '12px' }}>
        <DialogTitle sx={{ textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>
          {user.firstName} {user.lastName}
        </DialogTitle>
        <DialogContent sx={{ padding: 2 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              minHeight: '300px',
              textAlign: 'center',
              gap: 2,
              padding: 2,
            }}
          >
            <Avatar
              alt={user.firstName}
              src={user.pic}
              sx={{
                width: 150,
                height: 150,
                marginBottom: 2,
                border: '4px solid #38B2AC', // Border around avatar
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', // Light shadow for elevation
              }}
            />
            <Typography variant="h6" sx={{ fontFamily: 'Work Sans, sans-serif', fontSize: '18px' }}>
              Email: {user.email}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '16px' }}>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            sx={{
              backgroundColor: '#38B2AC',
              '&:hover': { backgroundColor: '#319e94' },
              borderRadius: '8px',
              padding: '8px 16px',
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileModal;
