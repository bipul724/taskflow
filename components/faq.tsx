'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const faqs = [
    {
      question: 'What makes TaskFlow different from other tools?',
      answer: 'TaskFlow combines the simplicity of TaskFlow boards with enterprise-grade project management. We focus on what matters: organizing work, collaborating with your team, and delivering on time.'
    },
    {
      question: 'Can I migrate from another tool?',
      answer: 'Absolutely! TaskFlow supports imports from Trello, Jira, and other popular project management tools. We handle the migration so you can focus on your work.'
    },
    {
      question: 'Is there a free plan?',
      answer: 'Yes! Our free plan includes unlimited projects, team collaboration, and core features. Upgrade to premium for advanced automation and analytics.'
    },
    {
      question: 'How much does TaskFlow cost?',
      answer: 'Free forever for individuals and small teams. Premium plans start at $10/month per user. No surprises, no hidden fees.'
    },
    {
      question: 'How do I invite my team?',
      answer: 'Invite team members with just an email. They\'ll get instant access to your workspace and can start collaborating immediately.'
    },
    {
      question: 'What about security and data privacy?',
      answer: 'Your data is encrypted and stored securely. We comply with GDPR, SOC 2, and follow industry-standard security practices.'
    },
  ]

  return (
    <section id="faq" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-secondary/40">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">FAQs</h2>
          <p className="text-lg text-muted-foreground">Find answers to common questions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-lg bg-card">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition"
              >
                <span className="font-semibold text-foreground text-left">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transition-transform ${openIdx === idx ? 'transform rotate-180' : ''
                    }`}
                />
              </button>
              {openIdx === idx && (
                <div className="px-6 py-4 border-t bg-muted/30">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
