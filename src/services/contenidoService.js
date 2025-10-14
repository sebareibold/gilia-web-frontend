import apiClient from './apiClient';
import { logger } from '../config/environment';

class ContenidoService {
  constructor() {
    this.endpoint = '/contenido';
  }

  // Obtener todo el contenido
  async getAll(params = {}) {
    try {
      const response = await apiClient.get(this.endpoint, { params });
      return response.data;
    } catch (error) {
      logger.error('Error getting contenido:', error);
      throw error;
    }
  }

  // Obtener contenido por ID
  async getById(id) {
    try {
      const response = await apiClient.get(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      logger.error(`Error getting contenido ${id}:`, error);
      throw error;
    }
  }

  // Crear nuevo contenido
  async create(contenidoData) {
    try {
      const response = await apiClient.post(this.endpoint, contenidoData);
      logger.log('Contenido created successfully');
      return response.data;
    } catch (error) {
      logger.error('Error creating contenido:', error);
      throw error;
    }
  }

  // Actualizar contenido
  async update(id, contenidoData) {
    try {
      const response = await apiClient.patch(`${this.endpoint}/${id}`, contenidoData);
      logger.log(`Contenido ${id} updated successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error updating contenido ${id}:`, error);
      throw error;
    }
  }

  // Eliminar contenido (soft delete)
  async delete(id) {
    try {
      const response = await apiClient.delete(`${this.endpoint}/${id}`);
      logger.log(`Contenido ${id} deleted successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error deleting contenido ${id}:`, error);
      throw error;
    }
  }

  // Upload de archivo
  async uploadFile(file, metadata = {}) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Agregar metadata
      Object.keys(metadata).forEach(key => {
        formData.append(key, metadata[key]);
      });

      const response = await apiClient.post(`${this.endpoint}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      logger.log('File uploaded successfully');
      return response.data;
    } catch (error) {
      logger.error('Error uploading file:', error);
      throw error;
    }
  }
}

export const contenidoService = new ContenidoService();
