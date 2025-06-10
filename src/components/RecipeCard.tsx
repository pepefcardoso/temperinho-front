'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Clock, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Recipe {
    id: string;
    title: string;
    image: string;
    prepTime: string;
    servings: number;
    difficulty: string;
    dietaryTags: string[];
}

interface RecipeCardProps {
    recipe: Recipe;
    onFavorite?: (recipeId: string) => void;
    isFavorited?: boolean;
}

const getDietaryTagClass = (tag: string) => {
    const baseClass = "px-2 py-1 text-xs font-medium rounded-full border";
    switch (tag.toLowerCase()) {
        case 'vegano': return `${baseClass} bg-green-100 text-green-800 border-green-200`;
        case 'sem glúten': return `${baseClass} bg-blue-100 text-blue-800 border-blue-200`;
        case 'sem lactose': return `${baseClass} bg-indigo-100 text-indigo-800 border-indigo-200`;
        default: return `${baseClass} bg-gray-100 text-gray-800 border-gray-200`;
    }
};

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case 'Fácil': return 'text-green-600';
        case 'Médio': return 'text-yellow-600';
        case 'Difícil': return 'text-red-600';
        default: return 'text-gray-600';
    }
};

const RecipeCard = ({ recipe, onFavorite, isFavorited = false }: RecipeCardProps) => {
    return (
        <Link href={`/receitas/${recipe.id}`} className="block group recipe-card">
            <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                    <Image
                        src={recipe.image}
                        alt={recipe.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.preventDefault(); onFavorite?.(recipe.id); }}
                            className={`rounded-full bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200 ${isFavorited ? 'text-red-500 hover:text-red-600' : 'text-gray-600 hover:text-gray-800'
                                }`}
                        >
                            <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
                        </Button>
                    </div>
                </div>

                <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-lg text-warm-900 line-clamp-2 group-hover:text-sage-700 transition-colors">
                        {recipe.title}
                    </h3>

                    <div className="flex flex-wrap gap-2">
                        {recipe.dietaryTags.slice(0, 3).map((tag, index) => (
                            <span key={index} className={getDietaryTagClass(tag)}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-warm-600 pt-3 border-t border-warm-200">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center"><Clock className="h-4 w-4 mr-1" />{recipe.prepTime}</div>
                            <div className="flex items-center"><Users className="h-4 w-4 mr-1" />{recipe.servings}</div>
                        </div>
                        <div className={`font-medium ${getDifficultyColor(recipe.difficulty)}`}>{recipe.difficulty}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RecipeCard;