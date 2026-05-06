'use client';

import { use, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const typeFilter = searchParams.get('type');
  
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      
      let productsData: any[] = [];
      
      if (slug === 'all') {
        const { data, error } = await supabase.from('products').select('*, product_images(*)');
        if (error) {
          console.error('Supabase Error Details [all]:', {
            message: error?.message || error,
            details: error?.details,
            hint: error?.hint,
            code: error?.code
          });
        } else {
          productsData = data || [];
        }
      } else {
        // 1. Get the category ID based on the slug
        const { data: category, error: catError } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', slug)
          .single();

        if (catError || !category) {
          console.warn(`Category slug '${slug}' not found in database.`);
          setProducts([]);
          setLoading(false);
          return;
        }

        // 2. Fetch products for that category
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(*)')
          .eq('category_id', category.id);
          
        if (error) {
          console.error('Supabase Error Details [category filter]:', {
            message: error?.message || error,
            details: error?.details,
            hint: error?.hint,
            code: error?.code
          });
        } else {
          productsData = data || [];
        }
      }

      // 3. Process products (formatting)
      const formatted = productsData.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        description: p.description,
        image: p.product_images && p.product_images.length > 0 ? p.product_images[0].image_url : null
      }));

      // 4. Client-side filter by type parameter
      let filtered = formatted;
      if (typeFilter) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(typeFilter.toLowerCase()));
      }

      setProducts(filtered);
      setLoading(false);
    }
    fetchProducts();
  }, [slug, typeFilter]);

  const title = typeFilter 
    ? typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1) 
    : (slug === 'all' ? 'All Collections' : slug.charAt(0).toUpperCase() + slug.slice(1));
    
  const description = 'Explore our curated pieces.';

  return (
    <main className="min-h-screen pt-20">
      <Navbar />

      {/* Header */}
      <section className="py-24 px-6 border-b border-bento-line bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6 max-w-2xl">
            <nav className="flex space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
              <Link href="/" className="hover:text-black">Home</Link>
              <span>/</span>
              <span className="text-black">Shop</span>
            </nav>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-8xl font-black tracking-[-3px] uppercase leading-none"
            >
              {title}
            </motion.h1>
            <p className="text-[13px] text-black/50 font-bold uppercase tracking-widest leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="py-20 text-center">Loading...</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-40 text-center space-y-6">
              <h2 className="text-2xl font-medium">No products found in this category.</h2>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
