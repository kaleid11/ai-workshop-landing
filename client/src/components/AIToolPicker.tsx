import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Sparkles, ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface AIToolPickerProps {
  type: "tool" | "prompt";
  onSelect?: (item: any) => void;
}

export function AIToolPicker({ type, onSelect }: AIToolPickerProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const suggestMutation = trpc.academy.suggestTools.useMutation({
    onSuccess: (data) => {
      if (data.suggestions.length === 0) {
        toast.info("No matching tools found. Try rephrasing your query.");
      }
    },
    onError: (error) => {
      toast.error(`Failed to get suggestions: ${error.message}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please describe what you're looking for");
      return;
    }

    await suggestMutation.mutateAsync({ query, type });
    setIsOpen(true);
  };

  const handleSelectItem = (item: any) => {
    onSelect?.(item);
    setIsOpen(false);
    setQuery("");
    suggestMutation.reset();
  };

  return (
    <div className="w-full space-y-4">
      {/* AI Search Input */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-start gap-2">
            <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-3 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-purple-900 dark:text-purple-100">
                AI {type === "tool" ? "Tool" : "Prompt"} Picker
              </label>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  type === "tool"
                    ? "Describe what you need... (e.g., 'I need to create marketing videos with AI avatars')"
                    : "Describe your task... (e.g., 'I need to write engaging social media posts')"
                }
                className="bg-white dark:bg-gray-900"
                disabled={suggestMutation.isPending}
              />
              <p className="text-xs text-purple-700 dark:text-purple-300">
                💡 Use natural language - our AI will find the perfect {type}s for your needs
              </p>
            </div>
          </div>
          <Button
            type="submit"
            disabled={suggestMutation.isPending || !query.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            {suggestMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Finding perfect {type}s...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Get AI Suggestions
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* AI Suggestions Results */}
      {isOpen && suggestMutation.data && (
        <div className="space-y-4">
          {/* AI Explanation */}
          {suggestMutation.data.explanation && (
            <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    AI Recommendation
                  </h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {suggestMutation.data.explanation}
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Suggested Items */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">
              Suggested {type === "tool" ? "Tools" : "Prompts"} ({suggestMutation.data.suggestions.length})
            </h3>
            {suggestMutation.data.suggestions.map((item: any, index: number) => (
              <Card
                key={item.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleSelectItem(item)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                        #{index + 1}
                      </span>
                      <h4 className="font-semibold text-lg">{item.name || item.title}</h4>
                      {item.category && (
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {item.description}
                    </p>
                    {item.matchReason && (
                      <p className="text-xs text-purple-600 dark:text-purple-400 italic">
                        💡 {item.matchReason}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setIsOpen(false);
              suggestMutation.reset();
            }}
            className="w-full"
          >
            Close Suggestions
          </Button>
        </div>
      )}
    </div>
  );
}
