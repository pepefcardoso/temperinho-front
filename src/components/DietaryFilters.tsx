'use client';

import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DIETARY_FILTERS_CONFIG } from '@/lib/config/filters';
import type { DietaryTag } from '@/types/recipe';

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

interface DietaryFiltersProps {
    selectedFilters: DietaryTag[];
    onFiltersChange: (filters: DietaryTag[]) => void;
}

const DietaryFilters = ({ selectedFilters, onFiltersChange }: DietaryFiltersProps) => {
    const toggleFilter = (filterId: DietaryTag) => {
        const updatedFilters = selectedFilters.includes(filterId)
            ? selectedFilters.filter(id => id !== filterId)
            : [...selectedFilters, filterId];
        onFiltersChange(updatedFilters);
    };

    return (
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Filtre por Restrições</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {DIETARY_FILTERS_CONFIG.map((filter) => {
                    const isSelected = selectedFilters.includes(filter.id);
                    return (
                        <button
                            key={filter.id}
                            onClick={() => toggleFilter(filter.id)}
                            aria-pressed={isSelected} // 4. Melhoria de acessibilidade
                            className={cn(filterButtonVariants({ selected: isSelected }))}
                        >
                            <span className="text-3xl">{filter.icon}</span>
                            <span className="text-xs font-medium leading-tight">
                                {filter.name}
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