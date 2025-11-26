import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Sparkles } from "lucide-react";
import { APP_TITLE } from "@/const";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";

export default function Pricing() {
  const { user, isAuthenticated } = useAuth();
  const { data: tiers, isLoading } = trpc.academy.getTiers.useQuery();
  const { data: userSubscription } = trpc.academy.getUserSubscription.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pricing...</p>
        </div>
      </div>
    );
  }

  const currentTierSlug = userSubscription?.tier?.slug;

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
            {isAuthenticated ? (
              <>
                <Link href="/portal">
                  <Button variant="outline">Portal</Button>
                </Link>
                <span className="text-sm text-gray-600">Hi, {user?.name}</span>
              </>
            ) : (
              <Link href="/">
                <Button variant="outline">Back to Home</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200">
            <Sparkles className="w-3 h-3 mr-1" />
            Founding Member Pricing - Save up to 20%
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-orange-600 to-pink-600 bg-clip-text text-transparent">
            Choose Your Path to AI Mastery
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Join Tech Horizon Academy and learn to automate your business with AI. 
            Founding member discounts available until December 31, 2025.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tiers?.filter((t: any) => ['access_pass', 'workshop', 'starter', 'lite', 'pro', 'enterprise'].includes(t.slug)).map((tier: any) => {
              const features = JSON.parse(tier.features) as string[];
              const isCurrentTier = currentTierSlug === tier.slug;
              const isPro = tier.slug === 'pro';
              
              // Determine if this is a one-time or monthly tier
              const isOneTime = tier.priceOneTime > 0 || tier.foundingPriceOneTime > 0;
              const isEnterprise = tier.slug === 'enterprise';
              
              // Calculate pricing
              const displayPrice = isOneTime 
                ? (tier.foundingPriceOneTime || tier.priceOneTime)
                : (tier.foundingPriceMonthly || tier.priceMonthly);
              const regularPrice = isOneTime ? tier.priceOneTime : tier.priceMonthly;
              const hasDiscount = isOneTime
                ? (tier.foundingPriceOneTime && tier.foundingPriceOneTime < tier.priceOneTime)
                : (tier.foundingPriceMonthly && tier.foundingPriceMonthly < tier.priceMonthly);

              return (
                <Card 
                  key={tier.id} 
                  className={`relative ${isPro ? 'border-orange-500 border-2 shadow-xl scale-105' : 'border-gray-200'}`}
                >
                  {isPro && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-orange-500 text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="text-base">
                      {tier.slug === 'access_pass' && 'Lifetime access to all resources and community'}
                      {tier.slug === 'workshop' && 'Single workshop access with recording'}
                      {tier.slug === 'starter' && 'Monthly workshops and live training'}
                      {tier.slug === 'lite' && 'More workshops plus recordings access'}
                      {tier.slug === 'pro' && 'Unlimited workshops and strategy calls'}
                      {tier.slug === 'enterprise' && 'Custom solutions for your business'}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="mb-6">
                      {isEnterprise ? (
                        <div className="mb-2">
                          <span className="text-2xl font-bold text-gray-900">
                            Contact Us
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            Custom pricing for your needs
                          </p>
                        </div>
                      ) : (
                        <>
                          {hasDiscount && (
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="text-3xl font-bold text-gray-900">
                                ${(displayPrice / 100).toFixed(0)}
                              </span>
                              <span className="text-xl text-gray-400 line-through">
                                ${(regularPrice / 100).toFixed(0)}
                              </span>
                              <Badge variant="secondary" className="bg-green-100 text-green-700">
                                Save {Math.round((1 - displayPrice / regularPrice) * 100)}%
                              </Badge>
                            </div>
                          )}
                          {!hasDiscount && (
                            <div className="flex items-baseline gap-2 mb-2">
                              <span className="text-3xl font-bold text-gray-900">
                                ${(displayPrice / 100).toFixed(0)}
                              </span>
                            </div>
                          )}
                          <p className="text-sm text-gray-600">
                            {isOneTime ? 'AUD one-time' : 'AUD per month'}
                          </p>
                          {hasDiscount && (
                            <p className="text-xs text-orange-600 mt-1">
                              🔥 Founding member price until Dec 31, 2025
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    <ul className="space-y-3 mb-6">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    {isCurrentTier ? (
                      <Button className="w-full" variant="outline" disabled>
                        Current Plan
                      </Button>
                    ) : isEnterprise ? (
                      <Button 
                        className="w-full"
                        asChild
                      >
                        <a href="mailto:huxley@thzn.world?subject=Enterprise Tier Inquiry">
                          Contact Us
                        </a>
                      </Button>
                    ) : (
                      <Button 
                        className={`w-full ${isPro ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
                        asChild
                      >
                        <Link href={`/checkout?tier=${tier.slug}`}>
                          {isOneTime ? `Get ${tier.name}` : `Join ${tier.name}`}
                        </Link>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">How many workshops can I attend each month?</h3>
              <p className="text-gray-600">
                Starter tier includes 2 workshops per month. Lite tier includes 4 workshops per month. Pro tier includes unlimited workshops per month. All tiers include monthly live training sessions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Which tiers include workshop recordings?</h3>
              <p className="text-gray-600">
                Workshop recordings are available on Lite tier ($300/month) and above. Starter tier ($97/month) does not include access to workshop recordings, but you can attend live workshops and access all tools, prompts, and resources.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Can I upgrade or downgrade later?</h3>
              <p className="text-gray-600">
                Yes! You can upgrade anytime from your portal. Downgrades take effect at the end of your current billing period.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Do I keep access to tools and prompts if I cancel?</h3>
              <p className="text-gray-600">
                Yes! Anyone who has ever purchased any tier (even one-time Access Pass or Workshop) gets lifetime access to the full tools database and prompts library. This access never expires, even if you cancel your monthly subscription. Only workshop attendance and recordings require an active subscription.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">When does founding member pricing end?</h3>
              <p className="text-gray-600">
                Founding member discounts are available until December 31, 2025. After that, prices increase to regular rates. Lock in your discount now!
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">What if I'm not satisfied?</h3>
              <p className="text-gray-600">
                We offer a 14-day money-back guarantee for all subscription tiers. If you're not happy with your purchase, contact us within 14 days for a full refund.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business with AI?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join 500+ Australian business owners who are already automating their workflows and scaling with confidence.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600" asChild>
              <Link href="/checkout?tier=pro">Start with Pro</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/checkout?tier=starter">Try Starter Pass</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Tech Horizon Labs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
