import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Users, Zap, Star, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { APP_LOGO } from "@/const";
import { BOOKING_URL } from "@/const";

const WORKSHOP_DATE = "Next Workshop: December 15, 2024";

interface PricingTier {
  name: string;
  monthlyPrice: string;
  originalPrice?: string;
  priceId: string;
  description: string;
  features: string[];
  popular?: boolean;
  comingSoon?: boolean;
  cta: string;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Lite",
    monthlyPrice: "$77",
    originalPrice: "$97",
    priceId: "price_1SK8fTCii5zXCZr6ZQqQMjSs",
    description: "Perfect for solopreneurs getting started",
    badge: "🎉 FOUNDING MEMBER",
    features: [
      "2 live workshops per month",
      "This workshop + 1 more this month FREE",
      "Core 7 AI tools setup & training",
      "Workshop recordings (lifetime access)",
      "Private WhatsApp community",
      "Email support",
      "Cancel anytime"
    ],
    cta: "Start Free Month"
  },
  {
    name: "Pro",
    monthlyPrice: "$240",
    originalPrice: "$300",
    priceId: "price_1SK8g0Cii5zXCZr60hKTLXe4",
    description: "For SMBs scaling with AI automation",
    badge: "🔥 MOST POPULAR",
    features: [
      "Everything in Lite",
      "4 live workshops per month",
      "1-on-1 implementation session (monthly)",
      "Custom tool stack audit",
      "Advanced automation workflows",
      "Priority support (24h response)",
      "Quarterly strategy calls",
      "Cancel anytime"
    ],
    popular: true,
    cta: "Start Free Month"
  },
  {
    name: "Enterprise",
    monthlyPrice: "Custom",
    priceId: "",
    description: "Complete AI transformation for teams",
    badge: "COMING SOON",
    features: [
      "Everything in Pro",
      "Unlimited workshops for your team",
      "Custom AI assistant development",
      "Dedicated implementation manager",
      "White-glove onboarding",
      "Slack/Teams integration",
      "Custom SLAs & contracts"
    ],
    comingSoon: true,
    cta: "Book Discovery Call"
  }
];

const modules = [
  {
    title: "Module 1: Content Strategy Made Easy",
    description: "Learn to create 30 days of content in under 2 hours using AI",
    image: "/module-1-screenshot.png",
    outcomes: [
      "Build a content calendar in minutes",
      "Generate platform-specific posts",
      "Maintain brand voice across channels"
    ]
  },
  {
    title: "Module 2: Video Content at Scale",
    description: "Turn one video into 20+ pieces of content automatically",
    image: "/module-2-screenshot.png",
    outcomes: [
      "Repurpose long-form to short-form",
      "Auto-generate captions & thumbnails",
      "Schedule across all platforms"
    ]
  },
  {
    title: "Module 3: Engagement Automation",
    description: "Never miss a comment or DM with AI-powered responses",
    image: "/module-3-screenshot.png",
    outcomes: [
      "Auto-respond to common questions",
      "Flag important messages",
      "Build community on autopilot"
    ]
  },
  {
    title: "Module 4: Analytics & Optimization",
    description: "Let AI analyze what's working and double down",
    image: "/module-4-screenshot.png",
    outcomes: [
      "Track performance across platforms",
      "Get AI-powered recommendations",
      "Optimize for maximum ROI"
    ]
  }
];

