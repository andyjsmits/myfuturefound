'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

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
    <section className="relative">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          alt="A group of students looking towards a bright future" 
          className="h-full w-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAfAI66v7AM69jrN2-0T8Fl3J5eSSZqhRTzQgfUCgBiesyC_7Xv-DEz_2LGVcovIGqhB28UpM4FgKKNK6sChXovJmwa3jl52ghT_kUPF3HZib5IMRxhy9bk69MwAb2WyNck4BHT5KHiXJV3Jbfah-9kdQK80bGSb3TR89UwMV2d6-FHzCs5Dso4pwng0Lvx7Y0Xo4ej1H2l-6I_6GJui25BWIIYNRZft2cewvbcM4bV_t8irJnn3tT-EvYOX25VoC9f--ruUiK"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
      </div>
      
      {/* Hero Content */}
      <div className="relative mx-auto max-w-4xl px-6 py-32 text-center text-[var(--neutral-white)] sm:py-48 lg:py-56">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Unlock Your Teen's Potential
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-slate-200">
            Help your high school graduate discover their ideal career path with our comprehensive assessment. 
            Gain insights into their strengths, interests, and values to make informed decisions about their future.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={scrollToAssessment}
              className="rounded-xl bg-[var(--primary-blue)] px-8 py-4 text-base font-bold text-[var(--neutral-white)] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-green)]"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}