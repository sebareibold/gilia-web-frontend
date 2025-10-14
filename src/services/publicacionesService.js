import apiClient from './apiClient';
import { logger } from '../config/environment';

class PublicacionesService {
  constructor() {
    this.endpoint = '/publicaciones';
  }

  // Obtener todas las publicaciones
  async getAll(params = {}) {
    try {
      const response = await apiClient.get(this.endpoint, { params });
      return response.data;
    } catch (error) {
      logger.error('Error getting publicaciones:', error);
      throw error;
    }
  }

  // Obtener publicación por ID
  async getById(id) {
    try {
      const response = await apiClient.get(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      logger.error(`Error getting publicacion ${id}:`, error);
      throw error;
    }
  }

  // Crear nueva publicación
  async create(publicacionData) {
    try {
      const response = await apiClient.post(this.endpoint, publicacionData);
      logger.log('Publicacion created successfully');
      return response.data;
    } catch (error) {
      logger.error('Error creating publicacion:', error);
      throw error;
    }
  }

  // Actualizar publicación
  async update(id, publicacionData) {
    try {
      const response = await apiClient.patch(`${this.endpoint}/${id}`, publicacionData);
      logger.log(`Publicacion ${id} updated successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error updating publicacion ${id}:`, error);
      throw error;
    }
  }

  // Eliminar publicación (soft delete)
  async delete(id) {
    try {
      const response = await apiClient.delete(`${this.endpoint}/${id}`);
      logger.log(`Publicacion ${id} deleted successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error deleting publicacion ${id}:`, error);
      throw error;
    }
  }

  // Obtener publicaciones por autor
  async getByAutor(autorId) {
    try {
      const response = await apiClient.get(`${this.endpoint}`, {
        params: { autor: autorId }
      });
      return response.data;
    } catch (error) {
      logger.error(`Error getting publicaciones by autor ${autorId}:`, error);
      throw error;
    }
  }

  // Obtener publicaciones por año
  async getByYear(year) {
    try {
      const response = await apiClient.get(`${this.endpoint}`, {
        params: { year }
      });
      return response.data;
    } catch (error) {
      logger.error(`Error getting publicaciones by year ${year}:`, error);
      throw error;
    }
  }

  // Buscar publicaciones
  async search(query) {
    try {
      const response = await apiClient.get(`${this.endpoint}`, {
        params: { search: query }
      });
      return response.data;
    } catch (error) {
      logger.error(`Error searching publicaciones with query "${query}":`, error);
      throw error;
    }
  }
}

export const publicacionesService = new PublicacionesService();
