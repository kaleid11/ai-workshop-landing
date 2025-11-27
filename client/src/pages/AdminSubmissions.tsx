import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Loader2, MessageSquare, BarChart3, Download, Search, Filter } from "lucide-react";
import { AdminNav } from "@/components/AdminNav";

export default function AdminSubmissions() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "quick" | "full">("all");

  const { data, isLoading, error } = trpc.admin.getAllSubmissions.useQuery();

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      setLocation("/");
    }
  }, [user, authLoading, setLocation]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Error Loading Submissions</CardTitle>
            <CardDescription>{error.message}</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const { feedback = [], assessments = [] } = data || {};

  // Filter assessments
  const filteredAssessments = assessments.filter((a) => {
    const matchesSearch =
      searchTerm === "" ||
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.company && a.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === "all" || a.assessmentType === filterType;
    return matchesSearch && matchesFilter;
  });

  // Filter feedback
  const filteredFeedback = feedback.filter((f) => {
    return (
      searchTerm === "" ||
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (f.company && f.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const downloadCSV = (type: "feedback" | "assessments") => {
    let csvContent = "";
    let filename = "";

    if (type === "feedback") {
      csvContent =
        "Name,Email,Company,Current Challenges,Topics Interested,Preferred Format,Additional Comments,Submitted At\\n";
      filteredFeedback.forEach((f) => {
        csvContent += `"${f.name}","${f.email}","${f.company || ""}","${f.currentChallenges}","${f.topicsInterested}","${f.preferredFormat}","${f.additionalComments || ""}","${new Date(f.createdAt).toLocaleString()}"\\n`;
      });
      filename = "session-feedback.csv";
    } else {
      csvContent =
        "Name,Email,Company,Phone,Type,Score,Report Generated,Email Sent,CRM Pushed,Source,Submitted At\\n";
      filteredAssessments.forEach((a) => {
        csvContent += `"${a.name}","${a.email}","${a.company || ""}","${a.phone || ""}","${a.assessmentType}",${a.score},${a.reportGenerated ? "Yes" : "No"},${a.emailSent ? "Yes" : "No"},${a.crmPushed ? "Yes" : "No"},"${a.source || ""}","${new Date(a.createdAt).toLocaleString()}"\\n`;
      });
      filename = "assessment-results.csv";
    }

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <div className="py-12">
      <div className="container max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Submissions</h1>
          <p className="text-gray-600">View and export all feedback and assessment submissions</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterType === "all" ? "default" : "outline"}
                  onClick={() => setFilterType("all")}
                  size="sm"
                >
                  All
                </Button>
                <Button
                  variant={filterType === "quick" ? "default" : "outline"}
                  onClick={() => setFilterType("quick")}
                  size="sm"
                >
                  Quick
                </Button>
                <Button
                  variant={filterType === "full" ? "default" : "outline"}
                  onClick={() => setFilterType("full")}
                  size="sm"
                >
                  Full
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="assessments" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="assessments">
              <BarChart3 className="w-4 h-4 mr-2" />
              Assessments ({filteredAssessments.length})
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <MessageSquare className="w-4 h-4 mr-2" />
              Feedback ({filteredFeedback.length})
            </TabsTrigger>
          </TabsList>

          {/* Assessments Tab */}
          <TabsContent value="assessments" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Assessment Results</h2>
              <Button onClick={() => downloadCSV("assessments")} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredAssessments.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-gray-500">
                    No assessment results found
                  </CardContent>
                </Card>
              ) : (
                filteredAssessments.map((assessment) => (
                  <Card key={assessment.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{assessment.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {assessment.email}
                            {assessment.company && ` • ${assessment.company}`}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={assessment.assessmentType === "full" ? "default" : "secondary"}>
                            {assessment.assessmentType === "full" ? "Full Scorecard" : "Quick Audit"}
                          </Badge>
                          <div className="text-sm text-gray-500">
                            {new Date(assessment.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-600">Score</div>
                          <div className="text-2xl font-bold text-brand-purple">{assessment.score}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Report</div>
                          <div className="text-sm font-medium">
                            {assessment.reportGenerated ? "✅ Generated" : "❌ Not Generated"}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Email</div>
                          <div className="text-sm font-medium">
                            {assessment.emailSent ? "✅ Sent" : "❌ Not Sent"}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">CRM</div>
                          <div className="text-sm font-medium">
                            {assessment.crmPushed ? "✅ Pushed" : "❌ Not Pushed"}
                          </div>
                        </div>
                      </div>
                      {assessment.source && (
                        <div className="text-sm text-gray-600">Source: {assessment.source}</div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Session Feedback</h2>
              <Button onClick={() => downloadCSV("feedback")} variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredFeedback.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center text-gray-500">
                    No feedback submissions found
                  </CardContent>
                </Card>
              ) : (
                filteredFeedback.map((fb) => (
                  <Card key={fb.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{fb.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {fb.email}
                            {fb.company && ` • ${fb.company}`}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge>{fb.preferredFormat}</Badge>
                          <div className="text-sm text-gray-500">
                            {new Date(fb.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm font-semibold text-gray-700 mb-1">Current Challenges:</div>
                        <p className="text-sm text-gray-600">{fb.currentChallenges}</p>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-700 mb-1">Topics Interested:</div>
                        <p className="text-sm text-gray-600">{fb.topicsInterested}</p>
                      </div>
                      {fb.additionalComments && (
                        <div>
                          <div className="text-sm font-semibold text-gray-700 mb-1">Additional Comments:</div>
                          <p className="text-sm text-gray-600">{fb.additionalComments}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </div>
  );
}
