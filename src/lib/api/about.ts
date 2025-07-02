import { teamMembers, ourValues } from "@/lib/data/about";
import type { TeamMember, ValueCard } from "@/types/about";

export function getAboutPageData(): {
  team: TeamMember[];
  values: ValueCard[];
} {
  return {
    team: teamMembers,
    values: ourValues,
  };
}
