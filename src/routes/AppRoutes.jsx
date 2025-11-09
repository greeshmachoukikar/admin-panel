import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Vehicles from "../pages/Vehicles";
import WasteRecords from "../pages/WasteRecords";
import Login from "../pages/Login";
import { useApp } from "../context/AppContext";

export default function AppRoutes() {
  const { user } = useApp();

  // Guarded route
  const Private = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <Private><Dashboard /></Private>
      } />
      <Route path="/waste-records" element={
        <Private><WasteRecords /></Private>
      } />
      <Route path="/users" element={
        <Private><Users /></Private>
      } />
      <Route path="/vehicles" element={
        <Private><Vehicles /></Private>
      } />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
