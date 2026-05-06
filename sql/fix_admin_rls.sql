-- Fix RLS policies for admins table
-- Run this in Supabase SQL Editor

-- 1. Drop existing policies
DROP POLICY IF EXISTS "Public all access admins" ON admins;

-- 2. Create policy that allows public access (for development)
CREATE POLICY "Public all access admins" 
ON admins 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- 3. Make sure RLS is enabled
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- 4. Grant permissions
GRANT ALL ON admins TO anon;
GRANT ALL ON admins TO authenticated;

-- 5. Add default admin email (replace with your email after signup)
-- First, sign up at /account page with your email
-- Then run this insert with YOUR email:
INSERT INTO admins (email, password, role)
VALUES ('admin@example.com', 'admin', 'admin')
ON CONFLICT (email) DO UPDATE SET role = 'admin';

-- To add YOUR email after you sign up, run:
-- INSERT INTO admins (email, role)
-- VALUES ('your-email@example.com', 'admin')
-- ON CONFLICT (email) DO UPDATE SET role = 'admin';
