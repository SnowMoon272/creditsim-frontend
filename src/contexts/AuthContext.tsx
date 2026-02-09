import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextType, User } from '../types/auth.types';

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
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  /**
   * Login - Inicia sesión con email y password
   * Por ahora es un stub, en 9.3 se conectará con authService
   */
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // TODO: Implementar llamada real al API en paso 9.3
      // const response = await authService.login(email, password);
      // setToken(response.access_token);
      // setUser(response.user);
      // localStorage.setItem('token', response.access_token);
      // localStorage.setItem('user', JSON.stringify(response.user));
      
      console.log('Login stub called with:', email, '- Password length:', password.length);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register - Registra un nuevo usuario con email y password
   * Por ahora es un stub, en 9.3 se conectará con authService
   */
  const register = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      // TODO: Implementar llamada real al API en paso 9.3
      // const response = await authService.register(email, password);
      // setToken(response.access_token);
      // setUser(response.user);
      // localStorage.setItem('token', response.access_token);
      // localStorage.setItem('user', JSON.stringify(response.user));
      
      console.log('Register stub called with:', email, '- Password length:', password.length);
    } catch (error) {
      console.error('Error en register:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout - Cierra sesión y limpia el estado
   */
  const logout = (): void => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
