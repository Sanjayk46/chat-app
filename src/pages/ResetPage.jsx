import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import ResetPassword from '../component/Authentication/ResetPassword';
import { Link } from 'react-router-dom';

const ResetPage = () => {
  return (
    <Container maxWidth='lg' sx={{ mb: 10 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 3,
          backgroundColor: 'white',
          width: '100%',
          margin: { xs: '20px 0 10px 0', md: '40px 0 15px 0' }, // Adjusting for responsive margins
          borderRadius: 2,
          borderWidth: 1,
          borderColor: 'grey.300',
        }}
      >
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Typography variant="h4" sx={{ fontFamily: 'Work Sans', color: 'black' }}>
            Chat App - Reset Password
          </Typography>
        </Link>
      </Box>

      <Box
        sx={{
          backgroundColor: 'white',
          width: '100%',
          padding: 4,
          color: 'black',
          borderRadius: 2,
          borderWidth: 1,
          borderColor: 'grey.300',
        }}
      >
        {/* Render only ResetPassword component */}
        <ResetPassword />
      </Box>
    </Container>
  );
};

export default ResetPage;
