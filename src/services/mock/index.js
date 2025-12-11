// Mock data: Este archivo sirve para simular respuestas de API y poder cargar datos de manera local
// Lo usamos puntualmente en el desarrollo

const mockData = {
  teamMembers: [
    {
      id: 1,
      name: "Laura",
      lastname: "Cecchi",
      email: "laura.cecchi@gilia.com",
      phone: "+54 9 2944 123456",
      isAuthor: true,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://ar.linkedin.com/in/laura-andrea-cecchi-064a6791",
      githubLink: "https://github.com/lauracecchi",
    },
    {
      id: 2,
      name: "Sandra",
      lastname: "Roger",
      email: "sandra.roger@gilia.com",
      phone: "+54 9 2944 123457",
      isAuthor: true,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://ar.linkedin.com/in/sandra-roger-a8321a33",
      githubLink: "https://github.com/sandraroger",
    },
    {
      id: 3,
      name: "Gerardo",
      lastname: "Parra",
      email: "gerardo.parra@gilia.com",
      phone: "+54 9 2944 123458",
      isAuthor: true,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://linkedin.com/in/gerardo-parra",
      githubLink: "https://github.com/gerardoparra",
    },
    {
      id: 4,
      name: "Claudio",
      lastname: "Vaucheret",
      email: "claudio.vaucheret@gilia.com",
      phone: "+54 9 2944 123459",
      isAuthor: true,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://ar.linkedin.com/in/claudio-vaucheret-896aa555",
      githubLink: "https://github.com/claudiovaucheret",
    },
    {
      id: 5,
      name: "Rodolfo",
      lastname: "Del Castillo",
      email: "rodolfo.delcastillo@gilia.com",
      phone: "+54 9 2944 123460",
      isAuthor: true,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://linkedin.com/in/rodolfo-delcastillo-gilia",
      githubLink: "https://github.com/rodolfodelcastillo",
    },
    {
      id: 6,
      name: "Daniel",
      lastname: "Dolz",
      email: "daniel.dolz@gilia.com",
      phone: "+54 9 2944 123461",
      isAuthor: true,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://ar.linkedin.com/in/daniel-dolz-2304aa47",
      githubLink: "https://github.com/danieldolz",
    },
    {
      id: 7,
      name: "Pablo",
      lastname: "Kogan",
      email: "pablo.kogan@gilia.com",
      phone: "+54 9 2944 123462",
      isAuthor: true,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://ar.linkedin.com/in/pablo-kogan",
      githubLink: "https://github.com/pablokogan",
    },
    {
      id: 8,
      name: "Mario",
      lastname: "Moya",
      email: "mario.moya@gilia.com",
      phone: "+54 9 2944 123463",
      isAuthor: true,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://linkedin.com/in/mario-moya-gilia",
      githubLink: "https://github.com/mariomoya",
    },
    {
      id: 9,
      name: "Maximiliano",
      lastname: "Klemen",
      email: "maximiliano.klemen@gilia.com",
      phone: "+54 9 2944 123464",
      isAuthor: true,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://linkedin.com/in/maximiliano-klemen-gilia",
      githubLink: "https://github.com/maxiklemen",
    },
    {
      id: 10,
      name: "María Laura",
      lastname: "Pino",
      email: "marialaura.pino@gilia.com",
      phone: "+54 9 2944 123465",
      isAuthor: true,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://linkedin.com/in/marialaura-pino-gilia",
      githubLink: "https://github.com/marialaurapino",
    },
    {
      id: 11,
      name: "Guillermo",
      lastname: "Torres",
      email: "guillermo.torres@gilia.com",
      phone: "+54 9 2944 123466",
      isAuthor: true,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://linkedin.com/in/guillermo-torres-gilia",
      githubLink: "https://github.com/guillermotorres",
    },
    {
      id: 12,
      name: "Germán",
      lastname: "Braun",
      email: "german.braun@gilia.com",
      phone: "+54 9 2944 123467",
      isAuthor: true,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://ar.linkedin.com/in/germanbraun",
      githubLink: "https://github.com/germanbraun",
    },
    {
      id: 13,
      name: "Daniel",
      lastname: "Trevisani",
      email: "daniel.trevisani@gilia.com",
      phone: "+54 9 2944 123468",
      isAuthor: false,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://linkedin.com/in/daniel-trevisani-gilia",
      githubLink: "https://github.com/danieltrevisani",
    },
    {
      id: 14,
      name: "Jael",
      lastname: "Yáñez",
      email: "jael.yañez@gilia.com",
      phone: "+54 9 2944 123469",
      isAuthor: false,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://linkedin.com/in/jael-yañez-gilia",
      githubLink: "https://github.com/jaelyanez",
    },
    {
      id: 15,
      name: "Patricio",
      lastname: "Biondelli",
      email: "patricio.biondelli@gilia.com",
      phone: "+54 9 2944 123470",
      isAuthor: false,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://linkedin.com/in/patricio-biondelli-gilia",
      githubLink: "https://github.com/patriciobiondelli",
    },
    {
      id: 16,
      name: "Diego",
      lastname: "Giuliani",
      email: "diego.giuliani@gilia.com",
      phone: "+54 9 2944 123471",
      isAuthor: false,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://linkedin.com/in/diego-giuliani-gilia",
      githubLink: "https://github.com/diegogiuliani",
    },
    {
      id: 17,
      name: "Andrea",
      lastname: "Vicente",
      email: "andrea.vicente@gilia.com",
      phone: "+54 9 2944 123472",
      isAuthor: false,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://linkedin.com/in/andrea-vicente-gilia",
      githubLink: "https://github.com/andreavicente",
    },
    {
      id: 18,
      name: "Fernando",
      lastname: "Buccella",
      email: "fernando.buccella@gilia.com",
      phone: "+54 9 2944 123473",
      isAuthor: false,
      profilePicture: "/perfil_person.png",
      linkedinLink: "https://linkedin.com/in/fernando-buccella-gilia",
      githubLink: "https://github.com/fernandobuccella",
    },
  ],

  // ===== DATOS MOCK PARA PROYECTOS =====
  projects: [
    {
      id: 1,
      name: "Ontologías en la Web",
      description:
        "Desarrollo de un marco de trabajo basado en ontologías para la web semántica que permita la integración y consulta de datos heterogéneos.",
      startDate: "2022-01-01",
      endDate: "2024-12-31",
      status: "Activo",
    },
    {
      id: 2,
      name: "Procesamiento de Lenguaje Natural",
      description:
        "Investigación y desarrollo de modelos avanzados de procesamiento de lenguaje natural para el análisis de sentimientos y extracción de información.",
      startDate: "2023-01-01",
      endDate: "2025-12-31",
      status: "Activo",
    },
    {
      id: 3,
      name: "Robótica y Sistemas Embebidos",
      description:
        "Diseño e implementación de sistemas robóticos autónomos con procesamiento embebido para aplicaciones industriales.",
      startDate: "2021-01-01",
      endDate: "2023-12-31",
      status: "Activo",
    },
    {
      id: 4,
      name: "Aprendizaje Automático Aplicado",
      description:
        "Desarrollo de algoritmos de aprendizaje automático para la solución de problemas complejos en diferentes dominios de aplicación.",
      startDate: "2023-06-01",
      endDate: "2025-05-31",
      status: "Activo",
    },
    {
      id: 5,
      name: "Seguridad Informática Avanzada",
      description:
        "Investigación en técnicas avanzadas de ciberseguridad y desarrollo de herramientas para la protección de sistemas informáticos.",
      startDate: "2022-09-01",
      endDate: "2024-08-31",
      status: "Activo",
    },
    {
      id: 6,
      name: "Realidad Virtual y Aumentada",
      description:
        "Desarrollo de aplicaciones inmersivas utilizando tecnologías de realidad virtual y aumentada para entornos educativos y de capacitación.",
      startDate: "2023-03-15",
      endDate: "2025-03-14",
      status: "Activo",
    },
    {
      id: 7,
      name: "Computación en la Nube",
      description:
        "Investigación y desarrollo de arquitecturas escalables y seguras para la implementación de servicios en la nube.",
      startDate: "2022-01-01",
      endDate: "2023-12-31",
      status: "Activo",
    },
  ],

  // ===== DATOS MOCK PARA LÍNEAS DE INVESTIGACIÓN =====
  researchLines: [
    {
      id: 1,
      title: "Ontologías y Web Semántica",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      images: "",
      status: "Activa",
      relatedProjects: [2],
      relatedPublications: [2],
    },
    {
      id: 2,
      title: "Procesamiento del Lenguaje Natural",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      images: "",
      status: "Activa",
      relatedProjects: [2],
      relatedPublications: [2],
    },
    {
      id: 3,
      title: "Robótica y Sistemas Embebidos",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      images: "",
      status: "Activa",
      relatedProjects: [2],
      relatedPublications: [2],
    },
    {
      id: 4,
      title: "Sistemas Inteligentes",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      images: "",
      status: "Activa",
      relatedProjects: [2],
      relatedPublications: [2],
    },
    {
      id: 5,
      title: "Educación en las Ciencias de la Computación",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      images: "",
      status: "Activa",
      relatedProjects: [2],
      relatedPublications: [2],
    },
    {
      id: 6,
      title: "Lenguajes de Programación",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      images: "",
      status: "Activa",
      relatedProjects: [2],
      relatedPublications: [2],
    },
    {
      id: 7,
      title: "Ética en Ciencias de la Computación",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod. Etiam euismod, nisi euismod euismod, nisi nisi euismod nisi, euismod euismod nisi nisi euismod.",
      images: "",
      status: "Activa",
      relatedProjects: [2],
      relatedPublications: [2],
    },
  ],

  // ===== DATOS MOCK PARA PUBLICACIONES =====
  publications: [
    {
      id: 1,
      title: "Publicación 1: Ontologías en la Web",
      description:
        "Un estudio detallado sobre el uso de ontologías en la web semántica y su aplicación en sistemas de información.",
      date: "2023-05-15",
      publicationLink: "https://ejemplo.com/publicacion1",
      personas: [1, 2], // IDs de Laura Cecchi y Sandra Roger
      researchline: 1, // ID de la línea de investigación relacionada
      extensionline: null,
    },
    {
      id: 2,
      title: "Publicación 2: Aprendizaje Automático",
      description:
        "Avances recientes en algoritmos de aprendizaje automático aplicados a procesamiento de lenguaje natural.",
      date: "2023-04-22",
      publicationLink: "https://ejemplo.com/publicacion2",
      personas: [3, 7], // IDs de Gerardo Parra y Pablo Kogan
      researchline: 2,
      extensionline: null,
    },
    {
      id: 3,
      title: "Publicación 3: Sistemas Multiagentes",
      description:
        "Diseño e implementación de sistemas multiagentes para la resolución de problemas complejos.",
      date: "2023-03-10",
      publicationLink: "https://ejemplo.com/publicacion3",
      personas: [2, 4, 8], // IDs de Sandra Roger, Claudio Vaucheret y Mario Moya
      researchline: 3,
      extensionline: 1,
    },
    {
      id: 4,
      title: "Publicación 4: Lenguajes de Programación",
      description:
        "Nuevos paradigmas en lenguajes de programación para inteligencia artificial.",
      date: "2023-02-28",
      publicationLink: "https://ejemplo.com/publicacion4",
      personas: [6, 1], // IDs de Daniel Dolz y Laura Cecchi
      researchline: 1,
      extensionline: 2,
    },
    {
      id: 5,
      title: "Publicación 5: Aplicaciones de IA en Educación",
      description:
        "Uso de técnicas de inteligencia artificial para personalizar el aprendizaje.",
      date: "2023-01-15",
      publicationLink: "https://ejemplo.com/publicacion5",
      personas: [9, 10], // IDs de Maximiliano Klemen y María Laura Pino
      researchline: 2,
      extensionline: 3,
    },
    {
      id: 6,
      title: "Publicación 6: Análisis de Datos",
      description:
        "Técnicas avanzadas de análisis de datos para grandes volúmenes de información.",
      date: "2022-12-05",
      publicationLink: "https://ejemplo.com/publicacion6",
      personas: [7, 5], // IDs de Pablo Kogan y Rodolfo Del Castillo
      researchline: 4,
      extensionline: 4,
    },
    {
      id: 7,
      title: "Publicación 7: Redes Neuronales",
      description:
        "Aplicación de redes neuronales profundas en problemas de visión por computadora.",
      date: "2022-11-20",
      publicationLink: "https://ejemplo.com/publicacion7",
      personas: [3, 1, 2], // IDs de Gerardo Parra, Laura Cecchi y Sandra Roger
      researchline: 2,
      extensionline: 5,
    },
  ],

  // ===== DATOS MOCK PARA GALERÍA =====
  galleryItems: [
    {
      id: 1,
      title: "Laboratorio de Inteligencia Artificial",
      description:
        "Vista general del laboratorio principal donde se desarrollan proyectos de IA y machine learning.",
      images: [
        {
          url: "/placeholder.svg?height=600&width=800",
          alt: "Vista del laboratorio de IA con equipos de cómputo y estaciones de trabajo",
        },
      ],
    },
    {
      id: 2,
      title: "Equipo de Robótica en Acción",
      description:
        "Miembros del equipo trabajando en el desarrollo de robots autónomos para navegación indoor.",
      images: [
        {
          url: "/placeholder.svg?height=600&width=800",
          alt: "Investigadores trabajando en el laboratorio de robótica",
        },
      ],
    },
    {
      id: 3,
      title: "Presentación en Conferencia Internacional",
      description:
        "Dr. Carlos Rodríguez presentando resultados de investigación en ICRA 2024.",
      images: [
        {
          url: "/videos/icra-presentation.mp4",
          thumbnail: "/placeholder.svg?height=300&width=400",
          alt: "Presentación de investigación en conferencia internacional",
        },
      ],
    },
  ],

  // ===== DATOS MOCK PARA LÍNEAS DE EXTENSIÓN =====
  extensionLines: [
    {
      id: 1,
      title: "Programación en escuela primaria",
      description:
        "Iniciativa para enseñar conceptos básicos de programación a estudiantes de nivel primario, fomentando el pensamiento computacional desde temprana edad.",
      status: "Activa",
      images: [
        {
          url: "/images/extension/primaria-1.jpg",
          alt: "Estudiantes de primaria en taller de programación",
        },
        {
          url: "/images/extension/primaria-2.jpg",
          alt: "Material didáctico para enseñanza de programación",
        },
      ],
    },
    {
      id: 2,
      title: "Computación en escuela secundaria",
      description:
        "Programa orientado a estudiantes de nivel secundario para introducirlos en conceptos avanzados de computación y programación.",
      status: "Activa",
      images: [
        {
          url: "/images/extension/secundaria-1.jpg",
          alt: "Estudiantes de secundaria en clase de informática",
        },
      ],
    },
    {
      id: 3,
      title: "Extensión y Género",
      description:
        "Programa para promover la igualdad de género en el ámbito tecnológico a través de talleres y actividades de concientización.",
      status: "Activa",
      images: [
        {
          url: "/images/extension/genero-1.jpg",
          alt: "Taller sobre género y tecnología",
        },
      ],
    },
    {
      id: 4,
      title: "FAI Compensando la Red",
      description:
        "Iniciativa para promover el desarrollo de software de código abierto que beneficie a la comunidad universitaria y local.",
      status: "Activa",
      images: [
        {
          url: "/images/extension/fai-1.jpg",
          alt: "Equipo trabajando en desarrollo de software comunitario",
        },
      ],
    },
    {
      id: 5,
      title: "Divulgación Científica",
      description:
        "Actividades para acercar la ciencia y la tecnología a la comunidad a través de charlas, talleres y eventos abiertos.",
      status: "Activa",
      images: [
        {
          url: "/images/extension/divulgacion-1.jpg",
          alt: "Charla de divulgación científica",
        },
      ],
    },
    {
      id: 6,
      title: "Género y STEM",
      description:
        "Programa para fomentar la participación de mujeres y diversidades en carreras de ciencia, tecnología, ingeniería y matemáticas.",
      status: "Activa",
      images: [
        {
          url: "/images/extension/stem-1.jpg",
          alt: "Mujeres en taller de robótica",
        },
      ],
    },
    {
      id: 7,
      title: "Ética en Ciencias de la Computación",
      description:
        "Iniciativa para reflexionar sobre los aspectos éticos del desarrollo tecnológico y su impacto en la sociedad.",
      status: "Activa",
    },
  ],

  // ===== DATOS MOCK PARA USURIOS =====
  Users: {
    emial: "admin@email.com",
    password: "admin123",
    role: "desarrolador",
    is_active: true,
  },

  // ===== DATOS MOCK PARA INFORMACIÓN PÚBLICA =====
  aboutInfo: {
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
      {
        year: 2020,
        event: "Reconocimiento como grupo de investigación categoría A",
      },
      { year: 2022, event: "Primer premio nacional de innovación" },
      {
        year: 2024,
        event: "Expansión internacional con colaboraciones en MIT",
      },
    ],
  },

  objectives: [
    {
      id: 1,
      title: "Excelencia en Investigación",
      description:
        "Desarrollar investigación de clase mundial en las áreas de inteligencia artificial, procesamiento de lenguaje natural y ciencias de la computación.",
      icon: "BulbOutlined",
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
      title:
        "Revolucionario Modelo de IA para Procesamiento de Lenguaje Natural",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.",
      link: "https://www.ieee.org/publications/",
      image: "/novedad.png",
      category: "Investigación",
      views: 1250,
      featured: true,
    },
    {
      id: 2,
      title: "Participación Destacada en ICAI 2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.",
      link: "https://www.icai-conference.org/",
      image: "/novedad.png",
      category: "Conferencia",
      views: 890,
      featured: false,
    },
    {
      id: 3,
      title: "Proyecto Horizon Europe Multinacional",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.",
      link: "https://ec.europa.eu/programmes/horizon2020/",
      image: "/novedad.png",
      category: "Proyecto",
      views: 2100,
      featured: true,
    },
    {
      id: 4,
      title: "Premio Nacional: Traductor Español-Guaraní",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.",
      link: "https://www.conicet.gov.ar/",
      image: "/novedad.png",
      category: "Premio",
      views: 1750,
      featured: false,
    },
    {
      id: 5,
      title: "Plataforma Educativa con IA Personalizada",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.",
      link: "https://www.edx.org/",
      image: "/novedad.png",
      category: "Lanzamiento",
      views: 3200,
      featured: true,
    },
    {
      id: 6,
      title: "Colaboración Internacional en Robótica",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.",
      link: "https://www.robotics-education.org/",
      image: "/novedad.png",
      category: "Colaboración",
      views: 980,
      featured: false,
    },
    {
      id: 7,
      title: "Avances en Procesamiento de Voz",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.",
      link: "https://www.speech-tech.org/",
      image: "/novedad.png",
      category: "Tecnología",
      views: 1420,
      featured: true,
    },
    {
      id: 8,
      title: "Publicación en Nature AI",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu consectetur consectetur, nisl nisi consectetur nisi, euismod euismod nisi nisi euismod.",
      link: "https://www.nature.com/",
      image: "/novedad.png",
      category: "Publicación",
      views: 2850,
      featured: true,
    },
  ],
};

