import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  TrendingDown, 
  Clock, 
  CheckCircle2,
  Shield,
  Users,
  DollarSign,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { APP_TITLE, BOOKING_URL } from "@/const";

export default function CaseStudies() {
  const caseStudies = [
    {
      id: 1,
      industry: "Cryptocurrency & Financial Technology",
      icon: "💰",
      teamSize: "15 people",
      challenge: "Using 18 different tools across personal accounts, security concerns, no compliance documentation, $2,400/month in subscriptions",
      before: {
        tools: 18,
        cost: 2400,
        painPoints: [
          "Personal ChatGPT accounts (security risk)",
          "No centralized security or compliance",
          "Manual data transfer between platforms",
          "Team using different tools for same tasks"
        ]
      },
      after: {
        tools: 5,
        cost: 450,
        timeline: "4 weeks",
        stack: ["ChatGPT Team", "Manus", "Replit", "Compliance Tools", "Document Management"]
      },
      results: {
        annualSavings: 24000,
        timeSaved: "15 hours/week",
        efficiency: "100% compliance with financial regulations",
        roi: "Month 2",
        additionalWins: [
          "25+ custom AI assistants for compliance, research, customer support",
          "Audit-ready documentation from day 1",
          "Centralized business workspace with SSO"
        ]
      },
      quote: "We went from security nightmare to audit-ready in 4 weeks. The tool consolidation alone paid for itself in 2 months.",
      color: "blue"
    },
    {
      id: 2,
      industry: "Fire Safety & Compliance Consultancy",
      icon: "🔥",
      teamSize: "8 people",
      challenge: "Manual compliance checklists, scattered client data, no standardized processes, team using personal AI accounts",
      before: {
        tools: 12,
        cost: 800,
        painPoints: [
          "Manual compliance audit processes (20+ hours per client)",
          "Scattered client data across email, spreadsheets, PDFs",
          "No AI integration",
          "Inconsistent deliverables across team members"
        ]
      },
      after: {
        tools: 4,
        cost: 320,
        timeline: "3 weeks",
        stack: ["ChatGPT Team", "Manus", "Document Management", "Client Portal"]
      },
      results: {
        annualSavings: 6000,
        timeSaved: "12 hours/week per consultant",
        efficiency: "3x faster compliance audits (20 hours → 7 hours)",
        roi: "Month 3",
        additionalWins: [
          "Custom compliance audit GPTs on Manus",
          "Automated checklist generation",
          "Centralized client portal",
          "Client satisfaction up 40%"
        ]
      },
      quote: "Our compliance audits went from 20 hours to 7 hours. We can serve 3x more clients with the same team.",
      color: "orange"
    },
    {
      id: 3,
      industry: "Marketing & Creative Services",
      icon: "🎨",
      teamSize: "12 people",
      challenge: "Too many creative tools, team overwhelmed, clients complaining about slow turnaround, $1,800/month in subscriptions",
      before: {
        tools: 22,
        cost: 1800,
        painPoints: [
          "Team spending 2+ hours/day switching between tools",
          "Manual content creation workflows",
          "Client deliverables taking 2-3 weeks",
          "No standardized processes"
        ]
      },
      after: {
        tools: 7,
        cost: 580,
        timeline: "5 weeks",
        stack: ["ChatGPT Team", "Manus", "Gamma", "Captions.ai", "ElevenLabs", "Viralwave Studio", "Canva"]
      },
      results: {
        annualSavings: 15000,
        timeSaved: "20 hours/week across team",
        efficiency: "50% faster client deliverables (2-3 weeks → 1 week)",
        roi: "Month 2",
        additionalWins: [
          "Integrated workflow on Manus",
          "AI-assisted content creation",
          "30% more clients served with same team size",
          "Client retention up 25%"
        ]
      },
      quote: "We cut our tool count by 70% and doubled our output. Our clients are getting deliverables in half the time.",
      color: "purple"
    },
    {
      id: 4,
      industry: "E-commerce & Retail",
      icon: "🛒",
      teamSize: "6 people",
      challenge: "Customer service overwhelmed, manual product descriptions, inventory management chaos, $1,200/month in tools",
      before: {
        tools: 14,
        cost: 1200,
        painPoints: [
          "Manual customer service responses (8+ hour response time)",
          "Writing product descriptions manually (2 hours per product)",
          "Inventory management across multiple platforms",
          "No automation"
        ]
      },
      after: {
        tools: 5,
        cost: 420,
        timeline: "3 weeks",
        stack: ["ChatGPT Team", "Manus", "Shopify", "Email Platform", "Analytics"]
      },
      results: {
        annualSavings: 9000,
        timeSaved: "25 hours/week",
        efficiency: "10x faster product descriptions (2 hours → 12 minutes)",
        roi: "Month 2",
        additionalWins: [
          "AI customer service assistant (built on Manus)",
          "Response time reduced to 2 hours (8 hours → 2 hours)",
          "Customer satisfaction up 35%",
          "Team capacity freed up for growth initiatives"
        ]
      },
      quote: "Product descriptions that took 2 hours now take 12 minutes. We're scaling without hiring.",
      color: "green"
    }
  ];

  const industries = ["All Industries", "Technology", "Professional Services", "Marketing & Creative", "E-commerce"];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-brand-purple/5 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl">
          <div className="text-center space-y-6">
            <Badge className="bg-brand-blue text-white text-base px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              Real Results from Real Businesses
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-purple leading-tight">
              See How We Helped 200+ Organizations
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Consolidate tools, save money, and scale faster with the <strong>Horizon Framework</strong>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-blue">$5K-$24K</div>
                <div className="text-sm text-gray-600">Annual Savings</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-orange">3-5 weeks</div>
                <div className="text-sm text-gray-600">Implementation</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-purple">70%+</div>
                <div className="text-sm text-gray-600">Tool Reduction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12 px-4">
        <div className="container max-w-7xl space-y-16">
          {caseStudies.map((study, index) => (
            <Card key={study.id} className="border-2 hover:shadow-2xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 border-b-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{study.icon}</span>
                    <div>
                      <CardTitle className="text-2xl text-brand-purple">{study.industry}</CardTitle>
                      <CardDescription className="text-base mt-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {study.teamSize}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={`bg-${study.color}-600 text-white text-base px-4 py-2`}>
                    {study.after.timeline} Implementation
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-8 space-y-8">
                {/* Challenge */}
                <div>
                  <h3 className="text-xl font-bold text-brand-purple mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    The Challenge
                  </h3>
                  <p className="text-gray-700 text-base leading-relaxed">{study.challenge}</p>
                </div>

                {/* Before/After Comparison */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Before */}
                  <Card className="border-2 border-red-200 bg-red-50/30">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg text-red-900 flex items-center gap-2">
                        <TrendingDown className="w-5 h-5" />
                        Before: Tool Chaos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Tools:</span>
                        <span className="text-2xl font-bold text-red-600">{study.before.tools}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Monthly Cost:</span>
                        <span className="text-2xl font-bold text-red-600">${study.before.cost}</span>
                      </div>
                      <div className="pt-2 border-t border-red-200">
                        <p className="text-xs font-semibold text-red-900 mb-2">Pain Points:</p>
                        <ul className="space-y-1">
                          {study.before.painPoints.map((point, i) => (
                            <li key={i} className="text-xs text-gray-700 flex items-start gap-2">
                              <span className="text-red-600 mt-0.5">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* After */}
                  <Card className="border-2 border-green-200 bg-green-50/30">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg text-green-900 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        After: Streamlined Stack
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Tools:</span>
                        <span className="text-2xl font-bold text-green-600">{study.after.tools}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-700">Monthly Cost:</span>
                        <span className="text-2xl font-bold text-green-600">${study.after.cost}</span>
                      </div>
                      <div className="pt-2 border-t border-green-200">
                        <p className="text-xs font-semibold text-green-900 mb-2">Recommended Stack:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {study.after.stack.map((tool, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-white">
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Results */}
                <div>
                  <h3 className="text-xl font-bold text-brand-purple mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    The Results
                  </h3>
                  <div className="grid md:grid-cols-4 gap-4 mb-6">
                    <Card className="border-2 border-green-200 bg-green-50/30 text-center">
                      <CardContent className="pt-6">
                        <div className="text-3xl font-bold text-green-600">
                          ${(study.results.annualSavings / 1000).toFixed(0)}K
                        </div>
                        <div className="text-xs text-gray-700 mt-1">Annual Savings</div>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-blue-200 bg-blue-50/30 text-center">
                      <CardContent className="pt-6">
                        <div className="text-3xl font-bold text-blue-600">
                          {study.results.timeSaved}
                        </div>
                        <div className="text-xs text-gray-700 mt-1">Time Saved</div>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-purple-200 bg-purple-50/30 text-center">
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-purple-600">
                          {study.results.efficiency}
                        </div>
                        <div className="text-xs text-gray-700 mt-1">Efficiency Gain</div>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-orange-200 bg-orange-50/30 text-center">
                      <CardContent className="pt-6">
                        <div className="text-3xl font-bold text-orange-600">
                          {study.results.roi}
                        </div>
                        <div className="text-xs text-gray-700 mt-1">ROI Achieved</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-2">
                    {study.results.additionalWins.map((win, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{win}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <Card className="border-2 border-brand-blue bg-brand-blue/5">
                  <CardContent className="pt-6">
                    <blockquote className="text-lg italic text-gray-800">
                      "{study.quote}"
                    </blockquote>
                    <p className="text-sm text-gray-600 mt-3">— {study.industry} Client</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-brand-purple to-brand-blue">
        <div className="container max-w-4xl text-center text-white space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl md:text-2xl opacity-90">
            Join 200+ businesses that have consolidated tools, saved money, and scaled faster
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100 text-lg px-8 py-6 h-auto">
                Book Free 15-Min Audit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
            <a href="/">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto">
                Explore Academy
              </Button>
            </a>
          </div>
          <p className="text-sm opacity-75 pt-4">
            ✓ No credit card required  ✓ 15-minute consultation  ✓ Custom ROI projection
          </p>
        </div>
      </section>
    </div>
  );
}
