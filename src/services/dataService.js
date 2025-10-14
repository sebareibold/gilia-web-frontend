import axios from 'axios';
import { ENV_CONFIG } from '../config/environment';

const apiClient = axios.create({
  baseURL: ENV_CONFIG.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token de autenticación a las peticiones
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const dataService = {
  // Función para autenticación
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      return { success: true, user: response.data };
    } catch (error) {
      console.error('Error en el servicio de login:', error.response?.data?.message || error.message);
      return { success: false, error: error.response?.data?.message || 'Error de autenticación' };
    }
  },

  // Funciones para el perfil del usuario
  getMe: async () => {
    try {
      const response = await apiClient.get('/usuarios/me');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error al obtener el perfil:', error.response?.data?.message || error.message);
      return { success: false, error: 'No se pudo obtener el perfil' };
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.patch('/usuarios/profile', profileData);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error al actualizar el perfil:', error.response?.data?.message || error.message);
      return { success: false, error: 'No se pudo actualizar el perfil' };
    }
  },

  // Ejemplo de una función para obtener todas las novedades
  getNovedades: () => {
    return apiClient.get('/novedades');
  },

  // Obtener una novedad por ID
  getNovedadById: (id) => {
    return apiClient.get(`/novedades/${id}`);
  },

  // Puedes añadir más funciones para otros endpoints aquí
  // Por ejemplo, para líneas de investigación (proyectos)
  getLineasInvestigacion: () => {
    return apiClient.get('/lineas-investigacion');
  },

  getLineaInvestigacionById: (id) => {
    return apiClient.get(`/lineas-investigacion/${id}`);
  },

  createLineaInvestigacion: (data) => {
    return apiClient.post('/lineas-investigacion', data);
  },

  updateLineaInvestigacion: (id, data) => {
    return apiClient.patch(`/lineas-investigacion/${id}`, data);
  },

  deleteLineaInvestigacion: (id) => {
    return apiClient.delete(`/lineas-investigacion/${id}`);
  },

  // Funciones para líneas de extensión
  getLineasExtension: () => {
    return apiClient.get('/lineas-extension');
  },

  getLineaExtensionById: (id) => {
    return apiClient.get(`/lineas-extension/${id}`);
  },

  createLineaExtension: (data) => {
    return apiClient.post('/lineas-extension', data);
  },

  updateLineaExtension: (id, data) => {
    return apiClient.patch(`/lineas-extension/${id}`, data);
  },

  deleteLineaExtension: (id) => {
    return apiClient.delete(`/lineas-extension/${id}`);
  },

  // Funciones para publicaciones
  getPublicaciones: (params) => {
    return apiClient.get('/publicaciones', { params });
  },

  getPublicacionById: (id) => {
    return apiClient.get(`/publicaciones/${id}`);
  },

  createPublicacion: (data) => {
    return apiClient.post('/publicaciones', data);
  },

  updatePublicacion: (id, data) => {
    return apiClient.patch(`/publicaciones/${id}`, data);
  },

  deletePublicacion: (id) => {
    return apiClient.delete(`/publicaciones/${id}`);
  },

  // Funciones para Personas (Equipo)
  getPersonas: () => {
    return apiClient.get('/personas');
  },

  createPersona: (data) => {
    return apiClient.post('/personas', data);
  },

  updatePersona: (id, data) => {
    return apiClient.patch(`/personas/${id}`, data);
  },

  deletePersona: (id) => {
    return apiClient.delete(`/personas/${id}`);
  },

  // Funciones para Proyectos
  getProyectos: () => {
    return apiClient.get('/proyectos');
  },

  createProyecto: (data) => {
    return apiClient.post('/proyectos', data);
  },

  updateProyecto: (id, data) => {
    return apiClient.patch(`/proyectos/${id}`, data);
  },

  deleteProyecto: (id) => {
    return apiClient.delete(`/proyectos/${id}`);
  },

  // Funciones para Galeria
  getGaleria: () => {
    return apiClient.get('/galeria');
  },

  uploadImagen: (formData) => {
    return apiClient.post('/galeria/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  updateImagen: (id, data) => {
    return apiClient.patch(`/galeria/${id}`, data);
  },

  deleteImagen: (id) => {
    return apiClient.delete(`/galeria/${id}`);
  },

  // Funciones para el Dashboard
  getDashboardStats: () => {
    return apiClient.get('/dashboard/stats');
  },

  getRecentActivity: () => {
    return apiClient.get('/dashboard/recent-activity');
  },

  // Funciones para Configuración
  getConfiguracion() {
    return apiClient.get('/configuracion');
  },
  getConfiguracionByClave(clave) {
    return apiClient.get(`/configuracion/clave/${clave}`);
  },
  getValorConfiguracion(clave) {
    return apiClient.get(`/configuracion/valor?clave=${encodeURIComponent(clave)}`);
  },
  updateConfiguracion(id, data) {
    return apiClient.patch(`/configuracion/${id}`, data);
  },
  updateValorConfiguracion(clave, valor) {
    return apiClient.patch(`/configuracion/valor?clave=${encodeURIComponent(clave)}&valor=${encodeURIComponent(valor)}`);
  },
  createConfiguracion(data) {
    return apiClient.post('/configuracion', data);
  },
  deleteConfiguracion(id) {
    return apiClient.delete(`/configuracion/${id}`);
  },
};
