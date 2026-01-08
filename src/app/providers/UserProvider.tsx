import React, { createContext, useState, useCallback, useMemo, ReactNode } from 'react';
import { User, UserContextType, UserFilters, SortConfig } from '../../types';
import * as api from '../../services/api';
import { ROLES } from '../../utils/constants';

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const initialFilters: UserFilters = {
  search: '',
  city: [],
  role: '',
};

const initialSort: SortConfig = {
  field: 'name',
  order: 'asc',
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFiltersState] = useState<UserFilters>(initialFilters);
  const [sortConfig, setSortConfigState] = useState<SortConfig>(initialSort);

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedUsers = await api.fetchUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  // Add user
  const addUser = useCallback((newUser: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
    const user: User = {
      ...newUser,
      id: Math.max(...users.map(u => u.id), 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setUsers(prev => [user, ...prev]);
  }, [users]);

  // Update user
  const updateUser = useCallback((id: number, updates: Partial<User>) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === id
          ? { ...user, ...updates, updatedAt: new Date().toISOString() }
          : user
      )
    );
  }, []);

  // Delete user
  const deleteUser = useCallback((id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  }, []);

  // Set filters
  const setFilters = useCallback((newFilters: Partial<UserFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Set sort config
  const setSortConfig = useCallback((config: SortConfig) => {
    setSortConfigState(config);
  }, []);

  // Retry fetch
  const retryFetch = useCallback(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter and sort users
  const filteredUsers = useMemo(() => {
    let filtered = [...users];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        user =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      );
    }

    // Apply city filter
    if (filters.city.length > 0) {
      filtered = filtered.filter(user => filters.city.includes(user.city || ''));
    }

    // Apply role filter
    if (filters.role) {
      filtered = filtered.filter(user => user.role === filters.role);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = sortConfig.field === 'name' ? a.name : (a.company || '');
      const bValue = sortConfig.field === 'name' ? b.name : (b.company || '');

      if (sortConfig.order === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    });

    return filtered;
  }, [users, filters, sortConfig]);

  const value: UserContextType = {
    users,
    loading,
    error,
    filters,
    sortConfig,
    filteredUsers,
    fetchUsers,
    addUser,
    updateUser,
    deleteUser,
    setFilters,
    setSortConfig,
    retryFetch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUsers = (): UserContextType => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};
