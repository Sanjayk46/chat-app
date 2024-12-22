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
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 2,
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: 1,
          marginBottom: 3,
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Typography variant="h4" component="h1" fontFamily="Work Sans" color="black">
            Chat App
          </Typography>
        </Link>
      </Box>
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: 1,
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
