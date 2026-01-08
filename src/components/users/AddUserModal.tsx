import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Snackbar,
  Alert,
  Box,
  Typography,
} from '@mui/material';
import { useUsers } from '../../app/providers/UserProvider';
import { ROLES } from '../../utils/constants';
import { validateEmail, validateRequired } from '../../utils/validators';
import { Role } from '../../types';

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  role: Role;
  company: string;
  city: string;
  website: string;
  phone: string;
  active: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  role?: string;
  phone?: string;
}

const initialFormData: FormData = {
  name: '',
  email: '',
  role: ROLES.VIEWER,
  company: '',
  city: '',
  website: '',
  phone: '',
  active: true,
};

export const AddUserModal: React.FC<AddUserModalProps> = ({ open, onClose }) => {
  const { addUser, users } = useUsers();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!validateRequired(formData.name)) {
      newErrors.name = 'Name is required';
    }

    if (!validateRequired(formData.email)) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else {
      // Check for duplicate email
      const emailExists = users.some(user => user.email.toLowerCase() === formData.email.toLowerCase());
      if (emailExists) {
        newErrors.email = 'This email is already registered';
      }
    }

    // Check for duplicate phone number if provided
    if (formData.phone && formData.phone.trim()) {
      const phoneExists = users.some(user => user.phone === formData.phone);
      if (phoneExists) {
        setErrors({ ...newErrors, phone: 'This phone number is already registered' });
        return false;
      }
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      addUser(formData);
      setShowSuccess(true);
      handleReset();
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              fullWidth
              required
              label="Name"
              value={formData.name}
              onChange={handleChange('name')}
              error={!!errors.name}
              helperText={errors.name}
            />

            <TextField
              fullWidth
              required
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange('email')}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              select
              fullWidth
              required
              label="Role"
              value={formData.role}
              onChange={handleChange('role')}
              error={!!errors.role}
              helperText={errors.role}
            >
              <MenuItem value={ROLES.ADMIN}>Admin</MenuItem>
              <MenuItem value={ROLES.MANAGER}>Manager</MenuItem>
              <MenuItem value={ROLES.VIEWER}>Viewer</MenuItem>
            </TextField>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Account Status
              </Typography>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="body2" color={formData.active ? 'success.main' : 'error.main'}>
                  {formData.active ? 'Active' : 'Inactive'}
                </Typography>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setFormData({ ...formData, active: !formData.active })}
                  color={formData.active ? 'success' : 'error'}
                >
                  {formData.active ? 'Deactivate' : 'Activate'}
                </Button>
              </Stack>
            </Box>

            <TextField
              fullWidth
              label="Company"
              value={formData.company}
              onChange={handleChange('company')}
            />

            <TextField
              fullWidth
              label="City"
              value={formData.city}
              onChange={handleChange('city')}
            />

            <TextField
              fullWidth
              label="Website"
              value={formData.website}
              onChange={handleChange('website')}
            />

            <TextField
              fullWidth
              label="Phone"
              value={formData.phone}
              onChange={handleChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          User added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};
