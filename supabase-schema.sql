-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_email TEXT,
  teen_email TEXT,
  responses JSONB NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for assessment submissions)
CREATE POLICY "Allow public inserts" ON assessments
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reading own records (optional - for future features)
CREATE POLICY "Allow reading own records" ON assessments
  FOR SELECT USING (
    parent_email = current_setting('request.jwt.claims', true)::json->>'email' OR
    teen_email = current_setting('request.jwt.claims', true)::json->>'email'
  );

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON assessments TO anon;
GRANT SELECT ON assessments TO anon;