import { Users, Heart, Award, Target } from "lucide-react";
import type { TeamMember, ValueCard } from "@/types/about";

export const teamMembers: TeamMember[] = [
  { name: "Ana Silva", role: "Fundadora & Chef", image: "...", bio: "..." },
  {
    name: "Dr. Carlos Nutrição",
    role: "Consultor Nutricional",
    image: "...",
    bio: "...",
  },
  {
    name: "Marina Costa",
    role: "Editora de Conteúdo",
    image: "...",
    bio: "...",
  },
];

export const values: ValueCard[] = [
  {
    icon: Heart,
    title: "Inclusão",
    description:
      "Acreditamos que todos merecem desfrutar de uma alimentação saborosa...",
  },
  {
    icon: Users,
    title: "Comunidade",
    description:
      "Construímos uma comunidade acolhedora onde pessoas compartilham experiências...",
  },
  {
    icon: Target,
    title: "Qualidade",
    description:
      "Cada receita é cuidadosamente testada para garantir sabor excepcional...",
  },
  {
    icon: Award,
    title: "Inovação",
    description:
      "Estamos sempre explorando novas técnicas e ingredientes para criar soluções...",
  },
];
