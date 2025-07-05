import axiosClient from "@/lib/axios";
import type { User } from "@/types/user";

interface ToggleFavoriteResponse {
  attached: number[];
  detached: number[];
}

/**
 * Adiciona ou remove uma receita dos favoritos do usuário.
 * Ação executada no cliente.
 */
export async function toggleFavoriteRecipe(
  recipeId: number
): Promise<ToggleFavoriteResponse> {
  const response = await axiosClient.post<ToggleFavoriteResponse>(
    "/users/favorites/recipes",
    {
      recipe_id: recipeId,
    }
  );
  return response.data;
}

/**
 * Adiciona ou remove um post dos favoritos do usuário.
 * Ação executada no cliente.
 */
export async function toggleFavoritePost(
  postId: number
): Promise<ToggleFavoriteResponse> {
  const response = await axiosClient.post<ToggleFavoriteResponse>(
    "/users/favorites/posts",
    {
      post_id: postId,
    }
  );
  return response.data;
}

/**
 * Atualiza o perfil do usuário.
 * Ação executada no cliente a partir de um formulário.
 */
export async function updateUserProfile(
  userId: number,
  data: FormData
): Promise<User> {
  data.append("_method", "PUT");

  const response = await axiosClient.post<{ data: User }>(
    `/users/${userId}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.data;
}