import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, Video, Calendar, Sparkles, 
  Users, Clock, Zap, Star, ArrowRight, Target, MessageCircle, Loader2, BookOpen
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl, BOOKING_URL } from "@/const";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { WorkshopCountdown } from "@/components/WorkshopCountdown";
import { SEO, workshopStructuredData } from "@/components/SEO";
import { Header } from "@/components/Header";
import MobileNav from "@/components/MobileNav";

export default function Workshop() {
  const { user, isAuthenticated } = useAuth();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const createSession = trpc.checkout.createSession.useMutation();
  
  // Fetch next upcoming workshop dynamically
  const { data: nextWorkshop, isLoading: workshopLoading } = trpc.academy.getNextWorkshop.useQuery();

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

  const formatWorkshopDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Australia/Brisbane",
    });
  };

  if (workshopLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <MobileNav />
      <Header />
      <SEO 
        title={nextWorkshop ? `${nextWorkshop.title} - Tech Horizon Academy` : "AI Workshops - Tech Horizon Academy"}
        description={nextWorkshop?.description || "Join our weekly drop-in AI workshops. Get live support, troubleshoot bottlenecks, and accelerate your AI implementation."}
        keywords="AI workshop, automation training, Gemini API, Manus automation, content studio, AI coding, tech training"
        structuredData={workshopStructuredData}
      />
      
      {/* Hero Section - Clear Value Proposition */}
      <section id="workshop-top" className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-purple-600 to-blue-600 text-white">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-transparent to-orange-500/30 animate-pulse" style={{animationDuration: '8s'}} />
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-300/10 rounded-full blur-3xl" />
        
        <div className="container relative py-12 sm:py-20 md:py-32">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-xs sm:text-sm">
                  WEEKLY DROP-IN SESSIONS
                </Badge>
                <Badge className="bg-orange-400/30 text-white border-orange-300/30 hover:bg-orange-400/40 text-xs sm:text-sm">
                  LIVE SUPPORT
                </Badge>
              </div>
              
              {nextWorkshop ? (
                <>
                  {/* Countdown Timer */}
                  <WorkshopCountdown targetDate={new Date(nextWorkshop.scheduledAt)} className="text-white" />
                  <p className="text-xs sm:text-sm text-white/90 -mt-4">
                    {formatWorkshopDate(nextWorkshop.scheduledAt)} Brisbane Time
                  </p>
                  
                  <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                      {nextWorkshop.title}
                    </h1>
                    
                    <p className="text-lg sm:text-xl text-white/95">
                      {nextWorkshop.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-white/90">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {nextWorkshop.durationMinutes} minutes
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {nextWorkshop.sessionType === "pro" ? "Pro Members" : "Lite+ Members"}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Stop Drowning in Admin Drag
                  </h1>
                  <p className="text-lg sm:text-xl text-white/95">
                    Weekly drop-in sessions where we look at your workflow before installing robots. No fluff—just practical automation that works.
                  </p>
                  <p className="text-base text-white/90">
                    Built for SEQ businesses competing with Brisbane and Sydney.
                  </p>
                </div>
              )}
              
              {/* Simple CTA Flow */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button 
                    size="lg" 
                    className="bg-white text-purple-600 hover:bg-white/90 w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
                    onClick={() => window.location.href = isAuthenticated ? "/workshops" : getLoginUrl("/workshops")}
                  >
                    {nextWorkshop ? "Book This Workshop" : "View Workshop Calendar"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="bg-white/10 text-white border-white/30 hover:bg-white/20 w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
                    onClick={() => window.location.href = "/pricing"}
                  >
                    Join The Academy
                  </Button>
                </div>
                <p className="text-sm text-white/80 text-center sm:text-left">
                  💡 Academy members get unlimited access to all workshops
                </p>
              </div>
            </div>

            {/* Right Column - Workshop Benefits */}
            <div className="space-y-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-white">What You Get</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-400/20 p-2 rounded-lg">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Live Q&A Support</p>
                      <p className="text-sm text-white/80">Get your questions answered in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-400/20 p-2 rounded-lg">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Troubleshoot Bottlenecks</p>
                      <p className="text-sm text-white/80">Work through implementation challenges together</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-400/20 p-2 rounded-lg">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Hands-On Guidance</p>
                      <p className="text-sm text-white/80">Build and deploy real AI solutions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-400/20 p-2 rounded-lg">
                      <Video className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Recording Access</p>
                      <p className="text-sm text-white/80">Can't make it live? Watch the replay</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-400/20 to-purple-400/20 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-white/80 mb-2">Included with Academy Membership</p>
                    <div className="flex items-center justify-center gap-4">
                      <div>
                        <p className="text-lg font-semibold">Lite</p>
                        <p className="text-2xl font-bold">$300/mo</p>
                      </div>
                      <div className="h-12 w-px bg-white/30" />
                      <div>
                        <p className="text-lg font-semibold">Pro</p>
                        <p className="text-2xl font-bold">$500/mo</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4">HOW IT WORKS</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Weekly Drop-In Format
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No rigid curriculum. No prerequisites. Just show up, ask questions, and get the support you need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <div className="bg-gradient-to-br from-orange-500 to-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <CardTitle>1. Check the Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Browse upcoming workshop sessions in your member portal. Each week covers different topics based on member needs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle>2. Join Live</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Drop in to any session that fits your schedule. Bring your questions, challenges, or just listen and learn.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="bg-gradient-to-br from-blue-500 to-teal-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle>3. Implement & Repeat</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Apply what you learn, then come back next week for follow-up support. Continuous progress, not one-time training.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Who This Is For Section */}
      <section className="container py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4">WHO THIS IS FOR</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Perfect For Business Leaders Who...
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Want to implement AI but don't know where to start</p>
                    <p className="text-sm text-muted-foreground">Get clarity on the right tools and strategies for your business</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Are stuck on a specific implementation challenge</p>
                    <p className="text-sm text-muted-foreground">Troubleshoot bottlenecks with expert guidance</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Need accountability and ongoing support</p>
                    <p className="text-sm text-muted-foreground">Weekly check-ins keep you on track and progressing</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium mb-1">Want to learn from other business owners</p>
                    <p className="text-sm text-muted-foreground">Share insights and solutions with peers facing similar challenges</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simple Pricing Comparison */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4">SIMPLE PRICING</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your Path
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join the academy for unlimited workshop access, or book individual sessions as needed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Single Workshop */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle>Single Workshop</CardTitle>
              <CardDescription>One-time payment</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$77</span>
                <span className="text-muted-foreground"> one-time</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">1 workshop credit • Pay once, use anytime</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">1 workshop credit</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Recording access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Live Q&A support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">No recurring charges</span>
                </li>
              </ul>
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => window.location.href = isAuthenticated ? "/workshops" : getLoginUrl("/workshops")}
              >
                Book Workshop
              </Button>
            </CardContent>
          </Card>

          {/* Starter Membership - NEW */}
          <Card className="border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-blue-500">SAFE BET</Badge>
            </div>
            <CardHeader>
              <CardTitle>Starter Membership</CardTitle>
              <CardDescription>Monthly subscription</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$97</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">2 workshop credits per month • Cancel anytime</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm"><strong>2 workshop credits/month</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Full platform access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Tools & prompts database</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Knowledge base access</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={() => window.location.href = "/pricing"}
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Lite Membership */}
          <Card className="border-2 border-orange-500 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <Badge className="bg-orange-500">UNLIMITED</Badge>
            </div>
            <CardHeader>
              <CardTitle>Lite Membership</CardTitle>
              <CardDescription>All workshops included</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">$300</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Unlimited workshop access • No credit limits</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">All workshops included</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">1,620+ tools database</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">118+ prompts library</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Knowledge base access</span>
                </li>
              </ul>
              <Button 
                className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700"
                onClick={() => window.location.href = "/pricing"}
              >
                Join Lite
              </Button>
            </CardContent>
          </Card>


        </div>
      </section>

      {/* Final CTA */}
      <section className="container py-16">
        <Card className="bg-gradient-to-br from-orange-500 via-purple-600 to-blue-600 text-white border-0">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join the next workshop or become an academy member for unlimited access to all sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90"
                onClick={() => window.location.href = isAuthenticated ? "/workshops" : getLoginUrl("/workshops")}
              >
                View Workshop Calendar
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                onClick={() => window.location.href = "/pricing"}
              >
                Explore Membership Plans
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
