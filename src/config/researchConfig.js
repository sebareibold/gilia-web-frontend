// Configuración centralizada de datos de investigación
// Actualiza estos valores cuando cambien las estadísticas del grupo

export const RESEARCH_STATISTICS = {
  researchLines: {
    value: 7,
    label: "Líneas de Investigación",
    lastUpdated: "2024-01-15",
  },
  researchers: {
    value: 15,
    label: "Investigadores",
    lastUpdated: "2024-01-15",
  },
  publications: {
    value: 50,
    label: "Publicaciones",
    lastUpdated: "2024-01-15",
  },
  activeProjects: {
    value: 10,
    label: "Proyectos Activos",
    lastUpdated: "2024-01-15",
  },
}

// Configuración de textos principales
export const HERO_CONTENT = {
  badge: "Investigación de Vanguardia",
  title: {
    main: "Grupo de Investigación en",
    highlight: "Lenguajes e IA",
  },
  subtitle:
    "Exploramos las fronteras del conocimiento en procesamiento de lenguaje natural, sistemas inteligentes y tecnologías emergentes para construir el futuro de la computación y transformar la manera en que interactuamos con la tecnología.",
  buttons: {
    primary: {
      text: "Explorar Investigación",
      link: "/lineas-de-investigacion",
    },
    secondary: {
      text: "Ver Publicaciones",
      link: "/post",
    },
  },
}

// Función helper para formatear números
export const formatStatValue = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return value.toString()
}
