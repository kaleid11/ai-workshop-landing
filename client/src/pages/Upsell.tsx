import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Sparkles, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Upsell() {
  const [, setLocation] = useLocation();
  const [upgrading, setUpgrading] = useState(false);
  const createSession = trpc.checkout.createSession.useMutation();

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      const result = await createSession.mutateAsync({ 
        priceId: "price_1SK8g0Cii5zXCZr60hKTLXe4" // Pro tier
      });
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Upgrade error:", error);
      alert("Failed to process upgrade. Please try again or contact support.");
      setUpgrading(false);
    }
  };

  const handleSkip = () => {
    setLocation("/portal");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to the Workshop! 🎉
          </h1>
          <p className="text-xl text-gray-300">
            Your Lite membership is confirmed. Check your email for next steps.
          </p>
        </div>

        {/* Upsell Offer */}
        <Card className="bg-gradient-to-b from-orange-500/20 to-purple-500/20 border-orange-500/50 shadow-2xl shadow-orange-500/20 mb-8">
          <CardHeader className="text-center pb-6">
            <Badge className="mx-auto mb-4 bg-orange-500 text-white text-lg px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              ONE-TIME UPGRADE OFFER
            </Badge>
            <CardTitle className="text-3xl text-white mb-2">
              Upgrade to Pro & Get Your First Month FREE
            </CardTitle>
            <CardDescription className="text-xl text-gray-200">
              Unlock 1-on-1 sessions, custom audits, and priority support
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Comparison */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Current Plan */}
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4">Your Current Plan (Lite)</h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>2 workshops/month</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Workshop recordings</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>WhatsApp community</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>Email support</span>
                  </div>
                </div>
              </div>

              {/* Upgraded Plan */}
              <div className="bg-gradient-to-b from-orange-500/30 to-purple-500/30 rounded-lg p-6 border-2 border-orange-500/50">
                <h3 className="text-lg font-semibold text-white mb-4">Pro Plan (Upgrade)</h3>
                <div className="space-y-3 text-white">
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">Everything in Lite, PLUS:</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>4 workshops/month (double!)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>1-on-1 implementation session</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Custom tool stack audit</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Priority support (24h response)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>Quarterly strategy calls</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="text-center py-6 bg-white/5 rounded-lg">
              <div className="text-2xl text-gray-400 line-through mb-2">
                $300/month
              </div>
              <div className="text-5xl font-bold text-white mb-2">
                $240<span className="text-2xl text-gray-400">/month</span>
              </div>
              <div className="text-xl text-green-400 font-semibold mb-4">
                First month FREE + 20% founding discount forever
              </div>
              <p className="text-gray-300">
                That's just <span className="text-orange-400 font-semibold">$163 more/month</span> for 2x the workshops + personal coaching
              </p>
            </div>

            {/* CTAs */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xl py-6"
                onClick={handleUpgrade}
                disabled={upgrading}
              >
                {upgrading ? "Processing..." : "Yes! Upgrade to Pro Now"}
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>

              <Button
                size="lg"
                variant="ghost"
                className="w-full text-gray-400 hover:text-white hover:bg-white/5"
                onClick={handleSkip}
              >
                No thanks, I'll stick with Lite
                <X className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Guarantee */}
            <div className="text-center text-sm text-gray-400 pt-4 border-t border-white/10">
              <p>
                ✓ Cancel anytime • ✓ No long-term contracts • ✓ Downgrade to Lite anytime
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Social Proof */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">
            Join 47 Pro members who upgraded and are scaling faster
          </p>
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-purple-500" />
            ))}
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-semibold">
              +42
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
