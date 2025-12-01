import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: object;
}

export function SEO({
  title = "Tech Horizon Academy | Master AI Before Your Competitors Do",
  description = "AI training for Queensland businesses. 1,620+ AI tools, expert-curated prompts, weekly workshops, and hands-on guidance. Master AI before your competitors do.",
  keywords = "AI training Queensland, AI for business, AI consultant Queensland, AI workshops, AI tools database, ChatGPT for business, AI business automation, AI training Australia",
  ogImage = "/workshop-hero.webp",
  ogType = "website",
  canonical,
  noindex = false,
  structuredData,
}: SEOProps) {
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://aisocialwork-e9rjae3t.manus.space';
  const canonicalUrl = canonical || (typeof window !== 'undefined' ? window.location.href : siteUrl);
  const fullTitle = title.includes("Tech Horizon") ? title : `${title} | Tech Horizon Academy`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Tech Horizon Academy" />
      <meta property="og:locale" content="en_AU" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Additional SEO */}
      <meta name="author" content="Tech Horizon Labs" />
      <meta name="geo.region" content="AU-QLD" />
      <meta name="geo.placename" content="Queensland" />
      <meta name="geo.position" content="-27.4698;153.0251" />
      <meta name="ICBM" content="-27.4698, 153.0251" />
      
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
  "name": "Tech Horizon Academy - AI Training & Workshops",
  "description": "AI training for Queensland businesses. Weekly hands-on workshops covering 1,620+ AI tools, expert prompts, and real-world automation. Master AI before your competitors do.",
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
    "AI automation",
    "Business process automation",
    "AI tools mastery",
    "Workflow optimization",
    "AI agent development"
  ]
};

export const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Tech Horizon Academy",
  "description": "AI education and systems hub helping Queensland businesses automate their social media and marketing with AI tools.",
  "url": "https://aisocialwork-e9rjae3t.manus.space",
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


// FAQ Schema for Workshop Page
export const workshopFAQStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is AI used in business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI is used in business for automation, content creation, customer service, data analysis, and workflow optimization. Common applications include ChatGPT for writing, AI tools for social media management, automated email responses, and business process automation."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best AI to use for business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best AI tools for business depend on your needs. ChatGPT and Claude are excellent for content and communication, Gemini for Google Workspace integration, Manus for workflow automation, and specialized tools for design (Midjourney), video (Runway), and data analysis (Claude with artifacts)."
      }
    },
    {
      "@type": "Question",
      "name": "How much does an AI consultant cost in Queensland?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI consultant rates in Queensland typically range from $150-$400 per hour for freelance consultants. Tech Horizon Academy offers a more affordable alternative with workshops starting at $77 one-time or $97/month for ongoing training and support."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use ChatGPT for business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, ChatGPT can be used for business with ChatGPT Plus ($20/month) or ChatGPT Team ($25-30/user/month). It's excellent for content creation, email drafting, research, brainstorming, and customer communication. Always review AI-generated content before publishing."
      }
    },
    {
      "@type": "Question",
      "name": "How do I get trained in AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can get AI training through online courses (Google AI, Coursera), certifications, or hands-on workshops. Tech Horizon Academy offers weekly live workshops where you learn by doing - building real automations and workflows with expert guidance from Huxley Peckham."
      }
    },
    {
      "@type": "Question",
      "name": "Which AI course is best for business owners?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The best AI course for business owners focuses on practical application rather than theory. Tech Horizon Academy's workshops teach real-world AI implementation with 1,620+ tools, battle-tested prompts, and production-ready workflows you can deploy immediately."
      }
    }
  ]
};
