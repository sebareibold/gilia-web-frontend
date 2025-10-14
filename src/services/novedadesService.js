import apiClient from './apiClient';
import { logger } from '../config/environment';

class NovedadesService {
  constructor() {
    this.endpoint = '/novedades';
  }

  // Obtener todas las novedades
  async getAll(params = {}) {
    try {
      const response = await apiClient.get(this.endpoint, { params });
      return response.data;
    } catch (error) {
      logger.error('Error getting novedades:', error);
      throw error;
    }
  }

  // Obtener novedad por ID
  async getById(id) {
    try {
      const response = await apiClient.get(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      logger.error(`Error getting novedad ${id}:`, error);
      throw error;
    }
  }

  // Crear nueva novedad
  async create(novedadData) {
    try {
      const response = await apiClient.post(this.endpoint, novedadData);
      logger.log('Novedad created successfully');
      return response.data;
    } catch (error) {
      logger.error('Error creating novedad:', error);
      throw error;
    }
  }

  // Actualizar novedad
  async update(id, novedadData) {
    try {
      const response = await apiClient.patch(`${this.endpoint}/${id}`, novedadData);
      logger.log(`Novedad ${id} updated successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error updating novedad ${id}:`, error);
      throw error;
    }
  }

  // Eliminar novedad (soft delete)
  async delete(id) {
    try {
      const response = await apiClient.delete(`${this.endpoint}/${id}`);
      logger.log(`Novedad ${id} deleted successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error deleting novedad ${id}:`, error);
      throw error;
    }
  }

  // Obtener novedades recientes
  async getRecientes(limit = 5) {
    try {
      const response = await apiClient.get(`${this.endpoint}`, {
        params: { 
          limit,
          sort: 'fecha_publicacion',
          order: 'DESC'
        }
      });
      return response.data;
    } catch (error) {
      logger.error('Error getting novedades recientes:', error);
      throw error;
    }
  }
}

export const novedadesService = new NovedadesService();
