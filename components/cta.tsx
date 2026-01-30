'use client'

import { Button } from '@/components/ui/button'

export function CTA() {
  return (
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Start managing your projects with TaskFlow
        </h2>
        <p className="text-lg text-primary-foreground/80 mb-8">
          Get your team organized in minutes. Free plan includes everything you need to get started.
        </p>
        <Button
          size="lg"
          className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
        >
          Get started
        </Button>
      </div>
    </section>
  )
}
