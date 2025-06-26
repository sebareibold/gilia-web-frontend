// Async mock for simulating backend interactions with comprehensive data
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock data for research lines with detailed information
const mockResearchLines = [
  {
    id: 1,
    nombre: "Ontologías y Web Semántica",
    descripcion: `# Ontologías y Web Semántica

La investigación en **Ontologías y Web Semántica** se concentra en cómo organizar y representar el conocimiento de manera que las máquinas puedan procesarlo y comprenderlo de forma más eficaz.

## Objetivos de Investigación

- Desarrollo de ontologías para dominios específicos
- Implementación de sistemas de razonamiento semántico
- Creación de herramientas para la Web Semántica
- Investigación en linked data y knowledge graphs

## Tecnologías Principales

- **RDF** (Resource Description Framework)
- **OWL** (Web Ontology Language)  
- **SPARQL** para consultas semánticas
- **Protégé** para modelado de ontologías`,
    autor: "Dr. García",
    people: [
      { id: 1, full_name: "Dr. Miguel García", role_person: "Director" },
      { id: 2, full_name: "Lic. Ana Martínez", role_person: "Investigador" },
      { id: 3, full_name: "Carlos López", role_person: "Becario" },
    ],
    proyectos: [
      {
        id: 1,
        nombre: "Sistema de Ontologías Médicas",
        descripcion: "Desarrollo de ontologías para el dominio médico con integración a sistemas hospitalarios",
      },
      {
        id: 2,
        nombre: "Web Semántica Educativa",
        descripcion: "Aplicación de tecnologías semánticas en plataformas educativas",
      },
    ],
  },
  {
    id: 2,
    nombre: "Procesamiento de Lenguaje Natural",
    descripcion: `# Procesamiento de Lenguaje Natural

El **Procesamiento del Lenguaje Natural (PLN)** es una disciplina dentro de la inteligencia artificial que se dedica a la interacción entre las computadoras y el lenguaje humano.

## Áreas de Investigación

- Análisis sintáctico y semántico de textos
- Modelos de lenguaje neurales
- Traducción automática
- Análisis de sentimientos
- Generación de texto natural

## Aplicaciones Desarrolladas

- Chatbots inteligentes
- Sistemas de recomendación
- Análisis de redes sociales
- Herramientas de traducción`,
    autor: "Dra. Martínez",
    people: [
      { id: 4, full_name: "Dra. María Martínez", role_person: "Director" },
      { id: 5, full_name: "Ing. Juan Pérez", role_person: "Investigador" },
      { id: 6, full_name: "Lic. Sofia Rodríguez", role_person: "Colaborador" },
    ],
    proyectos: [
      {
        id: 3,
        nombre: "Análisis de Sentimientos",
        descripcion: "Sistema de análisis de emociones en texto usando deep learning",
      },
      {
        id: 4,
        nombre: "Traductor Automático",
        descripcion: "Modelo de traducción neuronal para idiomas locales",
      },
    ],
  },
  {
    id: 3,
    nombre: "Sistemas Inteligentes",
    descripcion: `# Sistemas Inteligentes

Los **Sistemas Inteligentes** integran técnicas de inteligencia artificial para simular comportamientos inteligentes que resuelvan problemas complejos de manera autónoma.

## Líneas de Trabajo

- Machine Learning y Deep Learning
- Sistemas expertos
- Algoritmos evolutivos
- Redes neuronales artificiales
- Sistemas de recomendación

## Metodologías

- Aprendizaje supervisado y no supervisado
- Reinforcement learning
- Transfer learning
- Ensemble methods`,
    autor: "Dr. López",
    people: [
      { id: 7, full_name: "Dr. Carlos López", role_person: "Director" },
      { id: 8, full_name: "Ing. Laura González", role_person: "Investigador" },
      { id: 9, full_name: "Lic. Roberto Silva", role_person: "Colaborador" },
    ],
    proyectos: [
      {
        id: 5,
        nombre: "Sistema Experto Médico",
        descripcion: "IA para diagnóstico médico asistido con explicabilidad",
      },
      {
        id: 6,
        nombre: "Optimización Inteligente",
        descripcion: "Algoritmos evolutivos para problemas de optimización complejos",
      },
    ],
  },
  {
    id: 4,
    nombre: "Robótica y Sistemas Embebidos",
    descripcion: `# Robótica y Sistemas Embebidos

Investigación en el diseño, desarrollo y control de **robots autónomos** y **sistemas embebidos** para aplicaciones industriales y educativas.

## Áreas de Desarrollo

- Robótica móvil autónoma
- Internet de las Cosas (IoT)
- Sistemas de control inteligente
- Visión por computadora
- Sensores y actuadores

## Plataformas Utilizadas

- Arduino y Raspberry Pi
- ROS (Robot Operating System)
- Microcontroladores ARM
- Sensores LIDAR y cámaras`,
    autor: "Ing. Fernández",
    people: [
      { id: 10, full_name: "Ing. Pedro Fernández", role_person: "Director" },
      { id: 11, full_name: "Lic. Carmen Ruiz", role_person: "Investigador" },
    ],
    proyectos: [
      {
        id: 7,
        nombre: "Robot Educativo",
        descripcion: "Desarrollo de robot para enseñanza de programación",
      },
      {
        id: 8,
        nombre: "Sistema IoT Agrícola",
        descripcion: "Monitoreo inteligente de cultivos con sensores",
      },
    ],
  },
]

