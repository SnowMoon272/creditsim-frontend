/**
 * Tipos relacionados con autenticación y usuarios.
 * 
 * Estos tipos deben coincidir exactamente con los schemas de Pydantic
 * del backend (app/schemas/auth.py)
 */

// ============================================
// REQUESTS (peticiones al backend)
// ============================================

/**
 * Datos para registrar un nuevo usuario
 * Backend: UserCreate
 */
export interface RegisterRequest {
  email: string;
  password: string;
}

/**
 * Datos para iniciar sesión
 * Backend: UserLogin
 */
export interface LoginRequest {
  email: string;
  password: string;
}

// ============================================
// RESPONSES (respuestas del backend)
// ============================================

/**
 * Respuesta de autenticación (register y login)
 * Backend: Token
 */
export interface AuthResponse {
  access_token: string;
  token_type: string; // Siempre "bearer"
}

/**
 * Datos del usuario (sin password)
 * Backend: UserResponse
 */
export interface User {
  id: number;
  email: string;
}

// ============================================
// CONTEXTO DE AUTENTICACIÓN
// ============================================

/**
 * Estado global de autenticación en el frontend
 */
export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
