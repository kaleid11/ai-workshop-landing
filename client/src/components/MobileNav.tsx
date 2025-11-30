import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { APP_TITLE } from "@/const";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portal", label: "Portal" },
  { href: "/tools", label: "Tools" },
  { href: "/prompts", label: "Prompts" },
  { href: "/wiki", label: "Knowledge Base" },
  { href: "/frameworks", label: "Frameworks" },
  { href: "/workshops", label: "Workshops" },
  { href: "/pricing", label: "Pricing" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Burger Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-[60] bg-background/80 backdrop-blur-sm border border-border shadow-lg"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[55] backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-background border-l border-border shadow-2xl z-[55] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {APP_TITLE}
            </h2>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-6">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = location === link.href;
                return (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a
                        onClick={closeMenu}
                        className={`block px-4 py-3 rounded-lg transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "hover:bg-accent text-foreground"
                        }`}
                      >
                        {link.label}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer CTA */}
          <div className="p-6 border-t border-border">
            <Link href="/pricing">
              <Button
                onClick={closeMenu}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Join The Academy
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