// Simulación de delay para APIs
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ===== Helpers: map raw mock objects (Spanish keys) to English camelCase =====
function mapTeamMember(m) {
  return {
    id: m.id,
    name: m.name || m.nombre,
    lastname: m.lastname || m.apellido || "",
    email: m.email || m.correo,
    phone: m.phone || m.telefono || m.teléfono || "",
    isAuthor: typeof m.isAuthor !== "undefined" ? m.isAuthor : false,
    profilePicture:
      m.profilePicture || m.imagenPerfil || m.image || m.imagen || "",
    linkedinLink: m.linkedinLink || m.linkedin || "",
    githubLink: m.githubLink || m.github || "",
  };
}

function mapProject(p) {
  return {
    ...p,
    title: p.title || p.nombre,
    description: p.description || p.descripcion,
    ordinance: p.ordinance || p.ordenanza,
  };
}

function mapResearchLine(l) {
  return {
    ...l,
    title: l.title || l.nombre,
    description: l.description || l.descripcion,
  };
}

function mapPublication(pub) {
  // "publicacion" (es) duplicates journal; we prefer journal
  const { publicacion, ...rest } = pub;
  return { ...rest };
}

function mapGalleryItem(i) {
  // Keys are already English camelCase
  return { ...i };
}

function mapExtensionLine(l) {
  return {
    ...l,
    title: l.title || l.nombre,
    description: l.description || l.descripcion,
    projects: l.projects || l.proyectos || [],
  };
}

