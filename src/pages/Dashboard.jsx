import React from "react";
import { useApp } from "../context/AppContext";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, CartesianGrid, LineChart, Line } from "recharts";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { wasteRecords, vehicles } = useApp();

  // summary stats
  const totalWaste = wasteRecords.reduce((s, r) => s + (r.weight || 0), 0);
  const collectedCount = wasteRecords.filter(r => r.status === "Collected").length;
  const pendingCount = wasteRecords.filter(r => r.status === "Pending").length;
  const efficiency = ((collectedCount / Math.max(1, (collectedCount + pendingCount))) * 100).toFixed(1);

  // monthly grouping (if date present)
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const currentYear = new Date().getFullYear();
  const monthlyData = months.map((m, idx) => {
    const monthSum = wasteRecords
      .filter(r => r.date && new Date(r.date).getFullYear() === currentYear && new Date(r.date).getMonth() === idx)
      .reduce((s, r) => s + (r.weight || 0), 0);
    return { month: m, waste: monthSum };
  });

  // pie by status
  const statusCounts = ["Collected","Pending","In Progress"].map(s => ({
    name: s,
    value: wasteRecords.filter(r => r.status === s).length
  }));
  const COLORS = ["#16a34a","#f59e0b","#ef4444"];

  // area markers from lat/lng in percent (we store lat/lng as percent placeholders)
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-green-600">Waste Management Dashboard</h1>
          <p className="text-sm text-gray-500">Overview & live statistics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-r from-green-400 to-emerald-600 text-white p-5 rounded-2xl shadow">
          <p className="text-sm">Total Waste</p>
          <p className="text-2xl font-bold mt-2">{totalWaste} kg</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Collected</p>
          <p className="text-2xl font-bold mt-2 text-green-600">{collectedCount}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold mt-2 text-yellow-600">{pendingCount}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Efficiency</p>
          <p className="text-2xl font-bold mt-2 text-blue-600">{efficiency}%</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-3">Monthly Waste (this year)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="waste" fill="#16a34a" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h3 className="text-lg font-semibold mb-3">Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusCounts} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {statusCounts.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Animated mini-map */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h3 className="text-lg font-semibold mb-4">Area Cleanliness Map</h3>
        <div className="relative h-64 rounded-lg bg-green-50 dark:bg-gray-700 overflow-hidden">
          {wasteRecords.map((r, i) => {
            const left = (r.lng || (10 + i * 12)) + "%";
            const top = (r.lat || (10 + (i % 3) * 20)) + "%";
            const bg = r.status === "Collected" ? "bg-green-500/80" : r.status === "Pending" ? "bg-yellow-400/80" : "bg-red-500/80";
            return (
              <motion.div
                key={r.id}
                animate={{ x: [0, 8, 0], y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 5 + i }}
                className={`${bg} absolute rounded-full flex items-center justify-center text-xs text-white font-bold`}
                style={{ left, top, width: 56, height: 56 }}
                title={`${r.area} — ${r.status}`}
              >
                {r.location || r.area}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
