import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Lock, FileText, Video, BookOpen } from "lucide-react";
import { Link } from "wouter";

export default function Resources() {
  const { user, isAuthenticated } = useAuth();

  // Free resources (lead magnets)
  const freeResources = [
    {
      id: 1,
      title: "AI Quick-Start Playbook",
      description: "Get started with AI automation in your business. 10-page guide covering the essentials.",
      type: "PDF Guide",
      icon: FileText,
      downloadUrl: "/resources/AI-Quick-Start-Playbook.pdf",
      badge: "Free",
    },
    {
      id: 2,
      title: "AI Tools Cheatsheet v3",
      description: "Quick reference guide to 50+ essential AI tools organized by use case.",
      type: "Cheatsheet",
      icon: FileText,
      downloadUrl: "/resources/AI-Tools-Cheatsheet-v3.pdf",
      badge: "Free",
    },
    {
      id: 3,
      title: "5 ChatGPT Prompts for Marketing",
      description: "Copy-paste prompts to create social media content, email campaigns, and ad copy.",
      type: "Prompt Pack",
      icon: FileText,
      downloadUrl: "/resources/5-ChatGPT-Prompts-Marketing.pdf",
      badge: "Free",
    },
  ];

  // Member-only resources
  const memberResources = [
    {
      id: 4,
      title: "Complete AI Automation Playbook",
      description: "50-page comprehensive guide covering workflows, tool stacks, and implementation strategies.",
      type: "PDF Guide",
      icon: BookOpen,
      tier: "Starter",
      badge: "Starter+",
    },
    {
      id: 5,
      title: "100+ ChatGPT Prompts Library",
      description: "Full collection of expertly crafted prompts using the RIPE framework for all business functions.",
      type: "Prompt Library",
      icon: FileText,
      tier: "Starter",
      badge: "Starter+",
    },
    {
      id: 6,
      title: "Social Media Automation Workflows",
      description: "Step-by-step workflows to automate content creation, scheduling, and engagement tracking.",
      type: "Workflow Templates",
      icon: FileText,
      tier: "Lite",
      badge: "Lite+",
    },
    {
      id: 7,
      title: "AI Tool Stack Builder",
      description: "Interactive tool to build your custom AI stack based on your business needs and budget.",
      type: "Interactive Tool",
      icon: FileText,
      tier: "Lite",
      badge: "Lite+",
    },
    {
      id: 8,
      title: "Workshop Recording: Vibe Marketing Foundations",
      description: "2-hour deep-dive into AI-powered marketing automation with live demos and Q&A.",
      type: "Video Recording",
      icon: Video,
      tier: "Lite",
      badge: "Lite+",
    },
    {
      id: 9,
      title: "Custom GPT Library (Atlas, Lead Gen GPT, etc.)",
      description: "Access to 10+ custom-built GPTs for specific business functions.",
      type: "GPT Collection",
      icon: FileText,
      tier: "Pro",
      badge: "Pro+",
    },
    {
      id: 10,
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
            <a className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Tech Horizon Academy
            </a>
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

      {/* Free Resources Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Free Resources</h2>
            <p className="text-gray-600">
              Download these resources to get started with AI automation. No account required.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {freeResources.map((resource) => {
              const Icon = resource.icon;
              return (
                <Card key={resource.id}>
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
                        Unlock with {resource.tier}
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
