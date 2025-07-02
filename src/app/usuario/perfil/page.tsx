import type { Metadata } from 'next';
import { getUserProfile } from '@/lib/api/user';
import { UserProfileForm } from '@/components/user-profile/UserProfileForm';
import UserLayout from '@/components/user-profile/UserLayout'; // Assumindo que este layout exista

export const metadata: Metadata = {
    title: 'Meu Perfil | Leve Sabor',
};

export default async function UserProfilePage() {
    const userProfileData = await getUserProfile();

    return (
        <UserLayout>
            <div className="container mx-auto py-8">
                <UserProfileForm user={userProfileData} />
            </div>
        </UserLayout>
    );
}