function mapAboutInfo(info) {
  if (!info) return info;
  return {
    mission: info.mission || info.mision,
    vision: info.vision,
    values: info.values || info.valores,
    history: (info.history || info.historia || []).map((h) => ({
      year: h.year,
      event: h.event,
    })),
  };
}

function mapObjective(o) {
  return {
    id: o.id,
    title: o.title || o.titulo,
    description: o.description || o.descripcion,
    icon: o.icon || o.icono,
    priority: o.priority || o.prioridad,
  };
}

function mapNewsItem(n) {
  return {
    id: n.id,
    title: n.title || n.Titulo,
    description: n.description || n.Descripcion,
    link: n.link || n.Enlace,
    image: n.image || n.imagen,
    category: n.category || n.categoria,
    views: n.views || n.vistas,
    featured: typeof n.featured !== "undefined" ? n.featured : n.destacado,
  };
}

// ===== AUTENTICACIÓN =====
export async function simulateBackofficeAccess(credentials) {
  await delay(800);
  console.log("AsyncMock - Simulando acceso con:", credentials);

  if (
    credentials?.username === "admin" &&
    credentials?.password === "admin123"
  ) {
    return {
      success: true,
      token: "mock-jwt-token-" + Date.now(),
      user: {
        id: "1",
        email: credentials.username,
        name: "Administrador GILIA",
        role: "admin",
      },
    };
  } else {
    return {
      success: false,
      message: "Credenciales incorrectas",
    };
  }
}

