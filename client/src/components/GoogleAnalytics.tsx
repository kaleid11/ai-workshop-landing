import { useEffect } from 'react';
import { useLocation } from 'wouter';

// Set your Google Analytics 4 Measurement ID here
// Get this from https://analytics.google.com/analytics/web/
// Format: G-XXXXXXXXXX
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function GoogleAnalytics() {
  const [location] = useLocation();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) {
      console.warn('[Google Analytics] No measurement ID configured. Set VITE_GA_MEASUREMENT_ID in .env');
      return;
    }

    // Load Google Analytics script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer?.push(args);
    }
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, {
      page_path: location,
    });

    return () => {
      // Cleanup scripts on unmount
      document.head.removeChild(script1);
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: location,
    });
  }, [location]);

  return null;
}

// Helper function to track custom events
export function trackEvent(eventName: string, eventParams?: object) {
  if (!window.gtag) {
    console.warn('[Google Analytics] gtag not initialized');
    return;
  }

  window.gtag('event', eventName, eventParams);
}

// Common event trackers
export const analytics = {
  trackPurchase: (value: number, currency: string = 'AUD') => {
    trackEvent('purchase', {
      value,
      currency,
      items: [{ item_name: 'AI Workshop' }],
    });
  },
  
  trackSignup: (method: string = 'email') => {
    trackEvent('sign_up', { method });
  },
  
  trackBooking: () => {
    trackEvent('generate_lead', {
      value: 0,
      currency: 'AUD',
    });
  },
  
  trackWorkshopView: () => {
    trackEvent('view_item', {
      items: [{ item_name: 'AI Workshop', price: 77, currency: 'AUD' }],
    });
  },
};
