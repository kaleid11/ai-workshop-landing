/**
 * Workshop products and pricing configuration
 * AUD Pricing
 */

export interface WorkshopProduct {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  originalPrice: number; // in cents
  currency: string;
  features: string[];
  badge?: string;
}

export const WORKSHOP_PRODUCTS: Record<string, WorkshopProduct> = {
  standard: {
    id: "workshop_standard",
    name: "Workshop Access",
    description: "Complete social media automation workshop with lifetime access",
    price: 9700, // $97 AUD
    originalPrice: 9700,
    currency: "aud",
    features: [
      "2-hour live workshop",
      "Lifetime portal access",
      "WhatsApp community",
      "Workshop replay",
      "Bonus templates & guides",
      "Email support for 30 days",
      "Special pricing for advanced workshop",
    ],
  },
};

export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(0)}`;
}

export function calculateSavings(originalPrice: number, salePrice: number): number {
  return originalPrice - salePrice;
}

export function calculatePercentOff(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

// Social Media Manager Cost Comparison (AUD)
export const SOCIAL_MEDIA_MANAGER_MONTHLY_COST = 300000; // $3,000 AUD/month average
export const SOCIAL_MEDIA_MANAGER_YEARLY_COST = SOCIAL_MEDIA_MANAGER_MONTHLY_COST * 12; // $36,000 AUD/year

// Referral Program
export const REFERRAL_DISCOUNT_PER_FRIEND = 1500; // $15 AUD off per friend
export const STARTUP_DISCOUNT = 2000; // $20 AUD off for startups (email required)
