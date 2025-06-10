import { marketingStats, pricingPackages } from "@/lib/dummy-data/marketing";
import type { MarketingStat, PricingPackage } from "@/types/marketing";

export async function getMarketingData(): Promise<{
  stats: MarketingStat[];
  packages: PricingPackage[];
}> {
  await new Promise((resolve) => setTimeout(resolve, 200)); // Simula delay
  return {
    stats: marketingStats,
    packages: pricingPackages,
  };
}
