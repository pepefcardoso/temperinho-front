import type { DietaryTag } from "@/types/recipe";

export const SPECIALTY_OPTIONS: { id: DietaryTag; label: string }[] = [
    { id: 'vegan', label: 'Vegano' },
    { id: 'vegetarian', label: 'Vegetariano' },
    { id: 'gluten-free', label: 'Sem Glúten' },
    { id: 'lactose-free', label: 'Sem Lactose' },
    { id: 'keto', label: 'Cetogênica' },
    { id: 'low-fodmap', label: 'Low FODMAP' },
];

export const EXPERIENCE_LEVELS = [
    { value: 'iniciante', label: 'Iniciante' },
    { value: 'intermediario', label: 'Intermediário' },
    { value: 'avancado', label: 'Avançado' },
    { value: 'profissional', label: 'Profissional' },
];