import React, { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { AuthContextType, User } from "../types/auth.types";
import { authService } from "../services";

// Crear el contexto con valor inicial undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider - Proveedor del contexto de autenticación
 *
 * Maneja el estado global de autenticación:
 * - Usuario actual
 * - Token JWT
 * - Estado de carga
 * - Funciones de login, register y logout
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Al cargar el componente, restaurar token y usuario de localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  /**
   * Login - Inicia sesión con email y password
   * Backend retorna solo el token, no los datos del usuario
   */
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      setToken(response.access_token);

      const userData: User = {
        id: 0,
        email: email,
      };
      setUser(userData);

      localStorage.setItem("token", response.access_token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register - Registra un nuevo usuario con email y password
   * Backend retorna los datos del usuario pero sin token,
   * por lo que debemos hacer login después
   */
  const register = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      const userData = await authService.register({ email, password });

      const loginResponse = await authService.login({ email, password });
      setToken(loginResponse.access_token);
      setUser(userData);

      localStorage.setItem("token", loginResponse.access_token);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error en register:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout - Cierra sesión y limpia el estado
   * Limpia TODO el localStorage incluyendo datos del simulador
   */
  const logout = (): void => {
    setUser(null);
    setToken(null);
    // Limpiar todo el localStorage (token, user, y datos del simulador)
    localStorage.clear();
  };

  // Valor que se proveerá a todos los componentes hijos
  const value: AuthContextType = {
    user,
    token,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

