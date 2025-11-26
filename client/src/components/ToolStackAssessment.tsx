import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  Target,
  Sparkles
} from "lucide-react";

interface AssessmentResult {
  score: number;
  level: "beginner" | "intermediate" | "advanced";
  gaps: string[];
  recommendations: string[];
}

export function ToolStackAssessment() {
  const [assessmentData, setAssessmentData] = useState({
    currentTools: "",
    useCase: "",
    teamSize: "",
    budget: "",
    goals: ""
  });
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const handleAssessmentSubmit = () => {
    const toolCount = assessmentData.currentTools.split(",").filter(t => t.trim()).length;
    let score = Math.min(100, toolCount * 10 + 30);
    
    const level: "beginner" | "intermediate" | "advanced" = 
      score < 40 ? "beginner" : score < 70 ? "intermediate" : "advanced";

    const gaps = [
      "Missing automation tools for content creation",
      "No AI-powered analytics platform",
      "Limited workflow integration between tools"
    ];

    const recommendations = [
      "Explore Manus for workflow automation",
      "Consider Gemini Advanced for content generation",
      "Implement tools from our 1,620+ curated database"
    ];

    setAssessmentResult({ score, level, gaps, recommendations });
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 text-center">
          <Badge className="mb-4">🎁 Free Tool</Badge>
          <h2 className="text-3xl font-bold mb-2">Tool Stack Assessment</h2>
          <p className="text-gray-600">
            Discover gaps in your AI setup and get personalized recommendations. No signup required.
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-6 h-6 text-orange-500" />
              Assess Your AI Readiness
            </CardTitle>
            <CardDescription>
              Answer a few questions to get your personalized score and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!assessmentResult ? (
              <>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentTools">What AI tools are you currently using?</Label>
                    <Textarea
                      id="currentTools"
                      placeholder="e.g., ChatGPT, Midjourney, Notion AI..."
                      value={assessmentData.currentTools}
                      onChange={(e) => setAssessmentData({ ...assessmentData, currentTools: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="useCase">What's your primary use case?</Label>
                    <Input
                      id="useCase"
                      placeholder="e.g., Content creation, Marketing automation, Coding..."
                      value={assessmentData.useCase}
                      onChange={(e) => setAssessmentData({ ...assessmentData, useCase: e.target.value })}
                      className="mt-2"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="teamSize">Team size</Label>
                      <Input
                        id="teamSize"
                        placeholder="e.g., 1-5, 10-50..."
                        value={assessmentData.teamSize}
                        onChange={(e) => setAssessmentData({ ...assessmentData, teamSize: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="budget">Monthly AI budget</Label>
                      <Input
                        id="budget"
                        placeholder="e.g., $100, $500..."
                        value={assessmentData.budget}
                        onChange={(e) => setAssessmentData({ ...assessmentData, budget: e.target.value })}
                        className="mt-2"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="goals">What are your main goals with AI?</Label>
                    <Textarea
                      id="goals"
                      placeholder="e.g., Save time, increase output quality, automate workflows..."
                      value={assessmentData.goals}
                      onChange={(e) => setAssessmentData({ ...assessmentData, goals: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleAssessmentSubmit}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                  size="lg"
                >
                  Get My Assessment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </>
            ) : (
              <div className="space-y-6">
                {/* Score Display */}
                <div className="text-center p-8 bg-gradient-to-br from-orange-100 to-purple-100 rounded-lg">
                  <div className="text-6xl font-bold text-orange-500 mb-2">
                    {assessmentResult.score}
                  </div>
                  <div className="text-2xl font-semibold mb-2">
                    {assessmentResult.level.charAt(0).toUpperCase() + assessmentResult.level.slice(1)} Level
                  </div>
                  <p className="text-gray-600">
                    Your AI Tool Stack Readiness Score
                  </p>
                </div>

                {/* Gaps */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    Identified Gaps
                  </h3>
                  <ul className="space-y-2">
                    {assessmentResult.gaps.map((gap, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{gap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Recommendations
                  </h3>
                  <ul className="space-y-2">
                    {assessmentResult.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Lead Funnel CTA */}
                <div className="mt-6 p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg border-2 border-orange-200">
                  <h3 className="text-xl font-bold mb-2 text-center">
                    🎯 Get Your Personalized Action Plan
                  </h3>
                  <p className="text-center text-gray-600 mb-4">
                    Access 1,620+ tools, 118+ prompts, and expert guidance for just $27
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Link href="/checkout?tier=access_pass">
                      <Button variant="outline" className="w-full">
                        Access Pass - $27
                      </Button>
                    </Link>
                    <Link href="/checkout?tier=workshop">
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        Workshop + Resources - $97
                      </Button>
                    </Link>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-3">
                    <Link href="/pricing">
                      <span className="text-purple-600 hover:underline cursor-pointer">
                        Or explore monthly plans →
                      </span>
                    </Link>
                  </p>
                </div>

                <Button 
                  onClick={() => setAssessmentResult(null)}
                  variant="ghost"
                  className="w-full"
                >
                  Take Assessment Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
