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
  setToken: (newToken: string | null) => void;
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

  const login = useCallback(async (credentials: LoginData) => {
    try {
      const data = await loginUser(credentials);
      setToken(data.token);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }, [setToken]);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const response = await registerUser(data);
      setToken(response.token);
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  }, [setToken]);

  const logout = useCallback(async () => {
    try {
      await axiosClient.post('/auth/logout');
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
          console.error('Falha ao buscar usuário:', error);
          if (isAxiosError(error) && error.response?.status === 401) {
            console.warn('Token inválido, removendo...');
            setToken(null);
          }
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token, setToken]);

  useEffect(() => {
    if (typeof window !== 'undefined' && !token) {
      const cookieToken = Cookies.get('AUTH_TOKEN');
      if (cookieToken && cookieToken !== token) {
        _setToken(cookieToken);
        localStorage.setItem('AUTH_TOKEN', cookieToken);
      }
    }
  }, [token]);

  const isAuthenticated = useMemo(() => !!user, [user]);

  const value = useMemo(() => ({
    user,
    login,
    register,
    logout,
    isAuthenticated,
    loading,
    setToken,
  }), [user, login, register, logout, isAuthenticated, loading, setToken]);

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