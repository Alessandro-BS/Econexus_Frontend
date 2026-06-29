import axios from 'axios';

// Usar VITE_API_URL o un fallback local si no existe (útil para desarrollo)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8082/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar el token JWT en cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('eco_jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores 401 (No autorizado - token vencido)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el token expira o es inválido, cerramos sesión
      localStorage.removeItem('eco_authenticated');
      localStorage.removeItem('eco_jwt_token');
      localStorage.removeItem('eco_current_user');
      
      // Solo recargar si no estamos ya en la ruta de login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
