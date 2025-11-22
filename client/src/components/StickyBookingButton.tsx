import { Calendar } from "lucide-react";
import { Button } from "./ui/button";

/**
 * Sticky booking button that floats in bottom-right corner
 * Links to Klipy.ai 15-min free AI audit booking page
 */
export default function StickyBookingButton() {
  const BOOKING_URL = "https://app.klipy.ai/book/pre-discovery/free-pre-discovery";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button
          size="lg"
          className="shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold px-6 py-6 rounded-full group"
        >
          <Calendar className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Book Free 15-Min Audit</span>
          <span className="sm:hidden">Free Audit</span>
        </Button>
      </a>
      
      {/* Pulse animation ring */}
      <div className="absolute inset-0 rounded-full bg-orange-500/30 animate-ping" style={{ animationDuration: '2s' }}></div>
    </div>
  );
}
