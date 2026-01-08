import React, { useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { UserList } from '../components/users/UserList';
import { useUsers } from '../app/providers/UserProvider';

export const Users: React.FC = () => {
  const { fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          User Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage users with role-based access control
        </Typography>
      </Box>

      <UserList />
    </Container>
  );
};
