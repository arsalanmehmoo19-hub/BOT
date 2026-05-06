'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { supabase } from '@/lib/supabaseClient';

export default function Footer() {
  const [menus, setMenus] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});

  useEffect(() => {
    async function fetchFooterData() {
      const [menusResponse, settingsResponse] = await Promise.all([
        supabase.from('menus').select('id, label, url, "order"').order('order', { ascending: true }),
        supabase.from('settings').select('*').single()
      ]);

      if (!menusResponse.error && menusResponse.data) {
        setMenus(menusResponse.data);
      }
      if (!settingsResponse.error && settingsResponse.data) {
        setSettings(settingsResponse.data);
      }
    }
    fetchFooterData();
  }, []);

  const displayMenus = menus.length > 0 ? menus : [
    { id: 'menu-1', label: 'About', url: '/about' },
    { id: 'menu-2', label: 'Archives', url: '/archives' },
    { id: 'menu-3', label: 'Contact', url: '/contact' }
  ];

  return (
    <footer className="py-24 px-6 border-t border-bento-line">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6">
          <Logo className="-ml-6 origin-left" />
          <p className="text-[11px] text-black/40 uppercase tracking-widest font-bold max-w-xs leading-loose">
            {settings.site_description || 'A modern editorial fashion showroom crafted for timeless everyday confidence.'}
            <br />
            © {new Date().getFullYear()} {settings.site_title || 'I.A Clothing'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-16 w-full">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20">Explore</h3>
            <ul className="space-y-2 text-[12px] font-bold uppercase tracking-wider">
              {displayMenus.slice(0, 4).map((menu) => (
                <li key={menu.id}>
                  <Link href={menu.url} className="hover:opacity-40 transition-opacity">
                    {menu.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20">Quick Links</h3>
            <ul className="space-y-2 text-[12px] font-bold uppercase tracking-wider">
              <li><Link href="/category/all" className="hover:opacity-40 transition-opacity">All Collections</Link></li>
              <li><Link href="/account" className="hover:opacity-40 transition-opacity">Account</Link></li>
              <li><Link href="/checkout" className="hover:opacity-40 transition-opacity">Checkout</Link></li>
            </ul>
          </div>

          <div className="space-y-4 col-span-2 md:col-span-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20">Stay Connected</h3>
            <p className="text-[11px] uppercase tracking-[0.4em] text-black/40 font-bold">{settings.footer_note || 'Sign up for new arrivals, curated stories, and updates.'}</p>
            <div className="flex flex-wrap gap-4">
              <Link href="#" className="text-[11px] font-bold uppercase tracking-widest hover:opacity-40 transition-opacity">IG</Link>
              <Link href="#" className="text-[11px] font-bold uppercase tracking-widest hover:opacity-40 transition-opacity">TW</Link>
              <Link href="#" className="text-[11px] font-bold uppercase tracking-widest hover:opacity-40 transition-opacity">PN</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
