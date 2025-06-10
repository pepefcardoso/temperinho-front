import type { Recipe, Author } from "@/types/recipe";

const authorAna: Author = {
  name: "Chef Ana Vegana",
  avatarUrl:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
  bio: "Especialista em confeitaria à base de plantas.",
};
const authorJoao: Author = {
  name: "João Costa",
  avatarUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  bio: "Amante de comida de conforto e pratos italianos.",
};

export const dummyRecipes: Recipe[] = [
  {
    id: "1",
    slug: "salada-de-quinoa-com-legumes-grelhados",
    name: "Salada de Quinoa com Legumes Grelhados",
    description:
      "Uma salada vibrante e nutritiva, perfeita para um almoço leve e saudável, cheia de cores e texturas.",
    imageUrl: "/images/salada-quinoa.jpg",
    prepTimeMinutes: 15,
    cookTimeMinutes: 20,
    totalTime: "35 min",
    servings: "2 porções", // CORREÇÃO: number para string
    difficulty: "Fácil",
    rating: 4.8,
    reviewCount: 132,
    dietaryTags: ["vegan", "gluten-free", "vegetarian"],
    author: authorAna,
    ingredients: [
      // CORREÇÃO: 'amount' -> 'quantity', 'name' -> 'item'
      { quantity: "1 xícara", item: "Quinoa cozida" },
      { quantity: "1", item: "Abobrinha em rodelas" },
      { quantity: "1", item: "Pimentão vermelho em tiras" },
      { quantity: "1/4 xícara", item: "Azeite de oliva" },
    ],
    instructions: [
      "Tempere os legumes com azeite, sal e pimenta.",
      "Grelhe a abobrinha e o pimentão em uma frigideira quente até ficarem macios e com marcas de grelhado.",
      "Em uma tigela grande, misture a quinoa cozida com os legumes grelhados.",
      "Sirva imediatamente ou guarde na geladeira.",
    ],
    tips: [
      "Adicione um punhado de folhas de hortelã fresca para um sabor extra.",
      "Um fio de melado de cana por cima complementa os sabores.",
    ],
    nutritionalInfo: {
      calorias: "380kcal",
      proteínas: "12g",
      carboidratos: "45g",
      gorduras: "18g",
      fibras: "10g",
    },
  },
  {
    id: "2",
    slug: "sopa-de-lentilha-com-espinafre",
    name: "Sopa de Lentilha com Espinafre",
    description:
      "Uma sopa reconfortante e cheia de proteínas, ideal para dias frios. É um prato completo e muito nutritivo.",
    imageUrl: "/images/sopa-lentilha.jpg",
    prepTimeMinutes: 10,
    cookTimeMinutes: 30,
    totalTime: "40 min",
    servings: "4 porções", // CORREÇÃO: number para string
    difficulty: "Fácil",
    rating: 4.7,
    reviewCount: 205,
    dietaryTags: ["vegan", "gluten-free"],
    author: authorJoao,
    ingredients: [
      { quantity: "1 xícara", item: "Lentilhas vermelhas" },
      { quantity: "1", item: "Cebola picada" },
      { quantity: "2", item: "Cenouras picadas" },
      { quantity: "2", item: "Talos de aipo picados" },
      { quantity: "2 xícaras", item: "Espinafre fresco" },
      { quantity: "4 xícaras", item: "Caldo de legumes" },
    ],
    instructions: [
      "Em uma panela grande, refogue a cebola, cenoura e aipo em um fio de azeite até ficarem macios.",
      "Adicione as lentilhas e o caldo de legumes. Deixe ferver e cozinhe em fogo baixo por cerca de 20 minutos.",
      "Adicione o espinafre e cozinhe por mais 5 minutos, até as folhas murcharem.",
      "Tempere com sal, pimenta e sirva quente.",
    ],
    tips: [
      "Adicione uma colher de iogurte de coco ao servir para um toque cremoso.",
      "Um pouco de suco de limão no final realça os sabores.",
    ],
    nutritionalInfo: {
      calorias: "250kcal",
      proteínas: "15g",
      carboidratos: "40g",
      gorduras: "3g",
      fibras: "15g",
    },
  },
  {
    id: "4",
    slug: "bolo-de-banana-sem-gluten",
    name: "Bolo de Banana Sem Glúten",
    description:
      "Um bolo úmido e delicioso, feito com bananas maduras e farinha de amêndoas. Ideal para um café da tarde saudável.",
    imageUrl: "/images/bolo-banana.jpg",
    prepTimeMinutes: 10,
    cookTimeMinutes: 30,
    totalTime: "40 min",
    servings: "8 fatias", // CORREÇÃO: number para string
    difficulty: "Médio",
    rating: 4.9,
    reviewCount: 310,
    dietaryTags: ["gluten-free", "vegetarian"],
    author: authorAna,
    ingredients: [
      { quantity: "3", item: "Bananas maduras, amassadas" },
      { quantity: "2 xícaras", item: "Farinha de amêndoas" },
      { quantity: "1/2 xícara", item: "Mel ou açúcar mascavo" },
      { quantity: "2", item: "Ovos" },
      { quantity: "1 colher de chá", item: "Fermento em pó" },
    ],
    instructions: [
      "Pré-aqueça o forno a 180°C e unte uma forma de bolo.",
      "Em uma tigela, misture as bananas amassadas, os ovos e o mel.",
      "Adicione a farinha de amêndoas e o fermento, e misture até incorporar.",
      "Despeje a massa na forma e asse por 30-35 minutos, ou até um palito sair limpo.",
    ],
    tips: [
      "Adicione nozes picadas ou gotas de chocolate à massa para mais textura.",
    ],
    nutritionalInfo: {
      calorias: "280kcal",
      proteínas: "8g",
      carboidratos: "25g",
      gorduras: "18g",
      fibras: "5g",
    },
  },
  // ... adicione mais receitas completas conforme necessário
];
