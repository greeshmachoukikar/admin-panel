import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [wasteRecords, setWasteRecords] = useState([]);
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [user, setUser] = useState(null); // logged in user
  const [darkMode, setDarkMode] = useState(false);

  // Fetch functions
  const fetchWaste = async () => {
    try {
      const res = await axios.get(`${API}/waste`);
      setWasteRecords(res.data);
    } catch (e) { console.error(e); }
  };
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/users`);
      setUsers(res.data);
    } catch (e) { console.error(e); }
  };
  const fetchVehicles = async () => {
    try {
      const res = await axios.get(`${API}/vehicles`);
      setVehicles(res.data);
    } catch (e) { console.error(e); }
  };

  // Polling for live updates (every 5 seconds)
  useEffect(() => {
    fetchWaste();
    fetchUsers();
    fetchVehicles();
    const interval = setInterval(fetchWaste, 5000);
    return () => clearInterval(interval);
  }, []);

  // CRUD wrappers for waste & users
  const addWaste = async (record) => {
    await axios.post(`${API}/waste`, record);
    await fetchWaste();
  };
  const updateWaste = async (id, patch) => {
    await axios.patch(`${API}/waste/${id}`, patch);
    await fetchWaste();
  };
  const deleteWaste = async (id) => {
    await axios.delete(`${API}/waste/${id}`);
    await fetchWaste();
  };

  const addUser = async (u) => {
    await axios.post(`${API}/users`, u);
    await fetchUsers();
  };
  const updateUser = async (id, patch) => {
    await axios.patch(`${API}/users/${id}`, patch);
    await fetchUsers();
  };
  const deleteUser = async (id) => {
    await axios.delete(`${API}/users/${id}`);
    await fetchUsers();
  };

  // simple login (checks db users)
  const login = async (username, password) => {
    try {
      const res = await axios.get(`${API}/users`);
      const found = res.data.find(
        (u) => u.username === username && u.password === password
      );
      if (found) {
        setUser(found);
        localStorage.setItem("wm_user", JSON.stringify(found));
        return { ok: true, user: found };
      } else {
        return { ok: false, message: "Invalid credentials" };
      }
    } catch (e) {
      console.error(e);
      return { ok: false, message: "Login failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("wm_user");
  };

  useEffect(() => {
    const stored = localStorage.getItem("wm_user");
    if (stored) setUser(JSON.parse(stored));
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, []);

  return (
    <AppContext.Provider
      value={{
        wasteRecords,
        users,
        vehicles,
        fetchWaste,
        fetchUsers,
        fetchVehicles,
        addWaste,
        updateWaste,
        deleteWaste,
        addUser,
        updateUser,
        deleteUser,
        user,
        login,
        logout,
        darkMode,
        setDarkMode
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
