import { Link, useLocation } from "react-router-dom";
import { Home, Truck, Users, Database } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function Sidebar() {
  const { darkMode } = useApp();
  const loc = useLocation();
  const items = [
    { to: "/", label: "Dashboard", icon: <Home size={16} /> },
    { to: "/waste-records", label: "Waste Records", icon: <Database size={16} /> },
    { to: "/vehicles", label: "Vehicles", icon: <Truck size={16} /> },
    { to: "/users", label: "Users", icon: <Users size={16} /> }
  ];

  return (
    <aside className={`w-64 p-6 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} border-r`}>
      <h1 className="text-2xl font-bold text-green-600 mb-6">♻ WasteAdmin</h1>
      <nav className="flex flex-col gap-2">
        {items.map(i => (
          <Link key={i.to} to={i.to} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${loc.pathname === i.to ? "bg-green-100 dark:bg-green-600/20" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}>
            <span>{i.icon}</span>
            <span>{i.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto text-xs text-gray-500 dark:text-gray-400 pt-6">© 2025 Waste Management</div>
    </aside>
  );
}
