import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar, Clock, Video, XCircle, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { APP_TITLE, getLoginUrl } from "@/const";
import { Link } from "wouter";

export default function MyBookings() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  
  const { data: bookings, isLoading: bookingsLoading, refetch } = trpc.academy.getUserBookings.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const cancelBookingMutation = trpc.academy.cancelBooking.useMutation({
    onSuccess: () => {
      toast.success("Booking cancelled and token refunded");
      refetch();
    },
    onError: (error) => {
      toast.error(error.message || "Failed to cancel booking");
    },
  });

  const handleCancelBooking = async (registrationId: number) => {
    if (confirm("Are you sure you want to cancel this booking? Your token will be refunded.")) {
      await cancelBookingMutation.mutateAsync({ registrationId });
    }
  };

  if (authLoading || bookingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-orange-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
            <CardDescription>Please log in to view your workshop bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-orange-500 hover:bg-orange-600" asChild>
              <a href={getLoginUrl()}>Log In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const now = new Date();
  const upcomingBookings = bookings?.filter((b: any) => 
    b.workshop && new Date(b.workshop.scheduledAt) > now && b.status === "registered"
  ) || [];
  const pastBookings = bookings?.filter((b: any) => 
    b.workshop && (new Date(b.workshop.scheduledAt) <= now || b.status !== "registered")
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <h1 className="text-2xl font-bold text-orange-500 cursor-pointer">{APP_TITLE}</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/workshops">
              <Button variant="outline" className="border-orange-500 text-orange-500">
                Browse Workshops
              </Button>
            </Link>
            <Link href="/portal">
              <Button variant="outline">Portal</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Workshop Bookings</h1>
          <p className="text-lg text-gray-600">
            View and manage your upcoming and past workshop registrations
          </p>
        </div>

        {/* Upcoming Bookings */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Workshops</h2>
          
          {upcomingBookings.length === 0 ? (
            <Alert>
              <AlertDescription>
                No upcoming workshops booked. <Link href="/workshops" className="text-orange-500 underline">Browse available workshops</Link>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingBookings.map((booking: any) => (
                <Card key={booking.id} className="border-2 border-orange-200">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge className="bg-orange-500">
                        {booking.pillar?.name || "General"}
                      </Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Registered
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{booking.workshop?.title}</CardTitle>
                    <CardDescription>{booking.workshop?.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(booking.workshop.scheduledAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                          {new Date(booking.workshop.scheduledAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {" "}({booking.workshop.durationMinutes} min)
                        </span>
                      </div>
                      {booking.workshop.googleMeetUrl && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Video className="h-4 w-4" />
                          <a 
                            href={booking.workshop.googleMeetUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-orange-500 hover:underline"
                          >
                            Join Google Meet
                          </a>
                        </div>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-red-500 text-red-500 hover:bg-red-50"
                      onClick={() => handleCancelBooking(booking.id)}
                      disabled={cancelBookingMutation.isPending}
                    >
                      {cancelBookingMutation.isPending ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Cancelling...
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 mr-2" />
                          Cancel Booking
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Past Bookings */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Workshops</h2>
          
          {pastBookings.length === 0 ? (
            <Alert>
              <AlertDescription>
                No past workshops yet
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {pastBookings.map((booking: any) => (
                <Card key={booking.id} className="opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline">
                        {booking.pillar?.name || "General"}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={
                          booking.status === "attended" 
                            ? "text-green-600 border-green-600" 
                            : booking.status === "no_show"
                            ? "text-red-600 border-red-600"
                            : "text-gray-600 border-gray-600"
                        }
                      >
                        {booking.status === "attended" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                        {booking.status === "no_show" && <XCircle className="h-3 w-3 mr-1" />}
                        {booking.status === "attended" ? "Attended" : booking.status === "no_show" ? "No Show" : "Completed"}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{booking.workshop?.title}</CardTitle>
                    <CardDescription>{booking.workshop?.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(booking.workshop.scheduledAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>{booking.workshop.durationMinutes} minutes</span>
                      </div>
                    </div>

                    {booking.workshop.recordingUrl && (
                      <Button
                        className="w-full bg-orange-500 hover:bg-orange-600"
                        onClick={() => window.open(booking.workshop.recordingUrl, "_blank")}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Watch Recording
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
