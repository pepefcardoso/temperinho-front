"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { User } from "@/types/user";
import { SPECIALTY_OPTIONS } from "@/lib/config/user-profile";
import type { DietaryTag } from "@/types/recipe";

// 1. Schema de validação completo com Zod, a fonte da verdade para o perfil do usuário no servidor.
const profileSchema = z.object({
  id: z.string(),
  avatarUrl: z.string().url("URL do avatar inválida."),
  name: z
    .string()
    .min(3, { message: "O nome precisa ter pelo menos 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  phone: z.string().optional().or(z.literal("")),
  bio: z
    .string()
    .max(300, { message: "A biografia não pode exceder 300 caracteres." })
    .optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  // Garante que as especialidades sejam um dos valores permitidos
  specialties: z.array(
    z.enum(
      SPECIALTY_OPTIONS.map((opt) => opt.id) as [DietaryTag, ...DietaryTag[]]
    )
  ),
  experience: z.enum([
    "iniciante",
    "intermediario",
    "avancado",
    "profissional",
  ]),
  website: z
    .string()
    .url({ message: "Por favor, insira uma URL válida." })
    .or(z.literal(""))
    .optional(),
  instagram: z.string().optional(),
});

/**
 * Server Action para ATUALIZAR o perfil de um usuário.
 * Recebe dados do formulário, valida no servidor e simula o salvamento.
 */
export async function updateUserProfile(
  data: User
): Promise<{ success: boolean; message: string }> {
  // 2. Valida os dados recebidos do cliente usando o schema Zod.
  const parsed = profileSchema.safeParse(data);

  // 3. Se a validação falhar, retorna um erro detalhado (visível no console do servidor).
  if (!parsed.success) {
    console.error(
      "Erro de validação ao atualizar perfil:",
      parsed.error.flatten().fieldErrors
    );
    return {
      success: false,
      message: "Dados inválidos. Verifique os campos e tente novamente.",
    };
  }

  // 4. Se a validação for bem-sucedida, prossegue com a lógica de negócio.
  // Em uma aplicação real, aqui você chamaria sua API ou banco de dados para salvar os dados.
  console.log("Salvando perfil no servidor (DADOS VALIDADOS):", parsed.data);

  // Simula o tempo de espera da API
  await new Promise((res) => setTimeout(res, 1500));

  // 5. Revalida o cache da página de perfil para garantir que os dados atualizados sejam exibidos.
  revalidatePath("/usuario/perfil");

  return { success: true, message: "Perfil atualizado com sucesso!" };
}
