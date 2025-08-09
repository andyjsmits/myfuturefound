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

-- Add RLS (Row Level Security) if needed
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (you can modify this based on your security needs)
CREATE POLICY "Allow public inserts" ON assessments
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy to allow reads (you can modify this based on your security needs)
CREATE POLICY "Allow public reads" ON assessments
  FOR SELECT
  TO public
  USING (true);

-- Add indexes for performance
CREATE INDEX idx_assessments_parent_email ON assessments (parent_email);
CREATE INDEX idx_assessments_teen_email ON assessments (teen_email);
CREATE INDEX idx_assessments_created_at ON assessments (created_at);