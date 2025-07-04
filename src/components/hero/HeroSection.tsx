import { getMarketingData } from '@/lib/api/marketing';
import { StatsCounter } from '../marketing/StatsCounter';
import { HeroSearchForm } from './HeroSearchForm';

const HeroSection = async () => {
    const { stats } = await getMarketingData();

    return (
        <section className="relative bg-gradient-to-br from-warm-50 via-sage-50 to-sunset-50 dark:from-warm-900/20 dark:via-sage-900/20 dark:to-sunset-900/20 py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 opacity-10 dark:opacity-20">
                <div className="absolute top-10 left-10 w-20 h-20 bg-sage-300 rounded-full blur-2xl"></div>
                <div className="absolute top-40 right-20 w-32 h-32 bg-sunset-300 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-warm-300 rounded-full blur-2xl"></div>
            </div>

            <div className="relative container mx-auto px-4 text-center space-y-8 md:space-y-12">
                <div className="space-y-6 mb-12">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground leading-tight">
                        Culinária para
                        <span className="block text-primary">todos os gostos</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Descubra receitas deliciosas que respeitam suas restrições alimentares.
                        Uma comunidade acolhedora onde todos podem encontrar o sabor da inclusão.
                    </p>
                </div>

                <HeroSearchForm />

                <StatsCounter stats={stats} />
            </div>
        </section>
    );
};

export default HeroSection;