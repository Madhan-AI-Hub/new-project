import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
  MenuItem,
  Stack,
  Button,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { User, Role } from '../../types';
import { useUsers } from '../../app/providers/UserProvider';
import { useAuth } from '../../app/providers/AuthProvider';
import { canEditUser } from '../../utils/permissions';
import { validateEmail, validateRequired } from '../../utils/validators';
import { ROLES } from '../../utils/constants';
import { useUnsavedChanges } from '../../hooks/useUnsavedChanges';
import { ConfirmDialog } from '../common/ConfirmDialog';

interface UserDrawerProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
}

export const UserDrawer: React.FC<UserDrawerProps> = ({ open, user, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { authState } = useAuth();
  const { updateUser } = useUsers();

  const [formData, setFormData] = useState<User | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isEditable = canEditUser(authState.role);

  useEffect(() => {
    if (user) {
      setFormData(user);
      setIsDirty(false);
    }
  }, [user]);

  useUnsavedChanges(isDirty);

  const handleChange = (field: keyof User) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (formData) {
      setFormData({ ...formData, [field]: e.target.value });
      setIsDirty(true);
    }
  };

  const handleSave = () => {
    if (formData && user) {
      // Validate
      if (!validateRequired(formData.name)) {
        return;
      }
      
      if (!validateEmail(formData.email)) {
        return;
      }

      // Check for duplicate email (excluding current user)
      const { users } = useUsers();
      const emailExists = users.some(u => 
        u.id !== user.id && u.email.toLowerCase() === formData.email.toLowerCase()
      );
      if (emailExists) {
        alert('This email is already registered to another user');
        return;
      }

      // Check for duplicate phone (excluding current user)
      if (formData.phone && formData.phone.trim()) {
        const phoneExists = users.some(u => 
          u.id !== user.id && u.phone === formData.phone
        );
        if (phoneExists) {
          alert('This phone number is already registered to another user');
          return;
        }
      }

      updateUser(user.id, formData);
      setShowSuccess(true);
      setIsDirty(false);
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  const handleClose = () => {
    if (isDirty) {
      setShowUnsavedDialog(true);
    } else {
      onClose();
      setFormData(null);
    }
  };

  const handleDiscardChanges = () => {
    setShowUnsavedDialog(false);
    setIsDirty(false);
    onClose();
    setFormData(null);
  };

  const drawerContent = formData && (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" fontWeight={600}>
          {isEditable ? 'Edit User' : 'User Details'}
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      <Divider />

      {/* Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        <Stack spacing={2.5}>
          <TextField
            fullWidth
            required
            label="Name"
            value={formData.name}
            onChange={handleChange('name')}
            disabled={!isEditable}
          />

          <TextField
            fullWidth
            required
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            disabled={!isEditable}
          />

          <TextField
            select
            fullWidth
            required
            label="Role"
            value={formData.role}
            onChange={handleChange('role')}
            disabled={!isEditable}
          >
            <MenuItem value={ROLES.ADMIN}>Admin</MenuItem>
            <MenuItem value={ROLES.MANAGER}>Manager</MenuItem>
            <MenuItem value={ROLES.VIEWER}>Viewer</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Company"
            value={formData.company || ''}
            onChange={handleChange('company')}
            disabled={!isEditable}
          />

          <TextField
            fullWidth
            label="City"
            value={formData.city || ''}
            onChange={handleChange('city')}
            disabled={!isEditable}
          />

          <TextField
            fullWidth
            label="Website"
            value={formData.website || ''}
            onChange={handleChange('website')}
            disabled={!isEditable}
          />

          <TextField
            fullWidth
            label="Phone"
            value={formData.phone || ''}
            onChange={handleChange('phone')}
            disabled={!isEditable}
          />
        </Stack>
      </Box>

      {/* Actions */}
      {isEditable && (
        <>
          <Divider />
          <Box sx={{ p: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              disabled={!isDirty}
            >
              Save Changes
            </Button>
          </Box>
        </>
      )}
    </Box>
  );

  return (
    <>
      {/* Desktop Drawer */}
      {!isMobile && (
        <Drawer
          anchor="right"
          open={open}
          onClose={handleClose}
          sx={{
            '& .MuiDrawer-paper': {
              width: 400,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* Mobile Full Screen Dialog */}
      {isMobile && (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
        >
          {drawerContent}
        </Dialog>
      )}

      {/* Unsaved Changes Dialog */}
      <ConfirmDialog
        open={showUnsavedDialog}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to discard them?"
        confirmLabel="Discard"
        cancelLabel="Keep Editing"
        onConfirm={handleDiscardChanges}
        onCancel={() => setShowUnsavedDialog(false)}
        severity="warning"
      />

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          User updated successfully!
        </Alert>
      </Snackbar>
    </>
  );
};
