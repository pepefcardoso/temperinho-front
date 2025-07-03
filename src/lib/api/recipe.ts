import axiosClient from "@/lib/axios";
import { PaginatedResponse } from "@/types/api";
import type {
  Recipe,
  RecipeCategory,
  RecipeDiet,
  RecipeUnit,
} from "@/types/recipe";

export interface GetRecipesOptions {
  sortBy?: "title" | "created_at" | "time" | "difficulty";
  sortDirection?: "asc" | "desc";
  filters?: {
    title?: string;
    category_id?: number;
    diets?: number[];
    user_id?: number;
  };
  page?: number;
  limit?: number;
}

export async function getRecipes(
  options: GetRecipesOptions = {}
): Promise<PaginatedResponse<Recipe>> {
  const params = new URLSearchParams();

  if (options.sortBy) params.append("order_by", options.sortBy);
  if (options.sortDirection)
    params.append("order_direction", options.sortDirection);
  if (options.page) params.append("page", options.page.toString());
  if (options.limit) params.append("per_page", options.limit.toString());

  if (options.filters) {
    if (options.filters.title) params.append("title", options.filters.title);
    if (options.filters.category_id)
      params.append("category_id", options.filters.category_id.toString());
    if (options.filters.user_id)
      params.append("user_id", options.filters.user_id.toString());
    if (options.filters.diets) {
      options.filters.diets.forEach((dietId) =>
        params.append("diets[]", dietId.toString())
      );
    }
  }

  const response = await axiosClient.get<PaginatedResponse<Recipe>>(
    `/recipes`,
    { params }
  );
  return response.data;
}

export async function getRecipeById(id: number): Promise<Recipe> {
  const response = await axiosClient.get<{ data: Recipe }>(`/recipes/${id}`);
  return response.data.data;
}

export async function createRecipe(data: FormData): Promise<Recipe> {
  const response = await axiosClient.post<{ data: Recipe }>("/recipes", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
}

export async function updateRecipe(
  id: number,
  data: FormData
): Promise<Recipe> {
  data.append("_method", "PUT");

  const response = await axiosClient.post<{ data: Recipe }>(
    `/recipes/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.data;
}

export async function deleteRecipe(id: number): Promise<void> {
  await axiosClient.delete(`/recipes/${id}`);
}

interface GetMyRecipesParams {
  title?: string;
  categoryId?: string;
  page?: number;
  limit?: number;
}

export async function getMyRecipes({
  title,
  categoryId,
  page = 1,
  limit = 10,
}: GetMyRecipesParams = {}): Promise<PaginatedResponse<Recipe>> {
  const params: Record<string, string> = {
    page: page.toString(),
    per_page: limit.toString(),
  };

  if (title) {
    params.title = title;
  }
  if (categoryId) {
    params.category_id = categoryId;
  }

  const response = await axiosClient.get<PaginatedResponse<Recipe>>(
    "/recipes/my",
    { params }
  );
  return response.data;
}

interface GetFavoriteRecipesParams {
  page?: number;
  limit?: number;
  title?: string;
  categoryId?: string;
}

export async function getFavoriteRecipes({
  page = 1,
  limit = 100,
  title,
  categoryId,
}: GetFavoriteRecipesParams = {}): Promise<PaginatedResponse<Recipe>> {
  const params: Record<string, string> = {
    page: page.toString(),
    per_page: limit.toString(),
  };

  if (title) {
    params.title = title;
  }
  if (categoryId) {
    params.category_id = categoryId;
  }

  const response = await axiosClient.get<PaginatedResponse<Recipe>>(
    "/recipes/favorites",
    { params }
  );
  return response.data;
}

export async function getRecipeCategories(): Promise<RecipeCategory[]> {
  const response = await axiosClient.get<{ data: RecipeCategory[] }>(
    "/recipe-categories"
  );
  return response.data.data;
}

export async function getRecipeDiets(): Promise<RecipeDiet[]> {
  const response = await axiosClient.get<{ data: RecipeDiet[] }>(
    "/recipe-diets"
  );
  return response.data.data;
}

export async function getRecipeUnits(): Promise<RecipeUnit[]> {
  const response = await axiosClient.get<{ data: RecipeUnit[] }>(
    "/recipe-units"
  );
  return response.data.data;
}
