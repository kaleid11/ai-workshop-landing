import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO } from "@/const";
import { trpc } from "@/lib/trpc";
import { CheckCircle2, Gift, Mail, Sparkles, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: products, isLoading: productsLoading } = trpc.checkout.getProducts.useQuery();
  const createSession = trpc.checkout.createSession.useMutation();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const result = await createSession.mutateAsync({
        productId: "standard",
      });

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setIsLoading(false);
    }
  };

  const product = products?.[0];

  if (productsLoading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container py-4">
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
              <img src={APP_LOGO} alt="Workshop Logo" className="w-10 h-10" />
              <span className="font-bold text-lg">Social Media Workshop</span>
            </div>
          </Link>
        </div>
      </header>

      <div className="container py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Secure Your Workshop Spot
            </h1>
            <p className="text-xl text-gray-600">
              One payment. Lifetime access. Transform your social media workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left: Product Details */}
            <div className="space-y-6">
              <Card className="border-2 border-brand-orange">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-6 h-6 text-brand-orange" />
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="text-5xl font-bold text-gray-900">
                      ${(product.price / 100).toFixed(0)}
                      <span className="text-xl text-gray-600 ml-2">AUD</span>
                    </div>
                    <div className="text-brand-orange font-semibold mt-1">One-time payment • Lifetime access</div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 mb-3">What's Included:</h3>
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Referral Program Card */}
              <Card className="border-2 border-brand-green bg-gradient-to-br from-brand-green/5 to-brand-blue/5">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Gift className="w-6 h-6 text-brand-green" />
                    <CardTitle className="text-xl">Bring a Friend, Save Together</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">$15 AUD off per friend</p>
                      <p className="text-sm text-gray-600">
                        Refer friends and you both get $15 AUD off. Email their names to{" "}
                        <a href="mailto:info@thzn.world" className="text-brand-green hover:underline font-medium">
                          info@thzn.world
                        </a>{" "}
                        after purchase to claim your discount.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Startup Discount Card */}
              <Card className="border-2 border-brand-purple bg-gradient-to-br from-brand-purple/5 to-brand-orange/5">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Mail className="w-6 h-6 text-brand-purple" />
                    <CardTitle className="text-xl">Startup Discount Available</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">$20 AUD off for early-stage startups</p>
                      <p className="text-sm text-gray-600">
                        Email{" "}
                        <a href="mailto:info@thzn.world" className="text-brand-purple hover:underline font-medium">
                          info@thzn.world
                        </a>{" "}
                        with your startup details before purchase to receive a discount code.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Checkout Action */}
            <div>
              <Card className="border-2 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Complete Your Purchase</CardTitle>
                  <CardDescription>Secure payment via Stripe</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Workshop Access</span>
                      <span className="font-semibold">${(product.price / 100).toFixed(0)} AUD</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between items-center">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-2xl text-brand-orange">
                        ${(product.price / 100).toFixed(0)} AUD
                      </span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-lg py-7 h-auto"
                    onClick={handleCheckout}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </span>
                    ) : (
                      "Proceed to Payment →"
                    )}
                  </Button>

                  <div className="space-y-2 text-sm text-gray-600 text-center">
                    <p className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-green" />
                      Secure payment processing
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-green" />
                      Instant access after payment
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-green" />
                      30-day email support included
                    </p>
                  </div>

                  <div className="pt-4 border-t text-center">
                    <p className="text-sm text-gray-600">
                      Questions?{" "}
                      <a href="mailto:info@thzn.world" className="text-brand-orange hover:underline font-medium">
                        Email us
                      </a>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              <Link href="/" className="text-brand-orange hover:underline font-medium">
                ← Back to workshop details
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
