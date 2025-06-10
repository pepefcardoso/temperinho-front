'use client';

import Image from 'next/image';
import { Heart, ChefHat, Clock, Users, Star, Printer, Share2, Bookmark } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import type { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import AdBanner from './AdBanner';

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
    const [isFavorited, setIsFavorited] = useLocalStorage(`favorite_${recipe.id}`, false);

    const handlePrint = () => window.print();

    const handleShare = async () => {
        const shareData = {
            title: recipe.name,
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
                            <Image src={recipe.imageUrl} alt={recipe.name} fill className="object-cover" />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setIsFavorited(!isFavorited)} className={cn('absolute top-4 right-4 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-200', isFavorited ? 'text-destructive' : 'text-muted-foreground')}>
                            <Heart className={cn('h-5 w-5', isFavorited && 'fill-destructive')} />
                        </Button>
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">{recipe.name}</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">{recipe.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {recipe.dietaryTags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <StatItem icon={Clock} value={recipe.totalTime} label="Total" />
                            <StatItem icon={Users} value={recipe.servings} label="Porções" />
                            <StatItem icon={ChefHat} value={recipe.difficulty} label="Nível" />
                            <div className="text-center p-3 bg-muted rounded-lg">
                                <Star className="h-5 w-5 mx-auto mb-2 text-amber-400 fill-amber-400" />
                                <div className="text-sm font-bold text-foreground">{recipe.rating}</div>
                                <div className="text-xs text-muted-foreground">{recipe.reviewCount} avaliações</div>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                <Image src={recipe.author.avatarUrl} alt={recipe.author.name} fill className="object-cover" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">{recipe.author.name}</h3>
                                {recipe.author.bio && <p className="text-sm text-muted-foreground">{recipe.author.bio}</p>}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <Button onClick={() => setIsFavorited(!isFavorited)} variant={isFavorited ? "default" : "outline"}>
                                <Bookmark className={cn("h-4 w-4 mr-2", isFavorited && "fill-current")} />
                                {isFavorited ? 'Salvo' : 'Salvar Receita'}
                            </Button>
                            <Button variant="outline" onClick={handleShare}><Share2 className="h-4 w-4 mr-2" />Compartilhar</Button>
                            <Button variant="outline" onClick={handlePrint}><Printer className="h-4 w-4 mr-2" />Imprimir</Button>
                        </div>
                    </div>
                </div>
                <div className="mt-12"><AdBanner href="/anuncie" layout="full" /></div>
            </div>
        </section>
    );
}