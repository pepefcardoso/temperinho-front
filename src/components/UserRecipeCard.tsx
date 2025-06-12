'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Edit, Trash2, Eye, Heart, Clock, Users } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { toast } from 'sonner';

import type { UserManagedRecipe } from '@/types/user';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { deleteRecipeAction } from '@/app/usuario/receitas/actions';

const statusBadgeVariants = cva("font-semibold", {
    variants: {
        status: {
            publicado: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
            rascunho: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-800",
            pendente: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800",
        }
    }
});

export function UserRecipeCard({ recipe }: { recipe: UserManagedRecipe }) {
    const handleDelete = async () => {
        if (confirm(`Tem certeza que deseja deletar a receita "${recipe.name}"?`)) {
            toast.loading("Deletando receita...");
            const result = await deleteRecipeAction(recipe.id);
            toast.dismiss();
            if (result.success) toast.success(result.message);
            else toast.error("Falha ao deletar.");
        }
    }

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-48 h-32 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={recipe.imageUrl} alt={recipe.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{recipe.name}</h3>
                        <Badge className={cn(statusBadgeVariants({ status: recipe.status }))}>{recipe.status}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground space-x-4 mt-auto pt-2 border-t">
                        <div className="flex items-center gap-1"><Eye className="h-3 w-3" /> {recipe.views}</div>
                        <div className="flex items-center gap-1"><Heart className="h-3 w-3" /> {recipe.likes}</div>
                        <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {recipe.totalTime}</div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                    <Button variant="outline" size="icon" asChild><Link href={`/usuario/receitas/editar/${recipe.slug}`}><Edit className="h-4 w-4" /></Link></Button>
                    <Button variant="destructive-outline" size="icon" onClick={handleDelete}><Trash2 className="h-4 w-4" /></Button>
                </div>
            </CardContent>
        </Card>
    );
}