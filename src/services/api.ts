import axios from 'axios';
import { User, Role } from '../types';
import { API_ENDPOINTS, ROLES } from '../utils/constants';

// Random role assignment helper
const getRandomRole = (): Role => {
    const roles = [ROLES.ADMIN, ROLES.MANAGER, ROLES.VIEWER];
    return roles[Math.floor(Math.random() * roles.length)];
};

// Fetch users from API and enhance with local data
export const fetchUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get(API_ENDPOINTS.USERS);
        const users = response.data;

        // Enhance users with role and timestamps
        const enhancedUsers: User[] = users.map((user: any) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: getRandomRole(),
            company: user.company?.name || '',
            city: user.address?.city || '',
            website: user.website || '',
            phone: user.phone || '',
            active: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }));

        return enhancedUsers;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || 'Failed to fetch users');
        }
        throw new Error('An unexpected error occurred');
    }
};

// Mock API delay helper
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
