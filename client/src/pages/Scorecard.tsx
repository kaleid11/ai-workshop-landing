import AIReadinessQuiz from "@/components/AIReadinessQuiz";
import { CheckCircle2, TrendingUp, Users, Shield, Cog, DollarSign } from "lucide-react";

export default function Scorecard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-brand-purple/5">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            What's Your <span className="text-brand-purple">AI Readiness Score?</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Take our comprehensive 5-minute assessment to discover your organization's AI readiness across 5 critical dimensions. Get a personalized roadmap with specific recommendations, timelines, and ROI projections.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-brand-purple mb-2">20</div>
              <div className="text-gray-600">Questions</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-brand-purple mb-2">5</div>
              <div className="text-gray-600">Minutes</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-4xl font-bold text-brand-purple mb-2">100%</div>
              <div className="text-gray-600">Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Assess */}
      <section className="py-12 px-4 bg-white">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What We Assess</h2>
          <div className="grid md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cog className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Technology</h3>
              <p className="text-sm text-gray-600">Tool stack, data access, APIs, infrastructure</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Process</h3>
              <p className="text-sm text-gray-600">Documentation, standardization, automation opportunities</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">People</h3>
              <p className="text-sm text-gray-600">AI literacy, adoption willingness, learning culture</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-bold mb-2">Security</h3>
              <p className="text-sm text-gray-600">Policies, governance, compliance, audit readiness</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-bold mb-2">ROI & Budget</h3>
              <p className="text-sm text-gray-600">Investment capacity, expectations, decision speed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Component */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <AIReadinessQuiz />
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Get</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-brand-purple flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Overall AI Readiness Score (0-100)</h3>
                <p className="text-gray-600">Understand where you stand compared to 200+ organizations we've assessed</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-brand-purple flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">5-Dimension Breakdown</h3>
                <p className="text-gray-600">See your strengths and gaps across Technology, Process, People, Security, and ROI</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-brand-purple flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Personalized Roadmap</h3>
                <p className="text-gray-600">Get specific recommendations for your readiness level (Exploration, Foundation, Transformation, or Optimization)</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-brand-purple flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Investment & Timeline Estimates</h3>
                <p className="text-gray-600">Clear breakdown of costs, timelines, and expected ROI for your recommended path</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-brand-purple flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Optional PDF Scorecard</h3>
                <p className="text-gray-600">Receive a comprehensive 4-page PDF report via email to share with your team</p>
              </div>
            </div>

            <div className="flex gap-4">
              <CheckCircle2 className="w-6 h-6 text-brand-purple flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Free 15-Minute Consultation</h3>
                <p className="text-gray-600">Book a call to discuss your results and ask questions about implementation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Readiness Levels Preview */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">4 Readiness Levels</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-red-200">
              <div className="text-4xl font-bold text-red-600 mb-2">0-40</div>
              <h3 className="font-bold text-lg mb-2">Exploration</h3>
              <p className="text-sm text-gray-600 mb-4">Build foundational AI knowledge before implementation</p>
              <div className="text-xs text-gray-500">
                <div className="font-medium">Recommended:</div>
                <div>Workshop + Academy Lite</div>
                <div className="mt-2 font-medium">Investment:</div>
                <div>$788 for 3 months</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-orange-200">
              <div className="text-4xl font-bold text-orange-600 mb-2">41-60</div>
              <h3 className="font-bold text-lg mb-2">Foundation</h3>
              <p className="text-sm text-gray-600 mb-4">Ready to move from education to implementation</p>
              <div className="text-xs text-gray-500">
                <div className="font-medium">Recommended:</div>
                <div>Academy Pro + Automation</div>
                <div className="mt-2 font-medium">Investment:</div>
                <div>$8K-$13K for 6 months</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">61-80</div>
              <h3 className="font-bold text-lg mb-2">Transformation</h3>
              <p className="text-sm text-gray-600 mb-4">Ready for enterprise-grade AI transformation</p>
              <div className="text-xs text-gray-500">
                <div className="font-medium">Recommended:</div>
                <div>Full Horizon Framework</div>
                <div className="mt-2 font-medium">Investment:</div>
                <div>$20K-$30K first year</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">81-100</div>
              <h3 className="font-bold text-lg mb-2">Optimization</h3>
              <p className="text-sm text-gray-600 mb-4">Ready for custom AI solutions and competitive advantages</p>
              <div className="text-xs text-gray-500">
                <div className="font-medium">Recommended:</div>
                <div>Strategic Partnership</div>
                <div className="mt-2 font-medium">Investment:</div>
                <div>$35K-$65K+ first year</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
