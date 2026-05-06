'use client';

import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '@/lib/supabaseClient';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const { data, error } = await supabase.from('products').select('*, categories(*), product_images(*)');
      if (!error && data) {
         setProducts(data.map(p => ({
           id: p.id,
           name: p.name,
           price: p.price,
           description: p.description,
           category: p.categories?.name || 'Uncategorized',
           image: p.product_images?.length > 0 ? p.product_images[0].image_url : null
         })));
      }
      setLoading(false);
    }
    fetchAll();
  }, []);
  
  const filteredProducts = useMemo(() => {
     if (!query) return [];
     return products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
     );
  }, [query, products]);

  return (
    <main className="min-h-screen pt-20">
      <Navbar />

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Search Input Area */}
          <div className="relative mb-24">
            <SearchIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-black/20" size={48} />
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH COLLECTIONS..."
              className="w-full bg-transparent border-b-4 border-black/5 pb-10 pl-20 text-6xl md:text-8xl font-black uppercase tracking-[-5px] outline-none focus:border-black transition-colors placeholder:text-black/5"
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 hover:text-black transition-colors"
              >
                <X size={32} />
              </button>
            )}
          </div>

          {/* Results Area */}
          <div className="space-y-12">
            <div className="flex justify-between items-center border-b border-bento-line pb-8">
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
                 {query ? `Found ${filteredProducts.length} Results` : 'Type to search the system'}
               </span>
            </div>

            {query ? (
              filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-24 text-center space-y-6">
                   <h3 className="text-2xl font-black text-black/20 uppercase">No artifacts matching your query</h3>
                   <button 
                    onClick={() => setQuery('')}
                    className="text-xs font-black uppercase tracking-widest border-b border-black pb-1"
                   >
                     View All Suggestions
                   </button>
                </div>
              )
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Search Suggestions Bento Cards */}
                <div 
                  onClick={() => setQuery('minimal')}
                  className="bg-white rounded-[32px] border border-bento-line p-10 cursor-pointer hover:border-black transition-colors flex flex-col justify-between aspect-video"
                >
                  <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Trending</span>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Minimalism</h3>
                </div>
                <div 
                  onClick={() => setQuery('outerwear')}
                  className="bg-[#E9E9E4] rounded-[32px] border border-bento-line p-10 cursor-pointer hover:border-black transition-colors flex flex-col justify-between aspect-video"
                >
                  <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Current</span>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Outerwear</h3>
                </div>
                <div 
                  onClick={() => setQuery('luxury')}
                  className="bg-[#FDF0D5] rounded-[32px] border border-bento-line p-10 cursor-pointer hover:border-black transition-colors flex flex-col justify-between aspect-video"
                >
                  <span className="text-[9px] font-black uppercase tracking-widest text-black/40">Editorial</span>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">Luxury</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
