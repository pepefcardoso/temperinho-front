import { dummyBlogPosts } from "@/lib/dummy-data/blog";
import { Post } from "@/types/blog";

/**
 * Simula uma chamada de API para buscar os últimos posts do blog.
 */
export async function getLatestPosts(limit: number = 3): Promise<Post[]> {
  console.log("Fetching latest blog posts...");
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simula delay

  // Ordena por data (mais recente primeiro) e pega o limite
  const sortedPosts = [...dummyBlogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return sortedPosts.slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  console.log(`Fetching post with slug: ${slug}`);
  await new Promise((resolve) => setTimeout(resolve, 300)); // Simula delay

  return dummyBlogPosts.find((post) => post.slug === slug);
}

// Função principal para buscar todos os posts, com filtros
export async function getPosts(options?: {
  category?: string;
  tag?: string;
}): Promise<Post[]> {
  await new Promise((resolve) => setTimeout(resolve, 200)); // Simula delay

  let posts = [...dummyBlogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (options?.category) {
    posts = posts.filter((post) => post.category === options.category);
  }
  if (options?.tag) {
    posts = posts.filter((post) => post.tags.includes(options.tag!));
  }
  return posts;
}

// Funções específicas para conveniência
export async function getFeaturedPosts(limit: number = 3): Promise<Post[]> {
  const allPosts = await getPosts();
  return allPosts.filter((post) => post.featured).slice(0, limit);
}

export async function getAllCategories(): Promise<string[]> {
  // Em uma API real, isso viria do backend. Aqui, extraímos dos dados.
  const categories = new Set(dummyBlogPosts.map((p) => p.category));
  return ["Todas", ...Array.from(categories)];
}
