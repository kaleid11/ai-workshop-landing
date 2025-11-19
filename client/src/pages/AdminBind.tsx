import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { APP_LOGO, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Loader2, Shield } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function AdminBind() {
  const { user, loading: authLoading } = useAuth();
  const [token, setToken] = useState("");
  const [, setLocation] = useLocation();

  const bindTokenMutation = trpc.admin.bindToken.useMutation({
    onSuccess: () => {
      toast.success("Admin access granted! Redirecting...");
      setTimeout(() => {
        setLocation("/admin");
      }, 1500);
    },
    onError: (error: any) => {
      toast.error(error.message || "Invalid or expired token");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      toast.error("Please enter a token");
      return;
    }
    bindTokenMutation.mutate({ token: token.trim() });
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
            <CardDescription>You must be logged in to bind an admin token</CardDescription>
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-brand-purple/10 p-4 rounded-full">
              <Shield className="w-8 h-8 text-brand-purple" />
            </div>
          </div>
          <CardTitle>Bind Admin Token</CardTitle>
          <CardDescription>
            Enter your admin token to grant admin access to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter admin token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                disabled={bindTokenMutation.isPending}
                className="font-mono"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={bindTokenMutation.isPending || !token.trim()}
            >
              {bindTokenMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Grant Admin Access"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
