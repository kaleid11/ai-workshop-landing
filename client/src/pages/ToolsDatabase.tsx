import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { APP_TITLE, getLoginUrl } from "@/const";
import { ExternalLink, Search, Sparkles, Code, Palette, TrendingUp, Server, Image, DollarSign, Zap, BookOpen, Star } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

interface Tool {
  name: string;
  description: string;
  category: string;
  url: string;
  referralCode?: string;
  discount?: string;
  icon: string;
  featured?: boolean;
  guideUrl?: string;
}

// TOP 3 FEATURED TOOLS
const featuredTools: Tool[] = [
  {
    name: "Manus",
    description: "AI-powered automation platform. Build workflows, agents, and automations with AI. This academy runs on Manus!",
    category: "Automation",
    url: "https://manus.im/invitation/XYJX3HZH1Q1JDVD",
    discount: "Get exclusive access",
    icon: "🤖",
    featured: true,
    guideUrl: "/wiki?guide=manus-mastery",
  },
  {
    name: "Google Workspace",
    description: "Professional email, storage, and collaboration tools. Gmail, Drive, Docs, Sheets, and more - the foundation of modern business.",
    category: "Infrastructure",
    url: "https://referworkspace.app.goo.gl/s6pi",
    discount: "Get 10% off your first year",
    icon: "📧",
    featured: true,
    guideUrl: "/wiki?guide=google-workspace-mastery",
  },
  {
    name: "ChatGPT / Claude",
    description: "Leading AI assistants for content creation, analysis, and automation. Choose ChatGPT Plus or Claude Pro for advanced capabilities.",
    category: "AI & Productivity",
    url: "https://chat.openai.com",
    icon: "⚡",
    featured: true,
    guideUrl: "/wiki?guide=chatgpt-claude-mastery",
  },
];

