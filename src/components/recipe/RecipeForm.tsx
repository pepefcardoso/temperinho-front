'use client';

import * as React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Save, Loader2, Plus, X, Upload } from 'lucide-react';
import { cva } from 'class-variance-authority';

import type { Recipe } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DIETARY_TAG_OPTIONS, RECIPE_CATEGORIES } from '@/lib/config/recipes';
import { createRecipeAction, updateRecipeAction } from '@/app/usuario/receitas/actions';
import { cn } from '@/lib/utils';

const recipeSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  name: z.string().min(5, { message: "O título precisa ter pelo menos 5 caracteres." }),
  description: z.string().min(20, { message: "A descrição precisa de pelo menos 20 caracteres." }),
  imageUrl: z.string().url({ message: "A imagem de capa é obrigatória." }).min(1, { message: "A imagem de capa é obrigatória." }),
  prepTimeMinutes: z.coerce.number().min(1, { message: "Tempo de preparo é obrigatório." }),
  cookTimeMinutes: z.coerce.number().min(0, "Tempo de cozimento inválido."),
  servings: z.string().min(1, { message: "O campo de porções é obrigatório." }),
  difficulty: z.enum(['Fácil', 'Médio', 'Difícil'], { required_error: "Selecione a dificuldade." }),
  category: z.string({ required_error: "Selecione uma categoria." }).min(1, { message: "Selecione uma categoria." }),
  dietaryTags: z.array(z.string()).min(1, { message: "Selecione pelo menos uma tag." }),
  ingredients: z.array(z.object({
    quantity: z.string().min(1, "Obrigatório"),
    item: z.string().min(2, "Obrigatório"),
    notes: z.string().optional(),
  })).min(1, { message: "Adicione pelo menos um ingrediente." }),
  instructions: z.array(z.object({
    text: z.string().min(10, "Cada passo precisa ser mais detalhado."),
  })).min(1, { message: "Adicione pelo menos um passo." }),
  tips: z.string().optional(),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

const tagButtonVariants = cva(
  "px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
  { variants: { selected: { true: 'bg-primary text-primary-foreground border-primary', false: 'bg-muted text-muted-foreground border-border hover:bg-accent' } } }
);

interface RecipeFormProps {
  initialData?: Partial<Recipe>;
  action: 'create' | 'update';
}

