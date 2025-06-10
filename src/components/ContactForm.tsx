'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { submitContactForm } from '@/app/contato/actions';

const contactFormSchema = z.object({
    name: z.string().min(3, { message: "O nome precisa ter pelo menos 3 caracteres." }),
    email: z.string().email({ message: "Por favor, insira um email válido." }),
    subject: z.string().nonempty({ message: "Por favor, selecione um assunto." }),
    message: z.string().min(10, { message: "A mensagem precisa ter pelo menos 10 caracteres." }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: { name: "", email: "", subject: "", message: "" }
    });

    const onSubmit = async (data: ContactFormData) => {
        const result = await submitContactForm(data);

        if (result.success) {
            toast.success(result.message);
            reset();
        } else {
            toast.error(result.message || "Ocorreu um erro desconhecido.");
        }
    };

    return (
        <div className="bg-card rounded-xl p-6 sm:p-8 shadow-sm border border-border">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Envie sua Mensagem</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" {...register('name')} placeholder="Seu nome completo" className="mt-1" />
                        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" {...register('email')} type="email" placeholder="seu@email.com" className="mt-1" />
                        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                    </div>
                </div>

                <div>
                    <Label htmlFor="subject">Assunto</Label>
                    <Controller
                        name="subject"
                        control={control}
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger id="subject" className="mt-1">
                                    <SelectValue placeholder="Selecione o assunto" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="receita">Dúvida sobre receita</SelectItem>
                                    <SelectItem value="sugestao">Sugestão de conteúdo</SelectItem>
                                    <SelectItem value="parceria">Proposta de parceria</SelectItem>
                                    <SelectItem value="feedback">Feedback do site</SelectItem>
                                    <SelectItem value="outro">Outro assunto</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea id="message" {...register('message')} placeholder="Conte-nos como podemos ajudar..." className="mt-1 min-h-32" />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                </Button>
            </form>
        </div>
    );
}