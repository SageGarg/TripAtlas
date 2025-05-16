import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Switch,
  FormControlLabel,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    bio: '',
    preferences: {
      notifications: true,
      newsletter: false,
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8080/api/profile', {
        headers: { 
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      setProfile(response.data);
    } catch (err) {
      setError('Failed to fetch profile');
      if (err.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('preferences.')) {
      const prefName = name.split('.')[1];
      setProfile(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          [prefName]: value
        }
      }));
    } else {
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePreferenceChange = (name) => (event) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: event.target.checked
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:8080/api/profile', {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phoneNumber: profile.phoneNumber,
        bio: profile.bio,
        preferences: profile.preferences
      }, {
        headers: { 
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });

      setProfile(response.data);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Update error:', err);
      setError(err.response?.data?.msg || 'Failed to update profile');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:8080/api/profile', {
        headers: { 
          'x-auth-token': token,
          'Content-Type': 'application/json'
        }
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to delete profile');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            value={profile.email}
            disabled
            fullWidth
          />
          
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={profile.firstName || ''}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={profile.lastName || ''}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  value={profile.phoneNumber || ''}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Bio"
                  name="bio"
                  value={profile.bio || ''}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  fullWidth
                />

                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Preferences
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={profile.preferences?.notifications || false}
                        onChange={handlePreferenceChange('notifications')}
                      />
                    }
                    label="Receive Notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={profile.preferences?.newsletter || false}
                        onChange={handlePreferenceChange('newsletter')}
                      />
                    }
                    label="Subscribe to Newsletter"
                  />
                </Box>

                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setIsEditing(false);
                      fetchProfile();
                    }}
                    type="button"
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </form>
          ) : (
            <>
              <TextField
                label="First Name"
                value={profile.firstName || ''}
                disabled
                fullWidth
              />
              <TextField
                label="Last Name"
                value={profile.lastName || ''}
                disabled
                fullWidth
              />
              <TextField
                label="Phone Number"
                value={profile.phoneNumber || ''}
                disabled
                fullWidth
              />
              <TextField
                label="Bio"
                value={profile.bio || ''}
                disabled
                multiline
                rows={4}
                fullWidth
              />

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Preferences
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={profile.preferences?.notifications || false}
                      disabled
                    />
                  }
                  label="Receive Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={profile.preferences?.newsletter || false}
                      disabled
                    />
                  }
                  label="Subscribe to Newsletter"
                />
              </Box>

              <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditing(true)}
                  type="button"
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setShowDeleteDialog(true)}
                  type="button"
                >
                  Delete Account
                </Button>
              </Box>
            </>
          )}
        </Box>

        <Dialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
        >
          <DialogTitle>Delete Account</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete your account? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default Profile; 