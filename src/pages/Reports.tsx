import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useUsers } from '../app/providers/UserProvider';
import { ROLES } from '../utils/constants';

export const Reports: React.FC = () => {
  const { users } = useUsers();

  const adminCount = users.filter((u) => u.role === ROLES.ADMIN).length;
  const managerCount = users.filter((u) => u.role === ROLES.MANAGER).length;
  const viewerCount = users.filter((u) => u.role === ROLES.VIEWER).length;

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: PeopleIcon,
      color: 'primary.main',
    },
    {
      title: 'Admins',
      value: adminCount,
      icon: AdminPanelSettingsIcon,
      color: 'error.main',
    },
    {
      title: 'Managers',
      value: managerCount,
      icon: ManageAccountsIcon,
      color: 'warning.main',
    },
    {
      title: 'Viewers',
      value: viewerCount,
      icon: VisibilityIcon,
      color: 'info.main',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Reports & Analytics
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Overview of user statistics and role distribution
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.1)'
                            : 'rgba(0,0,0,0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ color: stat.color, fontSize: 28 }} />
                    </Box>
                  </Box>
                  <Typography variant="h3" fontWeight={700}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Role Distribution */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Role Distribution
        </Typography>
        <Box sx={{ mt: 3 }}>
          {[
            { name: 'Admin', count: adminCount, color: 'error.main' },
            { name: 'Manager', count: managerCount, color: 'warning.main' },
            { name: 'Viewer', count: viewerCount, color: 'info.main' },
          ].map((role) => (
            <Box key={role.name} sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 1,
                }}
              >
                <Typography variant="body1" fontWeight={500}>
                  {role.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {role.count} users (
                  {users.length > 0
                    ? Math.round((role.count / users.length) * 100)
                    : 0}
                  %)
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: 8,
                  bgcolor: 'action.hover',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: `${users.length > 0 ? (role.count / users.length) * 100 : 0}%`,
                    height: '100%',
                    bgcolor: role.color,
                    transition: 'width 0.3s ease',
                  }}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};
