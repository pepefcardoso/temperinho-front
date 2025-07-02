import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { getUserArticles, getUserArticleStats } from '@/lib/api/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserArticlesClient } from '@/components/blog/UserArticlesClient';

export const metadata: Metadata = {
    title: 'Meus Artigos | Leve Sabor',
};

interface MyArticlesPageProps {
    searchParams?: {
        q?: string;
        status?: 'publicado' | 'rascunho' | 'pendente';
    }
}

export default async function UserMyArticlesPage({ searchParams }: MyArticlesPageProps) {
    // A busca e filtro acontecem no servidor!
    const articles = await getUserArticles(searchParams);
    const stats = await getUserArticleStats();

    return (
        // Assumindo que o UserLayout é aplicado pelo layout.tsx da rota /usuario
        <div className="container mx-auto py-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">Meus Artigos</h1>
                    <p className="text-muted-foreground">Gerencie seus artigos publicados e rascunhos.</p>
                </div>
                <Button asChild><Link href="/usuario/artigos/novo"><Plus className="h-4 w-4 mr-2" />Novo Artigo</Link></Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-primary">{stats.published}</div><p className="text-sm text-muted-foreground">Publicados</p></CardContent></Card>
                <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-amber-500">{stats.drafts}</div><p className="text-sm text-muted-foreground">Rascunhos</p></CardContent></Card>
                <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-foreground">{stats.totalViews.toLocaleString('pt-BR')}</div><p className="text-sm text-muted-foreground">Visualizações</p></CardContent></Card>
            </div>

            <UserArticlesClient articles={articles} />
        </div>
    );
}