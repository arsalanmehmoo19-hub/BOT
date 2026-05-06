'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import type { Order, OrderItem, Product } from '@/types/supabase';

interface OrderWithItems extends Order {
  order_items?: (OrderItem & { products?: Product })[];
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .order('created_at', { ascending: false });
      setOrders((data as OrderWithItems[]) || []);
    }

    void fetchOrders();
  }, []);

  async function handleUpdateOrderStatus(id: string, newStatus: string) {
    await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*, products(*))')
      .order('created_at', { ascending: false });
    setOrders((data as OrderWithItems[]) || []);
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Orders</h2>
      <div className="bg-white rounded-[32px] border border-bento-line overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f8f8f8] border-b border-bento-line">
            <tr>
              <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">
                Order ID
              </th>
              <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">
                Amount
              </th>
              <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">
                Status
              </th>
              <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">
                Items
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bento-line">
            {orders.map((o) => (
              <tr key={o.id}>
                <td className="p-5 font-mono text-xs">{o.id.split('-')[0]}...</td>
                <td className="p-5 font-bold">${o.total_amount}</td>
                <td className="p-5">
                  <select
                    onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                    value={o.status}
                    className="border p-2 rounded text-[10px] font-bold uppercase tracking-widest bg-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">
                    {o.order_items?.length || 0} ITEMS
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
