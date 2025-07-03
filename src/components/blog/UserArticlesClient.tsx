'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { UserArticleCard } from './UserArticleCard';
import type { Post, PostCategory } from '@/types/blog';
import { getPostCategories } from '@/lib/api/blog';

interface UserArticlesClientProps {
    initialArticles: Post[];
}

export function UserArticlesClient({ initialArticles }: UserArticlesClientProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [articles, setArticles] = useState<Post[]>(initialArticles);
    const [categories, setCategories] = useState<PostCategory[]>([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoadingCategories(true);
            try {
                const fetchedCategories = await getPostCategories();
                setCategories(fetchedCategories);
            } catch (error) {
                console.error("Falha ao buscar categorias:", error);
            } finally {
                setIsLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    const handleFilterChange = (key: 'search' | 'category_id', value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value && value !== 'todos') {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    const debouncedSearch = useDebouncedCallback((value: string) => handleFilterChange('search', value), 500);

    const handleArticleDelete = (deletedArticleId: number) => {
        setArticles(prevArticles => prevArticles.filter(article => article.id !== deletedArticleId));
    };

    return (
        <>
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                            <Input
                                placeholder="Buscar por título..."
                                defaultValue={searchParams.get('search') || ''}
                                onChange={(e) => debouncedSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <div className="sm:w-48">
                            {isLoadingCategories ? (
                                <Skeleton className="h-10 w-full" />
                            ) : (
                                <Select
                                    defaultValue={searchParams.get('category_id') || 'todos'}
                                    onValueChange={(value) => handleFilterChange('category_id', value)}
                                >
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todos">Todas as Categorias</SelectItem>
                                        {categories.map(category => (
                                            <SelectItem key={category.id} value={String(category.id)}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="space-y-4 mt-6">
                {articles.length > 0 ? (
                    articles.map((article) => (
                        <UserArticleCard
                            key={article.id}
                            article={article}
                            onDelete={handleArticleDelete}
                        />
                    ))
                ) : (
                    <div className="text-center py-16 border-2 border-dashed rounded-lg">
                        <h3 className="text-lg font-medium text-foreground">Nenhum artigo encontrado</h3>
                        <p className="text-muted-foreground mt-2 mb-6">Tente ajustar seus filtros ou crie um novo artigo.</p>
                        <Button asChild><Link href="/usuario/artigos/novo"><Plus className="h-4 w-4 mr-2" />Criar Primeiro Artigo</Link></Button>
                    </div>
                )}
            </div>
        </>
    );
}