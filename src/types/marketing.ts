export interface PricingPackage {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}

export interface MarketingStat {
  value: number | string;
  label: string;
  iconName: keyof typeof import("lucide-react");
  growth?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
}
