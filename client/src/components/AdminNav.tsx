import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Calendar, FileText, Users, ClipboardList, Home, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminNav() {
  const [location] = useLocation();

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/workshops",
      label: "Workshops",
      icon: Calendar,
    },
    {
      href: "/admin/assessments",
      label: "Assessments",
      icon: FileText,
    },
    {
      href: "/admin/submissions",
      label: "Submissions",
      icon: ClipboardList,
    },
    {
      href: "/admin/workshop-access",
      label: "Workshop Access",
      icon: Users,
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Admin Navigation Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center gap-2 whitespace-nowrap",
                      isActive && "bg-orange-500 hover:bg-orange-600 text-white"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Back to Site */}
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Site</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
