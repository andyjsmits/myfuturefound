'use client'

export default function Features() {
  const features = [
    {
      name: 'Comprehensive Analysis',
      description: 'Our assessment evaluates a wide range of factors, including personality traits, skills, and interests, to provide a holistic view of your teen\'s potential.',
      icon: (
        <svg fill="currentColor" height="28" viewBox="0 0 256 256" width="28" xmlns="http://www.w3.org/2000/svg">
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
      ),
      color: '#34d399'
    },
    {
      name: 'Actionable Insights',
      description: 'Receive a detailed report with personalized career recommendations, educational pathways, and practical steps to achieve their goals.',
      icon: (
        <svg fill="currentColor" height="28" viewBox="0 0 256 256" width="28" xmlns="http://www.w3.org/2000/svg">
          <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176ZM104,120v24a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v40a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z"></path>
        </svg>
      ),
      color: '#f59e0b'
    },
    {
      name: 'Family Collaboration',
      description: 'Our platform encourages open communication between parents and teens, fostering a supportive environment for career planning.',
      icon: (
        <svg fill="currentColor" height="28" viewBox="0 0 256 256" width="28" xmlns="http://www.w3.org/2000/svg">
          <path d="M244.8,150.4a8,8,0,0,1-11.2-1.6A51.6,51.6,0,0,0,192,128a8,8,0,0,1-7.37-4.89,8,8,0,0,1,0-6.22A8,8,0,0,1,192,112a24,24,0,1,0-23.24-30,8,8,0,1,1-15.5-4A40,40,0,1,1,219,117.51a67.94,67.94,0,0,1,27.43,21.68A8,8,0,0,1,244.8,150.4ZM190.92,212a8,8,0,1,1-13.84,8,57,57,0,0,0-98.16,0,8,8,0,1,1-13.84-8,72.06,72.06,0,0,1,33.74-29.92,48,48,0,1,1,58.36,0A72.06,72.06,0,0,1,190.92,212ZM128,176a32,32,0,1,0-32-32A32,32,0,0,0,128,176ZM72,120a8,8,0,0,0-8-8A24,24,0,1,1,87.24,82a8,8,0,1,0,15.5-4A40,40,0,1,0,37,117.51,67.94,67.94,0,0,0,9.6,139.19a8,8,0,1,0,12.8,9.61A51.6,51.6,0,0,1,64,128,8,8,0,0,0,72,120Z"></path>
        </svg>
      ),
      color: '#f97316'
    }
  ]

  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{color: '#0f172a'}}>
            Why Choose Career Compass?
          </h2>
          <p className="mt-4 text-lg leading-8" style={{color: '#64748b'}}>
            Our assessment provides a personalized approach to career exploration, offering valuable insights for both teens and parents.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:max-w-none lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className="flex flex-col rounded-2xl p-8 shadow-lg transition-transform hover:-translate-y-2"
              style={{backgroundColor: '#ffffff'}}
            >
              <div 
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: feature.color, color: '#ffffff' }}
              >
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold" style={{color: '#0f172a'}}>
                {feature.name}
              </h3>
              <p className="mt-2 text-base" style={{color: '#64748b'}}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}