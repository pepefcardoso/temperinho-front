import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMarketingData } from '@/lib/api/marketing';
import { PageSkeleton } from '@/components/skeletons/PageSkeleton';
import { MarketingHero } from '@/components/marketing/MarketingHero';
// import { StatsCounter } from '@/components/marketing/StatsCounter';
import { PricingCard } from '@/components/marketing/PricingCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import type { MarketingStat, PricingPackage } from '@/types/marketing';

export const metadata: Metadata = {
    title: 'Anuncie Conosco | Temperinho',
    description: 'Conecte sua marca com milhares de pessoas apaixonadas por culinária inclusiva e alimentação saudável.',
};

function PricingSection({ packages }: { packages: PricingPackage[] }) {
    return (
        <section id="pacotes" className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-display font-bold text-foreground mb-4">Pacotes de Publicidade</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Escolha o plano ideal para sua marca e comece a alcançar resultados hoje.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
                    {packages.map((pkg) => <PricingCard key={pkg.name} pkg={pkg} />)}
                </div>
            </div>
        </section>
    );
}

// function StatsSection({ stats }: { stats: MarketingStat[] }) {
//     return (
//         <section className="py-16 bg-card">
//             <div className="container mx-auto px-4">
//                 <div className="text-center mb-12">
//                     <h2 className="text-3xl font-display font-bold text-foreground mb-4">Números que Impressionam</h2>
//                     <p className="text-muted-foreground max-w-2xl mx-auto">Nossa audiência engajada cresce constantemente, oferecendo excelentes oportunidades.</p>
//                 </div>
//                 <StatsCounter stats={stats} />
//             </div>
//         </section>
//     );
// }

function CtaSection() {
    return (
        <section className="py-16 bg-muted/50">
            <div className="container mx-auto px-4 text-center max-w-4xl">
                <h2 className="text-3xl font-display font-bold mb-4">Pronto para Fazer sua Marca Crescer?</h2>
                <p className="text-muted-foreground text-lg mb-8">Entre em contato e descubra como podemos ajudar sua marca a alcançar milhares de consumidores engajados.</p>
                <Button size="lg" asChild>
                    <Link href="/contato?assunto=proposta">Solicitar Proposta</Link>
                </Button>
            </div>
        </section>
    );
}

async function MarketingContent() {
    try {
        const { stats, packages, heroImageUrl } = await getMarketingData();
        return (
            <>
                <MarketingHero imageUrl={heroImageUrl} />
                {/* <StatsSection stats={stats} /> */}
                <PricingSection packages={packages} />
                <CtaSection />
            </>
        );
    } catch (error) {
        console.error("Falha ao carregar dados da página de marketing:", error);
        notFound();
    }
}

export default function MarketingPage() {
    return (
        <div className="bg-background">
            <Suspense fallback={<PageSkeleton layout="single-column" />}>
                <main>
                    <MarketingContent />
                </main>
            </Suspense>
        </div>
    );
}