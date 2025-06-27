// Mock de datos para simular respuestas de API
const mockData = {
  lineasInvestigacion: [
    {
      id: 1,
      nombre: "Ontologías y Web Semántica",
      descripcion: "Investigación en tecnologías semánticas y ontologías para la web",
      coordinador: "Dr. Juan Pérez",
      miembros: ["Ana García", "Carlos López"],
      proyectos: ["Proyecto A", "Proyecto B"],
      publicaciones: 15,
      estado: "activa",
    },
    {
      id: 2,
      nombre: "Procesamiento de Lenguaje Natural",
      descripcion: "Desarrollo de algoritmos para el procesamiento automático del lenguaje",
      coordinador: "Dra. María González",
      miembros: ["Pedro Martín", "Laura Sánchez"],
      proyectos: ["Proyecto C"],
      publicaciones: 12,
      estado: "activa",
    },
    {
      id: 3,
      nombre: "Sistemas Inteligentes",
      descripcion: "Investigación en inteligencia artificial y sistemas expertos",
      coordinador: "Dr. Roberto Silva",
      miembros: ["Elena Ruiz", "Miguel Torres"],
      proyectos: ["Proyecto D", "Proyecto E"],
      publicaciones: 20,
      estado: "activa",
    },
  ],

  publicaciones: [
    {
      id: 1,
      titulo: "Advances in Semantic Web Technologies",
      autores: ["Dr. Juan Pérez", "Ana García"],
      revista: "Journal of Web Semantics",
      año: 2023,
      tipo: "artículo",
      lineaInvestigacion: 1,
    },
    {
      id: 2,
      titulo: "Natural Language Processing in Spanish",
      autores: ["Dra. María González", "Pedro Martín"],
      revista: "Computational Linguistics",
      año: 2023,
      tipo: "artículo",
      lineaInvestigacion: 2,
    },
  ],

  proyectos: [
    {
      id: 1,
      nombre: "Proyecto A",
      descripcion: "Desarrollo de ontologías para el dominio médico",
      fechaInicio: "2023-01-01",
      fechaFin: "2024-12-31",
      estado: "en_progreso",
      presupuesto: 50000,
      lineaInvestigacion: 1,
    },
    {
      id: 2,
      nombre: "Proyecto B",
      descripcion: "Plataforma web semántica para educación",
      fechaInicio: "2023-06-01",
      fechaFin: "2024-05-31",
      estado: "en_progreso",
      presupuesto: 75000,
      lineaInvestigacion: 1,
    },
  ],

  personas: [
    {
      id: 1,
      nombre: "Dr. Juan Pérez",
      cargo: "Director",
      email: "juan.perez@universidad.edu",
      telefono: "+54 11 1234-5678",
      especialidad: "Web Semántica",
      biografia: "Doctor en Ciencias de la Computación con especialización en tecnologías semánticas",
    },
    {
      id: 2,
      nombre: "Dra. María González",
      cargo: "Investigadora Principal",
      email: "maria.gonzalez@universidad.edu",
      telefono: "+54 11 2345-6789",
      especialidad: "Procesamiento de Lenguaje Natural",
      biografia: "Doctora en Lingüística Computacional",
    },
  ],

  extensiones: [
    {
      id: 1,
      nombre: "Capacitación en Tecnologías Web",
      descripcion: "Programa de capacitación para empresas locales",
      fechaInicio: "2023-03-01",
      fechaFin: "2023-11-30",
      beneficiarios: 150,
      estado: "activo",
    },
  ],

  galeria: [
    {
      id: 1,
      titulo: "Conferencia Internacional 2023",
      descripcion: "Imágenes del evento anual",
      fecha: "2023-10-15",
      imagenes: ["/imagenRandom.png", "/humano.png"],
    },
  ],

  novedades: [
    {
      id: 1,
      titulo: "Nueva publicación en revista internacional",
      contenido: "El equipo ha publicado un nuevo artículo sobre web semántica",
      fecha: "2023-11-01",
      tipo: "publicacion",
    },
  ],

  objetivos: [
    {
      id: 1,
      titulo: "Excelencia en Investigación",
      descripcion: "Mantener los más altos estándares de calidad en investigación",
      tipo: "general",
    },
  ],

  about: {
    mision: "Desarrollar investigación de excelencia en ciencias de la computación",
    vision: "Ser un referente en investigación tecnológica",
    historia: "Fundado en 2010, el grupo ha crecido constantemente",
  },

  global: {
    nombreGrupo: "GILIA",
    universidad: "Universidad Nacional",
    direccion: "Av. Universidad 123, Ciudad",
    telefono: "+54 11 1234-5678",
    email: "contacto@gilia.edu",
  },
}

// Simulación de delays de red
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Simulación de respuestas exitosas y errores
const simulateNetworkResponse = async (data, shouldFail = false) => {
  await delay(Math.random() * 1000 + 500) // 500-1500ms delay

  if (shouldFail) {
    throw new Error("Error de red simulado")
  }

  return {
    success: true,
    data: data,
    timestamp: new Date().toISOString(),
  }
}

