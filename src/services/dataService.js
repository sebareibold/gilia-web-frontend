import { asyncMock } from "../../asyncMock"
import { apiService } from "./api"
import { ENV_CONFIG, logger } from "../config/environment"

/**
 * Servicio de datos que abstrae la fuente de datos (Mock vs API)
 * Usa variables de entorno para determinar qué fuente usar
 */
class DataService {
  constructor() {
    this.useMockData = ENV_CONFIG.USE_MOCK_DATA
    logger.log(`DataService initialized with ${this.useMockData ? "MOCK" : "API"} data source`)
  }

  // ===== AUTENTICACIÓN =====
  async login(email, password) {
    try {
      logger.log("DataService - Login attempt:", { email, useMock: this.useMockData })

      if (this.useMockData) {
        return await asyncMock.simulateBackofficeAccess({ username: email, password })
      } else {
        return await apiService.login({ email, password })
      }
    } catch (error) {
      logger.error("DataService - Login error:", error)
      throw error
    }
  }

  // ===== EQUIPO =====
  async getTeamMembers(filters = {}) {
    try {
      if (this.useMockData) {
        return await asyncMock.getPersonas(filters)
      } else {
        return await apiService.get("/team", { params: filters })
      }
    } catch (error) {
      logger.error("DataService - Error getting team members:", error)
      throw error
    }
  }

  async getTeamMember(id) {
    try {
      if (this.useMockData) {
        return await asyncMock.getPersona(id)
      } else {
        return await apiService.get(`/team/${id}`)
      }
    } catch (error) {
      logger.error("DataService - Error getting team member:", error)
      throw error
    }
  }

