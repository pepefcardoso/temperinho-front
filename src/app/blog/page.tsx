import { Calendar, User, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';

// --- Tipos e Dados (poderiam estar em um arquivo separado) ---

type Author = { name: string; avatar: string };
type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  author: Author;
  publishedAt: string;
  category: string;
  tags: string[];
  readTime: string;
  featured: boolean;
};

const blogPosts: BlogPost[] = [
    {
    id: '1',
    slug: 'guia-completo-substituicoes-veganas',
    title: 'Guia Completo de Substituições para Culinária Vegana',
    excerpt: 'Descubra como substituir ingredientes de origem animal sem perder sabor e textura nas suas receitas favoritas. Um guia prático e detalhado.',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=250&fit=crop',
    author: {
      name: 'Dra. Luciana Nutrição',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: '15 de Janeiro, 2025',
    category: 'Dicas',
    tags: ['Vegano', 'Substituições', 'Guia'],
    readTime: '8 min',
    featured: true
  },
  {
    id: '2',
    slug: 'restaurantes-inclusivos-sao-paulo',
    title: 'Os Melhores Restaurantes Inclusivos de São Paulo',
    excerpt: 'Uma seleção cuidadosa dos restaurantes que oferecem opções diversificadas para todas as restrições alimentares na capital paulista.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
    author: {
      name: 'Carlos Gastronômico',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    publishedAt: '12 de Janeiro, 2025',
    category: 'Guias',
    tags: ['Restaurantes', 'São Paulo', 'Inclusivo'],
    readTime: '12 min',
    featured: false
  },
    // ...outros posts
];

const categories = ['Todas', 'Dicas', 'Guias', 'Entrevistas', 'Saúde', 'Receitas', 'História'];
const popularTags = ['Vegano', 'Sem Glúten', 'Low FODMAP', 'Receitas', 'Dicas', 'Saúde', 'Nutrição'];


// --- Componente da Página (Server Component) ---

export default async function BlogPage({ 
  searchParams 
}: { 
  searchParams: { category?: string } 
}) {

  // Lógica de filtro executada no servidor
  const currentCategory = searchParams.category || 'Todas';

  const filteredPosts = currentCategory === 'Todas' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === currentCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="bg-background">
      <Header />
      
      <main>
        {/* Page Header */}
        <section className="bg-warm-50 dark:bg-warm-900/50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                Blog da Culinária Inclusiva
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Dicas, histórias e novidades do mundo da alimentação inclusiva
              </p>
            </div>
            <AdBanner size="large" position="top" className="mb-8" />
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-12 bg-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-semibold text-foreground mb-8">Artigos em Destaque</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <article key={post.id} className="group">
                    <Link href={`/blog/${post.slug}`} className="block">
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <Image
                          src={post.image} alt={post.title} fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                         <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge variant="default">Destaque</Badge>
                      </div>
                      <h3 className="font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      {/* ... restante do card ... */}
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="py-8 bg-background border-y">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link key={category} href={category === 'Todas' ? '/blog' : `/blog?category=${category}`} passHref>
                  <Button variant={currentCategory === category ? "default" : "outline"}>
                    {category}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex gap-8">
              {/* Main Content */}
              <div className="flex-1">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-foreground">
                    {currentCategory === 'Todas' ? 'Todos os Artigos' : `Categoria: ${currentCategory}`}
                  </h2>
                  <span className="text-muted-foreground">
                    {filteredPosts.length} artigo{filteredPosts.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {regularPosts.map((post) => (
                    <article key={post.id} className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border">
                      <Link href={`/blog/${post.slug}`}>
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={post.image} alt={post.title} fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <div className="p-6">
                           <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                          <h3 className="font-semibold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-x-4 text-xs text-muted-foreground border-t pt-4">
                              <div className="flex items-center gap-x-1">
                                <Image src={post.author.avatar} alt={post.author.name} width={24} height={24} className="rounded-full" />
                                <span>{post.author.name}</span>
                              </div>
                              <span>•</span>
                              <div className="flex items-center gap-x-1">
                                <Clock className="h-3 w-3" />
                                {post.readTime}
                              </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>

                 <AdBanner size="medium" position="middle" className="my-12"/>

                <div className="text-center mt-12">
                  <Button size="lg">Carregar Mais Artigos</Button>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="hidden lg:block w-80 space-y-6 flex-shrink-0">
                 <div className="bg-card rounded-xl p-6 shadow-sm border">
                   <h3 className="font-semibold text-foreground mb-4">Artigos Populares</h3>
                   {/* ... sidebar content ... */}
                 </div>
                 <div className="bg-card rounded-xl p-6 shadow-sm border">
                   <h3 className="font-semibold text-foreground mb-4">Tags Populares</h3>
                   <div className="flex flex-wrap gap-2">
                     {popularTags.map((tag) => (
                       <Link key={tag} href={`/blog?tag=${tag}`} passHref>
                        <Badge variant="outline" className="cursor-pointer hover:bg-muted">
                            {tag}
                        </Badge>
                       </Link>
                     ))}
                   </div>
                 </div>
                 <AdBanner size="small" position="sidebar" />
              </aside>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}