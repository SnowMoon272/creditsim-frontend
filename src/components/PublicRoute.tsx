import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
import Spinner from "./Spinner";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, loading } = useAuth();

  // Mientras está verificando la autenticación, no redirigir
  if (loading) {
    return <Spinner />;
  }

  // Si hay usuario autenticado, redirigir a dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si no hay usuario autenticado, mostrar el contenido público
  return <>{children}</>;
};

export default PublicRoute;
