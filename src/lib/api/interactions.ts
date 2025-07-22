import axiosClient from '@/lib/axios';
import { Comment } from '@/types/actions';
import type { PaginatedResponse } from '@/types/api';

export type InteractableType = 'posts' | 'recipes';

export async function getComments(
  type: InteractableType,
  id: number,
  page = 1
): Promise<PaginatedResponse<Comment>> {
  const response = await axiosClient.get<PaginatedResponse<Comment>>(
    `/${type}/${id}/comments`,
    { params: { page } }
  );
  return response.data;
}
