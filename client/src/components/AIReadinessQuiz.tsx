import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  ArrowRight, 
  Download,
  CheckCircle2,
  TrendingUp,
  Users,
  Shield,
  Cog,
  DollarSign
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const BOOKING_URL = "https://app.klipy.ai/book/pre-discovery/free-pre-discovery";

type Dimension = "technology" | "process" | "people" | "security" | "roi";

interface Question {
  id: number;
  dimension: Dimension;
  text: string;
  options: {
    text: string;
    score: number;
    icon: string;
  }[];
}

const questions: Question[] = [
  // Technology Readiness (4 questions)
  {
    id: 1,
    dimension: "technology",
    text: "How many software tools does your team currently use?",
    options: [
      { text: "1-5 tools", score: 100, icon: "✅" },
      { text: "6-10 tools", score: 75, icon: "👍" },
      { text: "11-15 tools", score: 40, icon: "😐" },
      { text: "16+ tools", score: 10, icon: "😰" },
    ],
  },
  {
    id: 2,
    dimension: "technology",
    text: "How accessible is your business data?",
    options: [
      { text: "Fully centralized database", score: 100, icon: "🎯" },
      { text: "Partially centralized", score: 60, icon: "📊" },
      { text: "Siloed in spreadsheets", score: 20, icon: "📁" },
    ],
  },
  {
    id: 3,
    dimension: "technology",
    text: "Do your current tools have API access?",
    options: [
      { text: "All tools have APIs", score: 100, icon: "🔗" },
      { text: "Most tools have APIs", score: 75, icon: "🔌" },
      { text: "Some tools have APIs", score: 40, icon: "⚡" },
      { text: "No API access", score: 10, icon: "🚫" },
    ],
  },
  {
    id: 4,
    dimension: "technology",
    text: "What's your infrastructure setup?",
    options: [
      { text: "Cloud-native", score: 100, icon: "☁️" },
      { text: "Hybrid (cloud + on-premise)", score: 60, icon: "🌐" },
      { text: "On-premise only", score: 20, icon: "🏢" },
    ],
  },
  {
    id: 21,
    dimension: "technology",
    text: "Which of these tools are you currently paying for?",
    options: [
      { text: "Airtable (database/project management)", score: 50, icon: "🗃️" },
      { text: "Form software (Typeform, Jotform)", score: 50, icon: "📋" },
      { text: "Monday.com (project management)", score: 50, icon: "📅" },
      { text: "Zapier or automation tools", score: 50, icon: "⚡" },
      { text: "None of these", score: 100, icon: "✅" },
    ],
  },

  // Process Maturity (4 questions)
  {
    id: 5,
    dimension: "process",
    text: "Are your business processes documented?",
    options: [
      { text: "Fully documented SOPs", score: 100, icon: "📋" },
      { text: "Partially documented", score: 60, icon: "📝" },
      { text: "No documentation", score: 10, icon: "❌" },
    ],
  },
  {
    id: 6,
    dimension: "process",
    text: "How standardized are your workflows?",
    options: [
      { text: "Fully standardized", score: 100, icon: "⚙️" },
      { text: "Some standards in place", score: 60, icon: "🔧" },
      { text: "Everyone does it differently", score: 10, icon: "🤷" },
    ],
  },
  {
    id: 7,
    dimension: "process",
    text: "Can you identify your top 3 time-consuming tasks?",
    options: [
      { text: "Yes, clearly identified", score: 100, icon: "🎯" },
      { text: "Vaguely aware", score: 50, icon: "🤔" },
      { text: "No idea", score: 10, icon: "❓" },
    ],
  },
  {
    id: 8,
    dimension: "process",
    text: "What percentage of your tasks are repeatable?",
    options: [
      { text: "80%+ are repeatable", score: 100, icon: "🔄" },
      { text: "60-80% repeatable", score: 75, icon: "♻️" },
      { text: "30-60% repeatable", score: 40, icon: "🔀" },
      { text: "<30% repeatable", score: 10, icon: "🎲" },
    ],
  },

  // People & Culture (4 questions)
  {
    id: 9,
    dimension: "people",
    text: "What's your team's AI experience level?",
    options: [
      { text: "Power users (daily AI use)", score: 100, icon: "🚀" },
      { text: "Regular users (weekly)", score: 75, icon: "💪" },
      { text: "Tried ChatGPT a few times", score: 40, icon: "🔰" },
      { text: "Never used AI", score: 10, icon: "👶" },
    ],
  },
  {
    id: 10,
    dimension: "people",
    text: "How does your team react to new tools?",
    options: [
      { text: "Enthusiastic early adopters", score: 100, icon: "🎉" },
      { text: "Curious and open", score: 75, icon: "😊" },
      { text: "Cautious but willing", score: 40, icon: "🤨" },
      { text: "Resistant to change", score: 10, icon: "😤" },
    ],
  },
  {
    id: 11,
    dimension: "people",
    text: "Do you have a training budget?",
    options: [
      { text: "$3K+ per person", score: 100, icon: "💰" },
      { text: "$1K-$3K per person", score: 75, icon: "💵" },
      { text: "Small (<$1K per person)", score: 40, icon: "💸" },
      { text: "No training budget", score: 10, icon: "🚫" },
    ],
  },
  {
    id: 12,
    dimension: "people",
    text: "What's your team's technical skill level?",
    options: [
      { text: "Advanced (can code)", score: 100, icon: "👨‍💻" },
      { text: "Intermediate (power users)", score: 75, icon: "🖥️" },
      { text: "Basic (email & docs)", score: 40, icon: "📧" },
      { text: "Non-technical", score: 10, icon: "📱" },
    ],
  },

  // Security & Compliance (4 questions)
  {
    id: 13,
    dimension: "security",
    text: "Do you have security policies in place?",
    options: [
      { text: "Certified (ISO27001, SOC2)", score: 100, icon: "🏆" },
      { text: "Comprehensive policies", score: 75, icon: "📜" },
      { text: "Basic policies", score: 40, icon: "📄" },
      { text: "No security policies", score: 10, icon: "⚠️" },
    ],
  },
  {
    id: 14,
    dimension: "security",
    text: "What's your industry?",
    options: [
      { text: "General business (low-risk)", score: 100, icon: "🏪" },
      { text: "Professional services (medium-risk)", score: 60, icon: "💼" },
      { text: "Finance/Healthcare/Legal (high-risk)", score: 30, icon: "🏥" },
    ],
  },
  {
    id: 15,
    dimension: "security",
    text: "Do you have compliance requirements?",
    options: [
      { text: "No compliance requirements", score: 100, icon: "✅" },
      { text: "Working toward compliance", score: 50, icon: "🔄" },
      { text: "Fully compliant", score: 100, icon: "🎖️" },
    ],
  },
  {
    id: 16,
    dimension: "security",
    text: "How do you handle sensitive data?",
    options: [
      { text: "Full data governance framework", score: 100, icon: "🔐" },
      { text: "Basic encryption", score: 60, icon: "🔒" },
      { text: "No specific policies", score: 10, icon: "🔓" },
    ],
  },

  // ROI & Budget (4 questions)
  {
    id: 17,
    dimension: "roi",
    text: "What's your AI transformation budget?",
    options: [
      { text: "$50K+", score: 100, icon: "💎" },
      { text: "$15K-$50K", score: 80, icon: "💰" },
      { text: "$5K-$15K", score: 50, icon: "💵" },
      { text: "<$5K", score: 20, icon: "💸" },
      { text: "No budget yet", score: 10, icon: "🚫" },
    ],
  },
  {
    id: 18,
    dimension: "roi",
    text: "What's your ROI expectation timeline?",
    options: [
      { text: "12 months is fine", score: 100, icon: "📅" },
      { text: "6 months", score: 80, icon: "⏰" },
      { text: "3 months", score: 50, icon: "⏱️" },
      { text: "1 month (unrealistic)", score: 10, icon: "⚡" },
    ],
  },
  {
    id: 19,
    dimension: "roi",
    text: "How much time/money are you losing to inefficiency?",
    options: [
      { text: "Precisely tracked", score: 100, icon: "📊" },
      { text: "Estimated amounts", score: 60, icon: "📈" },
      { text: "Unknown", score: 10, icon: "❓" },
    ],
  },
  {
    id: 20,
    dimension: "roi",
    text: "How quickly can you make decisions?",
    options: [
      { text: "<2 weeks", score: 100, icon: "⚡" },
      { text: "2-4 weeks", score: 75, icon: "🏃" },
      { text: "1-3 months", score: 40, icon: "🚶" },
      { text: "3+ months", score: 10, icon: "🐌" },
    ],
  },
];

