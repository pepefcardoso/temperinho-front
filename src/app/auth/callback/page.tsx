'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

function AuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setUser } = useAuth();

    useEffect(() => {
        const token = searchParams.get('token');

        if (token) {
            localStorage.setItem('AUTH_TOKEN', token);
            window.location.href = '/usuario/dashboard';

        } else {
            router.push('/login?error=token-missing');
        }
    }, [router, searchParams, setUser]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Autenticando, por favor aguarde...</p>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <AuthCallbackContent />
        </Suspense>
    );
}