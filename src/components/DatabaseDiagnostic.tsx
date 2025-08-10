'use client'

import { useState } from 'react'
import { supabase, hasValidCredentials } from '@/lib/supabase'

export default function DatabaseDiagnostic() {
  const [diagnosticResult, setDiagnosticResult] = useState<string>('')
  const [isRunning, setIsRunning] = useState(false)

  const runDiagnostic = async () => {
    setIsRunning(true)
    setDiagnosticResult('')
    
    let result = '🔍 DATABASE DIAGNOSTIC REPORT\n'
    result += '================================\n\n'

    try {
      // Check environment variables
      result += '1. ENVIRONMENT VARIABLES:\n'
      result += `   SUPABASE_URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing'}\n`
      result += `   SUPABASE_KEY: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}\n`
      result += `   Has Valid Credentials: ${hasValidCredentials() ? '✅ Yes' : '❌ No'}\n\n`

      if (!hasValidCredentials()) {
        result += '❌ CANNOT PROCEED: Missing Supabase credentials\n'
        result += 'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY\n'
        setDiagnosticResult(result)
        setIsRunning(false)
        return
      }

      // Test connection
      result += '2. CONNECTION TEST:\n'
      const { data: connectionTest, error: connectionError } = await supabase
        .from('assessments')
        .select('count', { count: 'exact', head: true })

      if (connectionError) {
        result += `   ❌ Connection failed: ${connectionError.message}\n`
        result += `   Error code: ${connectionError.code}\n`
        result += `   Error details: ${connectionError.details}\n\n`
      } else {
        result += `   ✅ Connection successful\n`
        result += `   Current record count: ${connectionTest || 0}\n\n`
      }

      // Test table structure
      result += '3. TABLE STRUCTURE TEST:\n'
      const { data: tableTest, error: tableError } = await supabase
        .from('assessments')
        .select('*')
        .limit(1)

      if (tableError) {
        result += `   ❌ Table access failed: ${tableError.message}\n`
        if (tableError.code === '42P01') {
          result += `   🔧 SOLUTION: Table 'assessments' doesn't exist. Run the schema SQL:\n`
          result += `   1. Go to Supabase Dashboard > SQL Editor\n`
          result += `   2. Run the SQL from supabase-schema.sql file\n\n`
        } else {
          result += `   Error code: ${tableError.code}\n\n`
        }
      } else {
        result += `   ✅ Table accessible\n\n`
      }

      // Test insert permissions with realistic assessment data
      result += '4. INSERT PERMISSION TEST:\n'
      const testData = {
        parent_email: 'test@example.com',
        teen_email: 'teen@example.com',
        responses: {
          1: 'A', 2: 'B', 3: 'A', 4: 'C', 5: 'B',
          6: 'A', 7: 'C', 8: 'B', 9: 'A', 10: 'C',
          11: 'B', 12: 'A', 13: 'C', 14: 'B', 15: 'A'
        },
        results: {
          categories: {
            'Problem Solving': { score: 15, percentage: 75 },
            'Leadership': { score: 12, percentage: 60 },
            'Creativity': { score: 18, percentage: 90 },
            'Helping Others': { score: 14, percentage: 70 },
            'Working with Data': { score: 16, percentage: 80 }
          },
          topCategories: ['Creativity', 'Working with Data', 'Problem Solving']
        },
        created_at: new Date().toISOString()
      }

      const { data: insertTest, error: insertError } = await supabase
        .from('assessments')
        .insert([testData])
        .select()

      if (insertError) {
        result += `   ❌ Insert failed: ${insertError.message}\n`
        result += `   Error code: ${insertError.code}\n`
        result += `   Error details: ${insertError.details}\n\n`
      } else {
        result += `   ✅ Insert successful\n`
        result += `   Test record ID: ${insertTest[0]?.id}\n\n`
        
        // Clean up test record
        if (insertTest[0]?.id) {
          await supabase
            .from('assessments')
            .delete()
            .eq('id', insertTest[0].id)
          result += `   ✅ Test record cleaned up\n\n`
        }
      }

      result += '5. RECOMMENDATIONS:\n'
      if (connectionError) {
        result += '   - Check your Supabase project URL and API key\n'
        result += '   - Verify the project is not paused\n'
        result += '   - Check Netlify environment variables\n'
      } else if (tableError) {
        result += '   - Create the "assessments" table in Supabase\n'
        result += '   - Run the SQL schema creation script\n'
      } else if (insertError) {
        result += '   - Check Row Level Security (RLS) policies\n'
        result += '   - Verify table permissions\n'
        result += '   - Check required columns exist\n'
      } else {
        result += '   ✅ Everything looks good!\n'
        result += '   - Database is properly configured\n'
        result += '   - Ready to store assessment data\n'
      }

    } catch (error: any) {
      result += `\n❌ DIAGNOSTIC ERROR: ${error.message}\n`
    }

    setDiagnosticResult(result)
    setIsRunning(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Database Diagnostic Tool</h2>
      
      <button
        onClick={runDiagnostic}
        disabled={isRunning}
        className="btn-primary mb-6 disabled:opacity-50"
      >
        {isRunning ? '🔍 Running Diagnostic...' : '🔍 Run Database Diagnostic'}
      </button>

      {diagnosticResult && (
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap overflow-x-auto">
          {diagnosticResult}
        </div>
      )}
    </div>
  )
}