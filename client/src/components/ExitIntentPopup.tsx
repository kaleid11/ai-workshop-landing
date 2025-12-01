import { useState, useEffect } from "react";
import { X, Gift, Mail, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const POPUP_COOLDOWN_KEY = "exitIntentPopupShown";
const COOLDOWN_DAYS = 7; // Show popup again after 7 days

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [weeklyNews, setWeeklyNews] = useState(true);
  const [hasShown, setHasShown] = useState(false);

  const subscribeMutation = trpc.newsletter.subscribe.useMutation({
    onSuccess: () => {
      toast.success("Success! Check your email for the AI Quick Start Guide 🎉");
      setIsVisible(false);
      // Set cooldown
      const cooldownDate = new Date();
      cooldownDate.setDate(cooldownDate.getDate() + COOLDOWN_DAYS);
      localStorage.setItem(POPUP_COOLDOWN_KEY, cooldownDate.toISOString());
      
      // Track GA4 event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'newsletter_signup', {
          method: 'exit_intent_popup',
          weekly_news: weeklyNews
        });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to subscribe. Please try again.");
    },
  });

  useEffect(() => {
    // Check if popup was recently shown
    const lastShown = localStorage.getItem(POPUP_COOLDOWN_KEY);
    if (lastShown) {
      const cooldownDate = new Date(lastShown);
      if (new Date() < cooldownDate) {
        return; // Still in cooldown period
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        
        // Track GA4 event
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'exit_intent_triggered', {
            page_path: window.location.pathname
          });
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    subscribeMutation.mutate({ email, weeklyNews });
  };

  const handleClose = () => {
    setIsVisible(false);
    // Track GA4 event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exit_intent_closed', {
        page_path: window.location.pathname
      });
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Popup Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md mx-4 animate-in zoom-in duration-300">
        <div className="bg-background border-2 border-brand-purple rounded-2xl shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors z-10"
            aria-label="Close popup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header with Gradient */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Wait! Don't Leave Empty-Handed</h2>
            <p className="text-white/90 text-sm">
              Get your FREE AI Quick Start Guide + Resource Pack
            </p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Quick Start Guide</h3>
                  <p className="text-xs text-muted-foreground">Step-by-step guide to get started with AI tools today</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4 text-pink-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Weekly AI News (Optional)</h3>
                  <p className="text-xs text-muted-foreground">Stay ahead with curated AI updates every week</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="weeklyNews"
                  checked={weeklyNews}
                  onCheckedChange={(checked) => setWeeklyNews(checked as boolean)}
                />
                <label
                  htmlFor="weeklyNews"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Yes, send me weekly AI news and updates
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={subscribeMutation.isPending}
              >
                {subscribeMutation.isPending ? "Sending..." : "Get My Free Resources →"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                No spam, ever. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
