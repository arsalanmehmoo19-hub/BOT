"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import dynamic from "next/dynamic";

const PageEditor = dynamic(() => import("./editor"), { ssr: false });

export default function AdminPages() {
  const [pages, setPages] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("draft");
  const [content, setContent] = useState<any[]>([]);

  useEffect(() => { fetchPages(); }, []);

  async function fetchPages() {
    const { data } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
    setPages(data || []);
  }

  async function handleAddPage() {
    if (!title || !slug) return;
    await supabase.from('pages').insert([{ title, slug, status, content: JSON.stringify(content) }]);
    setTitle(""); setSlug(""); setStatus("draft"); setContent([]);
    fetchPages();
  }

  async function handleDeletePage(id: string) {
    await supabase.from('pages').delete().eq('id', id);
    fetchPages();
  }

  async function toggleStatus(page: any) {
    const nextStatus = page.status === 'published' ? 'draft' : 'published';
    await supabase.from('pages').update({ status: nextStatus }).eq('id', page.id);
    fetchPages();
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Pages</h2>
      <div className="bg-white p-6 rounded shadow grid gap-4 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-3 rounded" />
          <input placeholder="Slug" value={slug} onChange={e => setSlug(e.target.value)} className="border p-3 rounded" />
          <select value={status} onChange={e => setStatus(e.target.value)} className="border p-3 rounded bg-white">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <div>
          <div className="text-sm font-semibold mb-3">Page Content</div>
          <PageEditor value={content} onChange={setContent} />
        </div>
        <button onClick={handleAddPage} className="bg-black text-white px-5 py-3 rounded w-fit">Add Page</button>
      </div>

      <div className="bg-white p-4 rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f8f8f8] border-b border-black/10">
            <tr>
              <th className="p-4 text-xs uppercase tracking-widest text-black/40">Title</th>
              <th className="p-4 text-xs uppercase tracking-widest text-black/40">Slug</th>
              <th className="p-4 text-xs uppercase tracking-widest text-black/40">Status</th>
              <th className="p-4 text-xs uppercase tracking-widest text-black/40">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10">
            {pages.map(p => (
              <tr key={p.id}>
                <td className="p-4 font-semibold">{p.title}</td>
                <td className="p-4 text-xs uppercase tracking-[0.15em] text-black/60">{p.slug}</td>
                <td className="p-4">{p.status}</td>
                <td className="p-4 flex flex-wrap gap-2">
                  <button onClick={() => toggleStatus(p)} className="px-3 py-2 rounded bg-gray-100 text-xs uppercase tracking-widest">{p.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                  <a href={`/${p.slug}`} target="_blank" rel="noreferrer" className="px-3 py-2 rounded bg-black text-white text-xs uppercase tracking-widest">Preview</a>
                  <button onClick={() => handleDeletePage(p.id)} className="px-3 py-2 rounded bg-red-50 text-red-500 text-xs uppercase tracking-widest">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
