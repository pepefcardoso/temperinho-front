import { User } from "./user";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    phone: string,
    password: string,
    password_confirmation: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}
