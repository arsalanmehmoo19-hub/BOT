'use client';

import Navbar from '@/components/Navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const handleLogout = async () => {
    const { supabase } = await import('@/lib/supabaseClient');
    await supabase.auth.signOut();
    window.location.href = '/admin';
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      <div className="p-8 pt-32 max-w-7xl mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors text-xs font-bold uppercase tracking-widest"
          >
            Logout
          </button>
        </div>
        {children}
      </div>
    </main>
  );
}
