import { Role } from '../types';
import { PERMISSIONS } from './constants';

export const canViewUsers = (role: Role | null): boolean => {
    if (!role) return false;
    return PERMISSIONS.VIEW_USERS.includes(role);
};

export const canAddUser = (role: Role | null): boolean => {
    if (!role) return false;
    return PERMISSIONS.ADD_USER.includes(role);
};

export const canEditUser = (role: Role | null): boolean => {
    if (!role) return false;
    return PERMISSIONS.EDIT_USER.includes(role);
};

export const canDeleteUser = (role: Role | null): boolean => {
    if (!role) return false;
    return PERMISSIONS.DELETE_USER.includes(role);
};

export const checkPermission = (role: Role | null, permission: keyof typeof PERMISSIONS): boolean => {
    if (!role) return false;
    return PERMISSIONS[permission].includes(role);
};
