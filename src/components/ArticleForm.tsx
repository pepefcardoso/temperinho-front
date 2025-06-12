'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Save, Loader2, Upload } from 'lucide-react';
import { cva } from 'class-variance-authority';

import type { Post } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ARTICLE_TAGS, ARTICLE_CATEGORIES } from '@/lib/config/blog';
import { createArticleAction, updateArticleAction } from '@/app/usuario/artigos/actions';
import { cn } from '@/lib/utils';

// Esquema de validação Zod completo, a fonte da verdade para o formulário
const articleSchema = z.object({
    id: z.string().optional(),
    slug: z.string().optional(),
    title: z.string().min(10, { message: "O título precisa ter pelo menos 10 caracteres." }),
    excerpt: z.string().min(20, "O resumo precisa de pelo menos 20 caracteres.").max(200, "Resumo não pode exceder 200 caracteres."),
    category: z.string().min(1, { message: "Por favor, selecione uma categoria." }),
    tags: z.array(z.string()).min(1, "Selecione pelo menos uma tag.").max(5, "Selecione no máximo 5 tags."),
    imageUrl: z.string().url({ message: "URL da imagem inválida." }).optional(),
    content: z.string().min(50, { message: "O artigo precisa ter pelo menos 50 palavras." }),
    readTimeInMinutes: z.number(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const tagButtonVariants = cva(
    "px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
    { variants: { selected: { true: 'bg-primary text-primary-foreground border-primary', false: 'bg-muted text-muted-foreground border-border hover:bg-accent' } } }
);

interface ArticleFormProps {
    initialData?: Partial<Post>;
    action: 'create' | 'update';
}

export function ArticleForm({ initialData, action }: ArticleFormProps) {
    const router = useRouter();
    const [imagePreview, setImagePreview] = React.useState<string | null>(initialData?.imageUrl || null);

    const form = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            id: initialData?.id,
            slug: initialData?.slug,
            title: initialData?.title || '',
            excerpt: initialData?.excerpt || '',
            category: initialData?.category || '',
            tags: initialData?.tags || [],
            content: initialData?.content || '',
            imageUrl: initialData?.imageUrl,
            readTimeInMinutes: initialData?.readTimeInMinutes || 0,
        },
    });

    const { control, register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = form;

    const watchedContent = watch('content', '');
    const wordCount = React.useMemo(() => {
        const words = watchedContent.trim().split(/\s+/);
        return watchedContent.trim() === '' ? 0 : words.length;
    }, [watchedContent]);

    const estimatedReadTime = React.useMemo(() => Math.ceil(wordCount / 200), [wordCount]);

    React.useEffect(() => {
        setValue('readTimeInMinutes', estimatedReadTime);
    }, [estimatedReadTime, setValue]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            toast.info("Preview da imagem carregado. A lógica de upload real (para S3, etc.) seria implementada aqui.");
            // Em um app real:
            // 1. Chamar uma função de upload que retorna a URL da imagem.
            // 2. form.setValue('imageUrl', urlDaImagem);
        }
    };

    const onSubmit = async (data: ArticleFormData) => {
        const actionToSubmit = action === 'create' ? createArticleAction : updateArticleAction;
        const result = await actionToSubmit({ ...data, imageUrl: imagePreview || '' });

        if (result.success) {
            toast.success(result.message);
            router.push('/usuario/artigos');
        } else {
            toast.error(result.message || "Ocorreu um erro ao processar o artigo.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card>
                <CardHeader><CardTitle>Informações Básicas</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="title">Título do Artigo *</Label>
                        <Input id="title" {...register('title')} placeholder="Ex: 5 Dicas para um Café da Manhã Vegano" className="mt-1" />
                        {errors.title && <p className="text-sm text-destructive mt-1">{errors.title.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="excerpt">Resumo (máx. 200 caracteres) *</Label>
                        <Textarea id="excerpt" {...register('excerpt')} placeholder="Escreva um resumo atrativo do seu artigo..." className="mt-1 min-h-20" maxLength={200} />
                        {errors.excerpt && <p className="text-sm text-destructive mt-1">{errors.excerpt.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="category">Categoria *</Label>
                        <Controller name="category" control={control} render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger id="category" className="mt-1"><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger>
                                <SelectContent>{ARTICLE_CATEGORIES.map(cat => (<SelectItem key={cat} value={cat}>{cat}</SelectItem>))}</SelectContent>
                            </Select>
                        )} />
                        {errors.category && <p className="text-sm text-destructive mt-1">{errors.category.message}</p>}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Tags do Artigo</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Selecione de 1 a 5 tags que descrevem seu artigo.</p>
                    <Controller name="tags" control={control} render={({ field }) => (
                        <div className="flex flex-wrap gap-2">{ARTICLE_TAGS.map((tag) => (<button key={tag} type="button" onClick={() => { const val = field.value || []; const newVal = val.includes(tag) ? val.filter(t => t !== tag) : [...val, tag]; field.onChange(newVal); }} className={cn(tagButtonVariants({ selected: field.value?.includes(tag) }))}>{tag}</button>))}</div>
                    )} />
                    {errors.tags && <p className="text-sm text-destructive mt-2">{errors.tags.message}</p>}
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Imagem de Capa</CardTitle></CardHeader>
                <CardContent>
                    <Label htmlFor="image-upload" className="cursor-pointer">
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                            {imagePreview ? (
                                <div className="relative w-full h-48 mx-auto"><Image src={imagePreview} alt="Preview da imagem de capa" fill className="object-cover rounded-md" /></div>
                            ) : (
                                <div className="flex flex-col items-center gap-2"><Upload className="h-10 w-10" /><p>Clique para fazer upload ou arraste uma imagem</p><p className="text-xs">JPG, PNG, WebP (máx 5MB)</p></div>
                            )}
                        </div>
                    </Label>
                    <Input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Conteúdo do Artigo</CardTitle>
                        <div className="text-sm text-muted-foreground space-x-4">
                            <span>{wordCount} palavras</span>
                            <span>~{estimatedReadTime} min de leitura</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Textarea {...register('content')} placeholder="Escreva o conteúdo completo do seu artigo aqui. Você pode usar Markdown para formatação." className="min-h-96" />
                    {errors.content && <p className="text-sm text-destructive mt-1">{errors.content.message}</p>}
                </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>Cancelar</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    {action === 'create' ? 'Publicar Artigo' : 'Salvar Alterações'}
                </Button>
            </div>
        </form>
    );
}