export function RecipeForm({ initialData, action }: RecipeFormProps) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = React.useState<string | null>(initialData?.imageUrl || null);

  const form = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      id: initialData?.id,
      slug: initialData?.slug,
      name: initialData?.name || '',
      description: initialData?.description || '',
      imageUrl: initialData?.imageUrl || '',
      prepTimeMinutes: initialData?.prepTimeMinutes || undefined,
      cookTimeMinutes: initialData?.cookTimeMinutes || 0,
      servings: initialData?.servings || '',
      difficulty: initialData?.difficulty,
      category: initialData?.category,
      dietaryTags: initialData?.dietaryTags || [],
      ingredients: initialData?.ingredients?.length ? initialData.ingredients : [{ quantity: '', item: '', notes: '' }],
      instructions: initialData?.instructions?.length ? initialData.instructions : [{ text: '' }],
      tips: initialData?.tips?.[0] || '',
    },
  });

  const { control, register, handleSubmit, formState: { errors, isSubmitting }, setValue } = form;

  const { fields: ingredients, append: addIngredient, remove: removeIngredient } = useFieldArray({ control, name: "ingredients" });
  const { fields: instructions, append: addInstruction, remove: removeInstruction } = useFieldArray({ control, name: "instructions" });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setValue('imageUrl', previewUrl, { shouldValidate: true });
      toast.info("Preview da imagem carregado. O upload real não está implementado.");
    }
  };

  const onSubmit = async (data: RecipeFormData) => {
    const totalTime = `${(data.prepTimeMinutes || 0) + (data.cookTimeMinutes || 0)} min`;
    const finalData = { ...initialData, ...data, totalTime, tips: data.tips ? [data.tips] : [] };

    const actionToSubmit = action === 'create' ? createRecipeAction : updateRecipeAction;
    const result = await actionToSubmit(finalData);

    if (result.success) {
      toast.success(result.message);
      router.push('/usuario/receitas');
    } else {
      toast.error(result.message || "Ocorreu um erro ao processar a receita.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Informações Básicas</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div><Label htmlFor="name">Título da Receita *</Label><Input id="name" {...register('name')} placeholder="Ex: Pão Integral sem Glúten" className="mt-1" />{errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}</div>
          <div><Label htmlFor="description">Descrição Curta *</Label><Textarea id="description" {...register('description')} placeholder="Descreva sua receita em poucas palavras..." className="mt-1 min-h-24" />{errors.description && <p className="text-sm text-destructive mt-1">{errors.description.message}</p>}</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><Label htmlFor="prepTimeMinutes">Preparo (min) *</Label><Input id="prepTimeMinutes" type="number" {...register('prepTimeMinutes')} placeholder="30" className="mt-1" />{errors.prepTimeMinutes && <p className="text-sm text-destructive mt-1">{errors.prepTimeMinutes.message}</p>}</div>
            <div><Label htmlFor="cookTimeMinutes">Cozimento (min)</Label><Input id="cookTimeMinutes" type="number" {...register('cookTimeMinutes')} placeholder="45" className="mt-1" />{errors.cookTimeMinutes && <p className="text-sm text-destructive mt-1">{errors.cookTimeMinutes.message}</p>}</div>
            <div><Label htmlFor="servings">Porções *</Label><Input id="servings" {...register('servings')} placeholder="8 fatias" className="mt-1" />{errors.servings && <p className="text-sm text-destructive mt-1">{errors.servings.message}</p>}</div>
            <div><Label htmlFor="difficulty">Dificuldade *</Label><Controller name="difficulty" control={control} render={({ field }) => (<Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger id="difficulty" className="mt-1"><SelectValue placeholder="Selecione" /></SelectTrigger><SelectContent><SelectItem value="Fácil">Fácil</SelectItem><SelectItem value="Médio">Médio</SelectItem><SelectItem value="Difícil">Difícil</SelectItem></SelectContent></Select>)} />{errors.difficulty && <p className="text-sm text-destructive mt-1">{errors.difficulty.message}</p>}</div>
          </div>
          <div><Label htmlFor="category">Categoria *</Label><Controller name="category" control={control} render={({ field }) => (<Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger id="category" className="mt-1"><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger><SelectContent>{RECIPE_CATEGORIES.map(cat => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}</SelectContent></Select>)} />{errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Imagem de Capa *</CardTitle></CardHeader>
        <CardContent><Label htmlFor="image-upload" className="cursor-pointer"><div className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">{imagePreview ? (<div className="relative w-full h-48 mx-auto"><Image src={imagePreview} alt="Preview da imagem" fill className="object-cover rounded-md" /></div>) : (<div className="flex flex-col items-center gap-2"><Upload className="h-10 w-10" /><p>Clique para fazer upload</p><p className="text-xs">JPG, PNG, WebP (máx 5MB)</p></div>)}</div></Label><Input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />{errors.imageUrl && <p className="text-sm text-destructive mt-1">{errors.imageUrl.message}</p>}</CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Ingredientes *</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {ingredients.map((field, index) => (<div key={field.id} className="flex items-start gap-2"><Input {...register(`ingredients.${index}.quantity`)} placeholder="Ex: 2 xícaras" className="w-1/3" /><Input {...register(`ingredients.${index}.item`)} placeholder="Ex: Farinha de arroz" className="flex-1" /><Button type="button" variant="ghost" size="icon" onClick={() => removeIngredient(index)} disabled={ingredients.length <= 1}><X className="h-4 w-4 text-muted-foreground" /></Button></div>))}
          <Button type="button" variant="outline" size="sm" onClick={() => addIngredient({ quantity: '', item: '', notes: '' })}><Plus className="h-4 w-4 mr-2" />Adicionar Ingrediente</Button>
          {errors.ingredients && <p className="text-sm text-destructive mt-2">{errors.ingredients.root?.message || errors.ingredients.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Modo de Preparo *</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {instructions.map((field, index) => (<div key={field.id} className="flex items-start gap-2"><span className="font-bold text-primary mt-2 flex-shrink-0">{index + 1}.</span><Textarea {...register(`instructions.${index}.text`)} placeholder={`Descreva o passo ${index + 1}`} className="min-h-[6rem]" /><Button type="button" variant="ghost" size="icon" onClick={() => removeInstruction(index)} disabled={instructions.length <= 1}><X className="h-4 w-4 text-muted-foreground" /></Button></div>))}
          <Button type="button" variant="outline" size="sm" onClick={() => addInstruction({ text: '' })}><Plus className="h-4 w-4 mr-2" />Adicionar Passo</Button>
          {errors.instructions && <p className="text-sm text-destructive mt-2">{errors.instructions.root?.message || errors.instructions.message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Restrições Alimentares *</CardTitle></CardHeader>
        <CardContent><p className="text-sm text-muted-foreground mb-3">Selecione todas as tags que se aplicam.</p><Controller name="dietaryTags" control={control} render={({ field }) => (<div className="flex flex-wrap gap-2">{DIETARY_TAG_OPTIONS.map((option) => (<button key={option.id} type="button" onClick={() => { const currentValue = field.value || []; const newValue = currentValue.includes(option.id) ? currentValue.filter(id => id !== option.id) : [...currentValue, option.id]; field.onChange(newValue); }} className={cn(tagButtonVariants({ selected: field.value?.includes(option.id) }))}>{option.label}</button>))}</div>)} />{errors.dietaryTags && <p className="text-sm text-destructive mt-2">{errors.dietaryTags.message}</p>}</CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Dicas (Opcional)</CardTitle></CardHeader>
        <CardContent><Textarea {...register('tips')} placeholder="Compartilhe dicas especiais para o sucesso desta receita..." className="min-h-24" /></CardContent>
      </Card>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {action === 'create' ? 'Publicar Receita' : 'Salvar Alterações'}
        </Button>
      </div>
    </form>
  );
}