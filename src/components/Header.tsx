'use client'

export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/70 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900">My Future Found</h1>
          <nav className="space-x-4">
            <a href="#assessment" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Assessment
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              About
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}