// FULL TOOLS DATABASE
const tools: Tool[] = [
  // AI & Productivity
  {
    name: "Perplexity AI",
    description: "AI-powered research engine with real-time web search and citations. Perfect for deep research and fact-checking.",
    category: "AI & Productivity",
    url: "https://pplx.ai/huxley82540",
    discount: "Get exclusive access",
    icon: "🔍",
  },
  {
    name: "Lead Gen GPT",
    description: "Custom GPT for B2B lead generation and outreach. Produces compliant, high-quality lead lists aligned to your ICP.",
    category: "AI & Productivity",
    url: "https://chatgpt.com/g/g-68f4618407a08191898be9e84f044326-lead-gen-gpt",
    icon: "🎯",
  },
  {
    name: "Atlas - Prompt Engineer",
    description: "Custom GPT for creating and optimizing prompts. Build better prompts for business, security, crypto, legal, and marketing.",
    category: "AI & Productivity",
    url: "https://chatgpt.com/g/g-68e45c22996c8191ac1a48482ee988ff-atlas-the-prompt-engineer",
    icon: "⚡",
  },
  {
    name: "NotebookLM",
    description: "Google's AI-powered research assistant. Upload documents and get instant insights, summaries, and Q&A.",
    category: "AI & Productivity",
    url: "https://notebooklm.google.com/",
    icon: "📓",
  },
  {
    name: "Speechify",
    description: "AI text-to-speech tool. Listen to documents, articles, and PDFs with natural-sounding voices.",
    category: "AI & Productivity",
    url: "https://share.speechify.com/mzr7vn1",
    discount: "Get discount",
    icon: "🔊",
  },

  // Design & Presentation
  {
    name: "Gamma",
    description: "AI-powered presentation builder. Create beautiful slides, documents, and websites in minutes.",
    category: "Design & Presentation",
    url: "https://gamma.app/signup?r=grh1ow9zxk23qa3",
    discount: "Get discount",
    icon: "🎨",
  },
  {
    name: "Canva",
    description: "Design platform for creating graphics, presentations, and social media content.",
    category: "Design & Presentation",
    url: "https://www.canva.com",
    icon: "🎨",
  },

  // Development & No-Code
  {
    name: "Replit",
    description: "Collaborative browser-based IDE. Code, build, and deploy apps directly from your browser.",
    category: "Development & No-Code",
    url: "https://replit.com/refer/huxley3",
    discount: "Get discount",
    icon: "💻",
  },
  {
    name: "Lovable",
    description: "AI-powered app builder. Build full-stack web apps with natural language prompts.",
    category: "Development & No-Code",
    url: "https://lovable.dev/invite/720f58fd-6934-4452-88e1-d509c0523d52",
    discount: "Get exclusive access",
    icon: "❤️",
  },
  {
    name: "Bolt.new",
    description: "Open-source AI coding assistant. Build and deploy web apps with AI assistance.",
    category: "Development & No-Code",
    url: "https://bolt.new/?rid=3gerli",
    discount: "Get discount",
    icon: "⚡",
  },
  {
    name: "Cursor",
    description: "AI-first code editor. Write code faster with AI-powered completions and chat.",
    category: "Development & No-Code",
    url: "https://cursor.sh",
    icon: "✏️",
  },

  // Marketing & CRM
  {
    name: "Klipy.ai",
    description: "AI-powered CRM and sales automation. Capture leads, automate follow-ups, and close deals faster.",
    category: "Marketing & CRM",
    url: "https://klipy.ai",
    referralCode: "THLKICKSTART",
    discount: "Use code: THLKICKSTART",
    icon: "📊",
  },
  {
    name: "Fireflies.ai",
    description: "AI meeting assistant. Record, transcribe, and summarize meetings automatically.",
    category: "Marketing & CRM",
    url: "https://fireflies.ai/?fpr=techhorizon",
    discount: "Get discount",
    icon: "🎙️",
  },

  // Infrastructure
  {
    name: "SiteGround",
    description: "Fast, secure web hosting with excellent support. Perfect for WordPress and custom sites.",
    category: "Infrastructure",
    url: "https://www.siteground.com/?referrer_id=9541191",
    discount: "Get discount",
    icon: "🌐",
  },

  // AI Media
  {
    name: "Leonardo.ai",
    description: "AI image generation platform. Create stunning visuals, art, and designs with AI.",
    category: "AI Media",
    url: "https://app.leonardo.ai/?via=huxley",
    discount: "Get discount",
    icon: "🎨",
  },
  {
    name: "ViralWave Studio",
    description: "Social media scheduler with AI content generation. Plan, create, and schedule posts across all platforms.",
    category: "AI Media",
    url: "https://viralwavestudio.com?via=huxley17",
    discount: "Get discount",
    icon: "📱",
  },
  {
    name: "Captions.ai",
    description: "AI video editing with auto-captions and avatars. Create professional videos in minutes.",
    category: "AI Media",
    url: "https://www.captions.ai/",
    icon: "🎬",
  },
  {
    name: "Higgsfield",
    description: "AI video generation platform. Create stunning videos from text prompts.",
    category: "AI Media",
    url: "https://higgsfield.ai",
    icon: "🎥",
  },
  {
    name: "CapCut",
    description: "Free video editing app with AI-powered features. Create professional videos on mobile or desktop.",
    category: "AI Media",
    url: "https://www.capcut.com",
    icon: "✂️",
  },

  // Finance & Crypto
  {
    name: "Bybit",
    description: "Cryptocurrency exchange. Trade Bitcoin, Ethereum, and 300+ cryptocurrencies.",
    category: "Finance & Crypto",
    url: "https://www.bybit.com/invite?ref=OBJ26R",
    discount: "Get discount",
    icon: "₿",
  },
  {
    name: "Swyftx",
    description: "Australian crypto exchange. Buy, sell, and trade crypto with low fees.",
    category: "Finance & Crypto",
    url: "https://trade.swyftx.com/register/?promoRef=rf_GML4n2x6PEqdQkVMgTzSki",
    discount: "Get discount",
    icon: "💰",
  },
  {
    name: "Syla",
    description: "Australian crypto tax and accounting software. Simplify crypto tax reporting.",
    category: "Finance & Crypto",
    url: "https://www.syla.com.au/?code=RHKRTUNQ",
    referralCode: "RHKRTUNQ",
    discount: "Use code: RHKRTUNQ",
    icon: "📈",
  },
];

