import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';

import { getMyRecipes } from '@/lib/api/recipe';
import { Button } from '@/components/ui/button';
import { UserRecipesClient } from '@/components/recipe/UserRecipesClient';

export const metadata: Metadata = {
    title: 'Minhas Receitas | Leve Sabor',
    description: 'Gerencie, edite e crie suas próprias receitas deliciosas na plataforma Leve Sabor.',
};

export default async function UserMyRecipesPage() {
    const paginatedResponse = await getMyRecipes();

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
}
