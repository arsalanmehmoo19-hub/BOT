-- Extra tables for full admin panel

CREATE TABLE IF NOT EXISTS admins (
  id serial PRIMARY KEY,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  role text NOT NULL DEFAULT 'editor',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS users (
  id serial PRIMARY KEY,
  full_name text,
  email text UNIQUE NOT NULL,
  password text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public all access users" ON users;
CREATE POLICY "Public all access users" ON users FOR ALL USING (true) WITH CHECK (true);

CREATE TABLE IF NOT EXISTS settings (
  id serial PRIMARY KEY,
  site_title text,
  site_description text
);

ALTER TABLE settings ADD COLUMN IF NOT EXISTS hero_title text;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS hero_description text;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS hero_cta_text text;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS hero_cta_url text;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS footer_note text;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS announcement_text text;

CREATE TABLE IF NOT EXISTS menus (
  id serial PRIMARY KEY,
  label text NOT NULL,
  url text NOT NULL,
  "order" integer DEFAULT 0
);

CREATE TABLE IF NOT EXISTS pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content jsonb NOT NULL DEFAULT '[]',
  status text NOT NULL DEFAULT 'draft',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  alt text,
  uploaded_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public all access admins" ON admins;
CREATE POLICY "Public all access admins" ON admins FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Public all access settings" ON settings;
CREATE POLICY "Public all access settings" ON settings FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Public all access menus" ON menus;
CREATE POLICY "Public all access menus" ON menus FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Public all access pages" ON pages;
CREATE POLICY "Public all access pages" ON pages FOR ALL USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "Public all access media" ON media;
CREATE POLICY "Public all access media" ON media FOR ALL USING (true) WITH CHECK (true);

-- Seed a default admin account for development.
INSERT INTO admins (email, password, role)
SELECT 'admin@example.com', 'admin', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM admins WHERE email = 'admin@example.com');

-- Seed default settings for the storefront.
INSERT INTO settings (site_title, site_description, hero_title, hero_description, hero_cta_text, hero_cta_url, footer_note, announcement_text)
SELECT 'I.A Clothing', 'A modern editorial fashion showroom built on purposeful design.', 'Modern essentials designed to last.', 'A new system for everyday dressing with thoughtful detail, precise tailoring, and purpose-built materials.', 'Browse Collections', '/category/all', 'Join the list for updates, launches, and stories.', 'Free shipping on orders over $250.'
WHERE NOT EXISTS (SELECT 1 FROM settings WHERE id = 1);

-- Seed basic menu links if none exist.
INSERT INTO menus (label, url, "order")
SELECT 'Manifesto', '/about', 1
WHERE NOT EXISTS (SELECT 1 FROM menus WHERE url = '/about');

INSERT INTO menus (label, url, "order")
SELECT 'Archives', '/archives', 2
WHERE NOT EXISTS (SELECT 1 FROM menus WHERE url = '/archives');
