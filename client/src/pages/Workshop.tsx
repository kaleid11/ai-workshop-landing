import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, Video, FileText, BookOpen, Calendar, Sparkles, 
  Users, Clock, Zap, Star, ArrowRight, Shield, Target, MessageCircle
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl, BOOKING_URL } from "@/const";
import { useState } from "react";
import { toast } from "sonner";

const WORKSHOP_DATE = "Next Workshop: December 15, 2024";

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
      toast.error("Failed to start checkout. Please try again or contact support.");
      setCheckoutLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section - Matches brand screenshot */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-purple-500 to-blue-600 text-white">
        <div className="absolute inset-0 bg-[url('/workshop-hero.webp')] bg-cover bg-center opacity-20" />
        <div className="container relative py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                LIVE WORKSHOP
              </Badge>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Build an AI Agent that knows your business
              </h1>
              
              <p className="text-xl text-white/90">
                HOSTED BY HUXLEY PECKHAM
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-white/90"
                  onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Workshop Access $77
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                  onClick={() => window.open(BOOKING_URL, '_blank')}
                >
                  Book 1-on-1 Audit
                </Button>
              </div>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>200+ Businesses Coached</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-current" />
                  <span>5.0 Rating</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/instructor-huxley.webp" 
                alt="Huxley Peckham" 
                className="rounded-2xl shadow-2xl border-4 border-white/20"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              Stop Paying <span className="text-orange-500">$3K/Month</span> for Social Media
            </h2>
            <p className="text-xl text-muted-foreground">
              Learn the exact 7-tool AI system Queensland SMBs use to automate content creation, 
              save 10+ hours/week, and cut costs by 80%
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Path
            </h2>
            <p className="text-xl text-muted-foreground">
              Start with a workshop, get 1 month free Academy access
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* One-Time Workshop */}
            <Card className="relative border-2 hover:border-orange-500 transition-all">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle>Workshop</CardTitle>
                  <Badge variant="secondary">One-Time</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">$77</span>
                    <span className="text-sm text-muted-foreground line-through">$97</span>
                  </div>
                  <CardDescription>
                    With code FRIENDS20
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Access to 1 workshop</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">1 month FREE Academy access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Workshop recording forever</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">WhatsApp community access</span>
                  </li>
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => handleCheckout("price_1SK8fTCii5zXCZr6ZQqQMjSs")}
                  disabled={checkoutLoading === "price_1SK8fTCii5zXCZr6ZQqQMjSs"}
                >
                  {checkoutLoading === "price_1SK8fTCii5zXCZr6ZQqQMjSs" ? "Loading..." : "Get Started"}
                </Button>
              </CardContent>
            </Card>

            {/* Lite Tier */}
            <Card className="relative border-2 hover:border-purple-500 transition-all">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle>Lite</CardTitle>
                  <Badge className="bg-purple-500">Monthly</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">$97</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>
                    After free month
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">2 workshops per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Full Academy portal access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">All workshop recordings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">WhatsApp community</span>
                  </li>
                </ul>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => handleCheckout("price_1SK8fTCii5zXCZr6ZQqQMjSs")}
                  disabled={checkoutLoading === "price_1SK8fTCii5zXCZr6ZQqQMjSs"}
                >
                  {checkoutLoading === "price_1SK8fTCii5zXCZr6ZQqQMjSs" ? "Loading..." : "Start with Workshop"}
                </Button>
              </CardContent>
            </Card>

            {/* Pro Tier */}
            <Card className="relative border-2 border-blue-500 shadow-lg scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Badge className="bg-blue-500">MOST POPULAR</Badge>
              </div>
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle>Pro</CardTitle>
                  <Badge className="bg-blue-500">Monthly</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">$300</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>
                    After free month
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">All workshops (unlimited)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">15min strategy calls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Full Academy portal access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Priority support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleCheckout("price_1SK8g0Cii5zXCZr60hKTLXe4")}
                  disabled={checkoutLoading === "price_1SK8g0Cii5zXCZr60hKTLXe4"}
                >
                  {checkoutLoading === "price_1SK8g0Cii5zXCZr60hKTLXe4" ? "Loading..." : "Start with Workshop"}
                </Button>
              </CardContent>
            </Card>

            {/* Elite Tier */}
            <Card className="relative border-2 hover:border-orange-500 transition-all opacity-90">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle>Elite</CardTitle>
                  <Badge variant="secondary">Coming Soon</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">$500</span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>
                    Request via audit booking
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">All workshops + private sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">1hr strategy sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Custom team handbooks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm">Dedicated support</span>
                  </li>
                </ul>
                <Button 
                  className="w-full"
                  variant="outline"
                  onClick={() => window.open(BOOKING_URL, '_blank')}
                >
                  Book Audit to Request
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              💡 Start with any workshop ($77) and get 1 month FREE Academy access. 
              Upgrade anytime to continue after your free month.
            </p>
          </div>
        </div>
      </section>

      {/* What's Included in Academy */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4">ACADEMY PORTAL</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Create & Manage Content
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your 1-month free Academy access includes all these powerful AI tools
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {/* Featured Screenshots */}
            <Card className="md:col-span-2 lg:col-span-3 border-2 border-purple-500 overflow-hidden">
              <div className="grid md:grid-cols-3 gap-4 p-6">
                <div className="space-y-2">
                  <img src="/video-generator.webp" alt="Sora 2 Video Generator" className="rounded-lg shadow-lg" loading="lazy" />
                  <p className="text-sm font-semibold text-center">Sora 2 Video Generator</p>
                </div>
                <div className="space-y-2">
                  <img src="/ai-twins.webp" alt="AI Twins" className="rounded-lg shadow-lg" loading="lazy" />
                  <p className="text-sm font-semibold text-center">AI Twins</p>
                </div>
                <div className="space-y-2">
                  <img src="/video-editing.webp" alt="Video Editing" className="rounded-lg shadow-lg" loading="lazy" />
                  <p className="text-sm font-semibold text-center">Video Editing</p>
                </div>
              </div>
            </Card>
            <Card className="border-2 hover:border-purple-500 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle>Sora 2 Video Generator</CardTitle>
                <CardDescription>
                  Generate AI videos with Sora 2 and post to social
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle>Post Generator</CardTitle>
                <CardDescription>
                  Generate single or multiple posts using AI
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle>Blog Generator</CardTitle>
                <CardDescription>
                  Generate SEO-optimized blog posts for WordPress
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle>Content Calendar</CardTitle>
                <CardDescription>
                  View and manage your scheduled content
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <CardTitle>Brand Authority</CardTitle>
                <CardDescription>
                  Manage your brand authority sets and images
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle>AI Settings</CardTitle>
                <CardDescription>
                  Customize your AI's voice and style
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <CardTitle>AI Twins</CardTitle>
                <CardDescription>
                  Create AI versions of yourself for content
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle>Video Editing</CardTitle>
                <CardDescription>
                  AI-powered video editing and enhancement
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-purple-500 transition-all">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <CardTitle>Monthly Webinars</CardTitle>
                <CardDescription>
                  Live training sessions and Q&A
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <img 
              src="/academy-dashboard.png" 
              alt="Academy Dashboard" 
              className="rounded-xl shadow-2xl border-4 border-white/50 mx-auto max-w-4xl"
            />
          </div>
        </div>
      </section>

      {/* Workshop Modules */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Workshop Modules
            </h2>
            <p className="text-xl text-muted-foreground">
              Master AI-powered social media in 4 focused modules
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <CardTitle>Foundation Setup</CardTitle>
                </div>
                <CardDescription>
                  Set up your AI content engine with the right tools and workflows
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <CardTitle>Content Workflows</CardTitle>
                </div>
                <CardDescription>
                  Build repeatable systems for video, posts, and blog content
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <CardTitle>Automation & Scaling</CardTitle>
                </div>
                <CardDescription>
                  Automate posting, scheduling, and content distribution
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <CardTitle>Advanced Tactics</CardTitle>
                </div>
                <CardDescription>
                  AI twins, brand authority, and custom AI agent creation
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-bold">Sign Up & Join</h3>
              <p className="text-muted-foreground">
                Purchase workshop access and get instant 1-month free Academy membership
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-bold">Attend & Learn</h3>
              <p className="text-muted-foreground">
                Join live workshop, access portal tools, and implement what you learn
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-bold">Scale & Grow</h3>
              <p className="text-muted-foreground">
                Upgrade to monthly membership for ongoing workshops and support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Queensland Businesses
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "Huxley's workshop saved us $2,400/month on social media management. 
                  The AI tools are game-changing."
                </CardDescription>
                <p className="font-semibold mt-4">— Sarah M., Retail Business Owner</p>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "Finally, a workshop that's practical and actionable. We implemented 
                  everything within a week."
                </CardDescription>
                <p className="font-semibold mt-4">— James T., Marketing Director</p>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-base">
                  "The Academy portal alone is worth 10x the price. We're creating 
                  content faster than ever."
                </CardDescription>
                <p className="font-semibold mt-4">— Lisa K., Agency Owner</p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-purple-500 to-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join 200+ Queensland businesses who've already automated their content creation
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-white/90"
              onClick={() => handleCheckout("price_1SK8fTCii5zXCZr6ZQqQMjSs")}
              disabled={checkoutLoading === "price_1SK8fTCii5zXCZr6ZQqQMjSs"}
            >
              {checkoutLoading === "price_1SK8fTCii5zXCZr6ZQqQMjSs" ? "Loading..." : "Get Workshop Access $77"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10"
              onClick={() => window.open(BOOKING_URL, '_blank')}
            >
              Book Free Audit
            </Button>
          </div>
          <p className="mt-6 text-sm opacity-75">
            Use code FRIENDS20 for 20% off • 1 month free Academy access included
          </p>
        </div>
      </section>
    </div>
  );
}
