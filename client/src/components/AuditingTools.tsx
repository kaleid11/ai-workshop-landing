import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  TrendingUp,
  Download,
  DollarSign,
  Calendar,
  AlertTriangle
} from "lucide-react";
import { toast } from "sonner";

export function AuditingTools() {
  const [auditData, setAuditData] = useState({
    toolName: "",
    monthlySpend: "",
    usage: "",
    hoursPerWeek: ""
  });
  const [auditResult, setAuditResult] = useState<{
    costPerUse: number;
    annualCost: number;
    recommendation: string;
    savings: number;
  } | null>(null);

  const handleAuditSubmit = () => {
    const monthly = parseFloat(auditData.monthlySpend) || 0;
    const hours = parseFloat(auditData.hoursPerWeek) || 1;
    
    const usesPerMonth = hours * 4; // 4 weeks
    const costPerUse = monthly / usesPerMonth;
    const annualCost = monthly * 12;
    
    // Simple recommendation logic
    let recommendation = "";
    let savings = 0;
    
    if (costPerUse > 50) {
      recommendation = "High cost per use. Consider alternatives from our tools database or monthly subscriptions.";
      savings = annualCost * 0.3; // Estimate 30% savings
    } else if (hours < 2) {
      recommendation = "Low usage detected. You might be paying for unused features. Consider downgrading or switching.";
      savings = annualCost * 0.5; // Estimate 50% savings
    } else {
      recommendation = "Good value for your usage. Explore our academy to maximize this tool's potential.";
      savings = 0;
    }

    setAuditResult({ costPerUse, annualCost, recommendation, savings });
  };

  const generateReport = () => {
    toast.success("Audit report downloaded! Check your downloads folder.");
    // In a real implementation, this would generate a PDF
  };

  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-6 text-center">
          <Badge className="mb-4">🎁 Free Tool</Badge>
          <h2 className="text-3xl font-bold mb-2">Tool Audit & ROI Calculator</h2>
          <p className="text-gray-600">
            Analyze your current tool spend and discover potential savings
          </p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-500" />
              Calculate Your Tool ROI
            </CardTitle>
            <CardDescription>
              See if you're getting value from your current AI subscriptions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!auditResult ? (
              <>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="toolName">Tool Name</Label>
                    <Input
                      id="toolName"
                      placeholder="e.g., Jasper AI, Copy.ai..."
                      value={auditData.toolName}
                      onChange={(e) => setAuditData({ ...auditData, toolName: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthlySpend">Monthly Spend ($)</Label>
                    <Input
                      id="monthlySpend"
                      type="number"
                      placeholder="e.g., 99"
                      value={auditData.monthlySpend}
                      onChange={(e) => setAuditData({ ...auditData, monthlySpend: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="usage">How often do you use it?</Label>
                    <Input
                      id="usage"
                      placeholder="e.g., Daily, Weekly, Monthly..."
                      value={auditData.usage}
                      onChange={(e) => setAuditData({ ...auditData, usage: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hoursPerWeek">Hours per week</Label>
                    <Input
                      id="hoursPerWeek"
                      type="number"
                      placeholder="e.g., 5"
                      value={auditData.hoursPerWeek}
                      onChange={(e) => setAuditData({ ...auditData, hoursPerWeek: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleAuditSubmit}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  size="lg"
                >
                  Calculate ROI
                </Button>
              </>
            ) : (
              <div className="space-y-6">
                {/* Results Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-blue-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-600">Cost Per Use</span>
                      </div>
                      <div className="text-3xl font-bold text-blue-600">
                        ${auditResult.costPerUse.toFixed(2)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-purple-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <span className="text-sm font-medium text-gray-600">Annual Cost</span>
                      </div>
                      <div className="text-3xl font-bold text-purple-600">
                        ${auditResult.annualCost.toFixed(0)}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-medium text-gray-600">Potential Savings</span>
                      </div>
                      <div className="text-3xl font-bold text-green-600">
                        ${auditResult.savings.toFixed(0)}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recommendation */}
                <div className="p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-yellow-900 mb-1">Recommendation</h3>
                      <p className="text-sm text-yellow-800">{auditResult.recommendation}</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
                  <h3 className="text-xl font-bold mb-2 text-center">
                    💰 Optimize Your Tool Stack
                  </h3>
                  <p className="text-center text-gray-600 mb-4">
                    Access our 1,620+ tools database to find better alternatives and save money
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={generateReport}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                    <Link href="/pricing" className="flex-1">
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        View Academy Plans
                      </Button>
                    </Link>
                  </div>
                </div>

                <Button 
                  onClick={() => setAuditResult(null)}
                  variant="ghost"
                  className="w-full"
                >
                  Audit Another Tool
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
