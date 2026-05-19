'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import axiosClient from '@/lib/axios';
import { User } from '@/types/user';
import { loginUser, registerUser } from '@/lib/api/auth';
import { LoginData, RegisterData } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
  fetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const response = await axiosClient.get('/users/me');
      setUser(response.data.data);
    } catch (error) {
      console.error('Falha ao buscar usuário autenticado.', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (credentials: LoginData) => {
    await loginUser(credentials);
    await fetchUser();
  }, [fetchUser]);

  const register = useCallback(async (data: RegisterData) => {
    await registerUser(data);
    await fetchUser();
  }, [fetchUser]);

  const logout = useCallback(async () => {
    try {
      await axiosClient.post('/auth/logout');
    } catch (error) {
      console.error('API de logout falhou.', error);
    } finally {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const value = useMemo(() => ({
    user,
    login,
    register,
    logout,
    isAuthenticated,
    loading,
    fetchUser,
  }), [user, login, register, logout, isAuthenticated, loading, fetchUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};