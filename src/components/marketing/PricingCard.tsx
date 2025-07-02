import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PricingPackage } from '@/types/marketing';

interface PricingCardProps {
    pkg: PricingPackage;
}

export function PricingCard({ pkg }: PricingCardProps) {
    return (
        <div className={cn(
            "relative bg-background rounded-xl p-8 shadow-lg border-2 flex flex-col h-full",
            pkg.isPopular ? 'border-primary ring-4 ring-primary/20' : 'border-border'
        )}>
            {pkg.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge variant={pkg.isPopular ? 'default' : 'secondary'} className="px-4 py-1 text-sm">{pkg.badge}</Badge>
                </div>
            )}
            <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-2">{pkg.name}</h3>
                <div className="flex items-baseline justify-center mb-4">
                    <span className="text-4xl font-bold text-primary">{pkg.price}</span>
                    <span className="text-muted-foreground ml-1">{pkg.period}</span>
                </div>
                <p className="text-muted-foreground text-sm">{pkg.description}</p>
            </div>
            <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                    </li>
                ))}
            </ul>
            <Button size="lg" variant={pkg.isPopular ? 'default' : 'secondary'} className="w-full mt-auto" asChild>
                <Link href="/contato?assunto=parceria">
                    Contratar Pacote <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
            </Button>
        </div>
    );
}