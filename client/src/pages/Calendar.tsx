import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, MapPin, Users, Video, ExternalLink, Download } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

export default function Calendar() {
  const { user, isAuthenticated } = useAuth();
  const [selectedPillar, setSelectedPillar] = useState<string>("all");

  // Workshop sessions data
  const workshopSessions = [
    // Marketing Pillar Sessions
    {
      id: 1,
      pillar: "Marketing",
      title: "Social Media Content Automation",
      description: "Learn to automate social media content creation, scheduling, and engagement tracking using AI tools.",
      date: "2025-01-15",
      time: "10:00 AM - 11:30 AM",
      timezone: "AEST (Brisbane)",
      instructor: "Huxley Peckham",
      tier: "Lite",
      platform: "Google Meet",
      capacity: "50 seats",
      status: "Open",
      topics: ["Content Creation", "Scheduling", "Analytics"],
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Social+Media+Content+Automation&dates=20250115T000000Z/20250115T013000Z&details=Learn+to+automate+social+media+content+creation&location=Google+Meet",
    },
    {
      id: 2,
      pillar: "Marketing",
      title: "Email Marketing with AI",
      description: "Master AI-powered email campaigns, segmentation, and personalization at scale.",
      date: "2025-01-22",
      time: "10:00 AM - 11:30 AM",
      timezone: "AEST (Brisbane)",
      instructor: "Huxley Peckham",
      tier: "Lite",
      platform: "Google Meet",
      capacity: "50 seats",
      status: "Open",
      topics: ["Email Campaigns", "Segmentation", "Personalization"],
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Email+Marketing+with+AI&dates=20250122T000000Z/20250122T013000Z&details=Master+AI-powered+email+campaigns&location=Google+Meet",
    },
    {
      id: 3,
      pillar: "Marketing",
      title: "SEO & Content Strategy",
      description: "Use AI to research keywords, optimize content, and build a sustainable content strategy.",
      date: "2025-02-05",
      time: "2:00 PM - 3:30 PM",
      timezone: "AEST (Brisbane)",
      instructor: "Huxley Peckham",
      tier: "Pro",
      platform: "Google Meet",
      capacity: "30 seats",
      status: "Open",
      topics: ["SEO", "Content Strategy", "Keyword Research"],
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=SEO+%26+Content+Strategy&dates=20250205T040000Z/20250205T053000Z&details=Use+AI+to+research+keywords&location=Google+Meet",
    },
    {
      id: 4,
      pillar: "Marketing",
      title: "Video Marketing & Automation",
      description: "Create, edit, and distribute video content at scale using AI video generation tools.",
      date: "2025-02-19",
      time: "2:00 PM - 3:30 PM",
      timezone: "AEST (Brisbane)",
      instructor: "Huxley Peckham",
      tier: "Pro",
      platform: "Google Meet",
      capacity: "30 seats",
      status: "Open",
      topics: ["Video Creation", "Editing", "Distribution"],
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Video+Marketing+%26+Automation&dates=20250219T040000Z/20250219T053000Z&details=Create+and+edit+video+content+at+scale&location=Google+Meet",
    },

    // Coding Pillar Sessions
    {
      id: 5,
      pillar: "Coding",
      title: "Build Your First App with Manus",
      description: "Create a functional web application without traditional coding using Manus AI platform.",
      date: "2025-01-17",
      time: "10:00 AM - 11:30 AM",
      timezone: "AEST (Brisbane)",
      instructor: "Huxley Peckham",
      tier: "Lite",
      platform: "Google Meet",
      capacity: "50 seats",
      status: "Open",
      topics: ["Manus Platform", "Web Apps", "No-Code"],
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Build+Your+First+App+with+Manus&dates=20250117T000000Z/20250117T013000Z&details=Create+a+functional+web+application&location=Google+Meet",
    },
    {
      id: 6,
      pillar: "Coding",
      title: "Database Integration with Replit",
      description: "Learn to connect databases, build APIs, and manage data in your AI-powered applications.",
      date: "2025-01-24",
      time: "10:00 AM - 11:30 AM",
      timezone: "AEST (Brisbane)",
      instructor: "Huxley Peckham",
      tier: "Lite",
      platform: "Google Meet",
      capacity: "50 seats",
      status: "Open",
      topics: ["Databases", "APIs", "Data Management"],
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Database+Integration+with+Replit&dates=20250124T000000Z/20250124T013000Z&details=Connect+databases+and+build+APIs&location=Google+Meet",
    },
    {
      id: 7,
      pillar: "Coding",
      title: "Advanced Cursor Workflows",
      description: "Master advanced coding techniques with Cursor AI for faster development and debugging.",
      date: "2025-02-07",
      time: "2:00 PM - 3:30 PM",
      timezone: "AEST (Brisbane)",
      instructor: "Huxley Peckham",
      tier: "Pro",
      platform: "Google Meet",
      capacity: "30 seats",
      status: "Open",
      topics: ["Cursor AI", "Development", "Debugging"],
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Advanced+Cursor+Workflows&dates=20250207T040000Z/20250207T053000Z&details=Master+advanced+coding+techniques&location=Google+Meet",
    },
    {
      id: 8,
      pillar: "Coding",
      title: "Mobile App Development",
      description: "Build cross-platform mobile apps using AI-powered development tools and frameworks.",
      date: "2025-02-21",
      time: "2:00 PM - 3:30 PM",
      timezone: "AEST (Brisbane)",
      instructor: "Huxley Peckham",
      tier: "Pro",
      platform: "Google Meet",
      capacity: "30 seats",
      status: "Open",
      topics: ["Mobile Apps", "Cross-Platform", "Development"],
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Mobile+App+Development&dates=20250221T040000Z/20250221T053000Z&details=Build+cross-platform+mobile+apps&location=Google+Meet",
    },

    // Alignment Pillar Sessions
    {
      id: 9,
      pillar: "Alignment",
      title: "AI Adoption Framework",
      description: "Learn the Horizon Framework (Innovate → Forge → Grow → Scale → Trust) for successful AI implementation.",
      date: "2025-01-16",
      time: "10:00 AM - 11:30 AM",
      timezone: "AEST (Brisbane)",
      instructor: "Huxley Peckham",
      tier: "Lite",
      platform: "Google Meet",
      capacity: "50 seats",
      status: "Open",
      topics: ["Horizon Framework", "AI Adoption", "Change Management"],
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=AI+Adoption+Framework&dates=20250116T000000Z/20250116T013000Z&details=Learn+the+Horizon+Framework&location=Google+Meet",
    },
    {
      id: 10,
      pillar: "Alignment",
      title: "Team Training & Onboarding",
      description: "Strategies to train your team on AI tools and build a culture of innovation.",
      date: "2025-01-23",
      time: "10:00 AM - 11:30 AM",
      timezone: "AEST (Brisbane)",
      instructor: "Huxley Peckham",
      tier: "Lite",
      platform: "Google Meet",
      capacity: "50 seats",
      status: "Open",
      topics: ["Training", "Onboarding", "Culture"],
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Team+Training+%26+Onboarding&dates=20250123T000000Z/20250123T013000Z&details=Train+your+team+on+AI+tools&location=Google+Meet",
    },
    {
      id: 11,
      pillar: "Alignment",
      title: "Process Optimization with AI",
      description: "Identify bottlenecks, streamline workflows, and measure ROI from AI implementations.",
      date: "2025-02-06",
      time: "2:00 PM - 3:30 PM",
      timezone: "AEST (Brisbane)",
      instructor: "Huxley Peckham",
      tier: "Pro",
      platform: "Google Meet",
      capacity: "30 seats",
      status: "Open",
      topics: ["Process Optimization", "Workflows", "ROI"],
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Process+Optimization+with+AI&dates=20250206T040000Z/20250206T053000Z&details=Identify+bottlenecks+and+streamline+workflows&location=Google+Meet",
    },
    {
      id: 12,
      pillar: "Alignment",
      title: "AI Governance & Ethics",
      description: "Build responsible AI practices, manage risks, and ensure compliance in your organization.",
      date: "2025-02-20",
      time: "2:00 PM - 3:30 PM",
      timezone: "AEST (Brisbane)",
      instructor: "Huxley Peckham",
      tier: "Pro",
      platform: "Google Meet",
      capacity: "30 seats",
      status: "Open",
      topics: ["Governance", "Ethics", "Compliance"],
      googleCalendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=AI+Governance+%26+Ethics&dates=20250220T040000Z/20250220T053000Z&details=Build+responsible+AI+practices&location=Google+Meet",
    },
  ];

  // Filter sessions based on selected pillar
  const filteredSessions = selectedPillar === "all" 
    ? workshopSessions 
    : workshopSessions.filter(session => session.pillar === selectedPillar);

  // Sort by date
  const sortedSessions = [...filteredSessions].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const pillarColors = {
    Marketing: "bg-orange-100 text-orange-700 border-orange-200",
    Coding: "bg-blue-100 text-blue-700 border-blue-200",
    Alignment: "bg-purple-100 text-purple-700 border-purple-200",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-AU', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent cursor-pointer">
              Tech Horizon Academy
            </span>
          </Link>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/portal">
                  <Button variant="outline">Portal</Button>
                </Link>
                <span className="text-sm text-gray-600">Hi, {user?.name}</span>
              </>
            ) : (
              <Link href="/pricing">
                <Button>Join Academy</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-12 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <CalendarIcon className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Workshop Calendar</h1>
          <p className="text-xl mb-6">
            Live workshops across Marketing, Coding, and Alignment pillars. 
            Join sessions that match your tier and learning goals.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedPillar === "all" ? "default" : "outline"}
              onClick={() => setSelectedPillar("all")}
            >
              All Workshops ({workshopSessions.length})
            </Button>
            <Button
              variant={selectedPillar === "Marketing" ? "default" : "outline"}
              onClick={() => setSelectedPillar("Marketing")}
              className={selectedPillar === "Marketing" ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              Marketing ({workshopSessions.filter(s => s.pillar === "Marketing").length})
            </Button>
            <Button
              variant={selectedPillar === "Coding" ? "default" : "outline"}
              onClick={() => setSelectedPillar("Coding")}
              className={selectedPillar === "Coding" ? "bg-blue-500 hover:bg-blue-600" : ""}
            >
              Coding ({workshopSessions.filter(s => s.pillar === "Coding").length})
            </Button>
            <Button
              variant={selectedPillar === "Alignment" ? "default" : "outline"}
              onClick={() => setSelectedPillar("Alignment")}
              className={selectedPillar === "Alignment" ? "bg-purple-500 hover:bg-purple-600" : ""}
            >
              Alignment ({workshopSessions.filter(s => s.pillar === "Alignment").length})
            </Button>
          </div>
        </div>
      </section>

      {/* Calendar Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedSessions.map((session) => (
              <Card key={session.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={pillarColors[session.pillar as keyof typeof pillarColors]}>
                      {session.pillar}
                    </Badge>
                    <Badge variant="outline">{session.tier}+</Badge>
                  </div>
                  <CardTitle className="text-lg">{session.title}</CardTitle>
                  <CardDescription>{session.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <CalendarIcon className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{formatDate(session.date)}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{session.time} {session.timezone}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Video className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{session.platform}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Users className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{session.capacity}</span>
                  </div>

                  <div className="pt-2">
                    <p className="text-xs text-gray-600 font-semibold mb-1">Topics:</p>
                    <div className="flex flex-wrap gap-1">
                      {session.topics.map((topic, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-2">
                  <Button className="flex-1" size="sm" asChild>
                    <a href={session.googleCalendarUrl} target="_blank" rel="noopener noreferrer">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      Add to Calendar
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {sortedSessions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No workshops found for the selected filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Workshop Access & Tiers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Lite Tier (2 workshops/month)</h3>
                <p className="text-gray-600">
                  Access to foundational workshops across all three pillars. Perfect for getting started with AI automation.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Pro Tier (4 workshops/month)</h3>
                <p className="text-gray-600">
                  All Lite workshops PLUS advanced sessions with deeper technical content and specialized use cases.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Elite Tier (Unlimited)</h3>
                <p className="text-gray-600">
                  Unlimited access to all workshops plus 1-on-1 coaching sessions and custom implementation support.
                </p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> All workshops are recorded and available in the member portal for 12 months. 
                  Can't make it live? Watch the replay on your schedule.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/pricing" className="w-full">
                <Button className="w-full" size="lg">
                  View Membership Options
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Tech Horizon Labs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
