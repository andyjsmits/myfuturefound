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
    <section className="relative py-8 text-center">
      <div className="app-card">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-neutral-700 mb-6 border border-blue-200/50">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            Trusted by thousands
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
            Discover Your
            <br />
            <span className="text-gradient">Career Path</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-neutral-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Take our 5-minute assessment and get personalized career insights based on your interests and strengths.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-2 text-neutral-600">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium text-base">15 Questions</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 text-neutral-600">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="font-medium text-base">5 Minutes</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 text-neutral-600">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="font-medium text-base">Instant Results</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2 text-neutral-600">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="font-medium text-base">100% Private</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={scrollToAssessment}
              className="app-button space-x-2 group text-lg px-8 py-3"
            >
              <span>Start Your Assessment</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
          
          <p className="text-sm text-neutral-500">
            No signup required • Results in 5 minutes
          </p>
        </div>
      </div>
    </section>
  )
}