interface DimensionScores {
  technology: number;
  process: number;
  people: number;
  security: number;
  roi: number;
}

interface ReadinessLevel {
  level: string;
  score: number;
  title: string;
  description: string;
  recommendedPath: string;
  investment: string;
  timeline: string;
  expectedROI: string;
  color: string;
}

function calculateReadinessLevel(overallScore: number): ReadinessLevel {
  if (overallScore >= 81) {
    return {
      level: "4",
      score: overallScore,
      title: "Optimization",
      description: "You're an AI power user ready for custom solutions and competitive advantages.",
      recommendedPath: "Strategic AI Partnership + Custom Development",
      investment: "$35K-$65K first year",
      timeline: "2-4 weeks strategy, 6-12 weeks custom builds",
      expectedROI: "$60K-$100K annual savings + strategic positioning",
      color: "text-green-600",
    };
  } else if (overallScore >= 61) {
    return {
      level: "3",
      score: overallScore,
      title: "Transformation",
      description: "You're ready for enterprise-grade AI transformation across your organization.",
      recommendedPath: "AI Transformation Partner (Full Horizon Framework)",
      investment: "$20K-$30K first year",
      timeline: "4-6 weeks audit + implementation, 3 months to full adoption",
      expectedROI: "$30K-$50K annual savings, break-even in 6-9 months",
      color: "text-blue-600",
    };
  } else if (overallScore >= 41) {
    return {
      level: "2",
      score: overallScore,
      title: "Foundation",
      description: "You're ready to move beyond education into real implementation.",
      recommendedPath: "Academy Pro + Automation Accelerator",
      investment: "$8K-$13K for first 6 months",
      timeline: "4-8 weeks for first automation, 3-6 months for full rollout",
      expectedROI: "$15K-$20K annual savings, break-even in 4-6 months",
      color: "text-orange-600",
    };
  } else {
    return {
      level: "1",
      score: overallScore,
      title: "Exploration",
      description: "Your team needs foundational AI education before diving into implementation.",
      recommendedPath: "Workshop + Academy Lite",
      investment: "$788 total for first 3 months",
      timeline: "3-6 months before enterprise readiness",
      expectedROI: "10-15 hours saved per month after 3 months",
      color: "text-red-600",
    };
  }
}

