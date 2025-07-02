'use client'; // Client component para o mapa de ícones

import { Card, CardContent } from '@/components/ui/card';
import { BookOpen, FileText, Heart, TrendingUp } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const iconMap = { BookOpen, FileText, Heart, TrendingUp };

// Variantes de cor com CVA
const statCardVariants = cva(
    "p-3 rounded-lg",
    {
        variants: {
            variant: {
                primary: "bg-primary/10 text-primary",
                success: "bg-emerald-500/10 text-emerald-500",
                danger: "bg-destructive/10 text-destructive",
                warning: "bg-amber-500/10 text-amber-500",
            }
        },
        defaultVariants: { variant: "primary" }
    }
)

interface StatCardProps extends VariantProps<typeof statCardVariants> {
    stat: UserStat;
}

export function UserStatCard({ stat, variant }: StatCardProps) {
    const Icon = iconMap[stat.iconName];
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center">
                    <div className={cn(statCardVariants({ variant }))}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}