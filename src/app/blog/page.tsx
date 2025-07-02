import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { getPosts, getPostCategories } from '@/lib/api/blog';
import type { Post, PostCategory } from '@/types/blog';
import { PaginatedResponse } from '@/types/api';

interface BlogPageProps {
  searchParams: { category_id?: string };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const currentCategoryId = searchParams.category_id ? parseInt(searchParams.category_id, 10) : undefined;

  let paginatedResponse: PaginatedResponse<Post> = {
    data: [],
    meta: { current_page: 1, last_page: 1, from: 0, to: 0, total: 0, per_page: 100, path: '', links: [] },
    links: { first: '', last: '', prev: null, next: null },
  };
  let categories: PostCategory[] = [];

  try {
    const [postsData, categoriesData] = await Promise.all([
      getPosts({
        filters: {
          category_id: currentCategoryId,
        },
        limit: 100
      }),
      getPostCategories()
    ]);
    paginatedResponse = postsData;
    categories = categoriesData;
  } catch (error) {
    console.error("Falha ao carregar a página do blog:", error);
  }

  const allPosts: Post[] = paginatedResponse.data;
  const featuredPosts = allPosts.slice(0, 3);
  const regularPosts = allPosts.slice(3);

  return (
    <div className="bg-background">
      <main>
        <section className="bg-muted/50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">Dicas e novidades da culinária inclusiva</p>
          </div>
        </section>

        {!currentCategoryId && featuredPosts.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-semibold text-foreground mb-8">Artigos em Destaque</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post: Post) => (
                  <BlogPostCard key={post.id} post={post} variant="featured" />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-8 border-y bg-card sticky top-16 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              <Button key="todas" variant={!currentCategoryId ? "default" : "outline"} asChild>
                <Link href="/blog">Todas</Link>
              </Button>
              {categories.map((category: PostCategory) => (
                <Button key={category.id} variant={currentCategoryId === category.id ? "default" : "outline"} asChild>
                  <Link href={`/blog?category_id=${category.id}`}>{category.name}</Link>
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post: Post) => (
                <BlogPostCard key={post.id} post={post} variant="default" />
              ))}
            </div>
            {allPosts.length === 0 && (
              <p className="text-center text-muted-foreground py-12">Nenhum artigo encontrado para esta categoria.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}