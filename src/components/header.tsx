"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Find a Flat", icon: Home },
    { href: "/roommates", label: "Find Roommates", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">SafeStay</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end">
          <Button>Post a Listing</Button>
        </div>
      </div>
    </header>
  );
}
