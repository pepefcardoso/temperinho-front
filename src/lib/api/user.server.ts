import axios from 'axios';
import { cookies } from 'next/headers';
import type { User } from '@/types/user';

/**
 * Cria uma instância do Axios pré-autenticada para uso em Server Components.
 */
const createAuthenticatedServerApi = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('AUTH_TOKEN')?.value;

    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
        },
    });
};

/**
 * Busca o perfil do usuário autenticado.
 * Destinada ao uso em Server Components para carregar dados da página.
 */
export async function getAuthenticatedUserProfile(): Promise<User> {
    const api = await createAuthenticatedServerApi();
    const response = await api.get('/users/me');
    return response.data.data;
}