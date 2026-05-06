import Link from 'next/link';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="py-24 px-6 border-t border-bento-line">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6">
          <Logo className="-ml-6 origin-left" />
          <p className="text-[11px] text-black/40 uppercase tracking-widest font-bold max-w-xs leading-loose">
            © 2026 I.A Clothing Global. <br />
            Created by TZKUSMAN <br />
            New York / Paris / Tokyo
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20">Shop</h3>
            <ul className="space-y-2 text-[12px] font-bold uppercase tracking-wider">
              <li><Link href="/category/women" className="hover:opacity-40 transition-opacity">Women</Link></li>
              <li><Link href="/category/men" className="hover:opacity-40 transition-opacity">Men</Link></li>
              <li><Link href="/category/children" className="hover:opacity-40 transition-opacity">Children</Link></li>
              <li><Link href="/category/all" className="hover:opacity-40 transition-opacity">Archives</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20">System</h3>
            <ul className="space-y-2 text-[12px] font-bold uppercase tracking-wider">
              <li><Link href="/about" className="hover:opacity-40 transition-opacity">Manifesto</Link></li>
              <li><Link href="/archives" className="hover:opacity-40 transition-opacity">Archives</Link></li>
              <li><Link href="/account" className="hover:opacity-40 transition-opacity">Account</Link></li>
              <li><Link href="/checkout" className="hover:opacity-40 transition-opacity">Checkout</Link></li>
            </ul>
          </div>

          <div className="space-y-4 col-span-2 md:col-span-1">
             <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-black/20">Connect</h3>
             <div className="flex gap-4">
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
