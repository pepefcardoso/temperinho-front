'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Edit, Trash2, Star, Clock } from 'lucide-react';
import { toast } from 'sonner';
import type { Recipe } from '@/types/recipe';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { deleteRecipe } from '@/lib/api/recipe';

interface UserRecipeCardProps {
    recipe: Recipe;
    onDelete: (id: number) => void;
}

export function UserRecipeCard({ recipe, onDelete }: UserRecipeCardProps) {
    const handleDelete = async () => {
        if (window.confirm(`Tem certeza que deseja deletar a receita "${recipe.title}"?`)) {
            toast.loading("Deletando receita...");
            try {
                await deleteRecipe(recipe.id);
                toast.dismiss();
                toast.success("Receita deletada com sucesso!");
                onDelete(recipe.id);
            } catch (error) {
                toast.dismiss();
                toast.error("Falha ao deletar a receita. Tente novamente.");
                console.error("Erro ao deletar receita:", error);
            }
        }
    };

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col sm:flex-row gap-4">
                <div className="relative w-full sm:w-48 h-32 sm:h-auto flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                        src={recipe.image?.url ?? '/images/placeholder.png'}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{recipe.title}</h3>
                        {recipe.category && (
                            <Badge variant="secondary">{recipe.category.name}</Badge>
                        )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{recipe.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground space-x-4 mt-auto pt-2 border-t">
                        <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-500" />
                            {(recipe.average_rating ?? 0).toFixed(1)} ({recipe.ratings_count ?? 0} avaliações)
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {recipe.time} min
                        </div>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2 self-start pt-2 sm:pt-0">
                    <Button variant="outline" size="icon" asChild title="Editar receita">
                        <Link href={`/usuario/receitas/editar/${recipe.id}`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="destructive-outline" size="icon" onClick={handleDelete} title="Deletar receita">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}