// Enhanced mock data for news/novedades
const mockNews = [
  {
    id: 1,
    Titulo: "Nueva Publicación en Revista Internacional de IA",
    Descripcion:
      "Nuestro equipo ha publicado un artículo sobre procesamiento de lenguaje natural en la revista IEEE Transactions on AI, destacando avances en modelos de comprensión de texto en español.",
    Enlace: "#",
    fecha: "2024-01-15",
  },
  {
    id: 2,
    Titulo: "Participación en Conferencia Mundial de Inteligencia Artificial",
    Descripcion:
      "Presentación de tres ponencias magistrales en la conferencia ICAI 2024, incluyendo trabajos sobre ética en IA, sistemas inteligentes y robótica educativa.",
    Enlace: "#",
    fecha: "2024-01-10",
  },
  {
    id: 3,
    Titulo: "Nuevo Proyecto Internacional de Investigación",
    Descripcion:
      "Inicio de proyecto colaborativo con universidades de Brasil y Chile sobre sistemas inteligentes adaptativos, financiado por el programa Horizon Europe.",
    Enlace: "#",
    fecha: "2024-01-05",
  },
  {
    id: 4,
    Titulo: "Premio a la Innovación Tecnológica",
    Descripcion:
      "Reconocimiento nacional por el desarrollo de un sistema de traducción automática español-guaraní, promoviendo la preservación de lenguas originarias.",
    Enlace: "#",
    fecha: "2023-12-20",
  },
  {
    id: 5,
    Titulo: "Lanzamiento de Plataforma Educativa",
    Descripcion:
      "Presentación oficial de nuestra plataforma de e-learning con IA integrada, diseñada para personalizar la experiencia de aprendizaje en ciencias de la computación.",
    Enlace: "#",
    fecha: "2023-12-15",
  },
]

// Comprehensive mock data for publications
const mockPublications = [
  {
    id: 1,
    titulo: "Deep Learning para Análisis de Sentimientos en Español",
    autores: "García, M., López, J., Martínez, A.",
    anio: 2024,
    tipo: "Artículo",
    enlace: "#",
    resumen:
      "Investigación sobre aplicación de redes neuronales profundas en análisis de emociones para textos en español, con dataset de 100,000 tweets etiquetados.",
    linea_investigacions: "Procesamiento de Lenguaje Natural",
    editor: "IEEE Transactions on Artificial Intelligence",
  },
  {
    id: 2,
    titulo: "Ontologías en Sistemas de Salud: Un Enfoque Práctico",
    autores: "Rodríguez, P., Silva, C., García, M.",
    anio: 2023,
    tipo: "Capitulo de Libro",
    editor: "Editorial Académica Internacional",
    linea_investigacions: "Ontologías y Web Semántica",
    resumen:
      "Capítulo que presenta metodologías para el desarrollo de ontologías médicas y su implementación en sistemas hospitalarios.",
  },
  {
    id: 3,
    titulo: "Algoritmos Evolutivos Multiobjetivo para Optimización Industrial",
    autores: "Fernández, L., Torres, R., López, C.",
    anio: 2023,
    tipo: "Paper",
    enlace: "#",
    linea_investigacions: "Sistemas Inteligentes",
    resumen:
      "Propuesta de nuevos algoritmos evolutivos para resolver problemas de optimización multiobjetivo en entornos industriales.",
  },
  {
    id: 4,
    titulo: "Robótica Educativa: Impacto en el Aprendizaje de Programación",
    autores: "Fernández, P., Ruiz, C.",
    anio: 2024,
    tipo: "Artículo",
    enlace: "#",
    linea_investigacions: "Robótica y Sistemas Embebidos",
    resumen:
      "Estudio longitudinal sobre el impacto de robots educativos en el aprendizaje de conceptos de programación en estudiantes de secundaria.",
  },
  {
    id: 5,
    titulo: "Ética en Inteligencia Artificial: Marco Teórico y Aplicaciones",
    autores: "Martínez, A., González, L.",
    anio: 2023,
    tipo: "Libro",
    editor: "Universidad Nacional Press",
    linea_investigacions: "Ética en Ciencias de la Computación",
    resumen:
      "Libro completo que aborda los aspectos éticos de la IA, incluyendo casos de estudio y propuestas de marcos regulatorios.",
  },
  {
    id: 6,
    titulo: "Sistemas de Recomendación Basados en Grafos de Conocimiento",
    autores: "Silva, R., Pérez, J.",
    anio: 2024,
    tipo: "Paper",
    enlace: "#",
    linea_investigacions: "Sistemas Inteligentes",
    resumen: "Nuevo enfoque para sistemas de recomendación utilizando grafos de conocimiento y embeddings semánticos.",
  },
]

