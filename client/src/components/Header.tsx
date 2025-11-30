import { Button } from "@/components/ui/button";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl, APP_LOGO, APP_TITLE } from "@/const";
import { Link } from "wouter";
import { LogOut, User } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export function Header() {
  const { user, isAuthenticated } = useAuth();
  const logout = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      toast.success("Logged out successfully");
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between pr-16">
        <Link href="/" className="flex items-center gap-3">
          <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />
          <span className="font-bold text-lg hidden sm:inline-block">{APP_TITLE}</span>
        </Link>

        <nav className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link href="/portal">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{user?.name || "Portal"}</span>
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <a href={getLoginUrl(window.location.pathname)}>
              <Button variant="default" size="sm">
                Login
              </Button>
            </a>
          )}
        </nav>
      </div>
    </header>
  );
}
