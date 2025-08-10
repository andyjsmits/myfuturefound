'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="text-slate-400" style={{backgroundColor: '#0f172a'}}>
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:justify-start">
            <a className="text-sm transition-colors" style={{color: '#94a3b8'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#ffffff'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#94a3b8'} href="#privacy">
              Privacy Policy
            </a>
            <a className="text-sm transition-colors" style={{color: '#94a3b8'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#ffffff'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#94a3b8'} href="#terms">
              Terms of Service
            </a>
            <a className="text-sm transition-colors" style={{color: '#94a3b8'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#ffffff'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#94a3b8'} href="#contact">
              Contact Us
            </a>
          </div>
          <p className="text-center text-sm md:text-left">
            © {currentYear} Career Compass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}