import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ValuesSection } from '@/components/about/ValuesSection';
import { TeamSection } from '@/components/about/TeamSection';
import { getAboutPageData } from '@/lib/api/about';

export const metadata: Metadata = {
    title: 'Sobre Nós | Leve Sabor',
    description: 'Conheça nossa história, missão e a equipe apaixonada por trás da culinária verdadeiramente inclusiva.',
};

export default function AboutPage() {
    const { team, values } = getAboutPageData();

    return (
        <div className="bg-background">
            <main>
                <section className="bg-muted/50 py-16">
                    <div className="container mx-auto px-4 text-center max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">Nossa História</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Nascemos da paixão por criar uma culinária verdadeiramente inclusiva, onde cada pessoa pode encontrar receitas deliciosas que atendem às suas necessidades alimentares.
                        </p>
                    </div>
                </section>

                <section className="py-16 bg-card">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
                                <Image src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop" alt="Nossa cozinha" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                            </div>
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-3xl font-display font-semibold text-foreground mb-4">Nossa Missão</h2>
                                    <p className="text-muted-foreground text-lg leading-relaxed">Democratizar o acesso a receitas saborosas e nutritivas para pessoas com diferentes restrições alimentares, criando uma comunidade onde a culinária une ao invés de excluir.</p>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-display font-semibold text-foreground mb-4">Nossa Visão</h2>
                                    <p className="text-muted-foreground text-lg leading-relaxed">Ser a principal plataforma de referência em culinária inclusiva no Brasil, inspirando milhões de pessoas a descobrir o prazer de cozinhar sem limitações.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <ValuesSection values={values} />

                <TeamSection teamMembers={team} />

                <section className="py-16 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4 text-center max-w-3xl">
                        <h2 className="text-3xl font-display font-bold mb-4">Faça Parte da Nossa Comunidade</h2>
                        <p className="text-primary-foreground/80 text-lg mb-8">Junte-se a milhares de pessoas que já descobriram como a culinária inclusiva pode transformar a experiência de cozinhar e compartilhar refeições.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" asChild>
                                <Link href="/receitas">Explorar Receitas</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-primary-foreground/50 hover:bg-primary-foreground hover:text-primary" asChild>
                                <Link href="/contato">Entrar em Contato</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
