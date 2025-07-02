'use client';

import { useState, useTransition } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Grid, List, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import DietaryFilters from '@/components/DietaryFilters';
import RecipeCard from '@/components/RecipeCard';
import type { Recipe, DietaryTag } from '@/types/recipe';
import { fetchMoreRecipes } from '@/app/receitas/actions';
import AdBanner from './marketing/AdBanner';
import Link from 'next/link';

interface RecipesPageClientProps {
  initialRecipes: Recipe[];
  initialSortBy?: 'recent' | 'rating' | 'time' | 'difficulty';
}

export function RecipesPageClient({ initialRecipes, initialSortBy = 'recent' }: RecipesPageClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Estados da UI
  const [recipes, setRecipes] = useState(initialRecipes);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Estados da Paginação
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(initialRecipes.length === 9); // Assumindo limite de 9 por página
  const [isLoadingMore, startTransition] = useTransition();

  // Função para atualizar a URL (dispara recarregamento no servidor)
  const handleUrlChange = (key: 'sortBy' | 'filters', value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    if (!value) {
      current.delete(key);
    } else {
      current.set(key, value);
    }
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const handleDietaryFiltersChange = (filters: DietaryTag[]) => {
    handleUrlChange('filters', filters.join(','));
  };

  // Função para carregar mais receitas com Server Action
  const loadMoreRecipes = () => {
    startTransition(async () => {
      const currentSortBy = searchParams.get('sortBy') as 'recent' | 'rating' | 'time' | 'difficulty' || 'recent';
      const currentFilters = (searchParams.get('filters')?.split(',') || []) as DietaryTag[];

      const newRecipes = await fetchMoreRecipes({ page, filters: currentFilters, sortBy: currentSortBy });

      if (newRecipes.length > 0) {
        setRecipes(prev => [...prev, ...newRecipes]);
        setPage(prev => prev + 1);
      }
      if (newRecipes.length < 9) {
        setHasMore(false);
      }
    });
  };

  const currentDietaryFilters = (searchParams.get('filters')?.split(',') || []) as DietaryTag[];

  return (
    <>
      <section className="py-8 bg-card border-b sticky top-16 z-10">
        <div className="container mx-auto px-4">
          <DietaryFilters
            selectedFilters={currentDietaryFilters}
            onFiltersChange={handleDietaryFiltersChange}
          />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <Select value={initialSortBy} onValueChange={(value) => handleUrlChange('sortBy', value)}>
              <SelectTrigger className="w-48"><SelectValue placeholder="Ordenar por" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais Recentes</SelectItem>
                <SelectItem value="rating">Melhor Avaliadas</SelectItem>
                <SelectItem value="time">Tempo de Preparo</SelectItem>
                <SelectItem value="difficulty">Dificuldade</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-muted-foreground mr-2">Visualizar como:</p>
              <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('grid')} aria-label="Ver em grade"><Grid className="h-4 w-4" /></Button>
              <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="icon" onClick={() => setViewMode('list')} aria-label="Ver em lista"><List className="h-4 w-4" /></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Mostrando {recipes.length} receita{recipes.length !== 1 ? 's' : ''}
                </h2>
              </div>

              {recipes.length > 0 ? (
                <div className={cn('grid gap-8', viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')}>
                  {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} viewMode={viewMode} />)}
                </div>
              ) : (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">Nenhuma receita encontrada para os filtros selecionados.</p>
                </div>
              )}

              <div className="text-center mt-12">
                {hasMore && (
                  <Button size="lg" onClick={loadMoreRecipes} disabled={isLoadingMore}>
                    {isLoadingMore && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Carregar Mais Receitas
                  </Button>
                )}
              </div>
            </div>

            <aside className="hidden lg:block w-80 space-y-6 flex-shrink-0">
              <AdBanner href='/anuncie' layout="sidebar" />
              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <h3 className="font-semibold text-foreground mb-4">Anuncie Aqui</h3>
                <p className="text-sm text-muted-foreground">Alcance um público engajado e apaixonado por culinária. <Link href="/marketing" className="text-primary underline">Saiba mais</Link>.</p>
              </div>
              <AdBanner href='/anuncie' layout="sidebar" size="small" />
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}