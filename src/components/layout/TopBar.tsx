import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Chip,
  Button,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../app/providers/AuthProvider';
import { useTheme } from '../../app/providers/ThemeProvider';
import { ROLE_COLORS } from '../../utils/constants';

interface TopBarProps {
  onMenuClick: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { authState, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ fontWeight: 700, flexGrow: 0, mr: 3 }}
        >
          RBAC Dashboard
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {authState.username && (
          <Typography
            variant="body2"
            sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
          >
            {authState.username}
          </Typography>
        )}

        {authState.role && (
          <Chip
            label={authState.role}
            color={ROLE_COLORS[authState.role]}
            size="small"
            sx={{ mr: 2, fontWeight: 600 }}
          />
        )}

        <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
          <IconButton color="inherit" onClick={toggleTheme} sx={{ mr: 1 }}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>

        <Button
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={logout}
          sx={{ ml: 1 }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
