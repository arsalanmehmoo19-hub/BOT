'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import Logo from '@/components/Logo';

export default function Navbar() {
  const [categories, setCategories] = useState<any[]>([]);
  const [menus, setMenus] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function fetchNavigation() {
      const [categoriesResponse, menusResponse] = await Promise.all([
        supabase.from('categories').select('id, name, slug').order('name'),
        supabase.from('menus').select('id, label, url, "order"').order('order', { ascending: true })
      ]);

      if (!categoriesResponse.error && categoriesResponse.data) {
        setCategories(categoriesResponse.data);
      }
      if (!menusResponse.error && menusResponse.data) {
        setMenus(menusResponse.data);
      }
    }

    fetchNavigation();
  }, []);

  const fallbackCategories = [
    { id: 'fallback-1', slug: 'men', name: 'Men' },
    { id: 'fallback-2', slug: 'women', name: 'Women' },
    { id: 'fallback-3', slug: 'skirts', name: 'Skirts' },
    { id: 'fallback-4', slug: 'girls', name: 'Girls' },
    { id: 'fallback-5', slug: 'boys', name: 'Boys' },
    { id: 'fallback-6', slug: 'bottoms', name: 'Bottoms' }
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;
  const displayMenus = menus.length > 0 ? menus : [
    { id: 'menu-1', label: 'Manifesto', url: '/about' },
    { id: 'menu-2', label: 'Archives', url: '/archives' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F9F9F7]/95 backdrop-blur-md border-b border-black/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex-none md:flex-1 flex justify-center md:justify-start items-center absolute md:relative left-1/2 md:left-auto -translate-x-1/2 md:-translate-x-0">
            <Link href="/" className="flex items-center group">
              <Logo className="scale-75 md:origin-left group-hover:opacity-80 transition-opacity" />
            </Link>
          </div>

          <div className="hidden md:flex flex-none items-center justify-center gap-10 text-[11px] font-bold uppercase tracking-widest text-black/60">
            <div className="relative h-20 flex items-center group cursor-pointer" onMouseEnter={() => setIsShopHovered(true)} onMouseLeave={() => setIsShopHovered(false)}>
              <span className={`hover:text-black transition-colors flex items-center gap-1 ${pathname?.includes('/category') ? 'text-black' : ''}`}>
                Shop <ChevronDown size={12} className={`transition-transform duration-300 ${isShopHovered ? 'rotate-180' : ''}`} />
              </span>

              <div className={`absolute top-20 left-1/2 -translate-x-1/2 bg-white border border-black/10 shadow-lg min-w-[240px] rounded-b-[16px] overflow-hidden transition-all duration-300 origin-top flex flex-col ${isShopHovered ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                <Link href="/category/all" className="px-6 py-4 hover:bg-gray-50 border-b border-black/5 text-black font-black uppercase tracking-widest text-[10px]">
                  All Collections
                </Link>
                {displayCategories.map((cat) => (
                  <Link key={cat.id} href={`/category/${cat.slug}`} className="px-6 py-3 hover:bg-gray-50 text-black/60 hover:text-black uppercase tracking-widest text-[10px] transition-colors">
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            {displayMenus.map((menu) => (
              <Link key={menu.id} href={menu.url} className={`hover:text-black transition-colors ${pathname === menu.url ? 'text-black' : ''}`}>
                {menu.label}
              </Link>
            ))}
          </div>

          <div className="flex-1 flex justify-end gap-6 text-black/60 items-center">
            <Link href="/search" className="hover:text-black transition-colors hidden sm:block">
              <Search size={20} strokeWidth={1.5} />
            </Link>
            <Link href="/account" className="hover:text-black transition-colors flex items-center justify-center">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <Link href="/cart" className="hover:text-black transition-colors flex items-center justify-center">
              <ShoppingBag size={20} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-white flex flex-col p-6 overflow-y-auto w-full md:hidden">
          <div className="flex flex-col space-y-6 text-xl font-black uppercase tracking-widest text-black">
            <span className="text-[10px] text-black/40 border-b pb-2">Collections</span>
            <Link href="/category/all" onClick={() => setIsMobileMenuOpen(false)}>All Items</Link>
            {displayCategories.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="text-black/70 hover:text-black">
                {cat.name}
              </Link>
            ))}
            <span className="text-[10px] text-black/40 border-b pb-2 mt-8">Explore</span>
            {displayMenus.map((menu) => (
              <Link key={menu.id} href={menu.url} onClick={() => setIsMobileMenuOpen(false)} className="text-black/70 hover:text-black">
                {menu.label}
              </Link>
            ))}
            <span className="text-[10px] text-black/40 border-b pb-2 mt-8">Account</span>
            <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
          </div>
        </div>
      )}
    </>
  );
}
