'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { User, Package, Heart, Settings, LogOut, CreditCard, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthForm from '@/components/AuthForm';

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          setLoading(false);
          return;
        }
        
        setUser({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || 'Member',
        });
      } catch (err) {
        console.error('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen pt-20">
        <Navbar />
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-black uppercase mb-12 text-center">Account</h1>
            <AuthForm />
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
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Member Area</span>
              <h1 className="text-7xl font-black tracking-[-3px] uppercase leading-none">Account</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Profile Overview Card */}
            <div className="md:col-span-2 bg-white rounded-[32px] border border-bento-line p-12 flex items-center gap-8">
              <div className="w-24 h-24 rounded-full bg-black/5 border border-bento-line flex items-center justify-center">
                <User size={40} className="text-black/20" />
              </div>
              <div className="space-y-1">
                <h2 className="text-3xl font-black uppercase tracking-tight">{user.full_name || 'Member'}</h2>
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">Active Member</p>
                <p className="text-xs font-bold text-black/60">{user.email}</p>
              </div>
            </div>

            {/* Quick Links Bento Cards */}
            <div className="bg-white rounded-[32px] border border-bento-line p-8 flex flex-col justify-between hover:border-black transition-colors group cursor-pointer">
              <Package size={24} className="text-black/20 group-hover:text-black transition-colors" />
              <div className="space-y-1 mt-6">
                <h3 className="text-lg font-black uppercase leading-none">Orders</h3>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black/40">View history</p>
              </div>
            </div>

            <div className="bg-white rounded-[32px] border border-bento-line p-8 flex flex-col justify-between hover:border-black transition-colors group cursor-pointer">
              <Heart size={24} className="text-black/20 group-hover:text-black transition-colors" />
              <div className="space-y-1 mt-6">
                <h3 className="text-lg font-black uppercase leading-none">Wishlist</h3>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black/40">Saved items</p>
              </div>
            </div>

            {/* Support/Settings Grid */}
            <div className="md:col-span-2 grid grid-cols-2 gap-6">
              <div className="bg-[#E9E9E4] rounded-[32px] border border-bento-line p-8 flex flex-col justify-between">
                <CreditCard size={20} className="text-black/30" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Payment <br /> Details</span>
              </div>
              <div className="bg-[#D8E2DC] rounded-[32px] border border-bento-line p-8 flex flex-col justify-between">
                <MapPin size={20} className="text-black/30" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-tight">Shipping <br /> Addresses</span>
              </div>
            </div>

            <div className="bg-white border-2 border-dashed border-bento-line rounded-[32px] p-8 flex flex-col justify-center items-center gap-4 hover:border-black/20 transition-colors">
              <Settings size={24} className="text-black/10" />
              <span className="text-[10px] font-black uppercase tracking-widest text-black/20">Preferences</span>
            </div>

            <div
              onClick={handleLogout}
              className="bg-black text-white rounded-[40px] p-8 flex flex-col justify-center items-center gap-4 hover:bg-black/90 transition-all cursor-pointer"
            >
              <LogOut size={24} />
              <h3 className="text-xs font-black uppercase tracking-[0.2em]">Log Out</h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
