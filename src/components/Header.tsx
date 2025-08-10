'use client'

import { useState } from 'react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToAssessment = () => {
    const assessmentSection = document.getElementById('assessment')
    if (assessmentSection) {
      assessmentSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a className="flex items-center gap-3" href="#">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <svg 
                className="h-6 w-6 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 14l9-5-9-5-9 5 9 5z" 
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" 
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900">MyFutureFound</h1>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="#about">
              About
            </a>
            <a className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="#how-it-works">
              How it Works
            </a>
            <a className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="#resources">
              Resources
            </a>
            <a className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="#contact">
              Contact
            </a>
          </nav>
          
          <button 
            onClick={scrollToAssessment}
            className="hidden rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg md:inline-block"
            style={{ backgroundColor: '#4F84FF' }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#3B73FF'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#4F84FF'}
          >
            Start Assessment
          </button>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg 
              className="h-6 w-6" 
              fill="none" 
              height="24" 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              width="24"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mt-4 flex flex-col gap-4 md:hidden">
            <a className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="#about">
              About
            </a>
            <a className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="#how-it-works">
              How it Works
            </a>
            <a className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="#resources">
              Resources
            </a>
            <a className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors" href="#contact">
              Contact
            </a>
            <button 
              onClick={scrollToAssessment}
              className="rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105"
              style={{ backgroundColor: '#4F84FF' }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#3B73FF'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#4F84FF'}
            >
              Start Assessment
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}