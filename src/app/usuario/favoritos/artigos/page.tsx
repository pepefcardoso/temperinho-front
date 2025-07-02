import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { getFavoritePosts } from '@/lib/api/blog';
import { UserFavoritesArticlesClient } from '@/components/blog/UserFavoritesArticlesClient';

export const metadata: Metadata = {
    title: 'Artigos Favoritos | Leve Sabor',
    description: 'Acesse e gerencie seus artigos salvos para leitura e consulta rápida.',
};

export default async function UserFavoriteArticlesPage() {
    const paginatedResponse = await getFavoritePosts();
    const favoriteArticles = paginatedResponse.data;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">Artigos Favoritos</h1>
                    <p className="text-muted-foreground">Seus artigos salvos para leitura e consulta.</p>
                </div>
                <div className="flex items-center text-primary font-semibold">
                    <BookOpen className="h-5 w-5 mr-2" />
                    <span>{paginatedResponse.meta.total} artigos salvos</span>
                </div>
            </div>
            <UserFavoritesArticlesClient initialArticles={favoriteArticles} />
        </div>
    );
}