export default function AIReadinessQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");

  const submitAssessment = trpc.assessment.submit.useMutation({
    onSuccess: (data) => {
      toast.success("Scorecard sent! Check your inbox and download below.");
      setShowEmailForm(false);
      
      // Download PDF immediately
      if (data.pdfBase64) {
        const blob = new Blob(
          [Uint8Array.from(atob(data.pdfBase64), c => c.charCodeAt(0))],
          { type: "application/pdf" }
        );
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ai-readiness-scorecard.pdf";
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    onError: (error: { message: string }) => {
      toast.error(`Failed to generate scorecard: ${error.message}`);
    },
  });

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleAnswer = (score: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: score });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
    setShowEmailForm(false);
  };

  const calculateScores = (): { dimensions: DimensionScores; overall: number } => {
    const dimensionScores: DimensionScores = {
      technology: 0,
      process: 0,
      people: 0,
      security: 0,
      roi: 0,
    };

    const dimensionCounts: Record<Dimension, number> = {
      technology: 0,
      process: 0,
      people: 0,
      security: 0,
      roi: 0,
    };

    questions.forEach((q) => {
      const answer = answers[q.id];
      if (answer !== undefined) {
        dimensionScores[q.dimension] += answer;
        dimensionCounts[q.dimension]++;
      }
    });

    // Average each dimension
    Object.keys(dimensionScores).forEach((dim) => {
      const dimension = dim as Dimension;
      if (dimensionCounts[dimension] > 0) {
        dimensionScores[dimension] = dimensionScores[dimension] / dimensionCounts[dimension];
      }
    });

    // Calculate weighted overall score
    const overall =
      dimensionScores.technology * 0.25 +
      dimensionScores.process * 0.2 +
      dimensionScores.people * 0.25 +
      dimensionScores.security * 0.15 +
      dimensionScores.roi * 0.15;

    return { dimensions: dimensionScores, overall: Math.round(overall) };
  };

  const handleDownloadScorecard = async () => {
    if (!email || !name || !company) {
      toast.error("Please fill in all required fields");
      return;
    }

    const { dimensions, overall } = calculateScores();
    const readinessLevel = calculateReadinessLevel(overall);

    submitAssessment.mutate({
      name,
      email,
      phone,
      company,
      assessmentType: "full",
      score: overall,
      answers: {
        ...answers,
        dimensionScores: dimensions,
        readinessLevel: readinessLevel.level,
      },
      recommendations: [readinessLevel.recommendedPath],
      source: "scorecard-page",
    });
  };

  if (showEmailForm) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Get Your AI Readiness Scorecard</CardTitle>
          <p className="text-gray-600">
            Enter your details to receive a personalized PDF scorecard with your results and recommendations.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@company.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Inc"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number (optional)</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+61 400 000 000"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleDownloadScorecard}
                disabled={submitAssessment.isPending}
                className="flex-1"
              >
                {submitAssessment.isPending ? (
                  "Generating..."
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Send Me My Scorecard
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => setShowEmailForm(false)}>
                Back to Results
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              We'll email you the PDF scorecard immediately. No spam, ever.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const { dimensions, overall } = calculateScores();
    const readinessLevel = calculateReadinessLevel(overall);

    const dimensionData = [
      { name: "Technology", score: Math.round(dimensions.technology), icon: Cog, color: "bg-blue-500" },
      { name: "Process", score: Math.round(dimensions.process), icon: TrendingUp, color: "bg-green-500" },
      { name: "People", score: Math.round(dimensions.people), icon: Users, color: "bg-purple-500" },
      { name: "Security", score: Math.round(dimensions.security), icon: Shield, color: "bg-orange-500" },
      { name: "ROI & Budget", score: Math.round(dimensions.roi), icon: DollarSign, color: "bg-pink-500" },
    ];

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Overall Score */}
        <Card className="border-2">
          <CardHeader className="text-center">
            <div className="mb-4">
              <div className={`text-6xl font-bold ${readinessLevel.color}`}>{overall}/100</div>
              <Badge className="mt-2 text-lg px-4 py-1">
                Level {readinessLevel.level}: {readinessLevel.title}
              </Badge>
            </div>
            <CardTitle className="text-2xl">{readinessLevel.description}</CardTitle>
          </CardHeader>
        </Card>

        {/* Dimension Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Your AI Readiness Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dimensionData.map((dim) => (
                <div key={dim.name}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <dim.icon className="w-5 h-5" />
                      <span className="font-medium">{dim.name}</span>
                    </div>
                    <span className="font-bold">{dim.score}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${dim.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Path */}
        <Card className="border-2 border-brand-purple">
          <CardHeader>
            <CardTitle className="text-2xl">Your Recommended Path</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-lg mb-2">{readinessLevel.recommendedPath}</h3>
                <p className="text-gray-700">{readinessLevel.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Investment</div>
                  <div className="font-bold">{readinessLevel.investment}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Timeline</div>
                  <div className="font-bold">{readinessLevel.timeline}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Expected ROI</div>
                  <div className="font-bold">{readinessLevel.expectedROI}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Connector Integration Recommendations */}
        {(answers[21] === 0 || answers[21] === 1 || answers[21] === 2 || answers[21] === 3) && (
          <Card className="border-2 border-blue-200 bg-blue-50/30">
            <CardHeader>
              <CardTitle className="text-xl text-brand-purple">
                🔗 Connector Integration Opportunities
              </CardTitle>
              <CardDescription className="text-base">
                Based on your current tools, you can save significantly by leveraging Manus and ChatGPT native connectors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {answers[21] === 0 && (
                  <div className="p-4 bg-white rounded-lg border border-blue-200">
                    <h4 className="font-bold text-brand-purple mb-2">Replace Airtable</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Current cost:</strong> $240-$540/user/year
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Replacement:</strong> Notion ($120/year) + ChatGPT/Manus Connectors
                    </p>
                    <p className="text-sm font-semibold text-green-600">
                      💰 Savings: $120-$420/year per user
                    </p>
                  </div>
                )}
                {answers[21] === 1 && (
                  <div className="p-4 bg-white rounded-lg border border-blue-200">
                    <h4 className="font-bold text-brand-purple mb-2">Replace Form Software</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Current cost:</strong> $300-$840/year (Typeform, Jotform, etc.)
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Replacement:</strong> Gmail + Notion + Manus Automation
                    </p>
                    <p className="text-sm font-semibold text-green-600">
                      💰 Savings: $300-$840/year
                    </p>
                  </div>
                )}
                {answers[21] === 2 && (
                  <div className="p-4 bg-white rounded-lg border border-blue-200">
                    <h4 className="font-bold text-brand-purple mb-2">Optimize Monday.com</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Current cost:</strong> $108-$228/user/year
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Option 1:</strong> Keep Monday.com + add ChatGPT connector for AI automation
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Option 2:</strong> Replace with Notion + Manus
                    </p>
                    <p className="text-sm font-semibold text-green-600">
                      💰 Potential savings: $108-$228/year per user (if replacing)
                    </p>
                  </div>
                )}
                {answers[21] === 3 && (
                  <div className="p-4 bg-white rounded-lg border border-blue-200">
                    <h4 className="font-bold text-brand-purple mb-2">Replace Zapier</h4>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Current cost:</strong> $240-$600/year
                    </p>
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Replacement:</strong> Manus MCP Connectors (Gmail, Notion, Stripe, HubSpot, Google Calendar, GitHub)
                    </p>
                    <p className="text-sm font-semibold text-green-600">
                      💰 Savings: $240-$600/year
                    </p>
                  </div>
                )}
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-gray-700">
                    <strong className="text-brand-purple">⚠️ Important:</strong> These are suggested optimizations based on your current tools. <strong>Book a free 15-minute consultation to confirm this setup will work for your specific workflows and requirements.</strong> Actual savings may vary.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* What Manus Replaces */}
        <Card className="border-2 border-brand-orange bg-gradient-to-br from-brand-orange/10 to-brand-purple/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-brand-purple mb-2">
              💡 How Manus Accelerates Your AI Journey
            </CardTitle>
            <CardDescription className="text-base text-gray-700">
              One platform replaces multiple expensive tools and eliminates technical barriers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-bold text-red-600 mb-3 flex items-center gap-2">
                  <span className="text-2xl">❌</span> Traditional Approach ($200-500/mo)
                </h5>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Zapier: $30-70/mo</li>
                  <li>• Typeform: $25-50/mo</li>
                  <li>• Webflow: $14-39/mo</li>
                  <li>• HubSpot CRM: $45-90/mo</li>
                  <li>• Airtable: $20-45/mo</li>
                  <li>• Make.com: $9-29/mo</li>
                  <li>• Plus: Developer time for integrations</li>
                  <li className="font-semibold pt-2 border-t">Total: $143-323/month + dev costs</li>
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
                  <li>✓ No-code interface (no developers needed)</li>
                  <li className="font-semibold pt-2 border-t text-green-600">Save: $103-283/month = $1,236-$3,396/year</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-brand-purple/10 rounded-lg text-center">
              <p className="text-sm font-semibold text-brand-purple">
                🎯 Perfect for your {readinessLevel.level} readiness level: Start building AI tools without technical complexity
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Tool Stack */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Your Recommended Tool Stack</CardTitle>
            <CardDescription>
              Based on your readiness level and dimension scores, we recommend these {overall < 40 ? "5-6" : overall < 70 ? "7-8" : "9-10"} core tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Core Tools - Always recommended */}
              <div className="border-2 border-brand-blue rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold">ChatGPT Team</h4>
                    <Badge variant="outline" className="mt-1 text-xs">Core AI</Badge>
                  </div>
                  <span className="text-sm font-semibold text-brand-blue">$25-30/user/mo</span>
                </div>
                <p className="text-sm text-gray-700">Foundation for all AI work - conversational AI, automation, research</p>
              </div>

              <div className="border-2 border-brand-orange rounded-lg p-4 bg-brand-orange/5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold">Manus</h4>
                    <Badge className="mt-1 text-xs bg-brand-orange">Replaces 6+ Tools</Badge>
                  </div>
                  <span className="text-sm font-semibold text-brand-orange">$20-40/user/mo</span>
                </div>
                <p className="text-sm text-gray-700">Custom tools, forms, landing pages, CRM, automation - no code required</p>
              </div>

              {/* Content Creation Tools */}
              {overall >= 40 && (
                <>
                  <div className="border-2 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold">Gamma</h4>
                        <Badge variant="outline" className="mt-1 text-xs">Content Creation</Badge>
                      </div>
                      <span className="text-sm font-semibold text-brand-blue">$15/mo</span>
                    </div>
                    <p className="text-sm text-gray-700">AI presentations and documents - replaces Canva Pro</p>
                  </div>

                  <div className="border-2 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold">Captions.ai</h4>
                        <Badge variant="outline" className="mt-1 text-xs">Video Production</Badge>
                      </div>
                      <span className="text-sm font-semibold text-brand-blue">$20/mo</span>
                    </div>
                    <p className="text-sm text-gray-700">AI video editing and captions - replaces Descript</p>
                  </div>
                </>
              )}

              {/* Advanced Tools for higher readiness */}
              {overall >= 60 && (
                <>
                  <div className="border-2 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold">Riverside.fm</h4>
                        <Badge variant="outline" className="mt-1 text-xs">Content Creation</Badge>
                      </div>
                      <span className="text-sm font-semibold text-brand-blue">$19-79/mo</span>
                    </div>
                    <p className="text-sm text-gray-700">Studio-quality podcast recording and live streaming</p>
                  </div>

                  <div className="border-2 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold">Reap.video</h4>
                        <Badge variant="outline" className="mt-1 text-xs">Video Production</Badge>
                      </div>
                      <span className="text-sm font-semibold text-brand-blue">$29/mo</span>
                    </div>
                    <p className="text-sm text-gray-700">Repurpose content into shorts - full editing suite coming soon (AppSumo deal available)</p>
                  </div>

                  <div className="border-2 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold">ElevenLabs</h4>
                        <Badge variant="outline" className="mt-1 text-xs">Audio Production</Badge>
                      </div>
                      <span className="text-sm font-semibold text-brand-blue">$11/mo</span>
                    </div>
                    <p className="text-sm text-gray-700">AI voice generation for content and training materials</p>
                  </div>
                </>
              )}

              {/* Technical Tools for highly ready organizations */}
              {overall >= 70 && dimensions.technology >= 70 && (
                <>
                  <div className="border-2 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold">Replit</h4>
                        <Badge variant="outline" className="mt-1 text-xs">Development</Badge>
                      </div>
                      <span className="text-sm font-semibold text-brand-blue">$20/user/mo</span>
                    </div>
                    <p className="text-sm text-gray-700">AI-powered collaborative coding and rapid prototyping</p>
                  </div>

                  <div className="border-2 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold">Opus Pro</h4>
                        <Badge variant="outline" className="mt-1 text-xs">Video Production</Badge>
                      </div>
                      <span className="text-sm font-semibold text-brand-blue">$9-29/mo</span>
                    </div>
                    <p className="text-sm text-gray-700">AI video clipping with Adobe Premiere Pro integration</p>
                  </div>
                </>
              )}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Estimated Monthly Cost:</strong> {overall < 40 ? "$80-120" : overall < 70 ? "$150-220" : "$200-300"} per user
                <br />
                <strong>Replaces:</strong> 10-15 fragmented tools costing $400-800/month
                <br />
                <strong>Annual Savings:</strong> <span className="text-green-600 font-bold">${overall < 40 ? "3,840-8,160" : overall < 70 ? "2,160-6,960" : "1,200-6,000"}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="flex-1" onClick={() => setShowEmailForm(true)}>
            <Download className="w-5 h-5 mr-2" />
            Get Full Scorecard PDF
          </Button>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button size="lg" variant="outline" className="w-full">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Book Free Consultation
            </Button>
          </a>
        </div>

        <div className="text-center">
          <Button variant="ghost" onClick={handleRestart}>
            Restart Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Badge variant="outline">
            Question {currentStep + 1} of {questions.length}
          </Badge>
          <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="mb-4" />
        <CardTitle className="text-2xl">{currentQuestion.text}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start text-left h-auto py-4 px-6 hover:border-brand-purple hover:bg-brand-purple/5"
              onClick={() => handleAnswer(option.score)}
            >
              <span className="text-2xl mr-4">{option.icon}</span>
              <span className="text-base">{option.text}</span>
            </Button>
          ))}
        </div>

        <div className="flex gap-3 mt-6">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          <Button variant="ghost" onClick={handleRestart} className="ml-auto">
            Restart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
