import axios from 'axios';
import { cookies } from 'next/headers';
import type { User } from '@/types/user';

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

export async function getAuthenticatedUserProfile(): Promise<User> {
    const api = await createAuthenticatedServerApi();
    const response = await api.get('/users/me');
    return response.data.data;
}