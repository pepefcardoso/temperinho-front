import type {
  UserFavoritePost,
  UserFavoriteRecipe,
  UserManagedPost,
  UserManagedRecipe,
  UserProfile,
} from "@/types/user";
import { dummyRecipes } from "../dummy-data/recipes";
import { dummyBlogPosts } from "../dummy-data/blog";

// Em uma aplicação real, esta função buscaria os dados do usuário logado.
export async function getUserProfile(): Promise<UserProfile> {
  await new Promise((res) => setTimeout(res, 200));
  return {
    id: "user_123",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    phone: "(11) 98765-4321",
    bio: "Apaixonada por culinária inclusiva e sustentável. Sempre buscando receitas que atendam diferentes necessidades alimentares.",
    city: "São Paulo",
    state: "SP",
    specialties: ["vegan", "gluten-free"],
    experience: "intermediario",
    website: "https://mariasantos.blog.com",
    instagram: "@mariasantos_cozinha",
  };
}

type GetUserRecipesOptions = {
  q?: string; // Termo de busca
  status?: "publicado" | "rascunho" | "pendente";
};

// Em um app real, esta função buscaria as receitas do usuário logado no banco de dados.
export async function getUserRecipes(
  options: GetUserRecipesOptions = {}
): Promise<UserManagedRecipe[]> {
  const { q, status } = options;

  // Simula a adição de campos de gerenciamento às receitas existentes
  const userRecipes: UserManagedRecipe[] = dummyRecipes.map((r, i) => ({
    ...r,
    status: i % 2 === 0 ? "publicado" : "rascunho",
    views: (i + 1) * 123,
    likes: (i + 1) * 23,
  }));

  let filteredRecipes = userRecipes;

  if (q) {
    filteredRecipes = filteredRecipes.filter((r) =>
      r.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (status) {
    filteredRecipes = filteredRecipes.filter((r) => r.status === status);
  }

  return filteredRecipes;
}

export async function getUserRecipeStats(): Promise<{
  published: number;
  drafts: number;
  totalViews: number;
}> {
  const recipes = await getUserRecipes(); // Neste caso, busca todas para calcular
  return {
    published: recipes.filter((r) => r.status === "publicado").length,
    drafts: recipes.filter((r) => r.status === "rascunho").length,
    totalViews: recipes.reduce((acc, r) => acc + r.views, 0),
  };
}

type GetUserArticlesOptions = {
  q?: string;
  status?: "publicado" | "rascunho" | "pendente";
};

export async function getUserArticles(
  options: GetUserArticlesOptions = {}
): Promise<UserManagedPost[]> {
  const { q, status } = options;

  // Simula a adição de campos de gerenciamento aos posts existentes
  const userArticles: UserManagedPost[] = dummyBlogPosts.map((p, i) => ({
    ...p,
    status: i % 2 === 0 ? "publicado" : "rascunho",
    views: (i + 1) * 217,
  }));

  let filteredArticles = userArticles;

  if (q) {
    filteredArticles = filteredArticles.filter((a) =>
      a.title.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (status) {
    filteredArticles = filteredArticles.filter((a) => a.status === status);
  }

  return filteredArticles;
}

export async function getUserArticleStats(): Promise<{
  published: number;
  drafts: number;
  totalViews: number;
}> {
  const articles = await getUserArticles();
  return {
    published: articles.filter((a) => a.status === "publicado").length,
    drafts: articles.filter((a) => a.status === "rascunho").length,
    totalViews: articles.reduce((acc, a) => acc + a.views, 0),
  };
}

type GetFavoritesOptions = {
  q?: string;
  category?: string;
};

// Em uma aplicação real, esta função buscaria os artigos favoritados pelo usuário logado.
export async function getFavoriteArticles(
  options: GetFavoritesOptions = {}
): Promise<UserFavoritePost[]> {
  const { q, category } = options;

  // Simula a adição do campo 'favoritedAt' aos posts existentes
  const favoriteArticles: UserFavoritePost[] = dummyBlogPosts.map((p, i) => ({
    ...p,
    favoritedAt: new Date(
      Date.now() - i * 3 * 24 * 60 * 60 * 1000
    ).toISOString(),
  }));

  let filteredArticles = favoriteArticles;

  if (q) {
    filteredArticles = filteredArticles.filter((a) =>
      a.title.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (category && category !== "todas") {
    filteredArticles = filteredArticles.filter((a) =>
      a.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  return filteredArticles;
}

export async function getFavoriteRecipes(
  options: { q?: string; category?: string } = {}
): Promise<UserFavoriteRecipe[]> {
  const { q, category } = options;

  // Simula a adição do campo 'favoritedAt' às nossas receitas fictícias
  const favoriteRecipes: UserFavoriteRecipe[] = dummyRecipes
    .slice(0, 4)
    .map((r, i) => ({
      ...r,
      category: ["Sobremesa", "Pães", "Bebida", "Prato Principal"][i % 4], // Simula categorias
      favoritedAt: new Date(
        Date.now() - i * 5 * 24 * 60 * 60 * 1000
      ).toISOString(),
    }));

  let filteredRecipes = favoriteRecipes;

  if (q) {
    filteredRecipes = filteredRecipes.filter((r) =>
      r.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  if (category && category !== "todas") {
    // Note: nosso dummy data não tem categoria, então este filtro não terá efeito
    // mas a lógica está aqui para quando os dados estiverem completos.
    // filteredRecipes = filteredRecipes.filter(r => r.category.toLowerCase() === category.toLowerCase());
  }

  return filteredRecipes;
}