const categories = Array.from(new Set(tools.map((t) => t.category)));

const categoryIcons: Record<string, any> = {
  "AI & Productivity": Sparkles,
  "Design & Presentation": Palette,
  "Development & No-Code": Code,
  "Marketing & CRM": TrendingUp,
  "Infrastructure": Server,
  "AI Media": Image,
  "Finance & Crypto": DollarSign,
  "Automation": Zap,
};

export default function ToolsDatabase() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      searchQuery === "" ||
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-brand-purple cursor-pointer">{APP_TITLE}</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/portal">
              <Button variant="outline" className="border-brand-purple text-brand-purple">
                Portal
              </Button>
            </Link>
            {isAuthenticated && user ? (
              <span className="text-sm text-gray-600">Hi, {user.name}</span>
            ) : (
              <Button onClick={() => (window.location.href = getLoginUrl())}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-brand-purple mb-4">Tools Database</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Curated collection of AI tools, platforms, and services with exclusive discounts. Save time and money with these handpicked recommendations.
          </p>
        </div>

        {/* FEATURED TOOLS SECTION */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-orange to-brand-purple text-white px-6 py-3 rounded-full mb-4">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold text-lg">Top 3 Essential Tools</span>
              <Star className="w-5 h-5 fill-current" />
            </div>
            <p className="text-gray-600 text-lg">
              Start with these three tools - they power everything we do at Tech Horizon Academy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {featuredTools.map((tool, index) => (
              <Card key={tool.name} className="border-4 border-brand-purple hover:shadow-2xl transition-all bg-gradient-to-br from-white to-purple-50">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-6xl">{tool.icon}</div>
                    <Badge className="bg-brand-orange text-white text-sm px-3 py-1">
                      #{index + 1} Essential
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-brand-purple mb-2">{tool.name}</CardTitle>
                  <CardDescription className="text-base text-gray-700">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tool.discount && (
                    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3">
                      <p className="text-green-700 font-bold text-center">{tool.discount}</p>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <a href={tool.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white">
                        Get Started
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </a>
                    {tool.guideUrl && (
                      <Link href={tool.guideUrl}>
                        <Button variant="outline" className="border-purple-300 text-purple-700">
                          <BookOpen className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-lg mb-4">
              💡 <strong>Pro Tip:</strong> Click the book icon to view our step-by-step setup guides for each tool
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-4 border-gray-200 my-12"></div>

        {/* FULL DATABASE SECTION */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-brand-purple mb-4">Full Tools Database</h2>
            <p className="text-xl text-gray-700">
              Explore {tools.length}+ additional tools across 8 categories with exclusive discounts
            </p>
          </div>

          {/* Search & Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search tools by name or description..."
                className="pl-10 py-6 text-lg border-2 border-gray-200 focus:border-brand-purple"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "bg-brand-purple text-white" : ""}
              >
                All Tools
              </Button>
              {categories.map((category) => {
                const Icon = categoryIcons[category] || Sparkles;
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "bg-brand-purple text-white" : ""}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {category}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <Card key={tool.name} className="border-2 border-gray-200 hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-4xl">{tool.icon}</div>
                    <Badge variant="outline" className="text-xs">
                      {tool.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-brand-purple mb-2">{tool.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {tool.discount && (
                    <div className="bg-green-50 border border-green-300 rounded p-2">
                      <p className="text-green-700 text-sm font-semibold text-center">{tool.discount}</p>
                    </div>
                  )}
                  {tool.referralCode && (
                    <div className="bg-blue-50 border border-blue-300 rounded p-2">
                      <p className="text-blue-700 text-xs font-mono text-center">{tool.referralCode}</p>
                    </div>
                  )}
                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white">
                      View Tool
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No tools found matching your search criteria</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
