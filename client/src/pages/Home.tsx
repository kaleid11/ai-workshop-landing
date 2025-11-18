import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO } from "@/const";
import { CheckCircle2, Clock, Users, Video, Wand2, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const scrollToCheckout = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] via-[rgb(var(--brand-blue))] to-[rgb(var(--brand-dark-purple))] text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnpNNiAzNGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container relative py-20 md:py-32">
          <div className="flex flex-col items-center text-center space-y-8">
            <img src={APP_LOGO} alt="Workshop Logo" className="w-32 h-32 md:w-40 md:h-40" />
            
            <div className="space-y-4 max-w-4xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Unlock Effortless Content Creation With AI
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium">
                The Operator's Social Media Workshop
              </p>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                Make Your Posts, Videos, and Marketing Smarter—in Minutes, Not Days
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-8 py-6 h-auto"
                onClick={scrollToCheckout}
              >
                Get Workshop Access Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 h-auto backdrop-blur-sm"
                onClick={() => document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>

            <p className="text-sm text-white/70 pt-4">
              ⚡ Only 50 seats available—move fast
            </p>
          </div>
        </div>
      </section>

      {/* Big Results Section */}
      <section className="py-16 md:py-24 bg-white" id="benefits">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Big Results. Zero Fluff.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-brand-orange transition-colors">
              <CardHeader>
                <Zap className="w-12 h-12 text-brand-orange mb-4" />
                <CardTitle className="text-xl">Automate Everything</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Automate captions and posts across all platforms. Save hours on repetitive content work.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-blue transition-colors">
              <CardHeader>
                <Video className="w-12 h-12 text-brand-blue mb-4" />
                <CardTitle className="text-xl">Create Videos Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create story-driven videos at the speed of your ideas using cutting-edge AI tools.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-green transition-colors">
              <CardHeader>
                <Users className="w-12 h-12 text-brand-green mb-4" />
                <CardTitle className="text-xl">Connect With Operators</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with business owners who move fast and think smart in our exclusive community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why This Workshop */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[rgb(var(--brand-cream))] to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple">
              Why This Workshop?
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed">
              If you're ready to work like a top operator—saving hours and multiplying your impact—this 
              <span className="font-bold text-brand-orange"> 2-hour live workshop</span> is the shortcut. 
              Get actionable skills, not just theory.
            </p>
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              What You'll Get
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <Wand2 className="w-10 h-10 text-brand-orange mb-2" />
                <CardTitle className="text-2xl">Hands-On Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Master AI-powered workflows for posting, scheduling, and video creation. Tools revealed step-by-step inside the session.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CheckCircle2 className="w-10 h-10 text-brand-blue mb-2" />
                <CardTitle className="text-2xl">Resource Portal Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Download guides, checklists, recaps and bonus templates any time after the workshop.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Users className="w-10 h-10 text-brand-green mb-2" />
                <CardTitle className="text-2xl">Community Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join the private WhatsApp group for ongoing support, networking, and direct access to experienced peers.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Clock className="w-10 h-10 text-brand-purple mb-2" />
                <CardTitle className="text-2xl">Replay & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Couldn't make it live? Access the replay and get your questions answered in the portal or chat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Workshop Modules */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Workshop Modules
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four powerful modules to transform your social media workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-[rgb(var(--brand-blue))] to-[rgb(var(--brand-purple))] flex items-center justify-center">
                <img 
                  src="/images/quick-actions.png" 
                  alt="AI Post Generator" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Module 1: Automate Social Media Posts</CardTitle>
                <CardDescription className="text-base">
                  Learn to generate captions, schedule posts, and manage content across all platforms with AI-powered automation tools.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-[rgb(var(--brand-green))] to-[rgb(var(--brand-blue))] flex items-center justify-center">
                <div className="text-white text-6xl font-bold">Sora 2</div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Module 2: Create Videos with AI</CardTitle>
                <CardDescription className="text-base">
                  Master Sora 2 and other AI video generators to create professional short-form videos from text prompts in minutes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-[rgb(var(--brand-purple))] to-[rgb(var(--brand-orange))]">
                <img 
                  src="/images/ai-edit.webp" 
                  alt="AI Video Editing" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Module 3: Edit Videos with AI</CardTitle>
                <CardDescription className="text-base">
                  Use AI to edit your real footage with professional results—no manual editing skills required.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-[rgb(var(--brand-orange))] to-[rgb(var(--brand-cream))]">
                <img 
                  src="/images/ai-twins.webp" 
                  alt="AI Twins" 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Module 4: Clone Yourself (Advanced)</CardTitle>
                <CardDescription className="text-base">
                  Optional advanced module: Create your AI twin in minutes to scale your presence and produce content without being on camera.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              How It Works
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center text-xl font-bold">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-purple mb-2">
                  Secure Your Spot With Stripe
                </h3>
                <p className="text-lg text-gray-600">
                  Fast, simple online checkout—choose Early Bird, Startup, or Referral Discount.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-blue text-white flex items-center justify-center text-xl font-bold">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-purple mb-2">
                  Get Portal Access Instantly
                </h3>
                <p className="text-lg text-gray-600">
                  Log in for workshop resources, bonus content, and your WhatsApp group link.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center text-xl font-bold">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold text-brand-purple mb-2">
                  Attend Live, Grow Continuously
                </h3>
                <p className="text-lg text-gray-600">
                  Join the session, learn by doing, and keep leveling up with portal guides and community help.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Operators Love This */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[rgb(var(--brand-blue))]/10 to-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Why Operators Love This Offer
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-brand-orange/20 flex items-center justify-center">
                <Clock className="w-8 h-8 text-brand-orange" />
              </div>
              <h3 className="text-2xl font-bold text-brand-purple">Save Hours</h3>
              <p className="text-gray-600">
                Get rid of repetitive grunt work—let AI do the heavy lifting.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-brand-blue/20 flex items-center justify-center">
                <Wand2 className="w-8 h-8 text-brand-blue" />
              </div>
              <h3 className="text-2xl font-bold text-brand-purple">Elevate Your Brand</h3>
              <p className="text-gray-600">
                Craft pro-grade video and captions from a single prompt.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-brand-green/20 flex items-center justify-center">
                <Zap className="w-8 h-8 text-brand-green" />
              </div>
              <h3 className="text-2xl font-bold text-brand-purple">No Wasted Time</h3>
              <p className="text-gray-600">
                All guides, tools, and answers are a click away in your member portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] to-[rgb(var(--brand-blue))] text-white" id="checkout">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Transform Your Social Media?
            </h2>
            <p className="text-xl text-white/90">
              Join the AI Social Media Workshop and start creating like a pro
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <p className="text-2xl font-bold mb-6">Workshop Access</p>
              <div className="space-y-4 text-left mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0" />
                  <span>2-hour live workshop with hands-on training</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0" />
                  <span>Lifetime access to resource portal</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0" />
                  <span>Private WhatsApp community access</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0" />
                  <span>Workshop replay and ongoing support</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button 
                  size="lg" 
                  className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-xl py-6 h-auto"
                >
                  Get Workshop Access Now
                </Button>
              </Link>
              
              <p className="text-sm text-white/70 mt-4">
                ⚡ Only 50 seats available
              </p>
            </div>

            <p className="text-white/80 text-sm">
              The workshop is practical, social, and built for operator speed—if you run a business 
              and want fewer headaches with content, this is the only session you'll need.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[rgb(var(--brand-dark-purple))] text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <img src={APP_LOGO} alt="Workshop Logo" className="w-12 h-12" />
              <div>
                <p className="font-bold">AI Social Media Workshop</p>
                <p className="text-sm text-white/70">Transform your content creation</p>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-white/70">
                © 2025 AI Social Media Workshop. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
