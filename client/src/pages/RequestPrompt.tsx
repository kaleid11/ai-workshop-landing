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

export default function RequestPrompt() {
  const [, setLocation] = useLocation();
  const navigate = (path: string) => setLocation(path);
  const { user, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    promptTitle: "",
    promptText: "",
    category: "",
    description: "",
    useCase: "",
    model: "",
    results: "",
  });

  const submitRequest = trpc.community.submitPromptRequest.useMutation({
    onSuccess: () => {
      toast.success("Prompt request submitted successfully! We'll review it soon.");
      setFormData({
        promptTitle: "",
        promptText: "",
        category: "",
        description: "",
        useCase: "",
        model: "",
        results: "",
      });
      setTimeout(() => navigate("/portal"), 2000);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to submit prompt request");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.promptTitle || !formData.promptText || !formData.category || !formData.description) {
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
              Please log in to submit a prompt request
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
            <CardTitle className="text-3xl">Request a Prompt</CardTitle>
            <CardDescription className="text-lg">
              Share your best AI prompts with the community and help others achieve better results
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="promptTitle">
                  Prompt Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="promptTitle"
                  placeholder="e.g., Professional Email Writer, Social Media Post Generator"
                  value={formData.promptTitle}
                  onChange={(e) => setFormData({ ...formData, promptTitle: e.target.value })}
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
                    <SelectItem value="Content Creation">Content Creation</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Code Generation">Code Generation</SelectItem>
                    <SelectItem value="Data Analysis">Data Analysis</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Image Generation">Image Generation</SelectItem>
                    <SelectItem value="Video Generation">Video Generation</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Social Media">Social Media</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="promptText">
                  The Prompt <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="promptText"
                  placeholder="Paste your full prompt here..."
                  value={formData.promptText}
                  onChange={(e) => setFormData({ ...formData, promptText: e.target.value })}
                  rows={8}
                  required
                  className="font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Include any placeholders in [brackets] that users should replace
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Prompt Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this prompt does and when to use it..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Best AI Model</Label>
                <Input
                  id="model"
                  placeholder="e.g., ChatGPT-4, Claude 3.5 Sonnet, Gemini 2.0"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="useCase">Use Case / Application</Label>
                <Textarea
                  id="useCase"
                  placeholder="What specific problem does this prompt solve? When should someone use it?"
                  value={formData.useCase}
                  onChange={(e) => setFormData({ ...formData, useCase: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="results">Example Results (Optional)</Label>
                <Textarea
                  id="results"
                  placeholder="Share an example of what this prompt produces..."
                  value={formData.results}
                  onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                  rows={4}
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
                    "Submit Prompt"
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
              <li>• If approved, the prompt will be added to our library with your name as contributor</li>
              <li>• We may make minor edits for clarity or formatting</li>
              <li>• You'll be notified when your prompt goes live</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
