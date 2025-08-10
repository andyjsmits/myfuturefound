import Hero from '@/components/Hero'
import FutureFoundAssessment from '@/components/FutureFoundAssessment'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <section id="assessment" className="bg-gradient-to-br from-neutral-50 to-blue-50/30">
        <FutureFoundAssessment />
      </section>
    </div>
  )
}