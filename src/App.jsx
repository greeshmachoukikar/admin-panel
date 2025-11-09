import React from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useApp } from "./context/AppContext";

export default function App() {
  const { darkMode } = useApp();

  return (
    <div className={darkMode ? "dark flex min-h-screen" : "flex min-h-screen"}>
      <Sidebar />
      <div className="flex-1 bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <main className="p-6">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}
