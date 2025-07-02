import { RecipeForm } from '@/components/recipe/forms/RecipeForm';
import { getRecipeById } from '@/lib/api/recipe';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { title: 'Editar Receita | Leve Sabor' };

const extractIdFromSlug = (slug: string): number | null => {
    const match = slug.match(/^(\d+)/);
    return match ? parseInt(match[1], 10) : null;
};

export default async function EditRecipePage({ params }: { params: { slug: string } }) {
    const recipeId = extractIdFromSlug(params.slug);
    if (!recipeId) {
        notFound();
    }

    try {
        const recipe = await getRecipeById(recipeId);
        return (
            <div className="container mx-auto py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-display font-bold text-foreground">Editar Receita</h1>
                        <p className="text-muted-foreground mt-2">Ajuste e melhore sua receita.</p>
                    </div>
                    <RecipeForm action="update" initialData={recipe} />
                </div>
            </div>
        );
    } catch (error) {
        console.error("Erro ao buscar receita para edição:", error);
        notFound();
    }
}
