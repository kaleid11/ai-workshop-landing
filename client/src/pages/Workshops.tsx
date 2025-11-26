import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_TITLE, getLoginUrl } from "@/const";
import { Calendar, Clock, Users, Video, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Workshops() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const { data: workshops, isLoading: workshopsLoading, refetch: refetchWorkshops } = trpc.academy.getUpcomingWorkshops.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: subscription } = trpc.academy.getUserSubscription.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const { data: tokenBalance, refetch: refetchTokens } = trpc.academy.getUserTokens.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  
  const bookWorkshopMutation = trpc.academy.bookWorkshop.useMutation({
    onSuccess: () => {
      toast.success("Workshop booked successfully! You'll receive a calendar invite via email.");
      refetchWorkshops();
      refetchTokens();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to book workshop");
    },
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const addToGoogleCalendar = (workshop: any) => {
    const startDate = new Date(workshop.scheduledAt);
    const endDate = new Date(startDate.getTime() + workshop.durationMinutes * 60000);
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(workshop.title)}&details=${encodeURIComponent(workshop.description)}&dates=${startDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${endDate.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`;
    
    window.open(googleCalendarUrl, "_blank");
  };

  const handleRequestAccess = (workshopId: number) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    
    bookWorkshopMutation.mutate({ workshopId });
  };

  const canAccessWorkshops = subscription && subscription.tier && subscription.tier.workshopTokensPerMonth > 0;
  const hasTokens = tokenBalance && (tokenBalance.isUnlimited || tokenBalance.tokensRemaining > 0);

  if (authLoading || workshopsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <Loader2 className="w-8 h-8 animate-spin text-brand-purple" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-brand-purple cursor-pointer">{APP_TITLE}</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/portal">
              <Button variant="outline" className="border-brand-purple text-brand-purple">
                Portal
              </Button>
            </Link>
            {isAuthenticated && user ? (
              <span className="text-sm text-gray-600">Hi, {user.name}</span>
            ) : (
              <Button onClick={() => (window.location.href = getLoginUrl())}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-brand-purple mb-4">Monthly Workshop Calendar</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Join live 2-hour workshops every month. Master AI tools, build workflows, and transform your business with hands-on guidance.
          </p>
        </div>

        {/* Token Balance Card (for monthly tier users) */}
        {isAuthenticated && canAccessWorkshops && (
          <Card className="mb-8 border-2 border-brand-purple bg-gradient-to-r from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="text-brand-purple flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" />
                Your Workshop Tokens
              </CardTitle>
              <CardDescription>
                {tokenBalance?.isUnlimited
                  ? "Unlimited workshop access this month"
                  : `${tokenBalance?.tokensRemaining || 0} of ${tokenBalance?.tokensPerMonth || 0} tokens remaining this month`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Use tokens to request access to workshops. Once approved, you'll receive a Google Meet link via email.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Upgrade Prompt (for resource pack users) */}
        {isAuthenticated && !canAccessWorkshops && (
          <Card className="mb-8 border-2 border-orange-400 bg-gradient-to-r from-orange-50 to-yellow-50">
            <CardHeader>
              <CardTitle className="text-orange-600 flex items-center gap-2">
                🚀 Upgrade to Access Workshops
              </CardTitle>
              <CardDescription>
                You're currently on the Resource Pack tier. Upgrade to Starter ($97/month) or higher to attend live workshops.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/pricing">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  View Pricing & Upgrade
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {/* Workshop Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {workshops && workshops.length > 0 ? (
            workshops.map((workshop) => (
              <Card key={workshop.id} className="border-2 border-gray-200 hover:border-brand-purple transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-4xl">{getWorkshopIcon(workshop.title)}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      workshop.status === "completed" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {workshop.status === "completed" ? "Completed" : "Upcoming"}
                    </span>
                  </div>
                  <CardTitle className="text-2xl text-brand-purple">{workshop.title}</CardTitle>
                  <CardDescription className="text-gray-600">{workshop.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Workshop Details */}
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-brand-purple" />
                      <span>{formatDate(workshop.scheduledAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-purple" />
                      <span>{workshop.durationMinutes} minutes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-brand-purple" />
                      <span>Max {workshop.maxAttendees} attendees</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 pt-4">
                    {workshop.status === "completed" && workshop.recordingUrl && canAccessWorkshops ? (
                      <Button 
                        className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white"
                        onClick={() => workshop.recordingUrl && window.open(workshop.recordingUrl, "_blank")}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Watch Recording
                      </Button>
                    ) : workshop.status === "scheduled" ? (
                      <>
                        {canAccessWorkshops && hasTokens ? (
                          <Button
                            className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white"
                            onClick={() => handleRequestAccess(workshop.id)}
                            disabled={bookWorkshopMutation.isPending}
                          >
                            {bookWorkshopMutation.isPending ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Requesting...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Request Access (1 Token)
                              </>
                            )}
                          </Button>
                        ) : !isAuthenticated ? (
                          <Button
                            className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white"
                            onClick={() => (window.location.href = getLoginUrl())}
                          >
                            Sign In to Request Access
                          </Button>
                        ) : !canAccessWorkshops ? (
                          <Link href="/pricing">
                            <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                              Upgrade to Access
                            </Button>
                          </Link>
                        ) : (
                          <Button className="w-full" variant="outline" disabled>
                            No Tokens Remaining
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          className="w-full border-brand-purple text-brand-purple hover:bg-brand-purple/10"
                          onClick={() => addToGoogleCalendar(workshop)}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          Add to Google Calendar
                        </Button>
                      </>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-600">No workshops scheduled yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <Card className="mt-12 border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="text-brand-purple">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Request Access</h3>
                <p className="text-sm text-gray-600">
                  Use your monthly workshop tokens to request access to any upcoming workshop.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">2. Get Approved</h3>
                <p className="text-sm text-gray-600">
                  I'll review your request and send you the Google Meet link via email (usually within 24 hours).
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Join Live</h3>
                <p className="text-sm text-gray-600">
                  Attend the 2-hour live workshop and get hands-on guidance. Recordings available for Starter tier and above.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function getWorkshopIcon(title: string): string {
  if (title.includes("Marketing")) return "📱";
  if (title.includes("Coding")) return "💻";
  if (title.includes("Alignment")) return "🎯";
  if (title.includes("Workflows") || title.includes("Agents")) return "🤖";
  return "🎓";
}
