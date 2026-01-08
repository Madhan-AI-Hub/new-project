import React, { useState, ReactNode } from 'react';
import { Box, Toolbar } from '@mui/material';
import { TopBar } from './TopBar';
import { SideNav } from './SideNav';

interface AppLayoutProps {
  children: ReactNode;
}

const drawerWidth = 240;
const drawerWidthCollapsed = 72;

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <TopBar onMenuClick={handleDrawerToggle} />
      <SideNav 
        mobileOpen={mobileOpen} 
        onClose={handleDrawerToggle}
        collapsed={collapsed}
        onToggleCollapse={handleCollapseToggle}
      />
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { 
            xs: '100%', 
            md: `calc(100% - ${collapsed ? drawerWidthCollapsed : drawerWidth}px)` 
          },
          marginLeft: {
            xs: 0,
            md: `${collapsed ? drawerWidthCollapsed : drawerWidth}px`
          },
          height: '100vh',
          bgcolor: 'background.default',
          transition: 'margin-left 0.3s, width 0.3s',
          overflow: 'auto',
          // Custom scrollbar styling
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: (theme) => theme.palette.mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.2)' 
              : 'rgba(0, 0, 0, 0.2)',
            borderRadius: '4px',
            transition: 'background 0.3s',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: (theme) => theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.4)'
              : 'rgba(0, 0, 0, 0.4)',
          },
          // Firefox scrollbar styling
          scrollbarWidth: 'thin',
          scrollbarColor: (theme) => theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.2) transparent'
            : 'rgba(0, 0, 0, 0.2) transparent',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
