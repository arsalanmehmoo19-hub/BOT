'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PageContent() {
  return (
    <section className="pb-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 bg-white rounded-[32px] border border-bento-line p-16 flex flex-col justify-center space-y-8"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">The Manifesto</span>
          <h2 className="text-5xl md:text-7xl font-black leading-none tracking-[-2px] uppercase">
            Form <br /> & Function
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed max-w-xl">
            I.A Clothing is an exploration of the silent language of quality. Each piece is constructed with intention, sourced with integrity, and designed to endure.
          </p>
          <Link 
            href="/about"
            className="w-16 h-16 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all group"
          >
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="aspect-square relative rounded-[32px] overflow-hidden border border-bento-line bg-gray-100 flex items-center justify-center">
            <div className="text-xs font-bold uppercase tracking-widest text-black/20">
            No Image
          </div>
        </div>
      </div>
    </section>
  );
}
