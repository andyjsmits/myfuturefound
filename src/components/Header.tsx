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
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a className="flex items-center gap-3" style={{color: '#0f172a'}} href="#">
            <svg 
              className="h-8 w-8" 
              style={{color: '#198ae6'}} 
              fill="none" 
              viewBox="0 0 48 48" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" 
                fill="currentColor"
              />
            </svg>
            <h2 className="text-xl font-bold">Career Compass</h2>
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            <a className="text-sm font-medium transition-colors hover:scale-105" style={{color: '#64748b'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#198ae6'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'} href="#about">
              About
            </a>
            <a className="text-sm font-medium transition-colors hover:scale-105" style={{color: '#64748b'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#198ae6'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'} href="#how-it-works">
              How it Works
            </a>
            <a className="text-sm font-medium transition-colors hover:scale-105" style={{color: '#64748b'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#198ae6'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'} href="#resources">
              Resources
            </a>
            <a className="text-sm font-medium transition-colors hover:scale-105" style={{color: '#64748b'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#198ae6'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'} href="#contact">
              Contact
            </a>
          </nav>
          
          <button 
            onClick={scrollToAssessment}
            className="hidden rounded-xl px-5 py-2.5 text-sm font-bold transition-transform hover:scale-105 md:inline-block"
            style={{
              backgroundColor: '#198ae6',
              color: '#ffffff'
            }}
            onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#34d399'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#198ae6'}
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
            <a className="text-sm font-medium transition-colors hover:scale-105" style={{color: '#64748b'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#198ae6'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'} href="#about">
              About
            </a>
            <a className="text-sm font-medium transition-colors hover:scale-105" style={{color: '#64748b'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#198ae6'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'} href="#how-it-works">
              How it Works
            </a>
            <a className="text-sm font-medium transition-colors hover:scale-105" style={{color: '#64748b'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#198ae6'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'} href="#resources">
              Resources
            </a>
            <a className="text-sm font-medium transition-colors hover:scale-105" style={{color: '#64748b'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#198ae6'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#64748b'} href="#contact">
              Contact
            </a>
            <button 
              onClick={scrollToAssessment}
              className="rounded-xl px-5 py-2.5 text-sm font-bold transition-transform hover:scale-105"
              style={{
                backgroundColor: '#198ae6',
                color: '#ffffff'
              }}
              onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#34d399'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#198ae6'}
            >
              Start Assessment
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}