// API Mock
const asyncMock = {
  // Líneas de investigación
  getLineasInvestigacion: () => simulateNetworkResponse(mockData.lineasInvestigacion),
  getLineaInvestigacion: (id) => {
    const linea = mockData.lineasInvestigacion.find((l) => l.id === Number.parseInt(id))
    return simulateNetworkResponse(linea)
  },

  // Publicaciones
  getPublicaciones: () => simulateNetworkResponse(mockData.publicaciones),
  getPublicacion: (id) => {
    const publicacion = mockData.publicaciones.find((p) => p.id === Number.parseInt(id))
    return simulateNetworkResponse(publicacion)
  },

  // Proyectos
  getProyectos: () => simulateNetworkResponse(mockData.proyectos),
  getProyecto: (id) => {
    const proyecto = mockData.proyectos.find((p) => p.id === Number.parseInt(id))
    return simulateNetworkResponse(proyecto)
  },

  // Personas
  getPersonas: () => simulateNetworkResponse(mockData.personas),
  getPersona: (id) => {
    const persona = mockData.personas.find((p) => p.id === Number.parseInt(id))
    return simulateNetworkResponse(persona)
  },

  // Extensiones
  getLineasExtension: () => simulateNetworkResponse(mockData.extensiones),
  getLineaExtension: (id) => {
    const extension = mockData.extensiones.find((e) => e.id === Number.parseInt(id))
    return simulateNetworkResponse(extension)
  },

  // Galería
  getGaleria: () => simulateNetworkResponse(mockData.galeria),

  // Novedades
  getNovedades: () => simulateNetworkResponse(mockData.novedades),
  getNovedad: (id) => {
    const novedad = mockData.novedades.find((n) => n.id === Number.parseInt(id))
    return simulateNetworkResponse(novedad)
  },

  // Objetivos
  getObjetivos: () => simulateNetworkResponse(mockData.objetivos),
  getObjetivo: (id) => {
    const objetivo = mockData.objetivos.find((o) => o.id === Number.parseInt(id))
    return simulateNetworkResponse(objetivo)
  },

  // About
  getAbout: () => simulateNetworkResponse(mockData.about),

  // Global
  getGlobal: () => simulateNetworkResponse(mockData.global),

  // Estadísticas
  getEstadisticas: () => {
    const stats = {
      lineasInvestigacion: mockData.lineasInvestigacion.length,
      publicaciones: mockData.publicaciones.length,
      proyectos: mockData.proyectos.length,
      miembros: mockData.personas.length,
      extensiones: mockData.extensiones.length,
      imagenes: mockData.galeria.reduce((acc, item) => acc + item.imagenes.length, 0),
    }
    return simulateNetworkResponse(stats)
  },

  // Autenticación
  simulateBackofficeAccess: async (credentials) => {
    await delay(1000)

    if (credentials.email === "admin@gilia.edu" && credentials.password === "admin123") {
      return {
        success: true,
        token: "mock-jwt-token-" + Date.now(),
        user: {
          id: "1",
          email: credentials.email,
          role: "admin",
          name: "Administrador GILIA",
        },
      }
    } else {
      throw new Error("Credenciales inválidas")
    }
  },

  // Operaciones CRUD simuladas
  simulateFormSubmission: async (type, data) => {
    await delay(800)
    console.log(`Simulando creación de ${type}:`, data)
    return {
      success: true,
      data: { ...data, id: Date.now() },
      message: `${type} creado exitosamente`,
    }
  },

  simulateUserAction: async (action, data) => {
    await delay(600)
    console.log(`Simulando acción ${action}:`, data)
    return {
      success: true,
      data: data,
      message: `Acción ${action} completada`,
    }
  },

  // Búsqueda global
  searchGlobal: async (query, filters = {}) => {
    await delay(500)

    const results = []
    const searchTerm = query.toLowerCase()

    // Buscar en líneas de investigación
    mockData.lineasInvestigacion.forEach((linea) => {
      if (linea.nombre.toLowerCase().includes(searchTerm) || linea.descripcion.toLowerCase().includes(searchTerm)) {
        results.push({
          type: "linea_investigacion",
          id: linea.id,
          title: linea.nombre,
          description: linea.descripcion,
          url: `/lineas-de-investigacion/${linea.id}`,
        })
      }
    })

    // Buscar en publicaciones
    mockData.publicaciones.forEach((pub) => {
      if (pub.titulo.toLowerCase().includes(searchTerm)) {
        results.push({
          type: "publicacion",
          id: pub.id,
          title: pub.titulo,
          description: `Autores: ${pub.autores.join(", ")}`,
          url: `/publicaciones/${pub.id}`,
        })
      }
    })

    return simulateNetworkResponse(results)
  },
}

export default asyncMock
