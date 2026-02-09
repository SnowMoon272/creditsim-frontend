import { Routes, Route, Navigate } from "react-router-dom";
import { Welcome, Login, Register, Dashboard } from "../pages";
import { ProtectedRoute, PublicRoute } from "../components";

const AppRouter = () => {
  return (
    <Routes>
      {/* Rutas públicas - redirigen a dashboard si ya está autenticado */}
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <Welcome />
          </PublicRoute>
        } 
      />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />

      {/* Ruta protegida - requiere autenticación */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

      {/* Redireccionar rutas no encontradas a Welcome */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
