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

  const features = [
    {
      icon: (
        <svg className="icon-consistent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: "15 Research-Backed Questions"
    },
    {
      icon: (
        <svg className="icon-consistent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      text: "5-Minute Assessment"
    },
    {
      icon: (
        <svg className="icon-consistent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      text: "Instant Career Insights"
    },
    {
      icon: (
        <svg className="icon-consistent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      text: "Secure & Private"
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-blue-50/50 to-purple-50/50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="absolute top-1/2 -right-24 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
          style={{ animationDelay: '2s' }}
        />
        <div 
          className="absolute -bottom-24 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500/10 to-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container-fluid relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Text */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-neutral-700 mb-8 border border-blue-200/50">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse" />
              Trusted by thousands of students and professionals
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-extrabold text-neutral-900 mb-8 tracking-tight leading-[1.1]">
              Discover Your
              <br />
              <span className="text-gradient relative">
                Career Path
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-lg -z-10" />
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Our research-backed assessment reveals your unique motivation style and 
              <span className="text-neutral-900 font-semibold"> unlocks personalized career recommendations</span> 
              in just 5 minutes.
            </p>
          </div>

          {/* Feature Pills */}
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center space-x-2 px-4 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-neutral-200/50 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/90"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-blue-600 flex-shrink-0">
                  {feature.icon}
                </div>
                <span className="text-sm font-medium text-neutral-700 whitespace-nowrap">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <button
              onClick={scrollToAssessment}
              className="btn-primary text-lg px-8 py-4 flex items-center space-x-3 group"
            >
              <span>Start Your Assessment</span>
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            
            <button className="btn-secondary text-lg px-8 py-4 flex items-center space-x-3 group">
              <svg className="w-5 h-5 text-neutral-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-4-8V3" />
              </svg>
              <span>See Sample Results</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-500">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">Research-Validated</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-medium">Privacy Protected</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="font-medium">Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-neutral-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-neutral-300 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}