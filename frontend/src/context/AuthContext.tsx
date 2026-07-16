'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'manager';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  seedDefaultAdmin: () => Promise<{ success: boolean; message?: string; credentials?: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      verifyToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (authToken: string) => {
    try {
      const data = await api.get('/auth/me');
      if (data.success) {
        setUser(data.user);
      } else {
        logout();
      }
    } catch (err) {
      console.error('Token verification failed:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await api.post('/auth/login', { email, password });
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
        router.push('/admin/dashboard');
        return { success: true };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'An error occurred' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    router.push('/admin');
  };

  const seedDefaultAdmin = async () => {
    try {
      const data = await api.post('/auth/seed', {});
      if (data.success) {
        return {
          success: true,
          message: data.message,
          credentials: data.credentials,
        };
      } else {
        return { success: false, message: data.message || 'Seeding failed' };
      }
    } catch (err: any) {
      return { success: false, message: err.message || 'An error occurred' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, seedDefaultAdmin }}>
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
