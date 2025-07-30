import {
  marketingStats,
  pricingPackages,
  testimonials,
} from '@/lib/data/marketing';
import type {
  MarketingStat,
  PricingPackage,
  Testimonial,
} from '@/types/marketing';

export function getMarketingData(): {
  stats: MarketingStat[];
  packages: PricingPackage[];
  heroImageUrl: string;
} {
  return {
    stats: marketingStats,
    packages: pricingPackages,
    heroImageUrl: '/images/marketing-hero.jpg',
  };
}

export function getTestimonials(): {
  testimonials: Testimonial[];
} {
  return {
    testimonials: testimonials,
  };
}
