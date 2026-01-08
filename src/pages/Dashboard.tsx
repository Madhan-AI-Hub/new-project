import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Stack,
} from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useUsers } from '../app/providers/UserProvider';
import { useAuth } from '../app/providers/AuthProvider';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { users, fetchUsers } = useUsers();
  const { authState } = useAuth();
  const { canAddUser, canEditUser } = {
    canAddUser: authState.role === 'Admin' || authState.role === 'Manager',
    canEditUser: authState.role === 'Admin' || authState.role === 'Manager',
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const stats = [
    {
      title: 'Total Users',
      value: users.length,
      icon: PeopleIcon,
      color: 'primary.main',
      bgColor: 'primary.light',
    },
    {
      title: 'Active Tasks',
      value: '24',
      icon: AssignmentIcon,
      color: 'warning.main',
      bgColor: 'warning.light',
    },
    {
      title: 'Growth',
      value: '+12%',
      icon: TrendingUpIcon,
      color: 'success.main',
      bgColor: 'success.light',
    },
    {
      title: 'Completed',
      value: '89%',
      icon: CheckCircleIcon,
      color: 'info.main',
      bgColor: 'info.light',
    },
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {authState.username}! 
          {authState.role === 'Admin' && 'You have full administrative access.'}
          {authState.role === 'Manager' && 'You can manage users and view reports.'}
          {authState.role === 'Viewer' && 'You have view-only access to the dashboard.'}
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
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
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" fontWeight={700}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255, 255, 255, 0.1)'
                            : 'rgba(0, 0, 0, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ color: stat.color, fontSize: 32 }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Role Permissions Panel */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: 'primary.main', color: 'white' }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Your Permissions - {authState.role}
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Typography variant="body2">✅ View Users</Typography>
              {canAddUser && <Typography variant="body2">✅ Add Users</Typography>}
              {canEditUser && <Typography variant="body2">✅ Edit Users</Typography>}
              {authState.role === 'Admin' && <Typography variant="body2">✅ Delete Users</Typography>}
              {!canAddUser && <Typography variant="body2">❌ Add/Edit/Delete (View Only)</Typography>}
            </Stack>
          </Box>
        </Stack>
      </Paper>

      {/* Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Recent Activity
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Stack spacing={2}>
                {[
                  { action: 'New user registered', time: '2 hours ago', user: 'John Doe' },
                  { action: 'Task completed', time: '4 hours ago', user: 'Jane Smith' },
                  { action: 'Report generated', time: '6 hours ago', user: 'System' },
                  { action: 'Settings updated', time: '1 day ago', user: authState.username || 'Admin' },
                ].map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      p: 2,
                      borderRadius: 1,
                      bgcolor: 'action.hover',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="body1" fontWeight={500}>
                        {activity.action}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        by {activity.user}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Quick Actions
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
              Role: {authState.role}
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Button variant="outlined" fullWidth onClick={() => navigate('/users')}>
                View All Users
              </Button>
              {(canAddUser || canEditUser) && (
                <Button variant="outlined" fullWidth onClick={() => navigate('/users')}>
                  Manage Users
                </Button>
              )}
              <Button variant="outlined" fullWidth onClick={() => navigate('/reports')}>
                View Reports
              </Button>
              <Button variant="outlined" fullWidth onClick={() => navigate('/settings')}>
                Settings
              </Button>
              {canAddUser && (
                <Button variant="contained" fullWidth onClick={() => navigate('/users')}>
                  Add New User
                </Button>
              )}
              {!canAddUser && (
                <Box sx={{ p: 2, bgcolor: 'info.light', borderRadius: 1, textAlign: 'center' }}>
                  <Typography variant="caption" color="info.dark">
                    ℹ️ Limited to view-only access
                  </Typography>
                </Box>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
