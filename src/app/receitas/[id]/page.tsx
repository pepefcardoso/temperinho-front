import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getRecipeById } from '@/lib/api/recipe';
import { RecipeHeader } from '@/components/recipe/RecipeHeader';
import { RecipeContent } from '@/components/recipe/RecipeContent';

type PageProps = {
  params: { id: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const recipeId = parseInt(params.id, 10);

  if (isNaN(recipeId)) {
    return { title: 'Receita não encontrada' };
  }

  try {
    const recipe = await getRecipeById(recipeId);
    return {
      title: `${recipe.title} | Leve Sabor`,
      description: recipe.description,
      openGraph: {
        title: recipe.title,
        description: recipe.description,
        images: [
          {
            url: recipe.image?.url ?? '/images/og-image.png',
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Erro ao buscar receita para metadata:", error);
    return { title: 'Receita não encontrada' };
  }
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const recipeId = parseInt(params.id, 10);

  if (isNaN(recipeId)) {
    notFound();
  }

  try {
    const recipe = await getRecipeById(recipeId);

    return (
      <div className="bg-background">
        <main>
          <RecipeHeader recipe={recipe} />
          <RecipeContent recipe={recipe} />
        </main>
      </div>
    );
  } catch (error) {
    console.error("Falha ao buscar a receita:", error);
    notFound();
  }
}