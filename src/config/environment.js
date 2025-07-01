// Configuración de entorno para determinar fuente de datos
export const ENV_CONFIG = {
  // Determina si usar datos mock o API real
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === "true" || import.meta.env.DEV,

  // URLs de API
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",

  // Configuración de autenticación
  AUTH_ENDPOINT: import.meta.env.VITE_AUTH_ENDPOINT || "/auth",

  // Configuración de desarrollo
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,

  // Configuración de logging
  ENABLE_LOGGING: import.meta.env.VITE_ENABLE_LOGGING === "true" || import.meta.env.DEV,
}

// Logger condicional
export const logger = {
  log: (...args) => {
    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.log("[GILIA]", ...args)
    }
  },
  error: (...args) => {
    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.error("[GILIA ERROR]", ...args)
    }
  },
  warn: (...args) => {
    if (ENV_CONFIG.ENABLE_LOGGING) {
      console.warn("[GILIA WARN]", ...args)
    }
  },
}
