import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getRecipes } from '@/lib/api/recipe';
import { RecipesPageClient } from '@/components/recipe/RecipePageClient';
import { PageSkeleton } from '@/components/skeletons/PageSkeleton';

export const metadata: Metadata = {
  title: 'Receitas | Leve Sabor',
  description: 'Explore centenas de receitas deliciosas e inclusivas.',
};

interface PageProps {
  searchParams: {
    sortBy?: 'created_at' | 'time' | 'difficulty';
    diets?: string;
  };
}

async function RecipesLoader({ searchParams }: PageProps) {
  try {
    const dietFilters = searchParams.diets
      ? searchParams.diets.split(',').map(Number).filter(id => !isNaN(id))
      : [];

    const paginatedResponse = await getRecipes({
      sortBy: searchParams.sortBy,
      filters: { diets: dietFilters },
      page: 1,
      limit: 9,
    });

    return (
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
    );
  } catch (error) {
    console.error("Falha ao carregar a página de receitas:", error);
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-destructive">Não foi possível carregar as receitas. Tente novamente mais tarde.</p>
      </div>
    );
  }
}

export default function RecipesPage({ searchParams }: PageProps) {
  return (
    <div className="bg-background">
      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<PageSkeleton layout="content-sidebar" sidebarPosition="right" />}
      >
        <RecipesLoader searchParams={searchParams} />
      </Suspense>
    </div>
  );
}