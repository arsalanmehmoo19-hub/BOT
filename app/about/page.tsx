'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-20">
      <Navbar />

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Hero Branding */}
          <div className="text-center space-y-8">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30"
            >
              The I.A Clothing Manifesto
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-[12vw] font-black tracking-[-5px] uppercase leading-[0.8] mb-12"
            >
              Silence <br /> & Form
            </motion.h1>
          </div>

          {/* Bento Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-2 md:row-span-2 aspect-square relative rounded-[40px] overflow-hidden border border-bento-line shadow-2xl bg-gray-100 flex items-center justify-center"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">No Image</span>
            </motion.div>

            <div className="md:col-span-2 bg-[#1A1A1A] text-white p-12 rounded-[40px] flex flex-col justify-center space-y-8">
              <Quote size={40} className="text-white/20" />
              <h2 className="text-4xl font-black uppercase tracking-tight leading-tight">
                Quality is a silent choice. It exists beyond the realm of trend and noise.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                We believe that the garments we inhabit are an extension of our internal architecture. I.A Clothing was founded to provide the tools for this expression—pieces that prioritize integrity of form over the volatility of fashion.
              </p>
            </div>

            <div className="bg-white border border-bento-line p-10 rounded-[40px] flex flex-col justify-end space-y-4">
               <h3 className="text-xl font-black uppercase">Ethically Sourced</h3>
               <p className="text-xs text-black/40 font-bold uppercase tracking-widest leading-loose">
                  Every fiber is tracked from origin to atelier. We partner with family-owned mills in Italy and Japan.
               </p>
            </div>

            <div className="bg-bento-accent text-white p-10 rounded-[40px] flex flex-col justify-end space-y-4">
               <h3 className="text-xl font-black uppercase">Designed to Endure</h3>
               <p className="text-xs text-white/60 font-bold uppercase tracking-widest leading-loose">
                  Construction that defies the seasons. Pieces built for a lifetime, not a season.
               </p>
            </div>
          </div>

          {/* Narrative Large Section */}
          <div className="py-24 border-y border-bento-line grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-8">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">Our History</span>
               <h2 className="text-5xl font-black tracking-[-2px] uppercase">The Pursuit of the <br /> Perfect Essential</h2>
               <p className="text-gray-500 leading-relaxed text-lg">
                  Founded in 2026, I.A Clothing emerged as a reaction to the disposable nature of modern retail. We set out to strip away the unnecessary, focusing entirely on materials that speak for themselves. The result is a system of dressing that is both radically simple and deeply sophisticated.
               </p>
               <Link href="/category/all" className="inline-block border-b-2 border-black pb-2 text-xs font-black uppercase tracking-widest hover:opacity-50 transition-opacity">
                  Explore Collections
               </Link>
            </div>
            <div className="aspect-[4/3] relative rounded-[40px] overflow-hidden border border-bento-line bg-gray-100 flex items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">No Image</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
