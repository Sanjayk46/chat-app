import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
        <IconButton onClick={handleOpen}>
          <ViewIcon />
        </IconButton>
      )}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle style={{ textAlign: 'center', fontSize: '24px', fontFamily: 'Work sans' }}>
          {user.firstName}
        </DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '300px' }}
          >
            <Avatar
              alt={user.name}
              src={user.pic}
              style={{ width: '150px', height: '150px', marginBottom: '20px' }}
            />
            <Typography variant="h6" style={{ fontFamily: 'Work sans', fontSize: '18px' }}>
              Email: {user.email}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProfileModal;
