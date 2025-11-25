import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "tools_signup",
    title: "Sign up for recommended tools",
    description: "Create accounts for ViralWave, Captions.ai, and Higgsfield.ai",
    link: "/portal#tools",
    linkText: "View Tools List",
  },
  {
    id: "brand_prep",
    title: "Prepare your brand materials",
    description: "Use the Gemini Brand Alignment GEM to define your brand voice and style",
    link: "https://gemini.google.com/gem/1mozSqiMQasw2mb-pokjK996ZSJKxyCLa",
    linkText: "Open Gemini GEM",
  },
  {
    id: "whatsapp_join",
    title: "Join the WhatsApp community",
    description: "Connect with other workshop members for support and networking",
    link: "https://chat.whatsapp.com/IvDjUjPdDL9Ksj0Rq3u4Jt",
    linkText: "Join WhatsApp Group",
  },
  {
    id: "portal_tested",
    title: "Test your Portal access",
    description: "Explore all the tools and resources available in your Portal",
  },
  {
    id: "photos_ready",
    title: "Prepare 2-3 recent photos",
    description: "Have photos ready for creating your AI Twin during the workshop",
  },
];

export default function OnboardingChecklist() {
  const { data: progress, refetch } = trpc.onboarding.getProgress.useQuery();
  const updateProgress = trpc.onboarding.updateProgress.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Progress saved!");
    },
  });

  const completedItems = progress?.completedItems || [];
  const completedCount = completedItems.length;
  const totalCount = CHECKLIST_ITEMS.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const toggleItem = (itemId: string) => {
    const newCompleted = completedItems.includes(itemId)
      ? completedItems.filter((id: string) => id !== itemId)
      : [...completedItems, itemId];

    updateProgress.mutate({ completedItems: newCompleted });
  };

  return (
    <Card className="border-2 border-brand-purple">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>🚀 Get Workshop Ready</span>
          <span className="text-sm font-normal text-gray-600">
            {completedCount}/{totalCount} complete
          </span>
        </CardTitle>
        <CardDescription>
          Complete these steps before the workshop for the best experience
        </CardDescription>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-brand-purple h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1 text-center">{progressPercentage}% Complete</p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {CHECKLIST_ITEMS.map((item) => {
          const isCompleted = completedItems.includes(item.id);
          
          return (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                isCompleted
                  ? "bg-green-50 border-green-500"
                  : "bg-white border-gray-200 hover:border-brand-purple"
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    isCompleted
                      ? "bg-green-500 border-green-500"
                      : "bg-white border-gray-300 hover:border-brand-purple"
                  }`}
                >
                  {isCompleted && <Check className="w-4 h-4 text-white" />}
                </button>
                
                <div className="flex-1">
                  <h4
                    className={`font-semibold mb-1 ${
                      isCompleted ? "text-green-900 line-through" : "text-gray-900"
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  
                  {item.link && (
                    <a
                      href={item.link}
                      target={item.link.startsWith("http") ? "_blank" : undefined}
                      rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-brand-purple border-brand-purple hover:bg-brand-purple hover:text-white"
                      >
                        {item.linkText || "Learn More"}
                        {item.link.startsWith("http") && (
                          <ExternalLink className="w-3 h-3 ml-1" />
                        )}
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        
        {completedCount === totalCount && (
          <div className="mt-6 p-4 bg-green-50 border-2 border-green-500 rounded-lg text-center">
            <p className="text-green-900 font-semibold text-lg">🎉 You're all set!</p>
            <p className="text-green-700 text-sm mt-1">
              You're ready for the workshop. See you on November 26!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
