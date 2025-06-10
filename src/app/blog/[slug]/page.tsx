// src/app/blog/[slug]/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, Tag, Share2, Bookmark, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// A importação do Separator foi removida, pois não é utilizado no JSX.
import { cn } from '@/lib/utils';
import AdBanner from '@/components/AdBanner';

// --- Tipos e Dados ---
type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  image: string;
  author: { name: string; avatar: string; bio: string; };
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: string;
  views: number;
  relatedPosts: { id: string; slug: string; title: string; image: string; }[];
};

const allPosts: Post[] = [
    {
    id: '1',
    slug: 'guia-completo-substituicoes-veganas',
    title: 'Guia Completo de Substituições para Culinária Vegana',
    content: `<p>A culinária vegana tem crescido exponencialmente...</p><h2 id="substituicoes-lacteos">Substituições para Produtos Lácteos</h2>...<h2 id="substituicoes-ovos">Substituições para Ovos</h2>...<h2 id="substituicoes-carnes">Substituições para Carnes</h2>...<h2 id="dicas-importantes">Dicas Importantes</h2>...`,
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=400&fit=crop',
    author: { name: 'Dra. Luciana Nutrição', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face', bio: 'Nutricionista especializada em alimentação plant-based.' },
    publishedAt: '15 de Janeiro, 2025',
    category: 'Dicas',
    tags: ['Vegano', 'Substituições', 'Guia', 'Culinária'],
    readTime: '8 min',
    views: 2847,
    relatedPosts: [
        { id: '2', slug: 'restaurantes-inclusivos-sao-paulo', title: 'Os Melhores Restaurantes Inclusivos de São Paulo', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop' },
        { id: '3', slug: 'beneficios-alimentacao-sem-gluten', title: 'Os Benefícios da Alimentação Sem Glúten', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop' }
    ]
  },
];


export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Post | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const foundArticle = allPosts.find(p => p.slug === slug);
      setArticle(foundArticle || null);
      setIsLoading(false);
    }
  }, [slug]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando post...</div>;
  }

  if (!article) {
    return <div className="min-h-screen flex items-center justify-center">Post não encontrado.</div>;
  }

  return (
    // O <Header> e <Footer> foram removidos pois agora vivem no layout.tsx
    <main>
      {/* Article Header */}
      <section className="py-8 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li className="select-none">/</li>
              <li><span className="text-foreground">{article.category}</span></li>
            </ol>
          </nav>

          <div className="mb-6">
            <Badge variant="secondary" className="mb-4">{article.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
              <div className="flex items-center"><User className="h-4 w-4 mr-2" />{article.author.name}</div>
              <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" />{article.publishedAt}</div>
              <div className="flex items-center"><Clock className="h-4 w-4 mr-2" />{article.readTime}</div>
              <div className="flex items-center"><Eye className="h-4 w-4 mr-2" />{article.views.toLocaleString()} visualizações</div>
            </div>
            <div className="flex flex-wrap gap-3 mb-6">
              <Button variant="outline" onClick={() => setIsBookmarked(!isBookmarked)} className={cn(isBookmarked && 'border-primary text-primary hover:text-primary')}>
                <Bookmark className={cn('h-4 w-4 mr-2', isBookmarked && 'fill-primary')} />
                {isBookmarked ? 'Salvo' : 'Salvar'}
              </Button>
              <Button variant="outline"><Share2 className="h-4 w-4 mr-2" />Compartilhar</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  <Tag className="h-3 w-3 mr-1" />{tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="relative w-full h-64 md:h-80 mb-8">
            <Image src={article.image} alt={article.title} fill className="object-cover rounded-xl shadow-lg"/>
          </div>

          <AdBanner size="large" position="top" className="mb-8" />
        </div>
      </section>

      {/* Article Content */}
      <section className="py-8 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <article className="flex-1 lg:max-w-[calc(100%-20rem-3rem)]">
              <div className="bg-card rounded-xl p-6 sm:p-8 shadow-sm border">
                <div 
                  className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-li:text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>

              <div className="bg-card rounded-xl p-6 shadow-sm mt-8 border">
                <h3 className="text-lg font-semibold text-foreground mb-4">Sobre o Autor</h3>
                <div className="flex items-start space-x-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={article.author.avatar} alt={article.author.name} fill className="object-cover"/>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{article.author.name}</h4>
                    <p className="text-muted-foreground text-sm">{article.author.bio}</p>
                  </div>
                </div>
              </div>

              <div className="my-8"><AdBanner size="medium" position="middle" /></div>

              <div className="bg-card rounded-xl p-6 shadow-sm mt-8 border">
                <h3 className="text-lg font-semibold text-foreground mb-6">Artigos Relacionados</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {article.relatedPosts.map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                      <div className="flex space-x-4 items-center">
                        <div className="relative w-24 h-16 flex-shrink-0">
                           <Image src={post.image} alt={post.title} fill className="object-cover rounded-lg"/>
                        </div>
                        <h4 className="font-medium text-sm text-foreground line-clamp-3 group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </article>

            <aside className="w-full lg:w-80 lg:sticky top-24 self-start space-y-6">
              <AdBanner size="medium" position="sidebar" />
              <div className="bg-card rounded-xl p-6 shadow-sm border">
                <h3 className="font-semibold text-foreground mb-4">Índice do Artigo</h3>
                <nav className="space-y-2">
                  <a href="#substituicoes-lacteos" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Substituições para Produtos Lácteos</a>
                  <a href="#substituicoes-ovos" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Substituições para Ovos</a>
                  <a href="#substituicoes-carnes" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Substituições para Carnes</a>
                  <a href="#dicas-importantes" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Dicas Importantes</a>
                </nav>
              </div>
              <AdBanner size="small" position="sidebar" />
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}