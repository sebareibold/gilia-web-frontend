import apiClient from './apiClient';
import { logger } from '../config/environment';

class NoticiasService {
  constructor() {
    this.endpoint = '/noticias';
  }

  // Obtener todas las noticias
  async getAll(params = {}) {
    try {
      const response = await apiClient.get(this.endpoint, { params });
      return response.data;
    } catch (error) {
      logger.error('Error getting noticias:', error);
      throw error;
    }
  }

  // Obtener noticia por ID
  async getById(id) {
    try {
      const response = await apiClient.get(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      logger.error(`Error getting noticia ${id}:`, error);
      throw error;
    }
  }

  // Crear nueva noticia
  async create(noticiaData) {
    try {
      const response = await apiClient.post(this.endpoint, noticiaData);
      logger.log('Noticia created successfully');
      return response.data;
    } catch (error) {
      logger.error('Error creating noticia:', error);
      throw error;
    }
  }

  // Actualizar noticia
  async update(id, noticiaData) {
    try {
      const response = await apiClient.patch(`${this.endpoint}/${id}`, noticiaData);
      logger.log(`Noticia ${id} updated successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error updating noticia ${id}:`, error);
      throw error;
    }
  }

  // Eliminar noticia (soft delete)
  async delete(id) {
    try {
      const response = await apiClient.delete(`${this.endpoint}/${id}`);
      logger.log(`Noticia ${id} deleted successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error deleting noticia ${id}:`, error);
      throw error;
    }
  }

  // Obtener noticias activas (dentro del rango de fechas)
  async getActivas() {
    try {
      const response = await apiClient.get(`${this.endpoint}`, {
        params: { activas: true }
      });
      return response.data;
    } catch (error) {
      logger.error('Error getting noticias activas:', error);
      throw error;
    }
  }
}

export const noticiasService = new NoticiasService();
