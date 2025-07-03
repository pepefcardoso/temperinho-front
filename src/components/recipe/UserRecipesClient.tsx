'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { UserRecipeCard } from './UserRecipeCard';
import type { Recipe, RecipeCategory } from '@/types/recipe';
import { getRecipeCategories } from '@/lib/api/recipe';

interface UserRecipesClientProps {
    initialRecipes: Recipe[];
}

export function UserRecipesClient({ initialRecipes }: UserRecipesClientProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
    const [categories, setCategories] = useState<RecipeCategory[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoadingCategories(true);
            try {
                const fetchedCategories = await getRecipeCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Falha ao buscar categorias de receita:", error);
            } finally {
                setIsLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    const handleFilterChange = (key: 'title' | 'category_id', value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'todas') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const debouncedSearch = useDebouncedCallback(value => {
        handleFilterChange('title', value);
    }, 500);

    const handleRecipeDelete = (deletedRecipeId: number) => {
        setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== deletedRecipeId));
    };

    return (
        <>
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Buscar por título..."
                                defaultValue={searchParams.get('title') || ''}
                                onChange={(e) => debouncedSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="sm:w-48">
                            {isLoadingCategories ? (
                                <Skeleton className="h-10 w-full" />
                            ) : (
                                <Select
                                    defaultValue={searchParams.get('category_id') || 'todas'}
                                    onValueChange={(value) => handleFilterChange('category_id', value)}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todas">Todas as Categorias</SelectItem>
                                        {categories.map(category => (
                                            <SelectItem key={category.id} value={String(category.id)}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4 mt-6">
                {recipes.length > 0 ? (
                    recipes.map((recipe) => (
                        <UserRecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onDelete={handleRecipeDelete}
                        />
                    ))
                ) : (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <h3 className="text-lg font-medium text-foreground">Nenhuma receita encontrada</h3>
                        <p className="text-muted-foreground mt-2 mb-6">Tente ajustar seus filtros ou crie uma nova receita.</p>
                        <Button asChild><Link href="/usuario/receitas/nova"><Plus className="h-4 w-4 mr-2" />Criar Receita</Link></Button>
                    </div>
                )}
            </div>
        </>
    );
}