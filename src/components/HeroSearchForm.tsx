'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const quickFilters = [
    { label: 'Vegano', emoji: '🌱', query: 'vegano' },
    { label: 'Sem Glúten', emoji: '🌾', query: 'sem glúten' },
    { label: 'Sem Lactose', emoji: '🥛', query: 'sem lactose' },
    { label: 'Vegetariano', emoji: '🥬', query: 'vegetariano' },
];

export function HeroSearchForm() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (searchQuery: string) => {
        if (!searchQuery.trim()) return;

        const encodedQuery = encodeURIComponent(searchQuery.trim());
        router.push(`/receitas?q=${encodedQuery}`);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(query);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <form onSubmit={handleFormSubmit} className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 pointer-events-none" />
                <Input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Busque por 'bolo de chocolate vegano'..."
                    className="w-full pl-12 pr-4 py-3 text-lg bg-card/80 backdrop-blur-sm border-border focus:border-primary focus:ring-primary rounded-xl shadow-lg"
                    style={{ height: 'auto' }}
                />
            </form>

            <div className="flex flex-wrap justify-center items-center gap-3">
                <span className="text-sm font-medium text-muted-foreground">Ou busque por:</span>
                {quickFilters.map((filter) => (
                    <Button
                        key={filter.query}
                        variant="outline"
                        onClick={() => handleSearch(filter.query)}
                        className="bg-card/60 border-border text-foreground hover:bg-accent hover:border-primary rounded-full px-4 py-2 text-sm"
                    >
                        <span className="mr-2">{filter.emoji}</span>
                        {filter.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}