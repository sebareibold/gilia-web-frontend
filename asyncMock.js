// Mock data para simular respuestas de API
const mockData = {
  // ===== DATOS MOCK PARA EQUIPO =====
  teamMembers: [
    {
      id: 1,
      nombre: "Dra. Laura Cecchi",
      email: "laura.cecchi@gilia.com",
      cargo: "Directora",
      imagen: "/perfil_person.png",
      descripcion: "Directora del Grupo de Investigación en Lenguajes e Inteligencia Artificial (GILIA). Lidera investigaciones en el campo de la inteligencia artificial y lenguajes de programación.",
      especialidades: ["Inteligencia Artificial", "Lenguajes de Programación", "Machine Learning", "Sistemas Multiagentes"],
      linkedin: "https://ar.linkedin.com/in/laura-andrea-cecchi-064a6791",
      activo: true,
    },
    {
      id: 2,
      nombre: "Lic. Sandra Roger",
      email: "sandra.roger@gilia.com",
      cargo: "Co-Directora",
      imagen: "/perfil_person.png",
      descripcion: "Co-Directora del Grupo de Investigación en Lenguajes e Inteligencia Artificial (GILIA). Especialista en sistemas multiagentes y ambientes dinámicos.",
      especialidades: ["Sistemas Multiagentes", "Ambientes Dinámicos", "Inteligencia Artificial", "Planificación"],
      linkedin: "https://ar.linkedin.com/in/sandra-roger-a8321a33",
      activo: true,
    },
    {
      id: 3,
      nombre: "Mg. Gerardo Parra",
      email: "gerardo.parra@gilia.com",
      cargo: "Docente Investigador",
      imagen: "/perfil_person.png",
      descripcion: "Docente investigador del Grupo GILIA. Especialista en tecnologías del lenguaje natural y sistemas de inteligencia artificial.",
      especialidades: ["Tecnologías del Lenguaje Natural", "Inteligencia Artificial", "Procesamiento de Lenguaje", "Machine Learning"],
      linkedin: "https://linkedin.com/in/gerardo-parra",
      activo: true,
    },
    {
      id: 4,
      nombre: "Mg. Claudio Vaucheret",
      email: "claudio.vaucheret@gilia.com",
      cargo: "Docente Investigador",
      imagen: "/perfil_person.png",
      descripcion: "Docente investigador del Grupo GILIA. Especialista en sistemas multiagentes y técnicas de razonamiento en ambientes dinámicos.",
      especialidades: ["Sistemas Multiagentes", "Razonamiento", "Ambientes Dinámicos", "Inteligencia Artificial"],
      linkedin: "https://ar.linkedin.com/in/claudio-vaucheret-896aa555",
      activo: true,
    },
    {
      id: 5,
      nombre: "Ing. Rodolfo Del Castillo",
      email: "rodolfo.delcastillo@gilia.com",
      cargo: "Docente Investigador",
      imagen: "/perfil_person.png",
      descripcion: "Docente investigador del Grupo GILIA. Ingeniero especializado en desarrollo de software y aplicaciones de inteligencia artificial.",
      especialidades: ["Ingeniería de Software", "Inteligencia Artificial", "Desarrollo de Sistemas", "Arquitectura de Software"],
      linkedin: "https://linkedin.com/in/rodolfo-delcastillo-gilia",
      activo: true,
    },
    {
      id: 6,
      nombre: "Lic. Daniel Dolz",
      email: "daniel.dolz@gilia.com",
      cargo: "Docente Investigador",
      imagen: "/perfil_person.png",
      descripcion: "Docente investigador del Grupo GILIA. Especialista en lenguajes de programación y sus aplicaciones en inteligencia artificial.",
      especialidades: ["Lenguajes de Programación", "Inteligencia Artificial", "Compiladores", "Paradigmas de Programación"],
      linkedin: "https://ar.linkedin.com/in/daniel-dolz-2304aa47",
      activo: true,
    },
    {
      id: 7,
      nombre: "Lic. Pablo Kogan",
      email: "pablo.kogan@gilia.com",
      cargo: "Docente Investigador",
      imagen: "/perfil_person.png",

      descripcion: "Docente investigador del Grupo GILIA. Especialista en machine learning y técnicas de inteligencia artificial.",
      especialidades: ["Machine Learning", "Inteligencia Artificial", "Algoritmos de Aprendizaje", "Análisis de Datos"],
      linkedin: "https://ar.linkedin.com/in/pablo-kogan?original_referer=https%3A%2F%2Fwww.google.com%2F",
      activo: true,
    },
    {
      id: 8,
      nombre: "Lic. Mario Moya",
      email: "mario.moya@gilia.com",
      cargo: "Docente Investigador",
      imagen: "/perfil_person.png",
      descripcion: "Docente investigador del Grupo GILIA. Especialista en sistemas multiagentes y técnicas de planificación en ambientes dinámicos.",
      especialidades: ["Sistemas Multiagentes", "Planificación", "Ambientes Dinámicos", "Coordinación de Agentes"],
      linkedin: "https://linkedin.com/in/mario-moya-gilia",
      activo: true,
    },
    {
      id: 9,
      nombre: "Lic. Maximiliano Klemen",
      email: "maximiliano.klemen@gilia.com",
      cargo: "Docente Investigador",
      imagen: "/perfil_person.png",
      descripcion: "Docente investigador del Grupo GILIA. Especialista en tecnologías del lenguaje natural y procesamiento de texto.",
      especialidades: ["Tecnologías del Lenguaje Natural", "Procesamiento de Texto", "NLP", "Análisis Lingüístico"],
      linkedin: "https://linkedin.com/in/maximiliano-klemen-gilia",
      activo: true,
    },
    {
      id: 10,
      nombre: "Lic. María Laura Pino",
      email: "marialaura.pino@gilia.com",
      cargo: "Docente Investigador",
      imagen: "/perfil_person.png",

      descripcion: "Docente investigador del Grupo GILIA. Especialista en sistemas cognitivos y aplicaciones de inteligencia artificial.",
      especialidades: ["Sistemas Cognitivos", "Inteligencia Artificial", "Cognición Computacional", "Modelado Cognitivo"],
      linkedin: "https://linkedin.com/in/marialaura-pino-gilia",
      activo: true,
    },
    {
      id: 11,
      nombre: "Lic. Guillermo Torres",
      email: "guillermo.torres@gilia.com",
      cargo: "Docente Investigador",
      imagen: "/perfil_person.png",
      descripcion: "Docente investigador del Grupo GILIA. Especialista en lenguajes de programación y diseño de compiladores.",
      especialidades: ["Lenguajes de Programación", "Compiladores", "Análisis Léxico", "Optimización de Código"],
      linkedin: "https://linkedin.com/in/guillermo-torres-gilia",
      activo: true,
    },
    {
      id: 12,
      nombre: "Lic. Germán Braun",
      email: "german.braun@gilia.com",
      cargo: "Becario de Doctorado CONICET",
      imagen: "/perfil_person.png",
      descripcion: "Becario de Doctorado CONICET en el Grupo GILIA. Investigador en sistemas multiagentes e inteligencia artificial.",
      especialidades: ["Sistemas Multiagentes", "Inteligencia Artificial", "Investigación Doctoral", "CONICET"],
      linkedin: "https://ar.linkedin.com/in/germanbraun",
      activo: true,
    },
    {
      id: 13,
      nombre: "Lic. Daniel Trevisani",
      email: "daniel.trevisani@gilia.com",
      cargo: "Integrante",
      imagen: "/perfil_person.png",
      descripcion: "Integrante del Grupo GILIA. Especialista en desarrollo de software y aplicaciones de inteligencia artificial.",
      especialidades: ["Desarrollo de Software", "Inteligencia Artificial", "Aplicaciones Web", "Sistemas Distribuidos"],
      linkedin: "https://linkedin.com/in/daniel-trevisani-gilia",
      activo: true,
    },
    {
      id: 14,
      nombre: "AC. Jael Yañez",
      email: "jael.yañez@gilia.com",
      cargo: "Integrante",
      imagen: "/perfil_person.png",
      descripcion: "Alumno avanzado integrante del Grupo GILIA. Especialista en machine learning y técnicas de inteligencia artificial.",
      especialidades: ["Machine Learning", "Inteligencia Artificial", "Algoritmos de Aprendizaje", "Análisis de Datos"],
      linkedin: "https://linkedin.com/in/jael-yañez-gilia",
      activo: true,
    },
    {
      id: 15,
      nombre: "AC. Patricio Biondelli",
      email: "patricio.biondelli@gilia.com",
      cargo: "Integrante",
      imagen: "/perfil_person.png",
      descripcion: "Alumno avanzado integrante del Grupo GILIA. Especialista en sistemas multiagentes y programación.",
      especialidades: ["Sistemas Multiagentes", "Programación", "Coordinación de Agentes", "Desarrollo de Software"],
      linkedin: "https://linkedin.com/in/patricio-biondelli-gilia",
      activo: true,
    },
    {
      id: 16,
      nombre: "AC. Diego Giuliani",
      email: "diego.giuliani@gilia.com",
      cargo: "Integrante",
      imagen: "/perfil_person.png",

      descripcion: "Alumno avanzado integrante del Grupo GILIA. Especialista en tecnologías del lenguaje natural y NLP.",
      especialidades: ["Tecnologías del Lenguaje Natural", "NLP", "Procesamiento de Texto", "Análisis Lingüístico"],
      linkedin: "https://linkedin.com/in/diego-giuliani-gilia",
      activo: true,
    },
    {
      id: 17,
      nombre: "AC. Andrea Vicente",
      email: "andrea.vicente@gilia.com",
      cargo: "Integrante",
      imagen: "/perfil_person.png",
      descripcion: "Alumno avanzado integrante del Grupo GILIA. Especialista en inteligencia artificial y análisis de datos.",
      especialidades: ["Inteligencia Artificial", "Análisis de Datos", "Machine Learning", "Visualización de Datos"],
      linkedin: "https://linkedin.com/in/andrea-vicente-gilia",
      activo: true,
    },
    {
      id: 18,
      nombre: "AC. Fernando Buccella",
      email: "fernando.buccella@gilia.com",
      cargo: "Integrante",
      imagen: "/perfil_person.png",
      descripcion: "Alumno avanzado integrante del Grupo GILIA. Especialista en lenguajes de programación y diseño de compiladores.",
      especialidades: ["Lenguajes de Programación", "Compiladores", "Análisis Léxico", "Optimización de Código"],
      linkedin: "https://linkedin.com/in/fernando-buccella-gilia",
      activo: true,
    },
  ],

  // ===== DATOS MOCK PARA PROYECTOS =====
  projects: [
    {
      id: 1,
      nombre: "Proyecto 1: Ontologías en la Web",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod. Proin dictum, sapien nec cursus cursus, enim erat dictum enim, nec cursus enim erat nec enim.",
      status: "Activo",
      priority: "Alta",
      startDate: "2022-01-01",
      endDate: "2024-12-31",
      budget: 100000,
      spent: 50000,
      progress: 50,
      director: "Dr. Ejemplo Líder",
      coDirector: "Dra. Ejemplo Integrante",
      ordenanza: "1234/22",
      team: ["Dr. Ejemplo Líder", "Dra. Ejemplo Integrante"],
      teamIds: [1, 2],
      advisors: ["Dr. Asesor Ejemplo"],
      category: "Ontologías y Web Semántica",
      researchLineId: 1,
      tags: ["Ontologías", "Web Semántica"],
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      deliverables: [
        { name: "Informe Inicial", completed: true, dueDate: "2022-06-30" },
        { name: "Prototipo Web", completed: false, dueDate: "2023-12-31" },
      ],
      milestones: [
        { name: "Kickoff", date: "2022-01-15", completed: true },
        { name: "Primer Entregable", date: "2022-06-30", completed: true },
      ],
      fundingSource: "Agencia Nacional",
      collaborations: ["Universidad Ejemplo"],
      publications: [1],
      risks: [],
    },
    {
      id: 2,
      title: "Proyecto 2: Procesamiento de Lenguaje Natural",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod. Proin dictum, sapien nec cursus cursus, enim erat dictum enim, nec cursus enim erat nec enim.",
      status: "Activo",
      priority: "Media",
      startDate: "2023-01-01",
      endDate: "2025-12-31",
      budget: 120000,
      spent: 60000,
      progress: 40,
      director: "Dra. Ejemplo Líder",
      coDirector: "Dr. Ejemplo Integrante",
      ordenanza: "5678/23",
      team: ["Dra. Ejemplo Líder", "Dr. Ejemplo Integrante"],
      teamIds: [2, 3],
      advisors: ["Dra. Asesora Ejemplo"],
      category: "Procesamiento del Lenguaje Natural",
      researchLineId: 2,
      tags: ["NLP", "Text Mining"],
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      deliverables: [
        { name: "Dataset Inicial", completed: true, dueDate: "2023-06-30" },
        { name: "Modelo NLP", completed: false, dueDate: "2024-12-31" },
      ],
      milestones: [
        { name: "Inicio", date: "2023-01-15", completed: true },
        { name: "Primer Dataset", date: "2023-06-30", completed: true },
      ],
      fundingSource: "Agencia Nacional",
      collaborations: ["Universidad Ejemplo"],
      publications: [2],
      risks: [],
    },
    {
      id: 3,
      title: "Proyecto 3: Robótica y Sistemas Embebidos",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod. Proin dictum, sapien nec cursus cursus, enim erat dictum enim, nec cursus enim erat nec enim.",
      status: "Activo",
      priority: "Alta",
      startDate: "2021-01-01",
      endDate: "2023-12-31",
      budget: 150000,
      spent: 100000,
      progress: 80,
      director: "Dr. Ejemplo Líder",
      coDirector: "Dra. Ejemplo Integrante",
      ordenanza: "9101/21",
      team: ["Dr. Ejemplo Líder", "Dra. Ejemplo Integrante"],
      teamIds: [3, 4],
      advisors: ["Dr. Asesor Ejemplo"],
      category: "Robótica y Sistemas Embebidos",
      researchLineId: 3,
      tags: ["Robótica", "Sistemas Embebidos"],
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      deliverables: [
        { name: "Robot Prototipo", completed: true, dueDate: "2022-06-30" },
        { name: "Sistema Embebido", completed: false, dueDate: "2023-12-31" },
      ],
      milestones: [
        { name: "Diseño", date: "2021-03-15", completed: true },
        { name: "Prototipo", date: "2022-06-30", completed: true },
      ],
      fundingSource: "Agencia Nacional",
      collaborations: ["Universidad Ejemplo"],
      publications: [3],
      risks: [],
    },
  ],

  // ===== DATOS MOCK PARA LÍNEAS DE INVESTIGACIÓN =====
  researchLines: [
    {
      id: 1,
      nombre: "Ontologías y Web Semántica",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      priority: "Alta",
      startDate: "2020-01-15",
      leader: "Dr. Ejemplo Líder",
      leaderId: 1,
      team: ["Dr. Ejemplo Líder", "Dra. Ejemplo Integrante"],
      teamIds: [1, 2],
      projects: 2,
      publications: 5,
      budget: 100000,
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      keyAreas: ["Web Semántica", "Ontologías"],
      achievements: ["Lorem ipsum achievement"],
      collaborations: ["Universidad Ejemplo"],
      impact: "Alto",
      fundingSources: ["Agencia Nacional"],
      nextMilestones: ["Lorem ipsum milestone"],
      relatedProjects: [1],
      relatedPublications: [1],
    },
    {
      id: 2,
      title: "Procesamiento del Lenguaje Natural",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      priority: "Alta",
      startDate: "2020-01-15",
      leader: "Dra. Ejemplo Líder",
      leaderId: 2,
      team: ["Dra. Ejemplo Líder", "Dr. Ejemplo Integrante"],
      teamIds: [2, 3],
      projects: 2,
      publications: 5,
      budget: 100000,
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      keyAreas: ["NLP", "Text Mining"],
      achievements: ["Lorem ipsum achievement"],
      collaborations: ["Universidad Ejemplo"],
      impact: "Alto",
      fundingSources: ["Agencia Nacional"],
      nextMilestones: ["Lorem ipsum milestone"],
      relatedProjects: [2],
      relatedPublications: [2],
    },
    {
      id: 3,
      title: "Robótica y Sistemas Embebidos",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      priority: "Alta",
      startDate: "2020-01-15",
      leader: "Dr. Ejemplo Líder",
      leaderId: 3,
      team: ["Dr. Ejemplo Líder", "Dra. Ejemplo Integrante"],
      teamIds: [3, 4],
      projects: 2,
      publications: 5,
      budget: 100000,
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      keyAreas: ["Robótica", "Sistemas Embebidos"],
      achievements: ["Lorem ipsum achievement"],
      collaborations: ["Universidad Ejemplo"],
      impact: "Alto",
      fundingSources: ["Agencia Nacional"],
      nextMilestones: ["Lorem ipsum milestone"],
      relatedProjects: [3],
      relatedPublications: [3],
    },
    {
      id: 4,
      title: "Sistemas Inteligentes",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      priority: "Alta",
      startDate: "2020-01-15",
      leader: "Dra. Ejemplo Líder",
      leaderId: 4,
      team: ["Dra. Ejemplo Líder", "Dr. Ejemplo Integrante"],
      teamIds: [4, 5],
      projects: 2,
      publications: 5,
      budget: 100000,
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      keyAreas: ["Sistemas Inteligentes"],
      achievements: ["Lorem ipsum achievement"],
      collaborations: ["Universidad Ejemplo"],
      impact: "Alto",
      fundingSources: ["Agencia Nacional"],
      nextMilestones: ["Lorem ipsum milestone"],
      relatedProjects: [4],
      relatedPublications: [4],
    },
    {
      id: 5,
      title: "Educación en las Ciencias de la Computación",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      priority: "Alta",
      startDate: "2020-01-15",
      leader: "Dr. Ejemplo Líder",
      leaderId: 5,
      team: ["Dr. Ejemplo Líder", "Dra. Ejemplo Integrante"],
      teamIds: [5, 6],
      projects: 2,
      publications: 5,
      budget: 100000,
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      keyAreas: ["Educación", "Ciencias de la Computación"],
      achievements: ["Lorem ipsum achievement"],
      collaborations: ["Universidad Ejemplo"],
      impact: "Alto",
      fundingSources: ["Agencia Nacional"],
      nextMilestones: ["Lorem ipsum milestone"],
      relatedProjects: [5],
      relatedPublications: [5],
    },
    {
      id: 6,
      title: "Lenguajes de Programación",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      priority: "Alta",
      startDate: "2020-01-15",
      leader: "Dra. Ejemplo Líder",
      leaderId: 6,
      team: ["Dra. Ejemplo Líder", "Dr. Ejemplo Integrante"],
      teamIds: [6, 7],
      projects: 2,
      publications: 5,
      budget: 100000,
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      keyAreas: ["Lenguajes de Programación"],
      achievements: ["Lorem ipsum achievement"],
      collaborations: ["Universidad Ejemplo"],
      impact: "Alto",
      fundingSources: ["Agencia Nacional"],
      nextMilestones: ["Lorem ipsum milestone"],
      relatedProjects: [6],
      relatedPublications: [6],
    },
    {
      id: 7,
      title: "Ética en Ciencias de la Computación",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      priority: "Alta",
      startDate: "2020-01-15",
      leader: "Dr. Ejemplo Líder",
      leaderId: 7,
      team: ["Dr. Ejemplo Líder", "Dra. Ejemplo Integrante"],
      teamIds: [7, 8],
      projects: 2,
      publications: 5,
      budget: 100000,
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      keyAreas: ["Ética", "Ciencias de la Computación"],
      achievements: ["Lorem ipsum achievement"],
      collaborations: ["Universidad Ejemplo"],
      impact: "Alto",
      fundingSources: ["Agencia Nacional"],
      nextMilestones: ["Lorem ipsum milestone"],
      relatedProjects: [7],
      relatedPublications: [7],
    },
  ],

  // ===== DATOS MOCK PARA PUBLICACIONES =====
  publications: [
    {
      id: 1,
      title: "Publicación 1: Ontologías en la Web",
      authors: ["Dr. Ejemplo Líder", "Dra. Ejemplo Integrante"],
      authorIds: [1, 2],
      journal: "Revista Ejemplo",
      type: "Artículo de Revista",
      year: 2024,
      month: "Marzo",
      volume: "1",
      issue: "1",
      pages: "1-20",
      doi: "10.0000/ejemplo.2024.0001",
      url: "https://ejemplo.com/publicacion1",
      abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      keywords: ["Ontologías", "Web Semántica"],
      status: "Publicado",
      impact: "Alto",
      quartile: "Q1",
      citations: 10,
      downloads: 100,
      category: "Ontologías y Web Semántica",
      fundingSource: "Agencia Nacional",
      researchLineId: 1,
      projectIds: [1],
      collaborations: ["Universidad Ejemplo"],
      awards: ["Premio Ejemplo"],
      pdfUrl: "/documents/ontologias-web.pdf",
    },
    {
      id: 2,
      title: "Publicación 2: NLP en Español",
      authors: ["Dra. Ejemplo Líder", "Dr. Ejemplo Integrante"],
      authorIds: [2, 3],
      journal: "Revista Ejemplo",
      type: "Artículo de Revista",
      year: 2023,
      month: "Abril",
      volume: "2",
      issue: "2",
      pages: "21-40",
      doi: "10.0000/ejemplo.2023.0002",
      url: "https://ejemplo.com/publicacion2",
      abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      keywords: ["NLP", "Text Mining"],
      status: "Publicado",
      impact: "Medio",
      quartile: "Q2",
      citations: 5,
      downloads: 50,
      category: "Procesamiento del Lenguaje Natural",
      fundingSource: "Agencia Nacional",
      researchLineId: 2,
      projectIds: [2],
      collaborations: ["Universidad Ejemplo"],
      awards: [],
      pdfUrl: "/documents/nlp-espanol.pdf",
    },
    {
      id: 3,
      title: "Publicación 3: Robótica y Sistemas Embebidos",
      authors: ["Dr. Ejemplo Líder", "Dra. Ejemplo Integrante"],
      authorIds: [3, 4],
      journal: "Revista Ejemplo",
      type: "Artículo de Revista",
      year: 2022,
      month: "Mayo",
      volume: "3",
      issue: "3",
      pages: "41-60",
      doi: "10.0000/ejemplo.2022.0003",
      url: "https://ejemplo.com/publicacion3",
      abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      keywords: ["Robótica", "Sistemas Embebidos"],
      status: "Publicado",
      impact: "Alto",
      quartile: "Q1",
      citations: 8,
      downloads: 80,
      category: "Robótica y Sistemas Embebidos",
      fundingSource: "Agencia Nacional",
      researchLineId: 3,
      projectIds: [3],
      collaborations: ["Universidad Ejemplo"],
      awards: [],
      pdfUrl: "/documents/robotica-sistemas.pdf",
    },
  ],

  // ===== DATOS MOCK PARA GALERÍA =====
  galleryItems: [
    {
      id: 1,
      title: "Laboratorio de Inteligencia Artificial",
      description: "Vista general del laboratorio principal donde se desarrollan proyectos de IA y machine learning.",
      type: "Imagen",
      category: "Instalaciones",
      url: "/placeholder.svg?height=600&width=800",
      thumbnail: "/placeholder.svg?height=300&width=400",
      uploadDate: "2024-03-15",
      size: "2.5 MB",
      dimensions: "1920x1080",
      tags: ["laboratorio", "IA", "instalaciones", "equipos"],
      photographer: "Dr. Ana González",
      photographerId: 1,
      location: "Edificio Principal, Piso 3",
      equipment: "Canon EOS R5",
      featured: true,
      views: 245,
      downloads: 12,
      status: "Publicado",
      alt: "Vista del laboratorio de IA con equipos de cómputo y estaciones de trabajo",
      caption: "Espacio de trabajo colaborativo del equipo de IA",
    },
    {
      id: 2,
      title: "Equipo de Robótica en Acción",
      description: "Miembros del equipo trabajando en el desarrollo de robots autónomos para navegación indoor.",
      type: "Imagen",
      category: "Equipo",
      url: "/placeholder.svg?height=600&width=800",
      thumbnail: "/placeholder.svg?height=300&width=400",
      uploadDate: "2024-03-10",
      size: "3.1 MB",
      dimensions: "1920x1280",
      tags: ["equipo", "robótica", "trabajo", "colaboración"],
      photographer: "Ing. Miguel Torres",
      photographerId: 4,
      location: "Laboratorio de Robótica",
      equipment: "Sony A7 III",
      featured: false,
      views: 189,
      downloads: 8,
      status: "Publicado",
      alt: "Investigadores trabajando en el laboratorio de robótica",
      caption: "Sesión de trabajo en desarrollo de robots autónomos",
    },
    {
      id: 3,
      title: "Presentación en Conferencia Internacional",
      description: "Dr. Carlos Rodríguez presentando resultados de investigación en ICRA 2024.",
      type: "Video",
      category: "Eventos",
      url: "/videos/icra-presentation.mp4",
      thumbnail: "/placeholder.svg?height=300&width=400",
      uploadDate: "2024-02-28",
      size: "125 MB",
      dimensions: "1920x1080",
      duration: "15:30",
      tags: ["conferencia", "presentación", "ICRA", "investigación"],
      photographer: "Equipo GILIA",
      photographerId: null,
      location: "Yokohama, Japón",
      equipment: "Cámara de conferencia",
      featured: true,
      views: 567,
      downloads: 23,
      status: "Publicado",
      alt: "Presentación de investigación en conferencia internacional",
      caption: "Presentación de resultados en ICRA 2024",
    },
  ],

  // ===== DATOS MOCK PARA LÍNEAS DE EXTENSIÓN =====
  extensionLines: [
    {
      id: 1,
      nombre: "Programación en escuela primaria",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      startDate: "2021-01-15",
      leader: "Dra. Ejemplo Líder",
      leaderId: 1,
      team: ["Dra. Ejemplo Líder", "Dr. Ejemplo Integrante"],
      teamIds: [1, 2],
      projects: 1,
      beneficiaries: 100,
      institutions: ["Escuela Primaria Ejemplo"],
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      activities: ["Lorem ipsum activity"],
      impact: "Alto",
      budget: 10000,
      fundingSources: ["Ministerio de Educación"],
    },
    {
      id: 2,
      nombre: "Computación en escuela secundaria",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      startDate: "2021-01-15",
      leader: "Dr. Ejemplo Líder",
      leaderId: 2,
      team: ["Dr. Ejemplo Líder", "Dra. Ejemplo Integrante"],
      teamIds: [2, 3],
      projects: 1,
      beneficiaries: 100,
      institutions: ["Escuela Secundaria Ejemplo"],
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      activities: ["Lorem ipsum activity"],
      impact: "Alto",
      budget: 10000,
      fundingSources: ["Ministerio de Educación"],
    },
    {
      id: 3,
      nombre: "Extents y Género",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      startDate: "2021-01-15",
      leader: "Dra. Ejemplo Líder",
      leaderId: 3,
      team: ["Dra. Ejemplo Líder", "Dr. Ejemplo Integrante"],
      teamIds: [3, 4],
      projects: 1,
      beneficiaries: 100,
      institutions: ["Institución Ejemplo"],
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      activities: ["Lorem ipsum activity"],
      impact: "Alto",
      budget: 10000,
      fundingSources: ["Ministerio de Educación"],
    },
    {
      id: 4,
      nombre: "FAI compensando la red",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      startDate: "2021-01-15",
      leader: "Dr. Ejemplo Líder",
      leaderId: 4,
      team: ["Dr. Ejemplo Líder", "Dra. Ejemplo Integrante"],
      teamIds: [4, 5],
      projects: 1,
      beneficiaries: 100,
      institutions: ["Institución Ejemplo"],
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      activities: ["Lorem ipsum activity"],
      impact: "Alto",
      budget: 10000,
      fundingSources: ["Ministerio de Educación"],
    },
    {
      id: 5,
      nombre: "Divulgación Científica",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      startDate: "2021-01-15",
      leader: "Dra. Ejemplo Líder",
      leaderId: 5,
      team: ["Dra. Ejemplo Líder", "Dr. Ejemplo Integrante"],
      teamIds: [5, 6],
      projects: 1,
      beneficiaries: 100,
      institutions: ["Institución Ejemplo"],
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      activities: ["Lorem ipsum activity"],
      impact: "Alto",
      budget: 10000,
      fundingSources: ["Ministerio de Educación"],
    },
    {
      id: 6,
      nombre: "Género y STEM",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      startDate: "2021-01-15",
      leader: "Dr. Ejemplo Líder",
      leaderId: 6,
      team: ["Dr. Ejemplo Líder", "Dra. Ejemplo Integrante"],
      teamIds: [6, 7],
      projects: 1,
      beneficiaries: 100,
      institutions: ["Institución Ejemplo"],
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      activities: ["Lorem ipsum activity"],
      impact: "Alto",
      budget: 10000,
      fundingSources: ["Ministerio de Educación"],
    },
    {
      id: 7,
      nombre: "Análisis forense de pericias médicos-legales asistidas por sistemas inteligentes",
      descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      status: "Activa",
      startDate: "2021-01-15",
      leader: "Dra. Ejemplo Líder",
      leaderId: 7,
      team: ["Dra. Ejemplo Líder", "Dr. Ejemplo Integrante"],
      teamIds: [7, 8],
      projects: 1,
      beneficiaries: 100,
      institutions: ["Institución Ejemplo"],
      objectives: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod."],
      activities: ["Lorem ipsum activity"],
      impact: "Alto",
      budget: 10000,
      fundingSources: ["Ministerio de Educación"],
    },
  ],

  // ===== DATOS MOCK PARA CONFIGURACIÓN =====
  systemConfig: {
    site: {
      name: "GILIA - Grupo de Investigación",
      description: "Grupo de Investigación en Inteligencia Artificial y Tecnologías Emergentes",
      url: "https://gilia.universidad.edu.co",
      email: "contacto@gilia.com",
      phone: "+57 1 234 5678",
      address: "Universidad Nacional, Campus Norte, Edificio A",
    },
    admin: {
      name: "Administrador GILIA",
      email: "admin@gilia.com",
      phone: "+57 300 123 4567",
      position: "Administrador del Sistema",
      department: "Grupo de Investigación GILIA",
      bio: "Administrador principal del sistema de gestión del grupo de investigación GILIA.",
      avatar: "/placeholder.svg?height=100&width=100",
    },
    security: {
      sessionTimeout: 30,
      twoFactorEnabled: false,
      loginNotifications: true,
      maxLoginAttempts: 5,
    },
    system: {
      maintenanceMode: false,
      backupFrequency: "daily",
      maxFileSize: 50,
      allowedFileTypes: ["jpg", "png", "pdf", "docx", "mp4"],
      timezone: "America/Bogota",
    },
    notifications: {
      emailNotifications: true,
      newPublications: true,
      projectUpdates: true,
      teamChanges: true,
      systemAlerts: true,
      weeklyReports: false,
      monthlyReports: true,
    },
  },

  // ===== DATOS MOCK PARA ESTADÍSTICAS =====
  statistics: {
    overview: {
      totalProjects: 12,
      activeProjects: 8,
      completedProjects: 4,
      totalPublications: 45,
      totalTeamMembers: 15,
      totalBudget: 850000,
      totalBeneficiaries: 2000,
    },
    projectsByStatus: {
      "En Progreso": 8,
      Completado: 4,
      Planificado: 2,
      Pausado: 1,
    },
    publicationsByYear: {
      2024: 12,
      2023: 18,
      2022: 10,
      2021: 5,
    },
    publicationsByType: {
      "Artículo de Revista": 25,
      Conferencia: 15,
      "Capítulo de Libro": 3,
      Libro: 2,
    },
    teamByRole: {
      Director: 1,
      "Investigador Senior": 4,
      Investigador: 6,
      "Investigador Junior": 2,
      Desarrollador: 2,
    },
    budgetBySource: {
      MinCiencias: 400000,
      Colciencias: 250000,
      Universidad: 150000,
      "Empresa Privada": 50000,
    },
    researchLineActivity: {
      "Inteligencia Artificial": { projects: 5, publications: 20, budget: 300000 },
      Robótica: { projects: 3, publications: 12, budget: 200000 },
      NLP: { projects: 2, publications: 8, budget: 100000 },
      Bioinformática: { projects: 2, publications: 5, budget: 80000 },
    },
  },

  // ===== DATOS MOCK PARA INFORMACIÓN PÚBLICA =====
  aboutInfo: {
    mision:
      "Desarrollar investigación de excelencia en inteligencia artificial y tecnologías emergentes, formando talento humano de alto nivel y contribuyendo al desarrollo científico y tecnológico del país.",
    vision:
      "Ser reconocidos como un grupo de investigación líder en América Latina en el campo de la inteligencia artificial y las tecnologías emergentes.",
    valores: [
      "Excelencia académica",
      "Innovación tecnológica",
      "Responsabilidad social",
      "Colaboración interdisciplinaria",
      "Ética en la investigación",
    ],
    historia: [
      { year: 2016, event: "Fundación del grupo GILIA" },
      { year: 2018, event: "Primera publicación en revista Q1" },
      { year: 2020, event: "Reconocimiento como grupo de investigación categoría A" },
      { year: 2022, event: "Primer premio nacional de innovación" },
      { year: 2024, event: "Expansión internacional con colaboraciones en MIT" },
    ],
  },

  objectives: [
    {
      id: 1,
      titulo: "Excelencia en Investigación",
      descripcion:
        "Desarrollar investigación de clase mundial en las áreas de inteligencia artificial, procesamiento de lenguaje natural y ciencias de la computación.",
      icono: "BulbOutlined",
      prioridad: "Alta",
    },
    {
      id: 2,
      title: "Formación de Recursos Humanos",
      description:
        "Formar investigadores altamente calificados en diferentes niveles académicos, desde estudiantes de grado hasta doctores.",
      icon: "graduation-cap",
      priority: "Alta",
    },
    {
      id: 3,
      title: "Transferencia Tecnológica",
      description:
        "Facilitar la transferencia de conocimiento y tecnología desde la universidad hacia el sector productivo y la sociedad.",
      icon: "exchange",
      priority: "Media",
    },
    {
      id: 4,
      title: "Extensión Universitaria",
      description:
        "Desarrollar actividades de extensión universitaria que conecten nuestro conocimiento con las necesidades de la comunidad.",
      icon: "community",
      priority: "Media",
    },
  ],

  // ===== NOVEDADES (NEWS) MOCK =====
  news: [
    {
      id: 1,
      Titulo: "Revolucionario Modelo de IA para Procesamiento de Lenguaje Natural",
      Descripcion:
        "Desarrollo de un modelo de inteligencia artificial que supera a los enfoques existentes en un 15% en tareas de comprensión de texto y análisis de sentimientos para el español.",
      Enlace: "https://www.ieee.org/publications/",
      imagen: "/novedad.png",
      categoria: "Investigación",
      vistas: 1250,
      destacado: true,
    },
    {
      id: 2,
      Titulo: "Participación Destacada en ICAI 2024",
      Descripcion:
        "Tres ponencias magistrales sobre ética en IA, sistemas adaptativos y robótica educativa. Nuestros investigadores fueron keynote speakers principales.",
      Enlace: "https://www.icai-conference.org/",
      imagen: "/novedad.png",
      categoria: "Conferencia",
      vistas: 890,
      destacado: false,
    },
    {
      id: 3,
      Titulo: "Proyecto Horizon Europe Multinacional",
      Descripcion:
        "Colaboración internacional con universidades de Brasil y Chile, financiado con 2.5 millones de euros para desarrollar sistemas inteligentes adaptativos.",
      Enlace: "https://ec.europa.eu/programmes/horizon2020/",
      imagen: "/novedad.png",
      categoria: "Proyecto",
      vistas: 2100,
      destacado: true,
    },
    {
      id: 4,
      Titulo: "Premio Nacional: Traductor Español-Guaraní",
      Descripcion:
        "Reconocimiento del Ministerio de Ciencia por desarrollar el primer sistema de traducción automática que preserva lenguas originarias digitalmente.",
      Enlace: "https://www.conicet.gov.ar/",
      imagen: "/novedad.png",
      categoria: "Premio",
      vistas: 1750,
      destacado: false,
    },
    {
      id: 5,
      Titulo: "Plataforma Educativa con IA Personalizada",
      Descripcion:
        "Lanzamiento exitoso de nuestra plataforma de e-learning que adapta contenido y metodología según el perfil de cada estudiante. Más de 1000 usuarios activos.",
      Enlace: "https://www.edx.org/",
      imagen: "/novedad.png",
      categoria: "Lanzamiento",
      vistas: 3200,
      destacado: true,
    },
    {
      id: 6,
      Titulo: "Colaboración Internacional en Robótica",
      Descripcion:
        "Nuevo proyecto de investigación en robótica educativa con universidades europeas, enfocado en el desarrollo de asistentes pedagógicos inteligentes.",
      Enlace: "https://www.robotics-education.org/",
      imagen: "/novedad.png",
      categoria: "Colaboración",
      vistas: 980,
      destacado: false,
    },
    {
      id: 7,
      Titulo: "Avances en Procesamiento de Voz",
      Descripcion:
        "Desarrollo de tecnologías de reconocimiento y síntesis de voz para dialectos regionales, mejorando la accesibilidad tecnológica en comunidades locales.",
      Enlace: "https://www.speech-tech.org/",
      imagen: "/novedad.png",
      categoria: "Tecnología",
      vistas: 1420,
      destacado: true,
    },
    {
      id: 8,
      Titulo: "Publicación en Nature AI",
      Descripcion:
        "Artículo científico sobre redes neuronales explicables publicado en una de las revistas más prestigiosas del campo de la inteligencia artificial.",
      Enlace: "https://www.nature.com/",
      imagen: "/novedad.png",
      categoria: "Publicación",
      vistas: 2850,
      destacado: true,
    },
  ],
}

