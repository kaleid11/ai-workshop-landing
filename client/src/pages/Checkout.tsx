import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Checkout() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState<string>("earlyBird");
  
  const { data: products, isLoading: productsLoading } = trpc.checkout.getProducts.useQuery();
  const createSession = trpc.checkout.createSession.useMutation();

  const handleCheckout = async (productId: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    try {
      toast.info("Redirecting to checkout...");
      const result = await createSession.mutateAsync({ productId: productId as "earlyBird" | "startup" | "referral" });
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
      <div className="min-h-screen flex items-center justify-center">
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
          Please sign in to purchase workshop access
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

  const earlyBird = products?.find(p => p.productKey === "earlyBird");
  const startup = products?.find(p => p.productKey === "startup");
  const referral = products?.find(p => p.productKey === "referral");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-center gap-3">
            <img src={APP_LOGO} alt="Workshop Logo" className="w-12 h-12" />
            <div>
              <h1 className="text-xl font-bold text-brand-purple">AI Social Media Workshop</h1>
              <p className="text-sm text-gray-600">Checkout</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Choose Your Workshop Access
            </h1>
            <p className="text-xl text-gray-600">
              Select the pricing tier that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Referral Discount */}
            {referral && (
              <Card className={`border-2 transition-all cursor-pointer ${selectedProduct === "referral" ? "border-brand-green shadow-lg" : "hover:border-brand-green/50"}`}
                onClick={() => setSelectedProduct("referral")}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-2xl">{referral.name}</CardTitle>
                    <div className="bg-brand-green/20 text-brand-green px-3 py-1 rounded-full text-sm font-bold">
                      BEST VALUE
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-brand-purple">
                    ${(referral.price / 100).toFixed(0)}
                  </div>
                  <CardDescription className="text-base">{referral.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {referral.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Early Bird */}
            {earlyBird && (
              <Card className={`border-2 transition-all cursor-pointer ${selectedProduct === "earlyBird" ? "border-brand-orange shadow-lg" : "hover:border-brand-orange/50"}`}
                onClick={() => setSelectedProduct("earlyBird")}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-2xl">{earlyBird.name}</CardTitle>
                    <div className="bg-brand-orange/20 text-brand-orange px-3 py-1 rounded-full text-sm font-bold">
                      LIMITED
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-brand-purple">
                    ${(earlyBird.price / 100).toFixed(0)}
                  </div>
                  <CardDescription className="text-base">{earlyBird.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {earlyBird.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Startup */}
            {startup && (
              <Card className={`border-2 transition-all cursor-pointer ${selectedProduct === "startup" ? "border-brand-blue shadow-lg" : "hover:border-brand-blue/50"}`}
                onClick={() => setSelectedProduct("startup")}>
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">{startup.name}</CardTitle>
                  <div className="text-4xl font-bold text-brand-purple">
                    ${(startup.price / 100).toFixed(0)}
                  </div>
                  <CardDescription className="text-base">{startup.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {startup.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
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
              className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-xl py-6 h-auto"
              onClick={() => handleCheckout(selectedProduct)}
              disabled={createSession.isPending}
            >
              {createSession.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </Button>
            <p className="text-sm text-gray-600 text-center mt-4">
              Secure payment powered by Stripe • Test with card: 4242 4242 4242 4242
            </p>
          </div>

          {/* What's Included */}
          <div className="mt-16 bg-white rounded-2xl p-8 border-2">
            <h2 className="text-2xl font-bold text-brand-purple mb-6 text-center">
              What's Included in Every Tier
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">2-Hour Live Workshop</h3>
                  <p className="text-sm text-gray-600">Hands-on training with AI tools for social media automation</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Lifetime Portal Access</h3>
                  <p className="text-sm text-gray-600">Download guides, templates, and resources anytime</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">WhatsApp Community</h3>
                  <p className="text-sm text-gray-600">Connect with operators and get ongoing support</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0" />
                <div>
                  <h3 className="font-bold mb-1">Workshop Replay</h3>
                  <p className="text-sm text-gray-600">Couldn't make it live? Watch the replay anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
