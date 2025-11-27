import { Button } from "@/components/ui/button";
import { APP_LOGO } from "@/const";
import { CheckCircle2, ArrowRight, BookOpen, Calendar, Database, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] to-[rgb(var(--brand-blue))] text-white p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <img src={APP_LOGO} alt="Tech Horizon Academy Logo" className="w-32 h-32 mx-auto" />
        
        <div className="bg-white/10 backdrop-blur-md rounded-full w-24 h-24 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-16 h-16 text-brand-orange" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to Tech Horizon Academy!
          </h1>
          <p className="text-xl text-white/90">
            Your payment was successful. Your learning journey starts now!
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-left space-y-6">
          <h2 className="text-2xl font-bold text-center mb-6">What You Get Access To:</h2>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Database className="w-6 h-6 text-brand-orange" />
              </div>
              <div>
                <h3 className="font-bold mb-1">1,620+ AI Tools Database</h3>
                <p className="text-white/80 text-sm">
                  Searchable database of curated AI tools across all categories with referral links and recommendations.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <BookOpen className="w-6 h-6 text-brand-blue" />
              </div>
              <div>
                <h3 className="font-bold mb-1">118+ Prompts & 21 Wiki Guides</h3>
                <p className="text-white/80 text-sm">
                  Battle-tested prompts for every AI use case plus comprehensive guides on Manus, Gemini, NotebookLM, and more.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Calendar className="w-6 h-6 text-brand-green" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Live Workshops & Recordings</h3>
                <p className="text-white/80 text-sm">
                  Access to live workshops based on your tier (check your workshop credits in the portal) plus recordings for Lite+ members.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-brand-cream" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Private Community Access</h3>
                <p className="text-white/80 text-sm">
                  Join our WhatsApp community and Facebook group to connect with other AI pioneers and get support.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-brand-orange/20 backdrop-blur-md rounded-2xl p-6 border border-brand-orange/30">
          <h3 className="text-xl font-bold mb-2">📧 Check Your Email</h3>
          <p className="text-white/90 text-sm">
            You'll receive a confirmation email with your purchase details and next steps within the next few minutes.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link href="/portal">
            <Button 
              size="lg" 
              className="bg-brand-orange hover:bg-brand-orange/90 text-white group"
            >
              Access Your Portal
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/">
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30"
            >
              Back to Home
            </Button>
          </Link>
        </div>

        <p className="text-sm text-white/70">
          Questions? Email us at <a href="mailto:info@thzn.world" className="underline hover:text-white">info@thzn.world</a>
        </p>
      </div>
    </div>
  );
}
