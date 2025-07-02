import type { Metadata } from 'next';
import { getRecipes } from '@/lib/api/recipe';
import { RecipesPageClient } from '@/components/recipe/RecipePageClient';

export const metadata: Metadata = {
  title: 'Receitas | Leve Sabor',
  description: 'Explore centenas de receitas deliciosas e inclusivas, com filtros para todas as suas necessidades.',
};

type SortByType = 'created_at' | 'time' | 'difficulty';

interface RecipesPageProps {
  searchParams: {
    sortBy?: SortByType;
    diets?: string;
  }
}

export default async function RecipesPage({ searchParams }: RecipesPageProps) {
  const dietFilters = searchParams.diets
    ? searchParams.diets.split(',').map(Number).filter(id => !isNaN(id))
    : [];

  const paginatedResponse = await getRecipes({
    sortBy: searchParams.sortBy,
    filters: {
      diets: dietFilters,
    },
    page: 1,
    limit: 9,
  });

  return (
    <div className="bg-background">
      <main>
        <section className="bg-muted/50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">Nossas Receitas</h1>
            <p className="text-lg text-muted-foreground">Encontre o prato perfeito para qualquer ocasião.</p>
          </div>
        </section>
        <RecipesPageClient
          initialRecipes={paginatedResponse.data}
          initialMeta={paginatedResponse.meta}
        />
      </main>
    </div>
  );
}
