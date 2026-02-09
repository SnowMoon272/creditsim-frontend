import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * Instancia configurada de axios para todas las peticiones al API
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de request: Añade el token JWT automáticamente si existe
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Interceptor de response: Maneja errores comunes
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Si el token expiró o es inválido, limpiar localStorage
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Opcional: redirigir a login
      // window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;
