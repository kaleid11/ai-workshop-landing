import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ExternalLink, Lock, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { AIToolPicker } from "@/components/AIToolPicker";

export default function Tools() {
  const { user, isAuthenticated } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("");
  const [pricingModel, setPricingModel] = useState<string>("");

  const { data: tools, isLoading } = trpc.academy.getTools.useQuery({
    search: search || undefined,
    category: category || undefined,
    pricingModel: pricingModel || undefined,
  });

  const { data: userSubscription } = trpc.academy.getUserSubscription.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const userTier = userSubscription?.tier?.slug || 'free';
  const hasPaidTier = userSubscription?.tier !== null && userSubscription?.tier !== undefined;

  // Get unique categories from tools
  const categories = Array.from(new Set(tools?.map((t: any) => t.category).filter(Boolean)));
  
  // Anyone with a paid tier (Access Pass, Workshop, Starter, Lite, Pro, Enterprise) gets full access
  const hasAccess = (toolTier: string) => {
    return hasPaidTier; // All paid tiers get full access to tools database
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent cursor-pointer">
              Tech Horizon Academy
            </span>
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
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-12 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">AI Tools Database</h1>
          <p className="text-xl mb-6">
            Discover 1,620+ curated AI tools to automate your business. 
            {!isAuthenticated && " Sign up for free access to basic tools."}
          </p>
          {!isAuthenticated && (
            <Button size="lg" variant="secondary" onClick={() => window.location.href = '/pricing'}>
              Get Full Access
            </Button>
          )}
        </div>
      </section>

      {/* AI Tool Picker - Prominent Placement */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto max-w-6xl">
          <AIToolPicker type="tool" />
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 px-4 bg-gray-50 border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Or browse by filters</h3>
            <Link href="/tool-comparisons">
              <Button variant="outline" size="sm">
                Compare Tools <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tools..."
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
            <Select value={pricingModel || "all"} onValueChange={(val) => setPricingModel(val === "all" ? "" : val)}>
              <SelectTrigger>
                <SelectValue placeholder="All Pricing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pricing</SelectItem>
                <SelectItem value="Free">Free</SelectItem>
                <SelectItem value="Freemium">Freemium</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading tools...</p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-600">
                  Showing {tools?.length || 0} tools
                </p>
                {userTier !== 'free' && (
                  <Badge className="bg-orange-100 text-orange-700">
                    {userTier.charAt(0).toUpperCase() + userTier.slice(1)} Member
                  </Badge>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools?.map((tool: any) => {
                  const locked = !hasAccess(tool.tierRequired);
                  
                  return (
                    <Card key={tool.id} className={locked ? "opacity-60" : ""}>
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          {locked && <Lock className="w-4 h-4 text-gray-400" />}
                        </div>
                        <CardDescription className="line-clamp-2">
                          {tool.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {tool.category && (
                            <Badge variant="secondary">{tool.category}</Badge>
                          )}
                          {tool.pricingModel && (
                            <Badge variant="outline">{tool.pricingModel}</Badge>
                          )}
                        </div>

                        {tool.useCase && !locked && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            💡 {tool.useCase}
                          </p>
                        )}

                        {locked && (
                          <div className="bg-orange-50 border border-orange-200 rounded p-3 text-sm">
                            <p className="text-orange-700 font-medium mb-1">
                              🔒 {tool.tierRequired.charAt(0).toUpperCase() + tool.tierRequired.slice(1)} tier required
                            </p>
                            <p className="text-gray-600 text-xs">
                              Upgrade to access full details and quick start guides
                            </p>
                          </div>
                        )}
                      </CardContent>

                      <CardFooter>
                        {locked ? (
                          <Button className="w-full" variant="outline" asChild>
                            <Link href="/pricing">Upgrade to Unlock</Link>
                          </Button>
                        ) : (
                          <Button className="w-full" variant="outline" asChild>
                            <a href={tool.url} target="_blank" rel="noopener noreferrer">
                              Visit Tool <ExternalLink className="w-4 h-4 ml-2" />
                            </a>
                          </Button>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>

              {tools?.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No tools found matching your filters.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearch("");
                      setCategory("");
                      setPricingModel("");
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
        <section className="py-16 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
          <div className="container mx-auto text-center max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">Unlock All 1,620 Tools</h2>
            <p className="text-xl mb-8">
              Get full access to our curated tools database, plus prompts library, 
              workshops, and the THL Tool Picker GPT for just $27 (founding member price).
            </p>
            <Button size="lg" variant="secondary" onClick={() => window.location.href = '/pricing'}>
              View Pricing
            </Button>
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
