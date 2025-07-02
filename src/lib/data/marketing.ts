import type { PricingPackage, MarketingStatsData } from "@/types/marketing";

export const marketingStats: MarketingStatsData = {
  users: 15000,
  recipes: 2500,
  posts: 800,
};

export const pricingPackages: PricingPackage[] = [
  {
    name: "Básico",
    price: "R$ 99",
    period: "/mês",
    description:
      "Ideal para pequenas marcas e influenciadores que querem começar.",
    features: [
      "1 Post Patrocinado por mês",
      "Destaque na Newsletter semanal",
      "Relatório de desempenho básico",
      "Suporte por email",
    ],
    isPopular: false,
  },
  {
    name: "Profissional",
    price: "R$ 249",
    period: "/mês",
    description:
      "O mais popular. Perfeito para marcas em crescimento que buscam mais alcance.",
    features: [
      "3 Posts Patrocinados por mês",
      "Destaque na Newsletter semanal",
      "Banner no topo da página de receitas",
      "Relatório de desempenho detalhado",
      "Suporte prioritário por email",
    ],
    isPopular: true,
    badge: "Mais Popular",
  },
  {
    name: "Empresarial",
    price: "Custom",
    period: "",
    description:
      "Soluções sob medida para grandes marcas com necessidades específicas.",
    features: [
      "Pacote de Posts Patrocinados",
      "Campanhas de email marketing dedicadas",
      "Banners em todo o site",
      "Consultoria de estratégia de conteúdo",
      "Gerente de conta dedicado",
    ],
    isPopular: false,
    badge: "Personalizado",
  },
];
