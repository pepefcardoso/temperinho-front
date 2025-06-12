// 1. Importa o tipo DietaryTag de sua fonte original para reutilização.
import { Post } from "./blog";
import type { DietaryTag, Recipe } from "./recipe";

// O restante dos tipos permanece o mesmo.
export type ExperienceLevel = 'iniciante' | 'intermediario' | 'avancado' | 'profissional';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  phone?: string;
  bio?: string;
  city?: string;
  state?: string;
  specialties: DietaryTag[];
  experience: ExperienceLevel;
  website?: string;
  instagram?: string;
}

export interface UserManagedRecipe extends Recipe {
  status: 'publicado' | 'rascunho' | 'pendente';
  views: number;
  likes: number;
}

export interface UserManagedPost extends Post {
  status: 'publicado' | 'rascunho' | 'pendente';
  views: number;
}