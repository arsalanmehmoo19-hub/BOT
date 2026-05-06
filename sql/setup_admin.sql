-- Run this in Supabase SQL Editor to fix admin access

-- 1. Fix RLS policies for admins table
ALTER TABLE admins DISABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public all access admins" ON admins;
CREATE POLICY "Public all access admins" 
  ON admins 
  FOR ALL 
  USING (true) 
  WITH CHECK (true);

-- 2. Grant permissions
GRANT ALL ON admins TO anon;
GRANT ALL ON admins TO authenticated;

-- 3. Remove password column (no longer needed with Supabase Auth)
-- Uncomment the line below if you want to remove the password column:
-- ALTER TABLE admins DROP COLUMN IF EXISTS password;

-- 4. Add admin email (REPLACE with your actual email after you sign up)
-- First: Go to /account page and sign up with your email
-- Then: Replace 'your-email@example.com' with your actual email and run this:
--
-- INSERT INTO admins (email, role) 
-- VALUES ('your-email@example.com', 'admin')
-- ON CONFLICT (email) DO UPDATE SET role = 'admin';

-- Example (uncomment and replace):
-- INSERT INTO admins (email, role) 
-- VALUES ('admin@example.com', 'admin')
-- ON CONFLICT (email) DO UPDATE SET role = 'admin';
