import React, { useState } from 'react';
import { 
  Button, 
  FormControl, 
  InputLabel, 
  OutlinedInput, 
  InputAdornment, 
  IconButton, 
  Typography, 
  Box 
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate, Link } from 'react-router-dom';
import AxiosService from '../../axiosConfig';
import { ChatState } from '../../Context/ChatProvider';
import { toast } from 'react-toastify'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = ChatState();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast.warning('Please fill all the fields', {
        position: 'bottom-right',
        autoClose: 5000,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { 'Content-type': 'application/json' },
      };

      const { data } = await AxiosService.post('/api/user/login', { email, password }, config);
      toast.success('Login successful', {
        position: 'bottom-right',
        autoClose: 5000,
      });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      console.error('Login error:', error); // Log the error for debugging
      toast.error(error.response?.data?.message || 'Error occurred!', {
        position: 'bottom-right',
        autoClose: 5000,
      });
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 3, 
        width: '100%', 
        padding: '2rem', 
        boxShadow: 3, 
        borderRadius: '8px', 
        backgroundColor: '#fff',
        maxWidth: '400px',
        margin: 'auto'
      }}
    >
      <Typography variant="h5" component="h1" sx={{ color: 'black', fontWeight: 'bold' }}>
        Login
      </Typography>

      <FormControl variant="outlined" fullWidth required sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="email-login">Email</InputLabel>
        <OutlinedInput
          id="email-login"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          label="Email"
          sx={{
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              borderColor: '#ddd',
            },
            '& .MuiInputLabel-root': {
              color: '#555',
            },
            '&:hover .MuiOutlinedInput-root': {
              borderColor: '#3f51b5',
            },
          }}
        />
      </FormControl>

      <FormControl variant="outlined" fullWidth required sx={{ marginBottom: 2 }}>
        <InputLabel htmlFor="password-login">Password</InputLabel>
        <OutlinedInput
          id="password-login"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
          sx={{
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
              borderColor: '#ddd',
            },
            '& .MuiInputLabel-root': {
              color: '#555',
            },
            '&:hover .MuiOutlinedInput-root': {
              borderColor: '#3f51b5',
            },
          }}
        />
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
        onClick={submitHandler}
        sx={{
          padding: '10px',
          borderRadius: '8px',
          fontWeight: 'bold',
        }}
      >
        {loading ? 'Loading...' : 'Login'}
      </Button>

      <Link 
        to="/forgotPassword" 
        style={{ textDecoration: 'none', color: 'black', marginTop: '10px' }}
      >
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          If you don't know your password, click here
        </Typography>
      </Link>
    </Box>
  );
};

export default Login;
