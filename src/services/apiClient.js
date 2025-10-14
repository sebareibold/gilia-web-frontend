import axios from 'axios';
import { ENV_CONFIG, logger } from '../config/environment';

// Configuración base de axios
const apiClient = axios.create({
  baseURL: ENV_CONFIG.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para requests - agregar token automáticamente
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    logger.log('API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
    });
    
    return config;
  },
  (error) => {
    logger.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para responses - manejo de errores global
apiClient.interceptors.response.use(
  (response) => {
    logger.log('API Response:', {
      status: response.status,
      url: response.config.url,
    });
    return response;
  },
  (error) => {
    logger.error('API Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
    });

    // Manejo específico de errores
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    if (error.response?.status === 403) {
      // Sin permisos
      logger.warn('Access forbidden - insufficient permissions');
    }

    if (error.response?.status >= 500) {
      // Error del servidor
      logger.error('Server error occurred');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
