import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, Video, FileText, BookOpen, Calendar, Sparkles, 
  Users, Clock, Zap, Star, ArrowRight, Shield, Target, MessageCircle, ChevronDown, Loader2
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl, BOOKING_URL } from "@/const";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { WorkshopCountdown } from "@/components/WorkshopCountdown";
import { SEO, workshopStructuredData } from "@/components/SEO";
import { Header } from "@/components/Header";

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
      <Header />
      <SEO 
        title={nextWorkshop ? `${nextWorkshop.title} - Tech Horizon Academy` : "AI Workshops - Tech Horizon Academy"}
        description={nextWorkshop?.description || "Join our live AI workshops and learn to automate your business with cutting-edge tools and strategies."}
        keywords="AI workshop, automation training, Gemini API, Manus automation, content studio, AI coding, tech training"
        structuredData={workshopStructuredData}
      />
      
      {/* Hero Section - Dynamic Workshop Countdown */}
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
                  PHASE 2: ADVANCED SESSIONS
                </Badge>
                <Badge className="bg-orange-400/30 text-white border-orange-300/30 hover:bg-orange-400/40 text-xs sm:text-sm">
                  LIVE WORKSHOP
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
                      {nextWorkshop.sessionType === "pro" ? "Pro Members Only" : "Lite+ Members"}
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Phase 2: Advanced AI Workshops
                  </h1>
                  <p className="text-lg sm:text-xl text-white/95">
                    New workshops coming soon! Check back for upcoming sessions on Gemini API, Manus automation, and advanced AI strategies.
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-white/90 w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
                  onClick={() => window.location.href = isAuthenticated ? "/workshops" : getLoginUrl("/workshops")}
                >
                  {nextWorkshop ? "Book Your Spot" : "View All Workshops"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20 w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6"
                  onClick={() => window.location.href = "/pricing"}
                >
                  View Membership Plans
                </Button>
              </div>
            </div>

            {/* Right Column - Stats/Benefits */}
            <div className="space-y-4">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader>
                  <CardTitle className="text-white">What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-400/20 p-2 rounded-lg">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Hands-On Coding</p>
                      <p className="text-sm text-white/80">Build real automation workflows together</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-400/20 p-2 rounded-lg">
                      <Zap className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">AI Integration</p>
                      <p className="text-sm text-white/80">Master Gemini API and Manus tools</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-400/20 p-2 rounded-lg">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Production Ready</p>
                      <p className="text-sm text-white/80">Deploy your content studio by end of session</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-400/20 to-purple-400/20 backdrop-blur-sm border-white/20 text-white">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/80">Included with</p>
                      <p className="text-2xl font-bold">Lite+ Membership</p>
                    </div>
                    <Badge className="bg-white text-purple-600 text-lg px-4 py-2">
                      $300/mo
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 2 Progression Section */}
      <section className="container py-16">
        <div className="text-center mb-12">
          <Badge className="mb-4">YOUR LEARNING JOURNEY</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            From Fundamentals to Mastery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Phase 1 taught you the foundations. Phase 2 takes you to the next level with advanced automation and AI integration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">PHASE 1</Badge>
                <Check className="h-5 w-5 text-green-500" />
              </div>
              <CardTitle>Foundation Skills</CardTitle>
              <CardDescription>You've learned the basics</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">AI tool selection and evaluation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Prompt engineering fundamentals</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Content creation workflows</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Social media automation basics</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-500 bg-gradient-to-br from-orange-50 to-purple-50 dark:from-orange-950/20 dark:to-purple-950/20">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className="bg-orange-500">PHASE 2</Badge>
                <Sparkles className="h-5 w-5 text-orange-500" />
              </div>
              <CardTitle>Advanced Mastery</CardTitle>
              <CardDescription>Build production systems</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Custom API integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Automated content studios</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Multi-platform deployment</span>
                </li>
                <li className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium">Scalable automation workflows</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Past Workshop Recordings Section */}
      {nextWorkshop?.recordingUrl && nextWorkshop.status === 'completed' && (
        <section className="container py-16">
          <div className="text-center mb-12">
            <Badge className="mb-4">WORKSHOP RECORDING</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Watch the Full Session
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Couldn't make it live? Watch the recording and follow along at your own pace.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
                  <iframe 
                    src={nextWorkshop.recordingUrl}
                    width="100%" 
                    height="100%" 
                    allow="autoplay"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{nextWorkshop.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {formatWorkshopDate(nextWorkshop.scheduledAt)}
                    </p>
                  </div>
                  <Badge variant="outline">Lite+ Members</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container py-16">
        <Card className="bg-gradient-to-br from-orange-500 to-purple-600 text-white border-0">
          <CardContent className="py-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Level Up?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join Lite+ membership to access all Phase 2 workshops, recordings, and advanced resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-white/90"
                onClick={() => window.location.href = "/pricing"}
              >
                View Membership Plans
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                onClick={() => window.location.href = "/workshops"}
              >
                Browse All Workshops
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
