import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { APP_TITLE } from "@/const";
import { CheckCircle2, XCircle, Loader2, Download, Calendar } from "lucide-react";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useState } from "react";

export default function AdminWorkshops() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  const { data: accessRequests, isLoading, refetch } = trpc.admin.getWorkshopAccessRequests.useQuery();
  
  const reviewRequestMutation = trpc.admin.reviewWorkshopRequest.useMutation({
    onSuccess: () => {
      toast.success("Request reviewed successfully");
      setSelectedRequest(null);
      setAdminNotes("");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to review request");
    },
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const exportAttendeeEmails = (workshopId: number) => {
    const approved = accessRequests?.filter(
      (req) => req.workshopId === workshopId && req.status === "approved"
    );
    
    if (!approved || approved.length === 0) {
      toast.error("No approved attendees for this workshop");
      return;
    }

    const emails = approved.map((req) => req.userEmail).join(", ");
    navigator.clipboard.writeText(emails);
    toast.success(`${approved.length} emails copied to clipboard`);
  };

  const handleReview = (requestId: number, status: "approved" | "rejected") => {
    reviewRequestMutation.mutate({
      requestId,
      status,
      adminNotes: adminNotes || undefined,
    });
  };

  // Check if user is admin
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    setLocation("/");
    return null;
  }

  const pendingRequests = accessRequests?.filter((req) => req.status === "pending") || [];
  const approvedRequests = accessRequests?.filter((req) => req.status === "approved") || [];
  const rejectedRequests = accessRequests?.filter((req) => req.status === "rejected") || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-brand-purple cursor-pointer">{APP_TITLE}</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="outline">Admin Dashboard</Button>
            </Link>
            <span className="text-sm text-gray-600">Admin: {user.name}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-brand-purple mb-2">Workshop Access Requests</h1>
          <p className="text-gray-600">Review and approve workshop access requests from members</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-600">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-orange-600">{pendingRequests.length}</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-600">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-600">{approvedRequests.length}</p>
            </CardContent>
          </Card>
          <Card className="border-2 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-red-600">{rejectedRequests.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Requests Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-brand-purple">Pending Requests</CardTitle>
            <CardDescription>Review and approve workshop access requests</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
              </div>
            ) : pendingRequests.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No pending requests</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Workshop</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Tokens Used</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.userName}</TableCell>
                      <TableCell>{request.userEmail}</TableCell>
                      <TableCell className="max-w-xs truncate">{request.workshopTitle}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {formatDate(request.requestedAt)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.tokensUsed} token</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => {
                              setSelectedRequest(request.id);
                              setAdminNotes("");
                            }}
                            disabled={reviewRequestMutation.isPending}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReview(request.id, "rejected")}
                            disabled={reviewRequestMutation.isPending}
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Admin Notes Modal (Simple inline version) */}
        {selectedRequest && (
          <Card className="mb-8 border-2 border-brand-purple">
            <CardHeader>
              <CardTitle className="text-brand-purple">Add Admin Notes (Optional)</CardTitle>
              <CardDescription>
                Add internal notes before approving this request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Internal notes (optional)..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleReview(selectedRequest, "approved")}
                  disabled={reviewRequestMutation.isPending}
                >
                  {reviewRequestMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Approving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Confirm Approval
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedRequest(null);
                    setAdminNotes("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Approved Requests by Workshop */}
        <Card>
          <CardHeader>
            <CardTitle className="text-brand-purple">Approved Attendees by Workshop</CardTitle>
            <CardDescription>Export email lists for Google Calendar invites</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
              </div>
            ) : approvedRequests.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No approved requests yet</p>
            ) : (
              <div className="space-y-6">
                {Array.from(new Set(approvedRequests.map((r) => r.workshopId))).map((workshopId) => {
                  const workshopRequests = approvedRequests.filter((r) => r.workshopId === workshopId);
                  const workshopTitle = workshopRequests[0]?.workshopTitle;
                  
                  return (
                    <div key={workshopId} className="border-2 border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{workshopTitle}</h3>
                          <p className="text-sm text-gray-600">{workshopRequests.length} approved attendees</p>
                        </div>
                        <Button
                          onClick={() => exportAttendeeEmails(workshopId)}
                          className="bg-brand-purple hover:bg-brand-purple/90 text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Copy Emails
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {workshopRequests.map((request) => (
                          <div
                            key={request.id}
                            className="flex items-center justify-between bg-gray-50 rounded px-3 py-2"
                          >
                            <div>
                              <p className="font-medium text-gray-900">{request.userName}</p>
                              <p className="text-sm text-gray-600">{request.userEmail}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-700">Approved</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