// Enhanced mock data for team members
const mockTeamMembers = [
  {
    id: 1,
    full_name: "Dr. Miguel García",
    role_person: "Director",
    photo: [{ url: "/placeholder.svg?height=150&width=150" }],
    especialidad: "Ontologías y Web Semántica",
    email: "mgarcia@universidad.edu",
  },
  {
    id: 2,
    full_name: "Dra. Ana Martínez",
    role_person: "Investigador",
    photo: [{ url: "/placeholder.svg?height=150&width=150" }],
    especialidad: "Procesamiento de Lenguaje Natural",
    email: "amartinez@universidad.edu",
  },
  {
    id: 3,
    full_name: "Dr. Carlos López",
    role_person: "Investigador",
    photo: [{ url: "/placeholder.svg?height=150&width=150" }],
    especialidad: "Sistemas Inteligentes",
    email: "clopez@universidad.edu",
  },
  {
    id: 4,
    full_name: "Ing. Pedro Fernández",
    role_person: "Investigador",
    photo: [{ url: "/placeholder.svg?height=150&width=150" }],
    especialidad: "Robótica y Sistemas Embebidos",
    email: "pfernandez@universidad.edu",
  },
  {
    id: 5,
    full_name: "Lic. María Rodríguez",
    role_person: "Colaborador",
    photo: [{ url: "/placeholder.svg?height=150&width=150" }],
    especialidad: "Desarrollo de Software",
    email: "mrodriguez@universidad.edu",
  },
  {
    id: 6,
    full_name: "Lic. Juan Pérez",
    role_person: "Colaborador",
    photo: [{ url: "/placeholder.svg?height=150&width=150" }],
    especialidad: "Machine Learning",
    email: "jperez@universidad.edu",
  },
  {
    id: 7,
    full_name: "Carlos Silva",
    role_person: "Becario",
    photo: [{ url: "/placeholder.svg?height=150&width=150" }],
    especialidad: "Análisis de Datos",
    email: "csilva@universidad.edu",
  },
  {
    id: 8,
    full_name: "Laura González",
    role_person: "Becario",
    photo: [{ url: "/placeholder.svg?height=150&width=150" }],
    especialidad: "Desarrollo Web",
    email: "lgonzalez@universidad.edu",
  },
]

