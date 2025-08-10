'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-[var(--neutral-dark)] text-slate-400">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 md:justify-start">
            <a className="text-sm transition-colors hover:text-[var(--neutral-white)]" href="#privacy">
              Privacy Policy
            </a>
            <a className="text-sm transition-colors hover:text-[var(--neutral-white)]" href="#terms">
              Terms of Service
            </a>
            <a className="text-sm transition-colors hover:text-[var(--neutral-white)]" href="#contact">
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