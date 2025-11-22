import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Target, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function VibeAlignment() {
  const { user, isAuthenticated } = useAuth();

  const workshops = {
    lite: [
      {
        title: "Horizon Framework Deep-Dive",
        date: "Every 1st Wednesday",
        time: "9-11am Brisbane / 10am-12pm Melbourne",
        topics: ["Innovate → Forge → Grow → Scale → Trust stages", "Assessing your current stage", "Creating your AI roadmap"],
      },
      {
        title: "Team Alignment & Change Management",
        date: "Every 3rd Wednesday",
        time: "9-11am Brisbane / 10am-12pm Melbourne",
        topics: ["Getting team buy-in for AI", "Training and upskilling strategies", "Measuring AI adoption success"],
      },
    ],
    pro: [
      {
        title: "Strategic AI Implementation",
        date: "Every 2nd Wednesday",
        time: "9-11am Brisbane / 10am-12pm Melbourne",
        topics: ["Building your AI tech stack", "Process mapping and optimization", "ROI tracking and reporting"],
      },
      {
        title: "Advanced Frameworks & Scaling",
        date: "Every 4th Wednesday",
        time: "9-11am Brisbane / 10am-12pm Melbourne",
        topics: ["Custom workflow design", "Cross-department integration", "Building AI-first culture"],
      },
    ],
  };

  const curriculum = [
    {
      module: "Module 1: Foundation",
      weeks: "Weeks 1-2",
      topics: [
        "Understanding the Horizon AI Framework",
        "Assessing your business stage (Innovate/Forge/Grow/Scale/Trust)",
        "Identifying AI opportunities in your operations",
        "Creating your personalized AI roadmap",
      ],
    },
    {
      module: "Module 2: Team Alignment",
      weeks: "Weeks 3-4",
      topics: [
        "Getting leadership and team buy-in",
        "Training strategies for different skill levels",
        "Change management best practices",
        "Building internal AI champions",
      ],
    },
    {
      module: "Module 3: Implementation",
      weeks: "Weeks 5-6",
      topics: [
        "Process mapping and workflow optimization",
        "Selecting the right tools for your stack",
        "Pilot programs and proof-of-concept projects",
        "Measuring success and ROI",
      ],
    },
    {
      module: "Module 4: Scaling & Culture",
      weeks: "Weeks 7-8",
      topics: [
        "Scaling AI across departments",
        "Building sustainable AI workflows",
        "Creating an AI-first company culture",
        "Long-term strategy and continuous improvement",
      ],
    },
  ];

  const frameworks = [
    { name: "Horizon AI Framework", use: "5-stage business growth model", tier: "All" },
    { name: "RIPE Prompting", use: "Role, Instructions, Parameters, Examples", tier: "All" },
    { name: "AI Readiness Assessment", use: "Evaluate your AI maturity", tier: "Lite+" },
    { name: "Tech Stack Builder", use: "Design your ideal AI toolkit", tier: "Pro" },
    { name: "ROI Calculator", use: "Measure AI implementation value", tier: "Lite+" },
    { name: "Change Management Playbook", use: "Guide teams through AI adoption", tier: "Pro" },
  ];

  const outcomes = [
    "Align your team around a clear AI vision and strategy",
    "Create a customized AI roadmap for your business stage",
    "Successfully implement AI without disrupting operations",
    "Measure and demonstrate ROI from AI investments",
    "Build a sustainable, AI-first company culture",
  ];

  const caseStudies = [
    {
      title: "Law Firm Transformation",
      description: "50-person firm reduced admin time by 15 hours/week using AI document automation",
      stage: "Grow → Scale",
    },
    {
      title: "E-commerce Scale-Up",
      description: "Online retailer automated customer service, handling 80% of inquiries with AI",
      stage: "Forge → Grow",
    },
    {
      title: "Consulting Firm Evolution",
      description: "10-person consultancy built AI-powered proposal system, winning 40% more deals",
      stage: "Innovate → Forge",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent cursor-pointer">
              Tech Horizon Academy
            </span>
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/portal">
                  <Button variant="outline">Portal</Button>
                </Link>
                <span className="text-sm text-gray-600">Hi, {user?.name}</span>
              </>
            ) : (
              <Link href="/pricing">
                <Button>Join Academy</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-12 h-12" />
            <Badge className="bg-white text-green-600 text-lg px-4 py-1">Vibe Alignment</Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4">Align Your Team, Scale Your AI</h1>
          <p className="text-2xl mb-8">
            Learn to create AI strategies that actually work. From getting team buy-in to measuring ROI, 
            master the frameworks that help 200+ businesses successfully implement AI.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
              <Calendar className="w-5 h-5" />
              <span>2-4 workshops/month</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5" />
              <span>2-hour live sessions</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg">
              <Users className="w-5 h-5" />
              <span>Lite & Pro tiers</span>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {outcomes.map((outcome, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-lg">{outcome}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Schedule */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">Workshop Schedule</h2>
          
          {/* Lite Tier Workshops */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-blue-100 text-blue-700">Lite Academy</Badge>
              <span className="text-gray-600">2 workshops per month</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {workshops.lite.map((workshop, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{workshop.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" />
                        <span>{workshop.time}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold mb-2">Topics Covered:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {workshop.topics.map((topic, i) => (
                        <li key={i} className="text-gray-700">{topic}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pro Tier Workshops */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-purple-100 text-purple-700">Pro Academy</Badge>
              <span className="text-gray-600">4 workshops per month (includes Lite workshops)</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {workshops.pro.map((workshop, index) => (
                <Card key={index} className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle>{workshop.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Calendar className="w-4 h-4" />
                        <span>{workshop.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" />
                        <span>{workshop.time}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold mb-2">Topics Covered:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {workshop.topics.map((topic, i) => (
                        <li key={i} className="text-gray-700">{topic}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">8-Week Curriculum</h2>
          <div className="space-y-6">
            {curriculum.map((module, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{module.module}</CardTitle>
                    <Badge variant="outline">{module.weeks}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="grid md:grid-cols-2 gap-3">
                    {module.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <ArrowRight className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">Real Business Transformations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((caseStudy, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Target className="w-6 h-6 text-green-500" />
                    <Badge variant="outline">{caseStudy.stage}</Badge>
                  </div>
                  <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
                  <CardDescription>{caseStudy.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Frameworks & Tools */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">Frameworks You'll Master</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks.map((framework, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Sparkles className="w-6 h-6 text-green-500" />
                    <Badge variant="outline">{framework.tier}</Badge>
                  </div>
                  <CardTitle className="text-lg">{framework.name}</CardTitle>
                  <CardDescription>{framework.use}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-green-50 rounded-lg">
            <p className="text-lg">
              <strong>Plus:</strong> Access to strategic templates, assessment tools, 
              and our exclusive AI Implementation Playbook used by 200+ businesses.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-500 to-teal-500 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Align Your Team Around AI?</h2>
          <p className="text-xl mb-8">
            Join Vibe Alignment and learn the frameworks that help businesses successfully implement AI. 
            From strategy to execution. Starting at just $77/month.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing">
              <Button size="lg" variant="secondary">
                View Pricing & Join
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Download Free AI Readiness Assessment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Tech Horizon Labs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
