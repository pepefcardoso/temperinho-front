'use server';

import { revalidatePath } from "next/cache";

export async function deleteArticleAction(articleId: string): Promise<{ success: boolean; message: string }> {
    console.log(`Deletando artigo com ID: ${articleId}`);
    await new Promise(res => setTimeout(res, 1000));
    revalidatePath('/usuario/artigos');
    return { success: true, message: `Artigo ${articleId} deletado com sucesso.` };
}