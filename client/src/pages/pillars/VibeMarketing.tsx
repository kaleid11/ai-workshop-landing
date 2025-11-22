import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, TrendingUp, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function VibeMarketing() {
  const { user, isAuthenticated } = useAuth();

  const workshops = {
    lite: [
      {
        title: "AI Content Creation Fundamentals",
        date: "Every 1st Monday",
        time: "9-11am Brisbane / 10am-12pm Melbourne",
        topics: ["RIPE framework deep-dive", "Social media automation", "Email campaign generation"],
      },
      {
        title: "Marketing Automation Workflows",
        date: "Every 3rd Monday",
        time: "9-11am Brisbane / 10am-12pm Melbourne",
        topics: ["End-to-end automation setup", "Tool integration", "Performance tracking"],
      },
    ],
    pro: [
      {
        title: "Advanced Content Strategy",
        date: "Every 2nd Monday",
        time: "9-11am Brisbane / 10am-12pm Melbourne",
        topics: ["Multi-platform content systems", "Brand voice optimization", "A/B testing frameworks"],
      },
      {
        title: "Marketing Analytics & Optimization",
        date: "Every 4th Monday",
        time: "9-11am Brisbane / 10am-12pm Melbourne",
        topics: ["AI-powered analytics", "Conversion optimization", "ROI measurement"],
      },
    ],
  };

  const curriculum = [
    {
      module: "Module 1: Foundation",
      weeks: "Weeks 1-2",
      topics: [
        "Understanding AI marketing tools landscape",
        "Setting up your marketing automation stack",
        "RIPE framework for marketing prompts",
        "Creating your first AI-generated campaign",
      ],
    },
    {
      module: "Module 2: Content Creation",
      weeks: "Weeks 3-4",
      topics: [
        "Social media content at scale",
        "Email marketing automation",
        "Blog post and SEO content generation",
        "Video script writing and storyboarding",
      ],
    },
    {
      module: "Module 3: Automation",
      weeks: "Weeks 5-6",
      topics: [
        "Building content calendars with AI",
        "Automated scheduling and publishing",
        "Cross-platform content repurposing",
        "Engagement tracking and response automation",
      ],
    },
    {
      module: "Module 4: Optimization",
      weeks: "Weeks 7-8",
      topics: [
        "A/B testing AI-generated content",
        "Performance analytics and insights",
        "Conversion rate optimization",
        "Scaling your marketing operations",
      ],
    },
  ];

  const tools = [
    { name: "ChatGPT", use: "Content generation, copywriting", tier: "All" },
    { name: "Claude", use: "Long-form content, research", tier: "All" },
    { name: "Jasper AI", use: "Marketing copy at scale", tier: "Pro" },
    { name: "Copy.ai", use: "Social media posts, ads", tier: "Lite+" },
    { name: "Canva AI", use: "Visual content creation", tier: "All" },
    { name: "Buffer/Hootsuite", use: "Social media scheduling", tier: "Lite+" },
  ];

  const outcomes = [
    "Reduce content creation time by 70%",
    "Generate 30 days of social content in 2 hours",
    "Automate email campaigns with 40%+ open rates",
    "Create high-converting ad copy in minutes",
    "Build a sustainable content system that scales",
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
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-12 h-12" />
            <Badge className="bg-white text-orange-600 text-lg px-4 py-1">Vibe Marketing</Badge>
          </div>
          <h1 className="text-5xl font-bold mb-4">Master AI-Powered Marketing</h1>
          <p className="text-2xl mb-8">
            Learn to create, automate, and scale your marketing with AI. From social media to email campaigns, 
            master the tools and workflows that save 10+ hours per week.
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
                        <ArrowRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
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

      {/* Tools & Resources */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold mb-8">Tools You'll Master</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Sparkles className="w-6 h-6 text-orange-500" />
                    <Badge variant="outline">{tool.tier}</Badge>
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription>{tool.use}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-orange-50 rounded-lg">
            <p className="text-lg">
              <strong>Plus:</strong> Access to 100+ marketing prompts, 20+ workflow templates, 
              and our exclusive Marketing Automation Toolkit.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Marketing?</h2>
          <p className="text-xl mb-8">
            Join Vibe Marketing and learn to create, automate, and scale your marketing with AI. 
            Starting at just $77/month.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pricing">
              <Button size="lg" variant="secondary">
                View Pricing & Join
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Download Free Marketing Prompts
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
