'use client'

export default function CTA() {
  const scrollToAssessment = () => {
    const assessmentSection = document.getElementById('assessment')
    if (assessmentSection) {
      assessmentSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <section className="py-20 sm:py-28" style={{backgroundColor: '#ffffff'}}>
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{color: '#0f172a'}}>
          Ready to Begin?
        </h2>
        <p className="mt-4 text-lg leading-8" style={{color: '#64748b'}}>
          Take the first step towards a successful future. Start the Career Compass assessment today!
        </p>
        <div className="mt-10">
          <button
            onClick={scrollToAssessment}
            className="rounded-xl px-8 py-4 text-base font-bold shadow-lg transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: '#198ae6',
              color: '#ffffff'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#34d399'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#198ae6'}
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  )
}