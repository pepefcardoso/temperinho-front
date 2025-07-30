import type {
  PricingPackage,
  MarketingStat,
  Testimonial,
} from '@/types/marketing';

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
  },
];

export const pricingPackages: PricingPackage[] = [
  {
    name: 'Primeiro Sabor',
    price: 'R$ 49',
    period: '/mês',
    description:
      'A porta de entrada para pequenos produtores e negócios locais que querem ser vistos pela nossa comunidade.',
    features: [
      '1 Artigo Patrocinado no Blog por mês',
      'Divulgação do artigo nas nossas Redes Sociais',
      'Inclusão da sua marca na seção de Apoiadores',
    ],
    isPopular: false,
    badge: 'Para Começar 🌱',
  },
  {
    name: 'Marca em Destaque',
    price: 'R$ 129',
    period: '/mês',
    description:
      'Ideal para marcas que procuram um destaque consistente e um maior envolvimento com o nosso público.',
    features: [
      '3 Artigos Patrocinados no Blog por mês',
      'Divulgação dedicada nas Redes Sociais',
      'Banner Fixo na barra lateral das receitas',
      'Destaque na nossa Newsletter semanal',
    ],
    isPopular: true,
    badge: 'Mais Popular 🚀',
  },
  {
    name: 'Parceria Estratégica',
    price: 'Custom',
    period: '',
    description:
      'Uma solução completa e sob medida para marcas que desejam criar um impacto duradouro e integrado.',
    features: [
      'Pacote customizável de Posts Patrocinados',
      'Campanhas de email marketing dedicadas',
      'Banners em todas as áreas estratégicas do site',
      'Consultoria de estratégia de conteúdo',
      'Gerente de conta dedicado',
    ],
    isPopular: false,
    badge: 'Sob Medida 🤝',
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'Finalmente encontrei um lugar com receitas deliciosas que respeitam minhas restrições. A comunidade é incrível!',
    author: 'Ana P.',
    role: 'Membro desde 2023',
    avatarUrl: 'https://i.pravatar.cc/150?u=ana-p',
  },
  {
    quote:
      'Este site mudou minha relação com a comida. As receitas sem glúten são criativas e fáceis de fazer. Recomendo!',
    author: 'Carlos S.',
    role: 'Entusiasta Culinário',
    avatarUrl: 'https://i.pravatar.cc/150?u=carlos-s',
  },
];
