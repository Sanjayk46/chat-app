import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import ForgotPassword from '../component/Authentication/ForgotPassword';
import { Link } from 'react-router-dom';

const ForgotPage = () => {
  return (
    <Container maxWidth='lg' sx={{ mb: 10, paddingX: { xs: 2, sm: 4 } }}>
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
          boxShadow: 2, // Adds subtle shadow to the top box
        }}
      >
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Work Sans, sans-serif',
              color: 'black',
              fontWeight: 'bold',
              textAlign: 'center',
              '&:hover': {
                color: '#3f51b5', // Hover effect for color change
              },
            }}
          >
            Chat App - Forgot Password
          </Typography>
        </Link>
      </Box>

        {/* Render only ForgotPassword component */}
        <ForgotPassword />
    </Container>
  );
};

export default ForgotPage;
