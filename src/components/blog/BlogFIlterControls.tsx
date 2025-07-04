'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import type { PostCategory } from '@/types/blog';

interface BlogFilterControlsProps {
    categories: PostCategory[];
    initialCategoryId?: string;
    initialQuery?: string;
}

export function BlogFilterControls({ categories, initialCategoryId, initialQuery }: BlogFilterControlsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(initialQuery || '');

    const updateSearchParam = (key: string, value: string | null) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        if (!value) {
            current.delete(key);
        } else {
            current.set(key, value);
        }

        const search = current.toString();
        const newUrl = search ? `${pathname}?${search}` : pathname;
        router.push(newUrl);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSearchParam('title', query.trim() || null);
    };

    const handleCategoryClick = (categoryId?: string) => {
        updateSearchParam('category_id', categoryId || null);
    };

    return (
        <div className="container mx-auto px-4 space-y-6">
            <form onSubmit={handleSearchSubmit} className="relative max-w-lg mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                    placeholder="Pesquisar artigos por título..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 h-14 rounded-full shadow-md border-2 border-transparent focus:border-primary focus:ring-primary"
                />
            </form>

            <div className="flex flex-wrap gap-3 justify-center">
                <Button
                    variant={!initialCategoryId ? "default" : "outline"}
                    onClick={() => handleCategoryClick()}
                >
                    Todas
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        variant={initialCategoryId === String(category.id) ? "default" : "outline"}
                        onClick={() => handleCategoryClick(String(category.id))}
                    >
                        {category.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}