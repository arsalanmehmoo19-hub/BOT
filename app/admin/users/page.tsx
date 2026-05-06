"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("editor");

  useEffect(() => { fetchUsers(); }, []);

  async function fetchUsers() {
    const { data } = await supabase.from('admins').select('*').order('created_at', { ascending: false });
    setUsers(data || []);
  }

  async function handleAddUser() {
    if (!email) return;
    await supabase.from('admins').insert([{ email, role }]);
    setEmail(""); setRole("editor");
    fetchUsers();
  }

  async function handleDeleteUser(id: string) {
    await supabase.from('admins').delete().eq('id', id);
    fetchUsers();
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Users</h2>
      <div className="bg-white p-4 rounded shadow">
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded mr-2" />
        <select value={role} onChange={e => setRole(e.target.value)} className="border p-2 rounded mr-2">
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
        </select>
        <button onClick={handleAddUser} className="bg-black text-white px-4 py-2 rounded">Add User</button>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead><tr><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button onClick={() => handleDeleteUser(u.id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
