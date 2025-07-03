'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react';

const createAccountSchema = z.object({
    name: z.string().min(3, { message: 'O nome deve ter pelo menos 3 caracteres.' }),
    email: z.string().email({ message: 'Por favor, insira um email válido.' }),
    password: z.string().min(8, { message: 'A senha deve ter no mínimo 8 caracteres.' }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
        message: 'Você deve aceitar os termos de uso.',
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

export default function CreateAccountPage() {
    const { register: registerUser } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting }
    } = useForm<CreateAccountFormData>({
        resolver: zodResolver(createAccountSchema),
        defaultValues: {
            acceptTerms: false,
        },
    });

    const onSubmit = async (data: CreateAccountFormData) => {
        try {
            const submissionData = {
                name: data.name,
                email: data.email,
                phone: '',
                password: data.password,
                password_confirmation: data.confirmPassword,
            };
            await registerUser(submissionData);
            toast.success('Conta criada com sucesso! Redirecionando...');
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Não foi possível criar a conta. Tente novamente.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-screen bg-warm-50">
            <div className="flex items-center justify-center py-12 px-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center text-warm-900">
                            Criar sua conta
                        </CardTitle>
                        <p className="text-center text-warm-600">
                            Preencha os dados abaixo para criar sua conta
                        </p>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome completo</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-500 h-4 w-4" />
                                    <Input id="name" type="text" placeholder="Seu nome completo" {...register('name')} className="pl-10" />
                                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-500 h-4 w-4" />
                                    <Input id="email" type="email" placeholder="seu@email.com" {...register('email')} className="pl-10" />
                                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Senha</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-500 h-4 w-4" />
                                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Mínimo 8 caracteres" {...register('password')} className="pl-10 pr-10" />
                                    <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <EyeOff className="h-4 w-4 text-warm-500" /> : <Eye className="h-4 w-4 text-warm-500" />}
                                    </Button>
                                </div>
                                {errors.password && <p className="text-sm text-destructive mt-1">{errors.password.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warm-500 h-4 w-4" />
                                    <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirme sua senha" {...register('confirmPassword')} className="pl-10 pr-10" />
                                    <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4 text-warm-500" /> : <Eye className="h-4 w-4 text-warm-500" />}
                                    </Button>
                                </div>
                                {errors.confirmPassword && <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" {...register('acceptTerms')} />
                                <Label htmlFor="terms" className="text-sm text-warm-700">
                                    Aceito os{' '}
                                    <Link href="/termos" className="text-sage-600 hover:text-sage-700 underline">termos de uso</Link>{' '}
                                    e{' '}
                                    <Link href="/privacidade" className="text-sage-600 hover:text-sage-700 underline">política de privacidade</Link>
                                </Label>
                            </div>
                            {errors.acceptTerms && <p className="text-sm text-destructive mt-1">{errors.acceptTerms.message}</p>}

                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                {isSubmitting ? 'Criando conta...' : 'Criar conta'}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-warm-600">
                                Já tem uma conta?{' '}
                                <Link href="/auth/login" className="text-sage-600 hover:text-sage-700 font-medium underline">
                                    Fazer login
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}