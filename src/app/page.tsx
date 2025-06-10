// 1. Essencial: Declarado como um Componente de Cliente por causa do useState.
'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection'; // Supondo que você tenha este componente
import DietaryFilters from '@/components/DietaryFilters';
import FeaturedRecipes from '@/components/FeaturedRecipes';
import BlogSection from '@/components/BlogSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HomePage = () => {
  // A lógica de estado e a função de callback permanecem as mesmas.
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFiltersChange = (filters: string[]) => {
    setSelectedFilters(filters);
    // No futuro, você pode usar esses filtros para atualizar a lista de receitas.
    console.log('Filtros selecionados na página principal:', filters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Seção Hero */}
        <HeroSection />
        
        {/* Filtros Alimentares */}
        <section id="filtros" className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <DietaryFilters 
              selectedFilters={selectedFilters}
              onFiltersChange={handleFiltersChange}
            />
          </div>
        </section>

        {/* Receitas em Destaque */}
        <FeaturedRecipes />

        {/* Seção do Blog */}
        <BlogSection />

        {/* Chamada para Newsletter */}
        <section className="py-16 bg-gradient-to-r from-sage-600 to-sage-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Junte-se à Nossa Comunidade
            </h2>
            <p className="text-xl text-sage-100 mb-8 max-w-2xl mx-auto">
              Receba receitas exclusivas, dicas de substituições e novidades 
              sobre culinária inclusiva direto no seu email.
            </p>
            {/* 2. Usando componentes Input e Button para consistência de estilo. */}
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Digite seu email"
                className="flex-1 px-4 py-3 rounded-xl border-0 text-warm-900 placeholder-warm-500 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <Button type="submit" size="lg" className="bg-sunset-500 hover:bg-sunset-600 text-white font-medium whitespace-nowrap">
                Assinar Grátis
              </Button>
            </form>
            <p className="text-sage-200 text-sm mt-4">
              Sem spam. Cancele a qualquer momento.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;