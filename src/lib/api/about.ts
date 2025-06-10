import { teamMembers, values } from "@/lib/dummy-data/about";
import type { TeamMember, ValueCard } from "@/types/about";

export async function getAboutPageData(): Promise<{
  team: TeamMember[];
  values: ValueCard[];
}> {
  // Em um cenário real, estes dados viriam de um CMS ou API.
  await new Promise((resolve) => setTimeout(resolve, 150)); // Simula delay
  return {
    team: teamMembers,
    values: values,
  };
}
