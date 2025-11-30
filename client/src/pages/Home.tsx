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
  Play,
  Database,
  BookOpen,
  Zap,
  Layers
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import MobileNav from "@/components/MobileNav";

const BOOKING_URL = "https://app.klipy.ai/book/pre-discovery/free-pre-discovery";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <MobileNav />
      {/* Top Banner */}
      <div className="bg-brand-orange text-white relative z-10">
        <div className="container flex items-center justify-between py-3 px-4 pr-16">
          <div className="flex items-center gap-1 md:gap-2 flex-1 min-w-0">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs md:text-sm font-semibold line-clamp-1">
              🎓 Join Other Pioneers • Next Workshop: Nov 26 • Academy Platform Now Open
            </span>
            <Sparkles className="w-4 h-4 flex-shrink-0 hidden md:inline" />
          </div>
          <Link href="/portal" className="flex-shrink-0 ml-2 hidden md:block">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hover:text-white text-sm px-4 py-1 h-auto">
              Member Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section - Academy Platform Focus */}
      <section className="relative bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] via-[rgb(var(--brand-blue))] to-[rgb(var(--brand-dark-purple))] text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20 animate-pulse"></div>
        
        {/* Gradient Orbs for Depth */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-orange/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-purple/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        
        <div className="container relative py-20 md:py-32">
          <div className="flex flex-col items-center text-center space-y-10 max-w-5xl mx-auto">
            {/* Logo with Glow Effect */}
            <div className="relative">
              <div className="absolute inset-0 bg-brand-orange/50 rounded-full blur-2xl animate-pulse"></div>
              <img src={APP_LOGO} alt="Tech Horizon Academy" className="relative w-20 h-20 md:w-28 md:h-28 drop-shadow-2xl" />
            </div>
            
            {/* Academy Platform Value Proposition */}
            <div className="space-y-8">
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-sm px-4 py-2">
                COMPREHENSIVE AI LEARNING PLATFORM
              </Badge>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight max-w-4xl mx-auto">
                Master AI Before Your<br />
                <span className="bg-gradient-to-r from-brand-orange to-yellow-300 bg-clip-text text-transparent">Competitors Do</span>
              </h1>
              
              <p className="text-lg md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-medium">
                Tech Horizon Academy: The all-in-one platform for pioneers who refuse to fall behind
              </p>
              
              <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
                1,620+ AI tools • Expert-curated prompts • Live workshops • Recorded sessions • Workflows • Real-world applications tested daily by Huxley across all technology verticals
              </p>
            </div>

            {/* Platform Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 w-full max-w-3xl">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-orange">1,620+</div>
                <div className="text-sm text-white/70 mt-1">AI Tools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-orange">118</div>
                <div className="text-sm text-white/70 mt-1">Prompts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-orange">12</div>
                <div className="text-sm text-white/70 mt-1">Wiki Guides</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-orange">Weekly</div>
                <div className="text-sm text-white/70 mt-1">Workshops</div>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link href="/pricing">
                <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-xl px-12 py-8 h-auto shadow-2xl hover:shadow-brand-orange/50 transition-all hover:scale-105 rounded-xl">
                  Join the Academy <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </Link>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-xl px-12 py-8 h-auto rounded-xl">
                  Book Free AI Audit
                </Button>
              </a>
            </div>
            
            <p className="text-sm text-white/70">Monthly subscription • Cancel anytime • One-time options available</p>
          </div>
        </div>
      </section>

      {/* Four Pillars Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4">FOUR PILLARS OF MASTERY</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Everything You Need in One Platform
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Tech Horizon Academy covers all technology verticals with expert guidance from Huxley, who tests the latest tools daily and teaches real-world applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:border-brand-orange transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-950 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-brand-orange" />
                </div>
                <CardTitle>Vibe Marketing</CardTitle>
                <CardDescription>Content creation, social media automation, audience engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>AI content studios</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Social media workflows</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Campaign automation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-purple transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center mb-4">
                  <Code className="w-6 h-6 text-brand-purple" />
                </div>
                <CardTitle>Vibe Coding</CardTitle>
                <CardDescription>API integration, automation scripts, custom solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Gemini & Manus mastery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Production workflows</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Hands-on coding sessions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-blue transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-brand-blue" />
                </div>
                <CardTitle>Vibe Alignment</CardTitle>
                <CardDescription>Strategy, tool selection, business integration</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>AI strategy frameworks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Tool evaluation methods</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>ROI optimization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-500 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-green-500" />
                </div>
                <CardTitle>Vibe Engineering</CardTitle>
                <CardDescription>Advanced automation, scalable systems, infrastructure</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Multi-platform deployment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>System architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Enterprise solutions</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Resources Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4">ONE PLACE FOR EVERYTHING</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Your Complete AI Learning Hub
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to stay ahead—tools, prompts, workflows, recordings, and live workshops—all in one subscription
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-brand-orange/10 rounded-2xl flex items-center justify-center">
                <Database className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="text-xl font-semibold">Tools Database</h3>
              <p className="text-muted-foreground">
                1,620+ AI tools curated and categorized across all verticals. Find the perfect tool for any use case.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-brand-purple/10 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold">Prompt Library</h3>
              <p className="text-muted-foreground">
                118+ battle-tested prompts for every AI use case. Copy, customize, and deploy instantly—new prompts added weekly.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center">
                <Layers className="w-8 h-8 text-brand-blue" />
              </div>
              <h3 className="text-xl font-semibold">Workflows</h3>
              <p className="text-muted-foreground">
                Battle-tested automation workflows ready to implement in your business today.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center">
                <Video className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">Recorded Workshops</h3>
              <p className="text-muted-foreground">
                Access library of past sessions. Watch on-demand, learn at your pace.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                <Mic className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold">Live Workshops</h3>
              <p className="text-muted-foreground">
                Weekly hands-on sessions. Code together, ask questions, get real-time guidance.
              </p>
            </div>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold">Knowledge Base</h3>
              <p className="text-muted-foreground">
                12 comprehensive Wiki guides covering fundamentals to advanced techniques. New guides added after every workshop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Edge Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4">FOR PIONEERS ONLY</Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Widen Your Competitive Gap
              </h2>
              <p className="text-lg text-muted-foreground">
                While others hesitate, you'll master the tools that give you an unfair advantage
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <X className="w-5 h-5 text-red-500" />
                    <CardTitle className="text-red-700 dark:text-red-400">Falling Behind</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Overwhelmed by tool options</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Learning from outdated tutorials</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">No clear implementation path</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <X className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Competitors gaining ground</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <CardTitle className="text-green-700 dark:text-green-400">Academy Members</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Curated tools tested daily</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Real-world applications taught live</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Production-ready workflows</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Unstoppable competitive edge</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Clear Monthly Model */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4">FLEXIBLE MEMBERSHIP OPTIONS</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Monthly subscriptions for ongoing access to the full platform, or one-time options for specific resources
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {/* Starter Tier */}
            <Card className="border-2">
              <CardHeader>
                <Badge className="w-fit mb-2">STARTER</Badge>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$97</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="text-sm text-muted-foreground line-through">$147/month</div>
                  <Badge variant="outline" className="mt-2">Founding Member Price</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Full platform access (tools, prompts, workflows)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>2 workshop credits per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Knowledge base access</span>
                  </li>
                </ul>
                <Link href="/pricing" className="block mt-6">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Lite Tier */}
            <Card className="border-2 border-brand-orange relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-brand-orange text-white">MOST POPULAR</Badge>
              </div>
              <CardHeader>
                <Badge className="w-fit mb-2 bg-brand-orange text-white">LITE</Badge>
                <CardTitle className="text-2xl">Lite</CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$300</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="text-sm text-muted-foreground line-through">$397/month</div>
                  <Badge variant="outline" className="mt-2">Founding Member Price</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Everything in Starter</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>4 workshop credits per month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="font-semibold">All workshop recordings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link href="/pricing" className="block mt-6">
                  <Button className="w-full bg-brand-orange hover:bg-brand-orange/90">Get Started</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Tier */}
            <Card className="border-2">
              <CardHeader>
                <Badge className="w-fit mb-2">PRO</Badge>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="mt-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">$500</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <div className="text-sm text-muted-foreground line-through">$697/month</div>
                  <Badge variant="outline" className="mt-2">Founding Member Price</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Everything in Lite</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="font-semibold">Unlimited workshop access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>1-on-1 coaching sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Custom workflow development</span>
                  </li>
                </ul>
                <Link href="/pricing" className="block mt-6">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* One-Time Options */}
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">One-Time Options</h3>
              <p className="text-muted-foreground">Not ready for a subscription? Start with these</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Access Pass</CardTitle>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-bold">$27</span>
                    <span className="text-sm text-muted-foreground line-through">$47</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Platform access (tools, prompts, workflows) • No workshops or recordings
                  </p>
                  <Link href="/pricing">
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Single Workshop</CardTitle>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-3xl font-bold">$97</span>
                    <span className="text-sm text-muted-foreground line-through">$197</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    1 live workshop + recording • Startup support available on request
                  </p>
                  <Link href="/pricing">
                    <Button variant="outline" className="w-full">Learn More</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Member Testimonials */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="mb-4">MEMBER SUCCESS STORIES</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Real Results from Real Members
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See how Academy members are widening their competitive gap
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Testimonial 1 */}
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-orange/20 rounded-full flex items-center justify-center text-2xl font-bold text-brand-orange">
                    S
                  </div>
                  <div>
                    <div className="font-semibold">Sarah Chen</div>
                    <Badge variant="outline" className="text-xs">Pro Member</Badge>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "Cut my content creation time from 8 hours to 2 hours per week. The Vibe Marketing workflows are game-changing. Already seeing 3x engagement on social media."
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Results:</strong> 75% time saved • 3x engagement • $2K/mo saved
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 2 */}
            <Card className="border-2 border-brand-orange">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-purple/20 rounded-full flex items-center justify-center text-2xl font-bold text-brand-purple">
                    M
                  </div>
                  <div>
                    <div className="font-semibold">Marcus Rodriguez</div>
                    <Badge variant="outline" className="text-xs">Lite Member</Badge>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "The Gemini & Manus workshop was incredible. Built my first AI automation in 90 minutes during the live session. Huxley's real-world examples made everything click."
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Results:</strong> 5 automations built • 12 hours/week saved • ROI in 2 weeks
                </div>
              </CardContent>
            </Card>

            {/* Testimonial 3 */}
            <Card className="border-2">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-brand-blue/20 rounded-full flex items-center justify-center text-2xl font-bold text-brand-blue">
                    J
                  </div>
                  <div>
                    <div className="font-semibold">Jessica Park</div>
                    <Badge variant="outline" className="text-xs">Starter Member</Badge>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  "The tools database alone is worth 10x the membership. Found 3 perfect tools for my business in 20 minutes. The prompt library saved me weeks of trial and error."
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Results:</strong> 3 tools deployed • 20+ prompts saved • 10x ROI
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-[rgb(var(--brand-orange))] via-[rgb(var(--brand-purple))] to-[rgb(var(--brand-blue))] text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Join Other Pioneers Widening The Competitive Gap
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Every day you wait, your competitors get further ahead. Start today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="bg-white text-brand-purple hover:bg-white/90 text-xl px-12 py-8 h-auto rounded-xl">
                Join the Academy <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </Link>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-xl px-12 py-8 h-auto rounded-xl">
                Book Free AI Audit
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
