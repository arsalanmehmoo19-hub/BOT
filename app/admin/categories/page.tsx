"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Trash2, Plus } from "lucide-react";

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  useEffect(() => { fetchCategories(); }, []);

  async function fetchCategories() {
    const { data } = await supabase.from('categories').select('*').order('name', { ascending: true });
    setCategories(data || []);
  }

  async function handleAddCategory() {
    if (!newCategoryName) return;
    const slug = newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await supabase.from('categories').insert([{ name: newCategoryName, slug }]);
    setNewCategoryName("");
    fetchCategories();
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm('Deleting category deletes its products. Proceed?')) return;
    await supabase.from('categories').delete().eq('id', id);
    fetchCategories();
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="bg-white p-8 rounded-[32px] border border-bento-line shadow-sm">
        <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2"><Plus size={20}/> Add Category</h2>
        <div className="flex gap-4">
          <input className="border border-bento-line focus:border-black outline-none p-3 rounded-xl flex-1 text-sm" placeholder="Name" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
          <button onClick={handleAddCategory} className="bg-black text-white px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black/80">Create</button>
        </div>
      </div>
      <div className="bg-white rounded-[32px] border border-bento-line overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f8f8f8] border-b border-bento-line">
            <tr><th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">Name</th><th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y divide-bento-line">
            {categories.map(c => (
              <tr key={c.id}>
                <td className="p-5 font-bold">{c.name}</td>
                <td className="p-5 text-right"><button onClick={() => handleDeleteCategory(c.id)} className="w-8 h-8 inline-flex items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100"><Trash2 size={14} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
