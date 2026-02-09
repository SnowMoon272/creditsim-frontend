import { Routes, Route, Navigate } from "react-router-dom";
import { Welcome, Login, Register } from "./pages";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Ruta protegida (temporal - será configurada en FASE 11) */}
      <Route path="/dashboard" element={<div>Dashboard (próximamente)</div>} />

      {/* Redireccionar rutas no encontradas a Welcome */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

