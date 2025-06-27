import { asyncMock } from "../../asyncMock"

// Simulamos un servicio de API que usa asyncMock
class ApiService {
  constructor() {
    // En Vite, las variables de entorno se acceden con import.meta.env
    // y deben tener el prefijo VITE_
    this.baseURL = import.meta.env.VITE_API_URL || "http://localhost:3001"
    this.token = null
  }

  setToken(token) {
    this.token = token
  }

  // Método de login usando asyncMock
  async login(credentials) {
    try {
      console.log("ApiService - Intentando login con:", credentials)

      // Simulamos validación de credenciales
      if (credentials.email === "admin" && credentials.password === "admin123") {
        const mockResponse = {
          success: true,
          token: "mock-jwt-token-" + Date.now(),
          user: {
            id: "1",
            email: credentials.email,
            role: "admin",
            name: "Administrador",
          },
        }

        console.log("ApiService - Login exitoso:", mockResponse)
        return mockResponse
      } else {
        throw new Error("Credenciales inválidas")
      }
    } catch (error) {
      console.error("ApiService - Error en login:", error)
      throw error
    }
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

  // Método para obtener estadísticas del dashboard
  async getDashboardStats() {
    try {
      const [lineas, publicaciones, proyectos, personas, extensiones, galeria] = await Promise.all([
        this.getLineasInvestigacion(),
        this.getPublicaciones(),
        this.getProyectos(),
        this.getPersonas(),
        this.getExtensiones(),
        this.getGaleria(),
      ])

      return {
        success: true,
        data: {
          lineasInvestigacion: lineas.data?.length || 0,
          publicaciones: publicaciones.data?.length || 0,
          proyectos: proyectos.data?.length || 0,
          miembros: personas.data?.length || 0,
          extensiones: extensiones.data?.length || 0,
          imagenes: galeria.data?.length || 0,
        },
      }
    } catch (error) {
      console.error("Error al obtener estadísticas:", error)
      return {
        success: false,
        data: {
          lineasInvestigacion: 0,
          publicaciones: 0,
          proyectos: 0,
          miembros: 0,
          extensiones: 0,
          imagenes: 0,
        },
      }
    }
  }
}

export const apiService = new ApiService()
