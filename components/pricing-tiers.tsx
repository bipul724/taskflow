'use client'

import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { Card } from '@/components/ui/card'

export function PricingTiers() {
  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small teams',
      price: 'Free',
      features: [
        'Up to 3 projects',
        'Up to 5 team members',
        'Basic TaskFlow boards',
        'Task comments',
        'Activity logs',
        'Community support',
      ],
      cta: 'Get started',
      highlighted: false,
    },
    {
      name: 'Professional',
      description: 'For growing teams with advanced needs',
      price: '$10',
      period: '/month per user',
      features: [
        'Unlimited projects',
        'Unlimited team members',
        'Advanced automation',
        'Custom workflows',
        'Progress analytics',
        'Priority support',
        'API access',
        'Integrations (Slack, GitHub, etc)',
      ],
      cta: 'Start free trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      price: 'Custom',
      period: 'Contact sales',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security',
        'SSO & SAML',
        'On-premise option',
        'SLA guarantee',
        'Custom training',
      ],
      cta: 'Contact sales',
      highlighted: false,
    },
  ]

  return (
    <section className="py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative transition-all duration-300 ${plan.highlighted ? 'md:scale-105' : ''
                }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center">
                  <span className="bg-primary text-primary-foreground px-4 py-1 text-xs font-medium rounded-full">
                    Most popular
                  </span>
                </div>
              )}
              <Card
                className={`p-8 h-full flex flex-col transition-all duration-300 ${plan.highlighted
                    ? 'bg-secondary border-2 border-primary'
                    : 'bg-card'
                  }`}
              >
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {plan.period}
                      </p>
                    )}
                  </div>

                  <Button
                    className={`w-full mb-8 ${plan.highlighted
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-secondary text-foreground hover:bg-secondary/80'
                      }`}
                  >
                    {plan.cta}
                  </Button>
                </div>

                <div className="space-y-4 flex-grow">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-muted-foreground">
            Need help choosing? <a href="#" className="text-primary hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  )
}
