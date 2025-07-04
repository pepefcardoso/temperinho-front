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
  searchParams: Promise<{
    title?: string;
    category_id?: string;
    sortBy?: 'created_at' | 'time' | 'difficulty';
    diets?: string;
  }>;
}

async function RecipesLoader({
  searchParams,
}: PageProps) {
  const sp = await searchParams;

  const dietFilters = sp.diets
    ? sp.diets.split(',').map(Number).filter(id => !isNaN(id))
    : [];

  const paginatedResponse = await getRecipes({
    sortBy: sp.sortBy,
    filters: {
      title: sp.title,
      category_id: sp.category_id ? Number(sp.category_id) : undefined,
      diets: dietFilters,
    },
    page: 1,
    limit: 9,
  });

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
      <RecipesPageClient
        initialRecipes={paginatedResponse.data}
        initialMeta={paginatedResponse.meta}
      />
    </main>
  );
}

export default async function RecipesPage({ searchParams }: PageProps) {
  const sp = await searchParams;

  return (
    <div className="bg-background">
      <Suspense
        key={JSON.stringify(sp)}
        fallback={<PageSkeleton layout="content-sidebar" sidebarPosition="right" />}
      >
        <RecipesLoader searchParams={Promise.resolve(sp)} />
      </Suspense>
    </div>
  );
}
