'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GetStartedButton } from '@/components/get-started-button'
import { useSession } from '@/lib/auth-client'

export function Header() {
  const { data: session, isPending } = useSession()
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-foreground">
            TaskFlow
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </Link>
            <Link href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition">
              Testimonials
            </Link>
            <Link href="#faq" className="text-sm text-muted-foreground hover:text-foreground transition">
              FAQ
            </Link>
            <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {isPending ? (
              <div className="h-9 w-24 bg-muted animate-pulse rounded-xl" />
            ) : session ? (
              <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            ) : (
              <>
                <GetStartedButton
                  text="Sign in"
                  variant="ghost"
                  size="sm"
                  showWelcomeMessage={false}
                  unauthenticatedHref="/auth/login"
                  className="flex-row"
                />
                <GetStartedButton
                  text="Get started"
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                  showWelcomeMessage={false}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}