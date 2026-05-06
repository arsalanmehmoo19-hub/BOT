import { supabase } from '@/lib/supabaseClient';

export async function seedProducts() {
  // 1. First, ensure we have a 'Skirts' category
  const { data: category, error: catError } = await supabase
    .from('categories')
    .upsert({ name: 'Skirts', slug: 'skirts' }, { onConflict: 'slug' })
    .select()
    .single();

  if (catError) {
    console.error('Error seeding category:', catError);
    return;
  }

  // 2. Add Lorem Products to 'Skirts'
  const products = [
    {
      name: 'Ethereal Flow Skirt',
      description: 'A lightweight, breathable skirt made from organic cotton blend. Perfect for summer days.',
      price: 89.99,
      category_id: category.id
    },
    {
      name: 'Structured Midi Skirt',
      description: 'Sophisticated midi length skirt with sharp pleats for a refined look.',
      price: 120.00,
      category_id: category.id
    }
  ];

  for (const prod of products) {
    const { data: newProd, error: prodError } = await supabase
      .from('products')
      .insert(prod)
      .select()
      .single();

    if (prodError) {
      console.error('Error inserting product:', prodError);
      continue;
    }

    // Insert dummy image
    await supabase.from('product_images').insert({
      product_id: newProd.id,
      image_url: 'https://picsum.photos/600/800',
      is_primary: true
    });
  }

  console.log('Successfully seeded Skirts category with products.');
}
