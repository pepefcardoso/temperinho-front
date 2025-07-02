import type { Metadata } from 'next';
import Link from 'next/link'; // CORREÇÃO CRÍTICA
import { Calendar, Star } from 'lucide-react';

import { getDashboardData } from '@/lib/api/dashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserStatCard } from '@/components/user-profile/UserStatCard';

export const metadata: Metadata = {
    title: 'Dashboard | Leve Sabor',
    description: 'Seu painel de controle pessoal no Leve Sabor.',
};

export default async function UserDashboardPage() {
    const { user, stats, activities, actions } = await getDashboardData();

    return (
        <div className="container mx-auto py-8 space-y-8">
            {/* Seção de Boas-vindas */}
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Bem-vindo, {user.name}! 👋
                </h1>
                <p className="text-muted-foreground">
                    Aqui está um resumo da sua atividade e algumas ações rápidas para você.
                </p>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <UserStatCard key={stat.title} stat={stat} variant={stat.variant} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Atividade Recente */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                            <Calendar className="h-5 w-5 mr-3 text-primary" />
                            Atividade Recente
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {activities.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg border">
                                <div>
                                    <p className="font-medium text-foreground">{item.title}</p>
                                    <p className="text-sm text-muted-foreground capitalize">
                                        {item.type} {item.action} • {item.date}
                                    </p>
                                </div>
                                <div className="flex items-center text-sm text-amber-500 font-semibold">
                                    <Star className="h-4 w-4 mr-1.5 fill-current" />
                                    {item.views}
                                </div>
                            </div>
                        ))}
                        <div className="pt-4">
                            <Button variant="outline" className="w-full" asChild>
                                <Link href="/usuario/minhas-atividades">Ver toda a atividade</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Ações Rápidas */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Ações Rápidas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {actions.map((action) => (
                            <Link key={action.href} href={action.href} className="block group">
                                <div className="p-4 border rounded-lg hover:bg-muted transition-colors">
                                    <h3 className="font-semibold text-foreground group-hover:text-primary">{action.title}</h3>
                                    <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}