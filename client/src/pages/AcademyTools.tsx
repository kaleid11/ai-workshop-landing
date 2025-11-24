import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Copy, Image, Loader2, Sparkles, Wand2, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function AcademyTools() {
  const { user, loading, isAuthenticated } = useAuth();
  const [headshotStyle, setHeadshotStyle] = useState<"professional" | "casual" | "creative">("professional");
  const [headshotBackground, setHeadshotBackground] = useState("neutral");
  const [brandType, setBrandType] = useState<"logo" | "banner" | "social_post" | "thumbnail">("logo");
  const [brandDescription, setBrandDescription] = useState("");
  const [brandColors, setBrandColors] = useState("");
  const [brandStyle, setBrandStyle] = useState("");
  const [repurposeContent, setRepurposeContent] = useState("");
  const [repurposePlatform, setRepurposePlatform] = useState<"instagram" | "facebook" | "linkedin" | "twitter" | "tiktok" | "youtube">("instagram");

  const generateHeadshot = trpc.academy.tools.generateHeadshot.useMutation();
  const generateBrandArtifact = trpc.academy.tools.generateBrandArtifact.useMutation();
  const repurposeContentMutation = trpc.academy.tools.repurposeContent.useMutation();

  async function handleGenerateHeadshot() {
    try {
      const result = await generateHeadshot.mutateAsync({
        style: headshotStyle,
        background: headshotBackground,
      });
      
      await navigator.clipboard.writeText(result.prompt);
      toast.success("Headshot prompt copied to clipboard!");
    } catch (error) {
      toast.error("Failed to generate headshot prompt");
    }
  }

  async function handleGenerateBrandArtifact() {
    if (!brandDescription.trim()) {
      toast.error("Please enter a description");
      return;
    }

    try {
      const result = await generateBrandArtifact.mutateAsync({
        type: brandType,
        description: brandDescription,
        brandColors: brandColors || undefined,
        style: brandStyle || undefined,
      });
      
      await navigator.clipboard.writeText(result.prompt);
      toast.success("Brand artifact prompt copied to clipboard!");
    } catch (error) {
      toast.error("Failed to generate brand artifact prompt");
    }
  }

  async function handleRepurposeContent() {
    if (!repurposeContent.trim()) {
      toast.error("Please enter content to repurpose");
      return;
    }

    try {
      await repurposeContentMutation.mutateAsync({
        content: repurposeContent,
        platform: repurposePlatform,
        count: 3,
      });
      toast.success("Content variations generated!");
    } catch (error) {
      toast.error("Failed to generate content variations");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-purple mx-auto mb-4" />
          <p className="text-gray-600">Loading Academy tools...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] via-[rgb(var(--brand-blue))] to-[rgb(var(--brand-dark-purple))] text-white">
        <div className="container max-w-md text-center space-y-6 p-8">
          <img src={APP_LOGO} alt="Workshop Logo" className="w-24 h-24 mx-auto" />
          <h1 className="text-3xl font-bold">Academy Tools Access</h1>
          <p className="text-white/80">
            Please sign in to access Academy tools.
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full">
              Sign In to Continue
            </Button>
          </a>
          <Link href="/">
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[rgb(var(--brand-dark-purple))] to-[rgb(var(--brand-blue))] text-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={APP_LOGO} alt="Workshop Logo" className="w-16 h-16" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Academy Tools</h1>
                <p className="text-white/80">Lite helper tools for content creation</p>
              </div>
            </div>
            <Link href="/portal">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                Back to Portal
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Tools Section */}
      <section className="py-12">
        <div className="container max-w-7xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Headshot Generator */}
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Image className="w-8 h-8 text-purple-500" />
                  <CardTitle className="text-2xl">Headshot Generator</CardTitle>
                </div>
                <CardDescription>
                  Generate professional headshot prompts for AI image generators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Style</Label>
                  <Select value={headshotStyle} onValueChange={(v) => setHeadshotStyle(v as typeof headshotStyle)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Background</Label>
                  <Input
                    value={headshotBackground}
                    onChange={(e) => setHeadshotBackground(e.target.value)}
                    placeholder="e.g., neutral, office, outdoor"
                  />
                </div>

                <Button
                  onClick={handleGenerateHeadshot}
                  disabled={generateHeadshot.isPending}
                  className="w-full bg-purple-500 hover:bg-purple-600"
                >
                  {generateHeadshot.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Prompt
                    </>
                  )}
                </Button>

                {generateHeadshot.data && (
                  <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-sm">Generated Prompt:</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(generateHeadshot.data.prompt);
                          toast.success("Copied to clipboard!");
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 max-h-40 overflow-y-auto">{generateHeadshot.data.prompt}</p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p className="font-semibold">Use with:</p>
                      <p>{generateHeadshot.data.instructions}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Brand Artifact Generator */}
            <Card className="border-2 border-orange-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-8 h-8 text-orange-500" />
                  <CardTitle className="text-2xl">Brand Artifact Generator</CardTitle>
                </div>
                <CardDescription>
                  Generate prompts for logos, banners, and social media graphics
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Type</Label>
                  <Select value={brandType} onValueChange={(v) => setBrandType(v as typeof brandType)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="logo">Logo</SelectItem>
                      <SelectItem value="banner">Banner</SelectItem>
                      <SelectItem value="social_post">Social Post</SelectItem>
                      <SelectItem value="thumbnail">Thumbnail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={brandDescription}
                    onChange={(e) => setBrandDescription(e.target.value)}
                    placeholder="Describe your brand, product, or service..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Brand Colors (optional)</Label>
                  <Input
                    value={brandColors}
                    onChange={(e) => setBrandColors(e.target.value)}
                    placeholder="e.g., orange, purple, blue"
                  />
                </div>

                <div>
                  <Label>Style (optional)</Label>
                  <Input
                    value={brandStyle}
                    onChange={(e) => setBrandStyle(e.target.value)}
                    placeholder="e.g., modern, minimalist, playful"
                  />
                </div>

                <Button
                  onClick={handleGenerateBrandArtifact}
                  disabled={generateBrandArtifact.isPending}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  {generateBrandArtifact.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Prompt
                    </>
                  )}
                </Button>

                {generateBrandArtifact.data && (
                  <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-sm">Generated Prompt:</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(generateBrandArtifact.data.prompt);
                          toast.success("Copied to clipboard!");
                        }}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 max-h-40 overflow-y-auto">{generateBrandArtifact.data.prompt}</p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p><strong>Recommended:</strong> {generateBrandArtifact.data.recommendedDimensions}</p>
                      <p><strong>Tools:</strong> {generateBrandArtifact.data.tools.join(", ")}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Content Repurposer */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <RefreshCw className="w-8 h-8 text-blue-500" />
                  <CardTitle className="text-2xl">Content Repurposer</CardTitle>
                </div>
                <CardDescription>
                  Adapt your content for different social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Platform</Label>
                  <Select value={repurposePlatform} onValueChange={(v) => setRepurposePlatform(v as typeof repurposePlatform)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="twitter">Twitter</SelectItem>
                      <SelectItem value="tiktok">TikTok</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Original Content</Label>
                  <Textarea
                    value={repurposeContent}
                    onChange={(e) => setRepurposeContent(e.target.value)}
                    placeholder="Paste your content here to generate platform-specific variations..."
                    rows={4}
                  />
                </div>

                <Button
                  onClick={handleRepurposeContent}
                  disabled={repurposeContentMutation.isPending}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  {repurposeContentMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Generate Variations
                    </>
                  )}
                </Button>

                {repurposeContentMutation.data && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-3">
                    <p className="font-semibold text-sm mb-2">Platform-Optimized Variations:</p>
                    {repurposeContentMutation.data.variations.map((variation, idx) => (
                      <div key={idx} className="p-3 bg-white rounded border border-blue-100">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs font-semibold text-blue-600">Variation {idx + 1}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(variation);
                              toast.success(`Variation ${idx + 1} copied!`);
                            }}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-700">{variation}</p>
                      </div>
                    ))}
                    <div className="text-xs text-gray-600 mt-3">
                      <p><strong>Platform Tips:</strong> {repurposeContentMutation.data.tips}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <Card className="mt-8 border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-xl">About Academy Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <p>
                These lite tools help you create professional content faster. We generate AI prompts that you can use with external tools like:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>ViralWave Studio</strong> - Social media content automation</li>
                <li><strong>Captions.ai</strong> - Video editing and captions</li>
                <li><strong>Midjourney</strong> - AI image generation</li>
                <li><strong>DALL-E</strong> - AI image generation</li>
                <li><strong>Canva</strong> - Graphic design</li>
              </ul>
              <p className="mt-4">
                <strong>Note:</strong> These tools generate prompts and descriptions. You'll use them with external AI platforms (which you sign up for separately). We teach you how to leverage these tools to their full extent in our workshops!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
