import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Code2, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function VibeCoding() {
  const { user, isAuthenticated } = useAuth();

  const workshops = {
    lite: [
      {
        title: "No-Code AI App Building",
        date: "Every 1st Tuesday",
        time: "9-11am Brisbane / 10am-12pm Melbourne",
        topics: ["Manus platform deep-dive", "Building AI-powered tools", "Deploying your first app"],
      },
      {
        title: "AI-Assisted Coding Fundamentals",
        date: "Every 3rd Tuesday",
        time: "9-11am Brisbane / 10am-12pm Melbourne",
        topics: ["ChatGPT for code generation", "Cursor AI workflows", "Debugging with AI"],
      },
    ],
    pro: [
      {
        title: "Advanced Replit Development",
        date: "Every 2nd Tuesday",
        time: "9-11am Brisbane / 10am-12pm Melbourne",
        topics: ["Full-stack app development", "Database integration", "API creation and deployment"],
      },
      {
        title: "Custom GPT & Agent Building",
        date: "Every 4th Tuesday",
        time: "9-11am Brisbane / 10am-12pm Melbourne",
        topics: ["Building custom GPTs", "Agent workflows", "Tool integration and function calling"],
      },
    ],
  };

  const curriculum = [
    {
      module: "Module 1: Foundation",
      weeks: "Weeks 1-2",
      topics: [
        "Understanding AI coding tools landscape",
        "Setting up your development environment",
        "Prompt engineering for code generation",
        "Building your first AI-assisted project",
      ],
    },
    {
      module: "Module 2: No-Code Development",
      weeks: "Weeks 3-4",
      topics: [
        "Manus platform mastery",
        "Building AI-powered web apps without code",
        "Database design and management",
        "Deploying and sharing your apps",
      ],
    },
    {
      module: "Module 3: AI-Assisted Coding",
      weeks: "Weeks 5-6",
      topics: [
        "Cursor AI and GitHub Copilot workflows",
        "Replit for rapid prototyping",
        "Code review and refactoring with AI",
        "Testing and debugging strategies",
      ],
    },
    {
      module: "Module 4: Advanced Projects",
      weeks: "Weeks 7-8",
      topics: [
        "Building custom GPTs and agents",
        "API integration and automation",
        "Full-stack application development",
        "Scaling and maintaining AI-built apps",
      ],
    },
  ];

  const tools = [
    { name: "Manus", use: "No-code AI app building", tier: "All" },
    { name: "Cursor AI", use: "AI-powered code editor", tier: "Lite+" },
    { name: "Replit", use: "Cloud-based development", tier: "Pro" },
    { name: "GitHub Copilot", use: "AI pair programmer", tier: "Lite+" },
    { name: "ChatGPT", use: "Code generation and debugging", tier: "All" },
    { name: "Claude", use: "Complex code analysis", tier: "All" },
  ];

  const outcomes = [
    "Build functional web apps without traditional coding",
    "Use AI to write, debug, and refactor code 10x faster",
    "Create custom GPTs and AI agents for your business",
    "Deploy production-ready applications in days, not months",
    "Understand when to use no-code vs. AI-assisted coding",
  ];

  const projectShowcases = [
    {
      title: "Customer Support Chatbot",
      description: "Built with Manus, handles 80% of customer inquiries automatically",
      tier: "Lite",
    },
    {
      title: "Inventory Management System",
      description: "Full-stack app with Replit, integrates with Stripe and email notifications",
      tier: "Pro",
    },
    {
      title: "Content Generation Tool",
      description: "Custom GPT that generates marketing copy following brand guidelines",
      tier: "Pro",
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
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-12 h-12" />
            <Badge className="bg-white text-blue-600 text-lg px-4 py-1">Vibe Coding</Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4">Build Apps with AI, No Coding Required</h1>
          <p className="text-2xl mb-8">
            Learn to build functional web applications using AI-powered no-code platforms and AI-assisted coding tools. 
            From simple chatbots to full-stack apps, create solutions in days instead of months.
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
                        <ArrowRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
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

      {/* Project Showcases */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">Real Projects You'll Build</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projectShowcases.map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Code2 className="w-6 h-6 text-blue-500" />
                    <Badge variant="outline">{project.tier}</Badge>
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">Tools You'll Master</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Sparkles className="w-6 h-6 text-blue-500" />
                    <Badge variant="outline">{tool.tier}</Badge>
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription>{tool.use}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <p className="text-lg">
              <strong>Plus:</strong> Access to 50+ coding prompts, 15+ project templates, 
              and our exclusive AI Coding Toolkit with pre-built components.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Build Your First AI App?</h2>
          <p className="text-xl mb-8">
            Join Vibe Coding and learn to build functional applications with AI-powered tools. 
            No traditional coding experience required. Starting at just $77/month.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing">
              <Button size="lg" variant="secondary">
                View Pricing & Join
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Download Free Coding Prompts
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
