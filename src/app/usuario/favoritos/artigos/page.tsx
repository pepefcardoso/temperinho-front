import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { getFavoriteArticles } from '@/lib/api/user';
import { UserFavoritesArticlesClient } from '@/components/blog/UserFavoritesArticlesClient';

export const metadata: Metadata = {
    title: 'Meus Favoritos | Leve Sabor',
};

interface MyFavoritesPageProps {
    searchParams?: { q?: string; category?: string; }
}

export default async function UserFavoriteArticlesPage({ searchParams }: MyFavoritesPageProps) {
    // A busca e filtro acontecem no servidor!
    const favoriteArticles = await getFavoriteArticles(searchParams);

    return (
        // Assumindo que o UserLayout é aplicado pelo layout.tsx da rota /usuario
        <div className="container mx-auto py-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">Artigos Favoritos</h1>
                    <p className="text-muted-foreground">Seus artigos salvos para leitura e consulta.</p>
                </div>
                <div className="flex items-center text-primary font-semibold">
                    <BookOpen className="h-5 w-5 mr-2" />
                    <span>{favoriteArticles.length} artigos salvos</span>
                </div>
            </div>
            <UserFavoritesArticlesClient articles={favoriteArticles} />
        </div>
    );
}