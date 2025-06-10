// src/app/receitas/[slug]/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Heart, Clock, Users, Star, ChefHat, Share2, Printer, Bookmark } from 'lucide-react';


import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import AdBanner from '@/components/AdBanner';

// --- Tipos e Dados ---
type Recipe = {
    id: string;
    title: string;
    description: string;
    image: string;
    prepTime: string; cookTime: string; totalTime: string;
    servings: number;
    difficulty: string;
    rating: number;
    reviewCount: number;
    dietaryTags: string[];
    author: { name: string; avatar: string; bio: string; };
    ingredients: { item: string; quantity: string; notes: string; }[];
    instructions: string[];
    nutritionalInfo: { calories: string; protein: string; carbs: string; fat: string; fiber: string; };
    tips: string[];
};

const mockRecipe: Recipe = {
    id: '1',
    title: 'Brownies Veganos de Chocolate',
    description: 'Deliciosos brownies veganos feitos com ingredientes naturais e muito chocolate. Uma receita perfeita para quem busca uma sobremesa inclusiva, rica em sabor e textura cremosa.',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&h=600&fit=crop',
    prepTime: '20 min', cookTime: '25 min', totalTime: '45 min',
    servings: 8,
    difficulty: 'Fácil',
    rating: 4.8, reviewCount: 156,
    dietaryTags: ['Vegano', 'Sem Lactose', 'Sem Ovos'],
    author: { name: 'Maria Silva', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b865?w=100&h=100&fit=crop&crop=face', bio: 'Chef especializada em culinária vegana' },
    ingredients: [
        { item: 'Farinha de trigo', quantity: '2 xícaras', notes: 'pode substituir por farinha de aveia' },
        { item: 'Cacau em pó', quantity: '3/4 xícara', notes: '' },
        { item: 'Açúcar demerara', quantity: '1 xícara', notes: '' },
        { item: 'Óleo de coco', quantity: '1/2 xícara', notes: 'derretido' },
        { item: 'Leite vegetal', quantity: '1/2 xícara', notes: 'de sua preferência' },
        { item: 'Essência de baunilha', quantity: '1 colher de chá', notes: '' },
        { item: 'Fermento em pó', quantity: '1 colher de chá', notes: '' },
        { item: 'Sal', quantity: '1/2 colher de chá', notes: '' },
        { item: 'Chocolate vegano picado', quantity: '1/2 xícara', notes: 'opcional' }
    ],
    instructions: [
        'Pré-aqueça o forno a 180°C e unte uma forma quadrada de 20cm.',
        'Em uma tigela grande, misture a farinha, cacau em pó, açúcar, fermento e sal.',
        'Em outra tigela, bata o óleo de coco derretido, leite vegetal e essência de baunilha.',
        'Adicione os ingredientes líquidos aos secos e misture até formar uma massa homogênea.',
        'Se desejar, adicione o chocolate picado e misture delicadamente.',
        'Despeje a massa na forma preparada e nivele com uma espátula.',
        'Asse por 25-30 minutos ou até que um palito saia com poucos resíduos úmidos.',
        'Deixe esfriar completamente antes de cortar em quadrados.',
        'Sirva e aproveite!'
    ],
    nutritionalInfo: { calories: '245 kcal', protein: '4g', carbs: '35g', fat: '12g', fiber: '3g' },
    tips: [
        'Para brownies mais fudgy, não asse demais - eles devem estar úmidos no centro.',
        'Você pode substituir o açúcar demerara por açúcar de coco para uma opção mais saudável.',
        'Adicione nozes ou castanhas picadas para extra crocância.'
    ]
};


export default function RecipeDetailPage() {
    const params = useParams();
    const slug = params.slug;

    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorited, setIsFavorited] = useState(false);
    const [currentStep, setCurrentStep] = useState(-1); // -1 para nenhum passo selecionado inicialmente

    useEffect(() => {
        // Simula a busca de dados. Em um app real, você usaria o slug para buscar no seu backend.
        setRecipe(mockRecipe);
        setIsLoading(false);
    }, [slug]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Carregando receita...</div>;
    }

    if (!recipe) {
        return <div className="min-h-screen flex items-center justify-center">Receita não encontrada.</div>;
    }

    return (
        <main>
            {/* Recipe Header */}
            <section className="py-8 bg-card">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        <div className="relative">
                            <div className="relative w-full h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
                                <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
                            </div>
                            <Button
                                variant="ghost" size="icon" onClick={() => setIsFavorited(!isFavorited)}
                                className={cn('absolute top-4 right-4 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-200',
                                    isFavorited ? 'text-destructive' : 'text-muted-foreground'
                                )}
                            >
                                <Heart className={cn('h-5 w-5', isFavorited && 'fill-destructive')} />
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-display font-bold text-foreground mb-3">{recipe.title}</h1>
                                <p className="text-muted-foreground text-lg leading-relaxed">{recipe.description}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {recipe.dietaryTags.map((tag) => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="text-center p-3 bg-muted rounded-lg"><Clock className="h-5 w-5 mx-auto mb-2 text-muted-foreground" /><div className="text-sm font-medium text-foreground">{recipe.totalTime}</div><div className="text-xs text-muted-foreground">Total</div></div>
                                <div className="text-center p-3 bg-muted rounded-lg"><Users className="h-5 w-5 mx-auto mb-2 text-muted-foreground" /><div className="text-sm font-medium text-foreground">{recipe.servings}</div><div className="text-xs text-muted-foreground">Porções</div></div>
                                <div className="text-center p-3 bg-muted rounded-lg"><ChefHat className="h-5 w-5 mx-auto mb-2 text-muted-foreground" /><div className="text-sm font-medium text-foreground">{recipe.difficulty}</div><div className="text-xs text-muted-foreground">Dificuldade</div></div>
                                <div className="text-center p-3 bg-muted rounded-lg"><Star className="h-5 w-5 mx-auto mb-2 text-accent fill-accent" /><div className="text-sm font-medium text-foreground">{recipe.rating}</div><div className="text-xs text-muted-foreground">{recipe.reviewCount} avaliações</div></div>
                            </div>
                            <div className="flex items-center space-x-4 p-4 bg-primary/10 rounded-lg">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                                    <Image src={recipe.author.avatar} alt={recipe.author.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground">{recipe.author.name}</h3>
                                    <p className="text-sm text-muted-foreground">{recipe.author.bio}</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <Button variant="default"><Bookmark className="h-4 w-4 mr-2" />Salvar Receita</Button>
                                <Button variant="outline"><Share2 className="h-4 w-4 mr-2" />Compartilhar</Button>
                                <Button variant="outline"><Printer className="h-4 w-4 mr-2" />Imprimir</Button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-12"><AdBanner size="large" position="top" /></div>
                </div>
            </section>

            {/* Recipe Content */}
            <section className="py-12 bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Tabs defaultValue="ingredients" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                            <TabsTrigger value="ingredients">Ingredientes</TabsTrigger>
                            <TabsTrigger value="instructions">Modo de Preparo</TabsTrigger>
                            <TabsTrigger value="nutrition">Nutricional</TabsTrigger>
                            <TabsTrigger value="tips">Dicas</TabsTrigger>
                        </TabsList>
                        <TabsContent value="ingredients" className="space-y-6">
                            <div className="bg-card rounded-xl p-6 shadow-sm border">
                                <h3 className="text-xl font-semibold text-foreground mb-6">Ingredientes para {recipe.servings} porções</h3>
                                <div className="space-y-4">
                                    {recipe.ingredients.map((ing, index) => (
                                        <div key={index} className="flex items-start justify-between p-3 bg-muted rounded-lg">
                                            <div>
                                                <span className="font-medium text-foreground">{ing.quantity}</span>
                                                <span className="ml-2 text-foreground/80">{ing.item}</span>
                                                {ing.notes && (<p className="text-sm text-muted-foreground mt-1">{ing.notes}</p>)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="instructions" className="space-y-6">
                            <div className="bg-card rounded-xl p-6 shadow-sm border">
                                <h3 className="text-xl font-semibold text-foreground mb-6">Modo de Preparo</h3>
                                <div className="space-y-4">
                                    {recipe.instructions.map((step, index) => (
                                        <div key={index} className={cn('flex items-start space-x-4 p-4 rounded-lg transition-colors cursor-pointer', currentStep === index ? 'bg-primary/10 border-l-4 border-primary' : 'bg-muted hover:bg-muted/80')} onClick={() => setCurrentStep(index)}>
                                            <div className={cn('flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors', currentStep === index ? 'bg-primary text-primary-foreground' : 'bg-border text-foreground')}>
                                                {index + 1}
                                            </div>
                                            <p className="text-foreground/90 leading-relaxed pt-1">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="nutrition" className="space-y-6">
                            <div className="bg-card rounded-xl p-6 shadow-sm border">
                                <h3 className="text-xl font-semibold text-foreground mb-6">Informações Nutricionais (por porção)</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                    {Object.entries(recipe.nutritionalInfo).map(([key, value]) => (
                                        <div key={key} className="text-center p-4 bg-muted rounded-lg">
                                            <div className="text-lg font-bold text-foreground">{value}</div>
                                            <div className="text-sm text-muted-foreground capitalize">{key}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="tips" className="space-y-6">
                            <div className="bg-card rounded-xl p-6 shadow-sm border">
                                <h3 className="text-xl font-semibold text-foreground mb-6">Dicas da Chef</h3>
                                <div className="space-y-4">
                                    {recipe.tips.map((tip, index) => (
                                        <div key={index} className="flex items-start space-x-3 p-4 bg-accent/10 rounded-lg">
                                            <div className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                                                <span className="text-accent-foreground text-sm font-bold">!</span>
                                            </div>
                                            <p className="text-foreground/90">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className="my-12"><AdBanner size="medium" position="middle" /></div>
                </div>
            </section>
        </main>
    );
}