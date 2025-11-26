import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, X } from "lucide-react";
import { Link } from "wouter";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  link?: string;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "tools",
    title: "Explore 1,620+ AI Tools",
    description: "Browse our curated database of AI tools across all categories",
    icon: "🛠️",
    link: "/portal/tools"
  },
  {
    id: "prompts",
    title: "Save Your First Prompt",
    description: "Access 118 expert-curated prompts for every scenario",
    icon: "💡",
    link: "/portal/prompts"
  },
  {
    id: "wiki",
    title: "Read the Knowledge Base",
    description: "12 comprehensive guides on AI mastery and workflows",
    icon: "📚",
    link: "/portal/wiki"
  },
  {
    id: "workshop",
    title: "Book Your First Workshop",
    description: "Join live sessions with Huxley and learn hands-on",
    icon: "🎓",
    link: "/workshops"
  }
];

export function OnboardingWelcome() {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if user has seen onboarding
    const hasSeenOnboarding = localStorage.getItem("onboarding_completed");
    if (!hasSeenOnboarding) {
      // Show after 1 second delay
      setTimeout(() => setOpen(true), 1000);
    }
  }, []);

  const handleSkip = () => {
    localStorage.setItem("onboarding_completed", "true");
    setOpen(false);
  };

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("onboarding_completed", "true");
      setOpen(false);
    }
  };

  const currentStepData = ONBOARDING_STEPS[currentStep];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">Welcome to Tech Horizon Academy! 🎉</DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleSkip}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <DialogDescription>
            Let's get you started with a quick tour of the platform
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          {/* Progress indicator */}
          <div className="flex gap-2 mb-8">
            {ONBOARDING_STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`h-2 flex-1 rounded-full transition-colors ${
                  index <= currentStep ? "bg-brand-orange" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Current step */}
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">{currentStepData.icon}</div>
            <h3 className="text-xl font-bold">{currentStepData.title}</h3>
            <p className="text-muted-foreground">{currentStepData.description}</p>

            {currentStepData.link && (
              <Link href={currentStepData.link}>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    localStorage.setItem("onboarding_completed", "true");
                    setOpen(false);
                  }}
                >
                  Go There Now
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={handleSkip}>
            Skip Tour
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {currentStep + 1} of {ONBOARDING_STEPS.length}
            </span>
            <Button onClick={handleNext}>
              {currentStep < ONBOARDING_STEPS.length - 1 ? (
                <>
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Get Started <Check className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
