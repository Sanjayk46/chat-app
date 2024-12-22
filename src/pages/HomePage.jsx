import React from 'react';
import { Box, Container, Typography, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import Login from '../component/Authentication/Login';
import Signup from '../component/Authentication/Signup';

const HomePage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '40px' }}>
      {/* App Logo */}
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
          backgroundColor: 'primary.main',
          borderRadius: '8px',
          boxShadow: 3,
          marginBottom: 3,
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h4" component="h1" fontFamily="Work Sans" color="white">
            Chat App
          </Typography>
        </Link>
      </Box>

      {/* Tabs and Forms */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: 3,
          padding: 3,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {/* Login and SignUp Forms */}
        {value === 0 && (
          <Box mt={3}>
            <Login />
          </Box>
        )}
        {value === 1 && (
          <Box mt={3}>
            <Signup />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
