import { Sun, Moon } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useApp();
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700"
      title="Toggle theme"
    >
      {darkMode ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
