import React from "react";
import { useApp } from "../context/AppContext";

export default function Vehicles() {
  const { vehicles } = useApp();

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-600 mb-4">Vehicles</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {vehicles.map(v => (
          <div key={v.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="font-semibold">{v.number}</h3>
            <p>Driver: {v.driver}</p>
            <p className={v.status === "Active" ? "text-green-600" : "text-red-500"}>{v.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
