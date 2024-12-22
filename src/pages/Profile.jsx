import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, Input, CircularProgress, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import AxiosService from '../axiosConfig'; // Assuming you're using axios for API requests
import { ChatState } from '../Context/ChatProvider';

const ProfilePage = () => {
  const { user, setUser } = ChatState();
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePic, setProfilePic] = useState(null); // Stores the actual Cloudinary URL
  const [picPreview, setPicPreview] = useState(''); // Stores the image preview URL
  const [toast, setToast] = useState(null); // Manage toasts for notifications

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user || !user.token) return;

      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        const { data } = await AxiosService.get('/api/user/profile', config);
        setUser(data.user);
        setFirstName(data.user.firstName);
        setLastName(data.user.lastName);
        setPicPreview(data.user.profilePic);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user, setUser]);

  const postDetails = (pics) => {
    setLoading(true);

    if (pics === undefined) {
      setToast({ message: 'Please select an Image', type: 'warning' });
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
          setProfilePic(data.url.toString()); // Set the actual Cloudinary image URL
          setPicPreview(URL.createObjectURL(pics)); // Preview uploaded image
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setToast({ message: 'Please select a valid image file (JPEG/PNG)', type: 'warning' });
      setLoading(false);
      return;
    }
  };

  const handleProfileUpdate = async () => {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    };
    const updatedUser = { firstName, lastName, profilePic };

    try {
      const { data } = await AxiosService.put('/api/user/updateUserProfile', updatedUser, config);
      setUser(data.user); // Update the user state after the profile is updated
      setToast({ message: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setToast({ message: 'Error updating profile', type: 'error' });
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mb: 10 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: 3,
          backgroundColor: 'white',
          width: '100%',
          margin: '40px 0 15px 0',
          borderRadius: 2,
          borderWidth: 1,
          borderColor: 'grey.300',
        }}
      >
        <Link to="/chats" style={{ textDecoration: 'none' }}>
          <Typography variant="h4" sx={{ fontFamily: 'Work Sans', color: 'black' }}>
            Chat App - Profile
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 150,
                height: 150,
                marginBottom: 5,
                objectFit: 'cover',
                borderRadius: '50%',
                boxShadow: 3,
              }}
              src={picPreview || user?.profilePic || './images/default_avatar.png'}
              alt={user?.name}
            />
            <Input
              type="file"
              accept="image/*"
              onChange={(event) => postDetails(event.target.files[0])} // Pass the file for Cloudinary upload
              sx={{
                mb: 4,
                border: '1px solid #ddd',
                padding: 1,
                borderRadius: 1,
                '&:hover': { borderColor: 'primary.main' },
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              First Name
            </Typography>
            <Input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              sx={{
                mb: 4,
                padding: 1,
                borderRadius: 1,
                borderColor: 'grey.400',
                '&:hover': { borderColor: 'primary.main' },
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Last Name
            </Typography>
            <Input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              sx={{
                mb: 4,
                padding: 1,
                borderRadius: 1,
                borderColor: 'grey.400',
                '&:hover': { borderColor: 'primary.main' },
              }}
            />

            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4 }}>
              Email Address
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {user.email}
            </Typography>

            <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 4 }}>
              Joined
            </Typography>
            <Typography variant="body1">{String(user?.createdAt).substring(0, 10)}</Typography>

            <Button
              sx={{
                width: '100%',
                mt: 4,
                padding: 1.5,
                borderRadius: 1,
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
              color="primary"
              onClick={handleProfileUpdate}
            >
              Update Profile
            </Button>

            <Link to="/chats">
              <Button
                sx={{
                  width: '100%',
                  mt: 5,
                  padding: 1.5,
                  borderRadius: 1,
                  backgroundColor: 'secondary.main',
                  color: 'white',
                  '&:hover': { backgroundColor: 'secondary.dark' },
                }}
                color="secondary"
              >
                My Chats
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfilePage;
