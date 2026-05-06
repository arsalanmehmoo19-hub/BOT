'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const remove = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black uppercase mb-12">Your Cart</h1>
        {cart.length === 0 ? <p className="text-gray-500 uppercase tracking-widest text-xs font-bold">Your cart is empty.</p> : (
          <div className="space-y-6">
            {cart.map((item, i) => (
              <div key={i} className="flex justify-between items-center p-6 bg-gray-50 rounded-[24px] border border-bento-line">
                <div>
                  <h3 className="font-bold uppercase tracking-tight">{item.name}</h3>
                  <p className="font-mono text-sm">${item.price}</p>
                </div>
                <button onClick={() => remove(i)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            <div className="p-8 bg-black text-white rounded-[32px] flex justify-between items-center">
              <span className="font-bold uppercase tracking-widest">Total</span>
              <span className="font-mono text-xl">${total.toFixed(2)}</span>
            </div>
            <button className="w-full mt-4 bg-gray-900 text-white p-6 rounded-full font-bold uppercase tracking-widest hover:opacity-80 transition-opacity">
               Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