// ===== EQUIPO =====
export async function getTeamMembers() {
  await delay(500);
  return mockData.teamMembers.map(mapTeamMember);
}

export async function getTeamMemberById(id) {
  await delay(500);
  const member = mockData.teamMembers.find((m) => m.id === parseInt(id));
  return member ? mapTeamMember(member) : undefined;
}

// ===== PROYECTOS =====
export async function getProjects(filters = {}) {
  await delay(500);
  let filteredProjects = mockData.projects.map(mapProject);

  if (filters.researchLineId) {
    filteredProjects = filteredProjects.filter(
      (project) =>
        project.researchLineId === Number.parseInt(filters.researchLineId)
    );
  }

  return {
    data: filteredProjects,
    meta: {
      pagination: {
        total: filteredProjects.length,
      },
    },
  };
}

export async function getProjectById(id) {
  await delay(500);
  const project = mockData.projects.find((p) => p.id === parseInt(id));
  return project ? mapProject(project) : undefined;
}

// ===== LÍNEAS DE INVESTIGACIÓN =====
export async function getResearchLines() {
  await delay(500);
  return mockData.researchLines.map(mapResearchLine);
}

export async function getResearchLineById(id) {
  await delay(500);
  const line = mockData.researchLines.find((l) => l.id === parseInt(id));
  return line ? mapResearchLine(line) : undefined;
}

