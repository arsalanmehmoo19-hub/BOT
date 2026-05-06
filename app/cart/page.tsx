'use client';

import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Trash2, Plus, Minus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <main className="min-h-screen pt-20">
      <Navbar />
      <div className="py-24 px-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16 border-b border-bento-line pb-12">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
              Your Selection
            </span>
            <h1 className="text-7xl font-black tracking-[-3px] uppercase leading-none">
              Bag ({totalItems})
            </h1>
          </div>
          {cart.length > 0 && (
            <Link
              href="/category/all"
              className="text-[10px] font-black uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity"
            >
              Continue Shopping
            </Link>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="py-40 text-center space-y-8">
            <p className="text-2xl font-bold uppercase tracking-tight">Your bag is empty</p>
            <Link
              href="/category/all"
              className="inline-block bg-black text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black/80 transition-colors"
            >
              Browse Collections
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-[32px] border border-bento-line"
              >
                <div className="w-full sm:w-32 h-32 relative rounded-[24px] overflow-hidden bg-gray-100 flex-shrink-0">
                  {item.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs font-bold uppercase tracking-widest text-black/20">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold uppercase tracking-tight">{item.name}</h3>
                    <p className="font-mono text-sm text-black/60">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-bento-line flex items-center justify-center hover:border-black transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-bold text-sm w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-bento-line flex items-center justify-center hover:border-black transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-right">
                    <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-8 bg-black text-white rounded-[32px] flex flex-col gap-4">
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-white/40">
                <span>Items Subtotal</span>
                <span className="text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-white/40">
                <span>Shipping Fee</span>
                <span className="text-white">FREE</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-4 text-[16px]">
                <span className="text-white font-black">Total</span>
                <span className="text-white font-black">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full mt-4 bg-gray-900 text-white p-6 rounded-full font-bold uppercase tracking-widest hover:opacity-80 transition-opacity text-center"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
