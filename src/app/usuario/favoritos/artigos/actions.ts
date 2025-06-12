"use server";

import { revalidatePath } from "next/cache";

export async function removeFavoriteArticleAction(
  articleId: string
): Promise<{ success: boolean; message: string }> {
  // Lógica para remover o favorito do banco de dados para o usuário logado
  console.log(`Removendo o artigo ${articleId} dos favoritos...`);
  await new Promise((res) => setTimeout(res, 500));

  // Revalida o cache da página de favoritos para que a lista seja atualizada na UI
  revalidatePath("/usuario/favoritos");

  return { success: true, message: "Artigo removido dos favoritos." };
}
