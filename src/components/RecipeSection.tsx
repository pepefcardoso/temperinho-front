'use client';

import { useState, useEffect } from 'react';
import DietaryFilters from '@/components/DietaryFilters';
import FeaturedRecipes from '@/components/FeaturedRecipes';
import type { Recipe, DietaryTag } from '@/types/recipe';
import { getFilteredRecipes } from '@/lib/api/recipe';

interface RecipeSectionProps {
    initialRecipes: Recipe[];
}

export default function RecipeSection({ initialRecipes }: RecipeSectionProps) {
    const [selectedFilters, setSelectedFilters] = useState<DietaryTag[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true);
            const newRecipes = selectedFilters.length > 0
                ? await getFilteredRecipes(selectedFilters)
                : initialRecipes;
            setRecipes(newRecipes);
            setIsLoading(false);
        };

        fetchRecipes();
    }, [selectedFilters, initialRecipes]);

    const handleFiltersChange = (filters: DietaryTag[]) => {
        setSelectedFilters(filters);
    };

    return (
        <>
            <section id="filtros" className="py-12 bg-card">
                <div className="container mx-auto px-4">
                    <DietaryFilters
                        selectedFilters={selectedFilters}
                        onFiltersChange={handleFiltersChange}
                    />
                </div>
            </section>

            <FeaturedRecipes recipes={recipes} isLoading={isLoading} />
        </>
    );
}