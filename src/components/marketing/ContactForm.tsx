'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createContact } from '@/lib/api/customer';
import { contactFormSchema } from '@/lib/schemas/marketing';

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await createContact(data);
      toast.success('Mensagem enviada com sucesso! Agradecemos o contato.');
      reset();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const validationErrors = error.response.data.errors;
        const firstError = validationErrors
          ? (Object.values(validationErrors).flat()[0] as string)
          : 'Ocorreu um erro.';
        toast.error(firstError);
      } else {
        toast.error('Ocorreu um erro desconhecido ao enviar a mensagem.');
      }
      console.error(error);
    }
  };

  return (
    <div className='bg-card rounded-xl p-6 sm:p-8 shadow-sm border border-border'>
      <h2 className='text-2xl font-semibold text-foreground mb-6'>
        Envie sua Mensagem
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div>
            <Label htmlFor='name'>Nome</Label>
            <Input
              id='name'
              {...register('name')}
              placeholder='Seu nome completo'
              className='mt-1'
            />
            {errors.name && (
              <p className='text-sm text-destructive mt-1'>
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              {...register('email')}
              type='email'
              placeholder='seu@email.com'
              className='mt-1'
            />
            {errors.email && (
              <p className='text-sm text-destructive mt-1'>
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor='phone'>Telefone</Label>
          <Input
            id='phone'
            {...register('phone')}
            type='tel'
            placeholder='(XX) XXXXX-XXXX'
            className='mt-1'
          />
          {errors.phone && (
            <p className='text-sm text-destructive mt-1'>
              {errors.phone.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor='message'>Mensagem</Label>
          <Textarea
            id='message'
            {...register('message')}
            placeholder='Conte-nos como podemos ajudar...'
            className='mt-1 min-h-32'
          />
          {errors.message && (
            <p className='text-sm text-destructive mt-1'>
              {errors.message.message}
            </p>
          )}
        </div>

        <Button type='submit' className='w-full' disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className='h-4 w-4 mr-2 animate-spin' />
          ) : (
            <Send className='h-4 w-4 mr-2' />
          )}
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </Button>
      </form>
    </div>
  );
}
