'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Trash2, Edit2, Plus, Save } from 'lucide-react';
import Image from 'next/image';
import type { Product, Category, ProductImage } from '@/types/supabase';

interface ProductWithRelations extends Product {
  categories?: Category;
  product_images?: ProductImage[];
}

export default function AdminProducts() {
  const [products, setProducts] = useState<ProductWithRelations[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<ProductWithRelations | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    size: '',
    category_id: '',
  });
  const [newImageUrl, setNewImageUrl] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const [prodRes, catRes] = await Promise.all([
      supabase
        .from('products')
        .select('*, categories(*), product_images(*)')
        .order('created_at', { ascending: false }),
      supabase.from('categories').select('*').order('name', { ascending: true }),
    ]);
    setProducts((prodRes.data as ProductWithRelations[]) || []);
    setCategories((catRes.data as Category[]) || []);
    setLoading(false);
  }

  async function handleAddProduct() {
    if (!newProduct.name || !newProduct.price || !newProduct.category_id) {
      alert('Name, Price, and Category required');
      return;
    }
    const slug =
      newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const { error } = await supabase
      .from('products')
      .insert([{ ...newProduct, slug }])
      .select();

    if (error) {
      alert('Failed to add product: ' + error.message);
    } else {
      setNewProduct({ name: '', description: '', price: 0, size: '', category_id: '' });
      fetchData();
    }
  }

  async function handleDeleteProduct(id: string) {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchData();
  }

  async function handleUpdateProduct(id: string, updates: Partial<Product>) {
    const { product_images, categories, ...cleanUpdates } = updates as any;
    await supabase.from('products').update(cleanUpdates).eq('id', id);
    setEditingProduct(null);
    fetchData();
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

  return (
    <div className="space-y-8">
      {/* Add Product Form */}
      <div className="bg-white p-8 rounded-[32px] border border-bento-line shadow-sm">
        <h2 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
          <Plus size={20} /> Add New Product
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <input
            className="border border-bento-line focus:border-black outline-none p-3 rounded-xl md:col-span-2 text-sm"
            placeholder="Product Name *"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            className="border border-bento-line focus:border-black outline-none p-3 rounded-xl text-sm"
            type="number"
            placeholder="Price *"
            value={newProduct.price || ''}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: Number(e.target.value) })
            }
          />
          <input
            className="border border-bento-line focus:border-black outline-none p-3 rounded-xl text-sm"
            placeholder="Size (S, M, L)"
            value={newProduct.size}
            onChange={(e) =>
              setNewProduct({ ...newProduct, size: e.target.value })
            }
          />
          <select
            className="border border-bento-line focus:border-black outline-none p-3 rounded-xl text-sm bg-white"
            value={newProduct.category_id}
            onChange={(e) =>
              setNewProduct({ ...newProduct, category_id: e.target.value })
            }
          >
            <option value="" disabled>
              Category *
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddProduct}
            className="bg-black text-white p-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-black/80"
          >
            Create
          </button>
          <input
            className="border border-bento-line focus:border-black outline-none p-3 rounded-xl md:col-span-6 text-sm"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-[32px] border border-bento-line overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f8f8f8] border-b border-bento-line">
            <tr>
              <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">
                Product
              </th>
              <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">
                Category
              </th>
              <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40">
                Price/Size
              </th>
              <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40 w-1/3">
                Images
              </th>
              <th className="p-5 font-black uppercase tracking-widest text-[10px] text-black/40 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bento-line">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-5 align-top">
                  {editingProduct?.id === p.id ? (
                    <div className="space-y-2">
                      <input
                        className="border p-2 w-full rounded text-xs"
                        value={editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            name: e.target.value,
                          })
                        }
                      />
                      <textarea
                        className="border p-2 w-full rounded text-xs"
                        rows={2}
                        value={editingProduct.description || ''}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="font-bold">{p.name}</p>
                      <p className="text-[10px] text-black/50 line-clamp-2 mt-1">
                        {p.description}
                      </p>
                    </div>
                  )}
                </td>
                <td className="p-5 align-top">
                  {editingProduct?.id === p.id ? (
                    <select
                      className="border p-2 w-full rounded text-xs bg-white"
                      value={editingProduct.category_id || ''}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          category_id: e.target.value,
                        })
                      }
                    >
                      <option value="">None</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {p.categories?.name}
                    </span>
                  )}
                </td>
                <td className="p-5 align-top">
                  {editingProduct?.id === p.id ? (
                    <div className="space-y-2">
                      <input
                        className="border p-2 w-full rounded text-xs"
                        type="number"
                        value={editingProduct.price}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            price: Number(e.target.value),
                          })
                        }
                      />
                      <input
                        className="border p-2 w-full rounded text-xs"
                        placeholder="Size"
                        value={editingProduct.size || ''}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            size: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div>
                      <p className="font-bold">${p.price}</p>
                      <p className="text-[10px] uppercase">Size: {p.size}</p>
                    </div>
                  )}
                </td>
                <td className="p-5 align-top space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {p.product_images?.map((img: any) => (
                      <div
                        key={img.id}
                        className="relative group/img w-12 h-12 rounded border bg-gray-100 overflow-hidden"
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={img.image_url}
                            alt=""
                            fill
                            className="object-cover"
                          />
                        </div>
                        <button
                          onClick={() => handleDeleteImage(img.id)}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover/img:opacity-100 text-white"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      placeholder="Image URL..."
                      className="border p-2 rounded text-[10px] flex-1 min-w-0"
                      onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                    <button
                      onClick={() => handleAddImage(p.id)}
                      className="p-2 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </td>
                <td className="p-5 align-top text-right">
                  <div className="flex justify-end gap-2">
                    {editingProduct?.id === p.id ? (
                      <button
                        onClick={() =>
                          handleUpdateProduct(p.id, editingProduct)
                        }
                        className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
                      >
                        <Save size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingProduct(p)}
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                      >
                        <Edit2 size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
