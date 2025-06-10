import type { LucideIcon } from "lucide-react";

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface ValueCard {
  icon: LucideIcon;
  title: string;
  description: string;
}
