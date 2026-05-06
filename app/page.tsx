'use client';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import PageContent from './page-content';
import { useState, useEffect } from 'react';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(*)')
          .limit(4);
        
        if (error) {
          console.error('Supabase Client Fetch Error:', error.message);
        } else {
          const formatted = (data || []).map(p => ({
            id: p.id,
            name: p.name,
            price: p.price,
            description: p.description,
            image: p.product_images && p.product_images.length > 0 ? p.product_images[0].image_url : null
          }));
          setProducts(formatted);
        }
      } catch (err) {
        console.error('Fetch caught error:', err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Featured Products */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">The Selection</span>
              <h2 className="text-5xl font-black tracking-[-1px] uppercase">New Arrivals</h2>
            </div>
            <Link 
              href="/category/all"
              className="text-[11px] font-bold uppercase tracking-widest border-b border-black pb-2 hover:opacity-50 transition-opacity"
            >
              View All Collections
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <PageContent />

      <Footer />
    </main>
  );
}
