import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  IconButton,
  Stack,
  Box,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { User } from '../../types';
import { useAuth } from '../../app/providers/AuthProvider';
import { canEditUser, canDeleteUser } from '../../utils/permissions';
import { ROLE_COLORS } from '../../utils/constants';

interface UserCardProps {
  user: User;
  onUserClick: (user: User) => void;
  onEditUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onUserClick,
  onEditUser,
  onDeleteUser,
}) => {
  const { authState } = useAuth();

  const handleCardClick = () => {
    onUserClick(user);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditUser(user);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteUser(user);
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ pb: 1 }}>
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              {user.name}
            </Typography>
            <Chip
              label={user.role}
              color={ROLE_COLORS[user.role]}
              size="small"
              sx={{ fontWeight: 500 }}
            />
          </Box>

          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>

            {user.company && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <BusinessIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {user.company}
                </Typography>
              </Box>
            )}

            {user.city && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationCityIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {user.city}
                </Typography>
              </Box>
            )}
          </Stack>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        {canEditUser(authState.role) && (
          <Tooltip title="Edit user">
            <IconButton size="small" color="primary" onClick={handleEdit}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        {canDeleteUser(authState.role) && (
          <Tooltip title="Delete user">
            <IconButton size="small" color="error" onClick={handleDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};
