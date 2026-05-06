-- 1. Insert a category (if not exists)
INSERT INTO public.categories (name, slug)
VALUES ('Skirts', 'skirts')
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert products and their images using subqueries
-- This uses a CTE to insert the product and then use its new ID to insert an image

WITH new_product AS (
  INSERT INTO public.products (name, description, price, category_id)
  VALUES (
    'Ethereal Flow Skirt', 
    'A lightweight, breathable skirt made from organic cotton blend.', 
    89.99, 
    (SELECT id FROM public.categories WHERE slug = 'skirts')
  )
  RETURNING id
)
INSERT INTO public.product_images (product_id, image_url, is_primary)
SELECT id, 'https://picsum.photos/600/800', true FROM new_product;

WITH new_product AS (
  INSERT INTO public.products (name, description, price, category_id)
  VALUES (
    'Structured Midi Skirt', 
    'Sophisticated midi length skirt with sharp pleats for a refined look.', 
    120.00, 
    (SELECT id FROM public.categories WHERE slug = 'skirts')
  )
  RETURNING id
)
INSERT INTO public.product_images (product_id, image_url, is_primary)
SELECT id, 'https://picsum.photos/601/801', true FROM new_product;
