import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  Zap,
  Building2,
  Target,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  FileText,
  Database,
  Mail,
  Search,
  BarChart3,
  FileSpreadsheet,
  Briefcase,
  Scale,
  Lock,
  Globe,
  Cpu,
  Sparkles,
  Award,
  Calendar,
  MessageSquare,
  Settings
} from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Enterprise() {
  const [roiInputs, setRoiInputs] = useState({
    employees: 20,
    avgSalary: 75000,
    hoursPerWeek: 5
  });

  const calculateROI = () => {
    const { employees, avgSalary, hoursPerWeek } = roiInputs;
    const hourlyRate = avgSalary / 52 / 40;
    const weeklyTimeSaved = employees * hoursPerWeek;
    const weeklySavings = weeklyTimeSaved * hourlyRate;
    const annualSavings = weeklySavings * 52;
    const implementationCost = 5000 + (employees * 140 * 12); // Setup + monthly support
    const netSavings = annualSavings - implementationCost;
    const roi = ((netSavings / implementationCost) * 100).toFixed(0);
    const breakEvenWeeks = Math.ceil(implementationCost / weeklySavings);
    
    return {
      annualSavings: Math.round(annualSavings),
      implementationCost: Math.round(implementationCost),
      netSavings: Math.round(netSavings),
      roi,
      breakEvenWeeks
    };
  };

  const roi = calculateROI();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner */}
      <div className="bg-brand-purple text-white">
        <div className="container flex items-center justify-between py-3 px-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 flex-shrink-0" />
            <span className="text-xs md:text-sm font-semibold">
              Enterprise AI Transformation • Book Your Audit Today
            </span>
          </div>
          <Link href="/" className="flex-shrink-0 ml-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hover:text-white text-xs md:text-sm px-3 md:px-4 py-1 h-auto">
              ← Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] via-[rgb(var(--brand-purple))] to-[rgb(var(--brand-blue))] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container relative py-16 md:py-24">
          <div className="max-w-4xl">
            <Badge className="mb-6 bg-brand-orange text-white text-sm">Enterprise Solutions</Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Enterprise AI Transformation—
              <br />
              <span className="text-brand-orange">Without the Complexity, Cost, or Risk</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl">
              We've distilled 18 months of working with 200+ businesses into a proven system you can implement in 4 weeks. Security-first. ROI-guaranteed. Future-proof.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-8 py-6 h-auto">
                Book Your AI Audit <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 h-auto backdrop-blur-sm">
                Download Case Studies
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-brand-orange mb-1">200+</div>
                <div className="text-sm text-white/80">Businesses Coached</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-orange mb-1">4 weeks</div>
                <div className="text-sm text-white/80">Implementation Time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-orange mb-1">$180K</div>
                <div className="text-sm text-white/80">Avg. Annual Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-brand-orange mb-1">3 months</div>
                <div className="text-sm text-white/80">ROI Guarantee</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Why Traditional AI Consulting Fails
            </h2>
            <p className="text-xl text-gray-600">
              You know AI is critical. But the path forward is unclear, expensive, and risky.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-red-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Prohibitive Costs</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Big consultancies charge $50K-$150K for discovery alone. Then another $200K+ for implementation. Most SMBs can't justify the investment.
                </p>
                <div className="text-sm text-red-600 font-semibold">
                  Traditional cost: $250K+ over 12 months
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Slow Time to Value</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  6-12 month engagements with endless discovery phases. By the time they deliver, the AI landscape has shifted and your team has lost momentum.
                </p>
                <div className="text-sm text-red-600 font-semibold">
                  Traditional timeline: 6-12 months to first result
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Security Afterthought</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Most consultants focus on features first, security later. For regulated industries (finance, healthcare, government), this is a non-starter.
                </p>
                <div className="text-sm text-red-600 font-semibold">
                  Result: Compliance failures and data breaches
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Settings className="w-6 h-6 text-red-600" />
                  </div>
                  <CardTitle className="text-xl">Custom Everything</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  They build from scratch every time. No proven frameworks, no pre-built tools, no repeatability. You're paying for them to learn on your dime.
                </p>
                <div className="text-sm text-red-600 font-semibold">
                  Result: Unpredictable outcomes and scope creep
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Horizon Framework - Detailed */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand-purple text-white">Our Proven Methodology</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              The Horizon Framework
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A productized, repeatable system for enterprise AI transformation. Tested with 200+ businesses. Proven ROI in 3 months.
            </p>
          </div>

          <div className="space-y-12 max-w-5xl mx-auto">
            {/* Phase 1: Innovate */}
            <Card className="border-2 border-brand-orange">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-brand-orange">1</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Innovate: Discovery & Audit</CardTitle>
                    <CardDescription>Week 1 • $2,500 fixed price</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  We start with a comprehensive diagnostic of your business—not a vague "strategy session." You get a detailed AI Roadmap Report with your top 3 automation opportunities and exact ROI projections.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Security Readiness Check</div>
                      <div className="text-xs text-gray-600">Compliance audit before deployment</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">AI Opportunity Scan</div>
                      <div className="text-xs text-gray-600">Workflow mapping and automation scoring</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Compliance Assessment</div>
                      <div className="text-xs text-gray-600">Industry-specific requirements (GDPR, SOC 2, etc.)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Migration Planning</div>
                      <div className="text-xs text-gray-600">From personal accounts to business workspace</div>
                    </div>
                  </div>
                </div>
                <div className="bg-brand-orange/10 p-4 rounded-lg">
                  <div className="font-semibold text-brand-orange mb-2">Deliverable:</div>
                  <p className="text-sm text-gray-700">
                    AI Roadmap Report with top 3 opportunities, ROI projections, security recommendations, and phased implementation plan.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Phase 2: Forge */}
            <Card className="border-2 border-brand-blue">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-brand-blue">2</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Forge: Setup & Deployment</CardTitle>
                    <CardDescription>Week 2-3 • $5K-$15K based on scope</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  We deploy your business workspace and install 25+ pre-built AI assistants. No custom development—these are proven tools we've refined with 200+ businesses.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Business Workspace Setup</div>
                      <div className="text-xs text-gray-600">Centralized control and billing</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">25+ Pre-Built Assistants</div>
                      <div className="text-xs text-gray-600">Lead gen, compliance, research, operations</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Security Configuration</div>
                      <div className="text-xs text-gray-600">SSO, data residency, audit logs</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Tool Integration</div>
                      <div className="text-xs text-gray-600">Connect to your existing stack</div>
                    </div>
                  </div>
                </div>
                <div className="bg-brand-blue/10 p-4 rounded-lg">
                  <div className="font-semibold text-brand-blue mb-2">Deliverable:</div>
                  <p className="text-sm text-gray-700">
                    Fully configured business workspace with pre-built assistants, security controls, and integration with your existing tools.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Phase 3: Grow */}
            <Card className="border-2 border-brand-green">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-brand-green">3</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Grow: Training & Adoption</CardTitle>
                    <CardDescription>Week 3-4 • Included in setup</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  We train your team to use the tools effectively. Hands-on workshops, prompt engineering fundamentals, and role-specific training—not death-by-PowerPoint.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Hands-On Workshops</div>
                      <div className="text-xs text-gray-600">2-hour sessions for each department</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Prompt Engineering Fundamentals</div>
                      <div className="text-xs text-gray-600">Chain-of-thought, self-consistency, etc.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Role-Specific Training</div>
                      <div className="text-xs text-gray-600">Sales, marketing, operations, compliance</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Ongoing Resources</div>
                      <div className="text-xs text-gray-600">Video library, prompt templates, best practices</div>
                    </div>
                  </div>
                </div>
                <div className="bg-brand-green/10 p-4 rounded-lg">
                  <div className="font-semibold text-brand-green mb-2">Deliverable:</div>
                  <p className="text-sm text-gray-700">
                    Trained team with hands-on experience, prompt library, and ongoing resource access for continuous learning.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Phase 4: Scale */}
            <Card className="border-2 border-brand-purple">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-brand-purple">4</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Scale: Support & Optimization</CardTitle>
                    <CardDescription>Ongoing • $140/user/month</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Monthly support desk, usage monitoring, and quarterly optimization reviews. We help you discover new use cases and continuously improve ROI.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Monthly Support Desk</div>
                      <div className="text-xs text-gray-600">Slack/email support with 4-hour SLA</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Usage Monitoring</div>
                      <div className="text-xs text-gray-600">Track adoption and ROI metrics</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">New Use Cases</div>
                      <div className="text-xs text-gray-600">Discover additional automation opportunities</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Quarterly Optimization</div>
                      <div className="text-xs text-gray-600">Review sessions and roadmap updates</div>
                    </div>
                  </div>
                </div>
                <div className="bg-brand-purple/10 p-4 rounded-lg">
                  <div className="font-semibold text-brand-purple mb-2">Deliverable:</div>
                  <p className="text-sm text-gray-700">
                    Ongoing support, usage reports, quarterly optimization reviews, and continuous ROI improvement.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Phase 5: Trust */}
            <Card className="border-2 border-brand-dark-purple">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-brand-dark-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-brand-dark-purple">5</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Trust: Compliance & Governance</CardTitle>
                    <CardDescription>Continuous • Included in support</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Continuous monitoring, audit-ready documentation, and compliance updates. For regulated industries, this is non-negotiable.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-dark-purple flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Continuous Monitoring</div>
                      <div className="text-xs text-gray-600">Real-time security and compliance alerts</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-dark-purple flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Audit-Ready Documentation</div>
                      <div className="text-xs text-gray-600">Logs, policies, and compliance reports</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-dark-purple flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Data Residency Controls</div>
                      <div className="text-xs text-gray-600">Geographic data storage requirements</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-dark-purple flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">SOC 2 Infrastructure</div>
                      <div className="text-xs text-gray-600">Enterprise-grade security standards</div>
                    </div>
                  </div>
                </div>
                <div className="bg-brand-dark-purple/10 p-4 rounded-lg">
                  <div className="font-semibold text-brand-dark-purple mb-2">Deliverable:</div>
                  <p className="text-sm text-gray-700">
                    Continuous compliance monitoring, audit-ready documentation, and security updates to maintain regulatory standards.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pre-Built Assistants Gallery */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand-blue text-white">25+ Pre-Built Tools</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Ready-to-Deploy AI Assistants
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not starting from scratch. These are proven tools refined with 200+ businesses—ready to deploy in your workspace on day one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Lead Generation */}
            <Card className="border-2 hover:border-brand-orange transition-colors">
              <CardHeader>
                <Target className="w-10 h-10 text-brand-orange mb-3" />
                <CardTitle className="text-lg">Lead Generation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>ICP Research Assistant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Outbound Email Writer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>LinkedIn Outreach</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Lead Qualification Bot</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Compliance & Legal */}
            <Card className="border-2 hover:border-brand-blue transition-colors">
              <CardHeader>
                <Scale className="w-10 h-10 text-brand-blue mb-3" />
                <CardTitle className="text-lg">Compliance & Legal</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Contract Review Assistant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Policy Document Generator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Compliance Checker</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Risk Assessment Tool</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Research & Analysis */}
            <Card className="border-2 hover:border-brand-green transition-colors">
              <CardHeader>
                <Search className="w-10 h-10 text-brand-green mb-3" />
                <CardTitle className="text-lg">Research & Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>Market Research Assistant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>Competitor Analysis Tool</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>Data Analyst</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>Report Generator</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Operations */}
            <Card className="border-2 hover:border-brand-purple transition-colors">
              <CardHeader>
                <Settings className="w-10 h-10 text-brand-purple mb-3" />
                <CardTitle className="text-lg">Operations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Meeting Notes Assistant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Email Response Writer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Document Summarizer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Task Prioritization Bot</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Content & Marketing */}
            <Card className="border-2 hover:border-brand-orange transition-colors">
              <CardHeader>
                <Sparkles className="w-10 h-10 text-brand-orange mb-3" />
                <CardTitle className="text-lg">Content & Marketing</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Social Media Manager</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Blog Post Writer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>SEO Optimizer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Ad Copy Generator</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Customer Success */}
            <Card className="border-2 hover:border-brand-blue transition-colors">
              <CardHeader>
                <Users className="w-10 h-10 text-brand-blue mb-3" />
                <CardTitle className="text-lg">Customer Success</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Onboarding Assistant</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Support Ticket Classifier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>FAQ Generator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Feedback Analyzer</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Finance & Reporting */}
            <Card className="border-2 hover:border-brand-green transition-colors">
              <CardHeader>
                <BarChart3 className="w-10 h-10 text-brand-green mb-3" />
                <CardTitle className="text-lg">Finance & Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>Invoice Processor</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>Expense Categorizer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>Financial Report Writer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>Budget Analyzer</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* HR & Recruitment */}
            <Card className="border-2 hover:border-brand-purple transition-colors">
              <CardHeader>
                <Briefcase className="w-10 h-10 text-brand-purple mb-3" />
                <CardTitle className="text-lg">HR & Recruitment</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Job Description Writer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Resume Screener</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Interview Question Generator</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Performance Review Assistant</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Plus custom assistants tailored to your industry and workflows.
            </p>
            <Button size="lg" className="bg-brand-blue hover:bg-brand-blue/90">
              Request Full Assistant Catalog <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand-orange text-white">Calculate Your ROI</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              See Your Potential Savings
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Adjust the inputs to see how much your organization could save with AI automation.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">ROI Calculator</CardTitle>
                <CardDescription>Conservative estimates based on 200+ implementations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Inputs */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Number of Employees</label>
                    <input
                      type="number"
                      value={roiInputs.employees}
                      onChange={(e) => setRoiInputs({...roiInputs, employees: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Avg. Salary (AUD)</label>
                    <input
                      type="number"
                      value={roiInputs.avgSalary}
                      onChange={(e) => setRoiInputs({...roiInputs, avgSalary: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Hours Saved/Week/Person</label>
                    <input
                      type="number"
                      value={roiInputs.hoursPerWeek}
                      onChange={(e) => setRoiInputs({...roiInputs, hoursPerWeek: parseInt(e.target.value) || 0})}
                      className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:border-brand-orange"
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                  <div className="space-y-4">
                    <div className="bg-brand-orange/10 p-6 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Annual Time Savings Value</div>
                      <div className="text-4xl font-bold text-brand-orange">
                        ${roi.annualSavings.toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Implementation Cost (Year 1)</div>
                      <div className="text-2xl font-bold text-gray-900">
                        ${roi.implementationCost.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Setup + 12 months support
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-brand-green/10 p-6 rounded-lg">
                      <div className="text-sm text-gray-600 mb-1">Net Savings (Year 1)</div>
                      <div className="text-4xl font-bold text-brand-green">
                        ${roi.netSavings.toLocaleString()}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-brand-blue/10 p-4 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">ROI</div>
                        <div className="text-2xl font-bold text-brand-blue">{roi.roi}%</div>
                      </div>
                      <div className="bg-brand-purple/10 p-4 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Break-Even</div>
                        <div className="text-2xl font-bold text-brand-purple">{roi.breakEvenWeeks} weeks</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm mb-1">Conservative Estimate</div>
                      <div className="text-xs text-gray-600">
                        Based on {roiInputs.hoursPerWeek} hours saved per person per week. Many clients see 10-15 hours saved after full adoption.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm mb-1">3-Month ROI Guarantee</div>
                      <div className="text-xs text-gray-600">
                        If you don't see measurable time savings within 3 months, we'll continue working at no additional cost until you do.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-4">
                  <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90">
                    Book Your AI Audit <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cloneable Resource Library */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-brand-purple text-white">The Future of Consulting</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
                This Academy Platform?
                <br />
                <span className="text-brand-orange">We Can Build It for Your Organization.</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Imagine having your own branded knowledge base—policies, handbooks, training materials, AI tools—accessible to your entire team. That's what we mean by "cloneable resource library."
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-2">
                <CardHeader>
                  <Database className="w-12 h-12 text-brand-orange mb-4" />
                  <CardTitle className="text-xl">Centralized Knowledge Base</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    All your policies, procedures, training materials, and AI tools in one place. No more scattered Google Docs or outdated SharePoint sites.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span>Custom branding and domain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span>Role-based access control</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span>Search and filtering</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <Globe className="w-12 h-12 text-brand-blue mb-4" />
                  <CardTitle className="text-xl">Self-Service Training</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    New hires can onboard themselves. Team members can find answers without bothering you. Everyone has access to the latest version of everything.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>Video tutorials and guides</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>Downloadable templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>Interactive workshops</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-brand-purple bg-gradient-to-br from-brand-purple/5 to-brand-blue/5">
              <CardHeader>
                <div className="text-center">
                  <Cpu className="w-16 h-16 text-brand-purple mx-auto mb-4" />
                  <CardTitle className="text-2xl mb-2">Built on Manus Platform</CardTitle>
                  <CardDescription>
                    The same platform powering this academy—now available for your organization
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-brand-orange" />
                    </div>
                    <div className="font-semibold text-sm mb-1">Fast Deployment</div>
                    <div className="text-xs text-gray-600">Live in 2-3 weeks</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Lock className="w-6 h-6 text-brand-blue" />
                    </div>
                    <div className="font-semibold text-sm mb-1">Secure & Compliant</div>
                    <div className="text-xs text-gray-600">SOC 2, GDPR ready</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Settings className="w-6 h-6 text-brand-purple" />
                    </div>
                    <div className="font-semibold text-sm mb-1">Fully Customizable</div>
                    <div className="text-xs text-gray-600">Your brand, your content</div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg">
                  <div className="font-semibold mb-3">What's Included:</div>
                  <div className="grid md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                      <span>Custom domain and branding</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                      <span>User authentication and SSO</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                      <span>Content management system</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                      <span>File storage and downloads</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                      <span>Video hosting and streaming</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                      <span>Analytics and usage tracking</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                      <span>Mobile-responsive design</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                      <span>Ongoing hosting and support</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-6 bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 rounded-lg">
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                      <div className="text-sm font-semibold text-brand-purple mb-2">Custom Academy Pricing</div>
                      <div className="text-3xl font-bold text-brand-purple mb-2">$15K-$25K</div>
                      <p className="text-sm text-gray-600">
                        One-time setup + $500-$1,500/month hosting & support (based on users)
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Includes: Custom branding, content migration, 2-3 week deployment, training, ongoing support
                      </p>
                    </div>
                    <div className="text-center md:text-right">
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>This is the future of consulting</strong>—productized, scalable, and proven. See it in action.
                      </p>
                      <a href="https://app.klipy.ai/book/pre-discovery/free-pre-discovery" target="_blank" rel="noopener noreferrer">
                        <Button size="lg" className="bg-brand-purple hover:bg-brand-purple/90">
                          Request Academy Demo <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 italic">
                    💡 <strong>Real Example:</strong> This entire academy platform (workshops, resources, portal, payment system) was built on Manus in 18 months. We can replicate it for your organization in 2-3 weeks.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Transparency */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              No hidden fees. No scope creep. Fixed-price audit, clear implementation costs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-xl mb-2">AI Opportunity Audit</CardTitle>
                <div className="text-4xl font-bold text-brand-orange mb-2">$2,500</div>
                <CardDescription>Fixed price • 1 week</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Comprehensive business diagnostic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Top 3 automation opportunities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Exact ROI projections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Security & compliance assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Phased implementation roadmap</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-brand-blue relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-brand-blue text-white">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pt-6">
                <CardTitle className="text-xl mb-2">Automation Accelerator</CardTitle>
                <div className="text-4xl font-bold text-brand-blue mb-2">$5K-$15K</div>
                <CardDescription>Based on scope • 2-3 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Business workspace setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>25+ pre-built AI assistants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Security configuration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Tool integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Team training included</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-xl mb-2">Transformation Partner</CardTitle>
                <div className="text-4xl font-bold text-brand-purple mb-2">$140</div>
                <CardDescription>Per user/month • Ongoing</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Monthly support desk (4-hour SLA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Usage monitoring & ROI tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Quarterly optimization reviews</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Continuous compliance monitoring</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>New use case discovery</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table */}
          <div className="max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">vs. Traditional Consultancies</CardTitle>
                <CardDescription>Why we're 5-10x more cost-effective</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2">
                        <th className="text-left py-3 px-4">Factor</th>
                        <th className="text-left py-3 px-4">Traditional Consultancies</th>
                        <th className="text-left py-3 px-4 bg-brand-purple/5">Tech Horizon Labs</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">Discovery Cost</td>
                        <td className="py-3 px-4 text-gray-600">$50K-$150K</td>
                        <td className="py-3 px-4 bg-brand-purple/5 font-semibold text-brand-purple">$2,500 fixed</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">Time to First Result</td>
                        <td className="py-3 px-4 text-gray-600">6-12 months</td>
                        <td className="py-3 px-4 bg-brand-purple/5 font-semibold text-brand-purple">4 weeks</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">Implementation</td>
                        <td className="py-3 px-4 text-gray-600">Custom from scratch</td>
                        <td className="py-3 px-4 bg-brand-purple/5 font-semibold text-brand-purple">25+ pre-built tools</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">Security Approach</td>
                        <td className="py-3 px-4 text-gray-600">Afterthought</td>
                        <td className="py-3 px-4 bg-brand-purple/5 font-semibold text-brand-purple">First priority</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 font-semibold">Total Year 1 Cost (20 users)</td>
                        <td className="py-3 px-4 text-gray-600">$250K+</td>
                        <td className="py-3 px-4 bg-brand-purple/5 font-semibold text-brand-purple">~$40K</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-semibold">ROI Guarantee</td>
                        <td className="py-3 px-4 text-gray-600">None</td>
                        <td className="py-3 px-4 bg-brand-purple/5 font-semibold text-brand-purple">3 months or we keep working</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-purple/5 to-brand-blue/5 border-t-4 border-brand-purple">
        <div className="container">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-brand-purple text-white text-base px-4 py-2">Security-First Approach</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-6">
              Enterprise-Grade Security & Compliance
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto">
              Built on Australian Government's ASD Essential Eight framework—preventing 98% of cyber attacks
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <Card className="border-2 border-brand-purple/20">
              <CardContent className="pt-6 text-center">
                <div className="text-5xl font-bold text-brand-purple mb-2">98%</div>
                <div className="text-lg font-semibold mb-2">Attack Prevention Rate</div>
                <p className="text-sm text-gray-600">
                  ASD Essential Eight framework blocks 98% of cyber attacks before they reach your systems
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-500/20">
              <CardContent className="pt-6 text-center">
                <div className="text-5xl font-bold text-red-600 mb-2">$56K</div>
                <div className="text-lg font-semibold mb-2">Average Breach Cost</div>
                <p className="text-sm text-gray-600">
                  Australian SMBs lose an average of $56,000 per cyber incident—we help you avoid this
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-500/20">
              <CardContent className="pt-6 text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">4 Weeks</div>
                <div className="text-lg font-semibold mb-2">To Audit-Ready</div>
                <p className="text-sm text-gray-600">
                  From security nightmare to compliance-ready documentation in just 4 weeks
                </p>
              </CardContent>
            </Card>
          </div>

          {/* ASD Essential Eight Framework */}
          <div className="max-w-5xl mx-auto mb-12">
            <Card className="border-2 border-brand-purple">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Shield className="w-6 h-6 text-brand-purple" />
                  ASD Essential Eight Framework
                </CardTitle>
                <CardDescription>
                  Australian Government's baseline security standard—we implement all 8 controls from day 1
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Application Control</div>
                      <p className="text-sm text-gray-600">Only approved AI tools can be used—no shadow IT</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Patch Applications</div>
                      <p className="text-sm text-gray-600">Automated updates for all platforms—no vulnerabilities</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Multi-Factor Authentication</div>
                      <p className="text-sm text-gray-600">SSO + MFA enforced across all tools</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Restrict Admin Privileges</div>
                      <p className="text-sm text-gray-600">Role-based access control—least privilege principle</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Patch Operating Systems</div>
                      <p className="text-sm text-gray-600">Cloud-based platforms—always up to date</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">User Application Hardening</div>
                      <p className="text-sm text-gray-600">Secure configurations for ChatGPT, Manus, all tools</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Regular Backups</div>
                      <p className="text-sm text-gray-600">Automated daily backups—disaster recovery ready</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold">Daily Backups</div>
                      <p className="text-sm text-gray-600">Tested restore procedures—no data loss</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Compliance Documentation */}
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 border-brand-blue">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <FileText className="w-6 h-6 text-brand-blue" />
                  Audit-Ready Documentation
                </CardTitle>
                <CardDescription>
                  Everything you need for compliance audits, insurance, and client due diligence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Security Policies & Procedures
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• AI Acceptable Use Policy</li>
                      <li>• Data Classification & Handling</li>
                      <li>• Incident Response Plan</li>
                      <li>• Business Continuity Plan</li>
                      <li>• Third-Party Risk Assessment</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      Compliance Checklists
                    </h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• ASD Essential Eight Compliance Matrix</li>
                      <li>• ISO 27001 Gap Analysis</li>
                      <li>• GDPR/Privacy Act Checklist</li>
                      <li>• Industry-Specific Requirements</li>
                      <li>• Quarterly Security Reviews</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Included in all Enterprise packages:</strong> Complete documentation package, quarterly security reviews, and ongoing compliance support. Ready for audits from day 1.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Common concerns from enterprise decision-makers
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What industries do you work with?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We've worked with 200+ businesses across finance, healthcare, professional services, government, e-commerce, and more. Our security-first approach makes us especially strong in regulated industries where compliance is critical.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How is this different from hiring a data science team?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Data science teams build custom models. We deploy proven, pre-built AI assistants that work out of the box. You get results in weeks, not years, at a fraction of the cost. Plus, we handle security, compliance, and ongoing optimization.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What if our team is already using personal AI accounts?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  This is extremely common—and risky. We help you migrate from personal accounts to a centralized business workspace with proper security controls, data governance, and audit logs. Your team keeps using AI, but now you have visibility and compliance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do we need technical expertise on our team?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  No. Our tools are designed for non-technical users. We provide hands-on training, prompt libraries, and ongoing support. If your team can use email and Slack, they can use our AI assistants.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What's the 3-month ROI guarantee?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  If you don't see measurable time savings within 3 months of implementation, we'll continue working at no additional cost until you do. We track usage, adoption, and ROI metrics monthly to ensure you're getting value.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can we start small and scale up?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Absolutely. Most clients start with the AI Opportunity Audit ($2.5K) to identify their top 3 opportunities, then implement one system with the Automation Accelerator ($5K-$15K). Once they see results, they expand to more departments and use cases.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] via-[rgb(var(--brand-purple))] to-[rgb(var(--brand-blue))] text-white">
        <div className="container">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Transform Your Organization?
            </h2>
            <p className="text-xl text-white/90">
              Book your AI Opportunity Audit today. Get a detailed roadmap with exact ROI projections in 1 week.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-8 py-6 h-auto">
                Book Your Audit - $2,500 <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 h-auto backdrop-blur-sm">
                Download Case Studies
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Fixed-price audit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>4-week implementation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>3-month ROI guarantee</span>
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
                Enterprise AI transformation without the complexity, cost, or risk.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Enterprise</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">AI Opportunity Audit</a></li>
                <li><a href="#" className="hover:text-white">Automation Accelerator</a></li>
                <li><a href="#" className="hover:text-white">Transformation Partner</a></li>
                <li><a href="#" className="hover:text-white">Resource Library</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/resources" className="hover:text-white">Tools & Prompts</Link></li>
                <li><Link href="/calendar" className="hover:text-white">Workshop Calendar</Link></li>
                <li><a href="#" className="hover:text-white">Case Studies</a></li>
                <li><a href="#" className="hover:text-white">ROI Calculator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><a href="https://techhorizonlabs.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">About Us</a></li>
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
