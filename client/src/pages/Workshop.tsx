import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Users, Zap, Star, ArrowRight, Calendar } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { APP_LOGO } from "@/const";
import { BOOKING_URL } from "@/const";

const WORKSHOP_DATE = "Next Workshop: December 15, 2024";
const SPOTS_REMAINING = 8;

interface PricingTier {
  name: string;
  price: string;
  priceId: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$197",
    priceId: "price_1SWdSaBFgG7R6jP2hB5srTzC", // Stripe price ID for Starter tier
    description: "Perfect for solopreneurs getting started with AI",
    features: [
      "Full workshop access (2 hours)",
      "Core 7 AI tools setup guide",
      "Basic automation templates",
      "Workshop recording access",
      "Community access (30 days)",
      "Email support"
    ],
    cta: "Get Started"
  },
  {
    name: "Pro",
    price: "$497",
    priceId: "price_1SWdSpBFgG7R6jP2Fe52e6M2", // Stripe price ID for Pro tier
    description: "For SMBs ready to scale with AI",
    features: [
      "Everything in Starter",
      "1-on-1 implementation session (60 min)",
      "Custom tool stack recommendations",
      "Advanced automation workflows",
      "Community access (90 days)",
      "Priority email + chat support",
      "Quarterly strategy check-ins (3 months)"
    ],
    popular: true,
    cta: "Go Pro"
  },
  {
    name: "Enterprise",
    price: "$1,497",
    priceId: "price_1SWdT3BFgG7R6jP2j9FQzLnj", // Stripe price ID for Enterprise tier
    description: "Complete AI transformation for your team",
    features: [
      "Everything in Pro",
      "Team workshop (up to 10 people)",
      "Custom AI assistant development",
      "Full tool stack implementation",
      "Dedicated Slack channel",
      "Unlimited support (6 months)",
      "Monthly strategy sessions (6 months)",
      "ROI tracking & reporting"
    ],
    cta: "Transform Your Business"
  }
];

