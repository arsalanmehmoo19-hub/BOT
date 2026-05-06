'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: any; // Allow dynamic structure from Supabase
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-white rounded-[24px] border border-bento-line">
        <Link href={`/product/${product.id}`} className="absolute inset-0 block bg-gray-100">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs font-bold uppercase tracking-widest text-black/20">
              No Image
            </div>
          )}
        </Link>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[11px] font-bold text-black border border-bento-line">
          ${product.price}
        </div>
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5 pointer-events-none" />
        
        {/* Quick Add */}
        <button 
          onClick={() => addToCart(product)}
          className="absolute bottom-4 right-4 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 shadow-lg hover:scale-110 active:scale-95"
        >
          <Plus size={18} />
        </button>
      </div>
      
      <Link href={`/product/${product.id}`}>
        <div className="mt-6 flex flex-col gap-1 px-2">
          <h3 className="text-sm font-bold uppercase tracking-tight text-bento-ink">
            {product.name}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}
