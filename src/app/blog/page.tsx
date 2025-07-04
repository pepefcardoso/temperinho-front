import { Suspense } from 'react';
import { getPosts, getPostCategories } from '@/lib/api/blog';
import type { Post } from '@/types/blog';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { CardSkeleton } from '@/components/skeletons/CardSkeleton';
import { BlogFilterControls } from '@/components/blog/BlogFIlterControls';

interface BlogPageProps {
  searchParams: Promise<{
    category_id?: string;
    title?: string;
  }>;
}

const PostListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
  </div>
);

async function PostList({ categoryId, title }: { categoryId?: number; title?: string }) {
  try {
    const paginatedResponse = await getPosts({
      filters: { category_id: categoryId, title },
      limit: 100,
    });
    const allPosts = paginatedResponse.data;

    if (allPosts.length === 0) {
      return (
        <p className="text-center text-muted-foreground py-12">
          Nenhum artigo encontrado com os filtros selecionados.
        </p>
      );
    }

    return (
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post: Post) => (
            <BlogPostCard key={post.id} post={post} variant="default" />
          ))}
        </div>
      </section>
    );
  } catch (error) {
    console.error("Falha ao carregar posts:", error);
    return (
      <p className="text-center text-destructive py-12">
        Ocorreu um erro ao carregar os artigos. Tente novamente.
      </p>
    );
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const sp = await searchParams;
  const { category_id, title } = sp;
  const currentCategoryId = category_id ? parseInt(category_id, 10) : undefined;
  const currentTitleFilter = title;
  const categories = await getPostCategories();
  const suspenseKey = `posts-${category_id ?? 'todas'}-${title ?? 'tudo'}`;

  return (
    <div className="bg-background">
      <main>
        <section className="bg-muted/50 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-display font-bold text-foreground mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Dicas e novidades da culinária inclusiva
            </p>
          </div>
        </section>

        <section className="py-8 border-y bg-card">
          <BlogFilterControls
            categories={categories}
            initialCategoryId={category_id}
            initialQuery={currentTitleFilter}
          />
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <Suspense key={suspenseKey} fallback={<PostListSkeleton />}>
              <PostList
                categoryId={currentCategoryId}
                title={currentTitleFilter}
              />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  );
}
