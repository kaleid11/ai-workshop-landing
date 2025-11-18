import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Loader2, Sparkles, TrendingDown } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Checkout() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<string>("blackFriday");
  
  const { data: products, isLoading: productsLoading } = trpc.checkout.getProducts.useQuery();
  const createSession = trpc.checkout.createSession.useMutation();

  const handleCheckout = async (productId: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    try {
      toast.info("Redirecting to secure checkout...");
      const result = await createSession.mutateAsync({ productId: productId as "blackFriday" | "earlyBird" | "standard" });
      if (result.url) {
        window.open(result.url, "_blank");
      }
    } catch (error) {
      toast.error("Failed to create checkout session. Please try again.");
      console.error(error);
    }
  };

  if (authLoading || productsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] to-[rgb(var(--brand-blue))] text-white p-4">
        <img src={APP_LOGO} alt="Workshop Logo" className="w-24 h-24 mb-8" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Sign In Required</h1>
        <p className="text-lg mb-8 text-center max-w-md text-white/90">
          Please sign in to access Black Friday pricing
        </p>
        <Button 
          size="lg"
          className="bg-brand-orange hover:bg-brand-orange/90 text-white"
          onClick={() => window.location.href = getLoginUrl()}
        >
          Sign In to Continue
        </Button>
      </div>
    );
  }

  const blackFriday = products?.find(p => p.productKey === "blackFriday");
  const earlyBird = products?.find(p => p.productKey === "earlyBird");
  const standard = products?.find(p => p.productKey === "standard");

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt="Workshop Logo" className="w-12 h-12" />
            <div>
              <h1 className="text-xl font-bold text-brand-purple">Social Media Automation Workshop</h1>
              <p className="text-sm text-gray-600">Black Friday Special</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8 md:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Black Friday Banner */}
          <div className="bg-gradient-to-r from-brand-orange to-brand-purple text-white rounded-2xl p-6 md:p-8 mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-6 h-6" />
              <h2 className="text-2xl md:text-3xl font-bold">Black Friday Exclusive</h2>
              <Sparkles className="w-6 h-6" />
            </div>
            <p className="text-lg md:text-xl mb-2">Limited Time Offer - Ends Soon!</p>
            <p className="text-white/90">Save over $2,000 compared to hiring a social media manager</p>
          </div>

          {/* Value Comparison */}
          <div className="bg-gray-50 rounded-2xl p-6 md:p-8 mb-12 border-2 border-gray-200">
            <h3 className="text-2xl font-bold text-center mb-6 text-brand-purple">The Real Value</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-red-200">
                <div className="text-red-600 font-bold text-sm mb-2">Traditional Approach</div>
                <div className="text-3xl font-bold text-gray-900 mb-4">$2,000<span className="text-lg text-gray-600">/month</span></div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>Hire a social media manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>$24,000+ per year commitment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>Ongoing monthly expenses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    <span>Limited to their availability</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-brand-orange/10 to-brand-purple/10 rounded-xl p-6 border-2 border-brand-orange">
                <div className="text-brand-orange font-bold text-sm mb-2 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4" />
                  This Workshop
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  $97 
                  <span className="text-lg text-gray-500 line-through ml-2">$297</span>
                </div>
                <div className="text-sm text-brand-purple font-semibold mb-4">One-time payment • Lifetime access</div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Learn to automate everything yourself</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Save $23,903 in the first year alone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Work 24/7 with automation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Keep 100% control of your content</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-purple mb-3">
              Choose Your Access Level
            </h2>
            <p className="text-lg text-gray-600">
              All tiers include the full workshop and lifetime access
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Black Friday Special */}
            {blackFriday && (
              <Card className={`border-2 transition-all cursor-pointer relative ${selectedProduct === "blackFriday" ? "border-brand-orange shadow-2xl scale-105" : "hover:border-brand-orange/50"}`}
                onClick={() => setSelectedProduct("blackFriday")}>
                {blackFriday.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-orange text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {blackFriday.badge}
                  </div>
                )}
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl text-center">{blackFriday.name}</CardTitle>
                  <div className="text-center mt-4">
                    <div className="text-5xl font-bold text-brand-purple">
                      ${(blackFriday.price / 100).toFixed(0)}
                    </div>
                    <div className="text-xl text-gray-400 line-through mt-1">
                      ${(blackFriday.originalPrice / 100).toFixed(0)}
                    </div>
                    <div className="text-brand-orange font-bold mt-2">
                      Save ${((blackFriday.originalPrice - blackFriday.price) / 100).toFixed(0)}
                    </div>
                  </div>
                  <CardDescription className="text-center text-base mt-3">{blackFriday.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {blackFriday.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Early Bird */}
            {earlyBird && (
              <Card className={`border-2 transition-all cursor-pointer relative ${selectedProduct === "earlyBird" ? "border-brand-blue shadow-xl" : "hover:border-brand-blue/50"}`}
                onClick={() => setSelectedProduct("earlyBird")}>
                {earlyBird.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    {earlyBird.badge}
                  </div>
                )}
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl text-center">{earlyBird.name}</CardTitle>
                  <div className="text-center mt-4">
                    <div className="text-5xl font-bold text-brand-purple">
                      ${(earlyBird.price / 100).toFixed(0)}
                    </div>
                    <div className="text-xl text-gray-400 line-through mt-1">
                      ${(earlyBird.originalPrice / 100).toFixed(0)}
                    </div>
                    <div className="text-brand-blue font-bold mt-2">
                      Save ${((earlyBird.originalPrice - earlyBird.price) / 100).toFixed(0)}
                    </div>
                  </div>
                  <CardDescription className="text-center text-base mt-3">{earlyBird.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {earlyBird.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Standard */}
            {standard && (
              <Card className={`border-2 transition-all cursor-pointer ${selectedProduct === "standard" ? "border-brand-purple shadow-xl" : "hover:border-brand-purple/50"}`}
                onClick={() => setSelectedProduct("standard")}>
                <CardHeader className="pt-8">
                  <CardTitle className="text-2xl text-center">{standard.name}</CardTitle>
                  <div className="text-center mt-4">
                    <div className="text-5xl font-bold text-brand-purple">
                      ${(standard.price / 100).toFixed(0)}
                    </div>
                    <div className="text-xl text-gray-400 line-through mt-1">
                      ${(standard.originalPrice / 100).toFixed(0)}
                    </div>
                    <div className="text-brand-purple font-bold mt-2">
                      Save ${((standard.originalPrice - standard.price) / 100).toFixed(0)}
                    </div>
                  </div>
                  <CardDescription className="text-center text-base mt-3">{standard.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {standard.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Checkout Button */}
          <div className="max-w-md mx-auto">
            <Button
              size="lg"
              className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-xl py-7 h-auto shadow-xl"
              onClick={() => handleCheckout(selectedProduct)}
              disabled={createSession.isPending}
            >
              {createSession.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Secure Checkout →"
              )}
            </Button>
            <p className="text-sm text-gray-600 text-center mt-4">
              🔒 Secure payment • Test card: 4242 4242 4242 4242
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
