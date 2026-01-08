import React from 'react';
import { ConfirmDialog } from '../common/ConfirmDialog';

interface DeleteUserDialogProps {
  open: boolean;
  userName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  open,
  userName,
  onConfirm,
  onCancel,
}) => {
  return (
    <ConfirmDialog
      open={open}
      title="Delete User"
      message={`Are you sure you want to delete "${userName}"? This action cannot be undone.`}
      confirmLabel="Delete"
      cancelLabel="Cancel"
      onConfirm={onConfirm}
      onCancel={onCancel}
      severity="error"
    />
  );
};
