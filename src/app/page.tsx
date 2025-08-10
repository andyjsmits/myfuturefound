import Hero from '@/components/Hero'
import FutureFoundAssessment from '@/components/FutureFoundAssessment'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <section id="assessment" className="py-16 bg-gray-50">
        <FutureFoundAssessment />
      </section>
    </div>
  )
}