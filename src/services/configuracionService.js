import apiClient from './apiClient';

const configuracionService = {
  // Obtener todas las configuraciones
  getAll: async () => {
    try {
      const response = await apiClient.get('/configuracion');
      return response.data;
    } catch (error) {
      console.error('Error al obtener configuraciones:', error);
      throw error;
    }
  },

  // Obtener una configuración por su clave
  getByClave: async (clave) => {
    try {
      const response = await apiClient.get(`/configuracion/clave/${clave}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener configuración ${clave}:`, error);
      throw error;
    }
  },

  // Obtener el valor de una configuración por su clave
  getValor: async (clave) => {
    try {
      const response = await apiClient.get(`/configuracion/valor?clave=${clave}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener valor de ${clave}:`, error);
      throw error;
    }
  },

  // Actualizar una configuración existente
  update: async (id, updateData) => {
    try {
      const response = await apiClient.patch(`/configuracion/${id}`, updateData);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar configuración ${id}:`, error);
      throw error;
    }
  },

  // Actualizar el valor de una configuración por su clave
  setValor: async (clave, valor) => {
    try {
      const response = await apiClient.patch(`/configuracion/valor?clave=${clave}&valor=${encodeURIComponent(valor)}`);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar valor de ${clave}:`, error);
      throw error;
    }
  },

  // Crear una nueva configuración
  create: async (configuracionData) => {
    try {
      const response = await apiClient.post('/configuracion', configuracionData);
      return response.data;
    } catch (error) {
      console.error('Error al crear configuración:', error);
      throw error;
    }
  },

  // Eliminar una configuración
  delete: async (id) => {
    try {
      const response = await apiClient.delete(`/configuracion/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al eliminar configuración ${id}:`, error);
      throw error;
    }
  },
};

export default configuracionService;
