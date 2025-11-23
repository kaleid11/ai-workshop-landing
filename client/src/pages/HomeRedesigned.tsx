import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_LOGO } from "@/const";
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Shield, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Building2,
  GraduationCap,
  Rocket,
  Target,
  Award,
  BarChart3,
  X,
  Check,
  ExternalLink,
  MessageSquare,
  Mic,
  Video,
  Code,
  Presentation,
  Wand2,
  Star,
  Play
} from "lucide-react";
import { Link } from "wouter";

const BOOKING_URL = "https://app.klipy.ai/book/pre-discovery/free-pre-discovery";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner */}
      <div className="bg-brand-orange text-white relative z-10">
        <div className="container flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs md:text-sm font-semibold line-clamp-1">
              🎁 Book Free 15-Min AI Audit • Next Workshop: Nov 26 • Academy Now Open
            </span>
            <Sparkles className="w-4 h-4 flex-shrink-0" />
          </div>
          <Link href="/portal" className="flex-shrink-0 ml-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hover:text-white text-xs md:text-sm px-3 md:px-4 py-1 h-auto">
              Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section - Redesigned with Clearer Messaging */}
      <section className="relative bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] via-[rgb(var(--brand-blue))] to-[rgb(var(--brand-dark-purple))] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container relative py-20 md:py-32">
          <div className="flex flex-col items-center text-center space-y-10 max-w-5xl mx-auto">
            <img src={APP_LOGO} alt="Tech Horizon Labs" className="w-20 h-20 md:w-24 md:h-24" />
            
            {/* Clear Value Proposition */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                AI Implementation for<br />Queensland SMBs
              </h1>
              <div className="text-2xl md:text-3xl font-semibold text-brand-orange">
                Without the Complexity, Cost, or Risk
              </div>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                200+ businesses saved <span className="font-bold text-brand-orange">$15K/year</span> in 4 weeks.<br />
                No coding required. <span className="font-bold">3-month ROI guarantee.</span>
              </p>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-10 py-7 h-auto shadow-2xl">
                  Book Free 15-Min AI Audit <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-brand-purple text-lg px-10 py-7 h-auto">
                <Play className="w-5 h-5 mr-2" /> See How It Works
              </Button>
            </div>

            {/* Trust Bar */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-8 border-t border-white/20">
              <div className="flex items-center gap-2 text-white/90">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-brand-orange text-brand-orange" />
                  ))}
                </div>
                <span className="font-semibold">4.9/5 from 87 reviews</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Users className="w-5 h-5" />
                <span>200+ businesses transformed</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Award className="w-5 h-5" />
                <span>Featured at Noosa Chamber</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats Grid */}
      <section className="py-16 bg-white border-b">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-purple mb-2">200+</div>
              <div className="text-gray-600">Businesses Transformed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-orange mb-2">$180K</div>
              <div className="text-gray-600">Avg. Annual Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-brand-blue mb-2">4 Weeks</div>
              <div className="text-gray-600">To First Results</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Are You Losing <span className="text-red-600">$50K/Year</span> to These 4 Problems?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The average Queensland SMB wastes 20+ hours per week on tasks that could be automated
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-red-100">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-2xl">Manual Admin</CardTitle>
                <CardDescription className="text-base">
                  20+ hours/week on data entry, scheduling, email management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600 mb-2">$25K/year</div>
                <p className="text-sm text-gray-600">Cost of manual processes</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-100">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-2xl">Tool Overwhelm</CardTitle>
                <CardDescription className="text-base">
                  Paying for 15+ tools you barely use, no integration, constant switching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600 mb-2">$15K/year</div>
                <p className="text-sm text-gray-600">Wasted on redundant tools</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-100">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-2xl">Lost Opportunities</CardTitle>
                <CardDescription className="text-base">
                  Missing leads, slow follow-ups, inconsistent customer experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600 mb-2">$8K/year</div>
                <p className="text-sm text-gray-600">Revenue left on table</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-100">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">Security Concerns</CardTitle>
                <CardDescription className="text-base">
                  Personal AI accounts, no governance, compliance risks, data leaks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600 mb-2">$56K</div>
                <p className="text-sm text-gray-600">Avg. breach cost (Australian SMBs)</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-gray-900 mb-4">
              Total Annual Cost: <span className="text-red-600">$50K+ per year</span>
            </p>
            <p className="text-lg text-gray-600">
              Here's how we fix it in 4 weeks...
            </p>
          </div>
        </div>
      </section>

      {/* Meet Huxley Section - NEW */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-5xl">
          <div className="text-center mb-12">
            <Badge className="bg-brand-purple text-white text-base px-4 py-2 mb-4">Meet Your AI Implementation Partner</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Hi, I'm Huxley
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Photo Placeholder */}
            <div className="order-2 md:order-1">
              <div className="aspect-square bg-gradient-to-br from-brand-purple to-brand-blue rounded-2xl flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <Users className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-lg opacity-75">Professional headshot goes here</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="order-1 md:order-2 space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                I've spent <span className="font-bold text-brand-purple">18 months</span> building the AI implementation system that big consultancies charge $150K for—and distilled it into a <span className="font-bold">4-week process</span> any Queensland SMB can afford.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-purple flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">200+ Businesses Coached</div>
                    <div className="text-gray-600">Crypto startups, fire safety consultancies, marketing agencies, e-commerce businesses</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-purple flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Featured Speaker</div>
                    <div className="text-gray-600">Noosa Chamber of Commerce • Queensland Business Community</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-purple flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Security-First Approach</div>
                    <div className="text-gray-600">ASD Essential Eight compliance • 98% attack prevention rate</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-purple flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-900">Proven ROI</div>
                    <div className="text-gray-600">$180K average annual savings • 3-month payback period</div>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-brand-purple hover:bg-brand-purple/90 text-white">
                    Book a Call with Huxley <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - 3-Step Process */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-gray-50 to-white">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple 3-step process to transform your business with AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 border-brand-orange/20 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-brand-orange text-white rounded-full flex items-center justify-center text-2xl font-bold">
                1
              </div>
              <CardHeader className="pt-12">
                <CardTitle className="text-2xl text-center">Free 15-Min AI Audit</CardTitle>
                <CardDescription className="text-center text-base">
                  We identify $15K+ in savings opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Security & compliance check</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Tool consolidation analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Automation opportunity mapping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Personalized roadmap</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-brand-blue/20 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center text-2xl font-bold">
                2
              </div>
              <CardHeader className="pt-12">
                <CardTitle className="text-2xl text-center">Choose Your Path</CardTitle>
                <CardDescription className="text-center text-base">
                  Pick the option that fits your stage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="font-semibold text-gray-900">Workshop ($97)</div>
                    <div className="text-sm text-gray-600">Perfect for individuals</div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-gray-900">Academy ($197+)</div>
                    <div className="text-sm text-gray-600">Master the 5 pillars</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="font-semibold text-gray-900">Enterprise ($2.5K+)</div>
                    <div className="text-sm text-gray-600">Full transformation</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500/20 relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                3
              </div>
              <CardHeader className="pt-12">
                <CardTitle className="text-2xl text-center">Get Results</CardTitle>
                <CardDescription className="text-center text-base">
                  See ROI in 3 months or less
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>Week 1:</strong> First automation live</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>Week 4:</strong> 5+ workflows automated</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>Month 2:</strong> Break-even on investment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm"><strong>Month 3:</strong> Full ROI achieved</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-brand-purple hover:bg-brand-purple/90 text-white text-lg px-10 py-7 h-auto">
                Start with Free Audit <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Workshop Teaser Section - NEW */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-brand-orange/10 to-brand-orange/5">
        <div className="container max-w-4xl">
          <div className="text-center space-y-6">
            <Badge className="bg-brand-orange text-white text-base px-4 py-2">Next Workshop</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Social Media Automation with AI
            </h2>
            <p className="text-xl text-gray-700">
              Learn to create 30 days of content in 2 hours using ChatGPT, Gamma, and Captions.ai
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-orange" />
                <span className="font-semibold">November 26, 2024 • 2:00 PM AEST</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-orange" />
                <span className="font-semibold">15 spots remaining</span>
              </div>
            </div>

            <div className="pt-4">
              <Link href="/workshop">
                <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-10 py-7 h-auto">
                  Reserve Your Spot ($97) <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-gray-600 mt-4">
                Or get unlimited workshop access with Academy membership ($197/month)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool Stack Section - Simplified */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-brand-blue text-white text-base px-4 py-2 mb-4">The 7 Tools We Actually Use</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Stop Paying for 15 Tools You Don't Need
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've tested 100+ AI tools. These are the ones that deliver <span className="font-bold text-brand-blue">real business value</span>—not just hype.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
            {/* ChatGPT */}
            <Card className="border-2 hover:border-brand-orange transition-all">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-base">ChatGPT</CardTitle>
                <CardDescription className="text-xs">The Foundation</CardDescription>
              </CardHeader>
            </Card>

            {/* Manus */}
            <Card className="border-2 border-brand-purple bg-brand-purple/5">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-dark-purple rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Wand2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-base">Manus</CardTitle>
                <CardDescription className="text-xs font-semibold text-brand-purple">This academy! ⭐</CardDescription>
              </CardHeader>
            </Card>

            {/* Replit */}
            <Card className="border-2 hover:border-brand-blue transition-all">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-base">Replit</CardTitle>
                <CardDescription className="text-xs">Dev Environment</CardDescription>
              </CardHeader>
            </Card>

            {/* Gamma */}
            <Card className="border-2 hover:border-brand-orange transition-all">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Presentation className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-base">Gamma</CardTitle>
                <CardDescription className="text-xs">Presentations</CardDescription>
              </CardHeader>
            </Card>

            {/* ElevenLabs */}
            <Card className="border-2 hover:border-brand-blue transition-all">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-base">ElevenLabs</CardTitle>
                <CardDescription className="text-xs">AI Voice</CardDescription>
              </CardHeader>
            </Card>

            {/* Captions.ai */}
            <Card className="border-2 hover:border-brand-orange transition-all">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-base">Captions.ai</CardTitle>
                <CardDescription className="text-xs">Video Editor</CardDescription>
              </CardHeader>
            </Card>

            {/* Viralwave */}
            <Card className="border-2 hover:border-brand-purple transition-all">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-base">Viralwave</CardTitle>
                <CardDescription className="text-xs">Content Engine</CardDescription>
              </CardHeader>
            </Card>

            {/* Custom Tools */}
            <Card className="border-2 border-dashed border-brand-purple bg-brand-purple/5">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-brand-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border-2 border-dashed border-brand-purple">
                  <Wand2 className="w-8 h-8 text-brand-purple" />
                </div>
                <CardTitle className="text-base">+ Custom</CardTitle>
                <CardDescription className="text-xs text-brand-purple">Built on Manus</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center space-y-6">
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              <strong>Integration over features.</strong> Simplicity over power. <strong>ROI over hype.</strong> Security first.
            </p>
            <Link href="/quiz">
              <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-white">
                Find Your Perfect Tool Stack <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories Preview */}
      <section className="py-20 md:py-28 bg-gray-50">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-brand-orange text-white text-base px-4 py-2 mb-4">Proven Results</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Real Businesses, Real Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how organizations like yours saved $6K-$24K annually in 3-5 weeks
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Case Study 1 */}
            <Card className="border-2 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="text-4xl mb-2">💰</div>
                <CardTitle className="text-xl">Crypto/Fintech Startup</CardTitle>
                <CardDescription>15 people • Financial Services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Before:</span>
                    <span className="text-lg font-bold text-red-600">18 tools</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">After:</span>
                    <span className="text-lg font-bold text-green-600">5 tools</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Savings:</span>
                    <span className="text-lg font-bold text-brand-orange">$24K/year</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Cut our tool costs by 70% and automated lead tracking in 4 weeks."
                </p>
              </CardContent>
            </Card>

            {/* Case Study 2 */}
            <Card className="border-2 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="text-4xl mb-2">🔥</div>
                <CardTitle className="text-xl">Fire Safety Consultancy</CardTitle>
                <CardDescription>8 people • Compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Before:</span>
                    <span className="text-lg font-bold text-red-600">Manual audits</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">After:</span>
                    <span className="text-lg font-bold text-green-600">Automated</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Savings:</span>
                    <span className="text-lg font-bold text-brand-orange">$6K/year</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Audits now take 30 minutes instead of 2 hours. Game changer."
                </p>
              </CardContent>
            </Card>

            {/* Case Study 3 */}
            <Card className="border-2 hover:shadow-xl transition-all">
              <CardHeader>
                <div className="text-4xl mb-2">📱</div>
                <CardTitle className="text-xl">Marketing Agency</CardTitle>
                <CardDescription>12 people • Digital Marketing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Before:</span>
                    <span className="text-lg font-bold text-red-600">22 tools</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">After:</span>
                    <span className="text-lg font-bold text-green-600">7 tools</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Savings:</span>
                    <span className="text-lg font-bold text-brand-orange">$15K/year</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  "Deliverables now take 50% less time. Clients love the speed."
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/case-studies">
              <Button size="lg" variant="outline" className="border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
                View All Case Studies <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-brand-purple via-brand-blue to-brand-dark-purple text-white">
        <div className="container max-w-4xl text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Save $15K/Year?
          </h2>
          <p className="text-xl md:text-2xl text-white/90">
            Book your free 15-minute AI audit and get a personalized roadmap in 24 hours
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-10 py-7 h-auto">
                Book Free Audit <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <Link href="/workshop">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-brand-purple text-lg px-10 py-7 h-auto">
                Join Next Workshop ($97)
              </Button>
            </Link>
            <Link href="/portal">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-brand-purple text-lg px-10 py-7 h-auto">
                Explore Academy
              </Button>
            </Link>
          </div>

          <div className="pt-8 border-t border-white/20">
            <p className="text-white/80 text-lg">
              <strong>3-month ROI guarantee</strong> • No coding required • Security-first approach
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup - NEW */}
      <section className="py-16 bg-white border-t">
        <div className="container max-w-2xl text-center space-y-6">
          <h3 className="text-3xl font-bold">Get Weekly AI Tips for Queensland SMBs</h3>
          <p className="text-lg text-gray-600">
            Join 500+ subscribers getting actionable AI tips every Tuesday
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-purple"
            />
            <Button className="bg-brand-purple hover:bg-brand-purple/90 px-8 py-3">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-bold text-lg mb-4">Tech Horizon Labs</h4>
              <p className="text-gray-400 text-sm">
                AI implementation for Queensland SMBs—without the complexity, cost, or risk.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Learn</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/workshop" className="text-gray-400 hover:text-white">Workshop</Link></li>
                <li><Link href="/portal" className="text-gray-400 hover:text-white">Academy</Link></li>
                <li><Link href="/quiz" className="text-gray-400 hover:text-white">Tool Stack Quiz</Link></li>
                <li><Link href="/scorecard" className="text-gray-400 hover:text-white">AI Readiness Scorecard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/case-studies" className="text-gray-400 hover:text-white">Case Studies</Link></li>
                <li><Link href="/enterprise" className="text-gray-400 hover:text-white">Enterprise</Link></li>
                <li><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Book Audit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.linkedin.com/in/huxleyclarke/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">LinkedIn</a></li>
                <li><a href="https://www.facebook.com/profile.php?id=61570267863634" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Facebook</a></li>
                <li><a href="https://linktr.ee/techhorizonlabs" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Linktree</a></li>
                <li><a href="https://wa.me/61481771660" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-sm">© 2025 Tech Horizon Labs. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
