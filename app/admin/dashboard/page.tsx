'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminDashboard() {
  const [stats, setStats] = useState<{
    pageCount?: number;
    mediaCount?: number;
    userCount?: number;
  }>({});

  useEffect(() => {
    async function fetchStats() {
      const [{ count: pageCount }, { count: mediaCount }, { count: userCount }] = await Promise.all([
        supabase.from('pages').select('*', { count: 'exact', head: true }),
        supabase.from('media').select('*', { count: 'exact', head: true }),
        supabase.from('admins').select('*', { count: 'exact', head: true }),
      ]);
      setStats({
        pageCount: pageCount ?? undefined,
        mediaCount: mediaCount ?? undefined,
        userCount: userCount ?? undefined,
      });
    }

    void fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded shadow flex flex-col items-center">
          <div className="text-3xl font-bold">{stats.pageCount ?? '-'}</div>
          <div className="text-gray-500">Pages</div>
        </div>
        <div className="bg-white p-6 rounded shadow flex flex-col items-center">
          <div className="text-3xl font-bold">{stats.mediaCount ?? '-'}</div>
          <div className="text-gray-500">Media</div>
        </div>
        <div className="bg-white p-6 rounded shadow flex flex-col items-center">
          <div className="text-3xl font-bold">{stats.userCount ?? '-'}</div>
          <div className="text-gray-500">Users</div>
        </div>
      </div>
    </div>
  );
}
