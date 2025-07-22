import type { TeamMember, ValueCard } from "@/types/about";
import { Heart, Leaf, ShieldCheck, Users } from "lucide-react";

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ana Silva",
    role: "Chef e Fundadora",
    bio: "Apaixonada por criar pratos que unem sabor e saúde, Ana fundou o Temperinho para compartilhar sua paixão por uma culinária inclusiva e deliciosa.",
    image: "/images/team/ana-silva.jpg",
  },
  {
    id: 2,
    name: "Carlos Souza",
    role: "Nutricionista",
    bio: "Com foco em nutrição funcional, Carlos garante que todas as nossas receitas sejam balanceadas, saudáveis e seguras para diversas restrições alimentares.",
    image: "/images/team/carlos-souza.jpg",
  },
  {
    id: 3,
    name: "Juliana Pereira",
    role: "Criadora de Conteúdo",
    bio: "Juliana é a voz por trás do nosso blog e redes sociais, transformando informações complexas em dicas práticas e inspiradoras para o dia a dia.",
    image: "/images/team/juliana-pereira.jpg",
  },
];

export const ourValues: ValueCard[] = [
  {
    icon: Leaf,
    title: "Sabor Incomparável",
    description:
      "Acreditamos que comida saudável não precisa ser sem graça. Cada receita é criada para ser uma explosão de sabores.",
  },
  {
    icon: Heart,
    title: "Inclusão na Cozinha",
    description:
      "Nossa missão é garantir que todos, independentemente de suas restrições alimentares, possam desfrutar de pratos deliciosos.",
  },
  {
    icon: ShieldCheck,
    title: "Confiança e Saúde",
    description:
      "Todas as nossas receitas são revisadas por nutricionistas para garantir que sejam seguras, balanceadas e nutritivas.",
  },
  {
    icon: Users,
    title: "Comunidade Forte",
    description:
      "Somos um espaço para compartilhar, aprender e crescer juntos, unidos pela paixão por uma alimentação consciente e feliz.",
  },
];
