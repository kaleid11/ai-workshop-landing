import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Brain,
  Users,
  Target,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";
import { Link } from "wouter";

const BOOKING_URL = "https://app.klipy.ai/book/pre-discovery/free-pre-discovery";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-brand-purple via-brand-blue to-brand-orange overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 text-base px-4 py-2">
              Our Story & Approach
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              You Don't Need to Be a<br />
              <span className="text-brand-orange">"Computer Person"</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              We built this system over 18 months, tested it with 200+ businesses, and distilled it into simple workflows anyone can follow. No coding. No jargon. Just results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100">
                  Book Free 15-Min Audit <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link href="/enterprise">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                  See Enterprise Solutions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem We Solve */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                The Problem: AI Feels Overwhelming
              </h2>
              <p className="text-xl text-gray-700">
                Most businesses know they need AI, but they're paralyzed by complexity, security concerns, and fear of making the wrong choice.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-2xl">😰</span> What They're Told
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li>• "You need a data scientist"</li>
                    <li>• "Hire a $150K/year AI engineer"</li>
                    <li>• "Build custom models"</li>
                    <li>• "6-12 month implementation"</li>
                    <li>• "$50K-$150K consulting fees"</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-2xl">✅</span> What We Say
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li>• "No technical skills required"</li>
                    <li>• "Use your existing team"</li>
                    <li>• "Pre-built tools & workflows"</li>
                    <li>• "3-5 week implementation"</li>
                    <li>• "$5K-$15K one-time setup"</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Computational Thinking Approach */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-purple/5 to-brand-blue/5">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-brand-purple text-white">Our Philosophy</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-6">
                Computational Thinking:<br />
                <span className="text-brand-blue">Problem-Solving, Not Programming</span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                We teach you to think like a systems designer—breaking down complex problems into simple, repeatable steps. No code required.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              <Card className="text-center border-2 hover:border-brand-purple transition-all">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-brand-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8 text-brand-purple" />
                  </div>
                  <h3 className="font-bold mb-2">Decomposition</h3>
                  <p className="text-sm text-gray-600">
                    Break big problems into small, manageable pieces
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-brand-blue transition-all">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-brand-blue" />
                  </div>
                  <h3 className="font-bold mb-2">Pattern Recognition</h3>
                  <p className="text-sm text-gray-600">
                    Spot similarities across different tasks
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-brand-orange transition-all">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-brand-orange" />
                  </div>
                  <h3 className="font-bold mb-2">Abstraction</h3>
                  <p className="text-sm text-gray-600">
                    Focus on what matters, ignore the noise
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-2 hover:border-green-600 transition-all">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-bold mb-2">Algorithms</h3>
                  <p className="text-sm text-gray-600">
                    Create step-by-step solutions that work every time
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-brand-purple bg-white">
              <CardHeader>
                <CardTitle className="text-2xl">Real Example: Lead Generation Automation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-purple text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                    <div>
                      <div className="font-semibold">Decomposition</div>
                      <p className="text-sm text-gray-600">Break "get more leads" into: find prospects → research company → craft message → send email → follow up</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-blue text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                    <div>
                      <div className="font-semibold">Pattern Recognition</div>
                      <p className="text-sm text-gray-600">Notice you do this same process for every prospect—just with different names and companies</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-orange text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                    <div>
                      <div className="font-semibold">Abstraction</div>
                      <p className="text-sm text-gray-600">Realize the core task is "personalized outreach at scale"—the tool doesn't matter</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                    <div>
                      <div className="font-semibold">Algorithm</div>
                      <p className="text-sm text-gray-600">Build a workflow: ChatGPT finds prospects → researches company → writes email → sends via Gmail → schedules follow-up</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800">
                    <strong>Result:</strong> What took 2 hours per prospect now takes 5 minutes. No coding. No data science. Just clear thinking + the right tools.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Horizon Framework */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-brand-blue text-white">Our Methodology</Badge>
              <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-6">
                The Horizon Framework:<br />
                <span className="text-brand-blue">5 Pillars of AI Transformation</span>
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Developed over 18 months, tested with 200+ businesses, and proven to deliver ROI in 3 months.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="border-2 border-brand-purple hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-purple text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <span>Innovate: Discover AI Opportunities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">
                    We audit your current workflows and identify the top 5-10 processes where AI can save time or money.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                      <span>Process mapping</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                      <span>ROI estimation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                      <span>Quick win identification</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-brand-blue hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <span>Forge: Build Your AI Stack</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">
                    We consolidate your tools from 15+ to 3-5 core platforms, then build custom workflows on Manus.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>Tool consolidation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>Custom GPT assistants</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                      <span>Workflow automation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-brand-orange hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-orange text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <span>Grow: Train Your Team</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">
                    We teach your team computational thinking and prompt engineering—no coding required.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span>Live workshops</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span>Prompt libraries</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                      <span>Ongoing support</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-600 hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                    <span>Scale: Expand Across Organization</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">
                    We roll out proven workflows to other departments and build your custom academy platform.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Department rollout</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Custom academy clone</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Process documentation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-600 hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">5</div>
                    <span>Trust: Secure & Govern</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">
                    We implement ASD Essential Eight security, compliance documentation, and governance policies.
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Security audit</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Compliance docs</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Governance policies</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Why We're Different
              </h2>
              <p className="text-xl text-gray-700">
                We're not consultants who charge by the hour. We're operators who built a system and now we're installing it for you.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 hover:border-brand-purple transition-all">
                <CardHeader>
                  <Sparkles className="w-12 h-12 text-brand-purple mb-4" />
                  <CardTitle>Productized Expertise</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    We've already built the system. You're not paying us to figure it out—you're paying us to install what works.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-brand-blue transition-all">
                <CardHeader>
                  <TrendingUp className="w-12 h-12 text-brand-blue mb-4" />
                  <CardTitle>ROI-Driven</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Every recommendation is tied to time saved or money made. No vanity metrics. No "AI for AI's sake."
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:border-brand-orange transition-all">
                <CardHeader>
                  <Shield className="w-12 h-12 text-brand-orange mb-4" />
                  <CardTitle>Security-First</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Built on ASD Essential Eight. Audit-ready from day 1. No shortcuts. No "we'll fix security later."
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-purple via-brand-blue to-brand-orange text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Book a free 15-minute audit and we'll show you exactly where AI can save you time and money.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100">
                  Book Free Audit <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
              <Link href="/case-studies">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
                  See Case Studies
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
