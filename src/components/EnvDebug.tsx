'use client'

import React from 'react';

export default function EnvDebug() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <div className="fixed top-4 left-4 bg-black text-white p-4 rounded-lg text-xs z-50 max-w-md">
      <h3 className="font-bold mb-2">🔧 Environment Debug</h3>
      <div className="space-y-1">
        <div>
          <strong>SUPABASE_URL:</strong> 
          <br />
          {url ? `${url.substring(0, 50)}...` : '❌ NOT SET'}
        </div>
        <div>
          <strong>SUPABASE_KEY:</strong> 
          <br />
          {key ? `${key.substring(0, 30)}...` : '❌ NOT SET'}
        </div>
        <div>
          <strong>Status:</strong> 
          {url?.includes('placeholder') || key?.includes('placeholder') || !url || !key 
            ? ' ❌ Using placeholders' 
            : ' ✅ Real credentials'
          }
        </div>
      </div>
    </div>
  );
}