export type DietaryTag =
  | "vegan"
  | "vegetarian"
  | "gluten-free"
  | "lactose-free"
  | "keto"
  | "low-fodmap";

export type Difficulty = "Fácil" | "Médio" | "Difícil";

export interface Ingredient {
  quantity: string;
  item: string;
  notes?: string;
}

export interface NutritionalInfo {
  calorias: string;
  proteínas: string;
  carboidratos: string;
  gorduras: string;
  fibras?: string;
}

export interface Author {
  name: string;
  avatarUrl: string;
  bio?: string;
}

export interface Recipe {
  id: string;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  servings: string;
  difficulty: Difficulty;
  dietaryTags: DietaryTag[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTime: string;
  rating: number;
  reviewCount: number;
  author: Author;
  ingredients: Ingredient[];
  instructions: string[];
  tips?: string[];
  nutritionalInfo?: NutritionalInfo;
  category?: string;
}

export interface FilterConfig {
  id: DietaryTag;
  name: string;
  icon: string;
}
