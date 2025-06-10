import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getLatestPosts } from '@/lib/api/blog';
import { BlogPostCard } from './BlogPostCard';

const BlogSection = async () => {
  const posts = await getLatestPosts(3);

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-muted/50 dark:bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Últimas do Nosso Blog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fique por dentro das novidades, dicas e histórias inspiradoras do mundo da culinária inclusiva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/blog">Ver Todo o Blog</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;