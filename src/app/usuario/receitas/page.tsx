import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { getUserRecipes, getUserRecipeStats } from '@/lib/api/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { UserRecipesClient } from '@/components/UserRecipesClient';

export const metadata: Metadata = {
    title: 'Minhas Receitas | Leve Sabor',
};

interface MyRecipesPageProps {
    searchParams?: {
        q?: string;
        status?: 'publicado' | 'rascunho' | 'pendente';
    }
}

export default async function UserMyRecipesPage({ searchParams }: MyRecipesPageProps) {
    const recipes = await getUserRecipes(searchParams);
    const stats = await getUserRecipeStats();

    return (
        <div className="container mx-auto py-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">Minhas Receitas</h1>
                    <p className="text-muted-foreground">Gerencie suas receitas publicadas e rascunhos.</p>
                </div>
                <Button asChild><Link href="/usuario/receitas/nova"><Plus className="h-4 w-4 mr-2" />Nova Receita</Link></Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-primary">{stats.published}</div><p className="text-sm text-muted-foreground">Publicadas</p></CardContent></Card>
                <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-amber-500">{stats.drafts}</div><p className="text-sm text-muted-foreground">Rascunhos</p></CardContent></Card>
                <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-foreground">{stats.totalViews.toLocaleString('pt-BR')}</div><p className="text-sm text-muted-foreground">Visualizações</p></CardContent></Card>
            </div>

            <UserRecipesClient recipes={recipes} />
        </div>
    );
}