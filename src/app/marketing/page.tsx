import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getMarketingData } from '@/lib/api/marketing';
import { StatsCounter } from '@/components/marketing/StatsCounter';
import { PricingCard } from '@/components/marketing/PricingCard';
import { PageSkeleton } from '@/components/skeletons/PageSkeleton';

export const metadata: Metadata = {
    title: 'Anuncie Conosco | Leve Sabor',
    description: 'Conecte sua marca com milhares de pessoas apaixonadas por culinária inclusiva e alimentação saudável.',
};

async function MarketingContent() {
    try {
        const { stats, packages } = await getMarketingData();

        return (
            <main>
                <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Anuncie com a Gente</h1>
                                <p className="text-xl text-primary-foreground/80 mb-8 leading-relaxed">
                                    Conecte sua marca com milhares de pessoas apaixonadas por culinária inclusiva. Alcance seu público-alvo de forma autêntica e eficaz.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="lg" variant="secondary" asChild>
                                        <Link href="#pacotes">Ver Pacotes</Link>
                                    </Button>
                                    <Button size="lg" variant="outline" className="border-primary-foreground/50 hover:bg-primary-foreground hover:text-primary" asChild>
                                        <Link href="/contato">Falar com Consultor</Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl">
                                <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop" alt="Gráficos de análise de marketing" fill className="object-cover" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-card">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Números que Impressionam</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">Nossa audiência engajada cresce constantemente, oferecendo excelentes oportunidades.</p>
                        </div>
                        <StatsCounter stats={stats} />
                    </div>
                </section>

                <section id="pacotes" className="py-16 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-display font-bold text-foreground mb-4">Pacotes de Publicidade</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">Escolha o plano ideal para sua marca e comece a alcançar resultados hoje.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
                            {packages.map((pkg) => (
                                <PricingCard key={pkg.name} pkg={pkg} />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 bg-muted/50">
                    <div className="container mx-auto px-4 text-center max-w-4xl">
                        <h2 className="text-3xl font-display font-bold mb-4">Pronto para Fazer sua Marca Crescer?</h2>
                        <p className="text-muted-foreground text-lg mb-8">Entre em contato e descubra como podemos ajudar sua marca a alcançar milhares de consumidores engajados.</p>
                        <Button size="lg" asChild>
                            <Link href="/contato?assunto=proposta">Solicitar Proposta</Link>
                        </Button>
                    </div>
                </section>
            </main>
        );
    } catch (error) {
        console.error("Falha ao carregar dados da página de marketing:", error);
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-2xl font-bold text-destructive">Algo deu errado</h1>
                <p className="text-muted-foreground mt-2">Não foi possível carregar as informações da página. Por favor, tente novamente mais tarde.</p>
            </div>
        );
    }
}

export default function MarketingPage() {
    return (
        <div className="bg-background">
            <Suspense fallback={<PageSkeleton layout="single-column" />}>
                <MarketingContent />
            </Suspense>
        </div>
    );
}