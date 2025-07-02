import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAuthenticatedUserProfile } from '@/lib/api/user';
import { UserProfileForm } from '@/components/user-profile/UserProfileForm';

export const metadata: Metadata = {
    title: 'Meu Perfil | Leve Sabor',
    description: 'Gerencie suas informações pessoais, foto de perfil e preferências na plataforma Leve Sabor.',
};

export default async function UserProfilePage() {
    try {
        const userProfileData = await getAuthenticatedUserProfile();

        return (
            <div className="space-y-6">
                <UserProfileForm user={userProfileData} />
            </div>
        );
    } catch (error) {
        console.error("Falha ao buscar perfil do usuário:", error);
        notFound();
    }
}
