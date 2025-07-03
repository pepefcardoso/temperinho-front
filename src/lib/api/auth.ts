import { ResetPasswordData } from "@/types/auth";
import axiosClient from "@/lib/axios";

export const registerUser = async (data: any) => {
  const response = await axiosClient.post("/api/users", data);
  return response.data;
};

export const loginUser = async (data: any) => {
  const response = await axiosClient.post("/api/auth/login", data);
  return response.data;
};

export const logoutUser = async () => {
  await axiosClient.post("/api/auth/logout");
};

export const forgotPassword = async (email: string) => {
  const response = await axiosClient.post("/api/auth/password/forgot", {
    email,
  });
  return response.data;
};

export const resetPassword = async (data: ResetPasswordData) => {
  const response = await axiosClient.post("/api/auth/password/reset", data);
  return response.data;
};
