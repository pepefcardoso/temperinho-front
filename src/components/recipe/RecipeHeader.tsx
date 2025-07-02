'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ChefHat, Clock, Users, Star, Printer, Share2, Bookmark } from 'lucide-react';
import { toast } from 'sonner';
import type { Recipe } from '@/types/recipe';
import { useAuth } from '@/context/AuthContext';
import { toggleFavoriteRecipe } from '@/lib/api/user';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import AdBanner from '../marketing/AdBanner';

const StatItem = ({ icon: Icon, value, label }: { icon: React.ElementType, value: string | number, label: string }) => (
    <div className="text-center p-3 bg-muted rounded-lg">
        <Icon className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
        <div className="text-sm font-bold text-foreground">{value}</div>
        <div className="text-xs text-muted-foreground">{label}</div>
    </div>
);

interface RecipeHeaderProps {
    recipe: Recipe;
}

export function RecipeHeader({ recipe }: RecipeHeaderProps) {
    const { user } = useAuth();
    const [isFavorited, setIsFavorited] = useState(recipe.is_favorited ?? false);
    const [isLoading, setIsLoading] = useState(false);

    const handleFavoriteClick = async () => {
        if (!user) {
            toast.error("Você precisa estar logado para favoritar receitas.");
            return;
        }
        setIsLoading(true);
        const originalState = isFavorited;
        setIsFavorited(!originalState);

        try {
            await toggleFavoriteRecipe(recipe.id);
            toast.success(originalState ? "Receita removida dos favoritos!" : "Receita adicionada aos favoritos!");
        } catch (error) {
            setIsFavorited(originalState);
            console.error("Erro ao favoritar receita:", error);
            toast.error("Ocorreu um erro. Tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePrint = () => window.print();

    const handleShare = async () => {
        const shareData = {
            title: recipe.title,
            text: recipe.description,
            url: window.location.href,
        };
        if (navigator.share && navigator.canShare(shareData)) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.error('Erro ao compartilhar:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link da receita copiado para a área de transferência!');
        }
    };

    return (
        <section className="py-8 bg-card border-b border-border">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="relative">
                        <div className="relative w-full h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
                            <Image src={recipe.image?.url ?? '/images/placeholder.png'} alt={recipe.title} fill className="object-cover" />
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleFavoriteClick} disabled={isLoading} className={cn('absolute top-4 right-4 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-200', isFavorited ? 'text-destructive' : 'text-muted-foreground')}>
                            <Heart className={cn('h-5 w-5', isFavorited && 'fill-destructive')} />
                        </Button>
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">{recipe.title}</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">{recipe.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {recipe.diets?.map((diet) => <Badge key={diet.id} variant="secondary">{diet.name}</Badge>)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatItem icon={Clock} value={`${recipe.time} min`} label="Total" />
                            <StatItem icon={Users} value={`${recipe.portion} porções`} label="Serve" />
                            <StatItem icon={ChefHat} value={recipe.difficulty} label="Nível" />
                            <div className="text-center p-3 bg-muted rounded-lg">
                                <Star className="h-5 w-5 mx-auto mb-2 text-amber-400 fill-amber-400" />
                                <div className="text-sm font-bold text-foreground">{(recipe.average_rating ?? 0).toFixed(1)}</div>
                                <div className="text-xs text-muted-foreground">{recipe.ratings_count ?? 0} avaliações</div>
                            </div>
                        </div>

                        {recipe.user && (
                            <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                    <Image src={recipe.user.image?.url ?? '/images/avatar-placeholder.png'} alt={recipe.user.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">{recipe.user.name}</h3>
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-3">
                            <Button onClick={handleFavoriteClick} variant={isFavorited ? "default" : "outline"} disabled={isLoading}>
                                <Bookmark className={cn("h-4 w-4 mr-2", isFavorited && "fill-current")} />
                                {isFavorited ? 'Salvo' : 'Salvar Receita'}
                            </Button>
                            <Button variant="outline" onClick={handleShare}><Share2 className="h-4 w-4 mr-2" />Compartilhar</Button>
                            <Button variant="outline" onClick={handlePrint}><Printer className="h-4 w-4 mr-2" />Imprimir</Button>
                        </div>
                    </div>
                </div>
                <div className="mt-12"><AdBanner href="/marketing" layout="full" /></div>
            </div>
        </section>
    );
}