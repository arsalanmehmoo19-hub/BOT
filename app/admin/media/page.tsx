'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import type { Media } from '@/types/supabase';

export default function AdminMedia() {
  const [media, setMedia] = useState<Media[]>([]);
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  useEffect(() => {
    async function fetchMedia() {
      const { data } = await supabase
        .from('media')
        .select('*')
        .order('uploaded_at', { ascending: false });
      setMedia((data as Media[]) || []);
    }

    void fetchMedia();
  }, []);

  async function handleAddMedia() {
    if (!url) return;
    await supabase.from('media').insert([{ url, alt }]);
    setUrl('');
    setAlt('');
    const { data } = await supabase
      .from('media')
      .select('*')
      .order('uploaded_at', { ascending: false });
    setMedia((data as Media[]) || []);
  }

  async function handleDeleteMedia(id: string) {
    await supabase.from('media').delete().eq('id', id);
    const { data } = await supabase
      .from('media')
      .select('*')
      .order('uploaded_at', { ascending: false });
    setMedia((data as Media[]) || []);
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Media Library</h2>
      <div className="bg-white p-4 rounded shadow">
        <input
          placeholder="Image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <input
          placeholder="Alt text"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button onClick={handleAddMedia} className="bg-black text-white px-4 py-2 rounded">
          Add Image
        </button>
      </div>
      <div className="bg-white p-4 rounded shadow grid grid-cols-2 md:grid-cols-4 gap-4">
        {media.map((m) => (
          <div key={m.id} className="border rounded p-2 flex flex-col items-center">
            <div className="relative w-32 h-32 mb-2">
              <Image
                src={m.url}
                alt={m.alt || ''}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-xs text-gray-600 mb-2 text-center">{m.alt}</div>
            <button
              onClick={() => handleDeleteMedia(m.id)}
              className="text-red-500 text-xs"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
