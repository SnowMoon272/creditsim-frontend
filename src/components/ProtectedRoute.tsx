import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import Spinner from "./Spinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  // Mientras está verificando la autenticación, no redirigir
  if (loading) {
    return <Spinner />;
  }

  // Si no hay usuario autenticado, redirigir a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario autenticado, mostrar el contenido protegido
  return <>{children}</>;
};

export default ProtectedRoute;
