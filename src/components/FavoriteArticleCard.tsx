'use client';

import Link from 'next/link';
import { Heart, Calendar, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import type { UserFavoritePost } from '@/types/user';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { removeFavoriteArticleAction } from '@/app/usuario/favoritos/artigos/actions';

export function FavoriteArticleCard({ article }: { article: UserFavoritePost }) {
    const handleRemoveFavorite = async () => {
        toast.loading("Removendo favorito...");
        const result = await removeFavoriteArticleAction(article.id);
        toast.dismiss();
        if (result.success) toast.success(result.message);
        else toast.error("Falha ao remover.");
    }

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                    <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center flex-wrap text-xs text-muted-foreground gap-x-4 gap-y-1">
                        <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTimeInMinutes} min</div>
                        <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Favoritado em {format(new Date(article.favoritedAt), "dd/MM/yy", { locale: ptBR })}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 self-start pt-2 sm:pt-0">
                    <Button variant="outline" size="sm" asChild className="w-full"><Link href={`/blog/${article.slug}`}>Ler Artigo</Link></Button>
                    <Button variant="destructive-outline" size="sm" onClick={handleRemoveFavorite}><Heart className="h-4 w-4 mr-2" />Remover</Button>
                </div>
            </CardContent>
        </Card>
    );
}