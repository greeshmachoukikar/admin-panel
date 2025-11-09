import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Users() {
  const { users, addUser, updateUser, deleteUser } = useApp();
  const [form, setForm] = useState({ username: "", password: "", role: "user" });
  const [editing, setEditing] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateUser(editing.id, form);
      setEditing(null);
    } else {
      await addUser({ ...form });
    }
    setForm({ username: "", password: "", role: "user" });
  };

  const startEdit = (u) => {
    setEditing(u);
    setForm({ username: u.username, password: u.password, role: u.role });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-600 mb-4">User Management</h2>

      <form onSubmit={submit} className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
        <div className="flex gap-3">
          <input value={form.username} onChange={e=>setForm({...form, username: e.target.value})} placeholder="Username" className="p-2 border rounded flex-1" required />
          <input value={form.password} onChange={e=>setForm({...form, password: e.target.value})} placeholder="Password" className="p-2 border rounded w-48" required />
          <select value={form.role} onChange={e=>setForm({...form, role: e.target.value})} className="p-2 border rounded">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{editing ? "Update" : "Add"}</button>
        </div>
      </form>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">ID</th>
              <th className="p-2">Username</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{u.id}</td>
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">
                  <button onClick={()=>startEdit(u)} className="text-blue-600 mr-3">Edit</button>
                  <button onClick={()=>deleteUser(u.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan="4" className="p-4 text-center text-gray-500">No users</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
