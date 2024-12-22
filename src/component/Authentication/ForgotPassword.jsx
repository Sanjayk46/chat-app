import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AxiosService from '../../axiosConfig';
import { ChatState } from '../../Context/ChatProvider';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email) {
      alert('Please fill in the email');
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await AxiosService.post('/api/user/forgotPassword', { email }, config);

      alert('Password reset email sent successfully');
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/resetPassword');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error occurred');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '3rem', paddingX: { xs: 2, sm: 4 } }}>
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: 'grey.300',
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: 'black' }}>
          Forgot Password
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                },
                '& .MuiInputLabel-root': {
                  color: 'black',
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
                mt: 2,
                padding: '12px',
                borderRadius: '8px',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#3f51b5',
                },
              }}
            >
              {loading ? 'Sending...' : 'Forgot Password'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
