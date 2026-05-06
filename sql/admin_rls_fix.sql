-- ==========================================
-- RUN THIS IN SUPABASE DASHBOARD → SQL EDITOR
-- ==========================================

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

-- 4. IMPORTANT: Add YOUR email to admins table
-- Replace 'your-email@example.com' with YOUR actual email after you sign up
-- 
-- FIRST: Go to http://localhost:3000/account and SIGN UP with your email
-- THEN: Replace the email below and run this insert:
--
-- INSERT INTO admins (email, role) 
-- VALUES ('your-actual-email@example.com', 'admin')
-- ON CONFLICT (email) DO UPDATE SET role = 'admin';

-- Example (uncomment and replace with your email):
-- INSERT INTO admins (email, role) 
-- VALUES ('admin@example.com', 'admin')
-- ON CONFLICT (email) DO UPDATE SET role = 'admin';
