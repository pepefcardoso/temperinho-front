"use server";

import { z } from "zod";

const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  subject: z.string().min(1, { message: "Por favor, selecione um assunto." }),
  message: z
    .string()
    .min(10, { message: "A mensagem precisa ter pelo menos 10 caracteres." }),
});

/**
 * Server Action para receber e processar os dados do formulário de contato.
 * Esta função só executa no servidor.
 * @param formData - Os dados brutos do formulário.
 */
export async function submitContactForm(formData: unknown) {
  const parsed = contactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      message:
        "Dados inválidos. Por favor, corrija os erros e tente novamente.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  console.log("Dados validados e prontos para enviar à API:", parsed.data);

  await new Promise((res) => setTimeout(res, 1500));

  return {
    success: true,
    message: "Mensagem enviada com sucesso! Agradecemos o contato.",
  };
}
