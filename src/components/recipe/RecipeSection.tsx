'use client';

import { useState, useEffect } from 'react';
import DietaryFilters from '@/components/DietaryFilters';
import type { Recipe } from '@/types/recipe';
import { getRecipes } from '@/lib/api/recipe';
import FeaturedRecipes from './FeaturedRecipes';

interface RecipeSectionProps {
    initialRecipes: Recipe[];
}

export default function RecipeSection({ initialRecipes }: RecipeSectionProps) {
    const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
    const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true);
            try {
                const options = {
                    filters: {
                        diets: selectedFilters,
                    },
                };

                const paginatedResponse = await getRecipes(options);
                setRecipes(paginatedResponse.data);

            } catch (error) {
                console.error("Falha ao buscar receitas filtradas:", error);
                setRecipes(initialRecipes);
            } finally {
                setIsLoading(false);
            }
        };

        if (selectedFilters.length > 0) {
            fetchRecipes();
        } else {
            setRecipes(initialRecipes);
        }
    }, [selectedFilters, initialRecipes]);

    const handleFiltersChange = (filters: number[]) => {
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
