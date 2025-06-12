"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

/**
 * Define o schema de validação com Zod.
 * Esta é a "única fonte da verdade" para as regras de dados da receita no servidor.
 * Ela garante que nenhum dado malformado seja processado.
 */
const recipeSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  name: z
    .string()
    .min(5, { message: "O título precisa ter pelo menos 5 caracteres." }),
  description: z
    .string()
    .min(20, { message: "A descrição precisa de pelo menos 20 caracteres." }),
  imageUrl: z
    .string()
    .url({ message: "A imagem de capa é obrigatória." })
    .min(1, { message: "A imagem de capa é obrigatória." }),

  // z.coerce.number() converte o valor do formulário (que pode ser string) para número antes de validar.
  prepTimeMinutes: z.coerce
    .number()
    .min(1, { message: "Tempo de preparo é obrigatório." }),
  cookTimeMinutes: z.coerce.number().min(0, "Tempo de cozimento inválido."),

  servings: z.string().min(1, { message: "O campo de porções é obrigatório." }),
  difficulty: z.enum(["Fácil", "Médio", "Difícil"], {
    required_error: "Selecione a dificuldade.",
  }),
  category: z
    .string({ required_error: "Selecione uma categoria." })
    .min(1, { message: "Selecione uma categoria." }),
  dietaryTags: z
    .array(z.string())
    .min(1, { message: "Selecione pelo menos uma tag." }),

  ingredients: z
    .array(
      z.object({
        quantity: z
          .string()
          .min(1, "A quantidade do ingrediente é obrigatória."),
        item: z.string().min(2, "O nome do ingrediente é obrigatório."),
        notes: z.string().optional(),
      })
    )
    .min(1, { message: "Adicione pelo menos um ingrediente." }),

  instructions: z
    .array(
      z.object({
        text: z.string().min(10, "Cada passo precisa ser mais detalhado."),
      })
    )
    .min(1, { message: "Adicione pelo menos um passo." }),

  tips: z.array(z.string()).optional(),
  totalTime: z.string(), // Gerado a partir de prepTime e cookTime
});

/**
 * Server Action para CRIAR uma nova receita.
 * Executa apenas no servidor.
 */
export async function createRecipeAction(formData: unknown) {
  const parsed = recipeSchema.safeParse(formData);

  if (!parsed.success) {
    console.error(
      "Erro de validação ao criar receita:",
      parsed.error.flatten().fieldErrors
    );
    return {
      success: false,
      message: "Dados inválidos. Verifique os campos e tente novamente.",
    };
  }

  // Em uma aplicação real, aqui você chamaria sua API ou banco de dados para criar a receita.
  console.log("CRIANDO RECEITA NO SERVIDOR (DADOS VALIDADOS):", parsed.data);

  await new Promise((res) => setTimeout(res, 1500));

  // Invalida o cache da página de listagem para que a nova receita apareça.
  revalidatePath("/usuario/receitas");
  revalidatePath("/receitas"); // Também invalida a página pública de receitas

  return { success: true, message: "Receita criada com sucesso!" };
}

/**
 * Server Action para ATUALIZAR uma receita existente.
 * Executa apenas no servidor.
 */
export async function updateRecipeAction(formData: unknown) {
  const parsed = recipeSchema.safeParse(formData);

  if (!parsed.success) {
    console.error(
      "Erro de validação ao atualizar receita:",
      parsed.error.flatten().fieldErrors
    );
    return {
      success: false,
      message: "Dados inválidos. Verifique os campos e tente novamente.",
    };
  }

  // Em uma aplicação real, aqui você chamaria sua API ou banco de dados para atualizar a receita.
  console.log(
    "ATUALIZANDO RECEITA NO SERVIDOR (DADOS VALIDADOS):",
    parsed.data
  );

  await new Promise((res) => setTimeout(res, 1500));

  // Revalida o cache da página de listagem e da página de detalhes da receita editada.
  revalidatePath("/usuario/receitas");
  if (parsed.data.slug) {
    revalidatePath(`/receitas/${parsed.data.slug}`);
  }

  return { success: true, message: "Receita atualizada com sucesso!" };
}

/**
 * Server Action para DELETAR uma receita.
 * Executa apenas no servidor.
 */
export async function deleteRecipeAction(
  recipeId: string
): Promise<{ success: boolean; message: string }> {
  if (!recipeId) {
    return { success: false, message: "ID da receita inválido." };
  }

  // Em uma aplicação real, aqui você faria a chamada para a API para deletar a receita do banco.
  console.log(`Deletando receita com ID: ${recipeId}`);

  // Simula o tempo de espera da API
  await new Promise((res) => setTimeout(res, 1000));

  // Revalida o cache da página para que a lista seja atualizada
  revalidatePath("/usuario/receitas");

  return {
    success: true,
    message: `Receita ${recipeId} deletada com sucesso.`,
  };
}
