// src/lib/api/recipes.ts

import { dummyRecipes } from "@/lib/dummy-data/recipes";
import type { DietaryTag, Difficulty, Recipe } from "@/types/recipe";

/**
 * Simula uma chamada de API para buscar as receitas em destaque.
 * No futuro, você pode substituir o conteúdo desta função por uma chamada `fetch` real
 * para o seu backend, sem precisar alterar os componentes que a utilizam.
 */
export async function getFeaturedRecipes(): Promise<Recipe[]> {
  // 1. Simula um atraso de rede (ex: 1 segundo) para que você possa ver
  //    seus estados de loading funcionando corretamente no front-end.
  console.log("Fetching featured recipes...");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("...done fetching.");

  // 2. Retorna uma fatia dos dados fictícios.
  //    Vamos retornar as 6 primeiras receitas como "destaques".
  return dummyRecipes.slice(0, 6);
}

/**
 * Simula uma chamada de API para buscar todas as receitas.
 */
export async function getAllRecipes(): Promise<Recipe[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return dummyRecipes;
}

/**
 * Simula uma chamada de API para buscar uma única receita pelo seu ID.
 */
export async function getRecipeById(id: string): Promise<Recipe | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return dummyRecipes.find((recipe) => recipe.id === id);
}

export async function getFilteredRecipes(filters: string[]): Promise<Recipe[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Filtra as receitas com base nos tags dietéticos fornecidos
  return dummyRecipes.filter((recipe) =>
    recipe.dietaryTags.some((tag) => filters.includes(tag))
  );
}

export async function getRecipeBySlug(
  slug: string
): Promise<Recipe | undefined> {
  console.log(`Buscando receita com slug: ${slug}`);
  await new Promise((resolve) => setTimeout(resolve, 200));
  return dummyRecipes.find((p) => p.slug === slug);
}

interface GetRecipesOptions {
  sortBy?: "recent" | "rating" | "time" | "difficulty";
  filters?: DietaryTag[];
  page?: number;
  limit?: number;
}

// Função principal que agora faz a ordenação e filtro no servidor
export async function getRecipes(
  options: GetRecipesOptions = {}
): Promise<Recipe[]> {
  const { sortBy = "recent", filters = [], page = 1, limit = 9 } = options;

  let recipes = [...dummyRecipes];

  // Lógica de Filtro
  if (filters.length > 0) {
    recipes = recipes.filter((recipe) =>
      filters.every((filter) => recipe.dietaryTags.includes(filter))
    );
  }

  // Lógica de Ordenação
  switch (sortBy) {
    case "rating":
      recipes.sort((a, b) => b.rating - a.rating);
      break;
    case "time":
      recipes.sort((a, b) => a.prepTimeMinutes - b.prepTimeMinutes);
      break;
    case "difficulty":
      const difficultyOrder: Record<Difficulty, number> = {
        Fácil: 1,
        Médio: 2,
        Difícil: 3,
      };
      recipes.sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      );
      break;
  }

  // Lógica de Paginação
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return recipes.slice(startIndex, endIndex);
}
