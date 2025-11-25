import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  DollarSign,
  Clock,
  TrendingUp,
  Sparkles,
  Mail
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

type QuizAnswers = {
  teamSize: string;
  industry: string;
  toolCount: string;
  budget: string;
  technical: string;
  currentTools: string;
};

type ToolRecommendation = {
  name: string;
  cost: string;
  description: string;
  category: string;
};

export default function ToolStackAuditQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({
    teamSize: "",
    industry: "",
    toolCount: "",
    budget: "",
    technical: "",
    currentTools: ""
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: "teamSize",
      question: "What's your team size?",
      options: [
        { value: "solo", label: "Solo (just me)", icon: "👤" },
        { value: "small", label: "Small team (2-10 people)", icon: "👥" },
        { value: "medium", label: "Medium team (11-50 people)", icon: "👨‍👩‍👧‍👦" },
        { value: "large", label: "Large organization (50+ people)", icon: "🏢" }
      ]
    },
    {
      id: "industry",
      question: "What's your primary industry?",
      options: [
        { value: "marketing", label: "Marketing & Creative", icon: "🎨" },
        { value: "tech", label: "Technology & Software", icon: "💻" },
        { value: "professional", label: "Professional Services", icon: "💼" },
        { value: "ecommerce", label: "E-commerce & Retail", icon: "🛒" },
        { value: "other", label: "Other", icon: "🌐" }
      ]
    },
    {
      id: "toolCount",
      question: "How many AI/SaaS tools are you currently paying for?",
      options: [
        { value: "0-5", label: "0-5 tools", icon: "📱" },
        { value: "6-10", label: "6-10 tools", icon: "📦" },
        { value: "11-15", label: "11-15 tools", icon: "📚" },
        { value: "16+", label: "16+ tools", icon: "🗄️" }
      ]
    },
    {
      id: "budget",
      question: "What's your monthly tool budget?",
      options: [
        { value: "under200", label: "Under $200/month", icon: "💵" },
        { value: "200-500", label: "$200-$500/month", icon: "💰" },
        { value: "500-1000", label: "$500-$1,000/month", icon: "💸" },
        { value: "1000-2000", label: "$1,000-$2,000/month", icon: "💳" },
        { value: "2000+", label: "$2,000+/month", icon: "🏦" }
      ]
    },
    {
      id: "technical",
      question: "What's your team's technical capability?",
      options: [
        { value: "non-technical", label: "Non-technical (need simple, no-code solutions)", icon: "🎯" },
        { value: "some-technical", label: "Some technical skills (can handle basic integrations)", icon: "⚙️" },
        { value: "highly-technical", label: "Highly technical (comfortable with APIs and coding)", icon: "🔧" }
      ]
    },
    {
      id: "currentTools",
      question: "Which of these tools are you currently paying for?",
      options: [
        { value: "airtable", label: "Airtable (database/project management)", icon: "🗃️" },
        { value: "forms", label: "Form software (Typeform, Jotform, etc.)", icon: "📋" },
        { value: "monday", label: "Monday.com (project management)", icon: "📅" },
        { value: "zapier", label: "Zapier or other automation tools", icon: "⚡" },
        { value: "none", label: "None of these", icon: "❌" }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const submitAssessment = trpc.assessment.submit.useMutation({
    onSuccess: (data) => {
      toast.success("Report sent! Check your inbox and download below.");
      
      // Download PDF immediately
      if (data.pdfBase64) {
        const blob = new Blob(
          [Uint8Array.from(atob(data.pdfBase64), c => c.charCodeAt(0))],
          { type: "application/pdf" }
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "tool-audit-report.pdf";
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    onError: (error) => {
      toast.error("Failed to send report. Please try again.");
      console.error("Assessment submission error:", error);
    },
  });

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const recommendations = getRecommendations();
    const roi = calculateROI();

    submitAssessment.mutate({
      name: name || email.split("@")[0],
      email,
      assessmentType: "quick",
      score: recommendations.length,
      answers: answers as Record<string, any>,
      recommendations: recommendations.map(r => r.name),
      source: "quiz-page",
    });
  };

  const getRecommendations = (): ToolRecommendation[] => {
    const recommendations: ToolRecommendation[] = [
      {
        name: "ChatGPT Team",
        cost: "$25-30/user/month",
        description: "Foundation for all AI work - conversational AI, automation, research",
        category: "Core AI"
      },
      {
        name: "Manus",
        cost: "$20-40/user/month",
        description: "Replaces Zapier, Typeform, Webflow, basic CRM - custom tools, forms, landing pages, automation",
        category: "Core Platform"
      }
    ];

    // Add connector-based recommendations based on current tools
    if (answers.currentTools === "airtable") {
      recommendations.push({
        name: "Notion + ChatGPT/Manus Connectors",
        cost: "$10/user/month (saves $10-35/user/month)",
        description: "Replace Airtable with Notion database + AI connectors for automation. Savings: $120-$420/year per user",
        category: "Connector Integration"
      });
    }

    if (answers.currentTools === "forms") {
      recommendations.push({
        name: "Gmail + Notion + Manus Automation",
        cost: "Free-$10/month (saves $25-70/month)",
        description: "Replace form software with Gmail connector + Notion database + automated workflows. Savings: $300-$840/year",
        category: "Connector Integration"
      });
    }

    if (answers.currentTools === "monday") {
      recommendations.push({
        name: "ChatGPT Monday.com Connector OR Notion Alternative",
        cost: "Included in ChatGPT Pro (or replace entirely)",
        description: "Option 1: Keep Monday.com + add ChatGPT connector for AI automation. Option 2: Replace with Notion + Manus (save $108-$228/year per user)",
        category: "Connector Integration"
      });
    }

    if (answers.currentTools === "zapier") {
      recommendations.push({
        name: "Manus MCP Connectors",
        cost: "Included in Manus subscription",
        description: "Replace Zapier with Manus native connectors: Gmail, Notion, Stripe, HubSpot, Google Calendar, GitHub. Save $20-50/month",
        category: "Connector Integration"
      });
    }

    // Add industry-specific tools based on answers
    if (answers.industry === "marketing") {
      recommendations.push(
        {
          name: "Gamma",
          cost: "$15/month",
          description: "AI-powered presentations and pitch decks - replaces Canva Pro",
          category: "Content Creation"
        },
        {
          name: "Captions.ai",
          cost: "$20/month",
          description: "AI video editing and captions - replaces Descript",
          category: "Video Production"
        },
        {
          name: "Reap.video",
          cost: "$29/month (AppSumo lifetime deal available)",
          description: "Repurpose long videos into shorts - coming: full video editing suite",
          category: "Video Production"
        },
        {
          name: "Riverside.fm",
          cost: "$19-79/month",
          description: "Studio-quality podcast recording and live streaming",
          category: "Content Creation"
        },
        {
          name: "ElevenLabs",
          cost: "$11/month",
          description: "AI voice generation and text-to-speech for ads and content",
          category: "Audio Production"
        }
      );
    }

    if (answers.industry === "tech") {
      recommendations.push(
        {
          name: "Replit",
          cost: "$20/user/month",
          description: "AI-powered collaborative coding and rapid prototyping",
          category: "Development"
        },
        {
          name: "Gamma",
          cost: "$15/month",
          description: "AI presentations for pitch decks and product demos",
          category: "Content Creation"
        }
      );
      
      if (answers.technical === "highly-technical") {
        recommendations.push({
          name: "Opus Pro",
          cost: "$9-29/month",
          description: "AI video clipping with Adobe Premiere Pro integration",
          category: "Video Production"
        });
      }
    }

    if (answers.industry === "professional") {
      recommendations.push(
        {
          name: "Gamma",
          cost: "$15/month",
          description: "Professional presentations and proposals",
          category: "Content Creation"
        },
        {
          name: "ElevenLabs",
          cost: "$11/month",
          description: "AI voice for training materials and presentations",
          category: "Audio Production"
        },
        {
          name: "Custom Compliance GPTs",
          cost: "Included in ChatGPT Team",
          description: "Industry-specific compliance and audit assistants",
          category: "Professional Services"
        }
      );
    }

    if (answers.industry === "ecommerce") {
      recommendations.push(
        {
          name: "Gamma",
          cost: "$15/month",
          description: "Product presentations and marketing materials",
          category: "Content Creation"
        },
        {
          name: "Captions.ai",
          cost: "$20/month",
          description: "Product demo videos and social media content",
          category: "Video Production"
        },
        {
          name: "Custom E-commerce Tools",
          cost: "Built on Manus",
          description: "Product descriptions, customer service automation, inventory alerts",
          category: "E-commerce Operations"
        }
      );
    }

    // Add universal tools based on team size and budget
    if (answers.teamSize !== "solo") {
      // For teams, add collaboration tools
      if (!recommendations.find(r => r.name === "Riverside.fm") && answers.budget !== "under200") {
        recommendations.push({
          name: "Riverside.fm",
          cost: "$19-79/month",
          description: "Team podcasts, webinars, and internal training videos",
          category: "Content Creation"
        });
      }
    }

    // Add video tools for higher budgets
    if ((answers.budget === "500-1000" || answers.budget === "1000-2000" || answers.budget === "2000+") && 
        !recommendations.find(r => r.name === "Reap.video")) {
      recommendations.push({
        name: "Reap.video",
        cost: "$29/month (AppSumo lifetime deal available)",
        description: "Repurpose content into shorts - full editing suite coming soon",
        category: "Video Production"
      });
    }

    // Ensure we always have at least 7-8 tools
    if (recommendations.length < 7) {
      const additionalTools = [
        {
          name: "Gamma",
          cost: "$15/month",
          description: "AI-powered presentations and documents",
          category: "Content Creation"
        },
        {
          name: "ElevenLabs",
          cost: "$11/month",
          description: "AI voice generation for content and training",
          category: "Audio Production"
        },
        {
          name: "Captions.ai",
          cost: "$20/month",
          description: "AI video editing and social media content",
          category: "Video Production"
        }
      ];

      for (const tool of additionalTools) {
        if (!recommendations.find(r => r.name === tool.name) && recommendations.length < 8) {
          recommendations.push(tool);
        }
      }
    }

    return recommendations;
  };

  const calculateROI = () => {
    let currentCost = 0;
    
    // Estimate current cost based on budget or tool count
    if (answers.budget === "under200") currentCost = 150;
    else if (answers.budget === "200-500") currentCost = 350;
    else if (answers.budget === "500-1000") currentCost = 750;
    else if (answers.budget === "1000-2000") currentCost = 1500;
    else if (answers.budget === "2000+") currentCost = 2500;
    else {
      // Estimate from tool count if budget not specified
      const toolCount = answers.toolCount.includes("+") ? 18 : parseInt(answers.toolCount.split("-")[1] || "5");
      currentCost = toolCount * 80; // Average $80/tool
    }

    // Calculate recommended stack cost based on actual tools
    const recommendations = getRecommendations();
    let recommendedCost = 0;
    
    // Calculate actual cost from recommended tools
    const teamMultiplier = answers.teamSize === "solo" ? 1 : 
                          answers.teamSize === "small" ? 3 : 
                          answers.teamSize === "medium" ? 8 : 15;
    
    // Base costs for recommended stack
    recommendedCost = 25 + 30; // ChatGPT Team + Manus base
    
    if (answers.industry === "marketing") {
      recommendedCost += 15 + 20 + 29 + 40 + 11; // Gamma + Captions + Reap + Riverside (mid-tier) + ElevenLabs
    } else if (answers.industry === "tech") {
      recommendedCost += 20 + 15; // Replit + Gamma
      if (answers.technical === "highly-technical") {
        recommendedCost += 19; // Opus Pro
      }
    } else if (answers.industry === "professional") {
      recommendedCost += 15 + 11; // Gamma + ElevenLabs
    } else if (answers.industry === "ecommerce") {
      recommendedCost += 15 + 20; // Gamma + Captions
    }
    
    // Add team multiplier for per-user tools (ChatGPT, Manus, Replit)
    const perUserCost = 25 + 30 + (answers.industry === "tech" ? 20 : 0);
    recommendedCost = recommendedCost - perUserCost + (perUserCost * teamMultiplier);

    const monthlySavings = Math.max(0, currentCost - recommendedCost);
    const annualSavings = monthlySavings * 12;
    
    // Time savings value - more realistic based on tool count
    const currentToolCount = answers.toolCount.includes("+") ? 18 : 
                            parseInt(answers.toolCount.split("-")[1] || "5");
    const recommendedToolCount = recommendations.length;
    const toolReduction = Math.max(0, currentToolCount - recommendedToolCount);
    
    // Each tool saved = 2 hours/week in management overhead
    const hoursSaved = Math.max(5, toolReduction * 2);
    const hourlyRate = answers.teamSize === "large" ? 150 : 
                      answers.teamSize === "medium" ? 100 : 
                      answers.teamSize === "small" ? 75 : 50;
    const timeValue = hoursSaved * hourlyRate * 52;

    return {
      currentCost,
      recommendedCost,
      monthlySavings,
      annualSavings,
      hoursSaved,
      timeValue,
      totalROI: annualSavings + timeValue
    };
  };

  const currentQuestion = questions[step];
  const recommendations = getRecommendations();
  const roi = calculateROI();

  if (showResults) {
    return (
      <div className="space-y-8">
        {/* Results Header */}
        <div className="text-center space-y-4">
          <Badge className="bg-green-600 text-white text-base px-4 py-2">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Your Personalized Tool Stack
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold text-brand-purple">
            Here's Your Recommended Stack
          </h3>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Based on your answers, we recommend consolidating to <strong>{recommendations.length} core tools</strong>
          </p>
        </div>

        {/* ROI Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-2 border-green-200 bg-green-50/30">
            <CardHeader className="text-center pb-3">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-2xl text-green-900">
                ${roi.annualSavings.toLocaleString()}
              </CardTitle>
              <CardDescription className="text-green-700 font-semibold">
                Annual Savings
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-gray-700">
              ${roi.currentCost}/mo → ${roi.recommendedCost}/mo
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 bg-blue-50/30">
            <CardHeader className="text-center pb-3">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-2xl text-blue-900">
                {roi.hoursSaved} hours/week
              </CardTitle>
              <CardDescription className="text-blue-700 font-semibold">
                Time Saved
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-gray-700">
              Worth ${roi.timeValue.toLocaleString()}/year
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-purple-50/30">
            <CardHeader className="text-center pb-3">
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-2xl text-purple-900">
                ${roi.totalROI.toLocaleString()}
              </CardTitle>
              <CardDescription className="text-purple-700 font-semibold">
                Total Annual ROI
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center text-sm text-gray-700">
              Savings + Time Value
            </CardContent>
          </Card>
        </div>

        {/* What Manus Replaces */}
        <Card className="max-w-4xl mx-auto border-2 border-brand-orange bg-gradient-to-br from-brand-orange/10 to-brand-purple/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-brand-purple mb-2">
              💡 How Manus Saves You Money
            </CardTitle>
            <CardDescription className="text-base text-gray-700">
              One platform replaces multiple expensive subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-bold text-red-600 mb-3 flex items-center gap-2">
                  <span className="text-2xl">❌</span> Without Manus ($200-500/mo)
                </h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Zapier: $30-70/mo</li>
                  <li>• Typeform: $25-50/mo</li>
                  <li>• Webflow: $14-39/mo</li>
                  <li>• HubSpot CRM: $45-90/mo</li>
                  <li>• Airtable: $20-45/mo</li>
                  <li>• Make.com: $9-29/mo</li>
                  <li className="font-semibold pt-2 border-t">Total: $143-323/month</li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-green-600 mb-3 flex items-center gap-2">
                  <span className="text-2xl">✅</span> With Manus ($20-40/user/mo)
                </h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>✓ Custom automation workflows</li>
                  <li>✓ Unlimited forms & surveys</li>
                  <li>✓ Landing pages & websites</li>
                  <li>✓ Built-in CRM & database</li>
                  <li>✓ Data tables & spreadsheets</li>
                  <li>✓ API integrations & webhooks</li>
                  <li className="font-semibold pt-2 border-t text-green-600">Save: $103-283/month = ${(103 * 12).toLocaleString()}-${(283 * 12).toLocaleString()}/year</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-brand-purple/10 rounded-lg text-center">
              <p className="text-sm font-semibold text-brand-purple">
                🎯 Plus: No-code interface means your team can build tools without hiring developers
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Tools */}
        <div className="max-w-5xl mx-auto">
          <h4 className="text-2xl font-bold text-brand-purple mb-6 text-center">
            Your Complete Recommended Stack ({recommendations.length} Tools)
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {recommendations.map((tool, index) => (
              <Card key={index} className="border-2 hover:border-brand-blue transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <Badge variant="outline" className="mt-2 text-xs">{tool.category}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-brand-blue">{tool.cost}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Email Capture */}
        <Card className="max-w-2xl mx-auto border-2 border-brand-orange bg-brand-orange/5">
          <CardHeader className="text-center">
            <Sparkles className="w-12 h-12 text-brand-orange mx-auto mb-3" />
            <CardTitle className="text-2xl">Get Your Full Audit Report</CardTitle>
            <CardDescription className="text-base">
              Enter your email to receive a detailed PDF with implementation roadmap, pricing breakdown, and connector integration guide
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-base">Your Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 h-12 text-base"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-base">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 h-12 text-base"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full bg-brand-orange hover:bg-brand-orange/90 h-12 text-base">
                <Mail className="w-5 h-5 mr-2" />
                Send Me the Full Report
              </Button>
              <p className="text-xs text-center text-gray-600">
                We'll also include a case study relevant to your industry
              </p>
            </form>
          </CardContent>
        </Card>

        {/* Connector Disclaimer */}
        {(answers.currentTools === "airtable" || answers.currentTools === "forms" || answers.currentTools === "monday" || answers.currentTools === "zapier") && (
          <Card className="max-w-3xl mx-auto border-2 border-blue-200 bg-blue-50/30">
            <CardContent className="pt-6">
              <p className="text-sm text-gray-700 text-center">
                <strong className="text-brand-purple">📋 Connector Integration Note:</strong> These recommendations include tool consolidation using Manus and ChatGPT native connectors. <strong>Book a free 15-minute consultation to confirm this setup will work for your specific workflows and requirements.</strong> Actual savings may vary based on your current subscriptions and usage patterns.
              </p>
            </CardContent>
          </Card>
        )}

        {/* CTA */}
        <div className="text-center space-y-4 pt-8">
          <p className="text-lg text-gray-700">
            Want to discuss your specific needs and confirm connector compatibility?
          </p>
          <a href="https://app.klipy.ai/book/pre-discovery/free-pre-discovery" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-brand-purple hover:bg-brand-purple/90 text-lg px-8 py-6 h-auto">
              Book Free 15-Min Consultation
            </Button>
          </a>
        </div>

        {/* Restart Quiz */}
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              setStep(0);
              setAnswers({
                teamSize: "",
                industry: "",
                toolCount: "",
                budget: "",
                technical: "",
                currentTools: ""
              });
              setName("");
              setEmail("");
              setShowResults(false);
            }}
            className="text-brand-blue hover:text-brand-blue/80"
          >
            ← Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">
            Question {step + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(((step + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-brand-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <Card className="border-2 border-brand-blue">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-2xl md:text-3xl text-brand-purple">
            {currentQuestion.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQuestion.id, option.value)}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all hover:border-brand-blue hover:bg-brand-blue/5 ${
                answers[currentQuestion.id as keyof QuizAnswers] === option.value
                  ? "border-brand-blue bg-brand-blue/10"
                  : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{option.icon}</span>
                <span className="text-base font-medium text-gray-900">{option.label}</span>
                {answers[currentQuestion.id as keyof QuizAnswers] === option.value && (
                  <CheckCircle2 className="w-5 h-5 text-brand-blue ml-auto" />
                )}
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          variant="ghost"
          onClick={handleBack}
          disabled={step === 0}
          className="text-brand-blue hover:text-brand-blue/80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <p className="text-sm text-gray-600">
          Select an option to continue
        </p>
      </div>
    </div>
  );
}
