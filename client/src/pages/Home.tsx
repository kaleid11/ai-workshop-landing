import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO } from "@/const";
import { CheckCircle2, Clock, DollarSign, Gift, Mail, Sparkles, TrendingDown, Users, Video, Zap } from "lucide-react";
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
        
        {/* Banner */}
        <div className="bg-brand-orange text-white text-center py-3 relative z-10">
          <div className="container flex flex-wrap items-center justify-center gap-2 text-sm md:text-base font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Bring a friend, save $15 each • Startup discount available</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="container relative py-16 md:py-28">
          <div className="flex flex-col items-center text-center space-y-8">
            <img src={APP_LOGO} alt="Workshop Logo" className="w-24 h-24 md:w-32 md:h-32" />
            
            <div className="space-y-4 max-w-4xl">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Stop Paying $3K/Month for Social Media
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-medium">
                Learn to Automate Your Content in One 2-Hour Workshop
              </p>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                Create posts, videos, and marketing content in minutes—without hiring a team
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/checkout">
                <Button 
                  size="lg" 
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-8 py-6 h-auto shadow-2xl"
                >
                  Get Workshop Access - $97 AUD
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 h-auto backdrop-blur-sm"
                onClick={() => document.getElementById("value")?.scrollIntoView({ behavior: "smooth" })}
              >
                See The Value
              </Button>
            </div>

            <p className="text-sm text-white/70 pt-4">
              ⚡ Limited spots available
            </p>
          </div>
        </div>
      </section>

      {/* Value Comparison Section */}
      <section className="py-16 md:py-24 bg-gray-50" id="value">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              The Math Is Simple
            </h2>
            <p className="text-xl text-gray-600">
              One workshop vs. hiring a social media manager
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Traditional Cost */}
            <Card className="border-2 border-red-200 bg-white">
              <CardHeader>
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <TrendingDown className="w-6 h-6" />
                  <CardTitle className="text-2xl">Hiring a Manager</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-4xl font-bold text-gray-900">$3,000<span className="text-xl text-gray-600">/mo</span></div>
                  <div className="text-red-600 font-semibold mt-1">= $36,000/year AUD</div>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Ongoing monthly payments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Limited to their schedule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>No control over process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">✗</span>
                    <span>Dependent on one person</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Workshop Value */}
            <Card className="border-2 border-brand-orange bg-gradient-to-br from-brand-orange/5 to-brand-purple/5">
              <CardHeader>
                <div className="flex items-center gap-2 text-brand-orange mb-2">
                  <Sparkles className="w-6 h-6" />
                  <CardTitle className="text-2xl">This Workshop</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-4xl font-bold text-gray-900">
                    $97
                    <span className="text-xl text-gray-600 ml-2">AUD</span>
                  </div>
                  <div className="text-brand-orange font-semibold mt-1">One-time • Lifetime access</div>
                </div>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Save $35,903 in year one</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Set up once, review as needed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Full control of your content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Skills you keep forever</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/checkout">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white text-lg px-8 py-6 h-auto">
                Get Started for $97 AUD →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              What You'll Master
            </h2>
            <p className="text-xl text-gray-600">
              Practical skills you can use immediately
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 hover:border-brand-orange transition-colors">
              <CardHeader>
                <Zap className="w-12 h-12 text-brand-orange mb-4" />
                <CardTitle className="text-2xl">Hands-On Training</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Learn by doing. Set up automation tools during the live session and leave with working systems.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Post scheduling across platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Caption and hashtag generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
                    <span>Content calendar automation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-blue transition-colors">
              <CardHeader>
                <Video className="w-12 h-12 text-brand-blue mb-4" />
                <CardTitle className="text-2xl">Portal Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Lifetime access to templates, guides, and resources. Download everything you need.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Content templates library</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Tool setup guides</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span>Workshop replay video</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-green transition-colors">
              <CardHeader>
                <Users className="w-12 h-12 text-brand-green mb-4" />
                <CardTitle className="text-2xl">Community Connection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Join our private WhatsApp group for ongoing support and networking with operators.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>Direct access to instructors</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>Share wins and strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" />
                    <span>Get help when stuck</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-brand-purple transition-colors">
              <CardHeader>
                <Clock className="w-12 h-12 text-brand-purple mb-4" />
                <CardTitle className="text-2xl">Replay & Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Can't make it live? Watch the replay. Need help? We've got you covered.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Full workshop recording</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Email support for 30 days</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-purple flex-shrink-0 mt-0.5" />
                    <span>Bonus troubleshooting guide</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Workshop Modules Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Workshop Modules
            </h2>
            <p className="text-xl text-gray-600">
              Four focused modules to transform your social media workflow
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Module 1 */}
            <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-brand-orange transition-all hover:shadow-xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-brand-green/20 to-brand-blue/20 flex items-center justify-center p-6">
                <img 
                  src="/images/quick-actions.png" 
                  alt="Social Media Automation Tools" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-brand-purple mb-3">
                  Module 1: Automate Social Media Posts
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Learn to generate captions, schedule posts, and manage content across all platforms with automation tools. Set up your content calendar and review before posting.
                </p>
              </div>
            </div>

            {/* Module 2 */}
            <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-brand-blue transition-all hover:shadow-xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-brand-blue/30 to-brand-purple/20 flex items-center justify-center p-6">
                <img 
                  src="/images/video-generation.png" 
                  alt="Video Generation Interface" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-brand-purple mb-3">
                  Module 2: Create Videos with Tools
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Master Sora 2 and other video generators to create professional short-form videos from text prompts in minutes. No filming or editing required.
                </p>
              </div>
            </div>

            {/* Module 3 */}
            <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-brand-purple transition-all hover:shadow-xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-brand-purple/20 to-brand-orange/20 flex items-center justify-center p-6">
                <img 
                  src="/images/ai-edit.webp" 
                  alt="Video Editing Interface" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-brand-purple mb-3">
                  Module 3: Edit Videos with Automation
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Use automation to edit your footage with professional results. Add captions, transitions, and effects. Review and refine before publishing.
                </p>
              </div>
            </div>

            {/* Module 4 */}
            <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-brand-green transition-all hover:shadow-xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-brand-orange/20 to-brand-green/20 flex items-center justify-center p-6">
                <img 
                  src="/images/ai-twins.webp" 
                  alt="AI Avatar Creation" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-bold text-brand-purple mb-3">
                  Module 4: Clone Yourself (Advanced)
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Optional advanced module: Create a digital version of yourself to record videos without being on camera. Scale your content creation with API integration.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto border-2 border-brand-purple bg-gradient-to-br from-brand-purple/5 to-brand-orange/5">
              <CardHeader>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-6 h-6 text-brand-purple" />
                  <CardTitle className="text-2xl">Advanced Workshop Coming Soon</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Ready to go deeper? Our advanced workshop covers API integration for full automation. Workshop attendees get special pricing.
                </p>
                <p className="text-sm text-gray-600">
                  Details available in your member portal after purchase.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-orange text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-brand-purple mb-3">Secure Your Spot</h3>
              <p className="text-gray-700">
                Sign up now for $97 AUD. Get instant access to the member portal and WhatsApp group.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-blue text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-brand-purple mb-3">Get Portal Access</h3>
              <p className="text-gray-700">
                Download templates, connect with operators, and prep before the workshop.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-brand-green text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-brand-purple mb-3">Attend Live</h3>
              <p className="text-gray-700">
                Join the 2-hour live workshop, set up your systems, and keep learning with replays and community help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Program Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-green/10 to-brand-blue/10">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
                Bring a Friend, Save Together
              </h2>
              <p className="text-xl text-gray-600">
                Get $15 AUD off for each friend you refer
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-brand-green">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Gift className="w-6 h-6 text-brand-green" />
                    <CardTitle className="text-xl">Referral Program</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    You and your friend both get $15 AUD off when they sign up.
                  </p>
                  <p className="text-sm text-gray-600">
                    After purchase, email their names to{" "}
                    <a href="mailto:info@thzn.world" className="text-brand-green hover:underline font-medium">
                      info@thzn.world
                    </a>{" "}
                    to claim your discount.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-brand-purple">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Mail className="w-6 h-6 text-brand-purple" />
                    <CardTitle className="text-xl">Startup Discount</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    Early-stage startups get $20 AUD off.
                  </p>
                  <p className="text-sm text-gray-600">
                    Email{" "}
                    <a href="mailto:info@thzn.world" className="text-brand-purple hover:underline font-medium">
                      info@thzn.world
                    </a>{" "}
                    with your startup details before purchase to receive a discount code.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Operators Love This Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-purple mb-4">
              Why Operators Choose This
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <Clock className="w-12 h-12 text-brand-orange mb-4" />
                <CardTitle className="text-xl">Save Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Set up automation once. Save 10+ hours per week on content creation and posting.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <DollarSign className="w-12 h-12 text-brand-blue mb-4" />
                <CardTitle className="text-xl">Eliminate Hiring</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Cut your social media budget from $3K/month to zero. Invest savings back into your business.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Zap className="w-12 h-12 text-brand-green mb-4" />
                <CardTitle className="text-xl">No Wasted Time</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  All tactics, zero theory. Tools and answers you can use the same day you learn them.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] to-[rgb(var(--brand-blue))] text-white" id="checkout">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold">
              Ready to Transform Your Social Media?
            </h2>
            <p className="text-xl text-white/90">
              Join the 2-hour workshop and learn to automate content like a pro
            </p>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-left max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-6 text-center">Workshop Access Includes:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>2-hour live workshop (or watch the replay)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Lifetime access to member portal</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Private WhatsApp community</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Workshop replay and bonus templates</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-brand-orange flex-shrink-0 mt-0.5" />
                  <span>Special pricing for advanced workshop</span>
                </li>
              </ul>

              <div className="mt-8 pt-8 border-t border-white/20 text-center">
                <div className="text-5xl font-bold mb-2">
                  $97
                  <span className="text-2xl text-white/80 ml-2">AUD</span>
                </div>
                <div className="text-brand-orange font-semibold mb-6">One-time payment • Lifetime access</div>
                
                <Link href="/checkout">
                  <Button 
                    size="lg" 
                    className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white text-xl py-7 h-auto shadow-2xl"
                  >
                    Get Workshop Access Now →
                  </Button>
                </Link>
              </div>
            </div>

            <p className="text-sm text-white/70">
              The workshop is a practical, no-fluff session. If you're ready to work less and multiply your content, this is for you. If you just want theory, save your money.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgb(var(--brand-dark-purple))] text-white/80 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src={APP_LOGO} alt="Workshop Logo" className="w-12 h-12" />
              <div>
                <div className="font-bold text-white">Social Media Automation Workshop</div>
                <div className="text-sm">© 2024. All rights reserved.</div>
              </div>
            </div>
            <div className="text-sm text-center md:text-right">
              <p>Questions? Email: <a href="mailto:info@thzn.world" className="hover:text-white">info@thzn.world</a></p>
              <p className="mt-1">Limited spots available • All prices in AUD</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
