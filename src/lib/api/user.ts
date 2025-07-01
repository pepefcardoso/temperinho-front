import axiosClient from "../axios";
import type { User, UserFavoriteRecipe, UserManagedRecipe } from "@/types/user";

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

export async function toggleFavoriteRecipe(recipeId: number): Promise<void> {
  await axiosClient.post("/api/users/favorites/recipes", {
    recipe_id: recipeId,
  });
}
