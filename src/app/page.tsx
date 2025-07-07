import HeroSection from '@/components/hero/HeroSection';
import BlogSection from '@/components/blog/BlogSection';
import FeaturedRecipes from '@/components/recipe/FeaturedRecipes';
import { getRecipes } from '@/lib/api/recipe';
import { Recipe } from '@/types/recipe';
import NewsletterSection from '@/components/Newsletter/NewsletterSection';

const HomePage = async () => {
  let initialRecipes: Recipe[] = [];

  try {
    const paginatedResponse = await getRecipes({
      sortBy: 'created_at',
      sortDirection: 'desc',
      limit: 3,
    });
    initialRecipes = paginatedResponse.data;
  } catch (error) {
    console.error("Falha ao buscar receitas para a página inicial:", error);
  }

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />

        <FeaturedRecipes recipes={initialRecipes} isLoading={false} />

        <BlogSection />

        <NewsletterSection />
      </main>
    </div>
  );
};

export default HomePage;