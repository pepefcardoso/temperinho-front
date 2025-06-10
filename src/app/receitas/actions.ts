"use server";

import { getRecipes } from "@/lib/api/recipe";
import type { DietaryTag } from "@/types/recipe";

export async function fetchMoreRecipes({
  page,
  filters,
  sortBy,
}: {
  page: number;
  filters?: DietaryTag[];
  sortBy?: "recent" | "rating" | "time" | "difficulty";
}) {
  await new Promise((res) => setTimeout(res, 500));
  const newRecipes = await getRecipes({ page, filters, sortBy, limit: 9 });
  return newRecipes;
}
