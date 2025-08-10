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
    <section className="bg-[var(--neutral-white)] py-20 sm:py-28">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[var(--neutral-dark)]">
          Ready to Begin?
        </h2>
        <p className="mt-4 text-lg leading-8 text-[var(--neutral-gray)]">
          Take the first step towards a successful future. Start the Career Compass assessment today!
        </p>
        <div className="mt-10">
          <button
            onClick={scrollToAssessment}
            className="rounded-xl bg-[var(--primary-blue)] px-8 py-4 text-base font-bold text-[var(--neutral-white)] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-green)]"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  )
}