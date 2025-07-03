'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { getAuthenticatedUserProfile } from '@/lib/api/user';
import { UserProfileForm } from '@/components/user-profile/UserProfileForm';
import type { User } from '@/types/user';

export default function UserProfilePage() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.title = 'Meu Perfil | Leve Sabor';

        const fetchUserProfile = async () => {
            try {
                const userProfileData = await getAuthenticatedUserProfile();
                setUser(userProfileData);
            } catch (error) {
                console.error("Falha ao buscar perfil do usuário:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center">
                <h2 className="text-xl font-semibold">Não foi possível carregar seu perfil.</h2>
                <p className="text-muted-foreground">
                    Por favor, <Link href="/login" className="text-primary underline">faça o login</Link> novamente.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <UserProfileForm user={user} />
        </div>
    );
}