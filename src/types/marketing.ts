export type MarketingStat = {
  label: string;
  value: string | number;
  growth?: string;
  iconName: IconName;
};

export type IconName = 'Users' | 'TrendingUp' | 'Star' | 'Target';

export interface PricingPackage {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  badge?: string;
  isPopular: boolean;
}
