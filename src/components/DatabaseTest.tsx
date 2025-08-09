'use client'

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function DatabaseTest() {
  const [isVisible, setIsVisible] = useState(false);
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const runDatabaseTest = async () => {
    setIsLoading(true);
    setTestResult('Testing database connection...\n');
    
    try {
      // Check environment variables
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      setTestResult(prev => prev + `✓ Supabase URL: ${url}\n`);
      setTestResult(prev => prev + `✓ Supabase Key: ${key ? 'Present' : 'Missing'}\n\n`);
      
      if (!url || !key || url.includes('placeholder') || key.includes('placeholder')) {
        setTestResult(prev => prev + '❌ Environment variables not configured!\n');
        return;
      }

      // Test connection
      setTestResult(prev => prev + 'Testing connection to assessments table...\n');
      const { data, error } = await supabase
        .from('assessments')
        .select('*', { count: 'exact', head: true });

      if (error) {
        setTestResult(prev => prev + `❌ Connection failed: ${error.message}\n`);
        if (error.message.includes('relation "assessments" does not exist')) {
          setTestResult(prev => prev + '💡 The assessments table needs to be created in Supabase!\n');
        }
        return;
      }

      setTestResult(prev => prev + '✅ Connection successful!\n');
      setTestResult(prev => prev + `📊 Current record count: ${data || 0}\n\n`);

      // Test insert
      setTestResult(prev => prev + 'Testing data insertion...\n');
      const testData = {
        parent_email: 'test@example.com',
        responses: { '1': 'A', '2': 'B' },
        results: { test: true },
        created_at: new Date().toISOString()
      };

      const { data: insertData, error: insertError } = await supabase
        .from('assessments')
        .insert([testData])
        .select();

      if (insertError) {
        setTestResult(prev => prev + `❌ Insert failed: ${insertError.message}\n`);
        return;
      }

      setTestResult(prev => prev + '✅ Insert successful!\n');
      setTestResult(prev => prev + `📄 Inserted record ID: ${insertData?.[0]?.id}\n`);

      // Clean up test record
      if (insertData?.[0]?.id) {
        await supabase
          .from('assessments')
          .delete()
          .eq('id', insertData[0].id);
        setTestResult(prev => prev + '🧹 Test record cleaned up\n');
      }

      setTestResult(prev => prev + '\n✅ All tests passed! Database is working correctly.');

    } catch (error: any) {
      setTestResult(prev => prev + `❌ Unexpected error: ${error.message}\n`);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsVisible(true)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700"
        >
          🔧 Database Test
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Database Connection Test</h3>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={runDatabaseTest}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Run Database Test'}
          </button>
          
          {testResult && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {testResult}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}