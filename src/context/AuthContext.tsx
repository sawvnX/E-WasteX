import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { apiService } from '../services/apiService';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  register: (name: string, email: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  updateProfile: (updates: Partial<User>) => void;
  refreshUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => apiService.getCurrentUser());

  useEffect(() => {
    // Keep user state in sync with local storage
    const stored = apiService.getCurrentUser();
    if (stored) {
      setUser(stored);
    }
  }, []);

  const login = async (email: string, pass: string) => {
    const res = await apiService.login(email, pass);
    setUser(res.user);
  };

  const register = async (name: string, email: string, role: UserRole = 'USER') => {
    const newUser = await apiService.register(name, email, role);
    setUser(newUser);
  };

  const logout = () => {
    apiService.setCurrentUser(null);
    setUser(null);
  };

  const switchRole = (newRole: UserRole) => {
    const switchedUser = apiService.switchUserRole(newRole);
    setUser(switchedUser);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updated = apiService.updateUserProfile(user.id, updates);
      setUser(updated);
    }
  };

  const refreshUser = () => {
    const current = apiService.getCurrentUser();
    setUser(current);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'USER',
        isAuthenticated: !!user,
        login,
        register,
        logout,
        switchRole,
        updateProfile,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
