import React from "react";
import ThemeToggle from "./ThemeToggle";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { user, logout } = useApp();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h2>
        <p className="text-sm text-gray-500 dark:text-gray-300">Waste management analytics</p>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {user ? (
          <div className="flex items-center gap-3">
            <div className="text-sm">{user.username}</div>
            <button onClick={logout} className="text-sm text-red-600 hover:underline">Logout</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
