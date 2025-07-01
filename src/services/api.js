import { ENV_CONFIG, logger } from "../config/environment"
import { asyncMock } from "../../asyncMock"

// Servicio de API que puede usar asyncMock o una API real
class ApiService {
  constructor() {
    this.baseURL = ENV_CONFIG.API_BASE_URL || "http://localhost:3001"
    this.token = null
    logger.log("ApiService initialized with base URL:", this.baseURL)
  }

  setToken(token) {
    this.token = token
    logger.log("ApiService - Token set")
  }

  getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    }

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`
    }

    return headers
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: this.getHeaders(),
      ...options,
    }

    try {
      logger.log("ApiService - Request:", { method: config.method || "GET", url })

      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      logger.log("ApiService - Response received:", { status: response.status })

      return data
    } catch (error) {
      logger.error("ApiService - Request failed:", error)
      throw error
    }
  }

  // Métodos HTTP básicos
  async get(endpoint, options = {}) {
    const { params, ...restOptions } = options
    let url = endpoint

    if (params) {
      const searchParams = new URLSearchParams(params)
      url += `?${searchParams.toString()}`
    }

    return this.request(url, {
      method: "GET",
      ...restOptions,
    })
  }

  async post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    })
  }

  async put(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      ...options,
    })
  }

  async patch(endpoint, data, options = {}) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
      ...options,
    })
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: "DELETE",
      ...options,
    })
  }

  // Método de login específico
  async login(credentials) {
    try {
      logger.log("ApiService - Login attempt:", { email: credentials.email })

      const response = await this.post(`${ENV_CONFIG.AUTH_ENDPOINT}/login`, credentials)

      if (response.success && response.token) {
        this.setToken(response.token)
        logger.log("ApiService - Login successful")
        return response
      } else {
        throw new Error("Invalid response format")
      }
    } catch (error) {
      logger.error("ApiService - Login error:", error)
      throw error
    }
  }

  // Método de logout
  async logout() {
    try {
      await this.post(`${ENV_CONFIG.AUTH_ENDPOINT}/logout`)
      this.token = null
      logger.log("ApiService - Logout successful")
    } catch (error) {
      logger.error("ApiService - Logout error:", error)
      // No lanzar error en logout, solo limpiar token local
      this.token = null
    }
  }

  // Método para refrescar token
  async refreshToken() {
    try {
      const response = await this.post(`${ENV_CONFIG.AUTH_ENDPOINT}/refresh`)
      if (response.token) {
        this.setToken(response.token)
        return response.token
      }
    } catch (error) {
      logger.error("ApiService - Token refresh failed:", error)
      throw error
    }
  }

  // Método para upload de archivos
  async uploadFile(endpoint, file, metadata = {}) {
    const formData = new FormData()
    formData.append("file", file)

    // Agregar metadata como campos del formulario
    Object.keys(metadata).forEach((key) => {
      formData.append(key, metadata[key])
    })

    return this.request(endpoint, {
      method: "POST",
      body: formData,
      headers: {
        // No establecer Content-Type para FormData, el browser lo hace automáticamente
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
    })
  }

  // Métodos para usar con asyncMock
  async getLineasInvestigacion() {
    try {
      const response = await asyncMock.getLineasInvestigacion()
      return { data: response, success: true }
    } catch (error) {
      console.error("Error al obtener líneas de investigación:", error)
      throw error
    }
  }

  async getPublicaciones() {
    try {
      const response = await asyncMock.getPublicaciones()
      return { data: response, success: true }
    } catch (error) {
      console.error("Error al obtener publicaciones:", error)
      throw error
    }
  }

  async getProyectos() {
    try {
      const response = await asyncMock.getProyectos()
      return { data: response, success: true }
    } catch (error) {
      console.error("Error al obtener proyectos:", error)
      throw error
    }
  }

  async getPersonas() {
    try {
      const response = await asyncMock.getPersonas()
      return { data: response, success: true }
    } catch (error) {
      console.error("Error al obtener personas:", error)
      throw error
    }
  }

  async getExtensiones() {
    try {
      const response = await asyncMock.getExtensiones()
      return { data: response, success: true }
    } catch (error) {
      console.error("Error al obtener extensiones:", error)
      throw error
    }
  }

  async getGaleria() {
    try {
      const response = await asyncMock.getGaleria()
      return { data: response, success: true }
    } catch (error) {
      console.error("Error al obtener galería:", error)
      throw error
    }
  }

  // Métodos CRUD genéricos que podrás usar cuando tengas la API real
  async create(endpoint, data) {
    console.log(`Creando en ${endpoint}:`, data)
    // Por ahora solo simulamos
    return { success: true, data: { ...data, id: Date.now() } }
  }

  async update(endpoint, id, data) {
    console.log(`Actualizando ${endpoint}/${id}:`, data)
    // Por ahora solo simulamos
    return { success: true, data: { ...data, id } }
  }

  async delete(endpoint, id) {
    console.log(`Eliminando ${endpoint}/${id}`)
    // Por ahora solo simulamos
    return { success: true }
  }
}

export const apiService = new ApiService()
