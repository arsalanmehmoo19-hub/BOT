-- 1. Ensure the category exists
INSERT INTO public.categories (name, slug)
VALUES ('Skirts', 'skirts')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- 2. Update existing products to ensure they have the correct category_id
-- This will link all products in the 'products' table that haven't been assigned yet, 
-- or fix potential mismatches
UPDATE public.products
SET category_id = (SELECT id FROM public.categories WHERE slug = 'skirts')
WHERE name ILIKE '%skirt%';

-- 3. Verify the category exists and return its details
SELECT * FROM public.categories WHERE slug = 'skirts';
