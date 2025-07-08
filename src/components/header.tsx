
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, Users, PlusSquare, Bookmark } from "lucide-react";
import React, { useState, useEffect } from "react";

const navLinks = [
  { href: "/flats", label: "Browse Listings", icon: Search },
  { href: "/post-listing", label: "Post Listing", icon: PlusSquare },
  { href: "/roommates", label: "Find Roommates", icon: Users },
  { href: "/saved", label: "Saved", icon: Bookmark },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = pathname === '/' && !isScrolled;

  return (
    <header className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b" : 
        (pathname === '/' ? "bg-[#2a0d45]" : "bg-background border-b")
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center space-x-2">
            <span className={cn(
              "font-bold text-2xl transition-colors",
              isTransparent ? "text-white" : "text-primary"
            )}>SafeStay</span>
          </Link>
          <nav className="hidden md:flex items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-lg",
                   pathname.startsWith(link.href) ? "text-primary bg-primary/10" :
                   isTransparent ? "text-purple-200 hover:text-white" : "text-muted-foreground"
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
            <Link href="#" className={cn(isTransparent && "text-white hover:text-white hover:bg-white/10")}>Sign In</Link>
          </Button>
          <Button asChild className={cn(isTransparent ? 'bg-white text-primary hover:bg-purple-100' : 'bg-primary text-primary-foreground hover:bg-primary/90')}>
            <Link href="#">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
