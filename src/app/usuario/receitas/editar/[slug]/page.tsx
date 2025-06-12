import { RecipeForm } from '@/components/RecipeForm';
import { getRecipeBySlug } from '@/lib/api/recipe';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = { title: 'Editar Receita | Leve Sabor' };

export default async function EditRecipePage({ params }: { params: { slug: string } }) {
    const recipe = await getRecipeBySlug(params.slug);
    if (!recipe) notFound();

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
}