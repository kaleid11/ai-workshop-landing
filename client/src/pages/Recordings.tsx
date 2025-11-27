import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { APP_TITLE, getLoginUrl } from "@/const";
import { Video, Clock, Calendar, Lock, Loader2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Header } from "@/components/Header";

export default function Recordings() {
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  
  const { data: subscription, isLoading: subLoading } = trpc.academy.getUserSubscription.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // Check if user has access to recordings (Lite tier or above)
  const hasRecordingAccess = subscription?.tier && 
    ["lite", "pro", "enterprise"].includes(subscription.tier.slug);

  const { data: workshops, isLoading: workshopsLoading } = trpc.workshops.list.useQuery(
    undefined,
    { enabled: isAuthenticated && !!hasRecordingAccess }
  );

  // Filter completed workshops with recordings
  const completedWorkshops = workshops?.filter(
    (w: any) => w.status === "completed" && w.recordingUrl
  ) || [];

  if (authLoading || subLoading || workshopsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center px-4 py-20">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Login Required</CardTitle>
              <CardDescription>Please log in to access workshop recordings</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-orange-500 hover:bg-orange-600" asChild>
                <a href={getLoginUrl()}>Log In</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!hasRecordingAccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-20 max-w-4xl">
          <Card className="border-orange-200">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-orange-500" />
              </div>
              <CardTitle className="text-2xl">Upgrade to Access Recordings</CardTitle>
              <CardDescription className="text-base">
                Workshop recordings are available for Lite, Pro, and Enterprise members
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-orange-50 to-purple-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">What You'll Get:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Video className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Access to all past workshop recordings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Calendar className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Attend 4-18 live workshops per month (depending on tier)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>Lifetime access to tools database and prompt library</span>
                  </li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-purple-200">
                  <CardHeader>
                    <Badge className="w-fit bg-purple-500 mb-2">LITE</Badge>
                    <CardTitle className="text-xl">$300/month</CardTitle>
                    <CardDescription>4 workshops + recordings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-purple-500 hover:bg-purple-600" asChild>
                      <Link href="/pricing">Upgrade to Lite</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-orange-200">
                  <CardHeader>
                    <Badge className="w-fit bg-orange-500 mb-2">PRO</Badge>
                    <CardTitle className="text-xl">$500/month</CardTitle>
                    <CardDescription>Unlimited workshops + recordings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600" asChild>
                      <Link href="/pricing">Upgrade to Pro</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Current tier: <span className="font-semibold">{subscription?.tier?.name || "No subscription"}</span>
                </p>
                <Button variant="outline" asChild>
                  <Link href="/portal">Back to Portal</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Workshop Recordings</h1>
          <p className="text-lg text-gray-600">
            Access all past workshop recordings • {completedWorkshops.length} recording{completedWorkshops.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Recordings Grid */}
        {completedWorkshops.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {completedWorkshops.map((workshop: any) => (
              <Card key={workshop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-purple-50">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="bg-purple-500">{workshop.pillar?.name || "Workshop"}</Badge>
                    <Badge variant="outline" className="bg-white">
                      {workshop.sessionType === "pro" ? "Pro Only" : "Lite+"}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{workshop.title}</CardTitle>
                  <CardDescription className="text-gray-700">
                    {workshop.description || "No description available"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Workshop Details */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(workshop.scheduledAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{workshop.durationMinutes} min</span>
                      </div>
                    </div>

                    {/* Recording Embed */}
                    {workshop.recordingUrl && (
                      <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                        {workshop.recordingUrl.includes('drive.google.com') ? (
                          <iframe
                            src={workshop.recordingUrl.replace('/view', '/preview')}
                            className="w-full h-full"
                            allow="autoplay"
                            title={workshop.title}
                          />
                        ) : workshop.recordingUrl.includes('youtube.com') || workshop.recordingUrl.includes('youtu.be') ? (
                          <iframe
                            src={workshop.recordingUrl.replace('watch?v=', 'embed/')}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={workshop.title}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <a 
                              href={workshop.recordingUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-orange-500 hover:text-orange-600 flex items-center gap-2"
                            >
                              <Video className="w-6 h-6" />
                              <span>Open Recording</span>
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    {/* View Full Link */}
                    {workshop.recordingUrl && (
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        asChild
                      >
                        <a href={workshop.recordingUrl} target="_blank" rel="noopener noreferrer">
                          <Video className="w-4 h-4 mr-2" />
                          Open in New Tab
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <Video className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Recordings Yet</h3>
              <p className="text-gray-600 mb-6">
                Workshop recordings will appear here after sessions are completed
              </p>
              <Button className="bg-orange-500 hover:bg-orange-600" asChild>
                <Link href="/workshops">Browse Upcoming Workshops</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Back to Portal */}
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/portal">← Back to Portal</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
