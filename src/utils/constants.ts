import { Role } from '../types';

// Role Constants
export const ROLES = {
    ADMIN: 'Admin' as Role,
    MANAGER: 'Manager' as Role,
    VIEWER: 'Viewer' as Role,
};

// API Endpoints
export const API_ENDPOINTS = {
    USERS: 'https://jsonplaceholder.typicode.com/users',
};

// LocalStorage Keys
export const STORAGE_KEYS = {
    AUTH: 'rbac_auth',
    THEME: 'rbac_theme',
};

// Permission Matrix
export const PERMISSIONS = {
    VIEW_USERS: [ROLES.ADMIN, ROLES.MANAGER, ROLES.VIEWER],
    ADD_USER: [ROLES.ADMIN, ROLES.MANAGER],
    EDIT_USER: [ROLES.ADMIN, ROLES.MANAGER],
    DELETE_USER: [ROLES.ADMIN],
};

// Debounce Delay
export const DEBOUNCE_DELAY = 400;

// Pagination
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 50];
export const DEFAULT_ROWS_PER_PAGE = 10;

// Role Descriptions
export const ROLE_DESCRIPTIONS = {
    [ROLES.ADMIN]: 'Full access to all features including delete operations',
    [ROLES.MANAGER]: 'Can view, add, and edit users but cannot delete',
    [ROLES.VIEWER]: 'Read-only access to view user information',
};

// Role Colors
export const ROLE_COLORS = {
    [ROLES.ADMIN]: 'error' as const,
    [ROLES.MANAGER]: 'warning' as const,
    [ROLES.VIEWER]: 'info' as const,
};
