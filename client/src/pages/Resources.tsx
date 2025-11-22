import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Lock, FileText, Video, BookOpen, Sparkles, CheckCircle2, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Resources() {
  const { user, isAuthenticated } = useAuth();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleChecklistItem = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Free resources (lead magnets)
  const freeResources = [
    {
      id: 1,
      title: "Getting Started with ChatGPT",
      description: "Complete beginner's guide with RIPE framework, hands-on exercises, and quick reference card. Perfect for first-time AI users.",
      type: "PDF Guide",
      icon: FileText,
      downloadUrl: "/resources/Getting-Started-with-ChatGPT.pdf",
      badge: "Free",
      isNew: true,
    },
    {
      id: 2,
      title: "5 ChatGPT Prompts for Marketing",
      description: "Copy-paste prompts for social media, email campaigns, ad copy, blog posts, and video scripts. Includes RIPE framework template.",
      type: "Prompt Pack",
      icon: FileText,
      downloadUrl: "/resources/5-ChatGPT-Marketing-Prompts.pdf",
      badge: "Free",
      isNew: true,
    },
    {
      id: 3,
      title: "AI Quick-Start Playbook",
      description: "Go from zero to results in 15 minutes. Platform comparison, 3-step activation formula, and quick-win opportunities.",
      type: "PDF Guide",
      icon: FileText,
      downloadUrl: "/resources/AI-Quick-Start-Playbook.pdf",
      badge: "Free",
    },
    {
      id: 4,
      title: "AI Tools Cheatsheet v3",
      description: "Quick reference guide to 50+ essential AI tools organized by use case, pricing, and complexity level.",
      type: "Cheatsheet",
      icon: FileText,
      downloadUrl: "/resources/AI-Tools-Cheatsheet-v3.pdf",
      badge: "Free",
    },
  ];

  // Free GPT resources
  const freeGPTs = [
    {
      id: "huxleygpt",
      title: "HuxleyGPT",
      description: "Your personal AI business advisor trained on Tech Horizon frameworks. Get instant answers to AI automation questions.",
      url: "https://chatgpt.com/g/g-691673823e548191bee75149c19c021f-huxleygpt",
      badge: "Free GPT",
      icon: Sparkles,
    },
  ];

  // Interactive quick-start checklist
  const quickStartChecklist = [
    { id: "signup", label: "Sign up for ChatGPT (free account)" },
    { id: "download", label: "Download 'Getting Started with ChatGPT' guide" },
    { id: "exercise1", label: "Complete Exercise 1: Write your first RIPE prompt" },
    { id: "exercise2", label: "Complete Exercise 2: Refine and iterate" },
    { id: "exercise3", label: "Complete Exercise 3: Real business task" },
    { id: "save", label: "Save your best prompts to a prompt library" },
    { id: "share", label: "Share your results in the Facebook group" },
  ];

  // Member-only resources
  const memberResources = [
    {
      id: 5,
      title: "ChatGPT Business Setup Guide",
      description: "Complete implementation guide for teams. Covers licensing, security, MFA, integrations, custom GPTs, and rollout strategy.",
      type: "PDF Guide",
      icon: BookOpen,
      tier: "Starter",
      badge: "Starter+",
    },
    {
      id: 6,
      title: "100+ ChatGPT Prompts Library",
      description: "Full collection of expertly crafted prompts using the RIPE framework for all business functions.",
      type: "Prompt Library",
      icon: FileText,
      tier: "Starter",
      badge: "Starter+",
    },
    {
      id: 7,
      title: "Social Media Automation Workflows",
      description: "Step-by-step workflows to automate content creation, scheduling, and engagement tracking.",
      type: "Workflow Templates",
      icon: FileText,
      tier: "Lite",
      badge: "Lite+",
    },
    {
      id: 8,
      title: "AI Tool Stack Builder",
      description: "Interactive tool to build your custom AI stack based on your business needs and budget.",
      type: "Interactive Tool",
      icon: FileText,
      tier: "Lite",
      badge: "Lite+",
    },
    {
      id: 9,
      title: "Workshop Recording: Vibe Marketing Foundations",
      description: "2-hour deep-dive into AI-powered marketing automation with live demos and Q&A.",
      type: "Video Recording",
      icon: Video,
      tier: "Lite",
      badge: "Lite+",
    },
    {
      id: 10,
      title: "Custom GPT Library (Atlas, Lead Gen GPT, etc.)",
      description: "Access to 10+ custom-built GPTs for specific business functions.",
      type: "GPT Collection",
      icon: FileText,
      tier: "Pro",
      badge: "Pro+",
    },
    {
      id: 11,
      title: "Advanced Coding Workflows (Replit + Cursor)",
      description: "Technical workflows for building AI-powered apps without traditional coding.",
      type: "Technical Guide",
      icon: FileText,
      tier: "Pro",
      badge: "Pro+",
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
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-12 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">Resource Library</h1>
          <p className="text-xl mb-6">
            Playbooks, cheatsheets, workflows, and templates to accelerate your AI journey.
          </p>
        </div>
      </section>

      {/* Quick-Start Checklist */}
      <section className="py-12 px-4 bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold mb-2">🚀 Quick-Start Checklist</h2>
            <p className="text-gray-600">
              Follow these 7 steps to go from zero to AI-powered in 30 minutes.
            </p>
          </div>

          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="space-y-3">
                {quickStartChecklist.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => toggleChecklistItem(item.id)}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      checkedItems[item.id]
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300"
                    }`}>
                      {checkedItems[item.id] && (
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className={`text-lg ${
                      checkedItems[item.id]
                        ? "line-through text-gray-400"
                        : "text-gray-700"
                    }`}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Pro Tip:</strong> Complete all 7 steps today and share your first AI-generated result in our{" "}
                  <a
                    href="https://facebook.com/groups/YOUR_GROUP_ID"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-semibold"
                  >
                    Facebook community
                  </a>{" "}
                  to get feedback from Huxley and the team!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Free Resources Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Free Resources</h2>
            <p className="text-gray-600">
              Download these resources to get started with AI automation. No account required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {freeResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card key={resource.id} className="relative">
                  {resource.isNew && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-orange-500 text-white">New!</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Icon className="w-8 h-8 text-blue-500" />
                      <Badge className="bg-green-100 text-green-700">{resource.badge}</Badge>
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-gray-600">{resource.type}</p>
                  </CardContent>

                  <CardFooter>
                    <Button className="w-full" asChild>
                      <a href={resource.downloadUrl} download>
                        <Download className="w-4 h-4 mr-2" />
                        Download Free
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Free GPTs Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Free Custom GPTs</h3>
            <p className="text-gray-600 mb-6">
              Use these custom GPTs to get instant answers and guidance on your AI journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {freeGPTs.map((gpt) => {
              const Icon = gpt.icon;
              return (
                <Card key={gpt.id} className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Icon className="w-8 h-8 text-purple-500" />
                      <Badge className="bg-purple-100 text-purple-700">{gpt.badge}</Badge>
                    </div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {gpt.title}
                      <Sparkles className="w-5 h-5 text-purple-500" />
                    </CardTitle>
                    <CardDescription>{gpt.description}</CardDescription>
                  </CardHeader>

                  <CardFooter>
                    <Button className="w-full bg-purple-500 hover:bg-purple-600" asChild>
                      <a href={gpt.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Try HuxleyGPT
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>

          {/* Member Resources Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Member Resources</h2>
            <p className="text-gray-600">
              Unlock premium guides, workflows, and recordings with an academy membership.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memberResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card key={resource.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Icon className="w-8 h-8 text-gray-400" />
                      <Badge variant="outline">{resource.badge}</Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Lock className="w-4 h-4 text-gray-400" />
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-gray-600">{resource.type}</p>
                  </CardContent>

                  <CardFooter>
                    <Button className="w-full" variant="outline" asChild>
                      <Link href="/pricing">
                        <span>Unlock with {resource.tier}</span>
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Get Full Access to All Resources</h2>
          <p className="text-xl mb-8">
            Join Tech Horizon Academy and unlock 20+ premium guides, 100+ prompts, 
            workshop recordings, and custom GPTs. Starting at just $27.
          </p>
          <Link href="/pricing">
            <Button size="lg" variant="secondary">
              View Membership Options
            </Button>
          </Link>
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
