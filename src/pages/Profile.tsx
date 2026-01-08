import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Avatar,
  Grid,
  TextField,
  Button,
  Divider,
  Stack,
  Chip,
  Alert,
  Snackbar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import { useAuth } from '../app/providers/AuthProvider';
import { ROLE_COLORS } from '../utils/constants';

export const Profile: React.FC = () => {
  const { authState } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Mock user data - in a real app, this would come from a user context or API
  const [profileData, setProfileData] = useState({
    name: authState.username || 'User',
    email: `${authState.role?.toLowerCase()}@example.com`,
    phone: '+1 (555) 123-4567',
    company: 'Acme Corporation',
    website: 'https://example.com',
    bio: 'Passionate about building great applications and managing teams effectively.',
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    setShowSuccess(true);
    setIsEditing(false);
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [field]: e.target.value });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          My Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account information and preferences
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 16px',
                fontSize: '3rem',
                bgcolor: 'primary.main',
              }}
            >
              {getInitials(profileData.name)}
            </Avatar>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {profileData.name}
            </Typography>
            <Chip
              label={authState.role}
              color={authState.role ? ROLE_COLORS[authState.role] : 'default'}
              sx={{ mb: 2, fontWeight: 600 }}
            />
            <Typography variant="body2" color="text.secondary" paragraph>
              {profileData.bio}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={1.5} alignItems="flex-start">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                <EmailIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
                  {profileData.email}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BadgeIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {authState.role} Access
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>
                Account Information
              </Typography>
              {!isEditing ? (
                <Button variant="contained" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              ) : (
                <Stack direction="row" spacing={1}>
                  <Button variant="outlined" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={handleSave}>
                    Save Changes
                  </Button>
                </Stack>
              )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={profileData.name}
                  onChange={handleChange('name')}
                  disabled={!isEditing}
                  InputProps={{
                    startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  value={profileData.email}
                  onChange={handleChange('email')}
                  disabled={!isEditing}
                  type="email"
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={profileData.phone}
                  onChange={handleChange('phone')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Company"
                  value={profileData.company}
                  onChange={handleChange('company')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Website"
                  value={profileData.website}
                  onChange={handleChange('website')}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  value={profileData.bio}
                  onChange={handleChange('bio')}
                  disabled={!isEditing}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
              <Typography variant="body2" color="info.dark">
                <strong>Note:</strong> Your role ({authState.role}) determines your access level and permissions within the application.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Profile updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};
