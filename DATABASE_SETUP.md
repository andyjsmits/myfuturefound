# Database Setup Guide

## Supabase Table Creation

To store assessment data, you need to create the `assessments` table in your Supabase database.

### Steps:

1. **Go to your Supabase project dashboard**
   - Visit [supabase.com](https://supabase.com)
   - Open your project

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar

3. **Run the following SQL commands:**

```sql
-- Create assessments table
CREATE TABLE assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_email TEXT,
  teen_email TEXT,
  responses JSONB NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add constraint to ensure at least one email is provided
ALTER TABLE assessments ADD CONSTRAINT at_least_one_email_check 
  CHECK (parent_email IS NOT NULL OR teen_email IS NOT NULL);

-- Add RLS (Row Level Security)
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts
CREATE POLICY "Allow public inserts" ON assessments
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow reads (optional - for admin purposes)
CREATE POLICY "Allow public reads" ON assessments
  FOR SELECT
  TO public
  USING (true);

-- Add indexes for performance
CREATE INDEX idx_assessments_parent_email ON assessments (parent_email);
CREATE INDEX idx_assessments_teen_email ON assessments (teen_email);
CREATE INDEX idx_assessments_created_at ON assessments (created_at);
```

4. **Click "RUN" to execute the SQL**

5. **Verify the table was created:**
   - Go to "Table Editor" in the left sidebar
   - You should see the `assessments` table listed

## Table Schema

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key (auto-generated) |
| `parent_email` | TEXT | Parent's email (optional) |
| `teen_email` | TEXT | Teen's email (optional) |
| `responses` | JSONB | User's question responses |
| `results` | JSONB | Calculated motivation profile |
| `created_at` | TIMESTAMP | When assessment was completed |
| `updated_at` | TIMESTAMP | Last updated timestamp |

## Environment Variables

Make sure your `.env.local` file has the correct Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Testing

After creating the table:

1. Complete an assessment on your website
2. Check the Supabase table editor to see if data was inserted
3. Look at browser console for any error messages

## Troubleshooting

- If you see "relation does not exist" errors, the table wasn't created successfully
- If you see permission errors, check that RLS policies are set up correctly
- If email validation fails, ensure at least one email field has a valid value