import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function WasteRecords() {
  const { wasteRecords, addWaste, updateWaste, deleteWaste } = useApp();
  const [form, setForm] = useState({ location: "", weight: "", status: "Pending", date: "" });
  const [editing, setEditing] = useState(null);

  const handleAdd = async () => {
    if (!form.location || !form.weight) return;
    if (editing) {
      await updateWaste(editing.id, form);
      setEditing(null);
    } else {
      await addWaste({ ...form, weight: Number(form.weight), lat: 10, lng: 10 });
    }
    setForm({ location: "", weight: "", status: "Pending", date: "" });
  };

  const startEdit = (r) => {
    setEditing(r);
    setForm({ location: r.location, weight: r.weight, status: r.status, date: r.date || "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-600 mb-4">Waste Records</h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
        <div className="flex gap-3">
          <input placeholder="Location" value={form.location} onChange={e=>setForm({...form, location: e.target.value})} className="p-2 border rounded flex-1" />
          <input placeholder="Weight (kg)" type="number" value={form.weight} onChange={e=>setForm({...form, weight: e.target.value})} className="p-2 border rounded w-36" />
          <select value={form.status} onChange={e=>setForm({...form, status: e.target.value})} className="p-2 border rounded">
            <option>Pending</option>
            <option>Collected</option>
            <option>In Progress</option>
          </select>
          <input type="date" value={form.date} onChange={e=>setForm({...form, date: e.target.value})} className="p-2 border rounded" />
          <button onClick={handleAdd} className="bg-green-600 text-white px-4 py-2 rounded">{editing ? "Update" : "Add"}</button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Location</th>
              <th className="p-2">Weight</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {wasteRecords.map(r => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-2">{r.location || r.area}</td>
                <td className="p-2">{r.weight}</td>
                <td className="p-2">{r.status}</td>
                <td className="p-2">{r.date || "-"}</td>
                <td className="p-2">
                  <button onClick={() => startEdit(r)} className="text-blue-600 mr-3">Edit</button>
                  <button onClick={() => deleteWaste(r.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
            {wasteRecords.length === 0 && <tr><td colSpan="5" className="p-4 text-center text-gray-500">No records</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
