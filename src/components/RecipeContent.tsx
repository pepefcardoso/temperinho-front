'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Recipe, Ingredient } from '@/types/recipe';
import { cn } from '@/lib/utils';
import { Lightbulb } from 'lucide-react';
import AdBanner from './AdBanner';

interface RecipeContentProps {
    recipe: Recipe;
}

export function RecipeContent({ recipe }: RecipeContentProps) {
    const [currentStep, setCurrentStep] = useState(-1);

    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
                <Tabs defaultValue="ingredients" className="space-y-8">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
                        <TabsTrigger value="ingredients">Ingredientes</TabsTrigger>
                        <TabsTrigger value="instructions">Modo de Preparo</TabsTrigger>
                        {recipe.nutritionalInfo && <TabsTrigger value="nutrition">Nutricional</TabsTrigger>}
                        {recipe.tips && recipe.tips.length > 0 && <TabsTrigger value="tips">Dicas</TabsTrigger>}
                    </TabsList>

                    <TabsContent value="ingredients">
                        <div className="bg-card rounded-xl p-6 shadow-sm border">
                            <h3 className="text-xl font-semibold text-foreground mb-6">Ingredientes para {recipe.servings}</h3>
                            <div className="space-y-4">
                                {recipe.ingredients.map((ing: Ingredient, index: number) => (
                                    <div key={index} className="flex items-start justify-between p-3 bg-muted rounded-lg border">
                                        <div>
                                            <span className="font-medium text-foreground">{ing.quantity}</span>
                                            <span className="ml-2 text-foreground/80">{ing.item}</span>
                                            {ing.notes && (<p className="text-sm text-muted-foreground mt-1 italic">{ing.notes}</p>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="instructions">
                        <div className="bg-card rounded-xl p-6 shadow-sm border">
                            <h3 className="text-xl font-semibold text-foreground mb-6">Modo de Preparo</h3>
                            <div className="space-y-4">
                                {recipe.instructions.map((step: string, index: number) => (
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

                    {recipe.nutritionalInfo && (
                        <TabsContent value="nutrition">
                            <div className="bg-card rounded-xl p-6 shadow-sm border">
                                <h3 className="text-xl font-semibold text-foreground mb-6">Informações Nutricionais (por porção)</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                    {Object.entries(recipe.nutritionalInfo).map(([key, value]) => (
                                        <div key={key} className="text-center p-4 bg-muted rounded-lg border">
                                            <div className="text-lg font-bold text-foreground">{value}</div>
                                            <div className="text-sm text-muted-foreground capitalize">{key.replace('_', ' ')}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    )}

                    {recipe.tips && recipe.tips.length > 0 && (
                        <TabsContent value="tips">
                            <div className="bg-card rounded-xl p-6 shadow-sm border">
                                <h3 className="text-xl font-semibold text-foreground mb-6">Dicas do Chef</h3>
                                <div className="space-y-4">
                                    {recipe.tips.map((tip, index) => (
                                        <div key={index} className="flex items-start space-x-3 p-4 bg-accent/10 rounded-lg border border-accent/20">
                                            <div className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center mt-1">
                                                <Lightbulb className="h-4 w-4 text-accent-foreground" />
                                            </div>
                                            <p className="text-foreground/90">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    )}
                </Tabs>
                <div className="my-12"><AdBanner href="/anuncie" layout="full" /></div>
            </div>
        </section>
    );
}