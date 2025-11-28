import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Loader2, Sparkles, ArrowLeft } from "lucide-react";

export default function RequestTool() {
  const [, setLocation] = useLocation();
  const navigate = (path: string) => setLocation(path);
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    toolName: "",
    toolUrl: "",
    category: "",
    description: "",
    pricing: "",
    useCase: "",
    whyValuable: "",
  });

  const submitRequest = trpc.community.submitToolRequest.useMutation({
    onSuccess: () => {
      toast.success("Tool request submitted successfully! We'll review it soon.");
      setFormData({
        toolName: "",
        toolUrl: "",
        category: "",
        description: "",
        pricing: "",
        useCase: "",
        whyValuable: "",
      });
      setTimeout(() => navigate("/portal"), 2000);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit tool request");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.toolName || !formData.toolUrl || !formData.category || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    submitRequest.mutate(formData);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
            <CardDescription>
              Please log in to submit a tool request
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.href = getLoginUrl()} className="w-full">
              Log In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/portal")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portal
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-3xl">Request a Tool</CardTitle>
            <CardDescription className="text-lg">
              Help us expand our AI tools database by suggesting tools you find valuable
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="toolName">
                  Tool Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="toolName"
                  placeholder="e.g., ChatGPT, Midjourney, NotebookLM"
                  value={formData.toolName}
                  onChange={(e) => setFormData({ ...formData, toolName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="toolUrl">
                  Tool Website URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="toolUrl"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.toolUrl}
                  onChange={(e) => setFormData({ ...formData, toolUrl: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Text Generation">Text Generation</SelectItem>
                    <SelectItem value="Image Generation">Image Generation</SelectItem>
                    <SelectItem value="Video Generation">Video Generation</SelectItem>
                    <SelectItem value="Audio Generation">Audio Generation</SelectItem>
                    <SelectItem value="Code Generation">Code Generation</SelectItem>
                    <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Automation">Automation</SelectItem>
                    <SelectItem value="Productivity">Productivity</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Tool Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this tool does and its key features..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricing">Pricing Information</Label>
                <Input
                  id="pricing"
                  placeholder="e.g., Free, $20/month, Freemium"
                  value={formData.pricing}
                  onChange={(e) => setFormData({ ...formData, pricing: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="useCase">Your Use Case</Label>
                <Textarea
                  id="useCase"
                  placeholder="How do you use this tool? What problems does it solve for you?"
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whyValuable">Why Should We Add This?</Label>
                <Textarea
                  id="whyValuable"
                  placeholder="Why would this tool be valuable for other Tech Horizon Academy members?"
                  value={formData.whyValuable}
                  onChange={(e) => setFormData({ ...formData, whyValuable: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/portal")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitRequest.isPending}
                  className="flex-1"
                >
                  {submitRequest.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-2">What happens next?</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Our team will review your submission within 2-3 business days</li>
              <li>• If approved, the tool will be added to our database with proper attribution</li>
              <li>• You'll receive credit as the contributor when the tool goes live</li>
              <li>• We may reach out if we need additional information</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
