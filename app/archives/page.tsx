'use client';

import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { PRODUCTS } from '@/lib/data';
import { motion } from 'motion/react';
import Image from 'next/image';

export default function ArchivesPage() {
  // Use a subset of products as "archives"
  const archivedProducts = PRODUCTS.slice(4, 10);

  return (
    <main className="min-h-screen pt-20">
      <Navbar />

      <section className="py-24 px-6 border-b border-bento-line bg-[#1A1A1A] text-white">
        <div className="max-w-7xl mx-auto space-y-8">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Past Collections</span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-black tracking-[-5px] uppercase leading-none"
          >
            The <br /> Archives
          </motion.h1>
          <p className="text-[14px] text-white/40 font-bold uppercase tracking-widest leading-relaxed max-w-xl">
             Explore landmark pieces from our previous seasons. These artifacts represent the evolution of our design language.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex justify-between items-center border-b border-bento-line pb-8">
             <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Showing 6 artifacts</span>
             <div className="flex gap-4">
                {['2024', '2025', '2026'].map(year => (
                  <button key={year} className="text-xs font-black uppercase tracking-wider px-6 py-2 rounded-full border border-bento-line hover:border-black transition-colors">
                    {year}
                  </button>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {archivedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="py-24 flex flex-col items-center text-center space-y-8">
             <div className="w-px h-24 bg-bento-line"></div>
             <p className="text-[12px] font-black uppercase tracking-widest text-black/30 max-w-sm">
                Archival pieces are released in limited quantities. Join the waitlist for original silhouettes.
             </p>
             <button className="bg-black text-white rounded-full px-12 py-5 font-black uppercase tracking-widest text-[10px] hover:bg-black/80 transition-colors">
                Join Archive Waitlist
             </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
