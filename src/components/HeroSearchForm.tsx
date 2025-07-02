'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getRecipeDiets } from '@/lib/api/recipe';
import type { RecipeDiet } from '@/types/recipe';

export function HeroSearchForm() {
    const [query, setQuery] = useState('');
    const [quickFilters, setQuickFilters] = useState<RecipeDiet[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchDiets = async () => {
            try {
                const diets = await getRecipeDiets();
                setQuickFilters(diets.slice(0, 4));
            } catch (error) {
                console.error("Falha ao buscar as dietas:", error);
            }
        };

        fetchDiets();
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        const params = new URLSearchParams();
        params.set('title', query.trim());
        router.push(`/receitas?${params.toString()}`);
    };

    const handleQuickFilterClick = (dietId: number) => {
        const params = new URLSearchParams();
        params.set('diets', dietId.toString());
        router.push(`/receitas?${params.toString()}`);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <form onSubmit={handleFormSubmit} className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 pointer-events-none" />
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Busque por 'bolo de chocolate'"
                    className="w-full pl-12 pr-4 py-3 text-lg bg-card/80 backdrop-blur-sm border-border focus:border-primary focus:ring-primary rounded-xl shadow-lg"
                    style={{ height: 'auto' }}
                />
            </form>

            {quickFilters.length > 0 && (
                <div className="flex flex-wrap justify-center items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground">Ou busque por:</span>
                    {quickFilters.map((diet) => (
                        <Button
                            key={diet.id}
                            variant="outline"
                            onClick={() => handleQuickFilterClick(diet.id)}
                            className="bg-card/60 border-border text-foreground hover:bg-accent hover:border-primary rounded-full px-4 py-2 text-sm"
                        >
                            {diet.name}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
}