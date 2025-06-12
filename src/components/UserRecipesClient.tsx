'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { UserRecipeCard } from './UserRecipeCard';
import type { UserManagedRecipe } from '@/types/user';
import Link from 'next/link';

interface UserRecipesClientProps {
    recipes: UserManagedRecipe[];
}

export function UserRecipesClient({ recipes }: UserRecipesClientProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilterChange = (key: 'q' | 'status', value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'todas') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const debouncedSearch = useDebouncedCallback(value => {
        handleFilterChange('q', value);
    }, 500);

    return (
        <>
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input placeholder="Buscar por título..." defaultValue={searchParams.get('q') || ''} onChange={(e) => debouncedSearch(e.target.value)} className="pl-10" />
                        </div>
                        <div className="sm:w-48">
                            <Select defaultValue={searchParams.get('status') || 'todas'} onValueChange={(value) => handleFilterChange('status', value)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todas">Todos os Status</SelectItem>
                                    <SelectItem value="publicado">Publicadas</SelectItem>
                                    <SelectItem value="rascunho">Rascunhos</SelectItem>
                                    <SelectItem value="pendente">Pendentes</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4 mt-6">
                {recipes.length === 0 ? (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <h3 className="text-lg font-medium text-foreground">Nenhuma receita encontrada</h3>
                        <p className="text-muted-foreground mt-2 mb-6">Tente ajustar seus filtros ou crie uma nova receita.</p>
                        <Button asChild><Link href="/usuario/receitas/nova"><Plus className="h-4 w-4 mr-2" />Criar Receita</Link></Button>
                    </div>
                ) : (
                    recipes.map((recipe) => <UserRecipeCard key={recipe.id} recipe={recipe} />)
                )}
            </div>
        </>
    );
}