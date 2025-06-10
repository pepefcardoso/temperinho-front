import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { RecipeHeader } from '@/components/RecipeHeader';
import { getRecipeBySlug } from '@/lib/api/recipe';
import { RecipeContent } from '@/components/RecipeCOntent';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const recipe = await getRecipeBySlug(params.slug);
  if (!recipe) {
    return { title: 'Receita não encontrada' };
  }
  return {
    title: `${recipe.name} | Leve Sabor`,
    description: recipe.description,
  };
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const recipe = await getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="bg-background">
      <main>
        <RecipeHeader recipe={recipe} />
        <RecipeContent recipe={recipe} />
      </main>
    </div>
  );
}