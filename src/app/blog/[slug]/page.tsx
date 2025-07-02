import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, Clock, Star } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getPostById } from '@/lib/api/blog';
import type { Metadata } from 'next';
import AdBanner from '@/components/marketing/AdBanner';
import { PostActions } from '@/components/blog/PostActions';

const extractIdFromSlug = (slug: string): number | null => {
  const match = slug.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : null;
};

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const postId = extractIdFromSlug(params.slug);
  if (!postId) {
    return { title: 'Artigo não encontrado' };
  }

  try {
    const article = await getPostById(postId);
    return {
      title: `${article.title} | Leve Sabor`,
      description: article.summary,
      openGraph: {
        title: article.title,
        description: article.summary,
        images: [
          {
            url: article.image?.url ?? '/images/og-image.png',
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Erro ao buscar artigo para metadados:", error);
    return { title: 'Artigo não encontrado' };
  }
}


export default async function BlogPostPage({ params }: PageProps) {
  const postId = extractIdFromSlug(params.slug);
  if (!postId) {
    notFound();
  }

  try {
    const article = await getPostById(postId);

    const wordCount = article.content?.trim().split(/\s+/).length ?? 0;
    const readTimeInMinutes = Math.ceil(wordCount / 200);

    return (
      <main>
        <section className="py-8 bg-card">
          <div className="container mx-auto px-4 max-w-4xl">
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
                <li className="select-none">/</li>
                <li><span className="text-foreground">{article.category?.name ?? 'Artigo'}</span></li>
              </ol>
            </nav>

            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center"><User className="h-4 w-4 mr-2" />{article.author?.name ?? 'Autor'}</div>
                <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" />{format(new Date(article.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</div>
                <div className="flex items-center"><Clock className="h-4 w-4 mr-2" />{readTimeInMinutes} min de leitura</div>
                <div className="flex items-center"><Star className="h-4 w-4 mr-2 text-amber-400" />{(article.average_rating ?? 0).toFixed(1)} ({article.ratings_count ?? 0} avaliações)</div>
              </div>

              <PostActions post={article} />
            </div>

            <div className="relative w-full h-64 md:h-80 mb-8">
              <Image src={article.image?.url ?? '/images/placeholder.png'} alt={article.title} fill className="object-cover rounded-xl shadow-lg" />
            </div>

            <AdBanner href="/marketing" layout="full" size="large" className="mb-8" />
          </div>
        </section>

        <section className="py-8 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-p:text-muted-foreground prose-strong:text-foreground">
                <div dangerouslySetInnerHTML={{ __html: article.content ?? '' }} />
              </article>

              <aside className="w-full lg:w-80 lg:sticky top-24 self-start space-y-6">
                <AdBanner href="/marketing" layout="sidebar" />
              </aside>
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Falha ao buscar o artigo:", error);
    notFound();
  }
}
