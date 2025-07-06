"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, Users, PlusSquare, Bookmark } from "lucide-react";

const navLinks = [
  { href: "/flats", label: "Browse Listings", icon: Search },
  { href: "#", label: "Post Listing", icon: PlusSquare },
  { href: "/roommates", label: "Find Roommates", icon: Users },
  { href: "#", label: "Saved", icon: Bookmark },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="absolute top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-2xl text-primary">SafeStay</span>
          </Link>
          <nav className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-lg",
                  pathname === link.href ? "text-primary bg-primary/10" : "text-muted-foreground"
                )}
              >
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link href="#">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="#">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
