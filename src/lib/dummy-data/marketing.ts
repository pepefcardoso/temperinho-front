import type { MarketingStat, PricingPackage } from "@/types/marketing";

export const marketingStats: MarketingStat[] = [
  {
    label: "Visitantes Mensais",
    value: "150K+",
    growth: "+25%",
    iconName: "Users",
  },
  {
    label: "Receitas Visualizadas",
    value: "2M+",
    growth: "+32%",
    iconName: "TrendingUp",
  },
  { label: "Avaliação Média", value: 4.8, growth: "+0.2", iconName: "Star" },
  {
    label: "Taxa de Engajamento",
    value: "85%",
    growth: "+12%",
    iconName: "Target",
  },
];

export const pricingPackages: PricingPackage[] = [
  {
    name: "Básico",
    price: "R$ 29,90",
    period: "por mês",
    description:
      "Ideal para quem está começando e quer explorar o mundo da culinária inclusiva.",
    features: [
      "Acesso a receitas básicas",
      "Suporte por email",
      "Newsletter mensal",
    ],
    badge: "Mais Popular",
    isPopular: true,
  },
  {
    name: "Avançado",
    price: "R$ 49,90",
    period: "por mês",
    description:
      "Para quem já tem alguma experiência e quer expandir seus conhecimentos.",
    features: [
      "Tudo do Básico",
      "Acesso a receitas avançadas",
      "Suporte prioritário",
    ],
    isPopular: false,
  },
  {
    name: "Profissional",
    price: "R$ 99,90",
    period: "por mês",
    description:
      "Para chefs e entusiastas que querem levar suas habilidades ao próximo nível.",
    features: [
      "Tudo do Avançado",
      "Cursos exclusivos",
      "Consultoria personalizada",
    ],
    isPopular: false,
  },
];