  async createTeamMember(data) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateFormSubmission("team-member", data)
      } else {
        return await apiService.post("/team", data)
      }
    } catch (error) {
      logger.error("DataService - Error creating team member:", error)
      throw error
    }
  }

  async updateTeamMember(id, data) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateFormSubmission("team-member-update", { id, ...data })
      } else {
        return await apiService.put(`/team/${id}`, data)
      }
    } catch (error) {
      logger.error("DataService - Error updating team member:", error)
      throw error
    }
  }

  async deleteTeamMember(id) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateUserAction("delete-team-member", { id })
      } else {
        return await apiService.delete(`/team/${id}`)
      }
    } catch (error) {
      logger.error("DataService - Error deleting team member:", error)
      throw error
    }
  }

  // ===== PROYECTOS =====
  async getProjects(filters = {}) {
    try {
      if (this.useMockData) {
        return await asyncMock.getProyectos(filters)
      } else {
        return await apiService.get("/projects", { params: filters })
      }
    } catch (error) {
      logger.error("DataService - Error getting projects:", error)
      throw error
    }
  }

  async getProject(id) {
    try {
      if (this.useMockData) {
        return await asyncMock.getProyecto(id)
      } else {
        return await apiService.get(`/projects/${id}`)
      }
    } catch (error) {
      logger.error("DataService - Error getting project:", error)
      throw error
    }
  }

  async createProject(data) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateFormSubmission("project", data)
      } else {
        return await apiService.post("/projects", data)
      }
    } catch (error) {
      logger.error("DataService - Error creating project:", error)
      throw error
    }
  }

  async updateProject(id, data) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateFormSubmission("project-update", { id, ...data })
      } else {
        return await apiService.put(`/projects/${id}`, data)
      }
    } catch (error) {
      logger.error("DataService - Error updating project:", error)
      throw error
    }
  }

  async deleteProject(id) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateUserAction("delete-project", { id })
      } else {
        return await apiService.delete(`/projects/${id}`)
      }
    } catch (error) {
      logger.error("DataService - Error deleting project:", error)
      throw error
    }
  }

  // ===== LÍNEAS DE INVESTIGACIÓN =====
  async getResearchLines(filters = {}) {
    try {
      if (this.useMockData) {
        return await asyncMock.getLineasInvestigacion(filters)
      } else {
        return await apiService.get("/research-lines", { params: filters })
      }
    } catch (error) {
      logger.error("DataService - Error getting research lines:", error)
      throw error
    }
  }

  async getResearchLine(id) {
    try {
      if (this.useMockData) {
        return await asyncMock.getLineaInvestigacion(id)
      } else {
        return await apiService.get(`/research-lines/${id}`)
      }
    } catch (error) {
      logger.error("DataService - Error getting research line:", error)
      throw error
    }
  }

  async createResearchLine(data) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateFormSubmission("research-line", data)
      } else {
        return await apiService.post("/research-lines", data)
      }
    } catch (error) {
      logger.error("DataService - Error creating research line:", error)
      throw error
    }
  }

  async updateResearchLine(id, data) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateFormSubmission("research-line-update", { id, ...data })
      } else {
        return await apiService.put(`/research-lines/${id}`, data)
      }
    } catch (error) {
      logger.error("DataService - Error updating research line:", error)
      throw error
    }
  }

  async deleteResearchLine(id) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateUserAction("delete-research-line", { id })
      } else {
        return await apiService.delete(`/research-lines/${id}`)
      }
    } catch (error) {
      logger.error("DataService - Error deleting research line:", error)
      throw error
    }
  }

  // ===== PUBLICACIONES =====
  async getPublications(filters = {}) {
    try {
      if (this.useMockData) {
        return await asyncMock.getPublicaciones(filters)
      } else {
        return await apiService.get("/publications", { params: filters })
      }
    } catch (error) {
      logger.error("DataService - Error getting publications:", error)
      throw error
    }
  }

  async getPublication(id) {
    try {
      if (this.useMockData) {
        return await asyncMock.getPublicacion(id)
      } else {
        return await apiService.get(`/publications/${id}`)
      }
    } catch (error) {
      logger.error("DataService - Error getting publication:", error)
      throw error
    }
  }

  async createPublication(data) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateFormSubmission("publication", data)
      } else {
        return await apiService.post("/publications", data)
      }
    } catch (error) {
      logger.error("DataService - Error creating publication:", error)
      throw error
    }
  }

  async updatePublication(id, data) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateFormSubmission("publication-update", { id, ...data })
      } else {
        return await apiService.put(`/publications/${id}`, data)
      }
    } catch (error) {
      logger.error("DataService - Error updating publication:", error)
      throw error
    }
  }

  async deletePublication(id) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateUserAction("delete-publication", { id })
      } else {
        return await apiService.delete(`/publications/${id}`)
      }
    } catch (error) {
      logger.error("DataService - Error deleting publication:", error)
      throw error
    }
  }

  // ===== GALERÍA =====
  async getGalleryItems(filters = {}) {
    try {
      if (this.useMockData) {
        return await asyncMock.getGaleria(filters)
      } else {
        return await apiService.get("/gallery", { params: filters })
      }
    } catch (error) {
      logger.error("DataService - Error getting gallery items:", error)
      throw error
    }
  }

  async getGalleryItem(id) {
    try {
      if (this.useMockData) {
        return await asyncMock.getGaleriaItem(id)
      } else {
        return await apiService.get(`/gallery/${id}`)
      }
    } catch (error) {
      logger.error("DataService - Error getting gallery item:", error)
      throw error
    }
  }

  async uploadGalleryItem(data) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateFormSubmission("gallery-upload", data)
      } else {
        return await apiService.post("/gallery", data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      }
    } catch (error) {
      logger.error("DataService - Error uploading gallery item:", error)
      throw error
    }
  }

  async updateGalleryItem(id, data) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateFormSubmission("gallery-update", { id, ...data })
      } else {
        return await apiService.put(`/gallery/${id}`, data)
      }
    } catch (error) {
      logger.error("DataService - Error updating gallery item:", error)
      throw error
    }
  }

  async deleteGalleryItem(id) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateUserAction("delete-gallery-item", { id })
      } else {
        return await apiService.delete(`/gallery/${id}`)
      }
    } catch (error) {
      logger.error("DataService - Error deleting gallery item:", error)
      throw error
    }
  }

  // ===== LÍNEAS DE EXTENSIÓN =====
  async getExtensionLines(filters = {}) {
    try {
      if (this.useMockData) {
        return await asyncMock.getLineasExtension(filters)
      } else {
        return await apiService.get("/extension-lines", { params: filters })
      }
    } catch (error) {
      logger.error("DataService - Error getting extension lines:", error)
      throw error
    }
  }

  async getExtensionLine(id) {
    try {
      if (this.useMockData) {
        return await asyncMock.getLineaExtension(id)
      } else {
        return await apiService.get(`/extension-lines/${id}`)
      }
    } catch (error) {
      logger.error("DataService - Error getting extension line:", error)
      throw error
    }
  }

  // ===== CONFIGURACIÓN =====
  async getSystemConfig() {
    try {
      if (this.useMockData) {
        return await asyncMock.getGlobal()
      } else {
        return await apiService.get("/config")
      }
    } catch (error) {
      logger.error("DataService - Error getting system config:", error)
      throw error
    }
  }

  async updateSystemConfig(data) {
    try {
      if (this.useMockData) {
        return await asyncMock.simulateFormSubmission("system-config", data)
      } else {
        return await apiService.put("/config", data)
      }
    } catch (error) {
      logger.error("DataService - Error updating system config:", error)
      throw error
    }
  }

  // ===== ESTADÍSTICAS =====
  async getStatistics() {
    try {
      if (this.useMockData) {
        return await asyncMock.getEstadisticas()
      } else {
        return await apiService.get("/statistics")
      }
    } catch (error) {
      logger.error("DataService - Error getting statistics:", error)
      throw error
    }
  }

  // ===== BÚSQUEDA GLOBAL =====
  async globalSearch(query, filters = {}) {
    try {
      if (this.useMockData) {
        return await asyncMock.searchGlobal(query, filters)
      } else {
        return await apiService.get("/search", { params: { q: query, ...filters } })
      }
    } catch (error) {
      logger.error("DataService - Error in global search:", error)
      throw error
    }
  }

  // ===== INFORMACIÓN PÚBLICA =====
  async getAboutInfo() {
    try {
      if (this.useMockData) {
        return await asyncMock.getAbout()
      } else {
        return await apiService.get("/about")
      }
    } catch (error) {
      logger.error("DataService - Error getting about info:", error)
      throw error
    }
  }

  async getObjectives() {
    try {
      if (this.useMockData) {
        return await asyncMock.getObjetivos()
      } else {
        return await apiService.get("/objectives")
      }
    } catch (error) {
      logger.error("DataService - Error getting objectives:", error)
      throw error
    }
  }

  async getNews(filters = {}) {
    try {
      if (this.useMockData) {
        return await asyncMock.getNovedades(filters)
      } else {
        return await apiService.get("/news", { params: filters })
      }
    } catch (error) {
      logger.error("DataService - Error getting news:", error)
      throw error
    }
  }

  async getNewsItem(id) {
    try {
      if (this.useMockData) {
        return await asyncMock.getNovedad(id)
      } else {
        return await apiService.get(`/news/${id}`)
      }
    } catch (error) {
      logger.error("DataService - Error getting news item:", error)
      throw error
    }
  }
}

// Exportar instancia singleton
export const dataService = new DataService()
