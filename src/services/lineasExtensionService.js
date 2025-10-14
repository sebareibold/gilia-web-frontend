import apiClient from './apiClient';
import { logger } from '../config/environment';

class LineasExtensionService {
  constructor() {
    this.endpoint = '/lineas-extension';
  }

  // Obtener todas las líneas de extensión
  async getAll(params = {}) {
    try {
      const response = await apiClient.get(this.endpoint, { params });
      return response.data;
    } catch (error) {
      logger.error('Error getting lineas extension:', error);
      throw error;
    }
  }

  // Obtener línea de extensión por ID
  async getById(id) {
    try {
      const response = await apiClient.get(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      logger.error(`Error getting linea extension ${id}:`, error);
      throw error;
    }
  }

  // Crear nueva línea de extensión
  async create(lineaData) {
    try {
      const response = await apiClient.post(this.endpoint, lineaData);
      logger.log('Linea extension created successfully');
      return response.data;
    } catch (error) {
      logger.error('Error creating linea extension:', error);
      throw error;
    }
  }

  // Actualizar línea de extensión
  async update(id, lineaData) {
    try {
      const response = await apiClient.patch(`${this.endpoint}/${id}`, lineaData);
      logger.log(`Linea extension ${id} updated successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error updating linea extension ${id}:`, error);
      throw error;
    }
  }

  // Eliminar línea de extensión (soft delete)
  async delete(id) {
    try {
      const response = await apiClient.delete(`${this.endpoint}/${id}`);
      logger.log(`Linea extension ${id} deleted successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error deleting linea extension ${id}:`, error);
      throw error;
    }
  }

  // Obtener líneas activas
  async getActivas() {
    try {
      const response = await apiClient.get(`${this.endpoint}`, {
        params: { estado: 'activa' }
      });
      return response.data;
    } catch (error) {
      logger.error('Error getting lineas extension activas:', error);
      throw error;
    }
  }

  // Obtener personas de una línea
  async getPersonas(id) {
    try {
      const response = await apiClient.get(`${this.endpoint}/${id}/personas`);
      return response.data;
    } catch (error) {
      logger.error(`Error getting personas for linea extension ${id}:`, error);
      throw error;
    }
  }
}

export const lineasExtensionService = new LineasExtensionService();
