'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';
import axiosClient from '@/lib/axios';
import { User } from '@/types/user';
import { loginUser } from '@/lib/api/auth';
import { LoginData } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (credentials: LoginData) => Promise<void>;
  csrf: () => Promise<any>;
  logout: () => void;
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, _setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('AUTH_TOKEN');
    }
    return null;
  });

  const setToken = (newToken: string | null) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem('AUTH_TOKEN', newToken);
      Cookies.set('AUTH_TOKEN', newToken, {
        expires: 7,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    } else {
      localStorage.removeItem('AUTH_TOKEN');
      Cookies.remove('AUTH_TOKEN', { path: '/' });
    }
  };

  const login = async (credentials: LoginData) => {
    await csrf();
    const data = await loginUser(credentials);
    setToken(data.token);
  };

  const csrf = () => axiosClient.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`);

  const logout = async () => {
    try {
      await axiosClient.post('/logout');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setUser(null);
      setToken(null);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axiosClient.get('/api/user');
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user', error);
          setToken(null);
        }
      }
    };
    fetchUser();
  }, [token]);

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, login, csrf, logout, token, setToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};