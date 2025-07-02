'use client';

import Link from 'next/link';
import { Edit, Trash2, Calendar, Star } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import type { Post } from '@/types/blog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { deletePost } from '@/lib/api/blog';

interface UserArticleCardProps {
    article: Post;
    onDelete: (id: number) => void;
}

export function UserArticleCard({ article, onDelete }: UserArticleCardProps) {
    const handleDelete = async () => {
        if (window.confirm(`Tem certeza que deseja deletar o artigo "${article.title}"?`)) {
            toast.loading("Deletando artigo...");
            try {
                await deletePost(article.id);
                toast.dismiss();
                toast.success("Artigo deletado com sucesso!");
                onDelete(article.id);
            } catch (error) {
                toast.dismiss();
                toast.error("Falha ao deletar o artigo. Tente novamente.");
                console.error("Erro ao deletar post:", error);
            }
        }
    }

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
                        {article.category && (
                            <Badge variant="secondary">{article.category.name}</Badge>
                        )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{article.summary}</p>
                    <div className="flex items-center flex-wrap text-xs text-muted-foreground gap-x-4 gap-y-1">
                        <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-500" />
                            {(article.average_rating ?? 0).toFixed(1)} ({article.ratings_count ?? 0} avaliações)
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Criado em {format(new Date(article.created_at), "dd/MM/yyyy", { locale: ptBR })}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col lg:flex-row gap-2 self-start pt-2 sm:pt-0">
                    <Button variant="outline" size="icon" asChild title="Editar artigo">
                        <Link href={`/usuario/artigos/editar/${article.id}`}>
                            <Edit className="h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="destructive-outline" size="icon" onClick={handleDelete} title="Deletar artigo">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
