'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-6 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px]">
        {/* Main Hero Card */}
        <div className="md:col-span-2 md:row-span-2 relative bg-gray-100 rounded-[24px] border border-bento-line overflow-hidden group">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">No Image</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute inset-0 p-10 flex flex-col justify-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60 mb-4 block">
                Summer 2026
              </span>
              <h1 className="text-6xl font-black tracking-[-2px] uppercase text-white mb-6 leading-none">
                Modern <br /> Essentials
              </h1>
              <Link 
                href="/category/all" 
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white border border-white/30 rounded-full px-6 py-3 hover:bg-white hover:text-black transition-all"
              >
                Shop Now <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Side Card 1 */}
        <div className="md:col-span-2 bg-[#E9E9E4] rounded-[24px] border border-bento-line p-10 flex flex-col justify-between relative overflow-hidden group">
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2 block">New Arrival</span>
            <h2 className="text-3xl font-extrabold tracking-tight uppercase leading-none">Men&apos;s <br /> Tailoring</h2>
          </div>
          <div className="relative z-10">
            <Link href="/category/men" className="w-12 h-12 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] w-64 h-64 opacity-20 group-hover:opacity-40 transition-opacity bg-black/5 rounded-full flex items-center justify-center">
             <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">Img</span>
          </div>
        </div>

        {/* Side Card 2 */}
        <div className="bg-[#FDF0D5] rounded-[24px] border border-bento-line p-8 flex flex-col justify-between overflow-hidden relative group">
           <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2 block">Youth</span>
            <h2 className="text-xl font-bold tracking-tight uppercase leading-none">Kids & Baby</h2>
          </div>
          <Link href="/category/children" className="text-black/60 hover:text-black transition-colors relative z-10">
            <ArrowRight size={24} />
          </Link>
          <div className="absolute right-0 bottom-0 w-32 h-32 opacity-30 group-hover:opacity-50 transition-opacity bg-black/5 rounded-full flex items-center justify-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/40">Img</span>
          </div>
        </div>

        {/* Side Card 3 - Sale */}
        <div className="bg-bento-accent rounded-[24px] border border-bento-line p-8 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-5xl font-black leading-none mb-2">-40%</h2>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 block">Seasonal Clearance</span>
          </div>
          <Link href="/category/all" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest border-b border-white/40 pb-1 w-fit">
            View Sale
          </Link>
        </div>
      </div>
    </section>
  );
}
