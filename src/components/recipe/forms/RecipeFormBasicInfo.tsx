'use client';

import * as React from 'react';
import { Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RecipeDifficultyLabels, type RecipeCategory } from '@/types/recipe';
import { getRecipeCategories } from '@/lib/api/recipe';

interface BasicInfoProps {
    control: any;
    register: any;
    errors: any;
}

export function RecipeFormBasicInfo({ control, register, errors }: BasicInfoProps) {
    const [categories, setCategories] = React.useState<RecipeCategory[]>([]);

    React.useEffect(() => {
        getRecipeCategories().then(setCategories);
    }, []);

    return (
        <Card>
            <CardHeader><CardTitle>Informações Básicas</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label htmlFor="title">Título da Receita *</Label>
                    <Input id="title" {...register('title')} />
                    {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <Label htmlFor="description">Descrição *</Label>
                    <Textarea id="description" {...register('description')} />
                    {errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <Label htmlFor="time">Tempo (min) *</Label>
                        <Input id="time" type="number" {...register('time', { valueAsNumber: true })} />
                        {errors.time && <p className="text-sm text-destructive mt-1">{errors.time.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="portion">Porções *</Label>
                        <Input id="portion" type="number" {...register('portion', { valueAsNumber: true })} />
                        {errors.portion && <p className="text-sm text-destructive mt-1">{errors.portion.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="difficulty">Dificuldade *</Label>
                        <Controller
                            name="difficulty"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={String(field.value ?? '')}
                                    onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                >
                                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(RecipeDifficultyLabels).map(([level, label]) => (
                                            <SelectItem key={level} value={level}>
                                                {label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.difficulty && <p className="text-sm text-destructive mt-1">{errors.difficulty.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="category_id">Categoria *</Label>
                        <Controller
                            name="category_id"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={String(field.value ?? '')}
                                    onValueChange={(value) => field.onChange(parseInt(value, 10))}
                                >
                                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                                    <SelectContent>
                                        {categories.map(c => <SelectItem key={c.id} value={String(c.id)}>{c.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.category_id && <p className="text-sm text-destructive mt-1">{errors.category_id.message}</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}