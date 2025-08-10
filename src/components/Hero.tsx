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
    <section className="relative h-screen min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          alt="A group of students looking towards a bright future" 
          className="h-full w-full object-cover" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAfAI66v7AM69jrN2-0T8Fl3J5eSSZqhRTzQgfUCgBiesyC_7Xv-DEz_2LGVcovIGqhB28UpM4FgKKNK6sChXovJmwa3jl52ghT_kUPF3HZib5IMRxhy9bk69MwAb2WyNck4BHT5KHiXJV3Jbfah-9kdQK80bGSb3TR89UwMV2d6-FHzCs5Dso4pwng0Lvx7Y0Xo4ej1H2l-6I_6GJui25BWIIYNRZft2cewvbcM4bV_t8irJnn3tT-EvYOX25VoC9f--ruUiK"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Unlock Your Teen's Potential
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Help your high school graduate discover their ideal career path with our comprehensive assessment. 
            Gain insights into their strengths, interests, and values to make informed decisions about their future.
          </p>
          <button
            onClick={scrollToAssessment}
            className="rounded-lg px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ backgroundColor: '#4F84FF' }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#3B73FF'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#4F84FF'}
          >
            Start Assessment
          </button>
        </div>
      </div>
    </section>
  )
}