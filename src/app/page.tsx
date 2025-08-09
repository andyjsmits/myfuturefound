import FutureFoundAssessment from '@/components/FutureFoundAssessment'
import DatabaseTest from '@/components/DatabaseTest'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <FutureFoundAssessment />
      <DatabaseTest />
    </main>
  )
}