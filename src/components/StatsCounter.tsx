'use client';

import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import type { MarketingStat } from '@/types/marketing';
import { Users, TrendingUp, Star, Target } from 'lucide-react';

const iconMap = {
    Users,
    TrendingUp,
    Star,
    Target,
};

interface StatsCounterProps {
    stats: MarketingStat[];
}

const StatItem = ({ stat }: { stat: MarketingStat }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    const endValue = typeof stat.value === 'string'
        ? parseFloat(stat.value)
        : stat.value;
    const suffix = typeof stat.value === 'string'
        ? stat.value.replace(/[0-9.]/g, '')
        : '';

    const IconComponent = iconMap[stat.iconName];

    return (
        <div ref={ref} className="text-center bg-background p-6 rounded-xl border">
            {IconComponent && <IconComponent className="h-8 w-8 text-primary mx-auto mb-4" />}

            <div className="text-3xl md:text-4xl font-bold text-primary">
                {inView ? <CountUp end={endValue} duration={2.5} suffix={suffix} decimals={stat.value === 4.8 ? 1 : 0} separator="." decimal="," /> : `0${suffix}`}
            </div>
            <div className="text-muted-foreground font-medium mt-1">{stat.label}</div>
            {stat.growth && (
                <div className="text-sm text-green-500 font-semibold mt-1 flex items-center justify-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {stat.growth}
                </div>
            )}
        </div>
    );
}

export function StatsCounter({ stats }: StatsCounterProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-12">
            {stats.map((stat) => (
                <StatItem key={stat.label} stat={stat} />
            ))}
        </div>
    );
}