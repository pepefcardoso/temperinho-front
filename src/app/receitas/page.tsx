import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getRecipes } from '@/lib/api/recipe';
import { RecipesPageClient } from '@/components/recipe/RecipePageClient';
import { PageSkeleton } from '@/components/skeletons/PageSkeleton';

export const metadata: Metadata = {
  title: 'Receitas | Leve Sabor',
  description: 'Explore centenas de receitas deliciosas e inclusivas.',
};

type RecipesPageProps = {
  searchParams: {
    title?: string;
    category_id?: string;
    sortBy?: 'created_at' | 'time' | 'difficulty';
    diets?: string;
  };
};

async function RecipesList({ searchParams }: RecipesPageProps) {
  const dietFilters = searchParams.diets
    ? searchParams.diets.split(',').map(Number).filter(id => !isNaN(id))
    : [];

  const paginatedResponse = await getRecipes({
    sortBy: searchParams.sortBy,
    filters: {
      title: searchParams.title,
      category_id: searchParams.category_id ? Number(searchParams.category_id) : undefined,
      diets: dietFilters,
    },
    page: 1,
    limit: 9,
  });

  return (
    <RecipesPageClient
      initialRecipes={paginatedResponse.data}
      initialMeta={paginatedResponse.meta}
    />
  );
}

export default function RecipesPage({ searchParams }: RecipesPageProps) {
  return (
    <main>
      <section className="bg-muted/50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">
            Nossas Receitas
          </h1>
          <p className="text-lg text-muted-foreground">
            Encontre o prato perfeito para qualquer ocasião.
          </p>
        </div>
      </section>

      <Suspense
        key={JSON.stringify(searchParams)}
        fallback={<PageSkeleton layout="content-sidebar" sidebarPosition="right" />}
      >
        <RecipesList searchParams={searchParams} />
      </Suspense>
    </main>
  );
}