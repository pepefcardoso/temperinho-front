import { marketingStats, pricingPackages } from "@/lib/data/marketing";
import type { MarketingStats, PricingPackage } from "@/types/marketing";

export function getMarketingData(): {
  stats: MarketingStats;
  packages: PricingPackage[];
} {
  return {
    stats: marketingStats,
    packages: pricingPackages,
  };
}
