import { marketingStats, pricingPackages } from "@/lib/data/marketing";
import type {MarketingStat, PricingPackage } from "@/types/marketing";

export function getMarketingData(): {
  stats: MarketingStat[];
  packages: PricingPackage[];
} {
  return {
    stats: marketingStats,
    packages: pricingPackages,
  };
}
