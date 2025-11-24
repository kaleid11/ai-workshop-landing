import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
}

export function SEO({
  title = "Tech Horizon Academy - AI Social Media Workshop",
  description = "Learn to automate your social media with AI. Join 200+ Queensland businesses saving $3K/month. Live workshop + 1 month FREE Academy access.",
  keywords = "AI social media, content automation, ViralWave Studio, AI workshop, social media marketing, Queensland business, AI tools",
  ogImage = "/workshop-hero.webp",
  ogType = "website",
  structuredData,
}: SEOProps) {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const fullTitle = title.includes("Tech Horizon") ? title : `${title} | Tech Horizon Academy`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:url" content={siteUrl} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// Predefined structured data for common pages
export const workshopStructuredData = {
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "AI Social Media Workshop",
  "description": "Learn to automate your social media with AI tools. Build an AI agent that knows your business and creates content automatically.",
  "provider": {
    "@type": "Organization",
    "name": "Tech Horizon Academy",
    "sameAs": [
      "https://www.facebook.com/huxleyp",
      "https://linktr.ee/huxleyp"
    ]
  },
  "instructor": {
    "@type": "Person",
    "name": "Huxley Peckham",
    "description": "AI consultant who has coached 200+ businesses on AI implementation for 18 months. Certified by Apple (Genius Bar), Microsoft (AI), and Google (Workspaces)."
  },
  "offers": {
    "@type": "Offer",
    "price": "77",
    "priceCurrency": "AUD",
    "availability": "https://schema.org/InStock",
    "validFrom": "2024-11-01"
  },
  "courseMode": "online",
  "duration": "PT2H",
  "educationalLevel": "Beginner to Intermediate",
  "teaches": [
    "AI content automation",
    "Social media scheduling",
    "AI video generation",
    "Brand voice development",
    "Marketing automation"
  ]
};

export const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Tech Horizon Academy",
  "description": "AI education and systems hub helping Queensland businesses automate their social media and marketing with AI tools.",
  "url": typeof window !== 'undefined' ? window.location.origin : '',
  "telephone": "+61-XXXX-XXXX", // Replace with actual phone
  "email": "info@thzn.world",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Brisbane",
    "addressRegion": "QLD",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -27.4705,
    "longitude": 153.0260
  },
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127"
  }
};