export default function Workshop() {
  const { user, isAuthenticated } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const createSession = trpc.checkout.createSession.useMutation();

  const handleCheckout = async (priceId: string) => {
    if (!isAuthenticated) {
      // Redirect to login with current page as return URL
      // This ensures user comes back to workshop page after login
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-3">
              <img src={APP_LOGO} alt="Tech Horizon Labs" className="h-10 w-10" />
              <span className="font-bold text-xl">Tech Horizon Labs</span>
            </a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">Book Free Audit</Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <Badge className="mb-4 bg-brand-orange text-white">
            {SPOTS_REMAINING} Spots Remaining
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
              AI Social Media Workshop
            </span>
          </h1>
          <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto">
            Transform your social media strategy with AI in one intensive 2-hour workshop. 
            Learn the exact tools and workflows Queensland's top operators use to save 10+ hours per week.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-blue" />
              <span>2 Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-brand-blue" />
              <span>{WORKSHOP_DATE}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-brand-blue" />
              <span>Limited to 15 participants</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-brand-purple/20 border-2 border-white flex items-center justify-center text-xs font-semibold">
                  {i}
                </div>
              ))}
            </div>
            <span className="font-semibold">200+ businesses transformed</span>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-xl text-gray-600">
              Select the tier that matches your business goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`relative ${tier.popular ? 'border-4 border-brand-orange shadow-2xl scale-105' : 'border-2'}`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-brand-orange text-white px-4 py-1">
                      <Star className="w-4 h-4 inline mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-brand-purple">{tier.price}</span>
                    <span className="text-gray-600 ml-2">one-time</span>
                  </div>
                  <CardDescription className="text-base">{tier.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${tier.popular ? 'bg-brand-orange hover:bg-brand-orange/90' : ''}`}
                    size="lg"
                    onClick={() => handleCheckout(tier.priceId)}
                    disabled={checkoutLoading !== null}
                  >
                    {checkoutLoading === tier.priceId ? "Loading..." : tier.cta}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  {tier.popular && (
                    <p className="text-xs text-center text-gray-600">
                      💰 Save $1,200+ per year on tool costs
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Not sure which tier is right for you?
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg">
                Book Free Consultation
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-xl text-gray-600">
              Everything you need to transform your social media workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-brand-blue/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-brand-blue" />
                  </div>
                  <CardTitle className="text-xl">Module 1: Core AI Tools</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• ChatGPT Team for content ideation and copywriting</li>
                  <li>• Manus for custom tools and automation</li>
                  <li>• Gamma for presentations and pitch decks</li>
                  <li>• Captions.ai for video editing</li>
                  <li>• Hands-on setup and configuration</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-brand-purple" />
                  </div>
                  <CardTitle className="text-xl">Module 2: Content Workflows</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• AI-powered content calendar creation</li>
                  <li>• Batch content production workflows</li>
                  <li>• Repurposing long-form into shorts</li>
                  <li>• Brand voice consistency with AI</li>
                  <li>• Quality control and review processes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-brand-orange/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-brand-orange" />
                  </div>
                  <CardTitle className="text-xl">Module 3: Automation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Automated posting schedules</li>
                  <li>• AI-powered engagement responses</li>
                  <li>• Lead capture and nurture automation</li>
                  <li>• Analytics and reporting dashboards</li>
                  <li>• Integration with existing tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Module 4: Advanced Tactics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>• Riverside.fm for podcasts and live streams</li>
                  <li>• Reap.video for short-form content</li>
                  <li>• ElevenLabs for AI voiceovers</li>
                  <li>• Custom GPTs for your brand</li>
                  <li>• ROI tracking and optimization</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-2">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1">
                  <img 
                    src="/instructor-huxley.jpeg" 
                    alt="Huxley Peckham" 
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:col-span-2">
                  <h2 className="text-3xl font-bold mb-4">Meet Your Instructor</h2>
                  <h3 className="text-2xl text-brand-purple mb-4">Huxley Peckham</h3>
                  <p className="text-gray-700 mb-4">
                    AI implementation specialist with 18 months coaching 200+ Queensland SMBs on AI adoption. 
                    Certified by Apple (Genius Bar), Microsoft (AI), and Google (Workspaces).
                  </p>
                  <ul className="space-y-2 text-gray-700 mb-6">
                    <li>• Founder, Tech Horizon Labs</li>
                    <li>• 200+ businesses transformed with AI</li>
                    <li>• Average client saves $39,000/year</li>
                    <li>• Specializes in no-code AI implementation</li>
                  </ul>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                      Book 1-on-1 Consultation
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">
              Real results from Queensland businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Huxley's workshop completely transformed how we approach social media. We're now saving 15+ hours per week and our engagement has tripled."
                </p>
                <p className="font-semibold">Sarah Chen</p>
                <p className="text-sm text-gray-600">Marketing Director, Brisbane Retail Co</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "The ROI was immediate. We cut our tool costs by $800/month and our content quality actually improved. Best investment we've made."
                </p>
                <p className="font-semibold">Marcus Thompson</p>
                <p className="text-sm text-gray-600">Founder, Gold Coast Consulting</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  "Huxley made AI accessible for our non-technical team. Within a week, everyone was using the tools confidently."
                </p>
                <p className="font-semibold">Emma Rodriguez</p>
                <p className="text-sm text-gray-600">CEO, Sunshine Coast Agency</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Do I need technical skills?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  No! The workshop is designed for non-technical business owners. We focus on no-code tools and simple workflows that anyone can implement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What if I can't attend the live workshop?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  All tiers include lifetime access to the workshop recording and materials. You can watch at your own pace and revisit anytime.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How quickly will I see results?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Most clients start seeing time savings within the first week. Full ROI typically happens within 30-60 days as you optimize your workflows.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What tools do I need to purchase?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We recommend a core stack starting around $150-200/month (ChatGPT Team + Manus + specialized tools). This replaces $500-1000/month in traditional tools.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Is there ongoing support after the workshop?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Yes! All tiers include email support. Pro and Enterprise tiers include extended support periods and strategy check-ins.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Can I upgrade my tier later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Absolutely! Contact us anytime to upgrade. We'll credit your original purchase toward the higher tier.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-brand-purple to-brand-blue text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join {15 - SPOTS_REMAINING} other Queensland businesses already registered
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-brand-purple hover:bg-gray-100"
              onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
            >
              Choose Your Tier
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Book Free Consultation
              </Button>
            </a>
          </div>
          <p className="mt-6 text-sm opacity-75">
            {SPOTS_REMAINING} spots remaining • {WORKSHOP_DATE}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Tech Horizon Labs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
