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
import axios from 'axios';

import type { Post, PostCategory, PostTopic } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getPostCategories, getPostTopics, createPost, updatePost } from '@/lib/api/blog';

const articleSchema = z.object({
    title: z.string().min(10, { message: "O título precisa ter pelo menos 10 caracteres." }),
    summary: z.string().min(20, "O resumo precisa de pelo menos 20 caracteres.").max(255, "Resumo não pode exceder 255 caracteres."),
    content: z.string().min(50, { message: "O artigo precisa ter pelo menos 50 caracteres." }),
    category_id: z.string().min(1, { message: "Por favor, selecione uma categoria." }),
    topics: z.array(z.number()).min(1, "Selecione pelo menos um tópico.").max(5, "Selecione no máximo 5 tópicos."),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const tagButtonVariants = cva(
    "px-3 py-1.5 text-xs font-medium rounded-full border transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed",
    { variants: { selected: { true: 'bg-primary text-primary-foreground border-primary', false: 'bg-muted text-muted-foreground border-border hover:bg-accent' } } }
);

interface ArticleFormProps {
    initialData?: Post;
    action: 'create' | 'update';
}

export function ArticleForm({ initialData, action }: ArticleFormProps) {
    const router = useRouter();

    const [categories, setCategories] = React.useState<PostCategory[]>([]);
    const [topics, setTopics] = React.useState<PostTopic[]>([]);
    const [imageFile, setImageFile] = React.useState<File | null>(null);
    const [imagePreview, setImagePreview] = React.useState<string | null>(initialData?.image?.url || null);

    const form = useForm<ArticleFormData>({
        resolver: zodResolver(articleSchema),
        defaultValues: {
            title: initialData?.title || '',
            summary: initialData?.summary || '',
            content: initialData?.content || '',
            category_id: String(initialData?.category?.id || ''),
            topics: initialData?.topics?.map(t => t.id) || [],
        },
    });

    const { control, register, handleSubmit, formState: { errors, isSubmitting } } = form;

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [fetchedCategories, fetchedTopics] = await Promise.all([
                    getPostCategories(),
                    getPostTopics(),
                ]);
                setCategories(fetchedCategories);
                setTopics(fetchedTopics);
            } catch (error) {
                console.error("Erro ao buscar categorias ou tópicos:", error);
                toast.error("Falha ao carregar dados do formulário.");
            }
        };
        fetchData();
    }, []);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: ArticleFormData) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('summary', data.summary);
        formData.append('content', data.content);
        formData.append('category_id', data.category_id);
        data.topics.forEach(topicId => formData.append('topics[]', String(topicId)));

        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            if (action === 'create') {
                await createPost(formData);
                toast.success("Artigo criado com sucesso!");
            } else if (initialData?.id) {
                await updatePost(initialData.id, formData);
                toast.success("Artigo atualizado com sucesso!");
            }
            router.push('/usuario/artigos');
            router.refresh();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.message || "Ocorreu um erro.");
            } else {
                toast.error("Ocorreu um erro ao processar o artigo.");
            }
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
                        <Label htmlFor="summary">Resumo (máx. 255 caracteres) *</Label>
                        <Textarea id="summary" {...register('summary')} placeholder="Escreva um resumo atrativo do seu artigo..." className="mt-1 min-h-20" maxLength={255} />
                        {errors.summary && <p className="text-sm text-destructive mt-1">{errors.summary.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="category_id">Categoria *</Label>
                        <Controller name="category_id" control={control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger id="category_id" className="mt-1"><SelectValue placeholder="Selecione uma categoria" /></SelectTrigger>
                                <SelectContent>{categories.map(cat => (<SelectItem key={cat.id} value={String(cat.id)}>{cat.name}</SelectItem>))}</SelectContent>
                            </Select>
                        )} />
                        {errors.category_id && <p className="text-sm text-destructive mt-1">{errors.category_id.message}</p>}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Tópicos do Artigo</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">Selecione de 1 a 5 tópicos que descrevem seu artigo.</p>
                    <Controller name="topics" control={control} render={({ field }) => (
                        <div className="flex flex-wrap gap-2">{topics.map((topic) => (<button key={topic.id} type="button" onClick={() => { const val = field.value || []; const newVal = val.includes(topic.id) ? val.filter(id => id !== topic.id) : [...val, topic.id]; field.onChange(newVal); }} className={cn(tagButtonVariants({ selected: field.value?.includes(topic.id) }))}>{topic.name}</button>))}</div>
                    )} />
                    {errors.topics && <p className="text-sm text-destructive mt-2">{errors.topics.message}</p>}
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
                                <div className="flex flex-col items-center gap-2"><Upload className="h-10 w-10" /><p>Clique para fazer upload ou arraste uma imagem</p><p className="text-xs">JPG, PNG, WebP (máx 2MB)</p></div>
                            )}
                        </div>
                    </Label>
                    <Input id="image-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>Conteúdo do Artigo</CardTitle></CardHeader>
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
