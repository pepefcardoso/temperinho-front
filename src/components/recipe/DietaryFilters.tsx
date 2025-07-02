'use client';

import { useState, useEffect } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { getRecipeDiets } from '@/lib/api/recipe';
import type { RecipeDiet } from '@/types/recipe';

const filterButtonVariants = cva(
    "flex flex-col items-center justify-center text-center p-3 h-24 w-full space-y-2 transition-all duration-200 rounded-lg",
    {
        variants: {
            selected: {
                true: "bg-primary text-primary-foreground border-primary hover:bg-primary/90 shadow-md scale-105",
                false: "bg-card border-border text-foreground hover:border-primary/50 hover:bg-muted"
            }
        }
    }
);

const emojiCycle = ['🌱', '🌾', '🥛', '🥬', '🧅', '🥑', '🥕', '🍅', '🌶️', '🌽'];

interface DietaryFiltersProps {
    selectedFilters: number[];
    onFiltersChange: (filters: number[]) => void;
}

const DietaryFilters = ({ selectedFilters, onFiltersChange }: DietaryFiltersProps) => {
    const [availableDiets, setAvailableDiets] = useState<RecipeDiet[]>([]);

    useEffect(() => {
        const fetchDiets = async () => {
            try {
                const diets = await getRecipeDiets();
                setAvailableDiets(diets);
            } catch (error) {
                console.error("Falha ao buscar as dietas:", error);
            }
        };
        fetchDiets();
    }, []);

    const toggleFilter = (filterId: number) => {
        const updatedFilters = selectedFilters.includes(filterId)
            ? selectedFilters.filter(id => id !== filterId)
            : [...selectedFilters, filterId];
        onFiltersChange(updatedFilters);
    };

    return (
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Filtre por Restrições</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {availableDiets.map((diet, index) => {
                    const isSelected = selectedFilters.includes(diet.id);
                    return (
                        <button
                            key={diet.id}
                            onClick={() => toggleFilter(diet.id)}
                            aria-pressed={isSelected}
                            className={cn(filterButtonVariants({ selected: isSelected }))}
                        >
                            <span className="text-3xl">{emojiCycle[index % emojiCycle.length]}</span>
                            <span className="text-xs font-medium leading-tight">
                                {diet.name}
                            </span>
                        </button>
                    )
                })}
            </div>

            {selectedFilters.length > 0 && (
                <div className="mt-5 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                            {selectedFilters.length} filtro{selectedFilters.length > 1 ? 's' : ''} aplicado{selectedFilters.length > 1 ? 's' : ''}
                        </span>
                        <Button
                            variant="link"
                            size="sm"
                            onClick={() => onFiltersChange([])}
                            className="text-destructive hover:text-destructive/80 px-0"
                        >
                            Limpar filtros
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DietaryFilters;
