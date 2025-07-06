"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="absolute top-0 z-50 w-full">
      <div className="container mx-auto flex h-24 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl text-white">SafeStay</span>
        </Link>
        <nav className="ml-auto flex items-center space-x-2">
          <Button variant="ghost" asChild className="text-white hover:bg-white/10 hover:text-white">
            <Link href="#">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="#">Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
