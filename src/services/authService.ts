import type { RegisterRequest, LoginRequest, AuthResponse, User } from '../types/auth.types';
import api from './api';

/**
 * Servicio de autenticación
 * Maneja las llamadas al API para registro y login
 */

/**
 * Registrar un nuevo usuario
 * Backend retorna: { id: number, email: string }
 */
export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await api.post<User>('/auth/register', data);
  return response.data;
};

/**
 * Iniciar sesión
 * Backend retorna: { access_token: string, token_type: string }
 */
export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;
