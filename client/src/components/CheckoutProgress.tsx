import { Check } from "lucide-react";

interface CheckoutProgressProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { id: 1, name: "Login", description: "Secure your account" },
  { id: 2, name: "Payment", description: "Choose your plan" },
  { id: 3, name: "Confirmation", description: "You're all set!" }
];

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4">
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-700">
          <div 
            className="h-full bg-orange-500 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    transition-all duration-300 mb-2
                    ${isCompleted 
                      ? 'bg-orange-500 text-white' 
                      : isCurrent
                      ? 'bg-orange-500 text-white ring-4 ring-orange-500/30'
                      : 'bg-gray-700 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </div>

                {/* Step Label */}
                <div className="text-center">
                  <div className={`
                    font-semibold text-sm
                    ${isCurrent || isCompleted ? 'text-white' : 'text-gray-500'}
                  `}>
                    {step.name}
                  </div>
                  <div className="text-xs text-gray-500 hidden sm:block">
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
