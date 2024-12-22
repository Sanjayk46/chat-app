import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import ForgotPassword from '../component/Authentication/ForgotPassword';
import { Link } from 'react-router-dom';

const ForgotPage = () => {
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
            Chat App - Forgot Password
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
        {/* Render only ForgotPassword component */}
        <ForgotPassword />
      </Box>
    </Container>
  );
};

export default ForgotPage;
