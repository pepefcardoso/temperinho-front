import { Suspense } from 'react';
import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { getFavoritePosts } from '@/lib/api/blog';
import { UserFavoritesArticlesClient } from '@/components/blog/UserFavoritesArticlesClient';
import { PageSkeleton } from '@/components/skeletons/PageSkeleton';

export const metadata: Metadata = {
    title: 'Artigos Favoritos | Leve Sabor',
    description: 'Acesse e gerencie seus artigos salvos para leitura e consulta rápida.',
};

interface PageProps {
  searchParams: {
    search?: string;
    category_id?: string;
  };
}

async function FavoritesLoader({ searchParams }: PageProps) {
    try {
        const paginatedResponse = await getFavoritePosts({
            search: searchParams.search,
            categoryId: searchParams.category_id,
        });
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
    } catch (error) {
        console.error("Falha ao carregar artigos favoritos:", error);
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-bold text-destructive">Ocorreu um Erro</h2>
                <p className="text-muted-foreground mt-2">Não foi possível carregar seus artigos favoritos. Tente novamente mais tarde.</p>
            </div>
        );
    }
}

export default function UserFavoriteArticlesPage({ searchParams }: PageProps) {
    return (
        <div className="container mx-auto py-8">
            <Suspense
                key={JSON.stringify(searchParams)}
                fallback={<PageSkeleton layout="single-column" />}
            >
                <FavoritesLoader searchParams={searchParams} />
            </Suspense>
        </div>
    );
}