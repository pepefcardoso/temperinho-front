'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { Search, Heart } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { FavoriteRecipeCard } from './FavoriteRecipeCard';
import type { UserFavoriteRecipe } from '@/types/user';
import { Button } from './ui/button';

// CORREÇÃO 1: A interface de props agora espera 'recipes'
interface UserFavoritesClientProps {
    recipes: UserFavoriteRecipe[];
}

export function UserFavoritesRecipesClient({ recipes }: UserFavoritesClientProps) { // CORREÇÃO 2: A prop desestruturada agora é 'recipes'
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilter = (key: 'q' | 'category', value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'todas') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const debouncedSearch = useDebouncedCallback((value: string) => handleFilter('q', value), 500);

    // CORREÇÃO 3: Usa 'recipes' para gerar a lista de categorias
    const categories = ['todas', ...Array.from(new Set(recipes.map(r => r.category || 'Outros')))];

    return (
        <>
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Buscar nos seus favoritos..."
                                defaultValue={searchParams.get('q') || ''}
                                onChange={e => debouncedSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="sm:w-56">
                            <Select
                                defaultValue={searchParams.get('category') || 'todas'}
                                onValueChange={value => handleFilter('category', value)}
                            >
                                <SelectTrigger><SelectValue placeholder="Filtrar por categoria" /></SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => <SelectItem key={cat} value={cat.toLowerCase()} className="capitalize">{cat}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4 mt-6">
                {/* CORREÇÃO 4: Usa 'recipes' para o map e para verificar o tamanho */}
                {recipes.length > 0 ? (
                    recipes.map(recipe => <FavoriteRecipeCard key={recipe.id} recipe={recipe} />)
                ) : (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg bg-card">
                        <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium text-foreground">Nenhuma receita encontrada</h3>
                        <p className="text-muted-foreground mt-2 mb-6">
                            {searchParams.get('q') || searchParams.get('category')
                                ? 'Tente ajustar seus filtros de busca.'
                                : 'Explore nossas receitas e salve as que você mais ama.'
                            }
                        </p>
                        <Button asChild><Link href="/receitas">Explorar Receitas</Link></Button>
                    </div>
                )}
            </div>
        </>
    );
}