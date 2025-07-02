import HeroSection from '@/components/hero/HeroSection';
import BlogSection from '@/components/blog/BlogSection';
import NewsletterSection from '@/components/newsletter/NewsletterSection';
import RecipeSection from '@/components/recipe/RecipeSection';
import { getRecipes } from '@/lib/api/recipe';
import { Recipe } from '@/types/recipe';

const HomePage = async () => {
  let initialRecipes: Recipe[] = [];

  try {
    const paginatedResponse = await getRecipes({
      sortBy: 'created_at',
      sortDirection: 'desc',
      limit: 6,
    });
    initialRecipes = paginatedResponse.data;
  } catch (error) {
    console.error("Falha ao buscar receitas para a página inicial:", error);
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />

        <RecipeSection initialRecipes={initialRecipes} />

        <BlogSection />

        <NewsletterSection />
      </main>
    </div>
  );
};

export default HomePage;
