import type { Post } from "./blog";
import { Image } from "./image";
import type { Recipe } from "./recipe";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "INTERNAL" | "CUSTOMER";
  image: Image | null;
  phone?: string;
  birthday?: string;
  created_at: string;
}

export interface UserFavoriteRecipe extends Recipe {
  is_favorited: boolean;
  ratings_count: number;
  average_rating: number;
}

export interface UserFavoritePost extends Post {
  is_favorited: boolean;
  ratings_count: number;
  average_rating: number;
}

export interface UserManagedRecipe extends Recipe {
  status: "publicado" | "rascunho" | "pendente";
  views: number;
  likes: number;
}

export interface UserManagedPost extends Post {
  status: "publicado" | "rascunho" | "pendente";
  views: number;
}
