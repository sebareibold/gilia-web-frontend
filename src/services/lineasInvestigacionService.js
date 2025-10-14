import apiClient from './apiClient';
import { logger } from '../config/environment';

class LineasInvestigacionService {
  constructor() {
    this.endpoint = '/lineas-investigacion';
  }

  // Obtener todas las líneas de investigación
  async getAll(params = {}) {
    try {
      const response = await apiClient.get(this.endpoint, { params });
      return response.data;
    } catch (error) {
      logger.error('Error getting lineas investigacion:', error);
      throw error;
    }
  }

  // Obtener línea de investigación por ID
  async getById(id) {
    try {
      const response = await apiClient.get(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      logger.error(`Error getting linea investigacion ${id}:`, error);
      throw error;
    }
  }

  // Crear nueva línea de investigación
  async create(lineaData) {
    try {
      const response = await apiClient.post(this.endpoint, lineaData);
      logger.log('Linea investigacion created successfully');
      return response.data;
    } catch (error) {
      logger.error('Error creating linea investigacion:', error);
      throw error;
    }
  }

  // Actualizar línea de investigación
  async update(id, lineaData) {
    try {
      const response = await apiClient.patch(`${this.endpoint}/${id}`, lineaData);
      logger.log(`Linea investigacion ${id} updated successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error updating linea investigacion ${id}:`, error);
      throw error;
    }
  }

  // Eliminar línea de investigación (soft delete)
  async delete(id) {
    try {
      const response = await apiClient.delete(`${this.endpoint}/${id}`);
      logger.log(`Linea investigacion ${id} deleted successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error deleting linea investigacion ${id}:`, error);
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
      logger.error('Error getting lineas investigacion activas:', error);
      throw error;
    }
  }

  // Obtener personas de una línea
  async getPersonas(id) {
    try {
      const response = await apiClient.get(`${this.endpoint}/${id}/personas`);
      return response.data;
    } catch (error) {
      logger.error(`Error getting personas for linea investigacion ${id}:`, error);
      throw error;
    }
  }
}

export const lineasInvestigacionService = new LineasInvestigacionService();
