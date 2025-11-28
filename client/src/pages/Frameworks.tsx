import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { BookOpen, ArrowRight, Clock, TrendingUp } from "lucide-react";

interface Framework {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  timeToImplement: string;
  expectedOutcome: string;
}

const FRAMEWORKS: Framework[] = [
  {
    id: "business-model-canvas",
    title: "Business Model Canvas",
    description: "Map your entire business model on one page using the 9 building blocks framework. Includes AI prompts for each component.",
    icon: "🎯",
    difficulty: "Beginner",
    timeToImplement: "2-4 hours",
    expectedOutcome: "Complete business model mapped on one page, clarity on all 9 components, validated assumptions",
  },
  {
    id: "ai-adoption-framework",
    title: "AI Technology Adoption Framework (25 Steps)",
    description: "A structured approach to understanding, evaluating, and implementing AI in your business. Based on Daniel Drescher's technology adoption methodology.",
    icon: "🚀",
    difficulty: "Intermediate",
    timeToImplement: "6-12 weeks",
    expectedOutcome: "Structured roadmap for AI adoption, clear understanding of capabilities and limitations, validated use cases with ROI projections",
  },
];

export default function Frameworks() {
  const { user, isAuthenticated } = useAuth();

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
            <Link href="/portal">
              <Button variant="outline">Portal</Button>
            </Link>
            {isAuthenticated && (
              <span className="text-sm text-gray-600">Hi, {user?.name}</span>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">Business Frameworks</h1>
          <p className="text-xl mb-8">
            Strategic frameworks designed for business leaders to make informed decisions about AI adoption and business model innovation.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/wiki">
              <Button size="lg" variant="secondary">
                <BookOpen className="w-5 h-5 mr-2" />
                View All Guides
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Frameworks Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Strategic Frameworks for Business Leaders</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Each framework includes practical AI prompts to help you apply the concepts to your specific business context. No technical jargon—just actionable guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {FRAMEWORKS.map((framework) => (
              <Card key={framework.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-5xl">{framework.icon}</div>
                    <Badge variant={framework.difficulty === "Beginner" ? "secondary" : "default"}>
                      {framework.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl mb-2">{framework.title}</CardTitle>
                  <CardDescription className="text-base">
                    {framework.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span><strong>Time Investment:</strong> {framework.timeToImplement}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 mt-0.5" />
                      <span><strong>Expected Outcome:</strong> {framework.expectedOutcome}</span>
                    </div>
                  </div>

                  <Link href={`/wiki#${framework.id}`}>
                    <Button className="w-full" size="lg">
                      View Framework
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why These Frameworks Section */}
          <div className="mt-16 bg-white rounded-lg p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-6">Why These Frameworks?</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">🎯 Business Model Canvas</h4>
                <p className="text-gray-600">
                  The gold standard for business model design, used by millions of entrepreneurs worldwide. 
                  Perfect for validating business ideas, identifying gaps, and communicating your strategy clearly.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">🚀 AI Adoption Framework</h4>
                <p className="text-gray-600">
                  Based on Daniel Drescher's proven technology adoption methodology, adapted specifically for AI. 
                  Breaks down complex AI implementation into 25 manageable steps for non-technical leaders.
                </p>
              </div>
            </div>
          </div>

          {/* AI Prompts Included */}
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8">
            <div className="flex items-start gap-4">
              <div className="text-4xl">✨</div>
              <div>
                <h3 className="text-2xl font-bold mb-3">AI Prompts Included</h3>
                <p className="text-gray-700 mb-4">
                  Each framework comes with ready-to-use AI prompts that help you apply the concepts to your specific business. 
                  Simply copy the prompts, fill in your details, and get personalized strategic guidance from AI.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Customer segmentation analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Value proposition design</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>AI readiness assessment</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>Use case prioritization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    <span>ROI calculation and scaling strategies</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