// Mock data for extension lines
const mockExtensionLines = [
  {
    id: 1,
    nombre: "Tecnología Educativa",
    descripcion:
      "Desarrollo de herramientas tecnológicas para mejorar los procesos de enseñanza-aprendizaje en instituciones educativas de la región.",
    imagen: { url: "/placeholder.svg?height=200&width=300" },
    instituciones: "Escuela Primaria N°123, Instituto Secundario San Martín, Centro de Formación Profesional",
    proyectos: [
      {
        id: 1,
        nombre: "Plataforma de Gestión Escolar",
        descripcion: "Sistema web para la gestión integral de instituciones educativas.",
      },
      {
        id: 2,
        nombre: "Aulas Virtuales Interactivas",
        descripcion: "Desarrollo de entornos virtuales de aprendizaje con herramientas de gamificación.",
      },
    ],
  },
  {
    id: 2,
    nombre: "Sistemas de Información Comunitarios",
    descripcion: "Implementación de sistemas de información para organizaciones comunitarias y ONGs locales.",
    imagen: { url: "/placeholder.svg?height=200&width=300" },
    instituciones: "Fundación Esperanza, Centro Comunitario Norte, Cooperativa de Trabajo",
    proyectos: [
      {
        id: 3,
        nombre: "Sistema de Gestión de Voluntarios",
        descripcion: "Plataforma para coordinar actividades de voluntariado en la comunidad.",
      },
      {
        id: 4,
        nombre: "Red Social Comunitaria",
        descripcion: "Aplicación móvil para conectar vecinos y promover actividades locales.",
      },
    ],
  },
  {
    id: 3,
    nombre: "Inclusión Digital",
    descripcion: "Programas de capacitación en tecnologías digitales para adultos mayores y sectores vulnerables.",
    imagen: { url: "/placeholder.svg?height=200&width=300" },
    instituciones: "Centro de Jubilados, Biblioteca Popular, Centro de Salud Municipal",
    proyectos: [
      {
        id: 5,
        nombre: "Alfabetización Digital Senior",
        descripcion: "Curso de computación básica adaptado para adultos mayores.",
      },
      {
        id: 6,
        nombre: "Telemedicina Comunitaria",
        descripcion: "Sistema de consultas médicas remotas para zonas rurales.",
      },
    ],
  },
]

// Mock data for gallery sections
const mockGallery = [
  {
    id: 1,
    titulo: "Conferencias y Eventos",
    imagenes: [
      { url: "/placeholder.svg?height=400&width=600", descripcion: "Conferencia Internacional de IA 2024" },
      { url: "/placeholder.svg?height=400&width=600", descripcion: "Workshop de Procesamiento de Lenguaje Natural" },
      { url: "/placeholder.svg?height=400&width=600", descripcion: "Seminario de Ética en Computación" },
      { url: "/placeholder.svg?height=400&width=600", descripcion: "Presentación de Proyectos de Investigación" },
    ],
  },
  {
    id: 2,
    titulo: "Laboratorios y Espacios de Trabajo",
    imagenes: [
      { url: "/placeholder.svg?height=400&width=600", descripcion: "Laboratorio de Inteligencia Artificial" },
      { url: "/placeholder.svg?height=400&width=600", descripcion: "Sala de Servidores y Computación" },
      { url: "/placeholder.svg?height=400&width=600", descripcion: "Espacio de Trabajo Colaborativo" },
      { url: "/placeholder.svg?height=400&width=600", descripcion: "Área de Desarrollo de Software" },
    ],
  },
]

