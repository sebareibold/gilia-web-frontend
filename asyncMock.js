// Mock data para simular respuestas de API
const mockData = {
  // ===== DATOS MOCK PARA EQUIPO =====
  teamMembers: [
    {
      id: 1,
      name: "Dra. Laura Cecchi",
      email: "laura.cecchi@gilia.com",
      phone: "+54 11 1234 5678",
      role: "Directora",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Inteligencia Artificial, Lenguajes de Programación",
      education: "Doctora en Ciencias de la Computación",
      experience: "15+ años",
      projects: 2,
      publications: 20,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2010-01-01",
      biography:
        "Directora del Grupo de Investigación en Lenguajes e Inteligencia Artificial (GILIA). Lidera investigaciones en el campo de la inteligencia artificial y lenguajes de programación.",
      researchAreas: ["Inteligencia Artificial", "Lenguajes de Programación", "Machine Learning", "Sistemas Multiagentes"],
      awards: ["RESOLUCION CONSEJO DIRECTIVO FAIF N◦ 052/10"],
      socialLinks: {
        orcid: "0000-0000-0000-0001",
        googleScholar: "scholar-profile-1",
        linkedin: "laura-cecchi-gilia",
      },
    },
    {
      id: 2,
      name: "Lic. Sandra Roger",
      email: "sandra.roger@gilia.com",
      phone: "+54 11 2345 6789",
      role: "Co-Directora",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Inteligencia Artificial, Sistemas Multiagentes",
      education: "Licenciatura en Ciencias de la Computación",
      experience: "12+ años",
      projects: 2,
      publications: 15,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2010-01-01",
      biography:
        "Co-Directora del Grupo de Investigación en Lenguajes e Inteligencia Artificial (GILIA). Especialista en sistemas multiagentes y ambientes dinámicos.",
      researchAreas: ["Sistemas Multiagentes", "Ambientes Dinámicos", "Inteligencia Artificial", "Planificación"],
      awards: ["RESOLUCION CONSEJO DIRECTIVO FAIF N◦ 052/10"],
      socialLinks: {
        orcid: "0000-0000-0000-0002",
        googleScholar: "scholar-profile-2",
        linkedin: "sandra-roger-gilia",
      },
    },
    {
      id: 3,
      name: "Mg. Gerardo Parra",
      email: "gerardo.parra@gilia.com",
      phone: "+54 11 3456 7890",
      role: "Docente Investigador",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Inteligencia Artificial, Tecnologías del Lenguaje Natural",
      education: "Magíster en Ciencias de la Computación",
      experience: "10+ años",
      projects: 2,
      publications: 12,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2010-01-01",
      biography:
        "Docente investigador del Grupo GILIA. Especialista en tecnologías del lenguaje natural y sistemas de inteligencia artificial.",
      researchAreas: ["Tecnologías del Lenguaje Natural", "Inteligencia Artificial", "Procesamiento de Lenguaje", "Machine Learning"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0003",
        googleScholar: "scholar-profile-3",
        linkedin: "gerardo-parra-gilia",
      },
    },
    {
      id: 4,
      name: "Mg. Claudio Vaucheret",
      email: "claudio.vaucheret@gilia.com",
      phone: "+54 11 4567 8901",
      role: "Docente Investigador",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Sistemas Multiagentes, Razonamiento",
      education: "Magíster en Ciencias de la Computación",
      experience: "10+ años",
      projects: 2,
      publications: 10,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2010-01-01",
      biography:
        "Docente investigador del Grupo GILIA. Especialista en sistemas multiagentes y técnicas de razonamiento en ambientes dinámicos.",
      researchAreas: ["Sistemas Multiagentes", "Razonamiento", "Ambientes Dinámicos", "Inteligencia Artificial"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0004",
        googleScholar: "scholar-profile-4",
        linkedin: "claudio-vaucheret-gilia",
      },
    },
    {
      id: 5,
      name: "Ing. Rodolfo Del Castillo",
      email: "rodolfo.delcastillo@gilia.com",
      phone: "+54 11 5678 9012",
      role: "Docente Investigador",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Ingeniería de Software, Inteligencia Artificial",
      education: "Ingeniería en Sistemas",
      experience: "8+ años",
      projects: 2,
      publications: 8,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2010-01-01",
      biography:
        "Docente investigador del Grupo GILIA. Ingeniero especializado en desarrollo de software y aplicaciones de inteligencia artificial.",
      researchAreas: ["Ingeniería de Software", "Inteligencia Artificial", "Desarrollo de Sistemas", "Arquitectura de Software"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0005",
        googleScholar: "scholar-profile-5",
        linkedin: "rodolfo-delcastillo-gilia",
      },
    },
    {
      id: 6,
      name: "Lic. Daniel Dolz",
      email: "daniel.dolz@gilia.com",
      phone: "+54 11 6789 0123",
      role: "Docente Investigador",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Lenguajes de Programación, Inteligencia Artificial",
      education: "Licenciatura en Ciencias de la Computación",
      experience: "8+ años",
      projects: 2,
      publications: 7,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2010-01-01",
      biography:
        "Docente investigador del Grupo GILIA. Especialista en lenguajes de programación y sus aplicaciones en inteligencia artificial.",
      researchAreas: ["Lenguajes de Programación", "Inteligencia Artificial", "Compiladores", "Paradigmas de Programación"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0006",
        googleScholar: "scholar-profile-6",
        linkedin: "daniel-dolz-gilia",
      },
    },
    {
      id: 7,
      name: "Lic. Pablo Kogan",
      email: "pablo.kogan@gilia.com",
      phone: "+54 11 7890 1234",
      role: "Docente Investigador",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Inteligencia Artificial, Machine Learning",
      education: "Licenciatura en Ciencias de la Computación",
      experience: "8+ años",
      projects: 2,
      publications: 9,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2010-01-01",
      biography:
        "Docente investigador del Grupo GILIA. Especialista en machine learning y técnicas de inteligencia artificial.",
      researchAreas: ["Machine Learning", "Inteligencia Artificial", "Algoritmos de Aprendizaje", "Análisis de Datos"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0007",
        googleScholar: "scholar-profile-7",
        linkedin: "pablo-kogan-gilia",
      },
    },
    {
      id: 8,
      name: "Lic. Mario Moya",
      email: "mario.moya@gilia.com",
      phone: "+54 11 8901 2345",
      role: "Docente Investigador",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Sistemas Multiagentes, Planificación",
      education: "Licenciatura en Ciencias de la Computación",
      experience: "8+ años",
      projects: 2,
      publications: 6,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2010-01-01",
      biography:
        "Docente investigador del Grupo GILIA. Especialista en sistemas multiagentes y técnicas de planificación en ambientes dinámicos.",
      researchAreas: ["Sistemas Multiagentes", "Planificación", "Ambientes Dinámicos", "Coordinación de Agentes"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0008",
        googleScholar: "scholar-profile-8",
        linkedin: "mario-moya-gilia",
      },
    },
    {
      id: 9,
      name: "Lic. Maximiliano Klemen",
      email: "maximiliano.klemen@gilia.com",
      phone: "+54 11 9012 3456",
      role: "Docente Investigador",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Tecnologías del Lenguaje Natural, Procesamiento de Texto",
      education: "Licenciatura en Ciencias de la Computación",
      experience: "8+ años",
      projects: 2,
      publications: 8,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2010-01-01",
      biography:
        "Docente investigador del Grupo GILIA. Especialista en tecnologías del lenguaje natural y procesamiento de texto.",
      researchAreas: ["Tecnologías del Lenguaje Natural", "Procesamiento de Texto", "NLP", "Análisis Lingüístico"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0009",
        googleScholar: "scholar-profile-9",
        linkedin: "maximiliano-klemen-gilia",
      },
    },
    {
      id: 10,
      name: "Lic. María Laura Pino",
      email: "marialaura.pino@gilia.com",
      phone: "+54 11 0123 4567",
      role: "Docente Investigador",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Inteligencia Artificial, Sistemas Cognitivos",
      education: "Licenciatura en Ciencias de la Computación",
      experience: "8+ años",
      projects: 2,
      publications: 7,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2010-01-01",
      biography:
        "Docente investigador del Grupo GILIA. Especialista en sistemas cognitivos y aplicaciones de inteligencia artificial.",
      researchAreas: ["Sistemas Cognitivos", "Inteligencia Artificial", "Cognición Computacional", "Modelado Cognitivo"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0010",
        googleScholar: "scholar-profile-10",
        linkedin: "marialaura-pino-gilia",
      },
    },
    {
      id: 11,
      name: "Lic. Guillermo Torres",
      email: "guillermo.torres@gilia.com",
      phone: "+54 11 1234 5678",
      role: "Docente Investigador",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Lenguajes de Programación, Compiladores",
      education: "Licenciatura en Ciencias de la Computación",
      experience: "8+ años",
      projects: 2,
      publications: 6,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2010-01-01",
      biography:
        "Docente investigador del Grupo GILIA. Especialista en lenguajes de programación y diseño de compiladores.",
      researchAreas: ["Lenguajes de Programación", "Compiladores", "Análisis Léxico", "Optimización de Código"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0011",
        googleScholar: "scholar-profile-11",
        linkedin: "guillermo-torres-gilia",
      },
    },
    {
      id: 12,
      name: "Lic. Germán Braun",
      email: "german.braun@gilia.com",
      phone: "+54 11 2345 6789",
      role: "Becario de Doctorado CONICET",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Inteligencia Artificial, Sistemas Multiagentes",
      education: "Licenciatura en Ciencias de la Computación",
      experience: "5+ años",
      projects: 2,
      publications: 4,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2015-01-01",
      biography:
        "Becario de Doctorado CONICET en el Grupo GILIA. Investigador en sistemas multiagentes e inteligencia artificial.",
      researchAreas: ["Sistemas Multiagentes", "Inteligencia Artificial", "Investigación Doctoral", "CONICET"],
      awards: ["Beca Doctoral CONICET"],
      socialLinks: {
        orcid: "0000-0000-0000-0012",
        googleScholar: "scholar-profile-12",
        linkedin: "german-braun-gilia",
      },
    },
    {
      id: 13,
      name: "Lic. Daniel Trevisani",
      email: "daniel.trevisani@gilia.com",
      phone: "+54 11 3456 7890",
      role: "Integrante",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Inteligencia Artificial, Desarrollo de Software",
      education: "Licenciatura en Ciencias de la Computación",
      experience: "5+ años",
      projects: 2,
      publications: 3,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2012-01-01",
      biography:
        "Integrante del Grupo GILIA. Especialista en desarrollo de software y aplicaciones de inteligencia artificial.",
      researchAreas: ["Desarrollo de Software", "Inteligencia Artificial", "Aplicaciones Web", "Sistemas Distribuidos"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0013",
        googleScholar: "scholar-profile-13",
        linkedin: "daniel-trevisani-gilia",
      },
    },
    {
      id: 14,
      name: "AC. Jael Yañez",
      email: "jael.yañez@gilia.com",
      phone: "+54 11 4567 8901",
      role: "Integrante",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Inteligencia Artificial, Machine Learning",
      education: "Alumno de Ciencias de la Computación",
      experience: "3+ años",
      projects: 2,
      publications: 2,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2018-01-01",
      biography:
        "Alumno avanzado integrante del Grupo GILIA. Especialista en machine learning y técnicas de inteligencia artificial.",
      researchAreas: ["Machine Learning", "Inteligencia Artificial", "Algoritmos de Aprendizaje", "Análisis de Datos"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0014",
        googleScholar: "scholar-profile-14",
        linkedin: "jael-yañez-gilia",
      },
    },
    {
      id: 15,
      name: "AC. Patricio Biondelli",
      email: "patricio.biondelli@gilia.com",
      phone: "+54 11 5678 9012",
      role: "Integrante",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Sistemas Multiagentes, Programación",
      education: "Alumno de Ciencias de la Computación",
      experience: "3+ años",
      projects: 2,
      publications: 2,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2018-01-01",
      biography:
        "Alumno avanzado integrante del Grupo GILIA. Especialista en sistemas multiagentes y programación.",
      researchAreas: ["Sistemas Multiagentes", "Programación", "Coordinación de Agentes", "Desarrollo de Software"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0015",
        googleScholar: "scholar-profile-15",
        linkedin: "patricio-biondelli-gilia",
      },
    },
    {
      id: 16,
      name: "AC. Diego Giuliani",
      email: "diego.giuliani@gilia.com",
      phone: "+54 11 6789 0123",
      role: "Integrante",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Tecnologías del Lenguaje Natural, NLP",
      education: "Alumno de Ciencias de la Computación",
      experience: "3+ años",
      projects: 2,
      publications: 2,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2018-01-01",
      biography:
        "Alumno avanzado integrante del Grupo GILIA. Especialista en tecnologías del lenguaje natural y NLP.",
      researchAreas: ["Tecnologías del Lenguaje Natural", "NLP", "Procesamiento de Texto", "Análisis Lingüístico"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0016",
        googleScholar: "scholar-profile-16",
        linkedin: "diego-giuliani-gilia",
      },
    },
    {
      id: 17,
      name: "AC. Andrea Vicente",
      email: "andrea.vicente@gilia.com",
      phone: "+54 11 7890 1234",
      role: "Integrante",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Inteligencia Artificial, Análisis de Datos",
      education: "Alumno de Ciencias de la Computación",
      experience: "3+ años",
      projects: 2,
      publications: 2,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2018-01-01",
      biography:
        "Alumno avanzado integrante del Grupo GILIA. Especialista en inteligencia artificial y análisis de datos.",
      researchAreas: ["Inteligencia Artificial", "Análisis de Datos", "Machine Learning", "Visualización de Datos"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0017",
        googleScholar: "scholar-profile-17",
        linkedin: "andrea-vicente-gilia",
      },
    },
    {
      id: 18,
      name: "AC. Fernando Buccella",
      email: "fernando.buccella@gilia.com",
      phone: "+54 11 8901 2345",
      role: "Integrante",
      department: "GILIA - Grupo de Investigación en Lenguajes e Inteligencia Artificial",
      specialization: "Lenguajes de Programación, Compiladores",
      education: "Alumno de Ciencias de la Computación",
      experience: "3+ años",
      projects: 2,
      publications: 2,
      image: "/placeholder.svg?height=80&width=80",
      status: "active",
      joinDate: "2018-01-01",
      biography:
        "Alumno avanzado integrante del Grupo GILIA. Especialista en lenguajes de programación y diseño de compiladores.",
      researchAreas: ["Lenguajes de Programación", "Compiladores", "Análisis Léxico", "Optimización de Código"],
      awards: [],
      socialLinks: {
        orcid: "0000-0000-0000-0018",
        googleScholar: "scholar-profile-18",
        linkedin: "fernando-buccella-gilia",
      },
    },
  ],

  // ===== DATOS MOCK PARA PROYECTOS =====
  projects: [
    {
      id: 1,
      title: "04/F006: Agentes Inteligentes en Ambientes Dinámicos",
      description:
        "El objetivo general de este Proyecto de Investigación es el estudio y desarrollo de técnicas de Inteligencia Artificial para dotar de inteligencia y conocimiento a agentes inmersos en mundos virtuales, interactivos y dinámicos. El énfasis es puesto tanto en formalismos de planificación y razonamiento rebatible para la creación y control de agentes inteligentes, como en el impacto que tienen las tecnologías del lenguaje humano (TLH) en la inclusión social. En estos escenarios, el razonamiento, la toma de decisiones, la planificación de acciones y el aprendizaje ocurren bajo restricciones de tiempo críticas y en intensa interacción con el usuario. A lo largo de este proyecto se estudiarán cuestiones fundacionales de la teoría y la construcción de aplicaciones en Agentes Inteligentes inmersos en ambientes dinámicos. Se buscará como meta el desarrollo de conocimiento especializado en el área de Inteligencia Artificial, estudiando técnicas de representación del conocimiento y razonamiento, junto con métodos de planificación y tecnologías del lenguaje natural aplicadas a dichos agentes. Existen diversos dominios sobre los que podemos aplicar y evaluar los resultados teóricos alcanzados a partir de nuestra investigación. Se prevé la generación de prototipos de sistemas inteligentes que puedan ser testeados particularmente en un dominio dinámico e interactivo y cuya implementación involucra a agentes inteligentes como el fútbol con robots y los videojuegos, como así también en el análisis de TLH en el ámbito de la inclusión social, como facilitadora del acceso a la información y a la educación.",
      status: "Completado",
      priority: "Alta",
      startDate: "2013-01-01",
      endDate: "2016-12-31",
      budget: 180000,
      spent: 180000,
      progress: 100,
      director: "Mg. Gerardo Parra",
      coDirector: "Dra. Laura Cecchi",
      ordenanza: "1268/13",
      team: ["Lic. Sandra Roger", "Lic. Pablo Kogan", "Lic. Mario Moya", "Lic. Germán Braun", "Lic. María Laura Pino", "Lic. Daniel Trevisani"],
      teamIds: [2, 7, 8, 12, 10, 13],
      advisors: [
        "Dr. Guillermo Simari (UNS)",
        "Dr. Antonio Fernández Rodríguez (Univ. Alicante)",
        "Dr. Jesús Peral Cortéz (Univ. Alicante)"
      ],
      category: "Sistemas Multiagentes",
      researchLineId: 1,
      tags: ["Agentes Inteligentes", "Ambientes Dinámicos", "Sistemas Multiagentes", "Inteligencia Artificial", "Tecnologías del Lenguaje Humano", "Planificación", "Razonamiento Rebatible", "Fútbol con Robots", "Videojuegos", "Inclusión Social"],
      objectives: [
        "Desarrollar técnicas de Inteligencia Artificial para agentes en mundos virtuales dinámicos",
        "Implementar formalismos de planificación y razonamiento rebatible",
        "Estudiar el impacto de las tecnologías del lenguaje humano en la inclusión social",
        "Crear prototipos de sistemas inteligentes para fútbol con robots y videojuegos",
        "Desarrollar aplicaciones de TLH para facilitar el acceso a la información y educación",
      ],
      deliverables: [
        { name: "Marco Teórico y Fundacional", completed: true, dueDate: "2013-06-30" },
        { name: "Diseño de Agentes Inteligentes", completed: true, dueDate: "2014-03-31" },
        { name: "Implementación de Sistemas de Planificación", completed: true, dueDate: "2015-06-30" },
        { name: "Prototipos de Fútbol con Robots", completed: true, dueDate: "2016-06-30" },
        { name: "Aplicaciones de TLH para Inclusión Social", completed: true, dueDate: "2016-12-31" },
      ],
      milestones: [
        { name: "Sistema de Agentes Básico", date: "2014-12-31", completed: true },
        { name: "Prototipo de Fútbol con Robots", date: "2015-12-31", completed: true },
        { name: "Aplicaciones de TLH", date: "2016-12-31", completed: true },
      ],
      fundingSource: "CONICET",
      collaborations: ["Universidad Nacional del Sur", "Universidad de Alicante"],
      publications: [1, 2, 3, 4, 5],
      risks: [],
    },
    {
      id: 2,
      title: "04/E084: Sistemas Multiagentes en Ambientes Dinámicos: Planificación, Razonamiento y Tecnologías del Lenguaje Natural",
      description:
        "Proyecto de investigación que integra sistemas multiagentes, técnicas de planificación, razonamiento y tecnologías del lenguaje natural para operar en ambientes dinámicos.",
      status: "Completado",
      priority: "Alta",
      startDate: "2010-01-01",
      endDate: "2012-12-31",
      budget: 120000,
      spent: 120000,
      progress: 100,
      team: ["Dra. Laura Cecchi", "Lic. Sandra Roger", "Mg. Gerardo Parra", "Mg. Claudio Vaucheret", "Ing. Rodolfo Del Castillo", "Lic. Daniel Dolz", "Lic. Pablo Kogan", "Lic. Mario Moya", "Lic. Maximiliano Klemen", "Lic. María Laura Pino", "Lic. Guillermo Torres"],
      teamIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      category: "Sistemas Multiagentes y NLP",
      researchLineId: 2,
      tags: ["Sistemas Multiagentes", "Planificación", "Razonamiento", "Tecnologías del Lenguaje Natural", "Ambientes Dinámicos"],
      objectives: [
        "Desarrollar sistemas multiagentes para ambientes dinámicos",
        "Implementar técnicas de planificación adaptativa",
        "Integrar sistemas de razonamiento",
        "Aplicar tecnologías del lenguaje natural",
      ],
      deliverables: [
        { name: "Análisis de Requerimientos", completed: true, dueDate: "2010-06-30" },
        { name: "Diseño de Sistema Multiagente", completed: true, dueDate: "2011-03-31" },
        { name: "Implementación de Planificación", completed: true, dueDate: "2011-12-31" },
        { name: "Integración de NLP", completed: true, dueDate: "2012-06-30" },
        { name: "Validación y Documentación", completed: true, dueDate: "2012-12-31" },
      ],
      milestones: [
        { name: "Sistema Multiagente Básico", date: "2011-06-30", completed: true },
        { name: "Integración de Componentes", date: "2012-06-30", completed: true },
        { name: "Sistema Completo", date: "2012-12-31", completed: true },
      ],
      fundingSource: "CONICET",
      collaborations: ["Universidad Nacional del Sur", "Universidad de Buenos Aires"],
      publications: [6, 7, 8, 9, 10],
      risks: [],
    },
  ],

  // ===== DATOS MOCK PARA LÍNEAS DE INVESTIGACIÓN =====
  researchLines: [
    {
      id: 1,
      title: "Inteligencia Artificial y Machine Learning",
      description:
        "Investigación en algoritmos de aprendizaje automático, redes neuronales profundas y aplicaciones de IA en diversos dominios.",
      status: "Activa",
      priority: "Alta",
      startDate: "2020-01-15",
      leader: "Dr. Ana María González",
      leaderId: 1,
      team: ["Dr. Ana González", "Dr. Carlos Rodríguez", "Ing. Miguel Torres", "Dra. Sofia Herrera"],
      teamIds: [1, 2, 4, 5],
      projects: 8,
      publications: 25,
      budget: 300000,
      objectives: [
        "Desarrollar algoritmos de deep learning más eficientes",
        "Aplicar IA en el sector salud y medicina",
        "Crear herramientas de análisis predictivo",
        "Investigar en IA explicable y ética",
      ],
      keyAreas: [
        "Deep Learning",
        "Computer Vision",
        "Natural Language Processing",
        "Reinforcement Learning",
        "AI Ethics",
      ],
      achievements: [
        "5 algoritmos patentados",
        "3 premios internacionales",
        "15 colaboraciones industriales",
        "50+ estudiantes formados",
      ],
      collaborations: ["Universidad Nacional", "MIT", "Google Research", "Hospital San Ignacio"],
      impact: "Alto",
      fundingSources: ["Colciencias", "MinCiencias", "Empresa Privada"],
      nextMilestones: [
        "Publicación en Nature AI - Q2 2024",
        "Lanzamiento de plataforma IA médica - Q3 2024",
        "Conferencia internacional - Q4 2024",
      ],
      relatedProjects: [1, 4],
      relatedPublications: [1, 6],
    },
    {
      id: 2,
      title: "Procesamiento de Lenguaje Natural",
      description:
        "Investigación en comprensión y generación de lenguaje natural, análisis de sentimientos y aplicaciones de NLP en español.",
      status: "Activa",
      priority: "Media",
      startDate: "2021-06-10",
      leader: "Dra. Laura Martínez",
      leaderId: 3,
      team: ["Dra. Laura Martínez", "Ing. Miguel Torres"],
      teamIds: [3, 4],
      projects: 4,
      publications: 12,
      budget: 150000,
      objectives: [
        "Desarrollar modelos de NLP para español",
        "Crear herramientas de análisis de sentimientos",
        "Investigar en generación de texto automática",
        "Aplicar NLP en redes sociales y medios",
      ],
      keyAreas: ["Sentiment Analysis", "Text Generation", "Spanish NLP", "Social Media Analysis", "Chatbots"],
      achievements: [
        "3 datasets públicos creados",
        "1 herramienta open source",
        "10 publicaciones",
        "15+ estudiantes formados",
      ],
      collaborations: ["Universidad Javeriana", "Medios de comunicación", "Empresas de marketing", "Gobierno Nacional"],
      impact: "Medio",
      fundingSources: ["MinCiencias", "Universidad"],
      nextMilestones: [
        "Lanzamiento de API pública - Q2 2024",
        "Colaboración con medios - Q3 2024",
        "Expansión a otros idiomas - Q1 2025",
      ],
      relatedProjects: [2],
      relatedPublications: [3, 5],
    },
    {
      id: 3,
      title: "Robótica y Sistemas Autónomos",
      description:
        "Desarrollo de robots autónomos, sistemas de navegación inteligente y aplicaciones robóticas en entornos industriales y domésticos.",
      status: "Activa",
      priority: "Alta",
      startDate: "2020-03-20",
      leader: "Dr. Carlos Rodríguez",
      leaderId: 2,
      team: ["Dr. Carlos Rodríguez", "Ing. Miguel Torres", "Dra. Sofia Herrera"],
      teamIds: [2, 4, 5],
      projects: 6,
      publications: 18,
      budget: 250000,
      objectives: [
        "Desarrollar robots autónomos para navegación indoor",
        "Implementar sistemas SLAM avanzados",
        "Crear interfaces humano-robot intuitivas",
        "Investigar en robótica colaborativa",
      ],
      keyAreas: [
        "Autonomous Navigation",
        "SLAM",
        "Computer Vision",
        "Human-Robot Interaction",
        "Collaborative Robotics",
      ],
      achievements: [
        "2 prototipos funcionales",
        "1 patente en proceso",
        "8 publicaciones Q1",
        "20+ estudiantes formados",
      ],
      collaborations: ["Universidad de los Andes", "SENA", "Empresas manufactureras", "Hospitales locales"],
      impact: "Medio",
      fundingSources: ["MinCiencias", "Regalías", "Sector Privado"],
      nextMilestones: [
        "Prototipo comercial - Q3 2024",
        "Pruebas piloto en hospitales - Q4 2024",
        "Spin-off empresarial - Q1 2025",
      ],
      relatedProjects: [3],
      relatedPublications: [2],
    },
  ],

  // ===== DATOS MOCK PARA PUBLICACIONES =====
  publications: [
    {
      id: 1,
      title: "Deep Learning Approaches for Medical Image Analysis: A Comprehensive Review",
      authors: ["Dr. Ana María González", "Dr. Carlos Rodríguez", "Dra. Sofia Herrera"],
      authorIds: [1, 2, 5],
      journal: "Nature Machine Intelligence",
      type: "Artículo de Revista",
      year: 2024,
      month: "Marzo",
      volume: "6",
      issue: "3",
      pages: "245-267",
      doi: "10.1038/s42256-024-00789-1",
      url: "https://nature.com/articles/s42256-024-00789-1",
      abstract:
        "Este artículo presenta una revisión exhaustiva de las técnicas de deep learning aplicadas al análisis de imágenes médicas, incluyendo diagnóstico por imagen, segmentación automática y detección de anomalías.",
      keywords: ["Deep Learning", "Medical Imaging", "Computer Vision", "Healthcare AI"],
      status: "Publicado",
      impact: "Alto",
      quartile: "Q1",
      citations: 45,
      downloads: 1250,
      category: "Inteligencia Artificial",
      fundingSource: "MinCiencias",
      researchLineId: 1,
      projectIds: [1],
      collaborations: ["Hospital San Ignacio", "MIT"],
      awards: ["Best Paper Award - MICCAI 2024"],
      pdfUrl: "/documents/deep-learning-medical-review.pdf",
    },
    {
      id: 2,
      title: "Autonomous Navigation Systems for Indoor Robotics: SLAM Implementation and Performance Analysis",
      authors: ["Dr. Carlos Rodríguez", "Ing. Miguel Torres"],
      authorIds: [2, 4],
      journal: "IEEE Transactions on Robotics",
      type: "Artículo de Revista",
      year: 2024,
      month: "Enero",
      volume: "40",
      issue: "1",
      pages: "123-145",
      doi: "10.1109/TRO.2024.3356789",
      url: "https://ieeexplore.ieee.org/document/10456789",
      abstract:
        "Presentamos un sistema de navegación autónoma para robots móviles en entornos interiores, implementando algoritmos SLAM avanzados con sensores LiDAR y cámaras RGB-D.",
      keywords: ["SLAM", "Autonomous Navigation", "Mobile Robotics", "Indoor Navigation"],
      status: "Publicado",
      impact: "Alto",
      quartile: "Q1",
      citations: 28,
      downloads: 890,
      category: "Robótica",
      fundingSource: "Colciencias",
      researchLineId: 3,
      projectIds: [3],
      collaborations: ["Universidad de los Andes"],
      awards: [],
      pdfUrl: "/documents/autonomous-navigation-slam.pdf",
    },
    {
      id: 3,
      title: "Sentiment Analysis in Spanish Social Media: A Multi-Modal Approach",
      authors: ["Dra. Laura Martínez", "Ing. Miguel Torres"],
      authorIds: [3, 4],
      journal: "Computational Linguistics",
      type: "Artículo de Revista",
      year: 2023,
      month: "Diciembre",
      volume: "49",
      issue: "4",
      pages: "789-812",
      doi: "10.1162/coli_a_00456",
      url: "https://direct.mit.edu/coli/article/49/4/789",
      abstract:
        "Desarrollamos un enfoque multi-modal para análisis de sentimientos en redes sociales en español, combinando texto, imágenes y metadatos contextuales.",
      keywords: ["Sentiment Analysis", "Spanish NLP", "Social Media", "Multi-modal Learning"],
      status: "Publicado",
      impact: "Medio",
      quartile: "Q2",
      citations: 15,
      downloads: 567,
      category: "Procesamiento de Lenguaje Natural",
      fundingSource: "Universidad",
      researchLineId: 2,
      projectIds: [2],
      collaborations: ["Universidad Javeriana"],
      awards: [],
      pdfUrl: "/documents/sentiment-analysis-spanish.pdf",
    },
    {
      id: 12,
      titulo: "Redes Generativas Antagónicas para Síntesis de Imágenes Médicas",
      autores: "Dr. Ana María González, Dra. Sofia Herrera",
      anio: 2024,
      tipo: "Artículo",
      enlace: "https://ejemplo.com/gan-medicas",
      editor: "Nature Medicine",
      pagina_libro: "pp. 101-120",
      resumen: "Se exploran las aplicaciones de GANs para la generación de imágenes médicas sintéticas y su impacto en el entrenamiento de modelos de IA.",
      linea_investigacions: "Inteligencia Artificial y Machine Learning",
      linea_extensions: "Salud Digital Comunitaria"
    },
    {
      id: 13,
      titulo: "Procesamiento de Lenguaje Natural en Español: Retos y Avances",
      autores: "Dra. Laura Martínez, Ing. Miguel Torres",
      anio: 2023,
      tipo: "Paper",
      enlace: "https://ejemplo.com/nlp-espanol",
      editor: "ACL Anthology",
      pagina_libro: "pp. 55-70",
      resumen: "Revisión de los principales desafíos y avances en NLP para el idioma español, incluyendo datasets y modelos recientes.",
      linea_investigacions: "Procesamiento de Lenguaje Natural",
      linea_extensions: "Tecnología Educativa"
    },
    {
      id: 14,
      titulo: "Robótica Colaborativa en la Industria 4.0",
      autores: "Dr. Carlos Rodríguez, Ing. Miguel Torres",
      anio: 2022,
      tipo: "Capítulo de Libro",
      enlace: "https://ejemplo.com/robotica-industria",
      editor: "Springer",
      pagina_libro: "Cap. 8, pp. 201-220",
      resumen: "Capítulo dedicado a la integración de robots colaborativos en procesos industriales inteligentes.",
      linea_investigacions: "Robótica y Sistemas Autónomos",
      linea_extensions: "Sistemas de Información Comunitarios"
    },
    {
      id: 15,
      titulo: "Gamificación y Aprendizaje Adaptativo en Plataformas Online",
      autores: "Dra. Laura Martínez, Dr. Pablo Suárez",
      anio: 2021,
      tipo: "Libro",
      enlace: "https://ejemplo.com/gamificacion-aprendizaje",
      editor: "Editorial Educativa",
      pagina_libro: "ISBN 978-3-16-148410-0",
      resumen: "Libro sobre técnicas de gamificación y sistemas adaptativos para mejorar la motivación y el aprendizaje en línea.",
      linea_investigacions: "Tecnología Educativa",
      linea_extensions: "Innovación Social y Tecnología"
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
      title: "Tecnología Educativa",
      description:
        "Desarrollo e implementación de herramientas tecnológicas para mejorar los procesos de enseñanza-aprendizaje en instituciones educativas de la región.",
      status: "Activa",
      startDate: "2021-01-15",
      leader: "Dra. Laura Martínez",
      leaderId: 3,
      team: ["Dra. Laura Martínez", "Ing. Miguel Torres"],
      teamIds: [3, 4],
      projects: 5,
      beneficiaries: 1200,
      institutions: [
        "Escuela Primaria N°123",
        "Instituto Secundario San Martín",
        "Centro de Formación Profesional",
        "Universidad Nacional Regional",
      ],
      objectives: [
        "Democratizar el acceso a la tecnología educativa",
        "Capacitar docentes en el uso de herramientas digitales",
        "Desarrollar software educativo adaptado a necesidades locales",
        "Promover la innovación pedagógica mediante la tecnología",
      ],
      activities: [
        "Talleres de capacitación docente",
        "Desarrollo de plataformas educativas",
        "Implementación de laboratorios digitales",
        "Seguimiento y evaluación de impacto",
      ],
      impact: "Alto",
      budget: 80000,
      fundingSources: ["MinEducación", "Universidad", "Alcaldía Local"],
    },
    {
      id: 2,
      title: "Sistemas de Información Comunitarios",
      description:
        "Implementación de sistemas de información para organizaciones comunitarias, ONGs locales y cooperativas.",
      status: "Activa",
      startDate: "2022-03-01",
      leader: "Ing. Miguel Torres",
      leaderId: 4,
      team: ["Ing. Miguel Torres", "Dr. Carlos Rodríguez"],
      teamIds: [4, 2],
      projects: 3,
      beneficiaries: 800,
      institutions: [
        "Fundación Esperanza",
        "Centro Comunitario Norte",
        "Cooperativa de Trabajo Unidos",
        "ONG Manos Solidarias",
      ],
      objectives: [
        "Fortalecer la gestión organizacional",
        "Mejorar la comunicación comunitaria",
        "Digitalizar procesos administrativos",
        "Capacitar en uso de tecnologías",
      ],
      activities: [
        "Desarrollo de sistemas de gestión",
        "Capacitación en herramientas digitales",
        "Soporte técnico continuo",
        "Evaluación de impacto social",
      ],
      impact: "Medio",
      budget: 60000,
      fundingSources: ["Regalías", "Cooperación Internacional"],
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
    description:
      "Somos el Grupo de Investigación en Lenguajes e Inteligencia Artificial (GILIA), un equipo multidisciplinario dedicado a explorar las fronteras del conocimiento en procesamiento de lenguaje natural, sistemas inteligentes y tecnologías emergentes.",
    information:
      "Fundado en 2016, GILIA se ha consolidado como un referente en investigación aplicada en ciencias de la computación. Nuestro grupo trabaja en estrecha colaboración con instituciones nacionales e internacionales, desarrollando proyectos que van desde el análisis de sentimientos en redes sociales hasta sistemas de traducción automática para lenguas originarias.",
    mission:
      "Desarrollar investigación de excelencia en inteligencia artificial y tecnologías emergentes, formando talento humano de alto nivel y contribuyendo al desarrollo científico y tecnológico del país.",
    vision:
      "Ser reconocidos como un grupo de investigación líder en América Latina en el campo de la inteligencia artificial y las tecnologías emergentes.",
    values: [
      "Excelencia académica",
      "Innovación tecnológica",
      "Responsabilidad social",
      "Colaboración interdisciplinaria",
      "Ética en la investigación",
    ],
    history: [
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
      title: "Excelencia en Investigación",
      description:
        "Desarrollar investigación de clase mundial en las áreas de inteligencia artificial, procesamiento de lenguaje natural y ciencias de la computación.",
      icon: "target",
      priority: "Alta",
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
      imagen: "/imagenRandom.png",
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
      imagen: "/imagenRandom.png",
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
      imagen: "/imagenRandom.png",
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
      imagen: "/imagenRandom.png",
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
      imagen: "/imagenRandom.png",
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
      imagen: "/imagenRandom.png",
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
      imagen: "/imagenRandom.png",
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
      imagen: "/imagenRandom.png",
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
    return { data: mockData.aboutInfo }
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
