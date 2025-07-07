'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';
import axiosClient from '@/lib/axios';
import { User } from '@/types/user';
import { loginUser, registerUser } from '@/lib/api/auth';
import { LoginData, RegisterData } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (credentials: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  csrf: () => Promise<any>;
  logout: () => void;
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, _setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('AUTH_TOKEN');
    }
    return null;
  });

  const setToken = useCallback((newToken: string | null) => {
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
  }, []);

  const csrf = useCallback(() => axiosClient.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`), []);

  const login = useCallback(async (credentials: LoginData) => {
    await csrf();
    const data = await loginUser(credentials);
    setToken(data.token);
  }, [csrf, setToken]);

  const register = useCallback(async (data: RegisterData) => {
    await csrf();
    const response = await registerUser(data);
    if (response.token) {
        setToken(response.token);
    }
  }, [csrf, setToken]);

  const logout = useCallback(async () => {
    try {
      await axiosClient.post('/logout');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setUser(null);
      setToken(null);
    }
  }, [setToken]);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axiosClient.get('/users/me');
          setUser(response.data.data);
        } catch (error) {
          console.error('Failed to fetch user on client', error);
          setToken(null);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token, setToken]);

  const isAuthenticated = useMemo(() => !!token && !!user, [token, user]);

  const value = useMemo(() => ({
    user,
    setUser,
    login,
    register,
    csrf,
    logout,
    token,
    setToken,
    isAuthenticated,
    loading,
  }), [user, login, register, csrf, logout, token, setToken, isAuthenticated, loading]);

  return (
    <AuthContext.Provider value={value}>
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