/**
 * Configuración específica para el panel de administración
 * Asegura que el admin siempre use el tema claro sin acceso al modo oscuro
 */

export const adminConfig = {
  // Tema fijo para el admin (siempre claro)
  theme: {
    mode: 'light',
    allowThemeToggle: false,
    defaultColors: {
      primary: '#1890ff',
      secondary: '#52c41a',
      success: '#52c41a',
      warning: '#faad14',
      error: '#f5222d',
      info: '#1890ff',
      background: '#ffffff',
      text: '#000000',
      border: '#d9d9d9'
    }
  },

  // Configuración de rendimiento
  performance: {
    // Lazy loading para componentes pesados
    lazyLoad: true,
    // Debounce para búsquedas
    searchDebounce: 300,
    // Tamaño de página por defecto
    defaultPageSize: 20,
    // Cache de datos
    enableCache: true,
    cacheExpiry: 5 * 60 * 1000 // 5 minutos
  },

  // Configuración de seguridad
  security: {
    // Tiempo de sesión
    sessionTimeout: 30 * 60 * 1000, // 30 minutos
    // Reintentos de login
    maxLoginAttempts: 3,
    // Bloqueo temporal después de intentos fallidos
    lockoutDuration: 15 * 60 * 1000 // 15 minutos
  },

  // Configuración de notificaciones
  notifications: {
    // Tiempo de duración de notificaciones
    duration: 4000,
    // Posición por defecto
    position: 'topRight',
    // Sonidos
    enableSounds: false
  }
};

/**
 * Función para aplicar la configuración del admin
 * @param {Object} config - Configuración a aplicar
 */
export const applyAdminConfig = (config = adminConfig) => {
  // Forzar tema claro en el admin
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.setAttribute('data-admin', 'true');
  }

  // Aplicar estilos específicos del admin
  const adminStyles = `
    [data-admin="true"] {
      --color-bg-primary: ${config.theme.defaultColors.background};
      --color-text-primary: ${config.theme.defaultColors.text};
      --color-border: ${config.theme.defaultColors.border};
      --color-primary: ${config.theme.defaultColors.primary};
    }
  `;

  // Crear o actualizar estilos del admin
  let adminStyleSheet = document.getElementById('admin-styles');
  if (!adminStyleSheet) {
    adminStyleSheet = document.createElement('style');
    adminStyleSheet.id = 'admin-styles';
    document.head.appendChild(adminStyleSheet);
  }
  adminStyleSheet.textContent = adminStyles;
};

/**
 * Hook para usar la configuración del admin en componentes
 * @returns {Object} Configuración del admin
 */
export const useAdminConfig = () => {
  return adminConfig;
};
