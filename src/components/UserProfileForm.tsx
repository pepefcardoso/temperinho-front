'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Camera, Save, Loader2, Edit, User } from 'lucide-react';

import type { User } from '@/types/user';
import type { DietaryTag } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SPECIALTY_OPTIONS, EXPERIENCE_LEVELS } from '@/lib/config/user-profile';
import { updateUserProfile } from '@/app/usuario/perfil/actions';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

// Esquema de validação com Zod, 100% alinhado com o tipo UserProfile
const profileSchema = z.object({
    id: z.string(),
    avatarUrl: z.string().url(),
    name: z.string().min(3, { message: "O nome precisa ter pelo menos 3 caracteres." }),
    email: z.string().email({ message: "Por favor, insira um email válido." }),
    phone: z.string().optional().or(z.literal('')),
    bio: z.string().max(300, { message: "A biografia não pode exceder 300 caracteres." }).optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    // CORREÇÃO: Removido o .optional() para alinhar com o tipo UserProfile
    specialties: z.array(z.enum(SPECIALTY_OPTIONS.map(opt => opt.id) as [DietaryTag, ...DietaryTag[]])),
    experience: z.enum(['iniciante', 'intermediario', 'avancado', 'profissional']),
    website: z.string().url({ message: "Por favor, insira uma URL válida." }).or(z.literal('')).optional(),
    instagram: z.string().optional(),
});

const specialtyButtonVariants = cva(
    "px-3 py-1.5 text-xs rounded-full border transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
    { variants: { selected: { true: 'bg-primary text-primary-foreground border-primary', false: 'bg-muted text-muted-foreground border-border hover:bg-accent' } } }
);

interface UserProfileFormProps {
    user: User;
}

export function UserProfileForm({ user }: UserProfileFormProps) {
    const [isEditing, setIsEditing] = React.useState(false);

    const form = useForm<User>({
        resolver: zodResolver(profileSchema),
        defaultValues: user,
    });

    const { control, register, handleSubmit, formState: { errors, isSubmitting }, watch, reset } = form;

    const watchedName = watch("name");
    const watchedEmail = watch("email");
    const watchedAvatar = watch("avatarUrl");

    const onSubmit = async (data: User) => {
        const result = await updateUserProfile(data);
        if (result.success) {
            toast.success(result.message);
            setIsEditing(false);
        } else {
            toast.error(result.message || 'Ocorreu um erro ao atualizar o perfil.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-1">Meu Perfil</h1>
                    <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências.</p>
                </div>
                <div className="flex gap-2">
                    {isEditing && (<Button type="button" variant="ghost" onClick={() => { reset(user); setIsEditing(false); }}>Cancelar</Button>)}
                    <Button type={isEditing ? 'submit' : 'button'} onClick={() => !isEditing && setIsEditing(true)} disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : (isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />)}
                        {isEditing ? 'Salvar Alterações' : 'Editar Perfil'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="space-y-6 lg:sticky lg:top-24">
                    <Card>
                        <CardHeader><CardTitle>Foto do Perfil</CardTitle></CardHeader>
                        <CardContent className="text-center space-y-4">
                            <div className="relative inline-block">
                                <Avatar size="lg" className="w-32 h-32 text-muted-foreground">
                                    <AvatarImage src={watchedAvatar} alt={`Foto de ${watchedName}`} />
                                    <AvatarFallback className="text-4xl"><User /></AvatarFallback>
                                </Avatar>
                                {isEditing && (
                                    <Label htmlFor="avatar-upload" className="absolute bottom-1 right-1 cursor-pointer"><div className="grid place-items-center h-9 w-9 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"><Camera className="h-4 w-4" /></div><Input id="avatar-upload" type="file" className="sr-only" /></Label>
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-foreground">{watchedName}</h3>
                                <p className="text-sm text-muted-foreground">{watchedEmail}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader><CardTitle>Informações Pessoais</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div><Label htmlFor="name">Nome Completo</Label><Input id="name" {...register('name')} disabled={!isEditing} className="mt-1" />{errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}</div>
                                <div><Label htmlFor="email">Email</Label><Input id="email" {...register('email')} type="email" disabled={!isEditing} className="mt-1" />{errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}</div>
                            </div>
                            <div><Label htmlFor="bio">Biografia</Label><Textarea id="bio" {...register('bio')} disabled={!isEditing} placeholder="Conte um pouco sobre você..." className="mt-1 min-h-24" />{errors.bio && <p className="text-sm text-destructive mt-1">{errors.bio.message}</p>}</div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Especialidades e Experiência</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Label>Especialidades Culinárias</Label>
                                <p className="text-sm text-muted-foreground mb-3">Selecione as áreas em que você tem mais experiência.</p>
                                <Controller name="specialties" control={control} render={({ field }) => (
                                    <div className="flex flex-wrap gap-2">{SPECIALTY_OPTIONS.map((option) => (<button key={option.id} type="button" disabled={!isEditing} onClick={() => { const currentValue = field.value || []; const newValue = currentValue.includes(option.id) ? currentValue.filter(id => id !== option.id) : [...currentValue, option.id]; field.onChange(newValue); }} className={cn(specialtyButtonVariants({ selected: field.value?.includes(option.id) }))}>{option.label}</button>))}</div>
                                )} />
                            </div>
                            <div>
                                <Label htmlFor="experience">Nível de Experiência</Label>
                                <Controller name="experience" control={control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!isEditing}>
                                        <SelectTrigger id="experience" className="mt-1"><SelectValue placeholder="Selecione seu nível" /></SelectTrigger>
                                        <SelectContent>{EXPERIENCE_LEVELS.map(level => (<SelectItem key={level.value} value={level.value}>{level.label}</SelectItem>))}</SelectContent>
                                    </Select>
                                )} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>Redes Sociais e Contato</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div><Label htmlFor="phone">Telefone</Label><Input id="phone" {...register('phone')} disabled={!isEditing} className="mt-1" placeholder="(11) 99999-9999" /></div>
                            <div><Label htmlFor="website">Website/Blog</Label><Input id="website" {...register('website')} disabled={!isEditing} className="mt-1" placeholder="https://seusite.com" />{errors.website && <p className="text-sm text-destructive mt-1">{errors.website.message}</p>}</div>
                            <div className="md:col-span-2"><Label htmlFor="instagram">Instagram</Label><Input id="instagram" {...register('instagram')} disabled={!isEditing} className="mt-1" placeholder="@seu_usuario" /></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}