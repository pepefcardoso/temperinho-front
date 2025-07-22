import axiosClient from '@/lib/axios';
import { Comment, Rating } from '@/types/actions';
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

export async function createComment(
  type: InteractableType,
  id: number,
  content: string
): Promise<Comment> {
  const response = await axiosClient.post<{ data: Comment }>(
    `/${type}/${id}/comments`,
    { content }
  );
  return response.data.data;
}

export async function updateComment(
  commentId: number,
  content: string
): Promise<Comment> {
  const response = await axiosClient.put<{ data: Comment }>(
    `/comments/${commentId}`,
    { content }
  );
  return response.data.data;
}

export async function deleteComment(commentId: number): Promise<void> {
  await axiosClient.delete(`/comments/${commentId}`);
}

export async function createOrUpdateRating(
  type: InteractableType,
  id: number,
  rating: number
): Promise<Rating> {
  const response = await axiosClient.post<{ data: Rating }>(
    `/${type}/${id}/ratings`,
    { rating }
  );
  return response.data.data;
}
