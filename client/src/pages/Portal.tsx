import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Calendar, ExternalLink, Loader2, Mail, MessageCircle, ShoppingCart, Sparkles, Users, Video } from "lucide-react";
import { Link } from "wouter";

export default function Portal() {
  const { user, loading, isAuthenticated } = useAuth();
  const accessCheck = trpc.portal.checkAccess.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  // Generate calendar event URL (Google Calendar format)
  const generateCalendarUrl = () => {
    const title = encodeURIComponent("Social Media Automation Workshop");
    const details = encodeURIComponent(
      "Learn to automate your social media content with AI tools. Workshop includes hands-on training with Sora 2, post automation, and video editing tools."
    );
    // Wednesday, Nov 26, 2025, 9:00 AM Brisbane time (UTC+10)
    const startDate = "20251126T090000";
    const endDate = "20251126T110000";
    const timezone = "Australia/Brisbane";
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${endDate}&ctz=${timezone}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-purple mx-auto mb-4" />
          <p className="text-gray-600">Loading your portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] via-[rgb(var(--brand-blue))] to-[rgb(var(--brand-dark-purple))] text-white">
        <div className="container max-w-md text-center space-y-6 p-8">
          <img src={APP_LOGO} alt="Workshop Logo" className="w-24 h-24 mx-auto" />
          <h1 className="text-3xl font-bold">Member Portal Access</h1>
          <p className="text-white/80">
            Please sign in to access your workshop materials, community links, and resources.
          </p>
          <a href={getLoginUrl()}>
            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full">
              Sign In to Continue
            </Button>
          </a>
          <Link href="/">
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Check if user has purchased workshop access
  if (accessCheck.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-purple mx-auto mb-4" />
          <p className="text-gray-600">Checking your access...</p>
        </div>
      </div>
    );
  }

  if (!accessCheck.data?.hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[rgb(var(--brand-dark-purple))] via-[rgb(var(--brand-blue))] to-[rgb(var(--brand-dark-purple))] text-white">
        <div className="container max-w-md text-center space-y-6 p-8">
          <ShoppingCart className="w-24 h-24 mx-auto text-brand-orange" />
          <h1 className="text-3xl font-bold">Purchase Required</h1>
          <p className="text-white/80 text-lg">
            This portal is exclusive to workshop participants. Purchase your ticket to unlock access to all workshop materials, community groups, and resources.
          </p>
          <Link href="/checkout">
            <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white w-full">
              Get Workshop Access - $97 AUD
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 w-full">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[rgb(var(--brand-dark-purple))] to-[rgb(var(--brand-blue))] text-white py-8">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={APP_LOGO} alt="Workshop Logo" className="w-16 h-16" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{APP_TITLE}</h1>
                <p className="text-white/80">Member Portal</p>
              </div>
            </div>
            <Link href="/">
              <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="py-12">
        <div className="container max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-brand-purple mb-4">
              Welcome, {user?.name || "Workshop Member"}! 👋
            </h2>
            <p className="text-gray-700 text-lg">
              You're all set for the Social Media Automation Workshop. Below you'll find everything you need to get started.
            </p>
          </div>

          {/* Workshop Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-brand-orange">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-8 h-8 text-brand-orange" />
                  <CardTitle className="text-2xl">Workshop Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">📅 Wednesday, November 26, 2025</p>
                  <p className="text-gray-700">
                    🕐 9:00 AM - 11:00 AM Brisbane Time
                    <br />
                    🕐 10:00 AM - 12:00 PM Melbourne Time
                  </p>
                </div>
                <a href={generateCalendarUrl()} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                    <Calendar className="w-4 h-4 mr-2" />
                    Add to Calendar
                  </Button>
                </a>
                <p className="text-sm text-gray-600">
                  Can't make it live? No worries! The replay will be available in your portal within 24 hours.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-brand-blue">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="w-8 h-8 text-brand-blue" />
                  <CardTitle className="text-2xl">Need Help?</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Have questions or need assistance? Our team is here to help.
                </p>
                <a href="mailto:info@thzn.world?subject=Workshop Support Request">
                  <Button className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Us: info@thzn.world
                  </Button>
                </a>
                <p className="text-sm text-gray-600">
                  We typically respond within 24 hours on business days.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Community & Resources */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-2 border-brand-green">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle className="w-8 h-8 text-brand-green" />
                  <CardTitle className="text-2xl">WhatsApp Community</CardTitle>
                </div>
                <CardDescription>
                  Join our private group for live updates and peer support
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Connect with fellow workshop attendees, ask questions, and share your wins. Get real-time support from instructors and the community.
                </p>
                <a href="https://chat.whatsapp.com/FFzITkJIkkK7ZELGNQKDLl" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-brand-green hover:bg-brand-green/90 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Join WhatsApp Group
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>

            <Card className="border-2 border-brand-purple">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="w-8 h-8 text-brand-purple" />
                  <CardTitle className="text-2xl">Community Hub</CardTitle>
                </div>
                <CardDescription>
                  Access additional resources and connect on social media
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  Follow us on Facebook and access our Linktree for bonus content, tool recommendations, and community updates.
                </p>
                <a href="https://linktr.ee/huxleyp" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white">
                    <Users className="w-4 h-4 mr-2" />
                    Visit Community Hub
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-gray-300 bg-gray-50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Video className="w-8 h-8 text-gray-400" />
                  <CardTitle className="text-2xl text-gray-700">Workshop Replay</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold text-lg mb-2">Coming Soon</p>
                  <p className="text-gray-500 text-sm">
                    The workshop replay will be available here within 24 hours after the live session.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-300 bg-gray-50">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                  <CardTitle className="text-2xl text-gray-700">Templates & Resources</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-semibold text-lg mb-2">Coming Soon</p>
                  <p className="text-gray-500 text-sm">
                    Downloadable templates, guides, and bonus resources will be added here after the workshop.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgb(var(--brand-dark-purple))] text-white/80 py-8 mt-12">
        <div className="container text-center">
          <p className="text-sm">
            Questions? Email:{" "}
            <a href="mailto:info@thzn.world" className="hover:text-white underline">
              info@thzn.world
            </a>
          </p>
          <p className="text-sm mt-2">© 2024 {APP_TITLE}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