// ===== PUBLICACIONES =====
export async function getPublications(filters = {}) {
  await delay(800);
  let filteredPublications = mockData.publications.map(mapPublication);

  if (filters.year) {
    filteredPublications = filteredPublications.filter(
      (pub) => pub.year === Number.parseInt(filters.year)
    );
  }
  if (filters.type) {
    filteredPublications = filteredPublications.filter(
      (pub) => pub.type === filters.type
    );
  }
  if (filters.researchLineId) {
    filteredPublications = filteredPublications.filter(
      (pub) => pub.researchLineId === Number.parseInt(filters.researchLineId)
    );
  }

  return {
    data: filteredPublications,
    meta: {
      pagination: {
        total: filteredPublications.length,
        pageCount: Math.ceil(filteredPublications.length / 10),
      },
    },
  };
}

export async function getPublication(id) {
  await delay(500);
  const publication = mockData.publications.find(
    (p) => p.id === Number.parseInt(id)
  );
  if (!publication) throw new Error("Publicación no encontrada");
  return { data: mapPublication(publication) };
}

// ===== GALERÍA =====
export async function getGalleryItems(filters = {}) {
  await delay(600);
  let filteredItems = mockData.galleryItems.map(mapGalleryItem);

  if (filters.type) {
    filteredItems = filteredItems.filter((item) => item.type === filters.type);
  }
  if (filters.category) {
    filteredItems = filteredItems.filter(
      (item) => item.category === filters.category
    );
  }
  if (filters.status) {
    filteredItems = filteredItems.filter(
      (item) => item.status === filters.status
    );
  }
  if (filters.featured !== undefined) {
    filteredItems = filteredItems.filter(
      (item) => item.featured === filters.featured
    );
  }

  return {
    data: filteredItems,
    meta: {
      pagination: {
        total: filteredItems.length,
        pageCount: Math.ceil(filteredItems.length / 10),
      },
    },
  };
}

