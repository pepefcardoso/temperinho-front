'use client';

import Link from 'next/link';
import { Edit, Trash2, Eye, Calendar, Clock } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import type { UserManagedPost } from '@/types/user';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { deleteArticleAction } from '@/app/usuario/artigos/actions';

const statusBadgeVariants = cva("font-semibold capitalize", {
    variants: {
        status: {
            publicado: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
            rascunho: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-800",
            pendente: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800",
        }
    }
});

export function UserArticleCard({ article }: { article: UserManagedPost }) {
    const handleDelete = async () => {
        if (confirm(`Tem certeza que deseja deletar o artigo "${article.title}"?`)) {
            toast.loading("Deletando artigo...");
            const result = await deleteArticleAction(article.id);
            toast.dismiss(); // Remove o toast de "loading"
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message || "Falha ao deletar.");
            }
        }
    }

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{article.title}</h3>
                        <Badge className={cn(statusBadgeVariants({ status: article.status }))}>{article.status}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center flex-wrap text-xs text-muted-foreground gap-x-4 gap-y-1">
                        <div className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTimeInMinutes} min de leitura</div>
                        <div className="flex items-center gap-1"><Eye className="h-3 w-3" /> {article.views.toLocaleString('pt-BR')} visualizações</div>
                        {/* CORREÇÃO: Trocado article.publishedAt por article.date */}
                        {article.date && article.status === 'publicado' && (
                            <div className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Publicado em {format(new Date(article.date), "dd/MM/yyyy", { locale: ptBR })}</div>
                        )}
                    </div>
                </div>
                <div className="flex flex-row sm:flex-col lg:flex-row gap-2 self-start pt-2 sm:pt-0">
                    <Button variant="outline" size="icon" asChild title="Editar artigo">
                        <Link href={`/usuario/artigos/editar/${article.slug}`}>
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