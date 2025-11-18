/**
 * Workshop products and pricing configuration
 * Black Friday Special Pricing
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
  blackFriday: {
    id: "workshop_black_friday",
    name: "Black Friday Special",
    description: "Limited time Black Friday offer - save over $2,000",
    price: 9700, // $97
    originalPrice: 29700, // $297 workshop value
    currency: "usd",
    badge: "BEST VALUE",
    features: [
      "2-hour live workshop ($297 value)",
      "Lifetime portal access",
      "WhatsApp community",
      "Workshop replay",
      "Bonus templates & guides",
    ],
  },
  earlyBird: {
    id: "workshop_early_bird",
    name: "Early Bird",
    description: "Early access pricing for fast movers",
    price: 14700, // $147
    originalPrice: 29700,
    currency: "usd",
    badge: "LIMITED",
    features: [
      "2-hour live workshop ($297 value)",
      "Lifetime portal access",
      "WhatsApp community",
      "Workshop replay",
      "Bonus templates",
    ],
  },
  standard: {
    id: "workshop_standard",
    name: "Standard Access",
    description: "Full workshop access at regular pricing",
    price: 19700, // $197
    originalPrice: 29700,
    currency: "usd",
    features: [
      "2-hour live workshop ($297 value)",
      "Lifetime portal access",
      "WhatsApp community",
      "Workshop replay",
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

// Social Media Manager Cost Comparison
export const SOCIAL_MEDIA_MANAGER_MONTHLY_COST = 200000; // $2,000/month average
export const SOCIAL_MEDIA_MANAGER_YEARLY_COST = SOCIAL_MEDIA_MANAGER_MONTHLY_COST * 12; // $24,000/year
