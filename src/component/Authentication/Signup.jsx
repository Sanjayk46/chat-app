import React, { useState } from 'react';
import {
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../../axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pic, setPic] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const postDetails = (pics) => {
    setLoading(true);

    if (!pics) {
      toast.error('Please select an image');
      setLoading(false);
      return;
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'chat-app');
      data.append('cloud_name', 'diwunv4ge');
      fetch('https://api.cloudinary.com/v1_1/diwunv4ge/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error('Error uploading image');
          setLoading(false);
        });
    } else {
      toast.error('Please select a valid image');
      setLoading(false);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error('Please fill all the fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const { data } = await AxiosService.post(
        '/api/user',
        { firstName, lastName, email, password, pic },
        config
      );
      toast.success('Registration successful');
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error occurred');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem', padding: '2rem', boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        Sign Up
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            sx={{ '& .MuiInputBase-root': { borderRadius: '10px' } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            sx={{ '& .MuiInputBase-root': { borderRadius: '10px' } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ '& .MuiInputBase-root': { borderRadius: '10px' } }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{ '& .MuiInputBase-root': { borderRadius: '10px' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            sx={{ '& .MuiInputBase-root': { borderRadius: '10px' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" component="label" fullWidth sx={{ marginBottom: '1rem' }}>
            Upload Picture
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={submitHandler}
            disabled={loading}
            sx={{
              padding: '0.75rem',
              borderRadius: '10px',
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: '#fff' }} />
            ) : (
              'Sign Up'
            )}
          </Button>
        </Grid>
      </Grid>

      <ToastContainer position="top-center" autoClose={5000} hideProgressBar />
    </Container>
  );
};

export default Signup;