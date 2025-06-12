"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function deleteArticleAction(
  articleId: string
): Promise<{ success: boolean; message: string }> {
  console.log(`Deletando artigo com ID: ${articleId}`);
  await new Promise((res) => setTimeout(res, 1000));
  revalidatePath("/usuario/artigos");
  return {
    success: true,
    message: `Artigo ${articleId} deletado com sucesso.`,
  };
}

const articleSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5, "O título precisa ter pelo menos 5 caracteres."),
  excerpt: z
    .string()
    .min(20, "O resumo precisa ter pelo menos 20 caracteres.")
    .max(200, "O resumo não pode exceder 200 caracteres."),
  category: z.string().min(1, "Por favor, selecione uma categoria."),
  tags: z.array(z.string()).min(1, "Selecione pelo menos uma tag."),
  content: z
    .string()
    .min(100, "O conteúdo do artigo precisa ter pelo menos 100 palavras."),
});

export async function createArticleAction(formData: unknown) {
  const parsed = articleSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: "Dados inválidos." };
  }
  console.log("CRIANDO ARTIGO:", parsed.data);
  await new Promise((res) => setTimeout(res, 1500));
  revalidatePath("/usuario/artigos");
  return { success: true, message: "Artigo criado com sucesso!" };
}

export async function updateArticleAction(formData: unknown) {
  const parsed = articleSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: "Dados inválidos." };
  }
  console.log("ATUALIZANDO ARTIGO:", parsed.data);
  await new Promise((res) => setTimeout(res, 1500));
  revalidatePath("/usuario/artigos");
  revalidatePath(`/blog/${parsed.data.id}`); // Exemplo de revalidação da página pública
  return { success: true, message: "Artigo atualizado com sucesso!" };
}
