"use server";

import { revalidatePath } from "next/cache";

export async function removeFavoriteRecipeAction(
  recipeId: string
): Promise<{ success: boolean; message: string }> {
  console.log(`Removendo a receita ${recipeId} dos favoritos...`);
  await new Promise((res) => setTimeout(res, 500));

  // Invalida o cache da página de favoritos para que a lista seja atualizada
  revalidatePath("/usuario/favoritos/receitas");

  return { success: true, message: "Receita removida dos favoritos." };
}
