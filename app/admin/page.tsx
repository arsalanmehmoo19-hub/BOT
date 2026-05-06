'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import AdminAuth from './auth';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Check if user is in admins table
        const { data: adminData, error: adminError } = await supabase
          .from('admins')
          .select('*')
          .eq('email', user.email)
          .single();

        if (adminError || !adminData) {
          setIsAuthenticated(false);
          await supabase.auth.signOut();
        } else {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    router.refresh();
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth onAuthSuccess={() => {
      setIsAuthenticated(true);
      router.refresh();
    }} />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-black uppercase tracking-tight mt-1">Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <div className="flex gap-4 mb-8 flex-wrap">
        <button onClick={() => router.push('/admin/dashboard')} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all bg-gray-800 text-white">Dashboard</button>
        <button onClick={() => router.push('/admin/products')} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all bg-black text-white">Products</button>
        <button onClick={() => router.push('/admin/categories')} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all bg-black text-white">Categories</button>
        <button onClick={() => router.push('/admin/orders')} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all bg-black text-white">Orders</button>
        <button onClick={() => router.push('/admin/pages')} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all bg-blue-700 text-white">Pages</button>
        <button onClick={() => router.push('/admin/media')} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all bg-green-700 text-white">Media</button>
        <button onClick={() => router.push('/admin/users')} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all bg-purple-700 text-white">Users</button>
        <button onClick={() => router.push('/admin/settings')} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all bg-yellow-700 text-white">Settings</button>
        <button onClick={() => router.push('/admin/menus')} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all bg-pink-700 text-white">Menus</button>
      </div>
      <div className="text-gray-500">Select a section above to manage.</div>
    </div>
  );
}
