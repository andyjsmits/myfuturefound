import DatabaseDiagnostic from '@/components/DatabaseDiagnostic'

export default function DiagnosticPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Database Diagnostic Tool
        </h1>
        <DatabaseDiagnostic />
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">If you see a table error:</h3>
          <p className="text-blue-800 text-sm">
            1. Go to your Supabase dashboard<br/>
            2. Navigate to SQL Editor<br/>
            3. Copy and run the SQL from the supabase-schema.sql file in your project<br/>
            4. This will create the assessments table with proper permissions
          </p>
        </div>
      </div>
    </div>
  )
}