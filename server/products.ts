/**
 * Workshop products and pricing configuration
 */

export interface WorkshopProduct {
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  currency: string;
  features: string[];
}

export const WORKSHOP_PRODUCTS: Record<string, WorkshopProduct> = {
  earlyBird: {
    id: "workshop_early_bird",
    name: "Early Bird Access",
    description: "Limited time early bird pricing for the AI Social Media Workshop",
    price: 9700, // $97
    currency: "usd",
    features: [
      "2-hour live workshop",
      "Lifetime portal access",
      "WhatsApp community",
      "Workshop replay",
      "Bonus templates",
    ],
  },
  startup: {
    id: "workshop_startup",
    name: "Startup Tier",
    description: "Standard pricing for the AI Social Media Workshop",
    price: 14700, // $147
    currency: "usd",
    features: [
      "2-hour live workshop",
      "Lifetime portal access",
      "WhatsApp community",
      "Workshop replay",
      "Bonus templates",
      "Priority support",
    ],
  },
  referral: {
    id: "workshop_referral",
    name: "Referral Discount",
    description: "Special pricing for referred customers",
    price: 7700, // $77
    currency: "usd",
    features: [
      "2-hour live workshop",
      "Lifetime portal access",
      "WhatsApp community",
      "Workshop replay",
      "Bonus templates",
    ],
  },
};

export function formatPrice(priceInCents: number): string {
  return `$${(priceInCents / 100).toFixed(2)}`;
}
