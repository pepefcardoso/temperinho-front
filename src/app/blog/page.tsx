import Link from 'next/link';
import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { getPosts, getPostCategories } from '@/lib/api/blog';
import type { Post, PostCategory } from '@/types/blog';
import { Skeleton } from '@/components/ui/skeleton';
import { CardSkeleton } from '@/components/skeletons/CardSkeleton';

interface BlogPageProps {
  searchParams: { category_id?: string };
}

const CategoryFiltersSkeleton = () => (
  <div className="flex flex-wrap gap-3 justify-center">
    {Array.from({ length: 5 }).map((_, i) => (
      <Skeleton key={i} className="h-10 w-24 rounded-md" />
    ))}
  </div>
);

const PostListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: 6 }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

async function CategoryFilters({ currentCategoryId }: { currentCategoryId?: number }) {
  try {
    const categories = await getPostCategories();
    return (
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
    );
  } catch (error) {
    console.error("Falha ao carregar categorias:", error);
    return <p className="text-center text-sm text-destructive">Não foi possível carregar as categorias.</p>;
  }
}

async function PostList({ currentCategoryId }: { currentCategoryId?: number }) {
  try {
    const paginatedResponse = await getPosts({
      filters: { category_id: currentCategoryId },
      limit: 100
    });
    const allPosts = paginatedResponse.data;

    if (allPosts.length === 0) {
      return <p className="text-center text-muted-foreground py-12">Nenhum artigo encontrado para esta categoria.</p>;
    }

    const featuredPosts = currentCategoryId ? [] : allPosts.slice(0, 3);
    const regularPosts = currentCategoryId ? allPosts : allPosts.slice(3);

    return (
      <>
        {featuredPosts.length > 0 && (
          <section className="pb-12 border-b">
            <h2 className="text-2xl font-semibold text-foreground mb-8">Artigos em Destaque</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post: Post) => (
                <BlogPostCard key={post.id} post={post} variant="featured" />
              ))}
            </div>
          </section>
        )}
        <section className={featuredPosts.length > 0 ? "pt-12" : ""}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post: Post) => (
              <BlogPostCard key={post.id} post={post} variant="default" />
            ))}
          </div>
        </section>
      </>
    );
  } catch (error) {
    console.error("Falha ao carregar posts:", error);
    return <p className="text-center text-destructive py-12">Ocorreu um erro ao carregar os artigos. Tente novamente.</p>;
  }
}

export default function BlogPage({ searchParams }: BlogPageProps) {
  const currentCategoryId = searchParams.category_id ? parseInt(searchParams.category_id, 10) : undefined;

  return (
    <div className="bg-background">
      <main>
        <section className="bg-muted/50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">Dicas e novidades da culinária inclusiva</p>
          </div>
        </section>

        <section className="py-8 border-y bg-card sticky top-16 z-10">
          <div className="container mx-auto px-4">
            <Suspense fallback={<CategoryFiltersSkeleton />}>
              <CategoryFilters currentCategoryId={currentCategoryId} />
            </Suspense>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <Suspense fallback={<PostListSkeleton />}>
              <PostList currentCategoryId={currentCategoryId} />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}