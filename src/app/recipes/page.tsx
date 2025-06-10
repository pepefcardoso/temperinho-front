// src/app/receitas/page.tsx

"use client";

import { useState, useMemo } from 'react';
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';



// Componentes de UI
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import AdBanner from '@/components/AdBanner';
import DietaryFilters from '@/components/DietaryFilters';
import RecipeCard from '@/components/RecipeCard';

// --- Tipos e Dados ---
export type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: string;
  servings: number;
  difficulty: 'Fácil' | 'Médio' | 'Difícil';
  rating: number;
  dietaryTags: string[];
  author: string;
};

const mockRecipes: Recipe[] = [
  { id: '1', title: 'Brownies Veganos de Chocolate', description: 'Deliciosos brownies veganos...', image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop', prepTime: '45 min', servings: 8, difficulty: 'Fácil', rating: 4.8, dietaryTags: ['Vegano', 'Sem Lactose'], author: 'Maria Silva' },
  { id: '2', title: 'Risotto de Cogumelos sem Glúten', description: 'Um risotto cremoso...', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop', prepTime: '35 min', servings: 4, difficulty: 'Médio', rating: 4.6, dietaryTags: ['Sem Glúten', 'Vegetariano'], author: 'João Costa' },
  { id: '3', title: 'Salada Buddha Bowl Completa', description: 'Uma salada nutritiva...', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop', prepTime: '25 min', servings: 2, difficulty: 'Fácil', rating: 4.9, dietaryTags: ['Vegano', 'Sem Glúten', 'Low FODMAP'], author: 'Ana Ferreira' },
  { id: '4', title: 'Pão de Alho Sem Lactose', description: 'Pão de alho crocante...', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop', prepTime: '20 min', servings: 6, difficulty: 'Fácil', rating: 4.7, dietaryTags: ['Sem Lactose', 'Vegetariano'], author: 'Pedro Santos' },
  { id: '5', title: 'Smoothie Bowl Proteico', description: 'Um smoothie bowl nutritivo...', image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&h=300&fit=crop', prepTime: '10 min', servings: 1, difficulty: 'Fácil', rating: 4.5, dietaryTags: ['Vegano', 'Sem Glúten'], author: 'Carla Lima' },
  { id: '6', title: 'Lasanha de Abobrinha Low FODMAP', description: 'Uma lasanha leve e saborosa...', image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop', prepTime: '60 min', servings: 6, difficulty: 'Médio', rating: 4.4, dietaryTags: ['Low FODMAP', 'Sem Glúten', 'Vegetariano'], author: 'Roberto Alves' },
];


export default function RecipesPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [mealType, setMealType] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const handleFiltersChange = (filters: string[]) => {
    setSelectedFilters(filters);
  };

  const handleFavorite = (recipeId: string) => {
    setFavorites(prev => prev.includes(recipeId) ? prev.filter(id => id !== recipeId) : [...prev, recipeId]);
  };

  const filteredAndSortedRecipes = useMemo(() => {
    let recipes = [...mockRecipes];

    // Lógica de Filtro
    if (selectedFilters.length > 0) {
      recipes = recipes.filter(recipe => 
        selectedFilters.every(filter => recipe.dietaryTags.includes(filter))
      );
    }
    // Adicionar lógica para 'mealType' aqui se os dados tivessem essa informação

    // Lógica de Ordenação
    switch (sortBy) {
      case 'rating':
        recipes.sort((a, b) => b.rating - a.rating);
        break;
      case 'time':
        recipes.sort((a, b) => parseInt(a.prepTime) - parseInt(b.prepTime));
        break;
      case 'difficulty':
        const difficultyOrder = { 'Fácil': 1, 'Médio': 2, 'Difícil': 3 };
        recipes.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      case 'recent':
      default:
        // Mantém a ordem original, assumida como mais recente
        break;
    }

    return recipes;
  }, [selectedFilters, sortBy, mealType]);


  return (
    // O Header e o Footer foram removidos pois estão no layout.tsx
    <main>
      {/* Page Header */}
      <section className="bg-muted/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Receitas Inclusivas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra receitas deliciosas que respeitam suas restrições alimentares
            </p>
          </div>
          <AdBanner size="large" position="top" className="mb-8" />
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DietaryFilters
            selectedFilters={selectedFilters}
            onFiltersChange={handleFiltersChange}
          />
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-4">
              <Select value={mealType} onValueChange={setMealType}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Tipo de Refeição" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="breakfast">Café da Manhã</SelectItem>
                  <SelectItem value="lunch">Almoço</SelectItem>
                  <SelectItem value="dinner">Jantar</SelectItem>
                  <SelectItem value="dessert">Sobremesa</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40"><SelectValue placeholder="Ordenar por" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Mais Recentes</SelectItem>
                  <SelectItem value="rating">Melhor Avaliadas</SelectItem>
                  <SelectItem value="time">Tempo de Preparo</SelectItem>
                  <SelectItem value="difficulty">Dificuldade</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 ml-auto">
              <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('grid')}>
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant={viewMode === 'list' ? 'default' : 'outline'} size="sm" onClick={() => setViewMode('list')}>
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  {filteredAndSortedRecipes.length} receita{filteredAndSortedRecipes.length !== 1 ? 's' : ''} encontrada{filteredAndSortedRecipes.length !== 1 ? 's' : ''}
                </h2>
              </div>
              <div className={cn('grid gap-8', viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1')}>
                {filteredAndSortedRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onFavorite={handleFavorite}
                    isFavorited={favorites.includes(recipe.id)}
                    // viewMode={viewMode}
                  />
                ))}
              </div>
              <div className="my-12"><AdBanner size="medium" position="middle" /></div>
              <div className="text-center mt-12">
                <Button size="lg">Carregar Mais Receitas</Button>
              </div>
            </div>
            <aside className="hidden lg:block w-80 space-y-6 flex-shrink-0">
              <AdBanner size="medium" position="sidebar" />
              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <h3 className="font-semibold text-foreground mb-4">Receitas Populares</h3>
                <div className="space-y-4">
                  {mockRecipes.slice(0, 3).map((recipe) => (
                    <div key={recipe.id} className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">{recipe.title}</h4>
                        <p className="text-xs text-muted-foreground">por {recipe.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <AdBanner size="small" position="sidebar" />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};