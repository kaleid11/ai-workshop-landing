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
  BarChart3
} from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner */}
      <div className="bg-brand-orange text-white relative z-10">
        <div className="container flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs md:text-sm font-semibold line-clamp-1">
              Next Workshop: Nov 26 • Academy Now Open • Enterprise Audits Available
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

              <Link href="/enterprise" className="block">
                <Card className="border-2 border-brand-purple hover:border-brand-purple/80 transition-all hover:scale-105 bg-white/95 h-full">
                  <CardHeader className="text-center pb-3">
                    <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Building2 className="w-6 h-6 text-brand-purple" />
                    </div>
                    <CardTitle className="text-xl text-gray-900">Book Enterprise Audit</CardTitle>
                    <CardDescription className="text-gray-600">Proven frameworks for organizations</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-3xl font-bold text-brand-purple mb-2">$2.5K+</div>
                    <p className="text-sm text-gray-600 mb-4">Roadmap • Implementation • Support</p>
                    <Button className="w-full bg-brand-purple hover:bg-brand-purple/90">
                      Get Started <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
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
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg">Unclear ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Not sure where to start with AI or how to measure the business impact
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Horizon Framework Section */}
      <section className="py-16 md:py-24 bg-white">
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
                description: "Hands-on workshops, prompt engineering fundamentals, role-specific training, ongoing resources",
                color: "brand-green"
              },
              {
                number: "4",
                title: "Scale",
                subtitle: "Support & Optimization",
                description: "Monthly support desk, usage monitoring, new use cases, quarterly optimization reviews",
                color: "brand-purple"
              },
              {
                number: "5",
                title: "Trust",
                subtitle: "Compliance & Governance",
                description: "Continuous monitoring, audit-ready documentation, data residency controls, SOC 2 infrastructure",
                color: "brand-dark-purple"
              }
            ].map((pillar, index) => (
              <Card key={index} className="border-2 hover:border-brand-orange transition-all hover:scale-105">
                <CardHeader>
                  <div className={`w-12 h-12 bg-${pillar.color}/10 rounded-full flex items-center justify-center mb-3 text-${pillar.color} font-bold text-xl`}>
                    {pillar.number}
                  </div>
                  <CardTitle className="text-lg">{pillar.title}</CardTitle>
                  <CardDescription className="text-xs font-semibold text-gray-500">{pillar.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              This framework powers everything from our $97 workshops to enterprise transformations.
            </p>
            <Link href="/enterprise">
              <Button size="lg" className="bg-brand-purple hover:bg-brand-purple/90">
                See Enterprise Implementation <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Choose Your Path Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Choose Your Path
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Whether you're just starting or ready to transform your entire organization, we have the right solution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Workshop Path */}
            <Card className="border-2 hover:border-brand-orange transition-all">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-brand-orange" />
                </div>
                <CardTitle className="text-2xl">Workshop</CardTitle>
                <CardDescription>Perfect for individuals & solopreneurs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-brand-orange">$97</div>
                  <p className="text-sm text-gray-600 mt-1">One-time • Lifetime access</p>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>2-hour live workshop (Nov 26)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Hands-on automation setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Portal access with templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>WhatsApp community support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Workshop replay video</span>
                  </li>
                </ul>
                <Link href="/checkout">
                  <Button className="w-full bg-brand-orange hover:bg-brand-orange/90">
                    Join Workshop <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Academy Path */}
            <Card className="border-2 border-brand-blue hover:border-brand-blue/80 transition-all relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-brand-blue text-white">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-3 pt-6">
                <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-brand-blue" />
                </div>
                <CardTitle className="text-2xl">AI Academy</CardTitle>
                <CardDescription>Master the 5 pillars at your pace</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-brand-blue">$197+</div>
                  <p className="text-sm text-gray-600 mt-1">Monthly • 3 tiers available</p>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>5 pillars: Vibe, Coding, Engineering, Alignment, Marketing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Monthly live workshops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Prompt library downloads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>AI tools & resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Community access</span>
                  </li>
                </ul>
                <Link href="/portal">
                  <Button className="w-full bg-brand-blue hover:bg-brand-blue/90">
                    Explore Academy <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Path */}
            <Card className="border-2 hover:border-brand-purple transition-all">
              <CardHeader className="text-center pb-3">
                <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-brand-purple" />
                </div>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription>Proven frameworks for organizations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-4 bg-gray-50 rounded-lg">
                  <div className="text-4xl font-bold text-brand-purple">$2.5K+</div>
                  <p className="text-sm text-gray-600 mt-1">Custom • ROI-driven</p>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>AI Opportunity Audit ($2.5K)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Automation Accelerator ($5K-$15K)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>25+ pre-built AI assistants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Security & compliance first</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Ongoing transformation partner</span>
                  </li>
                </ul>
                <Link href="/enterprise">
                  <Button className="w-full bg-brand-purple hover:bg-brand-purple/90">
                    Book Audit <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section - Mixed */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Trusted by 200+ Businesses
            </h2>
            <p className="text-xl text-gray-600">
              From solopreneurs to enterprise organizations across Queensland and beyond
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Workshop Testimonial */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Workshop Attendee</CardTitle>
                    <CardDescription className="text-xs">Small Business Owner</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm mb-4">
                  "The workshop was incredibly practical. I left with working automation systems that save me 10+ hours per week. Best $97 I've ever spent."
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BarChart3 className="w-4 h-4 text-brand-orange" />
                  <span>10+ hours saved weekly</span>
                </div>
              </CardContent>
            </Card>

            {/* Academy Member */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Academy Member</CardTitle>
                    <CardDescription className="text-xs">Marketing Agency</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm mb-4">
                  "The 5-pillar system is comprehensive. We've implemented tools across our entire agency and seen a 30% increase in client output."
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp className="w-4 h-4 text-brand-blue" />
                  <span>30% increase in output</span>
                </div>
              </CardContent>
            </Card>

            {/* Enterprise Client */}
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-brand-purple" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Enterprise Client</CardTitle>
                    <CardDescription className="text-xs">50-person organization</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 text-sm mb-4">
                  "Tech Horizon Labs delivered a complete AI transformation in 4 weeks. Security-first approach, proven ROI, and ongoing support. Exactly what we needed."
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 text-brand-purple" />
                  <span>$180K annual savings</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-orange" />
                <span className="font-semibold">Featured at Noosa Chamber of Commerce</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-brand-purple">5.0</span>
                <span>★★★★★</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-blue" />
                <span className="font-semibold">200+ businesses coached</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Tech Horizon Labs */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Why Tech Horizon Labs?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The no-nonsense approach that delivers results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <Zap className="w-12 h-12 text-brand-orange mb-4" />
                <CardTitle className="text-xl">Business-First Technologists</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We start with your business problem and ROI, then work backward to the technology. No "shiny objects"—only solutions that contribute to your bottom line.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Shield className="w-12 h-12 text-brand-blue mb-4" />
                <CardTitle className="text-xl">Tool-Agnostic</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We're not resellers. We choose the absolute best tool for your specific problem, ensuring flexible, future-proof solutions without vendor lock-in.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Rocket className="w-12 h-12 text-brand-purple mb-4" />
                <CardTitle className="text-xl">Future-Proof Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  The AI landscape is volatile. Our solutions are designed for adaptability, protecting your investment from becoming obsolete in 12 months.
                </p>
              </CardContent>
            </Card>
          </div>
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
              <Link href="/enterprise">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 h-auto backdrop-blur-sm">
                  Book Enterprise Audit
                </Button>
              </Link>
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
            <div>
              <h3 className="font-bold text-lg mb-4">Tech Horizon Labs</h3>
              <p className="text-gray-400 text-sm">
                The no-nonsense approach to AI for businesses at every stage.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Offerings</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/checkout" className="hover:text-white">Workshops</Link></li>
                <li><Link href="/portal" className="hover:text-white">AI Academy</Link></li>
                <li><Link href="/enterprise" className="hover:text-white">Enterprise</Link></li>
                <li><Link href="/consulting" className="hover:text-white">Consulting</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/resources" className="hover:text-white">Tools & Prompts</Link></li>
                <li><Link href="/calendar" className="hover:text-white">Workshop Calendar</Link></li>
                <li><Link href="/portal" className="hover:text-white">Member Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://techhorizonlabs.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">About Us</a></li>
                <li><a href="https://techhorizonlabs.com#work" target="_blank" rel="noopener noreferrer" className="hover:text-white">Our Work</a></li>
                <li><a href="https://techhorizonlabs.com#contact" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Tech Horizon Labs. All rights reserved. | South East Queensland, Australia</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
