import { Header } from '@/components/header'
import { PricingHero } from '@/components/pricing-hero'
import { PricingTiers } from '@/components/pricing-tiers'
import { PricingFAQ } from '@/components/pricing-faq'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'

export default function PricingPage() {
  return (
    <main>
      <Header />
      <PricingHero />
      <PricingTiers />
      <PricingFAQ />
      <CTA />
      <Footer />
    </main>
  )
}
