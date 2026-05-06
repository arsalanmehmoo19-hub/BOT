'use client';

import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { supabase } from '@/lib/supabaseClient';
import PageRenderer from '@/components/PageRenderer';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [homePage, setHomePage] = useState<any>(null);

  useEffect(() => {
    async function fetchHomeData() {
      const [settingsResponse, productsResponse, pageResponse] = await Promise.all([
        supabase.from('settings').select('*').single(),
        supabase.from('products').select('*, product_images(*)').limit(6),
        supabase.from('pages').select('*').eq('slug', 'home').single()
      ]);

      if (!settingsResponse.error && settingsResponse.data) {
        setSettings(settingsResponse.data);
      }
      if (!productsResponse.error && productsResponse.data) {
        setProducts((productsResponse.data || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          description: p.description,
          image: p.product_images && p.product_images.length > 0 ? p.product_images[0].image_url : null
        })));
      }
      if (!pageResponse.error && pageResponse.data) {
        setHomePage(pageResponse.data);
      }
    }

    fetchHomeData();
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-24 px-6 bg-[#F8F7F3]">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">{settings.site_title || 'I.A Clothing'}</span>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-[-2px] leading-tight">
              {settings.hero_title || 'Modern essentials designed to last.'}
            </h1>
            <p className="max-w-2xl text-gray-600 text-lg leading-relaxed">
              {settings.hero_description || 'A new system for everyday dressing with thoughtful detail, precise tailoring, and purpose-built materials.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href={settings.hero_cta_url || '/category/all'} className="bg-black text-white uppercase text-xs tracking-widest px-6 py-4 rounded-full hover:bg-gray-900 transition-all">
                {settings.hero_cta_text || 'Browse Collections'}
              </Link>
              <Link href="/about" className="border border-black uppercase text-xs tracking-widest px-6 py-4 rounded-full hover:bg-black hover:text-white transition-all">
                Learn More
              </Link>
            </div>
          </div>

          <div className="rounded-[40px] overflow-hidden bg-gray-100 aspect-[4/3] flex items-center justify-center border border-bento-line">
            <span className="text-xs font-bold uppercase tracking-widest text-black/20">No Image</span>
          </div>
        </div>
      </section>

      {homePage && homePage.content ? (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <PageRenderer content={JSON.parse(homePage.content)} />
          </div>
        </section>
      ) : (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white p-10 rounded-[32px] border border-bento-line shadow-sm">
              <h2 className="text-3xl font-black uppercase mb-4">Story</h2>
              <p className="text-black/60 leading-relaxed">{settings.site_description || 'A polished editorial storefront connected to a full admin CMS.'}</p>
            </div>
            <div className="bg-white p-10 rounded-[32px] border border-bento-line shadow-sm">
              <h2 className="text-3xl font-black uppercase mb-4">Launch</h2>
              <p className="text-black/60 leading-relaxed">Control content, menus, pages, and brand messaging from the admin panel.</p>
            </div>
            <div className="bg-white p-10 rounded-[32px] border border-bento-line shadow-sm">
              <h2 className="text-3xl font-black uppercase mb-4">Commerce</h2>
              <p className="text-black/60 leading-relaxed">Simple product management with category filters and fast buying flows.</p>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/40">Featured</span>
              <h2 className="text-4xl font-black uppercase tracking-tight">Handpicked for now</h2>
            </div>
            <Link href="/category/all" className="text-[11px] font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">Shop All</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
