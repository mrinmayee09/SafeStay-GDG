
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Search, Users, PlusSquare, Bookmark, LogOut, ChevronDown, Menu } from "lucide-react";
import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { SignInDialog } from "./sign-in-dialog";
import { SignUpDialog } from "./sign-up-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"


const navLinks = [
  { href: "/flats", label: "Browse Listings", icon: Search },
  { href: "/post-listing", label: "Post Listing", icon: PlusSquare },
  { href: "/roommates", label: "Find Roommates", icon: Users },
  { href: "/saved", label: "Saved", icon: Bookmark },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    window.addEventListener("scroll", handleScroll);
    
    return () => {
        window.removeEventListener("scroll", handleScroll);
        unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const isTransparent = pathname === '/' && !isScrolled;

  return (
    <header className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b" : 
        (pathname === '/' ? "bg-[#2a0d45]" : "bg-background border-b")
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className={cn(isTransparent && "text-white hover:text-white hover:bg-white/10")}>
                  <Menu className="w-6 h-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {navLinks.map((link) => (
                  <DropdownMenuItem key={link.href} asChild>
                    <Link href={link.href} className="flex items-center gap-2">
                       <link.icon className="w-4 h-4 text-muted-foreground" />
                      <span>{link.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        
          <Link href="/" className="flex items-center space-x-2">
            <span className={cn(
              "font-bold text-2xl transition-colors",
              isTransparent ? "text-white" : "text-primary"
            )}>SafeStay</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
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

        <div className="flex items-center space-x-2">
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className={cn("flex items-center gap-2", isTransparent && "text-white hover:text-white hover:bg-white/10")}>
                            {user.email?.split('@')[0]}
                            <ChevronDown className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem disabled>{user.email}</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onClick={handleSignOut}>
                             <LogOut className="mr-2 h-4 w-4" />
                             Sign Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <>
                    <SignInDialog open={isSignInOpen} onOpenChange={setIsSignInOpen} />
                    <SignUpDialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen} />

                    <Button variant="ghost" onClick={() => setIsSignInOpen(true)} className={cn(isTransparent && "text-white hover:text-white hover:bg-white/10")}>
                        Sign In
                    </Button>
                    <Button onClick={() => setIsSignUpOpen(true)} className={cn(isTransparent ? 'bg-white text-primary hover:bg-purple-100' : 'bg-primary text-primary-foreground hover:bg-primary/90')}>
                        Sign Up
                    </Button>
                </>
            )}
        </div>
      </div>
    </header>
  );
}
