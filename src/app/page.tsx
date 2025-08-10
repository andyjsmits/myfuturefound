import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import CTA from '@/components/CTA'
import FutureFoundAssessment from '@/components/FutureFoundAssessment'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <CTA />
        <section id="assessment" className="py-20 sm:py-28 bg-[var(--neutral-light)]">
          <div className="container mx-auto px-6">
            <FutureFoundAssessment />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}