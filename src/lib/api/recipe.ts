import axiosClient from '@/lib/axios';
import type { PaginatedResponse } from '@/types/api';
import type {
  Recipe,
  RecipeCategory,
  RecipeDiet,
  RecipeUnit,
} from '@/types/recipe';

export interface GetRecipesOptions {
  sortBy?: 'title' | 'created_at' | 'time' | 'difficulty';
  sortDirection?: 'asc' | 'desc';
  filters?: {
    search?: string;
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

  if (options.sortBy) params.append('order_by', options.sortBy);
  if (options.sortDirection)
    params.append('order_direction', options.sortDirection);
  if (options.page) params.append('page', options.page.toString());
  if (options.limit) params.append('per_page', options.limit.toString());

  if (options.filters) {
    if (options.filters.search) params.append('search', options.filters.search);
    if (options.filters.category_id)
      params.append('category_id', options.filters.category_id.toString());
    if (options.filters.user_id)
      params.append('user_id', options.filters.user_id.toString());
    if (options.filters.diets) {
      options.filters.diets.forEach((dietId) =>
        params.append('diets[]', dietId.toString())
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
  try {
    if (isNaN(id) || id <= 0) {
      throw new Error(`ID inválido: ${id}`);
    }

    const response = await axiosClient.get<{ data?: Recipe }>(
      `/recipes/${id}`,
      {
        validateStatus: (status) => status < 500,
      }
    );

    if (response.status === 404) {
      throw new Error('Receita não encontrada');
    }

    if (!response.data?.data) {
      throw new Error('Formato de resposta inválido da API');
    }

    return response.data.data;
  } catch (error) {
    console.error(`Falha ao buscar receita ID ${id}:`, error);
    throw new Error(
      `Não foi possível carregar a receita: ${(error as Error).message}`
    );
  }
}

export async function createRecipe(data: FormData): Promise<Recipe> {
  const response = await axiosClient.post<{ data: Recipe }>('/recipes', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data.data;
}

export async function updateRecipe(
  id: number,
  data: FormData
): Promise<Recipe> {
  data.append('_method', 'PUT');
  const response = await axiosClient.post<{ data: Recipe }>(
    `/recipes/${id}`,
    data,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data.data;
}

export async function deleteRecipe(id: number): Promise<void> {
  await axiosClient.delete(`/recipes/${id}`);
}

export async function getRecipeCategories(): Promise<RecipeCategory[]> {
  const response = await axiosClient.get<{ data: RecipeCategory[] }>(
    '/recipe-categories'
  );
  return response.data.data;
}

export async function getRecipeDiets(): Promise<RecipeDiet[]> {
  const response = await axiosClient.get<{ data: RecipeDiet[] }>(
    '/recipe-diets'
  );
  return response.data.data;
}

export async function getRecipeUnits(): Promise<RecipeUnit[]> {
  const response = await axiosClient.get<{ data: RecipeUnit[] }>(
    '/recipe-units'
  );
  return response.data.data;
}
