'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, CreditCard, Truck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
  });

  const handleCheckout = async () => {
    if (!shippingInfo.firstName || !shippingInfo.lastName || !shippingInfo.address) {
      setError('Please fill in all shipping details.');
      return;
    }

    if (cart.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            customer_reference: user?.email || 'guest',
            total_amount: totalPrice,
            status: 'pending',
            shipping_address: `${shippingInfo.firstName} ${shippingInfo.lastName}, ${shippingInfo.address}`,
            payment_method: 'Credit Card',
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart and show success
      clearCart();
      setOrderPlaced(true);
    } catch (err: any) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <main className="min-h-screen pt-20">
        <Navbar />
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle2 size={48} className="text-green-600" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-[-3px] uppercase leading-none">
              Order Placed!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for your purchase. Your order is being processed.
            </p>
            <Link
              href="/category/all"
              className="inline-block bg-black text-white rounded-full px-12 py-6 font-black uppercase tracking-[0.2em] text-xs hover:bg-black/80 transition-all"
            >
              Continue Shopping
            </Link>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-20">
      <Navbar />

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-16 border-b border-bento-line pb-12">
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">
                Secure Transaction
              </span>
              <h1 className="text-7xl font-black tracking-[-3px] uppercase leading-none">
                Checkout
              </h1>
            </div>
            <Link
              href="/cart"
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Bag
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Info Card */}
              <div className="bg-white rounded-[32px] border border-bento-line p-10 space-y-8">
                <div className="flex items-center gap-4">
                  <Truck size={24} className="text-black/20" />
                  <h2 className="text-2xl font-black uppercase tracking-tight">
                    Shipping Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/30">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.firstName}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, firstName: e.target.value })
                      }
                      className="w-full bg-[#F4F4F2] border border-bento-line rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/30">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.lastName}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                      }
                      className="w-full bg-[#F4F4F2] border border-bento-line rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-black/30">
                      Shipping Address
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({ ...shippingInfo, address: e.target.value })
                      }
                      className="w-full bg-[#F4F4F2] border border-bento-line rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="123 Arcane St, Design District"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Info Card */}
              <div className="bg-white rounded-[32px] border border-bento-line p-10 space-y-8">
                <div className="flex items-center gap-4">
                  <CreditCard size={24} className="text-black/20" />
                  <h2 className="text-2xl font-black uppercase tracking-tight">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-grow p-6 rounded-2xl border-2 border-black bg-black/5 flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-widest">
                        Credit Card
                      </span>
                      <CheckCircle2 size={16} className="text-black" />
                    </div>
                    <div className="flex-grow p-6 rounded-2xl border-2 border-bento-line hover:border-black/20 transition-colors flex items-center justify-center">
                      <span className="text-[11px] font-black uppercase tracking-widest text-black/20">
                        PayPal
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <input
                      type="text"
                      className="w-full bg-[#F4F4F2] border border-bento-line rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                      placeholder="Card Number"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        className="w-full bg-[#F4F4F2] border border-bento-line rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                        placeholder="MM/YY"
                      />
                      <input
                        type="text"
                        className="w-full bg-[#F4F4F2] border border-bento-line rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-black transition-colors"
                        placeholder="CVC"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Summary Card */}
            <div className="bg-black text-white rounded-[32px] p-10 flex flex-col justify-between h-fit lg:sticky lg:top-32">
              <div className="space-y-12">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 block mb-4">
                    Summary
                  </span>
                  <h2 className="text-4xl font-black uppercase tracking-[-1px] leading-tight">
                    Proceed <br /> Purchase
                  </h2>
                </div>

                <div className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-white/40">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span className="text-white">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee</span>
                    <span className="text-white">FREE</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-4 text-[16px]">
                    <span className="text-white font-black">Final Price</span>
                    <span className="text-white font-black">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading || cart.length === 0}
                className="w-full bg-white text-black rounded-full py-6 mt-12 font-black uppercase tracking-[0.2em] text-xs hover:bg-white/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Pay Now'
                )}
              </button>

              {error && (
                <p className="text-red-400 text-[10px] text-center mt-4">{error}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
