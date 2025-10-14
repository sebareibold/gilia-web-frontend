import apiClient from './apiClient';
import { logger } from '../config/environment';

class PersonasService {
  constructor() {
    this.endpoint = '/personas';
  }

  // Obtener todas las personas
  async getAll(params = {}) {
    try {
      const response = await apiClient.get(this.endpoint, { params });
      return response.data;
    } catch (error) {
      logger.error('Error getting personas:', error);
      throw error;
    }
  }

  // Obtener persona por ID
  async getById(id) {
    try {
      const response = await apiClient.get(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      logger.error(`Error getting persona ${id}:`, error);
      throw error;
    }
  }

  // Crear nueva persona
  async create(personaData) {
    try {
      const response = await apiClient.post(this.endpoint, personaData);
      logger.log('Persona created successfully');
      return response.data;
    } catch (error) {
      logger.error('Error creating persona:', error);
      throw error;
    }
  }

  // Actualizar persona
  async update(id, personaData) {
    try {
      const response = await apiClient.patch(`${this.endpoint}/${id}`, personaData);
      logger.log(`Persona ${id} updated successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error updating persona ${id}:`, error);
      throw error;
    }
  }

  // Eliminar persona (soft delete)
  async delete(id) {
    try {
      const response = await apiClient.delete(`${this.endpoint}/${id}`);
      logger.log(`Persona ${id} deleted successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error deleting persona ${id}:`, error);
      throw error;
    }
  }

  // Obtener personas por línea de investigación
  async getByLineaInvestigacion(lineaId) {
    try {
      const response = await apiClient.get(`${this.endpoint}`, {
        params: { linea_investigacion: lineaId }
      });
      return response.data;
    } catch (error) {
      logger.error(`Error getting personas by linea investigacion ${lineaId}:`, error);
      throw error;
    }
  }

  // Obtener personas por línea de extensión
  async getByLineaExtension(lineaId) {
    try {
      const response = await apiClient.get(`${this.endpoint}`, {
        params: { linea_extension: lineaId }
      });
      return response.data;
    } catch (error) {
      logger.error(`Error getting personas by linea extension ${lineaId}:`, error);
      throw error;
    }
  }

  // Buscar personas por nombre o apellido
  async search(query) {
    try {
      const response = await apiClient.get(`${this.endpoint}`, {
        params: { search: query }
      });
      return response.data;
    } catch (error) {
      logger.error(`Error searching personas with query "${query}":`, error);
      throw error;
    }
  }
}

export const personasService = new PersonasService();