export async function getGalleryItem(id) {
  await delay(400);
  const item = mockData.galleryItems.find((i) => i.id === Number.parseInt(id));
  if (!item) throw new Error("Elemento de galería no encontrado");
  return { data: mapGalleryItem(item) };
}

// ===== LÍNEAS DE EXTENSIÓN =====
export async function getExtensionLines(filters = {}) {
  await delay(600);
  let filteredLines = mockData.extensionLines.map(mapExtensionLine);

  if (filters.status) {
    filteredLines = filteredLines.filter(
      (line) => line.status === filters.status
    );
  }
  if (filters.leaderId) {
    filteredLines = filteredLines.filter(
      (line) => line.leaderId === Number.parseInt(filters.leaderId)
    );
  }

  return {
    data: filteredLines,
    meta: {
      pagination: {
        total: filteredLines.length,
        pageCount: Math.ceil(filteredLines.length / 10),
      },
    },
  };
}

export async function getExtensionLine(id) {
  await delay(500);
  const line = mockData.extensionLines.find(
    (l) => l.id === Number.parseInt(id)
  );
  if (!line) throw new Error("Línea de extensión no encontrada");
  return { data: mapExtensionLine(line) };
}

// ===== CONFIGURACIÓN =====
export async function getSystemConfig() {
  await delay(400);
  return { data: mockData.systemConfig };
}

