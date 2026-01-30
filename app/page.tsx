import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { Testimonials } from '@/components/testimonials'
import { FAQ } from '@/components/faq'
import { CTA } from '@/components/cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
