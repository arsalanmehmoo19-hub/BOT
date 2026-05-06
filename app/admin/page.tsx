'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Trash2, Edit2, Plus, Save, LogOut, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: 0, size: '', category_id: '' });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'orders'>('products');

  useEffect(() => {
    if (localStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const handleLogin = (e: any) => {
    e.preventDefault();
    if ((email === 'usman@gmail.com' && password === '123456') || (email === 'admin' && password === 'admin')) {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert('Invalid admin credentials');
    }
  };

  async function fetchData() {
    setLoading(true);
    try {
      const [prodRes, catRes, orderRes] = await Promise.all([
        supabase.from('products').select('*, categories(*), product_images(*)').order('created_at', { ascending: false }),
        supabase.from('categories').select('*').order('name', { ascending: true }),
        supabase.from('orders').select('*, order_items(*, products(*))').order('created_at', { ascending: false })
      ]);
      setProducts(prodRes.data || []);
      setCategories(catRes.data || []);
      setOrders(orderRes?.data || []);
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setLoading(false);
    }
  }

  // --- ORDER MGT ---
  async function handleUpdateOrderStatus(id: string, newStatus: string) {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', id);
    if (!error) fetchData();
  }

  // --- PRODUCT MGT ---
  async function handleDeleteProduct(id: string) {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchData();
  }

  async function handleUpdateProduct(id: string, updates: any) {
    const { product_images, categories, ...cleanUpdates } = updates;
    await supabase.from('products').update(cleanUpdates).eq('id', id);
    setEditingProduct(null);
    fetchData();
  }

  async function handleAddProduct() {
    if (!newProduct.name || !newProduct.price || !newProduct.category_id) {
       alert('Name, Price, and Category required'); return;
    }
    const slug = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const { error } = await supabase.from('products').insert([{ ...newProduct, slug }]).select();
    if (error) alert('Failed to add product');
    else {
      setNewProduct({ name: '', description: '', price: 0, size: '', category_id: '' });
      fetchData();
    }
  }

  async function handleAddImage(productId: string) {
    if (!newImageUrl) return;
    await supabase.from('product_images').insert([{ product_id: productId, image_url: newImageUrl }]);
    setNewImageUrl('');
    fetchData();
  }

  async function handleDeleteImage(imageId: string) {
    await supabase.from('product_images').delete().eq('id', imageId);
    fetchData();
  }

  // --- CATEGORY MGT ---
  async function handleAddCategory() {
    if (!newCategoryName) return;
    const slug = newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await supabase.from('categories').insert([{ name: newCategoryName, slug }]);
    setNewCategoryName('');
    fetchData();
  }

  async function handleDeleteCategory(id: string) {
    if (!confirm('Deleting category deletes its products. Proceed?')) return;
    await supabase.from('categories').delete().eq('id', id);
    fetchData();
  }

  function handleLogout() {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-[32px] border border-bento-line shadow-sm w-full max-w-sm">
          <h1 className="text-3xl font-black uppercase mb-6 text-center tracking-tight">Admin</h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input className="border border-bento-line focus:border-black outline-none p-4 rounded-xl text-sm" placeholder="ID (usman@gmail.com or admin)" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="border border-bento-line focus:border-black outline-none p-4 rounded-xl text-sm" type="password" placeholder="Password (123456 or admin)" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="bg-black text-white p-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:opacity-80 transition-opacity">Login</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      <Navbar />
      <div className="p-8 pt-32 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-bento-line pb-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Restricted Area</span>
            <h1 className="text-4xl font-black uppercase tracking-tight mt-1">Admin Panel</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-white bg-red-500 hover:bg-red-600 px-6 py-3 rounded-full transition-colors shadow-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="flex gap-4 mb-8">
           <button onClick={() => setActiveTab('products')} className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-black text-white' : 'bg-white text-black border border-bento-line hover:border-black'}`}>Products</button>
           <button onClick={() => setActiveTab('categories')} className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'categories' ? 'bg-black text-white' : 'bg-white text-black border border-bento-line hover:border-black'}`}>Categories</button>
           <button onClick={() => setActiveTab('orders')} className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-black text-white' : 'bg-white text-black border border-bento-line hover:border-black'}`}>Orders</button>
        </div>
        
        {activeTab === 'products' && (
           <div className="space-y-8">
              {/* Add Product Form */}
              <div className="bg-white p-8 rounded-[32px] border border-bento-line shadow-sm">
                <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2"><Plus size={20}/> Add New Product</h2>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <input className="border border-bento-line focus:border-black outline-none p-3 rounded-xl md:col-span-2 text-sm" placeholder="Product Name *" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                  <input className="border border-bento-line focus:border-black outline-none p-3 rounded-xl text-sm" type="number" placeholder="Price *" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                  <input className="border border-bento-line focus:border-black outline-none p-3 rounded-xl text-sm" placeholder="Size (S, M, L)" value={newProduct.size} onChange={e => setNewProduct({...newProduct, size: e.target.value})} />
                  <select className="border border-bento-line focus:border-black outline-none p-3 rounded-xl text-sm bg-white" value={newProduct.category_id} onChange={e => setNewProduct({...newProduct, category_id: e.target.value})}>
                     <option value="" disabled>Category *</option>
                     {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  <button onClick={handleAddProduct} className="bg-black text-white p-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black/80">Create</button>
                  <input className="border border-bento-line focus:border-black outline-none p-3 rounded-xl md:col-span-6 text-sm" placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                </div>
              </div>

              {/* Product Table */}
              <div className="bg-white rounded-[32px] border border-bento-line overflow-hidden shadow-sm overflow-x-auto">
                   <table className="w-full text-left text-sm">
                     <thead className="bg-[#f8f8f8] border-b border-bento-line">
                       <tr>
                         <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">Product</th>
                         <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">Category</th>
                         <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">Price/Size</th>
                         <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40 w-1/3">Images</th>
                         <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40 text-right">Actions</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-bento-line">
                       {products.map(p => (
                         <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                           <td className="p-5 align-top">
                              {editingProduct?.id === p.id ? (
                                 <div className="space-y-2">
                                    <input className="border p-2 w-full rounded text-xs" value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                                    <textarea className="border p-2 w-full rounded text-xs" rows={2} value={editingProduct.description || ''} onChange={e => setEditingProduct({...editingProduct, description: e.target.value})} />
                                 </div>
                              ) : (
                                 <div><p className="font-bold">{p.name}</p><p className="text-[10px] text-black/50 line-clamp-2 mt-1">{p.description}</p></div>
                              )}
                           </td>
                           <td className="p-5 align-top">
                              {editingProduct?.id === p.id ? (
                                 <select className="border p-2 w-full rounded text-xs bg-white" value={editingProduct.category_id || ''} onChange={e => setEditingProduct({...editingProduct, category_id: e.target.value})}>
                                    <option value="">None</option>
                                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                 </select>
                              ) : (<span className="text-[10px] font-bold uppercase tracking-widest">{p.categories?.name}</span>)}
                           </td>
                           <td className="p-5 align-top">
                              {editingProduct?.id === p.id ? (
                                 <div className="space-y-2">
                                    <input className="border p-2 w-full rounded text-xs" type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} />
                                    <input className="border p-2 w-full rounded text-xs" placeholder="Size" value={editingProduct.size || ''} onChange={e => setEditingProduct({...editingProduct, size: e.target.value})} />
                                 </div>
                              ) : (<div><p className="font-bold">${p.price}</p><p className="text-[10px] uppercase">Size: {p.size}</p></div>)}
                           </td>
                           <td className="p-5 align-top space-y-2">
                              <div className="flex flex-wrap gap-2">
                                 {p.product_images?.map((img: any) => (
                                    <div key={img.id} className="relative group/img w-12 h-12 rounded border bg-gray-100 overflow-hidden">
                                       <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                                       <button onClick={() => handleDeleteImage(img.id)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 text-white"><Trash2 size={12}/></button>
                                    </div>
                                 ))}
                              </div>
                              <div className="flex gap-2">
                                 <input placeholder="Image URL..." className="border p-2 rounded text-[10px] flex-1 min-w-0" onChange={(e) => setNewImageUrl(e.target.value)}/>
                                 <button onClick={() => handleAddImage(p.id)} className="p-2 bg-gray-100 rounded hover:bg-gray-200"><Plus size={14} /></button>
                              </div>
                           </td>
                           <td className="p-5 align-top text-right">
                             <div className="flex justify-end gap-2">
                               {editingProduct?.id === p.id 
                                 ? <button onClick={() => handleUpdateProduct(p.id, editingProduct)} className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"><Save size={14}/></button>
                                 : <button onClick={() => setEditingProduct(p)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><Edit2 size={14}/></button>}
                               <button onClick={() => handleDeleteProduct(p.id)} className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center"><Trash2 size={14}/></button>
                             </div>
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
              </div>
           </div>
        )}
        
        {activeTab === 'categories' && (
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
        )}
        {activeTab === 'orders' && (
           <div className="space-y-8">
              <div className="bg-white rounded-[32px] border border-bento-line overflow-hidden shadow-sm">
                 <table className="w-full text-left text-sm">
                   <thead className="bg-[#f8f8f8] border-b border-bento-line">
                     <tr>
                       <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">Order ID</th>
                       <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">Amount</th>
                       <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">Status</th>
                       <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">Items</th>
                       <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40 text-right">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-bento-line">
                     {orders.map(o => (
                        <tr key={o.id}>
                           <td className="p-5 font-mono text-xs">{o.id.split('-')[0]}...</td>
                           <td className="p-5 font-bold">${o.total_amount}</td>
                           <td className="p-5">
                             <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${o.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                               {o.status}
                             </span>
                           </td>
                           <td className="p-5">
                             <span className="text-[10px] font-bold uppercase tracking-widest text-black/60">
                               {o.order_items?.length || 0} ITEMS
                             </span>
                           </td>
                           <td className="p-5 text-right">
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
                        </tr>
                     ))}
                   </tbody>
                 </table>
              </div>
           </div>
        )}
      </div>
    </main>
  );
}
