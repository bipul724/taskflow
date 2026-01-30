'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Can I change plans at any time?',
      answer: 'Yes! You can upgrade or downgrade your plan anytime. Changes take effect at the start of your next billing cycle.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), bank transfers, and PayPal for annual plans.'
    },
    {
      question: 'Is there a discount for annual billing?',
      answer: 'Yes! Choose annual billing and get 2 months free. That\'s a 20% discount on Professional plans.'
    },
    {
      question: 'What if I need more than unlimited?',
      answer: 'Our unlimited plans truly are unlimited. If you need custom solutions or on-premise options, our Enterprise plan is for you.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'If you\'re not satisfied within 30 days, we\'ll issue a full refund. No questions asked.'
    },
    {
      question: 'How many team members can I add?',
      answer: 'Professional and Enterprise plans support unlimited team members. Starter plan supports up to 5 members.'
    },
  ]

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pricing questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about our plans and pricing.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg bg-background transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <span className="font-medium text-foreground text-left">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 border-t text-muted-foreground text-sm">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
