import React, { useState } from 'react';
import { Button, TextField, Grid, IconButton, InputAdornment, Container, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../../axiosConfig';
import { ChatState } from '../../Context/ChatProvider';
import { toast } from 'react-toastify';  // Importing Toastify

const ResetPassword = () => {
  const [show, setShow] = useState(false);
  const [OTP, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = ChatState();
  const navigate = useNavigate();

  const handleClick = () => {
    setShow(!show);
  };

  const submitHandler = async () => {
    setLoading(true);

    if (!OTP) {
      toast.warning('Please fill all the fields', {
        position: 'bottom-right',
        autoClose: 5000,
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.warning('Passwords do not match', {
        position: 'bottom-right',
        autoClose: 5000,
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await AxiosService.post('/api/user/resetPassword', { OTP, password }, config);

      toast.success('Password changed successfully', {
        position: 'bottom-right',
        autoClose: 5000,
      });
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error occurred', {
        position: 'bottom-right',
        autoClose: 5000,
      });
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem', padding: '2rem', boxShadow: 3, borderRadius: '8px', backgroundColor: '#fff' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
        Reset Password
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="OTP"
            variant="outlined"
            fullWidth
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                borderColor: '#ddd',
              },
              '&:hover .MuiOutlinedInput-root': {
                borderColor: '#3f51b5',
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            variant="outlined"
            type={show ? 'text' : 'password'}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClick}>
                    {show ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderColor: '#ddd',
              },
              '&:hover .MuiOutlinedInput-root': {
                borderColor: '#3f51b5',
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Confirm Password"
            variant="outlined"
            type={show ? 'text' : 'password'}
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClick}>
                    {show ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderColor: '#ddd',
              },
              '&:hover .MuiOutlinedInput-root': {
                borderColor: '#3f51b5',
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={submitHandler}
            disabled={loading}
            sx={{
              padding: '10px',
              borderRadius: '8px',
              fontWeight: 'bold',
              backgroundColor: '#3f51b5',
              '&:hover': {
                backgroundColor: '#303f9f',
              },
            }}
          >
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ResetPassword;
