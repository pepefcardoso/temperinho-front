// 1. Declarado como um Componente de Cliente para poder usar o hook useState.
'use client';

import { useState } from 'react';
import Link from 'next/link'; // 2. Importado para navegação sem recarregar a página.
import RecipeCard from './RecipeCard'; // Certifique-se de que o caminho está correto.
import { Button } from '@/components/ui/button'; // Para um botão com estilo consistente.

// Para boas práticas, este tipo viria de um arquivo central, como @/types/recipe.ts
// export interface Recipe { ... }
type Recipe = {
    id: string;
    title: string;
    description: string;
    image: string;
    prepTime: string;
    servings: number;
    difficulty: 'Fácil' | 'Médio' | 'Difícil';
    rating: number;
    dietaryTags: string[];
    author: string;
};

// Em uma aplicação real, estes dados viriam de uma API.
const mockRecipes: Recipe[] = [
    {
        id: '1',
        title: 'Brownies Veganos de Chocolate',
        description: 'Deliciosos brownies veganos feitos com ingredientes naturais e muito chocolate. Perfeitos para quem busca uma sobremesa inclusiva.',
        image: 'https://plus.unsplash.com/premium_photo-1675252369719-dd52bc69c3df?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        prepTime: '45 min',
        servings: 8,
        difficulty: 'Fácil',
        rating: 4.8,
        dietaryTags: ['Vegano', 'Sem Lactose'],
        author: 'Maria Silva'
    },
    {
        id: '2',
        title: 'Risotto de Cogumelos sem Glúten',
        description: 'Um risotto cremoso feito com arroz arbóreo e cogumelos frescos, totalmente livre de glúten e cheio de sabor.',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        prepTime: '35 min',
        servings: 4,
        difficulty: 'Médio',
        rating: 4.6,
        dietaryTags: ['Sem Glúten', 'Vegetariano'],
        author: 'João Costa'
    },
    {
        id: '3',
        title: 'Salada Buddha Bowl Completa',
        description: 'Uma salada nutritiva e colorida com quinoa, legumes assados e molho tahine. Rica em proteínas vegetais.',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=962&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        prepTime: '25 min',
        servings: 2,
        difficulty: 'Fácil',
        rating: 4.9,
        dietaryTags: ['Vegano', 'Sem Glúten', 'Low FODMAP'],
        author: 'Ana Ferreira'
    },
    {
        id: '4',
        title: 'Pão de Alho Sem Lactose',
        description: 'Pão de alho crocante e aromático feito com margarina vegana e alho fresco. Ideal para acompanhar massas.',
        image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        prepTime: '20 min',
        servings: 6,
        difficulty: 'Fácil',
        rating: 4.7,
        dietaryTags: ['Sem Lactose', 'Vegetariano'],
        author: 'Pedro Santos'
    },
    {
        id: '5',
        title: 'Smoothie Bowl Proteico',
        description: 'Um smoothie bowl nutritivo com frutas vermelhas, proteína vegetal e granola sem glúten. Perfeito para o café da manhã.',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        prepTime: '10 min',
        servings: 1,
        difficulty: 'Fácil',
        rating: 4.5,
        dietaryTags: ['Vegano', 'Sem Glúten', 'Cetogênica'],
        author: 'Carla Lima'
    },
    {
        id: '6',
        title: 'Lasanha de Abobrinha Low FODMAP',
        description: 'Uma lasanha leve e saborosa usando fatias de abobrinha no lugar da massa, com molho de tomate caseiro.',
        image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        prepTime: '60 min',
        servings: 6,
        difficulty: 'Médio',
        rating: 4.4,
        dietaryTags: ['Low FODMAP', 'Sem Glúten', 'Vegetariano'],
        author: 'Roberto Alves'
    }
];

const FeaturedRecipes = () => {
    const [favorites, setFavorites] = useState<string[]>([]);

    const handleFavorite = (recipeId: string) => {
        setFavorites(prev =>
            prev.includes(recipeId)
                ? prev.filter(id => id !== recipeId)
                : [...prev, recipeId]
        );
    };

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-warm-900 mb-4">
                        Receitas em Destaque
                    </h2>
                    <p className="text-lg text-warm-600 max-w-2xl mx-auto">
                        Explore nossas receitas mais amadas pela comunidade,
                        todas testadas e aprovadas por quem entende de culinária inclusiva.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mockRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onFavorite={handleFavorite}
                            isFavorited={favorites.includes(recipe.id)}
                        />
                    ))}
                </div>

                <div className="text-center mt-12">
                    {/* 3. Botão de navegação adaptado com Link e Button */}
                    <Link href="/receitas" passHref>
                        <Button size="lg" className="bg-sage-600 hover:bg-sage-700 text-white font-semibold px-8 py-3 rounded-lg">
                            Ver Todas as Receitas
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedRecipes;