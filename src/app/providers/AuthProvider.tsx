import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, AuthContextType, Role } from '../../types';
import { getItem, setItem, removeItem } from '../../utils/storage';
import { STORAGE_KEYS } from '../../utils/constants';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  role: null,
  username: null,
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Try to restore auth from localStorage
    const savedAuth = getItem<AuthState>(STORAGE_KEYS.AUTH);
    return savedAuth || initialAuthState;
  });

  useEffect(() => {
    // Persist auth state to localStorage
    if (authState.isAuthenticated) {
      setItem(STORAGE_KEYS.AUTH, authState);
    } else {
      removeItem(STORAGE_KEYS.AUTH);
    }
  }, [authState]);

  const login = (role: Role) => {
    const newAuthState: AuthState = {
      isAuthenticated: true,
      role,
      username: `${role} User`,
    };
    setAuthState(newAuthState);
  };

  const logout = () => {
    setAuthState(initialAuthState);
    removeItem(STORAGE_KEYS.AUTH);
  };

  const value: AuthContextType = {
    authState,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
