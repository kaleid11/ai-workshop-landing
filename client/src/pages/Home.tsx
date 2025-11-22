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
  Zap,
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
  Wand2
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

      {/* Hero Section - Unified for All Audiences */}
      <section className="relative bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] via-[rgb(var(--brand-blue))] to-[rgb(var(--brand-dark-purple))] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container relative py-16 md:py-24">
          <div className="flex flex-col items-center text-center space-y-8">
            <img src={APP_LOGO} alt="Tech Horizon Labs" className="w-20 h-20 md:w-24 md:h-24" />
            
            <div className="space-y-6 max-w-5xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Stop Drowning in Admin.
                <br />
                <span className="text-brand-orange">Start Growing with AI.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium max-w-3xl mx-auto">
                From $97 workshops to enterprise transformation—we've built the proven system for every stage of your AI journey.
              </p>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                The no-nonsense approach to AI. Business-first. ROI-driven. Future-proof.
              </p>
            </div>

            {/* Three Clear CTAs */}
            <div className="grid md:grid-cols-3 gap-4 w-full max-w-5xl pt-8">
              <Link href="/checkout" className="block">
                <Card className="border-2 border-brand-orange hover:border-brand-orange/80 transition-all hover:scale-105 bg-white/95 h-full">
                  <CardHeader className="text-center pb-3">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Rocket className="w-6 h-6 text-brand-orange" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">Join Next Workshop</CardTitle>
                    <CardDescription className="text-gray-600">Perfect for individuals & solopreneurs</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-brand-orange mb-2">$97</div>
                    <p className="text-sm text-gray-600 mb-4">2-hour live session • Nov 26</p>
                    <Button className="w-full bg-brand-orange hover:bg-brand-orange/90">
                      Get Workshop Access <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/portal" className="block">
                <Card className="border-2 border-brand-blue hover:border-brand-blue/80 transition-all hover:scale-105 bg-white/95 h-full">
                  <CardHeader className="text-center pb-3">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <GraduationCap className="w-6 h-6 text-brand-blue" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">Explore AI Academy</CardTitle>
                    <CardDescription className="text-gray-600">Master the 5 pillars at your pace</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-brand-blue mb-2">$197+</div>
                    <p className="text-sm text-gray-600 mb-4">Lite • Pro • Elite tiers</p>
                    <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">
                      View Academy <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>

              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="block">
                <Card className="border-2 border-brand-purple hover:border-brand-purple/80 transition-all hover:scale-105 bg-white/95 h-full">
                  <CardHeader className="text-center pb-3">
                    <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Building2 className="w-6 h-6 text-brand-purple" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">Book Free AI Audit</CardTitle>
                    <CardDescription className="text-gray-600">15-min security & opportunity check</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-brand-purple mb-2">FREE</div>
                    <p className="text-sm text-gray-600 mb-4">Then $2.5K+ for implementation</p>
                    <Button className="w-full bg-brand-purple hover:bg-brand-purple/90">
                      Book Now <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </a>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>200+ businesses coached</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Featured at Noosa Chamber of Commerce</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Security-first approach</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section - Universal */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Are You Losing Time and Money On…
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The same challenges holding back businesses at every stage
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-brand-orange transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Manual Admin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Endless data entry, paperwork, and repetitive tasks eating your productive hours
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-orange transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Lost Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Slow lead follow-up and missed sales because you're stretched too thin
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-orange transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Security Concerns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Team using personal AI accounts without business controls or compliance
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-orange transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <Zap className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Tool Overwhelm</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Paying for 15+ subscriptions that don't talk to each other—wasting time and money
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* NEW: Stop Tool Overwhelm Section */}
      <section className="py-16 md:py-24 bg-white border-t-4 border-brand-orange">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand-orange text-white text-base px-4 py-2">The #1 Problem We Solve</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-6">
              Stop Paying for 15 Tools You Don't Need
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
              We help you consolidate into <span className="text-brand-orange font-bold">3-5 core platforms</span>—and build custom tools on Manus for everything else
            </p>
          </div>

          {/* Before/After Comparison */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
            {/* Before */}
            <Card className="border-2 border-red-200 bg-red-50/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-red-900">Before: Tool Chaos</CardTitle>
                    <CardDescription className="text-red-700">$500-$2K/month wasted</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>15+ subscriptions that don't integrate</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Team using personal accounts (security risk)</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Manual data transfer between platforms</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>No clear ROI or usage tracking</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Paying for features you never use</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Vendor lock-in and rising costs</span>
                </div>
              </CardContent>
            </Card>

            {/* After */}
            <Card className="border-2 border-green-200 bg-green-50/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-green-900">After: Streamlined Stack</CardTitle>
                    <CardDescription className="text-green-700">$150-$500/month + custom tools</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>3-5 core tools</strong> that integrate seamlessly</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Business workspace</strong> with centralized control</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Custom tools on Manus</strong> for unique workflows</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Clear ROI tracking</strong> on every tool</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Security & compliance</strong> built-in</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Future-proof</strong> and tool-agnostic</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              <strong>Save $5K-$15K annually</strong> by consolidating your tool stack. We'll show you exactly which tools you need—and which ones you don't.
            </p>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-lg px-8 py-6 h-auto">
                Book Free Tool Audit <ExternalLink className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Horizon Framework Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand-purple text-white">The Horizon Framework</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Our Proven 5-Pillar Methodology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Developed over 18 months with 200+ businesses. From discovery to ongoing optimization—we've built the complete system.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              {
                number: "1",
                title: "Innovate",
                subtitle: "Discovery & Audit",
                description: "Security readiness check, AI opportunity scan, compliance assessment, migration planning",
                color: "brand-orange"
              },
              {
                number: "2",
                title: "Forge",
                subtitle: "Setup & Deployment",
                description: "Business workspace setup, 25+ pre-built assistants, security configuration, tool integration",
                color: "brand-blue"
              },
              {
                number: "3",
                title: "Grow",
                subtitle: "Training & Adoption",
                description: "Hands-on workshops, prompt engineering, role-specific training, ongoing resources",
                color: "brand-green"
              },
              {
                number: "4",
                title: "Scale",
                subtitle: "Support & Optimization",
                description: "Monthly support desk, usage monitoring, new use cases, quarterly optimization",
                color: "brand-purple"
              },
              {
                number: "5",
                title: "Trust",
                subtitle: "Compliance & Governance",
                description: "Continuous monitoring, audit-ready docs, data residency, SOC 2 infrastructure",
                color: "brand-dark-purple"
              }
            ].map((pillar) => (
              <Card key={pillar.number} className="border-2 hover:border-gray-300 transition-all">
                <CardHeader className="text-center pb-3">
                  <div className={`w-12 h-12 bg-${pillar.color}/10 rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <span className={`text-2xl font-bold text-${pillar.color}`}>{pillar.number}</span>
                  </div>
                  <CardTitle className="text-lg">{pillar.title}</CardTitle>
                  <CardDescription className="text-xs font-semibold">{pillar.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600 text-center">
                    {pillar.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-4">
              This framework powers everything from our $97 workshops to enterprise transformations
            </p>
            <Link href="/enterprise">
              <Button variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white">
                See Full Framework <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NEW: Core 7 Tools Showcase */}
      <section className="py-16 md:py-24 bg-white border-t-4 border-brand-blue">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand-blue text-white text-base px-4 py-2">Our Recommended Stack</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-6">
              The 7 Tools We Actually Use
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              We've tested 100+ AI tools. These are the ones that deliver <span className="text-brand-blue font-bold">real business value</span>—not just hype.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
            {/* ChatGPT */}
            <Card className="border-2 hover:border-brand-orange transition-all hover:scale-105">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">ChatGPT</CardTitle>
                <CardDescription className="text-xs font-semibold text-brand-orange">The Foundation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-700 text-center mb-3">
                  Conversational AI, prompt engineering, business automation
                </p>
                <div className="text-center">
                  <Badge variant="outline" className="text-xs">Everyone</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Manus */}
            <Card className="border-2 border-brand-purple hover:border-brand-purple/60 transition-all hover:scale-105 bg-brand-purple/5">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-dark-purple rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Wand2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">Manus</CardTitle>
                <CardDescription className="text-xs font-semibold text-brand-purple">The Platform ⭐</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-700 text-center mb-3">
                  Build internal tools, micro-apps, AI orchestration
                </p>
                <div className="text-center">
                  <Badge className="text-xs bg-brand-purple">This academy runs on Manus!</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Replit */}
            <Card className="border-2 hover:border-brand-blue transition-all hover:scale-105">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">Replit</CardTitle>
                <CardDescription className="text-xs font-semibold text-brand-blue">The Dev Environment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-700 text-center mb-3">
                  Collaborative coding, rapid prototyping
                </p>
                <div className="text-center">
                  <Badge variant="outline" className="text-xs">Technical Teams</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Gamma */}
            <Card className="border-2 hover:border-brand-orange transition-all hover:scale-105">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Presentation className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">Gamma</CardTitle>
                <CardDescription className="text-xs font-semibold text-brand-orange">The Presentation Tool</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-700 text-center mb-3">
                  AI-powered presentations, pitch decks
                </p>
                <div className="text-center">
                  <Badge variant="outline" className="text-xs">Marketing & Sales</Badge>
                </div>
              </CardContent>
            </Card>

            {/* ElevenLabs */}
            <Card className="border-2 hover:border-brand-blue transition-all hover:scale-105">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">ElevenLabs</CardTitle>
                <CardDescription className="text-xs font-semibold text-brand-blue">The Voice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-700 text-center mb-3">
                  AI voice generation, text-to-speech
                </p>
                <div className="text-center">
                  <Badge variant="outline" className="text-xs">Content Creators</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Captions.ai */}
            <Card className="border-2 hover:border-brand-orange transition-all hover:scale-105">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">Captions.ai</CardTitle>
                <CardDescription className="text-xs font-semibold text-brand-orange">The Video Editor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-700 text-center mb-3">
                  AI video captions, subtitles
                </p>
                <div className="text-center">
                  <Badge variant="outline" className="text-xs">Social Media</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Viralwave Studio */}
            <Card className="border-2 hover:border-brand-purple transition-all hover:scale-105">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-lg">Viralwave</CardTitle>
                <CardDescription className="text-xs font-semibold text-brand-purple">The Content Engine</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-700 text-center mb-3">
                  Social media content creation
                </p>
                <div className="text-center">
                  <Badge variant="outline" className="text-xs">Marketing Teams</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Custom Tools on Manus */}
            <Card className="border-2 border-dashed border-brand-purple hover:border-brand-purple/60 transition-all hover:scale-105 bg-brand-purple/5">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-purple/20 to-brand-dark-purple/20 rounded-2xl flex items-center justify-center mx-auto mb-3 border-2 border-dashed border-brand-purple">
                  <Zap className="w-8 h-8 text-brand-purple" />
                </div>
                <CardTitle className="text-lg">+ Custom Tools</CardTitle>
                <CardDescription className="text-xs font-semibold text-brand-purple">Built on Manus</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-gray-700 text-center mb-3">
                  For everything else—we build it custom on Manus
                </p>
                <div className="text-center">
                  <Badge className="text-xs bg-brand-purple">Your Unique Workflows</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tool Selection Principle */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-2 border-brand-blue bg-brand-blue/5">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-brand-purple">Our Tool Selection Principle</h3>
                  <p className="text-lg text-gray-700">
                    <strong>Integration over features.</strong> Simplicity over power. <strong>ROI over hype.</strong> Security first.
                  </p>
                  <p className="text-gray-600">
                    We're not tool vendors—we're tool consolidation consultants. We'll help you choose the right stack for your business, not just the latest shiny object.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTAs */}
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-700 font-medium">
              Not sure which tools you need?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90 text-lg px-8 py-6 h-auto">
                  Book Free Tool Audit <ExternalLink className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link href="/tools">
                <Button size="lg" variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white text-lg px-8 py-6 h-auto">
                  Explore Full Tool Database <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Preview Section */}
      <section className="py-16 md:py-24 bg-white border-t-4 border-brand-orange">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand-orange text-white text-base px-4 py-2">Proven Results</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-6">
              Success Stories from Real Businesses
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              See how organizations like yours consolidated tools, saved money, and scaled faster
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {/* Case Study 1 */}
            <Card className="border-2 hover:shadow-lg transition-all">
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
                    <span className="text-lg font-bold text-brand-blue">$24K/year</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic">
                  "We went from security nightmare to audit-ready in 4 weeks."
                </p>
              </CardContent>
            </Card>

            {/* Case Study 2 */}
            <Card className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="text-4xl mb-2">🔥</div>
                <CardTitle className="text-xl">Fire Safety Consultancy</CardTitle>
                <CardDescription>8 people • Compliance Services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Before:</span>
                    <span className="text-lg font-bold text-red-600">12 tools</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">After:</span>
                    <span className="text-lg font-bold text-green-600">4 tools</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">Savings:</span>
                    <span className="text-lg font-bold text-brand-blue">$6K/year</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic">
                  "Audits went from 20 hours to 7 hours. 3x more clients."
                </p>
              </CardContent>
            </Card>

            {/* Case Study 3 */}
            <Card className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="text-4xl mb-2">🎨</div>
                <CardTitle className="text-xl">Marketing Agency</CardTitle>
                <CardDescription>12 people • Creative Services</CardDescription>
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
                    <span className="text-lg font-bold text-brand-blue">$15K/year</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 italic">
                  "50% faster deliverables. 30% more clients with same team."
                </p>
              </CardContent>
            </Card>
          </div>

          {/* CTAs */}
          <div className="text-center space-y-4">
            <Link href="/case-studies">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-8 py-6 h-auto">
                View All Case Studies <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tool Stack Quiz CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 border-t-4 border-brand-purple">
        <div className="container max-w-4xl text-center space-y-6">
          <Badge className="bg-brand-purple text-white text-base px-4 py-2 inline-block">Free Assessment</Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-purple">
            What's Your Perfect Tool Stack?
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Answer 5 quick questions and get personalized AI tool recommendations with ROI projections
          </p>
          <Link href="/quiz">
            <Button size="lg" className="bg-brand-purple hover:bg-brand-purple/90 text-white text-lg px-8 py-6 h-auto">
              Take Free Tool Stack Quiz <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-sm text-gray-600 pt-4">
            Takes 2 minutes • No credit card required • Get instant recommendations
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] via-[rgb(var(--brand-blue))] to-[rgb(var(--brand-dark-purple))] text-white">
        <div className="container">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Stop Drowning and Start Growing?
            </h2>
            <p className="text-xl text-white/90">
              Choose your path. Get started today. See results within weeks.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/checkout">
                <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-8 py-6 h-auto">
                  Join Workshop - $97
                </Button>
              </Link>
              <Link href="/portal">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 h-auto backdrop-blur-sm">
                  Explore Academy
                </Button>
              </Link>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 h-auto backdrop-blur-sm">
                  Book Free Audit
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>No-nonsense approach</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>ROI-driven results</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Future-proof solutions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Tech Horizon Labs */}
            <div>
              <h3 className="font-bold text-lg mb-4">Tech Horizon Labs</h3>
              <p className="text-gray-400 text-sm mb-4">
                The no-nonsense approach to AI transformation. Business-first. ROI-driven. Future-proof.
              </p>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/company/thzn/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="https://www.facebook.com/techhorizonlabs/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  Facebook
                </a>
              </div>
            </div>

            {/* Offerings */}
            <div>
              <h3 className="font-bold text-lg mb-4">Offerings</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/checkout" className="hover:text-white transition-colors">Workshops</Link></li>
                <li><Link href="/portal" className="hover:text-white transition-colors">AI Academy</Link></li>
                <li><Link href="/enterprise" className="hover:text-white transition-colors">Enterprise</Link></li>
                <li><Link href="/calendar" className="hover:text-white transition-colors">Workshop Calendar</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-bold text-lg mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/tools" className="hover:text-white transition-colors">Tool Database</Link></li>
                <li><Link href="/prompts" className="hover:text-white transition-colors">Prompt Library</Link></li>
                <li><Link href="/resources" className="hover:text-white transition-colors">Member Resources</Link></li>
                <li><a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Book Free Audit</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://techhorizonlabs.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Main Website</a></li>
                <li><a href="mailto:hello@techhorizonlabs.com" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="https://wa.me/message/WKT2DLIU5ACIO1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="https://linktr.ee/huxleyp" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Follow Huxley</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Tech Horizon Labs. All rights reserved. | Built with Manus | Made for Queensland & beyond</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
