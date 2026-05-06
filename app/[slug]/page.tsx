'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageRenderer from '@/components/PageRenderer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CmsPage({ params }: PageProps) {
  const { slug } = use(params);
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchPage() {
      setLoading(true);
      const { data, error } = await supabase
        .from('pages')
        .select('*')
        .eq('slug', slug)
        .single();
      if (!error && data) {
        setPage(data);
      } else {
        setPage(null);
      }
      setLoading(false);
    }

    void fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen pt-20">
        <Navbar />
        <div className="py-32 text-center">Loading page...</div>
      </main>
    );
  }

  if (!page) {
    return (
      <main className="min-h-screen pt-20">
        <Navbar />
        <div className="py-32 text-center space-y-6">
          <h1 className="text-4xl font-black">Page Not Found</h1>
          <p className="text-black/60">
            This page does not exist or is not published yet.
          </p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 bg-black text-white uppercase text-xs tracking-widest px-6 py-3 rounded-full"
          >
            Go Home
          </button>
        </div>
        <Footer />
      </main>
    );
  }

  const content =
    typeof page.content === 'string'
      ? JSON.parse(page.content)
      : page.content;

  return (
    <main className="min-h-screen pt-20">
      <Navbar />

      <section className="py-24 px-6 bg-[#F7F5F1]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] text-black/40">
              {page.status === 'published' ? 'Published Page' : 'Draft'}
            </span>
            <h1 className="text-5xl font-black uppercase tracking-tight">
              {page.title}
            </h1>
            <p className="text-black/60 max-w-3xl">
              {page.slug.replace('-', ' ')}
            </p>
          </div>
          <PageRenderer content={content} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
