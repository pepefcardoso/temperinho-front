import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
    return (
        <section className="relative bg-gradient-to-br from-warm-50 via-sage-50 to-sunset-50 py-20 overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 bg-sage-300 rounded-full blur-xl"></div>
                <div className="absolute top-40 right-20 w-32 h-32 bg-sunset-300 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-warm-300 rounded-full blur-xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-6 mb-12">
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-warm-900 leading-tight">
                        Culinária para
                        <span className="block text-sage-700">todos os gostos</span>
                    </h1>

                    <p className="text-lg md:text-xl text-warm-700 max-w-3xl mx-auto leading-relaxed">
                        Descubra receitas deliciosas que respeitam suas restrições alimentares.
                        Uma comunidade acolhedora onde todos podem encontrar o sabor da inclusão.
                    </p>
                </div>

                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-warm-500 h-5 w-5" />
                        <Input
                            type="text"
                            placeholder="Busque por receitas, ingredientes ou restrições..."
                            className="pl-12 py-4 text-lg bg-white/80 backdrop-blur-sm border-warm-200 focus:border-sage-400 focus:ring-sage-400 rounded-xl shadow-lg"
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-3">
                        <Button variant="outline" className="bg-white/60 border-sage-300 text-sage-700 hover:bg-sage-50 rounded-full px-6">
                            🌱 Vegano
                        </Button>
                        <Button variant="outline" className="bg-white/60 border-sage-300 text-sage-700 hover:bg-sage-50 rounded-full px-6">
                            🌾 Sem Glúten
                        </Button>
                        <Button variant="outline" className="bg-white/60 border-sage-300 text-sage-700 hover:bg-sage-50 rounded-full px-6">
                            🥛 Sem Lactose
                        </Button>
                        <Button variant="outline" className="bg-white/60 border-sage-300 text-sage-700 hover:bg-sage-50 rounded-full px-6">
                            🥬 Vegetariano
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-sage-700">500+</div>
                        <div className="text-warm-600 font-medium">Receitas</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-sage-700">50k+</div>
                        <div className="text-warm-600 font-medium">Usuários</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-sage-700">15</div>
                        <div className="text-warm-600 font-medium">Restrições</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-sage-700">4.8</div>
                        <div className="text-warm-600 font-medium">Avaliação</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;