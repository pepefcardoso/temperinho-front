import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axiosClient from "../lib/axios";
import { useRouter } from "next/router";
import type { AuthContextType } from "@/types/auth";
import { User } from "@/types/user";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("AUTH_TOKEN");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      axiosClient
        .get("/api/users/me")
        .then((response) => setUser(response.data.data))
        .catch(() => {
          localStorage.removeItem("AUTH_TOKEN");
          setToken(null);
          setUser(null);
        })
        .finally(() => setLoading(false));
    }
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await axiosClient.post("/api/auth/login", {
      email,
      password,
    });
    const { token: newToken, user: newUser } = response.data;
    localStorage.setItem("AUTH_TOKEN", newToken);
    setToken(newToken);
    setUser(newUser);
    router.push("/usuario/painel");
  };

  const register = async (
    name: string,
    email: string,
    phone: string,
    password: string,
    password_confirmation: string
  ) => {
    const response = await axiosClient.post("/api/users", {
      name,
      email,
      phone,
      password,
      password_confirmation,
    });
    const { token: newToken, user: newUser } = response.data;
    localStorage.setItem("AUTH_TOKEN", newToken);
    setToken(newToken);
    setUser(newUser);
    router.push("/usuario/painel");
  };

  const logout = async () => {
    await axiosClient.post("/api/auth/logout");
    localStorage.removeItem("AUTH_TOKEN");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
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
