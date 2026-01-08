// User and Role Types
export type Role = 'Admin' | 'Manager' | 'Viewer';

export interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    company: string;
    city: string;
    website: string;
    phone: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
}

// Authentication Types
export interface AuthState {
    isAuthenticated: boolean;
    role: Role | null;
    username: string | null;
}

// Filter and Sort Types
export interface UserFilters {
    search: string;
    city: string[];
    role: Role | '';
}

export interface SortConfig {
    field: 'name' | 'company';
    order: 'asc' | 'desc';
}

// Context Types
export interface AuthContextType {
    authState: AuthState;
    login: (role: Role) => void;
    logout: () => void;
}

export interface UserContextType {
    users: User[];
    loading: boolean;
    error: string | null;
    filters: UserFilters;
    sortConfig: SortConfig;
    filteredUsers: User[];
    fetchUsers: () => Promise<void>;
    addUser: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateUser: (id: number, updates: Partial<User>) => void;
    deleteUser: (id: number) => void;
    setFilters: (filters: Partial<UserFilters>) => void;
    setSortConfig: (config: SortConfig) => void;
    retryFetch: () => void;
}

export interface ThemeContextType {
    mode: 'light' | 'dark';
    toggleTheme: () => void;
}
