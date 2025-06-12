'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Clock, Users } from 'lucide-react'; // Adicionado ChefHat
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import type { UserFavoriteRecipe } from '@/types/user';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { removeFavoriteRecipeAction } from '@/app/usuario/favoritos/receitas/actions';
import { cn } from '@/lib/utils';
import type { Difficulty } from '@/types/recipe';

const difficultyStyles: Record<Difficulty, string> = {
    'Fácil': 'text-primary',
    'Médio': 'text-amber-500',
    'Difícil': 'text-destructive',
};

export function FavoriteRecipeCard({ recipe }: { recipe: UserFavoriteRecipe }) {
    const handleRemoveFavorite = async () => {
        toast.loading("Removendo favorito...");
        const result = await removeFavoriteRecipeAction(recipe.id);
        toast.dismiss();

        // CORREÇÃO: Ternário substituído por if/else para legibilidade e conformidade com o linter.
        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error("Falha ao remover.");
        }
    }

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={recipe.imageUrl} alt={recipe.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                    <Badge variant="secondary" className="mb-2">{recipe.category || 'Receita'}</Badge>
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{recipe.name}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center flex-wrap text-xs text-muted-foreground gap-x-4 gap-y-1">
                        <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {recipe.totalTime}</div>
                        <div className="flex items-center gap-1"><Users className="h-3 w-3" /> {recipe.servings}</div>
                        <div className={cn("font-medium", difficultyStyles[recipe.difficulty])}>{recipe.difficulty}</div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-3">Favoritada em {format(new Date(recipe.favoritedAt), "dd/MM/yyyy", { locale: ptBR })}</p>
                </div>
                <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto self-start pt-2 sm:pt-0">
                    <Button variant="default" size="sm" asChild className="w-full"><Link href={`/receitas/${recipe.slug}`}>Ver Receita</Link></Button>
                    <Button variant="destructive" size="sm" onClick={handleRemoveFavorite} className="w-full"><Heart className="h-4 w-4 mr-2" />Remover</Button>
                </div>
            </CardContent>
        </Card>
    );
}