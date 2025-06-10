import type { FilterConfig } from '@/types/recipe';

export const DIETARY_FILTERS_CONFIG: FilterConfig[] = [
  { id: 'vegan', name: 'Vegano', icon: '🌱' },
  { id: 'vegetarian', name: 'Vegetariano', icon: '🥬' },
  { id: 'gluten-free', name: 'Sem Glúten', icon: '🌾' },
  { id: 'lactose-free', name: 'Sem Lactose', icon: '🥛' },
  { id: 'keto', name: 'Cetogênica', icon: '🥑' },
  { id: 'low-fodmap', name: 'Low FODMAP', icon: '🍃' }
];