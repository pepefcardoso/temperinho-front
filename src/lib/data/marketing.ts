import type { PricingPackage, MarketingStat } from "@/types/marketing";

export const marketingStats: MarketingStat[] = [
    {
        value: 15000,
        label: 'Usuários na Comunidade',
        iconName: 'Users',
        growth: '+12% este mês',
    },
    {
        value: 2500,
        label: 'Receitas Publicadas',
        iconName: 'ChefHat',
        growth: '+50 novas',
    },
    {
        value: 800,
        label: 'Artigos no Blog',
        iconName: 'Newspaper',
        growth: '+20 novos',
    },
    {
        value: '4.8',
        label: 'Avaliação Média',
        iconName: 'Star',
        growth: 'Baseado em 500+ reviews',
    }
];


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
