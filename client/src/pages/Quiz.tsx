import ToolStackAuditQuiz from "@/components/ToolStackAuditQuiz";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Header } from "@/components/Header";

export default function Quiz() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-brand-purple/5 to-white">
      <Header />
      <div className="py-12 px-4">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <Link href="/">
            <Button variant="ghost" className="text-brand-blue hover:text-brand-blue/80 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-purple">
              Find Your Perfect Tool Stack
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Answer 5 quick questions and get personalized AI tool recommendations with ROI projections
            </p>
            <p className="text-sm text-gray-600">
              Takes about 2 minutes • No credit card required
            </p>
          </div>
        </div>

        {/* Quiz Component */}
        <ToolStackAuditQuiz />
      </div>
      </div>
    </div>
  );
}
