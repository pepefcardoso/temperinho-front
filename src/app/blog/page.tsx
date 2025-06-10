import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlogPostCard } from '@/components/BlogPostCard';
import { getPosts, getFeaturedPosts, getAllCategories } from '@/lib/api/blog';

export default async function BlogPage({ searchParams }: { searchParams: { category?: string; tag?: string } }) {
  const currentCategory = searchParams.category || 'Todas';

  const allPosts = await getPosts({ category: currentCategory === 'Todas' ? undefined : currentCategory, tag: searchParams.tag });
  const featuredPosts = await getFeaturedPosts();
  const categories = await getAllCategories();

  const regularPosts = allPosts.filter(p => !p.featured);

  return (
    <div className="bg-background">
      <main>
        <section className="bg-muted/50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">Dicas e novidades da culinária inclusiva</p>
          </div>
        </section>

        {currentCategory === 'Todas' && featuredPosts.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-semibold text-foreground mb-8">Artigos em Destaque</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 h-[25rem]">
                {featuredPosts.map((post) => <BlogPostCard key={post.id} post={post} variant="featured" />)}
              </div>
            </div>
          </section>
        )}

        <section className="py-8 border-y bg-card sticky top-16 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <Button key={category} variant={currentCategory === category ? "default" : "outline"} asChild>
                  <Link href={category === 'Todas' ? '/blog' : `/blog?category=${category}`}>{category}</Link>
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => <BlogPostCard key={post.id} post={post} variant="default" />)}
            </div>
            {regularPosts.length === 0 && (
              <p className="text-center text-muted-foreground py-12">Nenhum artigo encontrado para esta categoria.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}