import React, { useState } from 'react';
import { Box, useMediaQuery, useTheme, Stack, Pagination, Snackbar, Alert } from '@mui/material';
import { UserTable } from './UserTable';
import { UserCard } from './UserCard';
import { UserFilters } from './UserFilters';
import { UserDrawer } from './UserDrawer';
import { AddUserModal } from './AddUserModal';
import { DeleteUserDialog } from './DeleteUserDialog';
import { LoadingState } from '../common/LoadingState';
import { EmptyState } from '../common/EmptyState';
import { ErrorState } from '../common/ErrorState';
import { useUsers } from '../../app/providers/UserProvider';
import { User } from '../../types';
import { DEFAULT_ROWS_PER_PAGE } from '../../utils/constants';

export const UserList: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { filteredUsers, loading, error, retryFetch, deleteUser } = useUsers();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      setShowDeleteSuccess(true);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleAddUser = () => {
    setAddModalOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedUser(null);
  };

  if (loading) {
    return <LoadingState variant={isMobile ? 'card' : 'table'} />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={retryFetch} />;
  }

  if (filteredUsers.length === 0) {
    return (
      <>
        <UserFilters onAddUser={handleAddUser} />
        <EmptyState message="No users found" />
        <AddUserModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
      </>
    );
  }

  return (
    <>
      <UserFilters onAddUser={handleAddUser} />

      {/* Desktop Table View */}
      {!isMobile && (
        <UserTable
          users={filteredUsers}
          onUserClick={handleUserClick}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}

      {/* Mobile Card View */}
      {isMobile && (
        <Box>
          <Stack spacing={2}>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onUserClick={handleUserClick}
                  onEditUser={handleEditUser}
                  onDeleteUser={handleDeleteUser}
                />
              ))}
          </Stack>

          {filteredUsers.length > rowsPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={Math.ceil(filteredUsers.length / rowsPerPage)}
                page={page + 1}
                onChange={(_, p) => handlePageChange(_, p - 1)}
                color="primary"
              />
            </Box>
          )}
        </Box>
      )}

      <UserDrawer open={drawerOpen} user={selectedUser} onClose={handleCloseDrawer} />

      <AddUserModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />

      <DeleteUserDialog
        open={deleteDialogOpen}
        userName={userToDelete?.name || ''}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      <Snackbar
        open={showDeleteSuccess}
        autoHideDuration={3000}
        onClose={() => setShowDeleteSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          User deleted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};
