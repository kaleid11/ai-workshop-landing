import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { OnboardingWelcome } from "@/components/OnboardingWelcome";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Calendar, ExternalLink, Loader2, Mail, MessageCircle, ShoppingCart, Sparkles, Users, Video, TrendingUp, Code2, Target, BookOpen, Wrench, Zap, Gift, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Link } from "wouter";

export default function Portal() {
  const { user, loading, isAuthenticated } = useAuth();
  const accessCheck = trpc.portal.checkAccess.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  // Get user's membership tier and token balance
  const { data: userTier } = trpc.membership.getUserTier.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const { data: tokenBalance } = trpc.workshops.getTokenBalance.useQuery(undefined, {
    enabled: !!(isAuthenticated && userTier?.slug && userTier.slug !== 'access_pass'),
  });

  // Mutation for buying workshop credits
  const buyCredits = trpc.checkout.createSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url;
      }
    },
    onError: () => {
      toast.error('Failed to start checkout');
    },
  });

  // Generate calendar event URLs for different formats
  const workshopDetails = {
    title: "Social Media Automation Workshop",
    description: "Learn to automate your social media content with AI tools. Workshop includes hands-on training with Gemini, ViralWave, and Captions.ai. Meeting link will be sent 24 hours before the workshop.",
    location: "Online (Google Meet link to be provided)",
    startDate: "20251126T090000", // Nov 26, 2025, 9:00 AM Brisbane
    endDate: "20251126T110000",   // Nov 26, 2025, 11:00 AM Brisbane
    timezone: "Australia/Brisbane",
  };

  const generateGoogleCalendarUrl = () => {
    const { title, description, location, startDate, endDate, timezone } = workshopDetails;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&dates=${startDate}/${endDate}&ctz=${timezone}`;
  };

  const generateOutlookCalendarUrl = () => {
    const { title, description, location, startDate, endDate } = workshopDetails;
    // Convert to ISO format for Outlook
    const start = `2025-11-26T09:00:00+10:00`;
    const end = `2025-11-26T11:00:00+10:00`;
    return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(description)}&location=${encodeURIComponent(location)}&startdt=${start}&enddt=${end}`;
  };

  const generateICalFile = () => {
    const { title, description, location, startDate, endDate } = workshopDetails;
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${startDate}Z`,
      `DTEND:${endDate}Z`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'workshop.ics';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-purple mx-auto mb-4" />
          <p className="text-gray-600">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] via-[rgb(var(--brand-blue))] to-[rgb(var(--brand-dark-purple))] text-white">
        <div className="container max-w-md text-center space-y-6 p-8">
          <img src={APP_LOGO} alt="Workshop Logo" className="w-24 h-24 mx-auto" />
          <h1 className="text-3xl font-bold">Member Portal Access</h1>
          <p className="text-white/80">
            Please sign in to access your workshop materials, community links, and resources.
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full">
              Sign In to Continue
            </Button>
          </a>
          <Link href="/">
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Check if user has purchased workshop access
  if (accessCheck.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-purple mx-auto mb-4" />
          <p className="text-gray-600">Checking access...</p>
        </div>
      </div>
    );
  }

  if (!accessCheck.data?.hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="container max-w-md text-center space-y-6 p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-3xl font-bold text-gray-900">Workshop Access Required</h1>
          <p className="text-gray-600">
            You need to purchase the workshop to access this portal.
          </p>
          <Link href="/pricing">
            <Button size="lg" className="bg-brand-purple hover:bg-brand-purple/90 text-white w-full">
              View Workshop Details
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <OnboardingWelcome />
      {/* Header */}
      <header className="bg-gradient-to-r from-[rgb(var(--brand-dark-purple))] to-[rgb(var(--brand-blue))] text-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={APP_LOGO} alt="Workshop Logo" className="w-16 h-16" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{APP_TITLE}</h1>
                <p className="text-white/80">Member Portal</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="py-12">
        <div className="container max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-brand-purple mb-4">
              Welcome, {user?.name || "Workshop Member"}! 👋
            </h2>
            
            {/* Tier-based welcome message */}
            {userTier?.slug === 'access_pass' ? (
              <div className="space-y-4">
                <p className="text-gray-700 text-lg">
                  You have access to all resources, guides, and tools. Explore the knowledge base, tools database, and prompts library below.
                </p>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-purple-900 mb-2">🎓 Want Access to Monthly Workshops?</h3>
                  <p className="text-gray-700 mb-4">
                    Upgrade to <strong>Starter ($97/month)</strong> or higher to attend live workshops, access recordings, and get monthly workshop tokens.
                  </p>
                  <Link href="/pricing">
                    <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Membership Tiers
                    </Button>
                  </Link>
                </div>
              </div>
            ) : userTier?.slug ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-700 text-lg mb-2">
                      You're on the <strong className="text-brand-purple">{userTier.name}</strong> plan.
                    </p>
                    {tokenBalance && (
                      <p className="text-gray-600">
                        Workshop Tokens: <strong className="text-brand-orange">{tokenBalance.tokensRemaining} remaining</strong> this month
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        buyCredits.mutate({
                          priceId: 'price_1SWqfaCii5zXCZr60lffDWXy'
                        });
                      }}
                      disabled={buyCredits.isPending}
                      variant="outline"
                      className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
                    >
                      {buyCredits.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <ShoppingCart className="w-4 h-4 mr-2" />
                      )}
                      Buy More Credits
                    </Button>
                    <Link href="/workshops">
                      <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white">
                        <Calendar className="w-4 h-4 mr-2" />
                        View Workshops
                      </Button>
                    </Link>
                  </div>
                </div>
                <p className="text-gray-700">
                  Access live workshops, recordings, and exclusive resources. Use your tokens to request access to upcoming sessions.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-700 text-lg mb-4">
                  You're all set for the Social Media Automation Workshop on <strong>Wednesday, Nov 26 at 9-11am Brisbane</strong>.
                </p>
                <div className="flex gap-4">
                  <Link href="/workshops">
                    <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                      <Calendar className="w-5 h-5 mr-2" />
                      View Workshop Calendar
                    </Button>
                  </Link>
                  <a href="https://chat.whatsapp.com/FFzITkJIkkK7ZELGNQKDLl" target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Join WhatsApp Group
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Quick Start Onboarding */}
          <Card className="mb-8 border-2 border-brand-purple">
            <CardHeader className="bg-gradient-to-r from-brand-purple/10 to-brand-blue/10">
              <CardTitle className="text-2xl text-brand-purple flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Quick Start (4 Steps)
              </CardTitle>
              <CardDescription className="text-base">Complete these before the workshop to maximize your results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-brand-orange text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2">Setup Manus Account</h4>
                  <p className="text-sm text-gray-600 mb-3">Create your Manus account to access AI automation tools and build custom workflows</p>
                  <div className="flex gap-2">
                    <a href="https://manus.im" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white">
                        Get Started with Manus
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                    <Link href="/wiki?guide=manus-mastery">
                      <Button variant="outline" className="border-purple-300 text-purple-700">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Guide
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-brand-orange text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2">Setup Google Workspace</h4>
                  <p className="text-sm text-gray-600 mb-3">Get 10% off your first year with our referral link - includes Gmail, Drive, Docs, Sheets, and more</p>
                  <div className="flex gap-2">
                    <a href="https://referworkspace.app.goo.gl/s6pi" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white">
                        Get Google Workspace (10% Off)
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                    <Link href="/wiki?guide=google-workspace-mastery">
                      <Button variant="outline" className="border-purple-300 text-purple-700">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Guide
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-brand-orange text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2">Setup ChatGPT or Claude</h4>
                  <p className="text-sm text-gray-600 mb-3">Choose your preferred AI assistant - ChatGPT Plus or Claude Pro for advanced capabilities</p>
                  <div className="flex gap-2">
                    <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-brand-purple hover:bg-brand-purple/90 text-white">
                        Get ChatGPT Plus
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                    <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">
                        Get Claude Pro
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                    <Link href="/wiki?guide=chatgpt-claude-mastery">
                      <Button variant="outline" className="border-purple-300 text-purple-700">
                        <BookOpen className="w-4 h-4 mr-2" />
                        View Guide
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="bg-brand-orange text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-2">Join WhatsApp Community</h4>
                  <p className="text-sm text-gray-600 mb-3">Get workshop updates, ask questions, and connect with other members</p>
                  <a href="https://chat.whatsapp.com/FFzITkJIkkK7ZELGNQKDLl" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Join WhatsApp Group
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Free Resources Section */}
          <Card className="mb-8 border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900 flex items-center gap-2">
                <Gift className="w-6 h-6" />
                Free Resources & Tools
              </CardTitle>
              <CardDescription className="text-base">
                Access our free Tool Stack Assessment, ROI Calculator, and downloadable guides. Share with your team!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white rounded-lg shadow border border-blue-200">
                <h4 className="font-bold text-gray-900 mb-2">🎁 Free Assessment Tools</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Evaluate your AI readiness, audit your tool stack, and get personalized recommendations. No login required!
                </p>
                <div className="flex gap-3">
                  <Link href="/resources">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                      Access Free Tools
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.origin + "/resources");
                      toast.success("Link copied! Share with your team.");
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Link
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Free GEMs Section */}
          <Card className="mb-8 border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-900 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Your Free AI Assistants (GEMs)
              </CardTitle>
              <CardDescription className="text-base">
                Custom AI assistants to help you create content, generate leads, and engineer prompts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg shadow border border-purple-200">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-bold text-gray-900 mb-2">Brand Alignment GEM</h4>
                  <p className="text-sm text-gray-600 mb-3">Define your brand voice, audience, and content strategy</p>
                  <a href="https://gemini.google.com/gem/1mozSqiMQasw2mb-pokjK996ZSJKxyCLa?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                      Open GEM
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>

                <div className="p-4 bg-white rounded-lg shadow border border-purple-200">
                  <div className="text-3xl mb-2">⚡</div>
                  <h4 className="font-bold text-gray-900 mb-2">Prompt Engineer (Gemini)</h4>
                  <p className="text-sm text-gray-600 mb-3">Create powerful prompts for Gemini AI</p>
                  <a href="https://gemini.google.com/gem/19p5PyfQzYlVNwTZykMUhr2xX7l1-9wjw?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                      Open GEM
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>

                <div className="p-4 bg-white rounded-lg shadow border border-purple-200">
                  <div className="text-3xl mb-2">🤖</div>
                  <h4 className="font-bold text-gray-900 mb-2">Prompt Engineer (ChatGPT)</h4>
                  <p className="text-sm text-gray-600 mb-3">Atlas - Create powerful prompts for ChatGPT</p>
                  <a href="https://chatgpt.com/g/g-68e45c22996c8191ac1a48482ee988ff-atlas-the-prompt-engineer" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                      Open GPT
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>

                <div className="p-4 bg-white rounded-lg shadow border border-purple-200">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-bold text-gray-900 mb-2">Lead Gen GPT</h4>
                  <p className="text-sm text-gray-600 mb-3">Generate B2B leads and outreach campaigns</p>
                  <a href="https://chatgpt.com/g/g-68f4618407a08191898be9e84f044326-lead-gen-gpt" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                      Open GPT
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>

                <div className="p-4 bg-white rounded-lg shadow border border-purple-200">
                  <div className="text-3xl mb-2">🚀</div>
                  <h4 className="font-bold text-gray-900 mb-2">HuxleyGPT</h4>
                  <p className="text-sm text-gray-600 mb-3">Your personal AI business consultant and strategist</p>
                  <a href="https://chatgpt.com/g/g-691673823e548191bee75149c19c021f-huxleygpt" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full border-purple-300 text-purple-700 hover:bg-purple-50">
                      Open GPT
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dashboard Navigation */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Explore More Resources</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 border-purple-200 hover:border-purple-400" onClick={() => window.location.href = '/wiki'}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="w-8 h-8 text-purple-500" />
                    <CardTitle className="text-xl">Knowledge Base</CardTitle>
                  </div>
                  <CardDescription>
                    Comprehensive guides on Gemini, ViralWave, Captions.ai, and more
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Browse Guides
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 border-orange-200 hover:border-orange-400" onClick={() => window.location.href = '/tools-database'}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Wrench className="w-8 h-8 text-orange-500" />
                    <CardTitle className="text-xl">Tools Database</CardTitle>
                  </div>
                  <CardDescription>
                    Curated AI tools with exclusive discounts and referral links
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                    Explore Tools
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow cursor-pointer border-2 border-blue-200 hover:border-blue-400" onClick={() => window.location.href = '/prompts'}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <MessageCircle className="w-8 h-8 text-blue-500" />
                    <CardTitle className="text-xl">Prompts Library</CardTitle>
                  </div>
                  <CardDescription>
                    374+ ready-to-use prompts for business, marketing, and more
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Browse Prompts
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Community & Support */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-green-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-8 h-8 text-green-600" />
                  <CardTitle className="text-xl">Community Hub</CardTitle>
                </div>
                <CardDescription>
                  Connect with other members, share wins, and get support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <a href="https://chat.whatsapp.com/FFzITkJIkkK7ZELGNQKDLl" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Group
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
                <a href="https://linktr.ee/huxleyp" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                    <Users className="w-4 h-4 mr-2" />
                    Facebook Community
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-8 h-8 text-blue-600" />
                  <CardTitle className="text-xl">Need Help?</CardTitle>
                </div>
                <CardDescription>
                  Have questions? We're here to help you succeed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a href="mailto:info@thzn.world">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Google Workspace Referral */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-300">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🚀</span>
                Google Workspace Discount
              </h3>
              <p className="text-blue-800 mb-4">
                Get 10% off your first year of Google Workspace when you sign up using my referral link. This discount applies to all plans and helps support my work.
              </p>
              <a href="https://referworkspace.app.goo.gl/s6pi" target="_blank" rel="noopener noreferrer">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get 10% Off Google Workspace
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgb(var(--brand-dark-purple))] text-white/80 py-8 mt-12">
        <div className="container text-center">
          <p className="text-sm">
            Questions? Email:{" "}
            <a href="mailto:info@thzn.world" className="hover:text-white underline">
              info@thzn.world
            </a>
          </p>
          <p className="text-sm mt-2">© 2024 {APP_TITLE}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
