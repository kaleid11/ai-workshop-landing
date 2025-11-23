import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Mail, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Link } from "wouter";

export default function AdminAssessments() {
  const { user, loading } = useAuth();
  const { data: assessments, isLoading } = trpc.assessment.getAll.useQuery();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You need admin access to view this page</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const exportToCSV = () => {
    if (!assessments || assessments.length === 0) return;

    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Company",
      "Type",
      "Score",
      "Report Generated",
      "Email Sent",
      "CRM Pushed",
      "Source",
      "Created At",
    ];

    const rows = assessments.map((a) => [
      a.id,
      a.name,
      a.email,
      a.phone || "",
      a.company || "",
      a.assessmentType,
      a.score,
      a.reportGenerated ? "Yes" : "No",
      a.emailSent ? "Yes" : "No",
      a.crmPushed ? "Yes" : "No",
      a.source || "",
      new Date(a.createdAt).toLocaleString("en-AU"),
    ]);

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `assessment-leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-brand-purple mb-2">Assessment Leads</h1>
              <p className="text-gray-600">
                View and export all assessment submissions from quiz and scorecard pages
              </p>
            </div>
            <Button onClick={exportToCSV} disabled={!assessments || assessments.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              Export to CSV
            </Button>
          </div>

          {/* Stats */}
          {assessments && (
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl">{assessments.length}</CardTitle>
                  <CardDescription>Total Assessments</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl">
                    {assessments.filter((a) => a.assessmentType === "quick").length}
                  </CardTitle>
                  <CardDescription>Quick Tool Audits</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl">
                    {assessments.filter((a) => a.assessmentType === "full").length}
                  </CardTitle>
                  <CardDescription>Full Scorecards</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl">
                    {assessments.filter((a) => a.crmPushed === 1).length}
                  </CardTitle>
                  <CardDescription>Pushed to CRM</CardDescription>
                </CardHeader>
              </Card>
            </div>
          )}
        </div>

        {/* Assessments List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
          </div>
        ) : !assessments || assessments.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-600">No assessments submitted yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {assessments.map((assessment) => {
              const recommendations = JSON.parse(assessment.recommendations);
              const answers = JSON.parse(assessment.answers);

              return (
                <Card key={assessment.id} className="border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{assessment.name}</CardTitle>
                        <CardDescription className="mt-1">
                          <a href={`mailto:${assessment.email}`} className="text-brand-blue hover:underline">
                            <Mail className="w-3 h-3 inline mr-1" />
                            {assessment.email}
                          </a>
                          {assessment.phone && <span className="ml-4">📞 {assessment.phone}</span>}
                          {assessment.company && <span className="ml-4">🏢 {assessment.company}</span>}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={assessment.assessmentType === "quick" ? "default" : "secondary"}
                          className="mb-2"
                        >
                          {assessment.assessmentType === "quick" ? "Quick Audit" : "Full Scorecard"}
                        </Badge>
                        <div className="text-2xl font-bold text-brand-purple">
                          {assessment.score}
                          {assessment.assessmentType === "full" && "/100"}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Status Indicators */}
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        {assessment.reportGenerated ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span>Report Generated</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {assessment.emailSent ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span>Email Sent</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {assessment.crmPushed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span>CRM Pushed</span>
                      </div>
                    </div>

                    {/* Recommendations */}
                    {recommendations.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Recommendations:</h4>
                        <div className="flex flex-wrap gap-2">
                          {recommendations.map((rec: string, i: number) => (
                            <Badge key={i} variant="outline">
                              {rec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="text-sm text-gray-600 pt-2 border-t">
                      <span>Source: {assessment.source || "unknown"}</span>
                      <span className="ml-4">
                        Submitted: {new Date(assessment.createdAt).toLocaleString("en-AU")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
