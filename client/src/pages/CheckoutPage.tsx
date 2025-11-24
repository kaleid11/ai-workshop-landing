import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { CheckoutProgress } from "@/components/CheckoutProgress";
import { getLoginUrl } from "@/const";
import { Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { isAuthenticated, loading } = useAuth();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Step 1: Need to login
        setCurrentStep(1);
        // Redirect to login with return URL
        const returnUrl = window.location.pathname + window.location.search;
        window.location.href = getLoginUrl(returnUrl);
      } else {
        // Step 2: Ready for payment
        setCurrentStep(2);
        // The Stripe checkout will be handled by the Workshop page
        // This page is just for showing progress
      }
    }
  }, [isAuthenticated, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
          <p className="text-white text-lg">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      <div className="container max-w-4xl mx-auto py-12">
        <CheckoutProgress currentStep={currentStep} />
        
        <div className="text-center mt-12 text-white">
          <h1 className="text-3xl font-bold mb-4">
            {currentStep === 1 && "Redirecting to login..."}
            {currentStep === 2 && "Processing payment..."}
            {currentStep === 3 && "Success! Welcome aboard!"}
          </h1>
          <p className="text-gray-400">
            {currentStep === 1 && "You'll be redirected back after logging in"}
            {currentStep === 2 && "Please complete your payment on the Stripe checkout page"}
            {currentStep === 3 && "Check your email for next steps"}
          </p>
        </div>
      </div>
    </div>
  );
}
