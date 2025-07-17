'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import Cookies from 'js-cookie';
import axiosClient from '@/lib/axios';
import { isAxiosError } from 'axios';
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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, _setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem('AUTH_TOKEN');
  });

  /**
   * Função centralizada para definir o token de autenticação.
   * Sincroniza o estado do React, o localStorage e os Cookies.
   */
  const setToken = useCallback((newToken: string | null) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem('AUTH_TOKEN', newToken);
      Cookies.set('AUTH_TOKEN', newToken, {
        expires: 7, // 7 dias
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });
    } else {
      localStorage.removeItem('AUTH_TOKEN');
      Cookies.remove('AUTH_TOKEN', { path: '/' });
    }
  }, []);

  const csrf = useCallback((): Promise<void> => {
    return axiosClient.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/sanctum/csrf-cookie`);
  }, []);

  const login = useCallback(async (credentials: LoginData) => {
    await csrf();
    const data = await loginUser(credentials);
    setToken(data.token);
  }, [csrf, setToken]);

  const register = useCallback(async (data: RegisterData) => {
    await csrf();
    const response = await registerUser(data);
    setToken(response.token);
  }, [csrf, setToken]);

  /**
   * Efetua o logout do usuário. A chamada à API é feita, mas o estado do
   * cliente é limpo independentemente do sucesso da chamada, garantindo que
   * o usuário seja deslogado da aplicação.
   */
  const logout = useCallback(async () => {
    try {
      await axiosClient.post('/logout');
    } catch (error) {
      console.error('API de logout falhou, mas o usuário será deslogado do cliente.', error);
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
          console.error('Falha ao buscar usuário, limpando token.', error);
          if (isAxiosError(error) && error.response?.status === 401) {
            setToken(null);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchUser();
  }, [token, setToken]);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const value = useMemo(() => ({
    user,
    login,
    register,
    logout,
    isAuthenticated,
    loading,
  }), [user, login, register, logout, isAuthenticated, loading]);

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