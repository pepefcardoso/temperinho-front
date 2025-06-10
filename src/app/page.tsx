import HeroSection from '@/components/HeroSection';
import BlogSection from '@/components/BlogSection';
import NewsletterSection from '@/components/Newsletter/NewsletterSection';
import RecipeSection from '@/components/RecipeSection';
import { getFeaturedRecipes } from '@/lib/api/recipe';

const HomePage = async () => {
  const initialRecipes = await getFeaturedRecipes();

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