'use client'

import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-secondary rounded-full">
          <span className="text-xs font-medium text-foreground">
            Powerful project management, made simple
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
          TaskFlow: Control your project from day one
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          TaskFlow combines the simplicity of Trello with the power of project management. Organize tasks, collaborate with your team, and deliver projects on time.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get started on Cloud
          </Button>
          <Button size="lg" variant="outline">
            Self host with GitHub
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-4">
          No credit card required
        </p>

        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur-3xl"></div>
          <div className="relative bg-card rounded-lg border overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="text-sm">TaskFlow board preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
