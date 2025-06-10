'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Clock, Users } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import type { Recipe, DietaryTag, Difficulty } from '@/types/recipe';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const StatIcon = ({ icon: Icon, children }: { icon: React.ElementType, children: React.ReactNode }) => (
    <div className="flex items-center" title={String(children)}>
        <Icon className="h-4 w-4 mr-1.5 text-muted-foreground" />
        <span className="text-sm text-foreground">{children}</span>
    </div>
);

const variantsConfig = {
    variant: {
        default: "bg-muted text-muted-foreground border-border",
        vegan: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
        'gluten-free': "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800",
        'lactose-free': "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:border-purple-800",
        vegetarian: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-300 dark:border-emerald-800",
        'low-fodmap': "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/50 dark:text-orange-300 dark:border-orange-800",
        'keto': "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900/50 dark:text-slate-300 dark:border-slate-800",
    }
};

const dietaryTagVariants = cva(
    "inline-block px-2.5 py-1 text-xs font-medium rounded-full border",
    { variants: variantsConfig, defaultVariants: { variant: "default" } }
);

const difficultyStyles: Record<Difficulty, string> = {
    'Fácil': 'text-primary',
    'Médio': 'text-amber-500',
    'Difícil': 'text-destructive',
};

const cardVariants = cva(
    "bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border",
    {
        variants: {
            viewMode: {
                grid: "group flex flex-col hover:-translate-y-1",
                list: "flex flex-row items-center",
            }
        },
        defaultVariants: { viewMode: "grid" }
    }
);

interface RecipeCardProps extends VariantProps<typeof cardVariants> {
    recipe: Recipe;
}

export default function RecipeCard({ recipe, viewMode }: RecipeCardProps) {
    const [isFavorited, setIsFavorited] = useLocalStorage(`favorite_${recipe.id}`, false);

    const getTagVariant = (tag: DietaryTag) => {
        const validVariants = Object.keys(variantsConfig.variant);
        return validVariants.includes(tag) ? tag : 'default';
    };

    return (
        <div className={cn(cardVariants({ viewMode }))}>
            <div className={cn("relative overflow-hidden flex-shrink-0", viewMode === 'grid' ? 'w-full h-48' : 'w-1/3 h-full max-w-48')}>
                <Link href={`/receitas/${recipe.slug}`} aria-label={`Ver receita ${recipe.name}`}>
                    <Image
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </Link>
                <button
                    onClick={(e) => { e.preventDefault(); setIsFavorited(!isFavorited); }}
                    aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    className={cn(
                        "absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-card/80 backdrop-blur-sm transition-colors duration-200 hover:bg-card",
                        isFavorited ? "text-destructive" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <Heart className={cn("h-5 w-5 transition-all", isFavorited && "fill-destructive")} />
                </button>
            </div>

            <div className={cn("p-4 flex flex-col space-y-3", viewMode === 'grid' ? 'flex-grow' : 'flex-1')}>
                <div className="flex flex-wrap gap-2">
                    {recipe.dietaryTags.slice(0, viewMode === 'grid' ? 2 : 3).map((tag) => (
                        <span key={tag} className={dietaryTagVariants({ variant: getTagVariant(tag) as DietaryTag })}>
                            {tag}
                        </span>
                    ))}
                </div>
                <h3 className={cn("font-display font-bold text-foreground group-hover:text-primary transition-colors", viewMode === 'grid' ? 'text-xl line-clamp-2 flex-grow' : 'text-lg line-clamp-1')}>
                    <Link href={`/receitas/${recipe.slug}`}>{recipe.name}</Link>
                </h3>
                {viewMode === 'list' && (
                    <p className="text-muted-foreground text-sm line-clamp-2">{recipe.description}</p>
                )}
                <div className="flex items-center justify-between text-sm pt-3 border-t border-border mt-auto">
                    <div className="flex items-center space-x-4">
                        <StatIcon icon={Clock}>{recipe.prepTimeMinutes} min</StatIcon>
                        <StatIcon icon={Users}>{recipe.servings}</StatIcon>
                    </div>
                    {recipe.difficulty && (
                        <div className={cn("font-bold", difficultyStyles[recipe.difficulty])}>
                            {recipe.difficulty}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}