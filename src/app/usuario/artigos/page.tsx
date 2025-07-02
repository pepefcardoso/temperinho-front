import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getMyPosts } from '@/lib/api/blog';
import { Button } from '@/components/ui/button';
import { UserArticlesClient } from '@/components/blog/UserArticlesClient';

export const metadata: Metadata = {
    title: 'Meus Artigos | Leve Sabor',
    description: 'Gerencie, edite e crie seus artigos e posts para a comunidade Leve Sabor.',
};

export default async function UserMyArticlesPage() {
    const paginatedResponse = await getMyPosts();

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">Meus Artigos</h1>
                    <p className="text-muted-foreground">Gerencie seus artigos publicados e rascunhos.</p>
                </div>
                <Button asChild><Link href="/usuario/artigos/novo"><Plus className="h-4 w-4 mr-2" />Novo Artigo</Link></Button>
            </div>

            <UserArticlesClient initialArticles={paginatedResponse.data} />
        </div>
    );
}
