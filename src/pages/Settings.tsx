import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import { useTheme } from '../app/providers/ThemeProvider';
import { useAuth } from '../app/providers/AuthProvider';

export const Settings: React.FC = () => {
  const { mode, toggleTheme } = useTheme();
  const { authState } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveSettings = () => {
    setShowSuccess(true);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your application preferences and settings
        </Typography>
      </Box>

      <Stack spacing={3}>
        {/* Appearance Settings */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Appearance
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={mode === 'dark'}
                  onChange={toggleTheme}
                  color="primary"
                />
              }
              label="Dark Mode"
            />
            <Typography variant="body2" color="text.secondary">
              Toggle between light and dark theme
            </Typography>
          </Stack>
        </Paper>

        {/* Account Settings */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Account
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2}>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Current Role
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {authState.role}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Username
              </Typography>
              <Typography variant="body1" fontWeight={600}>
                {authState.username}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        {/* Notification Settings */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Notifications
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Stack spacing={2}>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  color="primary"
                />
              }
              label="Enable Notifications"
            />
            <Typography variant="body2" color="text.secondary">
              Receive notifications for user management actions
            </Typography>
          </Stack>
        </Paper>

        {/* Language Settings */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            Language & Region
          </Typography>
          <Divider sx={{ my: 2 }} />
          <FormControl fullWidth sx={{ maxWidth: 300 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              label="Language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="es">Spanish</MenuItem>
              <MenuItem value="fr">French</MenuItem>
              <MenuItem value="de">German</MenuItem>
            </Select>
          </FormControl>
        </Paper>

        {/* Save Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSaveSettings}
            sx={{ minWidth: 200 }}
          >
            Save Settings
          </Button>
        </Box>
      </Stack>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};
