import type { Metadata } from 'next';
import { Heart } from 'lucide-react';
import { getFavoriteRecipes } from '@/lib/api/user';
import { UserFavoritesRecipesClient } from '@/components/UserFavoritesRecipesClient';

export const metadata: Metadata = {
    title: 'Receitas Favoritas | Leve Sabor',
};

interface MyFavoriteRecipesPageProps {
    searchParams?: { q?: string; category?: string; }
}

export default async function UserFavoriteRecipesPage({ searchParams }: MyFavoriteRecipesPageProps) {
    const favoriteRecipes = await getFavoriteRecipes(searchParams);

    return (
        <div className="container mx-auto py-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">Receitas Favoritas</h1>
                    <p className="text-muted-foreground">Suas receitas salvas para consultar quando quiser.</p>
                </div>
                <div className="flex items-center text-primary font-semibold">
                    <Heart className="h-5 w-5 mr-2 fill-current" />
                    <span>{favoriteRecipes.length} receitas salvas</span>
                </div>
            </div>
            <UserFavoritesRecipesClient recipes={favoriteRecipes} />
        </div>
    );
}