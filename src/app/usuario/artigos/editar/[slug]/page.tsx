import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/api/blog'; // Reutilizamos a função da API do blog
import { ArticleForm } from '@/components/ArticleForm';

export const metadata: Metadata = {
    title: 'Editar Artigo | Leve Sabor',
};

interface EditPageProps {
    params: { slug: string };
}

export default async function EditArticlePage({ params }: EditPageProps) {
    const article = await getPostBySlug(params.slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-1">Editar Artigo</h1>
                    <p className="text-muted-foreground">Ajuste e melhore seu conteúdo.</p>
                </div>
                <ArticleForm action="update" initialData={article} />
            </div>
        </div>
    );
}