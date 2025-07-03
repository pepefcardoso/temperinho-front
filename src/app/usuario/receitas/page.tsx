import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { getMyRecipes } from '@/lib/api/recipe';
import { Button } from '@/components/ui/button';
import { UserRecipesClient } from '@/components/recipe/UserRecipesClient';
import { PageSkeleton } from '@/components/skeletons/PageSkeleton';

export const metadata: Metadata = {
    title: 'Minhas Receitas | Leve Sabor',
    description: 'Gerencie, edite e crie suas próprias receitas deliciosas na plataforma Leve Sabor.',
};

interface PageProps {
    searchParams: {
        title?: string;
        category_id?: string;
    };
}

async function RecipesLoader({ searchParams }: PageProps) {
    try {
        const paginatedResponse = await getMyRecipes({
            title: searchParams.title,
            categoryId: searchParams.category_id,
        });

        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-1">Minhas Receitas</h1>
                        <p className="text-muted-foreground">Gerencie suas receitas publicadas e rascunhos.</p>
                    </div>
                    <Button asChild><Link href="/usuario/receitas/nova"><Plus className="h-4 w-4 mr-2" />Nova Receita</Link></Button>
                </div>
                <UserRecipesClient initialRecipes={paginatedResponse.data} />
            </div>
        );
    } catch (error) {
        console.error("Falha ao carregar as receitas do usuário:", error);
        return (
            <div className="text-center py-16">
                <h2 className="text-xl font-bold text-destructive">Ocorreu um Erro</h2>
                <p className="text-muted-foreground mt-2">Não foi possível carregar suas receitas. Tente novamente mais tarde.</p>
            </div>
        );
    }
}

export default function UserMyRecipesPage({ searchParams }: PageProps) {
    return (
        <div className="container mx-auto py-8">
            <Suspense
                key={JSON.stringify(searchParams)}
                fallback={<PageSkeleton layout="single-column" />}
            >
                <RecipesLoader searchParams={searchParams} />
            </Suspense>
        </div>
    );
}