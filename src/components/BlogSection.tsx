// NENHUM 'use client' é necessário. Este é um Componente de Servidor.
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Importando para consistência

// É uma boa prática definir um tipo para seus dados.
type Post = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
};

// Em uma aplicação real, estes dados seriam buscados de uma API ou CMS.
const blogPosts: Post[] = [
  {
    id: '1',
    title: 'Guia Completo de Substituições para Culinária Vegana',
    excerpt: 'Descubra como substituir ingredientes de origem animal sem perder sabor e textura nas suas receitas favoritas.',
    image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=250&fit=crop',
    author: 'Dra. Luciana Nutrição',
    date: '15 de Janeiro, 2024',
    category: 'Dicas',
    readTime: '8 min'
  },
  {
    id: '2',
    title: 'Os Melhores Restaurantes Inclusivos de São Paulo',
    excerpt: 'Uma seleção cuidadosa dos restaurantes que oferecem opções diversificadas para todas as restrições alimentares.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
    author: 'Carlos Gastronômico',
    date: '12 de Janeiro, 2024',
    category: 'Guias',
    readTime: '12 min'
  },
  {
    id: '3',
    title: 'Entrevista: Chef Marina fala sobre Culinária Inclusiva',
    excerpt: 'Conversa exclusiva com a chef que está revolucionando a gastronomia brasileira com pratos acessíveis a todos.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop',
    author: 'Equipe Editorial',
    date: '10 de Janeiro, 2024',
    category: 'Entrevistas',
    readTime: '15 min'
  }
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-warm-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-warm-900 mb-4">
            Últimas do Blog
          </h2>
          <p className="text-lg text-warm-600 max-w-2xl mx-auto">
            Fique por dentro das novidades, dicas e histórias inspiradoras 
            do mundo da culinária inclusiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            // 1. O card inteiro agora é um link navegável.
            <Link href={`/blog/${post.id}`} key={post.id} className="group block">
              <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  {/* 2. A tag <img> foi substituída pelo componente <Image> otimizado. */}
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-sage-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-semibold text-lg text-warm-900 mb-3 line-clamp-2 group-hover:text-sage-700 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-warm-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-warm-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center"><User className="h-3 w-3 mr-1" />{post.author}</div>
                      <div className="flex items-center"><Calendar className="h-3 w-3 mr-1" />{post.date}</div>
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  {/* 3. O botão "Ler mais" agora é um indicador visual dentro do link. */}
                  <div className="flex items-center text-sage-600 font-semibold text-sm transition-colors group-hover:text-sage-700 mt-auto pt-2 border-t border-warm-200">
                    Ler mais
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          {/* 4. O botão de navegação principal também usa <Link> e o componente <Button>. */}
          <Link href="/blog" passHref>
              <Button size="lg" className="bg-sage-600 hover:bg-sage-700 text-white font-semibold px-8 py-3 rounded-lg">
                Ver Todo o Blog
              </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;