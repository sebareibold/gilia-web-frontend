import apiClient from './apiClient';
import { logger } from '../config/environment';

class UsuariosService {
  constructor() {
    this.endpoint = '/usuarios';
  }

  // Obtener todos los usuarios
  async getAll(params = {}) {
    try {
      const response = await apiClient.get(this.endpoint, { params });
      return response.data;
    } catch (error) {
      logger.error('Error getting usuarios:', error);
      throw error;
    }
  }

  // Obtener usuario por ID
  async getById(id) {
    try {
      const response = await apiClient.get(`${this.endpoint}/${id}`);
      return response.data;
    } catch (error) {
      logger.error(`Error getting usuario ${id}:`, error);
      throw error;
    }
  }

  // Crear nuevo usuario
  async create(usuarioData) {
    try {
      const response = await apiClient.post(this.endpoint, usuarioData);
      logger.log('Usuario created successfully');
      return response.data;
    } catch (error) {
      logger.error('Error creating usuario:', error);
      throw error;
    }
  }

  // Actualizar usuario
  async update(id, usuarioData) {
    try {
      const response = await apiClient.patch(`${this.endpoint}/${id}`, usuarioData);
      logger.log(`Usuario ${id} updated successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error updating usuario ${id}:`, error);
      throw error;
    }
  }

  // Eliminar usuario (soft delete)
  async delete(id) {
    try {
      const response = await apiClient.delete(`${this.endpoint}/${id}`);
      logger.log(`Usuario ${id} deleted successfully`);
      return response.data;
    } catch (error) {
      logger.error(`Error deleting usuario ${id}:`, error);
      throw error;
    }
  }

  // Login de usuario
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      
      if (response.data.access_token) {
        localStorage.setItem('authToken', response.data.access_token);
        logger.log('Login successful');
      }
      
      return response.data;
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  // Logout
  async logout() {
    try {
      await apiClient.post('/auth/logout');
      localStorage.removeItem('authToken');
      logger.log('Logout successful');
    } catch (error) {
      logger.error('Logout error:', error);
      // Limpiar token local aunque falle la llamada
      localStorage.removeItem('authToken');
    }
  }

  // Obtener perfil del usuario actual
  async getProfile() {
    try {
      const response = await apiClient.get('/auth/profile');
      return response.data;
    } catch (error) {
      logger.error('Error getting user profile:', error);
      throw error;
    }
  }
}

export const usuariosService = new UsuariosService();
