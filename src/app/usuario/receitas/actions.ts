'use server';

import { revalidatePath } from "next/cache";

export async function deleteRecipeAction(recipeId: string): Promise<{ success: boolean; message: string }> {
    // Em uma aplicação real, aqui você faria a chamada para a API para deletar a receita do banco.
    console.log(`Deletando receita com ID: ${recipeId}`);

    // Simula o tempo de espera da API
    await new Promise(res => setTimeout(res, 1000));

    // Revalida o cache da página para que a lista seja atualizada
    revalidatePath('/usuario/receitas');

    return { success: true, message: `Receita ${recipeId} deletada com sucesso.` };
}