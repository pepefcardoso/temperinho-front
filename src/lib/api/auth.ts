import { RegisterData, LoginData, ResetPasswordData } from "@/types/auth";
import axiosClient from "@/lib/axios";

/**
 * Registra um novo usuário no sistema.
 * @param data - Os dados de registro do usuário, incluindo nome, e-mail e senha.
 * @returns Uma Promise que resolve com os dados da resposta da API (ex: token de acesso).
 */
export const registerUser = async (
  data: RegisterData
): Promise<{ token: string }> => {
  const response = await axiosClient.post("/users", data);
  return response.data;
};

/**
 * Autentica um usuário no sistema.
 * @param data - As credenciais de login do usuário (e-mail e senha).
 * @returns Uma Promise que resolve com os dados da resposta da API (ex: token de acesso).
 */
export const loginUser = async (
  data: LoginData
): Promise<{ token: string }> => {
  const response = await axiosClient.post("/auth/login", data);
  return response.data;
};

/**
 * Desconecta o usuário autenticado.
 * @returns Uma Promise que resolve quando a operação de logout é concluída.
 */
export const logoutUser = async (): Promise<void> => {
  await axiosClient.post("/auth/logout");
};

/**
 * Solicita a redefinição de senha para um e-mail específico.
 * @param email - O e-mail do usuário que esqueceu a senha.
 * @returns Uma Promise que resolve com a mensagem de confirmação da API.
 */
export const forgotPassword = async (
  email: string
): Promise<{ message: string }> => {
  const response = await axiosClient.post("/auth/password/forgot", {
    email,
  });
  return response.data;
};

/**
 * Efetua a redefinição da senha do usuário.
 * @param data - Os dados necessários para a redefinição, incluindo o token e a nova senha.
 * @returns Uma Promise que resolve com a mensagem de confirmação da API.
 */
export const resetPassword = async (
  data: ResetPasswordData
): Promise<{ message: string }> => {
  const response = await axiosClient.post("/auth/password/reset", data);
  return response.data;
};
