import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import type { AuthContextType } from '../types/auth.types';

/**
 * Hook personalizado para acceder al contexto de autenticación
 * 
 * @returns {AuthContextType} Contexto de autenticación con user, token, loading y funciones
 * @throws {Error} Si se usa fuera del AuthProvider
 * 
 * @example
 * const { user, token, login, logout } = useAuth();
 * 
 * if (loading) return <Spinner />;
 * if (!user) return <LoginPage />;
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }

  return context;
};
