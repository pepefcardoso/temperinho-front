'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Recipe, RecipeDifficultyEnum } from '@/types/recipe';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toggleFavoriteRecipe } from '@/lib/api/user';

const difficultyStyles: Record<RecipeDifficultyEnum, string> = {
    [RecipeDifficultyEnum.FACIL]: 'text-primary',
    [RecipeDifficultyEnum.MEDIO]: 'text-amber-500',
    [RecipeDifficultyEnum.DIFICIL]: 'text-destructive',
};

interface FavoriteRecipeCardProps {
    recipe: Recipe;
    onRemove: (id: number) => void;
}

export function FavoriteRecipeCard({ recipe, onRemove }: FavoriteRecipeCardProps) {
    const handleRemoveFavorite = async () => {
        toast.loading("Removendo favorito...");
        try {
            await toggleFavoriteRecipe(recipe.id);
            toast.dismiss();
            toast.success("Receita removida dos favoritos!");
            onRemove(recipe.id);
        } catch (error) {
            toast.dismiss();
            toast.error("Falha ao remover o favorito. Tente novamente.");
            console.error(error);
        }
    }

    const slug = recipe.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                        src={recipe.image?.url ?? '/images/placeholder.png'}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <Badge variant="secondary" className="mb-2">{recipe.category?.name ?? 'Receita'}</Badge>
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{recipe.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center flex-wrap text-xs text-muted-foreground gap-x-4 gap-y-1">
                        <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {recipe.time} min</div>
                        <div className="flex items-center gap-1"><Users className="h-3 w-3" /> {recipe.portion} porções</div>
                        {recipe.difficulty && (
                            <div className={cn("font-medium", difficultyStyles[recipe.difficulty])}>{recipe.difficulty}</div>
                        )}
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col gap-2 w-full sm:w-auto self-start pt-2 sm:pt-0">
                    <Button variant="default" size="sm" asChild className="w-full">
                        <Link href={`/receitas/${slug}`}>Ver Receita</Link>
                    </Button>
                    <Button variant="destructive" size="sm" onClick={handleRemoveFavorite} className="w-full">
                        <Heart className="h-4 w-4 mr-2" />Remover
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
