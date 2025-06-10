"use server";

import { z } from "zod";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
});

export async function subscribeToNewsletter(formData: unknown) {
  const parsed = newsletterSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      success: false,
      message:
        parsed.error.flatten().fieldErrors.email?.[0] || "Email inválido.",
    };
  }

  // Aqui você integraria com seu serviço de email (Mailchimp, ConvertKit, etc.)
  console.log(`Email ${parsed.data.email} inscrito na newsletter!`);

  await new Promise((res) => setTimeout(res, 1000));

  return {
    success: true,
    message: "Inscrição realizada com sucesso! Bem-vindo(a).",
  };
}