// Mock API functions
export const asyncMock = {
  // Research lines
  getResearchLines: async () => {
    await delay(800)
    return { data: mockResearchLines }
  },

  getResearchLine: async (id) => {
    await delay(600)
    const line = mockResearchLines.find((l) => l.id === Number.parseInt(id))
    if (!line) throw new Error("Línea de investigación no encontrada")
    return { data: line }
  },

  // Extension lines
  getExtensionLines: async () => {
    await delay(700)
    return { data: mockExtensionLines }
  },

  getExtensionLine: async (id) => {
    await delay(600)
    const line = mockExtensionLines.find((l) => l.id === Number.parseInt(id))
    if (!line) throw new Error("Línea de extensión no encontrada")
    return { data: line }
  },

  // News/Novedades
  getNews: async () => {
    await delay(1000)
    return { data: mockNews }
  },

  // Publications
  getPublications: async (filters = {}) => {
    await delay(900)
    let filteredPubs = [...mockPublications]

    if (filters.anio) {
      filteredPubs = filteredPubs.filter((pub) => pub.anio === Number.parseInt(filters.anio))
    }
    if (filters.tipo) {
      filteredPubs = filteredPubs.filter((pub) => pub.tipo === filters.tipo)
    }
    if (filters.linea) {
      filteredPubs = filteredPubs.filter((pub) =>
        pub.linea_investigacions?.toLowerCase().includes(filters.linea.toLowerCase()),
      )
    }

    return {
      data: filteredPubs,
      meta: {
        pagination: {
          pageCount: Math.ceil(filteredPubs.length / 10),
        },
      },
    }
  },

  // Team members
  getTeamMembers: async () => {
    await delay(700)
    return {
      people: mockTeamMembers,
      description:
        "Somos un grupo de investigación multidisciplinario dedicado a explorar las fronteras del conocimiento en inteligencia artificial, procesamiento de lenguaje natural y tecnologías emergentes.",
      information:
        "Nuestro grupo se dedica a la investigación de vanguardia en múltiples áreas de las ciencias de la computación, con especial énfasis en inteligencia artificial, procesamiento de lenguaje natural, sistemas inteligentes y ética en la computación. Trabajamos en estrecha colaboración con instituciones nacionales e internacionales para desarrollar soluciones innovadoras que contribuyan al avance científico y tecnológico.",
      image: { url: "/placeholder.svg?height=300&width=800" },
    }
  },

  // Gallery
  getGallery: async () => {
    await delay(800)
    return mockGallery
  },

  // Projects
  getProject: async (id) => {
    await delay(600)
    // Mock project data
    return {
      proyecto: {
        id: Number.parseInt(id),
        nombre: "Sistema de Análisis de Sentimientos en Redes Sociales",
        descripcion: `# Sistema de Análisis de Sentimientos en Redes Sociales

## Resumen del Proyecto

Este proyecto tiene como objetivo **desarrollar un sistema inteligente** capaz de analizar la polaridad emocional en publicaciones de redes sociales utilizando técnicas avanzadas de procesamiento de lenguaje natural y aprendizaje automático.

## Objetivos Específicos

### Objetivo Principal
Crear una herramienta que permita a organizaciones y empresas comprender mejor la percepción pública sobre sus productos, servicios o campañas a través del análisis automatizado de sentimientos en redes sociales.

### Objetivos Secundarios
- **Desarrollar algoritmos** de clasificación de sentimientos con alta precisión
- **Implementar técnicas** de preprocesamiento de texto en español
- **Crear una interfaz** web intuitiva para visualización de resultados
- **Evaluar el rendimiento** del sistema con datasets reales

## Metodología

### Fase 1: Recolección de Datos
- Extracción de datos de Twitter, Facebook e Instagram
- Creación de datasets etiquetados manualmente
- Preprocesamiento y limpieza de datos

### Fase 2: Desarrollo del Modelo
- Implementación de modelos de machine learning (SVM, Random Forest, LSTM)
- Entrenamiento y validación cruzada
- Optimización de hiperparámetros

### Fase 3: Desarrollo de la Aplicación
- Diseño de arquitectura del sistema
- Desarrollo del backend con Python/Django
- Creación de interfaz web con React
- Implementación de APIs REST

## Tecnologías Utilizadas

- **Lenguajes**: Python, JavaScript, HTML/CSS
- **Frameworks**: Django, React, TensorFlow, scikit-learn
- **Bases de datos**: PostgreSQL, Redis
- **APIs**: Twitter API, Facebook Graph API
- **Herramientas**: Docker, Git, Jupyter Notebooks

## Resultados Esperados

El sistema desarrollado permitirá:

1. **Análisis en tiempo real** de sentimientos en publicaciones
2. **Generación de reportes** detallados con métricas y visualizaciones
3. **Detección de tendencias** y patrones emocionales
4. **Alertas automáticas** para contenido con alta carga emocional negativa`,
        fechaInicio: "2024-03-01",
        fechaFin: "2025-08-31",
        estado: "En Progreso",
        responsable: "Dr. María García",
        linea_investigacion: "Procesamiento de Lenguaje Natural",
      },
    }
  },

  // Simulate user interactions
  simulateUserAction: async (action, data) => {
    await delay(500)
    console.log(`Simulating action: ${action}`, data)
    return { success: true, message: `Acción ${action} ejecutada correctamente` }
  },

  // Simulate backoffice access
  simulateBackofficeAccess: async (credentials) => {
    await delay(1200)
    if (credentials?.username === "admin" && credentials?.password === "admin123") {
      return {
        success: true,
        token: "mock-jwt-token",
        user: { id: 1, name: "Administrador", role: "admin" },
      }
    }
    throw new Error("Credenciales inválidas")
  },

  // Simulate form submissions
  simulateFormSubmission: async (formType, formData) => {
    await delay(800)
    console.log(`Form submission: ${formType}`, formData)
    return {
      success: true,
      message: `Formulario ${formType} enviado correctamente`,
      id: Math.floor(Math.random() * 1000),
    }
  },
}

export default asyncMock
