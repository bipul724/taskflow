'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GetStartedButton } from '@/components/get-started-button'

export function Header() {
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
              className="bg-primary text-primary-foreground hover:bg-primary/90 flex-row"
              showWelcomeMessage={false}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
