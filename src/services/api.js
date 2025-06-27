import { API_BASE_URL } from "../config/apiConfig"

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Método para obtener headers con autenticación
  getHeaders(includeAuth = false) {
    const headers = {
      "Content-Type": "application/json",
    }

    if (includeAuth) {
      const token = localStorage.getItem("adminToken")
      if (token) {
        headers.Authorization = `Bearer ${token}`
      }
    }

    return headers
  }

  // Método genérico para hacer peticiones
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(options.auth),
          ...options.headers,
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("API Request Error:", error)
      throw error
    }
  }

  // Métodos de autenticación
  async login(credentials) {
    try {
      const response = await this.request("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      })

      return {
        success: true,
        token: response.token || response.accessToken,
        user: response.user || response.data,
      }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        error: error.message,
      }
    }
  }

  async logout() {
    try {
      await this.request("/api/auth/logout", {
        method: "POST",
        auth: true,
      })
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Métodos para gestión de contenido
  async getResearchLines() {
    return this.request("/api/linea-investigacions", { auth: true })
  }

  async createResearchLine(data) {
    return this.request("/api/linea-investigacions", {
      method: "POST",
      body: JSON.stringify(data),
      auth: true,
    })
  }

  async updateResearchLine(id, data) {
    return this.request(`/api/linea-investigacions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      auth: true,
    })
  }

  async deleteResearchLine(id) {
    return this.request(`/api/linea-investigacions/${id}`, {
      method: "DELETE",
      auth: true,
    })
  }

  // Métodos para posts/publicaciones
  async getPosts() {
    return this.request("/api/posts", { auth: true })
  }

  async createPost(data) {
    return this.request("/api/posts", {
      method: "POST",
      body: JSON.stringify(data),
      auth: true,
    })
  }

  async updatePost(id, data) {
    return this.request(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      auth: true,
    })
  }

  async deletePost(id) {
    return this.request(`/api/posts/${id}`, {
      method: "DELETE",
      auth: true,
    })
  }

  // Métodos para extensión
  async getExtensions() {
    return this.request("/api/extensions", { auth: true })
  }

  async createExtension(data) {
    return this.request("/api/extensions", {
      method: "POST",
      body: JSON.stringify(data),
      auth: true,
    })
  }

  async updateExtension(id, data) {
    return this.request(`/api/extensions/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      auth: true,
    })
  }

  async deleteExtension(id) {
    return this.request(`/api/extensions/${id}`, {
      method: "DELETE",
      auth: true,
    })
  }

  // Métodos para equipo/personas
  async getTeamMembers() {
    return this.request("/api/team", { auth: true })
  }

  async createTeamMember(data) {
    return this.request("/api/team", {
      method: "POST",
      body: JSON.stringify(data),
      auth: true,
    })
  }

  async updateTeamMember(id, data) {
    return this.request(`/api/team/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      auth: true,
    })
  }

  async deleteTeamMember(id) {
    return this.request(`/api/team/${id}`, {
      method: "DELETE",
      auth: true,
    })
  }

  // Métodos para galería
  async getGalleryItems() {
    return this.request("/api/gallery", { auth: true })
  }

  async createGalleryItem(data) {
    return this.request("/api/gallery", {
      method: "POST",
      body: JSON.stringify(data),
      auth: true,
    })
  }

  async updateGalleryItem(id, data) {
    return this.request(`/api/gallery/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      auth: true,
    })
  }

  async deleteGalleryItem(id) {
    return this.request(`/api/gallery/${id}`, {
      method: "DELETE",
      auth: true,
    })
  }
}

export const apiService = new ApiService()
