import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, User, Clock, Eye } from 'lucide-react';
import AdBanner from '@/components/marketing/AdBanner';
import { getPostBySlug } from '@/lib/api/blog';
import { PostActions } from '@/components/PostActions';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const article = await getPostBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <section className="py-8 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li className="select-none">/</li>
              <li><span className="text-foreground">{article.category}</span></li>
            </ol>
          </nav>

          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center"><User className="h-4 w-4 mr-2" />{article.author.name}</div>
              <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" />{new Date(article.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
              <div className="flex items-center"><Clock className="h-4 w-4 mr-2" />{article.readTimeInMinutes} min de leitura</div>
              <div className="flex items-center"><Eye className="h-4 w-4 mr-2" />{article.views.toLocaleString('pt-BR')} visualizações</div>
            </div>

            <PostActions post={article} />
          </div>

          <div className="relative w-full h-64 md:h-80 mb-8">
            <Image src={article.imageUrl} alt={article.title} fill className="object-cover rounded-xl shadow-lg" />
          </div>

          <AdBanner href="/anuncie-aqui" layout="full" size="large" className="mb-8" />
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-p:text-muted-foreground prose-strong:text-foreground">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>

            <aside className="w-full lg:w-80 lg:sticky top-24 self-start space-y-6">
              <AdBanner href="/anuncie-aqui" layout="sidebar" />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}