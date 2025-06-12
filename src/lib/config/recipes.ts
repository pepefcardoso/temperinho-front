import type { DietaryTag } from "@/types/recipe";

export const DIETARY_TAG_OPTIONS: { id: DietaryTag; label: string }[] = [
  { id: "vegan", label: "Vegano" },
  { id: "vegetarian", label: "Vegetariano" },
  { id: "gluten-free", label: "Sem Glúten" },
  { id: "lactose-free", label: "Sem Lactose" },
  { id: "keto", label: "Cetogênica" },
  { id: "low-fodmap", label: "Low FODMAP" },
];

export const RECIPE_CATEGORIES = [
  "Café da Manhã",
  "Almoço",
  "Jantar",
  "Lanche",
  "Sobremesa",
  "Bebida",
  "Aperitivo",
  "Prato Principal",
  "Acompanhamento",
];
