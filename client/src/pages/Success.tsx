import { Button } from "@/components/ui/button";
import { APP_LOGO } from "@/const";
import { CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] to-[rgb(var(--brand-blue))] text-white p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <img src={APP_LOGO} alt="Workshop Logo" className="w-32 h-32 mx-auto" />
        
        <div className="bg-white/10 backdrop-blur-md rounded-full w-24 h-24 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-16 h-16 text-brand-orange" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to the Workshop!
          </h1>
          <p className="text-xl text-white/90">
            Your payment was successful. You're all set!
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-left space-y-4">
          <h2 className="text-2xl font-bold text-center mb-6">What Happens Next?</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold mb-1">Check Your Email</h3>
                <p className="text-white/80 text-sm">
                  You'll receive a confirmation email with your workshop details and access instructions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold mb-1">Access Your Portal</h3>
                <p className="text-white/80 text-sm">
                  Log in to your member portal to download guides, templates, and get your WhatsApp group link.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-green flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold mb-1">Join the Community</h3>
                <p className="text-white/80 text-sm">
                  Connect with fellow operators in our private WhatsApp group for support and networking.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-cream text-brand-purple flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 className="font-bold mb-1">Attend the Workshop</h3>
                <p className="text-white/80 text-sm">
                  Mark your calendar for the live 2-hour workshop. Can't make it? The replay will be available.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-brand-orange hover:bg-brand-orange/90 text-white"
            >
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-sm text-white/70">
          Questions? Check your email for contact information and support details.
        </p>
      </div>
    </div>
  );
}
