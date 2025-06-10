'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { subscribeToNewsletter } from './actions';

const newsletterSchema = z.object({
    email: z.string().email({ message: "Por favor, insira um email válido." }),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<NewsletterFormData>({
        resolver: zodResolver(newsletterSchema),
    });

    const onSubmit = async (data: NewsletterFormData) => {
        const result = await subscribeToNewsletter(data);
        if (result.success) {
            toast.success(result.message);
            reset();
        } else {
            toast.error(result.message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Input
                {...register('email')}
                type="email"
                placeholder="Seu melhor email"
                className="bg-background/80 border-border text-foreground placeholder:text-muted-foreground"
                aria-invalid={!!errors.email}
            />
            {errors.email && <p className="text-sm text-destructive-foreground">{errors.email.message}</p>}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Assinar'}
            </Button>
        </form>
    );
}