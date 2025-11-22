import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Copy, Lock, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Prompts() {
  const { user, isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  const [tool, setTool] = useState<string>("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const { data: prompts, isLoading } = trpc.academy.getPrompts.useQuery({
    search: search || undefined,
    category: category || undefined,
    tool: tool || undefined,
  });

  const { data: userSubscription } = trpc.academy.getUserSubscription.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const userTier = userSubscription?.tier?.slug || 'free';

  // Get unique categories and tools from prompts
  const categories = Array.from(new Set(prompts?.map((p: any) => p.category).filter(Boolean)));
  const tools = Array.from(new Set(prompts?.map((p: any) => p.tool).filter(Boolean)));
  
  // Tier hierarchy for access control
  const tierHierarchy: Record<string, number> = {
    free: 0,
    starter: 1,
    lite: 2,
    pro: 3,
    elite: 4,
  };

  const hasAccess = (promptTier: string) => {
    return tierHierarchy[userTier] >= tierHierarchy[promptTier];
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Tech Horizon Academy
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/portal">
              <Button variant="outline">Portal</Button>
            </Link>
            {isAuthenticated && (
              <span className="text-sm text-gray-600">Hi, {user?.name}</span>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-12 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">AI Prompts Library</h1>
          <p className="text-xl mb-6">
            Access 118+ expertly crafted prompts using the RIPE framework. 
            {!isAuthenticated && " Get free access to 10 starter prompts."}
          </p>
          {!isAuthenticated && (
            <Link href="/pricing">
              <Button size="lg" variant="secondary">
                Get Full Library
              </Button>
            </Link>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search prompts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={category || "all"} onValueChange={(val) => setCategory(val === "all" ? "" : val)}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat: any) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={tool || "all"} onValueChange={(val) => setTool(val === "all" ? "" : val)}>
              <SelectTrigger>
                <SelectValue placeholder="All Tools" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tools</SelectItem>
                {tools.map((t: any) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Prompts Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading prompts...</p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">
                  Showing {prompts?.length || 0} prompts
                </p>
                {userTier !== 'free' && (
                  <Badge className="bg-purple-100 text-purple-700">
                    {userTier.charAt(0).toUpperCase() + userTier.slice(1)} Member
                  </Badge>
                )}
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {prompts?.map((prompt: any) => {
                  const locked = !hasAccess(prompt.tierRequired);
                  
                  return (
                    <Card key={prompt.id} className={locked ? "opacity-60" : ""}>
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-lg">{prompt.title}</CardTitle>
                          {locked && <Lock className="w-4 h-4 text-gray-400" />}
                        </div>
                        <CardDescription>
                          {prompt.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {prompt.category && (
                            <Badge variant="secondary">{prompt.category}</Badge>
                          )}
                          {prompt.tool && (
                            <Badge variant="outline">{prompt.tool}</Badge>
                          )}
                        </div>

                        {!locked && (
                          <div className="bg-gray-50 rounded p-4 mb-3">
                            <p className="text-sm text-gray-800 font-mono whitespace-pre-wrap line-clamp-4">
                              {prompt.promptText}
                            </p>
                          </div>
                        )}

                        {locked && (
                          <div className="bg-purple-50 border border-purple-200 rounded p-4">
                            <p className="text-purple-700 font-medium mb-1">
                              🔒 {prompt.tierRequired.charAt(0).toUpperCase() + prompt.tierRequired.slice(1)} tier required
                            </p>
                            <p className="text-gray-600 text-sm">
                              Upgrade to access this prompt and the full RIPE framework breakdown
                            </p>
                          </div>
                        )}

                        {!locked && prompt.useCase && (
                          <p className="text-xs text-gray-600 mt-2">
                            💡 Use case: {prompt.useCase}
                          </p>
                        )}
                      </CardContent>

                      <CardFooter className="flex gap-2">
                        {locked ? (
                          <Button className="w-full" variant="outline" asChild>
                            <Link href="/pricing">Upgrade to Unlock</Link>
                          </Button>
                        ) : (
                          <>
                            <Button 
                              className="flex-1" 
                              onClick={() => copyToClipboard(prompt.promptText, prompt.id)}
                            >
                              {copiedId === prompt.id ? (
                                <>
                                  <Check className="w-4 h-4 mr-2" />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4 mr-2" />
                                  Copy Prompt
                                </>
                              )}
                            </Button>
                          </>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>

              {prompts?.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No prompts found matching your filters.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearch("");
                      setCategory("");
                      setTool("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      {userTier === 'free' && (
        <section className="py-16 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Unlock All 118+ Prompts</h2>
            <p className="text-xl mb-8">
              Get full access to our expertly crafted prompts library with RIPE framework breakdowns, 
              plus tools database and workshops for just $27 (founding member price).
            </p>
            <Link href="/pricing">
              <Button size="lg" variant="secondary">
                View Pricing
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Tech Horizon Labs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
