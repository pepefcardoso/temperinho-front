'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import axiosClient from "../lib/axios";
import { useRouter } from "next/navigation";
import type { AuthContextType, LoginData, RegisterData } from "@/types/auth";
import type { User } from "@/types/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    if (!localStorage.getItem("AUTH_TOKEN")) {
      setLoading(false);
      return;
    }

    try {
      const response = await axiosClient.get("/users/me");
      setUser(response.data.data);
    } catch (error) {
      localStorage.removeItem("AUTH_TOKEN");
      setUser(null);
      console.error("Falha ao buscar usuário, token inválido.", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (data: LoginData) => {
    const response = await axiosClient.post("/auth/login", data);
    const { data: newUser, token } = response.data;
    localStorage.setItem("AUTH_TOKEN", token);
    setUser(newUser);
    router.push("/usuario/dashboard");
  };

  const register = async (data: RegisterData) => {
    const response = await axiosClient.post("/users", data);
    const { data: newUser, token } = response.data;
    localStorage.setItem("AUTH_TOKEN", token);
    setUser(newUser);
    router.push("/usuario/dashboard");
  };

  const logout = async () => {
    try {
      await axiosClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout falhou, mas o cliente será deslogado.", error);
    } finally {
      localStorage.removeItem("AUTH_TOKEN");
      setUser(null);
      window.location.pathname = '/login';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