// Simulación de delay para APIs
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// AsyncMock completo del sistema GILIA
export const asyncMock = {
  // ===== AUTENTICACIÓN =====
  async simulateBackofficeAccess(credentials) {
    await delay(800)
    console.log("AsyncMock - Simulando acceso con:", credentials)

    if (credentials?.username === "admin" && credentials?.password === "admin123") {
      return {
        success: true,
        token: "mock-jwt-token-" + Date.now(),
        user: {
          id: "1",
          email: credentials.username,
          name: "Administrador GILIA",
          role: "admin",
        },
      }
    }
    throw new Error("Credenciales inválidas")
  },

  // ===== EQUIPO =====
  async getPersonas(filters = {}) {
    await delay(600)
    let filteredMembers = [...mockData.teamMembers]

    if (filters.role) {
      filteredMembers = filteredMembers.filter((member) => member.role === filters.role)
    }
    if (filters.department) {
      filteredMembers = filteredMembers.filter((member) =>
        member.department.toLowerCase().includes(filters.department.toLowerCase()),
      )
    }
    if (filters.status) {
      filteredMembers = filteredMembers.filter((member) => member.status === filters.status)
    }

    return {
      data: filteredMembers,
      meta: {
        pagination: {
          total: filteredMembers.length,
          pageCount: Math.ceil(filteredMembers.length / 10),
        },
      },
    }
  },

  async getPersona(id) {
    await delay(400)
    const member = mockData.teamMembers.find((m) => m.id === Number.parseInt(id))
    if (!member) throw new Error("Miembro del equipo no encontrado")
    return { data: member }
  },

  // ===== PROYECTOS =====
  async getProyectos(filters = {}) {
    await delay(700)
    let filteredProjects = [...mockData.projects]

    if (filters.status) {
      filteredProjects = filteredProjects.filter((project) => project.status === filters.status)
    }
    if (filters.category) {
      filteredProjects = filteredProjects.filter((project) => project.category === filters.category)
    }
    if (filters.researchLineId) {
      filteredProjects = filteredProjects.filter(
        (project) => project.researchLineId === Number.parseInt(filters.researchLineId),
      )
    }

    return {
      data: filteredProjects,
      meta: {
        pagination: {
          total: filteredProjects.length,
          pageCount: Math.ceil(filteredProjects.length / 10),
        },
      },
    }
  },

  async getProyecto(id) {
    await delay(500)
    const project = mockData.projects.find((p) => p.id === Number.parseInt(id))
    if (!project) throw new Error("Proyecto no encontrado")
    return { data: project }
  },

  // ===== LÍNEAS DE INVESTIGACIÓN =====
  async getLineasInvestigacion(filters = {}) {
    await delay(600)
    let filteredLines = [...mockData.researchLines]

    if (filters.status) {
      filteredLines = filteredLines.filter((line) => line.status === filters.status)
    }
    if (filters.leaderId) {
      filteredLines = filteredLines.filter((line) => line.leaderId === Number.parseInt(filters.leaderId))
    }

    return {
      data: filteredLines,
      meta: {
        pagination: {
          total: filteredLines.length,
          pageCount: Math.ceil(filteredLines.length / 10),
        },
      },
    }
  },

  async getLineaInvestigacion(id) {
    await delay(500)
    const line = mockData.researchLines.find((l) => l.id === Number.parseInt(id))
    if (!line) throw new Error("Línea de investigación no encontrada")
    return { data: line }
  },

  // ===== PUBLICACIONES =====
  async getPublicaciones(filters = {}) {
    await delay(800)
    let filteredPublications = [...mockData.publications]

    if (filters.year) {
      filteredPublications = filteredPublications.filter((pub) => pub.year === Number.parseInt(filters.year))
    }
    if (filters.type) {
      filteredPublications = filteredPublications.filter((pub) => pub.type === filters.type)
    }
    if (filters.status) {
      filteredPublications = filteredPublications.filter((pub) => pub.status === filters.status)
    }
    if (filters.researchLineId) {
      filteredPublications = filteredPublications.filter(
        (pub) => pub.researchLineId === Number.parseInt(filters.researchLineId),
      )
    }

    // Ordenar por año descendente
    filteredPublications.sort((a, b) => b.year - a.year)

    // Adaptar automáticamente los campos de publicaciones al formato esperado por el frontend
    filteredPublications = filteredPublications.map((pub, idx) => ({
      ...pub,
      // Título
      titulo: pub.titulo || pub.title || `Publicación ${idx + 1}`,
      // Autores
      autores: pub.autores || (Array.isArray(pub.authors) ? pub.authors.join(", ") : pub.authors) || "Autores no disponibles",
      // Año
      anio: pub.anio || pub.year || "Año no disponible",
      // Tipo
      tipo: pub.tipo || pub.type || "Tipo no disponible",
      // Resumen
      resumen: pub.resumen || pub.abstract || "Sin resumen disponible",
      // Enlace
      enlace: pub.enlace || pub.url || pub.pdfUrl || "",
      // Publicación (revista/libro)
      publicacion: pub.publicacion || pub.journal || pub.editor || "",
    }))

    return {
      data: filteredPublications,
      meta: {
        pagination: {
          total: filteredPublications.length,
          pageCount: Math.ceil(filteredPublications.length / 10),
        },
      },
    }
  },

  async getPublicacion(id) {
    await delay(500)
    const publication = mockData.publications.find((p) => p.id === Number.parseInt(id))
    if (!publication) throw new Error("Publicación no encontrada")
    return { data: publication }
  },

  // ===== GALERÍA =====
  async getGaleria(filters = {}) {
    await delay(600)
    let filteredItems = [...mockData.galleryItems]

    if (filters.type) {
      filteredItems = filteredItems.filter((item) => item.type === filters.type)
    }
    if (filters.category) {
      filteredItems = filteredItems.filter((item) => item.category === filters.category)
    }
    if (filters.status) {
      filteredItems = filteredItems.filter((item) => item.status === filters.status)
    }
    if (filters.featured !== undefined) {
      filteredItems = filteredItems.filter((item) => item.featured === filters.featured)
    }

    return {
      data: filteredItems,
      meta: {
        pagination: {
          total: filteredItems.length,
          pageCount: Math.ceil(filteredItems.length / 10),
        },
      },
    }
  },

  async getGaleriaItem(id) {
    await delay(400)
    const item = mockData.galleryItems.find((i) => i.id === Number.parseInt(id))
    if (!item) throw new Error("Elemento de galería no encontrado")
    return { data: item }
  },

  // ===== LÍNEAS DE EXTENSIÓN =====
  async getLineasExtension(filters = {}) {
    await delay(600)
    let filteredLines = [...mockData.extensionLines]

    if (filters.status) {
      filteredLines = filteredLines.filter((line) => line.status === filters.status)
    }
    if (filters.leaderId) {
      filteredLines = filteredLines.filter((line) => line.leaderId === Number.parseInt(filters.leaderId))
    }

    return {
      data: filteredLines,
      meta: {
        pagination: {
          total: filteredLines.length,
          pageCount: Math.ceil(filteredLines.length / 10),
        },
      },
    }
  },

  async getLineaExtension(id) {
    await delay(500)
    const line = mockData.extensionLines.find((l) => l.id === Number.parseInt(id))
    if (!line) throw new Error("Línea de extensión no encontrada")
    return { data: line }
  },

  // ===== CONFIGURACIÓN =====
  async getGlobal() {
    await delay(400)
    return { data: mockData.systemConfig }
  },

  // ===== ESTADÍSTICAS =====
  async getEstadisticas() {
    await delay(500)
    return { data: mockData.statistics }
  },

  // ===== INFORMACIÓN PÚBLICA =====
  async getAbout() {
    await delay(400)
    return { about: mockData.aboutInfo }
  },

  async getObjetivos() {
    await delay(400)
    return {
      data: mockData.objectives,
      meta: {
        pagination: {
          total: mockData.objectives.length,
          pageCount: 1,
        },
      },
    }
  },

  async getNovedades(filters = {}) {
    await delay(600)
    let filteredNews = [...mockData.news]

    if (filters.category) {
      filteredNews = filteredNews.filter((news) => news.categoria === filters.category)
    }
    if (filters.featured !== undefined) {
      filteredNews = filteredNews.filter((news) => news.destacado === filters.featured)
    }

    // Ordenar por fecha descendente
    filteredNews.sort((a, b) => new Date(b.Enlace) - new Date(a.Enlace))

    return {
      data: filteredNews,
      meta: {
        pagination: {
          total: filteredNews.length,
          pageCount: Math.ceil(filteredNews.length / 10),
        },
      },
    }
  },

  async getNovedad(id) {
    await delay(400)
    const news = mockData.news.find((n) => n.id === Number.parseInt(id))
    if (!news) throw new Error("Noticia no encontrada")
    return { data: news }
  },

  // ===== BÚSQUEDA GLOBAL =====
  async searchGlobal(query, filters = {}) {
    await delay(800)
    const searchTerm = query.toLowerCase()
    const results = {
      teamMembers: [],
      projects: [],
      researchLines: [],
      publications: [],
      galleryItems: [],
      extensionLines: [],
      news: [],
    }

    // Buscar en miembros del equipo
    results.teamMembers = mockData.teamMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm) ||
        member.specialization.toLowerCase().includes(searchTerm) ||
        member.department.toLowerCase().includes(searchTerm),
    )

    // Buscar en proyectos
    results.projects = mockData.projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm) ||
        project.description.toLowerCase().includes(searchTerm) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    )

    // Buscar en líneas de investigación
    results.researchLines = mockData.researchLines.filter(
      (line) =>
        line.title.toLowerCase().includes(searchTerm) ||
        line.description.toLowerCase().includes(searchTerm) ||
        line.keyAreas.some((area) => area.toLowerCase().includes(searchTerm)),
    )

    // Buscar en publicaciones
    results.publications = mockData.publications.filter(
      (pub) =>
        pub.title.toLowerCase().includes(searchTerm) ||
        pub.abstract.toLowerCase().includes(searchTerm) ||
        pub.keywords.some((keyword) => keyword.toLowerCase().includes(searchTerm)) ||
        pub.authors.some((author) => author.toLowerCase().includes(searchTerm)),
    )

    // Buscar en galería
    results.galleryItems = mockData.galleryItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    )

    // Buscar en líneas de extensión
    results.extensionLines = mockData.extensionLines.filter(
      (line) => line.title.toLowerCase().includes(searchTerm) || line.description.toLowerCase().includes(searchTerm),
    )

    // Buscar en noticias
    results.news = mockData.news.filter(
      (news) =>
        news.Titulo.toLowerCase().includes(searchTerm) ||
        news.Descripcion.toLowerCase().includes(searchTerm),
    )

    return {
      data: results,
      meta: {
        totalResults: Object.values(results).reduce((sum, arr) => sum + arr.length, 0),
        query: query,
      },
    }
  },

  // ===== SIMULACIÓN DE ACCIONES =====
  async simulateFormSubmission(formType, formData) {
    await delay(600)
    console.log(`AsyncMock - Simulando envío de formulario: ${formType}`, formData)
    return {
      success: true,
      message: `Formulario ${formType} enviado correctamente`,
      id: Math.floor(Math.random() * 1000) + Date.now(),
      data: { ...formData, id: Math.floor(Math.random() * 1000) + Date.now() },
    }
  },

  async simulateUserAction(action, data) {
    await delay(400)
    console.log(`AsyncMock - Simulando acción: ${action}`, data)
    return {
      success: true,
      message: `Acción ${action} ejecutada correctamente`,
      timestamp: new Date().toISOString(),
    }
  },

  // ===== SIMULACIÓN DE UPLOADS =====
  async simulateFileUpload(file, metadata = {}) {
    await delay(1200)
    console.log("AsyncMock - Simulando upload de archivo:", file.name, metadata)
    return {
      success: true,
      message: "Archivo subido correctamente",
      data: {
        id: Math.floor(Math.random() * 1000) + Date.now(),
        filename: file.name,
        size: file.size,
        type: file.type,
        url: `/uploads/${file.name}`,
        uploadDate: new Date().toISOString(),
        ...metadata,
      },
    }
  },
}

// Exportar el objeto asyncMock
export default asyncMock
