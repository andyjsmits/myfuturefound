import Hero from '@/components/Hero'
import FutureFoundAssessment from '@/components/FutureFoundAssessment'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30">
      <div className="app-container">
        <Hero />
        <section id="assessment" className="py-8">
          <FutureFoundAssessment />
        </section>
      </div>
    </div>
  )
}