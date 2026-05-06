-- WARNING: If you are seeing empty `{}` errors in your console, 
-- or if you get completely empty arrays even when there is data in the database
-- then your tables likely have Row Level Security (RLS) enabled but NO POLICIES set.
--
-- Please execute the following script in the Supabase SQL Editor.
-- This will create missing tables again just in case, and then configure 
-- open public access policies for development purposes.

-- 1. Create Categories (IF missing)
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL
);

-- 2. Create Products (IF missing)
CREATE TABLE IF NOT EXISTS public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE,
  description text,
  price decimal(10,2) NOT NULL,
  size text,
  category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 3. Create Product Images (Allows multiple images per product) (IF missing)
CREATE TABLE IF NOT EXISTS public.product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  image_url text NOT NULL
);

-- 4. Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- 4.5. Create Orders (IF missing)
CREATE TABLE IF NOT EXISTS public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_reference text, 
  total_amount decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  shipping_address text,
  payment_method text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 4.6. Create Order Items (IF missing)
CREATE TABLE IF NOT EXISTS public.order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  quantity int NOT NULL DEFAULT 1,
  price_at_purchase decimal(10,2) NOT NULL
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- 5. Drop any existing restrictive policies (so we can recreate them fresh)
DROP POLICY IF EXISTS "Public access" ON public.products;
DROP POLICY IF EXISTS "Public access" ON public.categories;
DROP POLICY IF EXISTS "Public access" ON public.product_images;
DROP POLICY IF EXISTS "Public read access" ON public.products;
DROP POLICY IF EXISTS "Public read access" ON public.categories;
DROP POLICY IF EXISTS "Public read access" ON public.product_images;
DROP POLICY IF EXISTS "Public all access" ON public.products;
DROP POLICY IF EXISTS "Public all access" ON public.categories;
DROP POLICY IF EXISTS "Public all access" ON public.product_images;
DROP POLICY IF EXISTS "Public all access products" ON public.products;
DROP POLICY IF EXISTS "Public all access categories" ON public.categories;
DROP POLICY IF EXISTS "Public all access product_images" ON public.product_images;
DROP POLICY IF EXISTS "Public all access orders" ON public.orders;
DROP POLICY IF EXISTS "Public all access order_items" ON public.order_items;

-- 6. Add policies that ALLOW PUBLIC ANON KEY access (read, insert, update, delete)
-- (Important for our Admin Dashboard since it currently uses frontend logic)
CREATE POLICY "Public all access products" ON public.products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all access categories" ON public.categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all access product_images" ON public.product_images FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all access orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public all access order_items" ON public.order_items FOR ALL USING (true) WITH CHECK (true);

-- Done!
