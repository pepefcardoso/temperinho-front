'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { FavoriteArticleCard } from './FavoriteArticleCard';
import type { UserFavoritePost } from '@/types/user';

export function UserFavoritesArticlesClient({ articles }: { articles: UserFavoritePost[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleFilter = (key: 'q' | 'category', value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'todas') params.set(key, value);
        else params.delete(key);
        replace(`${pathname}?${params.toString()}`);
    };

    const debouncedSearch = useDebouncedCallback((value: string) => handleFilter('q', value), 500);

    // Extrai categorias dos artigos favoritados para o filtro
    const categories = ['todas', ...Array.from(new Set(articles.map(a => a.category)))];

    return (
        <>
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input placeholder="Buscar nos seus artigos favoritos..." defaultValue={searchParams.get('q') || ''} onChange={e => debouncedSearch(e.target.value)} className="pl-10" />
                        </div>
                        <div className="sm:w-56">
                            <Select defaultValue={searchParams.get('category') || 'todas'} onValueChange={value => handleFilter('category', value)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => <SelectItem key={cat} value={cat} className="capitalize">{cat}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="space-y-4 mt-6">
                {articles.length > 0 ? (
                    articles.map(article => <FavoriteArticleCard key={article.id} article={article} />)
                ) : (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium text-foreground">Nenhum artigo encontrado</h3>
                        <p className="text-muted-foreground mt-2">Tente ajustar seus filtros ou explore o blog para encontrar novos favoritos.</p>
                    </div>
                )}
            </div>
        </>
    );
}