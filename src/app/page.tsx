import FutureFoundAssessment from '@/components/FutureFoundAssessment'
import DatabaseTest from '@/components/DatabaseTest'
import EnvDebug from '@/components/EnvDebug'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <EnvDebug />
      <FutureFoundAssessment />
      <DatabaseTest />
    </main>
  )
}