"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminSettings() {
  const [settings, setSettings] = useState<any>({});
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [heroTitle, setHeroTitle] = useState("");
  const [heroDescription, setHeroDescription] = useState("");
  const [heroCtaText, setHeroCtaText] = useState("");
  const [heroCtaUrl, setHeroCtaUrl] = useState("");
  const [footerNote, setFooterNote] = useState("");

  useEffect(() => { fetchSettings(); }, []);

  async function fetchSettings() {
    const { data } = await supabase.from('settings').select('*').single();
    if (data) {
      setSettings(data);
      setSiteTitle(data.site_title || "");
      setSiteDescription(data.site_description || "");
      setHeroTitle(data.hero_title || "");
      setHeroDescription(data.hero_description || "");
      setHeroCtaText(data.hero_cta_text || "");
      setHeroCtaUrl(data.hero_cta_url || "");
      setFooterNote(data.footer_note || "");
    }
  }

  async function handleSave() {
    await supabase.from('settings').upsert({
      id: 1,
      site_title: siteTitle,
      site_description: siteDescription,
      hero_title: heroTitle,
      hero_description: heroDescription,
      hero_cta_text: heroCtaText,
      hero_cta_url: heroCtaUrl,
      footer_note: footerNote
    });
    fetchSettings();
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Site Settings</h2>
      <div className="bg-white p-6 rounded shadow flex flex-col gap-4 max-w-2xl">
        <label className="font-semibold">Site Title</label>
        <input value={siteTitle} onChange={e => setSiteTitle(e.target.value)} className="border p-3 rounded" />

        <label className="font-semibold">Site Description</label>
        <textarea value={siteDescription} onChange={e => setSiteDescription(e.target.value)} className="border p-3 rounded h-24" />

        <label className="font-semibold">Hero Title</label>
        <input value={heroTitle} onChange={e => setHeroTitle(e.target.value)} className="border p-3 rounded" />

        <label className="font-semibold">Hero Description</label>
        <textarea value={heroDescription} onChange={e => setHeroDescription(e.target.value)} className="border p-3 rounded h-24" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">CTA Text</label>
            <input value={heroCtaText} onChange={e => setHeroCtaText(e.target.value)} className="border p-3 rounded" />
          </div>
          <div>
            <label className="font-semibold">CTA URL</label>
            <input value={heroCtaUrl} onChange={e => setHeroCtaUrl(e.target.value)} className="border p-3 rounded" />
          </div>
        </div>

        <label className="font-semibold">Footer Note</label>
        <textarea value={footerNote} onChange={e => setFooterNote(e.target.value)} className="border p-3 rounded h-20" />

        <button onClick={handleSave} className="bg-black text-white px-6 py-3 rounded mt-4">Save Settings</button>
      </div>
    </div>
  );
}
