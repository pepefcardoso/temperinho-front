'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise(res => setTimeout(res, 1500));
    if (email.includes('@')) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-sage-600 to-sage-700">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
          Junte-se à Nossa Comunidade
        </h2>
        <p className="text-xl text-sage-100 mb-8 max-w-2xl mx-auto">
          Receba receitas exclusivas, dicas de substituições e novidades direto no seu email.
        </p>
        
        {status === 'success' ? (
          <p className="text-xl text-white font-medium">Obrigado por se inscrever! 🎉</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              required
              className="flex-1 px-4 py-3 rounded-xl border-0 text-warm-900 placeholder-warm-500 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <Button type="submit" size="lg" disabled={status === 'loading'} className="bg-sunset-500 hover:bg-sunset-600 text-white font-medium whitespace-nowrap">
              {status === 'loading' ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Assinar Grátis
            </Button>
          </form>
        )}
        
        {status === 'error' && <p className="text-red-300 text-sm mt-4">Ocorreu um erro. Tente novamente.</p>}
        {status !== 'success' && <p className="text-sage-200 text-sm mt-4">Sem spam. Cancele a qualquer momento.</p>}
      </div>
    </section>
  );
}