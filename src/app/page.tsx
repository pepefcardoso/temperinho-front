import HeroSection from '@/components/HeroSection';
import BlogSection from '@/components/blog/BlogSection';
import NewsletterSection from '@/components/Newsletter/NewsletterSection';
import RecipeSection from '@/components/recipe/RecipeSection';
import { getRecipes } from '@/lib/api/recipe';

const HomePage = async () => {
  const paginatedResponse = await getRecipes({
    sortBy: 'created_at',
    sortDirection: 'desc',
    limit: 6,
  });

  const initialRecipes = paginatedResponse.data;

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