export default function Workshop() {
  const { user, isAuthenticated } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const createSession = trpc.checkout.createSession.useMutation();

  const handleCheckout = async (priceId: string, comingSoon?: boolean) => {
    if (comingSoon) {
      window.location.href = BOOKING_URL;
      return;
    }

    if (!isAuthenticated) {
      window.location.href = getLoginUrl(window.location.pathname + window.location.search);
      return;
    }

    setCheckoutLoading(priceId);
    try {
      const result = await createSession.mutateAsync({ priceId });
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again or contact support.");
      setCheckoutLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/50">
            <Sparkles className="w-3 h-3 mr-1" />
            Founding Member Offer - 20% OFF Forever
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Stop Paying <span className="text-orange-400">$3K/Month</span>
            <br />
            for Social Media
          </h1>
          
          <p className="text-xl text-gray-300 mb-4">
            Learn to automate your social media with AI in just 2 hours
          </p>
          
          <p className="text-lg text-gray-400 mb-8">
            Join 200+ Queensland SMBs saving 15+ hours/week on content creation
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Free Month
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8"
              onClick={() => document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' })}
            >
              See What's Inside
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{WORKSHOP_DATE}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>8 spots left</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Math is Simple Section */}
      <section className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            The Math is Simple
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-red-500/10 border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400">❌ Old Way</CardTitle>
                <CardDescription className="text-gray-300">Hiring a social media manager</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-red-400 mb-4">$3,000/mo</div>
                <ul className="space-y-2 text-gray-300">
                  <li>• $36,000/year minimum</li>
                  <li>• Plus software costs ($500/mo)</li>
                  <li>• Training & management time</li>
                  <li>• Limited to business hours</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-green-500/10 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400">✓ New Way</CardTitle>
                <CardDescription className="text-gray-300">AI automation + monthly training</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-400 mb-4">
                  <span className="line-through text-gray-500 text-2xl">$97</span> $77/mo
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li>• $924/year (20% founding discount)</li>
                  <li>• All tools included in training</li>
                  <li>• Works 24/7 automatically</li>
                  <li>• First month completely FREE</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-2xl font-bold text-orange-400">
              Save $35,076 in your first year
            </p>
            <p className="text-gray-400 mt-2">And keep your time for what matters</p>
          </div>
        </div>
      </section>

      {/* What You'll Master Section */}
      <section className="py-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            What You'll Master
          </h2>
          <p className="text-center text-gray-400 mb-12">
            In just 2 hours, you'll learn the exact system we use
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
                <CardTitle className="text-white">Content Strategy</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <ul className="space-y-2">
                  <li>• 30-day content calendar in 20 minutes</li>
                  <li>• Platform-specific optimization</li>
                  <li>• Brand voice consistency</li>
                  <li>• Trend identification & adaptation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Batch Creation</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <ul className="space-y-2">
                  <li>• 1 video → 20+ content pieces</li>
                  <li>• Auto-generate captions & thumbnails</li>
                  <li>• Cross-platform repurposing</li>
                  <li>• Schedule weeks in advance</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Community Growth</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <ul className="space-y-2">
                  <li>• AI-powered comment responses</li>
                  <li>• DM automation & filtering</li>
                  <li>• Engagement tracking</li>
                  <li>• Lead qualification</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-white">Data & Optimization</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300">
                <ul className="space-y-2">
                  <li>• Cross-platform analytics</li>
                  <li>• AI performance insights</li>
                  <li>• Content optimization tips</li>
                  <li>• ROI tracking & reporting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Workshop Modules Section */}
      <section id="modules" className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            Workshop Modules
          </h2>
          <p className="text-center text-gray-400 mb-12">
            4 modules, 2 hours, lifetime access to recordings
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {modules.map((module, index) => (
              <Card key={index} className="bg-white/5 border-white/10 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-orange-500/20 flex items-center justify-center">
                  <span className="text-6xl font-bold text-white/20">
                    {index + 1}
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="text-white">{module.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {module.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-300">
                    {module.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg">
            <p className="text-orange-300 font-semibold">
              🎁 All workshop recordings included - watch anytime, forever
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-400">1</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Join & Setup</h3>
              <p className="text-gray-400">
                Sign up, get instant access to prep materials, and join our WhatsApp community
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Attend Live</h3>
              <p className="text-gray-400">
                2-hour hands-on workshop where we build your system together in real-time
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-400">3</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Implement</h3>
              <p className="text-gray-400">
                Get ongoing support, attend future workshops, and scale your automation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 bg-white/5 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-500/20 text-orange-300 border-orange-500/50 text-lg px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              20% OFF - Founding Members Only
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-400">
              First month completely FREE • Cancel anytime • Lock in founding member pricing forever
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`relative ${
                  tier.popular 
                    ? 'bg-gradient-to-b from-orange-500/20 to-purple-500/20 border-orange-500/50 shadow-xl shadow-orange-500/20' 
                    : tier.comingSoon
                    ? 'bg-white/5 border-white/10 opacity-75'
                    : 'bg-white/5 border-white/10'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <Badge className={
                      tier.popular 
                        ? 'bg-orange-500 text-white' 
                        : tier.comingSoon
                        ? 'bg-gray-500 text-white'
                        : 'bg-purple-500 text-white'
                    }>
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl text-white mb-2">{tier.name}</CardTitle>
                  <CardDescription className="text-gray-300">{tier.description}</CardDescription>
                  
                  <div className="mt-6">
                    {tier.originalPrice && (
                      <div className="text-2xl text-gray-500 line-through mb-1">
                        {tier.originalPrice}/mo
                      </div>
                    )}
                    <div className="text-5xl font-bold text-white">
                      {tier.monthlyPrice}
                      {!tier.comingSoon && <span className="text-xl text-gray-400">/mo</span>}
                    </div>
                    {!tier.comingSoon && (
                      <p className="text-sm text-green-400 mt-2 font-semibold">
                        First month FREE ($0 due today)
                      </p>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      tier.popular
                        ? 'bg-orange-500 hover:bg-orange-600 text-white'
                        : tier.comingSoon
                        ? 'bg-gray-600 hover:bg-gray-700 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                    size="lg"
                    onClick={() => handleCheckout(tier.priceId, tier.comingSoon)}
                    disabled={checkoutLoading === tier.priceId}
                  >
                    {checkoutLoading === tier.priceId ? "Processing..." : tier.cta}
                    {!tier.comingSoon && <ArrowRight className="ml-2 w-5 h-5" />}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                🎁 Founding Member Guarantee
              </h3>
              <p className="text-gray-300">
                Lock in 20% off forever. When we raise prices to $120/mo and $375/mo, 
                you'll still pay founding member rates. Plus, cancel anytime with no questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-16 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Meet Your Instructor
          </h2>

          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1">
                  <img 
                    src="/instructor-huxley.jpeg" 
                    alt="Huxley Peckham"
                    className="rounded-lg w-full shadow-xl"
                  />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Huxley Peckham</h3>
                    <p className="text-orange-400 font-semibold">AI Automation Specialist</p>
                  </div>
                  
                  <div className="space-y-3 text-gray-300">
                    <p>
                      Certified by Apple, Microsoft, and Google in AI and automation systems. 
                      For the past 18 months, I've helped 200+ Queensland SMBs implement AI 
                      workflows that save 15+ hours per week.
                    </p>
                    <p>
                      I'm not a marketing guru or social media influencer. I'm an operator who 
                      built these systems for my own businesses first, then started teaching 
                      others when I saw the results.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-400">200+</div>
                      <div className="text-sm text-gray-400">Businesses Coached</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400">15+</div>
                      <div className="text-sm text-gray-400">Hours Saved/Week</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400">$35K</div>
                      <div className="text-sm text-gray-400">Avg. Annual Savings</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-orange-500/10 to-purple-500/10">
        <div className="container max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join the next workshop and start your first month FREE
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white text-xl px-12 py-6"
              onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Free Month Now
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <span>✓ First month FREE</span>
            <span>✓ Cancel anytime</span>
            <span>✓ 20% off forever</span>
          </div>
        </div>
      </section>
    </div>
  );
}
