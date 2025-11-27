import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { APP_LOGO, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { AlertCircle, Loader2, Shield, Upload, Users } from "lucide-react";
import { AdminNav } from "@/components/AdminNav";
import { useState } from "react";
import { toast } from "sonner";

export default function Admin() {
  const { user, loading: authLoading } = useAuth();
  const [workshopVideoUrl, setWorkshopVideoUrl] = useState("");
  const [adminToken, setAdminToken] = useState("");

  const generateTokenMutation = trpc.admin.generateToken.useMutation({
    onSuccess: (data) => {
      setAdminToken(data.token);
      toast.success("Admin token generated!");
    },
    onError: () => {
      toast.error("Failed to generate token");
    },
  });

  const uploadReplayMutation = trpc.admin.uploadReplay.useMutation({
    onSuccess: () => {
      toast.success("Workshop replay uploaded!");
      setWorkshopVideoUrl("");
    },
    onError: () => {
      toast.error("Failed to upload replay");
    },
  });

  const handleUploadReplay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workshopVideoUrl.trim()) {
      toast.error("Please enter a video URL");
      return;
    }
    uploadReplayMutation.mutate({ videoUrl: workshopVideoUrl.trim() });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <img src={APP_LOGO} alt="Logo" className="w-16 h-16 mx-auto mb-4" />
            <CardTitle>Login Required</CardTitle>
            <CardDescription>You must be logged in to access the admin portal</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => (window.location.href = getLoginUrl())}>
              Login with Manus
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-red-100 p-4 rounded-full">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You do not have admin privileges</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={() => (window.location.href = "/")}>
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container py-6">
          <div className="flex items-center gap-3">
            <div className="bg-brand-purple/10 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-brand-purple" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-600">Manage workshop content and participants</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <div className="grid gap-6 max-w-4xl">
          {/* Generate Admin Token */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-purple" />
                <CardTitle>Generate Admin Token</CardTitle>
              </div>
              <CardDescription>
                Create a one-time use token to grant admin access to another user
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => generateTokenMutation.mutate()}
                disabled={generateTokenMutation.isPending}
                className="w-full sm:w-auto"
              >
                {generateTokenMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate New Token"
                )}
              </Button>

              {adminToken && (
                <div className="space-y-2">
                  <Label>Admin Token (Share this with the user)</Label>
                  <div className="flex gap-2">
                    <Input value={adminToken} readOnly className="font-mono text-sm" />
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigator.clipboard.writeText(adminToken);
                        toast.success("Token copied to clipboard!");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Send this token to the user and direct them to{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded">/admin-bind</code> to activate
                    admin access
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload Workshop Replay */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-brand-purple" />
                <CardTitle>Upload Workshop Replay</CardTitle>
              </div>
              <CardDescription>
                Add the workshop recording video URL for participants to access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUploadReplay} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL</Label>
                  <Textarea
                    id="videoUrl"
                    placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                    value={workshopVideoUrl}
                    onChange={(e) => setWorkshopVideoUrl(e.target.value)}
                    disabled={uploadReplayMutation.isPending}
                    rows={3}
                  />
                  <p className="text-sm text-gray-600">
                    Paste the URL of your workshop recording (YouTube, Vimeo, or direct video link)
                  </p>
                </div>
                <Button
                  type="submit"
                  disabled={uploadReplayMutation.isPending || !workshopVideoUrl.trim()}
                >
                  {uploadReplayMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    "Upload Replay"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
