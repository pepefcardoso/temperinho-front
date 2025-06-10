'use client';

import { Button } from '@/components/ui/button';

interface DietaryFilter {
    id: string;
    name: string;
    icon: string;
    color: string;
}

const dietaryFilters: DietaryFilter[] = [
    { id: 'vegan', name: 'Vegano', icon: '🌱', color: 'vegan' },
    { id: 'vegetarian', name: 'Vegetariano', icon: '🥬', color: 'vegetarian' },
    { id: 'gluten-free', name: 'Sem Glúten', icon: '🌾', color: 'gluten-free' },
    { id: 'lactose-free', name: 'Sem Lactose', icon: '🥛', color: 'lactose-free' },
    { id: 'keto', name: 'Cetogênica', icon: '🥑', color: 'keto' },
    { id: 'low-fodmap', name: 'Low FODMAP', icon: '🍃', color: 'low-fodmap' }
];

interface DietaryFiltersProps {
    selectedFilters: string[];
    onFiltersChange: (filters: string[]) => void;
}

const DietaryFilters = ({ selectedFilters, onFiltersChange }: DietaryFiltersProps) => {
    const toggleFilter = (filterId: string) => {
        const updatedFilters = selectedFilters.includes(filterId)
            ? selectedFilters.filter(id => id !== filterId)
            : [...selectedFilters, filterId];
        onFiltersChange(updatedFilters);
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-warm-200">
            <h3 className="text-lg font-semibold text-warm-800 mb-4">Restrições Alimentares</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {dietaryFilters.map((filter) => (
                    <Button
                        key={filter.id}
                        variant={selectedFilters.includes(filter.id) ? "default" : "outline"}
                        onClick={() => toggleFilter(filter.id)}
                        className={`
              flex flex-col items-center justify-center text-center p-4 h-24 space-y-2 transition-all duration-200
              ${selectedFilters.includes(filter.id)
                                ? 'bg-sage-600 text-white border-sage-600 hover:bg-sage-700'
                                : 'border-warm-300 text-warm-700 hover:border-sage-400 hover:bg-sage-50'
                            }
            `}
                    >
                        <span className="text-2xl">{filter.icon}</span>
                        <span className="text-xs font-medium leading-tight">
                            {filter.name}
                        </span>
                    </Button>
                ))}
            </div>

            {selectedFilters.length > 0 && (
                <div className="mt-4 pt-4 border-t border-warm-200">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-warm-600">
                            {selectedFilters.length} filtro{selectedFilters.length > 1 ? 's' : ''} ativo{selectedFilters.length > 1 ? 's' : ''}
                        </span>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onFiltersChange([])}
                            className="text-warm-600 hover:text-warm-800"
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