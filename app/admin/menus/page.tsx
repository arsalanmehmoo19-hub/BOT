"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminMenus() {
  const [menus, setMenus] = useState<any[]>([]);
  const [label, setLabel] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => { fetchMenus(); }, []);

  async function fetchMenus() {
    const { data } = await supabase.from('menus').select('*').order('order', { ascending: true });
    setMenus(data || []);
  }

  async function handleAddMenu() {
    if (!label || !url) return;
    await supabase.from('menus').insert([{ label, url, order: menus.length + 1 }]);
    setLabel(""); setUrl("");
    fetchMenus();
  }

  async function handleDeleteMenu(id: string) {
    await supabase.from('menus').delete().eq('id', id);
    fetchMenus();
  }

  async function moveMenu(id: number, direction: 'up' | 'down') {
    const current = menus.find(m => m.id === id);
    if (!current) return;
    const targetOrder = direction === 'up' ? current.order - 1 : current.order + 1;
    const target = menus.find(m => m.order === targetOrder);
    if (!target) return;

    await Promise.all([
      supabase.from('menus').update({ order: current.order }).eq('id', target.id),
      supabase.from('menus').update({ order: target.order }).eq('id', current.id)
    ]);
    fetchMenus();
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Menus</h2>
      <div className="bg-white p-6 rounded shadow grid gap-4 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input placeholder="Label" value={label} onChange={e => setLabel(e.target.value)} className="border p-3 rounded" />
          <input placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} className="border p-3 rounded" />
          <button onClick={handleAddMenu} className="bg-black text-white px-4 py-3 rounded">Add Menu</button>
        </div>
        <p className="text-xs text-gray-500">Order matters: lower numbers appear first in navigation.</p>
      </div>

      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-black/10">
              <th className="p-3 uppercase tracking-widest text-xs text-black/40">Order</th>
              <th className="p-3 uppercase tracking-widest text-xs text-black/40">Label</th>
              <th className="p-3 uppercase tracking-widest text-xs text-black/40">URL</th>
              <th className="p-3 uppercase tracking-widest text-xs text-black/40">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((m) => (
              <tr key={m.id} className="border-b border-black/10">
                <td className="p-3 font-bold">{m.order}</td>
                <td className="p-3">{m.label}</td>
                <td className="p-3 truncate max-w-[240px]">{m.url}</td>
                <td className="p-3 flex gap-2 flex-wrap">
                  <button onClick={() => moveMenu(m.id, 'up')} className="px-3 py-2 rounded bg-gray-100 text-black text-xs">Up</button>
                  <button onClick={() => moveMenu(m.id, 'down')} className="px-3 py-2 rounded bg-gray-100 text-black text-xs">Down</button>
                  <button onClick={() => handleDeleteMenu(m.id)} className="px-3 py-2 rounded bg-red-50 text-red-600 text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
