/**
 * Servicio de datos para componentes admin.
 * Placeholder con funciones que retornan datos vacios hasta que se conecte el backend real.
 * Se usa en AdminGallery y AdminSettings.
 */

export const dataService = {
  // Galeria
  getGaleria: async () => ({ data: [] }),
  uploadImagen: async () => ({ data: {} }),
  updateImagen: async () => ({ data: {} }),
  deleteImagen: async () => ({ data: {} }),

  // Configuracion
  getConfiguracion: async () => ({ data: {} }),
  updateConfiguracion: async () => ({ data: {} }),

  // Perfil de usuario
  getMe: async () => ({ data: {} }),
  updateProfile: async () => ({ data: {} }),
};
