'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Search, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { FavoriteArticleCard } from './FavoriteArticleCard';
import type { Post, PostCategory } from '@/types/blog';
import { getPostCategories } from '@/lib/api/blog';

interface UserFavoritesArticlesClientProps {
    initialArticles: Post[];
}

export function UserFavoritesArticlesClient({ initialArticles }: UserFavoritesArticlesClientProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [articles, setArticles] = useState<Post[]>(initialArticles);
    const [categories, setCategories] = useState<PostCategory[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const fetchedCategories = await getPostCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Falha ao buscar categorias de artigo:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleFilter = (key: 'search' | 'category_id', value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'todas') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const debouncedSearch = useDebouncedCallback((value: string) => handleFilter('search', value), 500);

    const handleArticleRemove = (removedArticleId: number) => {
        setArticles(prevArticles => prevArticles.filter(article => article.id !== removedArticleId));
    };

    return (
        <>
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Buscar nos seus artigos favoritos..."
                                defaultValue={searchParams.get('search') || ''}
                                onChange={e => debouncedSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="sm:w-56">
                            <Select
                                defaultValue={searchParams.get('category_id') || 'todas'}
                                onValueChange={value => handleFilter('category_id', value)}
                            >
                                <SelectTrigger><SelectValue placeholder="Filtrar por categoria" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="todas">Todas as Categorias</SelectItem>
                                    {categories.map(cat => (
                                        <SelectItem key={cat.id} value={String(cat.id)}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4 mt-6">
                {articles.length > 0 ? (
                    articles.map(article => (
                        <FavoriteArticleCard
                            key={article.id}
                            article={article}
                            onRemove={handleArticleRemove}
                        />
                    ))
                ) : (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium text-foreground">Nenhum artigo encontrado</h3>
                        <p className="text-muted-foreground mt-2">
                            {searchParams.get('search') || searchParams.get('category_id')
                                ? 'Tente ajustar seus filtros de busca.'
                                : 'Explore o blog para encontrar novos favoritos.'
                            }
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
