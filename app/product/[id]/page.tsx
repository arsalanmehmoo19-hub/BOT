'use client';

import { use, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ArrowLeft, ShoppingBag, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(*), product_images(*)')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        setProduct({
          id: data.id,
          name: data.name,
          price: data.price,
          description: data.description,
          category: data.categories?.name || 'Uncategorized',
          image: data.product_images?.length > 0 ? data.product_images[0].image_url : null,
          images: data.product_images?.map((img: any) => img.image_url) || []
        });
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">Loading...</main>
    )
  }

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black mb-6">PRODUCT NOT FOUND</h1>
        <Link href="/category/all" className="uppercase text-xs font-bold tracking-widest border-b border-black pb-1">
          Back to Collection
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20">
      <Navbar />

      <section className="py-12 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="flex space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/30 mb-12">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <Link href={`/category/${product.category}`} className="hover:text-black uppercase">{product.category}</Link>
            <span>/</span>
            <span className="text-black uppercase">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Image Gallery - Bento Layout */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="col-span-2 aspect-[3/4] relative rounded-[32px] overflow-hidden border border-bento-line bg-gray-100 flex items-center justify-center"
              >
                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                    priority
                  />
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">No Image</span>
                )}
              </motion.div>
              <div className="aspect-square relative rounded-[24px] overflow-hidden border border-bento-line bg-gray-100 flex items-center justify-center">
                {product.images[1] ? (
                  <Image 
                    src={product.images[1]} 
                    alt="Detail 1"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">No Image</span>
                )}
              </div>
              <div className="aspect-square relative rounded-[24px] overflow-hidden border border-bento-line bg-gray-100 flex items-center justify-center">
                {product.images[2] ? (
                  <Image 
                    src={product.images[2]} 
                    alt="Detail 2"
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/20">No Image</span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-12 lg:sticky lg:top-32">
              <div className="space-y-4">
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-black/40">
                  {product.category}
                </span>
                <h1 className="text-5xl md:text-6xl font-black tracking-[-2px] uppercase leading-none">
                  {product.name}
                </h1>
                <p className="text-2xl font-bold text-black/80">
                  ${product.price}
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-gray-500 leading-relaxed max-w-lg">
                  {product.description}
                </p>
                <div className="flex flex-col space-y-4 pt-6">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-black/30">Select Size</h4>
                   <div className="flex gap-3">
                      {['S', 'M', 'L', 'XL'].map(size => (
                        <button key={size} className="w-12 h-12 rounded-full border border-bento-line flex items-center justify-center text-xs font-bold hover:border-black transition-colors focus:bg-black focus:text-white">
                          {size}
                        </button>
                      ))}
                   </div>
                </div>
              </div>

              <button 
                onClick={() => addToCart(product)}
                className="w-full bg-black text-white rounded-full py-6 flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-xs hover:bg-black/80 transition-all group"
              >
                <span>Add to bag</span>
                <ShoppingBag size={16} className="group-hover:scale-110 transition-transform" />
              </button>

              {/* Service features - Bento Card Style */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-6 bg-white rounded-[24px] border border-bento-line flex flex-col items-center text-center gap-3">
                  <Truck size={20} className="text-black/40" />
                  <span className="text-[9px] font-black uppercase tracking-widest leading-tight">Free Express <br /> Shipping</span>
                </div>
                <div className="p-6 bg-white rounded-[24px] border border-bento-line flex flex-col items-center text-center gap-3">
                  <RotateCcw size={20} className="text-black/40" />
                  <span className="text-[9px] font-black uppercase tracking-widest leading-tight">30 Day <br /> Free Returns</span>
                </div>
                <div className="p-6 bg-white rounded-[24px] border border-bento-line flex flex-col items-center text-center gap-3">
                  <ShieldCheck size={20} className="text-black/40" />
                  <span className="text-[9px] font-black uppercase tracking-widest leading-tight">Secure <br /> Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
