import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getLoginUrl, APP_TITLE } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, Check, ArrowLeft, CreditCard, Shield } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function TierCheckout() {
  const { isAuthenticated, loading: authLoading, user } = useAuth();
  const [, navigate] = useLocation();
  const [tierSlug, setTierSlug] = useState<string | null>(null);
  const [showProcessingModal, setShowProcessingModal] = useState(false);

  // Get tier slug from URL query params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tier = params.get('tier');
    setTierSlug(tier);
  }, []);

  const { data: tiers, isLoading: tiersLoading } = trpc.academy.getTiers.useQuery();
  const createCheckoutMutation = trpc.academy.createCheckoutSession.useMutation({
    onSuccess: (data: { url?: string }) => {
      if (data.url) {
        // Keep modal open while redirecting
        window.location.href = data.url;
      }
    },
    onError: (error: any) => {
      console.error('Checkout error:', error);
      setShowProcessingModal(false);
      alert('Failed to create checkout session. Please try again.');
    },
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      const returnUrl = window.location.pathname + window.location.search;
      window.location.href = getLoginUrl(returnUrl);
    }
  }, [isAuthenticated, authLoading]);

  const tier = tiers?.find((t: any) => t.slug === tierSlug);
  const isLoading = authLoading || tiersLoading || !tier;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (!tier) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Tier Not Found</CardTitle>
            <CardDescription>The requested membership tier could not be found.</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/pricing">
              <Button className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Pricing
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const features = JSON.parse(tier.features) as string[];
  const isOneTime = (tier.priceOneTime ?? 0) > 0 || (tier.foundingPriceOneTime ?? 0) > 0;
  const displayPrice = isOneTime 
    ? (tier.foundingPriceOneTime || tier.priceOneTime || 0)
    : (tier.foundingPriceMonthly || tier.priceMonthly);
  const regularPrice = isOneTime ? (tier.priceOneTime || 0) : tier.priceMonthly;
  const hasDiscount = isOneTime
    ? (tier.foundingPriceOneTime && tier.priceOneTime && tier.foundingPriceOneTime < tier.priceOneTime)
    : (tier.foundingPriceMonthly && tier.priceMonthly && tier.foundingPriceMonthly < tier.priceMonthly);

  const handleCheckout = () => {
    setShowProcessingModal(true);
    createCheckoutMutation.mutate({ tierSlug: tier.slug });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              {APP_TITLE}
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Pricing
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Checkout Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-orange-600 to-pink-600 bg-clip-text text-transparent">
              Complete Your Purchase
            </h1>
            <p className="text-gray-600">
              You're about to join {tier.name}. Review your order below.
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                  <CardDescription>
                    {tier.slug === 'access_pass' && 'Lifetime access to all resources and community'}
                    {tier.slug === 'workshop' && 'Single workshop access with recording'}
                    {tier.slug === 'starter' && 'Monthly workshops and live training'}
                    {tier.slug === 'lite' && 'More workshops plus recordings access'}
                    {tier.slug === 'pro' && 'Unlimited workshops and strategy calls'}
                  </CardDescription>
                </div>
                <div className="text-right">
                  {hasDiscount && (
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-gray-900">
                        ${(displayPrice / 100).toFixed(0)}
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        ${(regularPrice / 100).toFixed(0)}
                      </span>
                    </div>
                  )}
                  {!hasDiscount && (
                    <span className="text-3xl font-bold text-gray-900">
                      ${(displayPrice / 100).toFixed(0)}
                    </span>
                  )}
                  <p className="text-sm text-gray-600">
                    {isOneTime ? 'AUD one-time' : 'AUD per month'}
                  </p>
                  {hasDiscount && (
                    <Badge variant="secondary" className="bg-green-100 text-green-700 mt-2">
                      Save {Math.round((1 - displayPrice / regularPrice) * 100)}%
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* User Info */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{user?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{user?.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checkout Button */}
          <Button 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg"
            onClick={handleCheckout}
            disabled={createCheckoutMutation.isPending}
          >
            {createCheckoutMutation.isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating checkout session...
              </>
            ) : (
              <>
                Proceed to Payment
              </>
            )}
          </Button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Secure payment powered by Stripe. Your payment information is encrypted and secure.
          </p>

          {hasDiscount && (
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-800">
                🔥 <strong>Founding Member Discount:</strong> This special pricing is only available until December 31, 2025. Lock in your rate now!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Payment Processing Modal */}
      <Dialog open={showProcessingModal} onOpenChange={setShowProcessingModal}>
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <CreditCard className="w-6 h-6 text-orange-500" />
              Processing Your Payment
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              Please wait while we securely redirect you to Stripe checkout...
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-8 space-y-6">
            <div className="relative">
              <Loader2 className="w-16 h-16 animate-spin text-orange-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-orange-100 animate-pulse"></div>
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-gray-900">
                Setting up your secure payment session
              </p>
              <p className="text-xs text-gray-500">
                This usually takes just a few seconds
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4 text-green-600" />
              <span>256-bit SSL encrypted connection</span>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <p className="text-xs text-orange-800 text-center">
              ⚠️ <strong>Important:</strong> Please don't close this window. You'll be redirected automatically.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
