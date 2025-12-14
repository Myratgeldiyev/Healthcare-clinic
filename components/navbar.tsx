"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/auth-store"
import { cn } from "@/lib/utils"
import { User, LogOut, Calendar, MessageSquare } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const { isAuthenticated, user, logout } = useAuthStore()

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/appointments", label: "Book Appointment" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Calendar className="h-6 w-6" />
            </div>
            <span className="text-xl font-semibold">HealthCare Clinic</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/chat">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chat
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    {user?.name}
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
