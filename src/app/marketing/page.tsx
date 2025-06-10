import { Target, Users, TrendingUp, Star, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';


import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';

// --- Dados da Página ---

const stats = [
    { label: 'Visitantes Mensais', value: '150K+', growth: '+25%' },
    { label: 'Usuários Ativos', value: '45K+', growth: '+18%' },
    { label: 'Receitas Visualizadas', value: '2M+', growth: '+32%' },
    { label: 'Engajamento', value: '85%', growth: '+12%' }
];

const audience = [
    { demographic: 'Mulheres 25-45 anos', percentage: '65%' },
    { demographic: 'Interessados em alimentação saudável', percentage: '78%' },
    { demographic: 'Com restrições alimentares', percentage: '45%' },
    { demographic: 'Classe A e B', percentage: '52%' }
];

const packages = [
    {
        name: 'Banner Básico', price: 'R$ 2.500', period: '/mês', description: 'Ideal para começar a divulgar sua marca',
        features: ['Banner lateral (300x250px)', '100K impressões/mês', 'Relatório básico de performance', 'Segmentação por categoria'],
        badge: '', isPopular: false
    },
    {
        name: 'Banner Premium', price: 'R$ 5.000', period: '/mês', description: 'Máxima visibilidade para sua marca',
        features: ['Banner principal (728x90px)', '250K impressões/mês', 'Relatório detalhado de performance', 'Segmentação avançada', 'Banner em artigos de destaque', 'Suporte prioritário'],
        badge: 'Mais Popular', isPopular: true
    },
    {
        name: 'Campanha Completa', price: 'R$ 12.000', period: '/mês', description: 'Solução completa de marketing digital',
        features: ['Múltiplos formatos de banner', '500K impressões/mês', 'Conteúdo patrocinado', 'Newsletter dedicada', 'Posts em redes sociais', 'Relatórios executivos', 'Gerente de conta dedicado'],
        badge: 'Melhor Valor', isPopular: false
    }
];

// --- Componente da Página ---

export default function MarketingPage() {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-sage-600 to-sage-700 text-white py-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
                                    Anuncie com a Gente
                                </h1>
                                <p className="text-xl text-sage-100 dark:text-sage-200 mb-8 leading-relaxed">
                                    Conecte sua marca com milhares de pessoas apaixonadas por culinária inclusiva. Alcance seu público-alvo de forma autêntica e eficaz.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="lg" className="bg-white text-sage-700 hover:bg-warm-50">
                                        Ver Pacotes
                                    </Button>
                                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-sage-700">
                                        Falar com Consultor
                                    </Button>
                                </div>
                            </div>
                            <div className="relative h-80">
                                <Image
                                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                                    alt="Gráficos de análise de marketing"
                                    fill
                                    className="w-full h-full object-cover rounded-xl shadow-2xl"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 bg-card">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                                Números que Impressionam
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Nossa audiência engajada cresce constantemente, oferecendo excelentes oportunidades para sua marca.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {stats.map((stat) => (
                                <div key={stat.label} className="text-center p-6 bg-background rounded-xl">
                                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                                    <div className="text-foreground font-medium mb-1">{stat.label}</div>
                                    <div className="flex items-center justify-center text-sm text-green-600">
                                        <TrendingUp className="h-4 w-4 mr-1" />
                                        {stat.growth} vs mês anterior
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Top AdBanner Section */}
                <section className="py-8 bg-warm-50 dark:bg-warm-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AdBanner size="large" position="top" />
                    </div>
                </section>

                {/* Audience Section */}
                <section className="py-16 bg-background">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-display font-bold text-foreground mb-6">
                                    Conheça Nossa Audiência
                                </h2>
                                <p className="text-muted-foreground mb-8 leading-relaxed">
                                    Nossa comunidade é formada por pessoas engajadas, com alto poder de compra e interesse genuíno em produtos e serviços relacionados à alimentação saudável e inclusiva.
                                </p>
                                <div className="space-y-4">
                                    {audience.map((item) => (
                                        <div key={item.demographic} className="flex items-center justify-between p-4 bg-card rounded-lg border">
                                            <span className="text-card-foreground">{item.demographic}</span>
                                            <Badge variant="secondary">{item.percentage}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-card p-6 rounded-xl text-center shadow-sm border">
                                    <Target className="h-8 w-8 text-primary mx-auto mb-4" />
                                    <h3 className="font-semibold text-foreground mb-2">Segmentação Precisa</h3>
                                    <p className="text-sm text-muted-foreground">Anúncios direcionados por interesses e comportamento</p>
                                </div>
                                <div className="bg-card p-6 rounded-xl text-center shadow-sm border">
                                    <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                                    <h3 className="font-semibold text-foreground mb-2">Comunidade Ativa</h3>
                                    <p className="text-sm text-muted-foreground">Alto engajamento e interação com conteúdo</p>
                                </div>
                                <div className="bg-card p-6 rounded-xl text-center shadow-sm border">
                                    <Star className="h-8 w-8 text-primary mx-auto mb-4" />
                                    <h3 className="font-semibold text-foreground mb-2">Confiança da Marca</h3>
                                    <p className="text-sm text-muted-foreground">Audiência confia em nossas recomendações</p>
                                </div>
                                <div className="bg-card p-6 rounded-xl text-center shadow-sm border">
                                    <TrendingUp className="h-8 w-8 text-primary mx-auto mb-4" />
                                    <h3 className="font-semibold text-foreground mb-2">Crescimento Constante</h3>
                                    <p className="text-sm text-muted-foreground">Base de usuários em expansão mensal</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Packages Section */}
                <section className="py-16 bg-card">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-display font-bold text-foreground mb-4">
                                Pacotes de Publicidade
                            </h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Escolha o pacote ideal para sua marca e comece a alcançar resultados hoje mesmo.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                            {packages.map((pkg) => (
                                <div key={pkg.name} className={cn(
                                    "relative bg-background rounded-xl p-8 shadow-lg border-2 flex flex-col h-full",
                                    pkg.isPopular ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                                )}>
                                    {pkg.badge && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                            <Badge variant={pkg.isPopular ? 'default' : 'secondary'} className="px-4 py-1">{pkg.badge}</Badge>
                                        </div>
                                    )}
                                    <div className="text-center mb-8">
                                        <h3 className="text-xl font-semibold text-foreground mb-2">{pkg.name}</h3>
                                        <div className="flex items-baseline justify-center mb-4">
                                            <span className="text-3xl font-bold text-primary">{pkg.price}</span>
                                            <span className="text-muted-foreground ml-1">{pkg.period}</span>
                                        </div>
                                        <p className="text-muted-foreground text-sm">{pkg.description}</p>
                                    </div>
                                    <ul className="space-y-4 mb-8 flex-grow">
                                        {pkg.features.map((feature) => (
                                            <li key={feature} className="flex items-start">
                                                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                                <span className="text-muted-foreground text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button size="lg" variant={pkg.isPopular ? 'default' : 'secondary'} className="w-full">
                                        Contratar Pacote <ArrowRight className="h-4 w-4 ml-2" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Middle AdBanner Section */}
                <section className="py-8 bg-warm-50 dark:bg-warm-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AdBanner size="medium" position="middle" />
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 bg-gradient-to-r from-accent/90 to-accent text-accent-foreground">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-display font-bold mb-4">
                            Pronto para Fazer sua Marca Crescer?
                        </h2>
                        <p className="text-accent-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                            Entre em contato conosco e descubra como podemos ajudar sua marca a alcançar milhares de consumidores engajados.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" variant="secondary" className="bg-white/90 text-accent hover:bg-white">
                                Solicitar Proposta
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/80 text-white hover:bg-white hover:text-accent">
                                Baixar Mídia Kit
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};