// ===== ESTADÍSTICAS =====
export async function getStatistics() {
  await delay(500);
  return { data: mockData.statistics };
}

// ===== INFORMACIÓN PÚBLICA =====
export async function getAboutInfo() {
  await delay(400);
  return { about: mockData.aboutInfo };
}

export async function getObjectives() {
  await delay(400);
  return {
    data: mockData.objectives,
    meta: {
      pagination: {
        total: mockData.objectives.length,
        pageCount: 1,
      },
    },
  };
}

export async function getNews(filters = {}) {
  await delay(600);
  let filteredNews = mockData.news;

  if (filters.category) {
    filteredNews = filteredNews.filter(
      (news) => news.category === filters.category
    );
  }
  if (filters.featured !== undefined) {
    filteredNews = filteredNews.filter(
      (news) => news.featured === filters.featured
    );
  }

  filteredNews.sort((a, b) => b.id - a.id);

  return {
    data: filteredNews,
    meta: {
      pagination: {
        total: filteredNews.length,
        pageCount: Math.ceil(filteredNews.length / 10),
      },
    },
  };
}

export async function getNewsItem(id) {
  await delay(400);
  const news = mockData.news.find((n) => n.id === Number.parseInt(id));
  if (!news) {
    throw new Error("Noticia no encontrada");
  }
  return { data: mapNewsItem(news) };
}

export async function accessToTheBackoffice(credentials) {
  await delay(800);
  console.log("AsyncMock - Simulando acceso con:", credentials);
  let result = {};
  if (
    credentials?.email === "admin@gmail.com" &&
    credentials?.password === "admin123"
  ) {
    result = {
      success: true,
      token: "mock-jwt-token-" + Date.now(),
      user: {
        id: "1",
        email: credentials.username,
        name: "Administrador GILIA",
        role: "admin",
      },
    };
  } else {
    result = {
      success: false,
      message: "Credenciales incorrectas",
    };
  }
  return result;
}

// Trabajarlo en el futuro, para poder asegurara que toda la informacion
export async function getToken() {
  const token = {};
  return token;
}
