import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    const res = await login(username, password);
    if (res.ok) nav("/");
    else setErr(res.message || "Login failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <form onSubmit={submit} className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Waste Admin Login</h2>
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="w-full mb-3 p-3 rounded border" />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full mb-3 p-3 rounded border" />
        {err && <div className="text-red-500 mb-3">{err}</div>}
        <button type="submit" className="w-full bg-green-600 text-white py-3 rounded">Login</button>
      </form>
    </div>
  );
}
