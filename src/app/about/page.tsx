import { Users, Heart, Award, Target } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';

// Componentes (assumindo que estes caminhos estão corretos no seu projeto)
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import AdBanner from '@/components/AdBanner';

// Metadados para SEO
export const metadata: Metadata = {
    title: 'Sobre Nós | Culinária Inclusiva',
    description: 'Conheça nossa história, missão e a equipe apaixonada por trás da culinária verdadeiramente inclusiva.',
};

const teamMembers = [
    {
        name: 'Ana Silva',
        role: 'Fundadora & Chef',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b865?w=300&h=300&fit=crop&crop=face',
        bio: 'Chef especializada em culinária inclusiva há mais de 15 anos, apaixonada por criar experiências gastronômicas acessíveis a todos.'
    },
    {
        name: 'Dr. Carlos Nutrição',
        role: 'Consultor Nutricional',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face',
        bio: 'Nutricionista especializado em dietas restritivas e alimentação funcional, com foco em saúde digestiva.'
    },
    {
        name: 'Marina Costa',
        role: 'Editora de Conteúdo',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
        bio: 'Jornalista gastronômica e escritora, dedicada a tornar a culinária inclusiva mais acessível através da comunicação.'
    }
];

const values = [
    {
        icon: Heart,
        title: 'Inclusão',
        description: 'Acreditamos que todos merecem desfrutar de uma alimentação saborosa e nutritiva, independentemente de suas restrições alimentares.'
    },
    {
        icon: Users,
        title: 'Comunidade',
        description: 'Construímos uma comunidade acolhedora onde pessoas compartilham experiências e descobrem novas possibilidades culinárias.'
    },
    {
        icon: Target,
        title: 'Qualidade',
        description: 'Cada receita é cuidadosamente testada e desenvolvida para garantir sabor excepcional e resultados consistentes.'
    },
    {
        icon: Award,
        title: 'Inovação',
        description: 'Estamos sempre explorando novas técnicas e ingredientes para criar soluções culinárias criativas e deliciosas.'
    }
];

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="bg-gradient-to-r from-warm-50 to-sage-50 py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-warm-900 mb-6">
                            Nossa História
                        </h1>
                        <p className="text-xl text-warm-600 max-w-3xl mx-auto leading-relaxed">
                            Nascemos da paixão por criar uma culinária verdadeiramente inclusiva,
                            onde cada pessoa pode encontrar receitas deliciosas que atendem às suas necessidades alimentares.
                        </p>
                    </div>
                </section>

                {/* Top Banner */}
                <section className="py-8">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AdBanner size="large" position="top" />
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="relative w-full h-80">
                                <Image
                                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
                                    alt="Nossa cozinha"
                                    fill
                                    className="object-cover rounded-xl shadow-lg"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-semibold text-warm-900 mb-4">Nossa Missão</h2>
                                    <p className="text-warm-700 leading-relaxed">
                                        Democratizar o acesso a receitas saborosas e nutritivas para pessoas com diferentes
                                        restrições alimentares, criando uma comunidade onde a culinária une ao invés de excluir.
                                    </p>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-warm-900 mb-4">Nossa Visão</h2>
                                    <p className="text-warm-700 leading-relaxed">
                                        Ser a principal plataforma de referência em culinária inclusiva no Brasil,
                                        inspirando milhões de pessoas a descobrir o prazer de cozinhar sem limitações.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-16 bg-warm-25">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-display font-bold text-warm-900 mb-4">
                                Nossos Valores
                            </h2>
                            <p className="text-warm-600 max-w-2xl mx-auto">
                                Os princípios que guiam cada receita, cada artigo e cada interação em nossa plataforma.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value) => (
                                <div key={value.title} className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-sage-100 rounded-lg mb-4">
                                        <value.icon className="h-6 w-6 text-sage-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-warm-900 mb-3">{value.title}</h3>
                                    <p className="text-warm-600 text-sm leading-relaxed">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="py-16 bg-white">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-display font-bold text-warm-900 mb-4">
                                Nossa Equipe
                            </h2>
                            <p className="text-warm-600 max-w-2xl mx-auto">
                                Conheça as pessoas apaixonadas que tornam possível nossa missão de criar uma culinária verdadeiramente inclusiva.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {teamMembers.map((member) => (
                                <div key={member.name} className="text-center">
                                    <div className="relative w-48 h-48 mx-auto mb-6">
                                        <Image
                                            src={member.image}
                                            alt={`Foto de ${member.name}`}
                                            fill
                                            className="object-cover rounded-full shadow-lg"
                                            sizes="192px"
                                        />
                                    </div>
                                    <h3 className="text-xl font-semibold text-warm-900 mb-2">{member.name}</h3>
                                    <p className="text-sage-600 font-medium mb-4">{member.role}</p>
                                    <p className="text-warm-600 text-sm leading-relaxed">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Middle Banner */}
                <section className="py-8 bg-warm-25">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <AdBanner size="medium" position="middle" />
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-16 bg-gradient-to-r from-sage-600 to-sage-700 text-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl font-display font-bold mb-4">
                            Faça Parte da Nossa Comunidade
                        </h2>
                        <p className="text-sage-100 text-lg mb-8 max-w-2xl mx-auto">
                            Junte-se a milhares de pessoas que já descobriram como a culinária inclusiva
                            pode transformar a experiência de cozinhar e compartilhar refeições.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button className="bg-white text-sage-700 hover:bg-warm-50 px-8 py-3">
                                Explorar Receitas
                            </Button>
                            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-sage-700 px-8 py-3">
                                Entrar em Contato
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;