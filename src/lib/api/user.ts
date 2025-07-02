import axiosClient from "../axios";
import type { User, UserFavoriteRecipe, UserManagedRecipe } from "@/types/user";

interface ToggleFavoriteResponse {
  attached: number[];
  detached: number[];
}

export async function getAuthenticatedUserProfile(): Promise<User> {
  const response = await axiosClient.get("/api/users/me");
  return response.data.data;
}

export async function getUserManagedRecipes(): Promise<UserManagedRecipe[]> {
  const response = await axiosClient.get("/api/recipes/my");
  return response.data.data;
}

export async function getUserFavoriteRecipes(): Promise<UserFavoriteRecipe[]> {
  const response = await axiosClient.get("/api/recipes/favorites");
  return response.data.data;
}

export async function getUserManagedPosts(): Promise<any[]> {
  const response = await axiosClient.get("/api/posts/my");
  return response.data.data;
}

export async function getUserFavoritePosts(): Promise<any[]> {
  const response = await axiosClient.get("/api/posts/favorites");
  return response.data.data;
}

export async function toggleFavoriteRecipe(recipeId: number): Promise<ToggleFavoriteResponse> {
  const response = await axiosClient.post<ToggleFavoriteResponse>('/users/favorites/recipes', {
    recipe_id: recipeId
  });
  return response.data;
}

export async function toggleFavoritePost(postId: number): Promise<ToggleFavoriteResponse> {
  const response = await axiosClient.post<ToggleFavoriteResponse>('/users/favorites/posts', {
    post_id: postId
  });
  return response.data;
}

export async function updateUserProfile(userId: number, data: FormData): Promise<User> {
  data.append('_method', 'PUT');

  const response = await axiosClient.post<{ data: User }>(`/users/${userId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
}