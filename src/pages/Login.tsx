import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  IconButton,
  InputAdornment,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../app/providers/AuthProvider';
import { ROLES } from '../utils/constants';
import { validateEmail } from '../utils/validators';

// Mock credentials
const MOCK_CREDENTIALS = {
  'admin@example.com': { password: 'admin123', role: ROLES.ADMIN },
  'manager@example.com': { password: 'manager123', role: ROLES.MANAGER },
  'viewer@example.com': { password: 'viewer123', role: ROLES.VIEWER },
};

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setError('');

    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate password
    if (!password) {
      setError('Password is required');
      return;
    }

    // Check credentials
    const user = MOCK_CREDENTIALS[email as keyof typeof MOCK_CREDENTIALS];
    if (!user || user.password !== password) {
      setError('Invalid email or password');
      return;
    }

    // Login successful
    login(user.role);
    navigate('/');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: (theme) =>
          theme.palette.mode === 'light'
            ? 'linear-gradient(135deg, #4F46E5 0%, #6366F1 50%, #06B6D4 100%)'
            : 'linear-gradient(135deg, #1E293B 0%, #0F172A 50%, #020617 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: (theme) =>
            `radial-gradient(circle, ${theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(79, 70, 229, 0.2)'} 0%, transparent 70%)`,
          animation: 'pulse 20s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: (theme) =>
            `radial-gradient(circle, ${theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(6, 182, 212, 0.15)'} 0%, transparent 60%)`,
          animation: 'pulse 15s ease-in-out infinite reverse',
        },
        '@keyframes pulse': {
          '0%, 100%': { 
            transform: 'scale(1) rotate(0deg)',
            opacity: 0.5,
          },
          '50%': { 
            transform: 'scale(1.2) rotate(180deg)',
            opacity: 0.8,
          },
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        '@keyframes fadeInUp': {
          from: {
            opacity: 0,
            transform: 'translateY(30px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      {/* Floating decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          animation: 'float 6s ease-in-out infinite',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '15%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite reverse',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '5%',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
          animation: 'float 7s ease-in-out infinite',
          zIndex: 0,
        }}
      />
      
      <Container maxWidth="sm">
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            bgcolor: (theme) =>
              theme.palette.mode === 'light'
                ? 'rgba(255, 255, 255, 0.95)'
                : 'rgba(30, 41, 59, 0.9)',
            backdropFilter: 'blur(20px)',
            borderRadius: 4,
            p: 5,
            boxShadow: (theme) =>
              theme.palette.mode === 'light'
                ? '0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(102, 126, 234, 0.2)'
                : '0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(99, 102, 241, 0.3)',
            border: (theme) =>
              theme.palette.mode === 'light'
                ? '1px solid rgba(255, 255, 255, 0.3)'
                : '1px solid rgba(255, 255, 255, 0.1)',
            animation: 'fadeInUp 0.8s ease-out',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'translateY(-5px)',
              boxShadow: (theme) =>
                theme.palette.mode === 'light'
                  ? '0 30px 80px rgba(0,0,0,0.4), 0 0 60px rgba(102, 126, 234, 0.4)'
                  : '0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(99, 102, 241, 0.5)',
            },
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 10px 30px rgba(79, 70, 229, 0.4)',
                animation: 'float 3s ease-in-out infinite',
              }}
            >
              <Box
                component="span"
                sx={{
                  fontSize: '40px',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                }}
              >
                🔐
              </Box>
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                mb: 1,
                background: 'linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.5px',
              }}
            >
              Welcome Back
            </Typography>
            <Typography 
              variant="body1" 
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              Sign in to your account
            </Typography>
          </Box>

          {/* Login Form */}
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your email"
              autoComplete="email"
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleLogin}
              sx={{
                py: 1.8,
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'none',
                background: 'linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%)',
                boxShadow: '0 4px 15px rgba(79, 70, 229, 0.4)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #06B6D4 0%, #4F46E5 100%)',
                  boxShadow: '0 6px 25px rgba(79, 70, 229, 0.6)',
                  transform: 'translateY(-2px)',
                },
                '&:active': {
                  transform: 'translateY(0)',
                },
              }}
            >
              Sign In →
            </Button>
          </Stack>

          {/* Demo Credentials */}
          <Box sx={{ mt: 4, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary" gutterBottom display="block">
              Demo Credentials:
            </Typography>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary">
                Admin: admin@example.com / admin123
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Manager: manager@example.com / manager123
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Viewer: viewer@example.com / viewer123
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
