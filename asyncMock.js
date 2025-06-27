// Mock data para simular respuestas de API
const mockData = {
  lineasInvestigacion: [
    {
      id: 1,
      nombre: "Inteligencia Artificial",
      descripcion: "Investigación en algoritmos de machine learning y deep learning",
      imagen: "/imagenRandom.png",
      fechaCreacion: "2023-01-15",
      estado: "activa",
    },
    {
      id: 2,
      nombre: "Robótica Avanzada",
      descripcion: "Desarrollo de sistemas robóticos autónomos",
      imagen: "/imagenRandom.png",
      fechaCreacion: "2023-02-20",
      estado: "activa",
    },
    {
      id: 3,
      nombre: "Computación Cuántica",
      descripcion: "Investigación en algoritmos cuánticos y sus aplicaciones",
      imagen: "/imagenRandom.png",
      fechaCreacion: "2023-03-10",
      estado: "en_desarrollo",
    },
  ],

  publicaciones: [
    {
      id: 1,
      titulo: "Advances in Neural Networks",
      autores: ["Dr. Smith", "Dr. Johnson"],
      revista: "AI Research Journal",
      año: 2023,
      doi: "10.1000/182",
      resumen: "Este artículo presenta avances significativos en redes neuronales...",
      lineaInvestigacion: 1,
    },
    {
      id: 2,
      titulo: "Autonomous Robot Navigation",
      autores: ["Dr. Brown", "Dr. Davis"],
      revista: "Robotics Today",
      año: 2023,
      doi: "10.1000/183",
      resumen: "Nuevo enfoque para la navegación autónoma de robots...",
      lineaInvestigacion: 2,
    },
  ],

  proyectos: [
    {
      id: 1,
      nombre: "Sistema de Reconocimiento Facial",
      descripcion: "Desarrollo de un sistema avanzado de reconocimiento facial usando IA",
      fechaInicio: "2023-01-01",
      fechaFin: "2023-12-31",
      estado: "en_progreso",
      presupuesto: 50000,
      responsable: "Dr. Smith",
      lineaInvestigacion: 1,
    },
    {
      id: 2,
      nombre: "Robot Asistente Médico",
      descripcion: "Creación de un robot para asistencia en procedimientos médicos",
      fechaInicio: "2023-03-01",
      fechaFin: "2024-02-28",
      estado: "en_progreso",
      presupuesto: 75000,
      responsable: "Dr. Brown",
      lineaInvestigacion: 2,
    },
  ],

  personas: [
    {
      id: 1,
      nombre: "Dr. John Smith",
      cargo: "Director de Investigación",
      especialidad: "Inteligencia Artificial",
      email: "j.smith@university.edu",
      telefono: "+1-555-0101",
      imagen: "/humano.png",
      biografia: "Dr. Smith es un experto en IA con más de 15 años de experiencia...",
    },
    {
      id: 2,
      nombre: "Dr. Sarah Johnson",
      cargo: "Investigadora Senior",
      especialidad: "Machine Learning",
      email: "s.johnson@university.edu",
      telefono: "+1-555-0102",
      imagen: "/humano.png",
      biografia: "Dr. Johnson se especializa en algoritmos de aprendizaje automático...",
    },
    {
      id: 3,
      nombre: "Dr. Michael Brown",
      cargo: "Investigador Principal",
      especialidad: "Robótica",
      email: "m.brown@university.edu",
      telefono: "+1-555-0103",
      imagen: "/humano.png",
      biografia: "Dr. Brown lidera el equipo de robótica con innovaciones en automatización...",
    },
  ],

  extensiones: [
    {
      id: 1,
      nombre: "Taller de IA para Estudiantes",
      descripcion: "Programa educativo para introducir conceptos de IA a estudiantes de secundaria",
      fechaInicio: "2023-06-01",
      fechaFin: "2023-08-31",
      participantes: 50,
      responsable: "Dr. Johnson",
      tipo: "educativo",
    },
    {
      id: 2,
      nombre: "Consultoría en Automatización",
      descripcion: "Servicios de consultoría para empresas locales en automatización de procesos",
      fechaInicio: "2023-04-01",
      fechaFin: "2023-12-31",
      participantes: 10,
      responsable: "Dr. Brown",
      tipo: "consultoria",
    },
  ],

  galeria: [
    {
      id: 1,
      titulo: "Laboratorio de IA",
      descripcion: "Nuestro moderno laboratorio de inteligencia artificial",
      imagen: "/imagenRandom.png",
      fecha: "2023-05-15",
      categoria: "instalaciones",
    },
    {
      id: 2,
      titulo: "Equipo de Investigación",
      descripcion: "Foto del equipo completo de investigadores",
      imagen: "/humano.png",
      fecha: "2023-06-20",
      categoria: "equipo",
    },
    {
      id: 3,
      titulo: "Conferencia Internacional",
      descripcion: "Presentación en la conferencia de IA 2023",
      imagen: "/imagenRandom.png",
      fecha: "2023-07-10",
      categoria: "eventos",
    },
  ],
}

// AsyncMock completo del sistema GILIA basado en la estructura de Strapi
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// ===== DATOS MOCK PARA ABOUT (Single Type) =====
const mockAbout = {
  id: 1,
  description: `Somos el Grupo de Investigación en Lenguajes e Inteligencia Artificial (GILIA), un equipo multidisciplinario dedicado a explorar las fronteras del conocimiento en procesamiento de lenguaje natural, sistemas inteligentes y tecnologías emergentes. Nuestro compromiso es desarrollar soluciones innovadoras que contribuyan al avance científico y tecnológico, manteniendo siempre un enfoque ético y responsable en nuestras investigaciones.`,

  information: `Fundado en 2016, GILIA se ha consolidado como un referente en investigación aplicada en ciencias de la computación. Nuestro grupo trabaja en estrecha colaboración con instituciones nacionales e internacionales, desarrollando proyectos que van desde el análisis de sentimientos en redes sociales hasta sistemas de traducción automática para lenguas originarias.

Nos especializamos en siete líneas principales de investigación: Ontologías y Web Semántica, Procesamiento de Lenguaje Natural, Sistemas Inteligentes, Robótica y Sistemas Embebidos, Educación en Ciencias de la Computación, Lenguajes de Programación, y Ética en Ciencias de la Computación.

Además de la investigación, desarrollamos actividades de extensión universitaria que conectan nuestro conocimiento con las necesidades de la comunidad, trabajando con escuelas, organizaciones sociales y empresas locales para democratizar el acceso a la tecnología.

Nuestro equipo está compuesto por investigadores de diferentes niveles académicos, desde becarios de grado hasta doctores con amplia experiencia internacional. Esta diversidad enriquece nuestro enfoque y nos permite abordar problemas complejos desde múltiples perspectivas.`,

  image: {
    id: 1,
    url: "/placeholder.svg?height=400&width=800",
    alternativeText: "Equipo GILIA en el laboratorio",
    caption: "Miembros del grupo GILIA trabajando en proyectos de investigación",
  },

  people: [], // Se poblará con la relación uno a muchos
}

// ===== DATOS MOCK PARA GLOBAL (Single Type) =====
const mockGlobal = {
  id: 1,
  siteName: "GILIA - Grupo de Investigación en Lenguajes e IA",
  siteDescription: `Sitio oficial del Grupo de Investigación en Lenguajes e Inteligencia Artificial de la Universidad Nacional. Descubre nuestras líneas de investigación, publicaciones, proyectos y actividades de extensión en el campo de las ciencias de la computación y la inteligencia artificial.`,
  favicon: {
    id: 1,
    url: "/icono_gilia.png",
    alternativeText: "Favicon GILIA",
  },
  defaultSeo: {
    metaTitle: "GILIA - Investigación en IA y Lenguajes",
    metaDescription:
      "Grupo de investigación especializado en inteligencia artificial, procesamiento de lenguaje natural y tecnologías emergentes.",
    keywords:
      "inteligencia artificial, procesamiento lenguaje natural, investigación, universidad, ciencias computación",
    metaRobots: "index,follow",
    structuredData: {},
    metaViewport: "width=device-width, initial-scale=1",
    canonicalURL: "https://gilia.universidad.edu.ar",
  },
}

// ===== DATOS MOCK PARA LINEAS DE INVESTIGACION (Collection Type) =====
const mockLineasInvestigacion = [
  {
    id: 1,
    nombre: "Ontologías y Web Semántica",
    descripcion: `<h2>Ontologías y Web Semántica</h2>
    
    <p>La investigación en <strong>Ontologías y Web Semántica</strong> se concentra en cómo organizar y representar el conocimiento de manera que las máquinas puedan procesarlo y comprenderlo de forma más eficaz.</p>
    
    <h3>Objetivos de Investigación</h3>
    <ul>
      <li>Desarrollo de ontologías para dominios específicos</li>
      <li>Implementación de sistemas de razonamiento semántico</li>
      <li>Creación de herramientas para la Web Semántica</li>
      <li>Investigación en linked data y knowledge graphs</li>
    </ul>
    
    <h3>Tecnologías Principales</h3>
    <ul>
      <li><strong>RDF</strong> (Resource Description Framework)</li>
      <li><strong>OWL</strong> (Web Ontology Language)</li>
      <li><strong>SPARQL</strong> para consultas semánticas</li>
      <li><strong>Protégé</strong> para modelado de ontologías</li>
    </ul>
    
    <h3>Aplicaciones Desarrolladas</h3>
    <p>Hemos desarrollado ontologías para el dominio médico, educativo y de gobierno electrónico, facilitando la interoperabilidad entre sistemas y mejorando la búsqueda y recuperación de información.</p>`,

    imagen: {
      id: 1,
      url: "/placeholder.svg?height=300&width=500",
      alternativeText: "Diagrama de ontologías y web semántica",
    },

    publicaciones: [], // Relación muchos a muchos
    proyectos: [], // Relación uno a muchos
    people: [], // Relación uno a muchos
  },

  {
    id: 2,
    nombre: "Procesamiento de Lenguaje Natural",
    descripcion: `<h2>Procesamiento de Lenguaje Natural</h2>
    
    <p>El <strong>Procesamiento del Lenguaje Natural (PLN)</strong> es una disciplina dentro de la inteligencia artificial que se dedica a la interacción entre las computadoras y el lenguaje humano.</p>
    
    <h3>Áreas de Investigación</h3>
    <ul>
      <li>Análisis sintáctico y semántico de textos</li>
      <li>Modelos de lenguaje neurales</li>
      <li>Traducción automática</li>
      <li>Análisis de sentimientos</li>
      <li>Generación de texto natural</li>
      <li>Reconocimiento de entidades nombradas</li>
    </ul>
    
    <h3>Tecnologías y Herramientas</h3>
    <ul>
      <li><strong>BERT, GPT</strong> y otros modelos transformer</li>
      <li><strong>spaCy, NLTK</strong> para procesamiento de texto</li>
      <li><strong>TensorFlow, PyTorch</strong> para deep learning</li>
      <li><strong>Hugging Face</strong> para modelos preentrenados</li>
    </ul>
    
    <h3>Proyectos Destacados</h3>
    <p>Desarrollo de sistemas de análisis de sentimientos para redes sociales, traducción automática español-guaraní, y chatbots educativos con comprensión contextual avanzada.</p>`,

    imagen: {
      id: 2,
      url: "/placeholder.svg?height=300&width=500",
      alternativeText: "Procesamiento de lenguaje natural",
    },

    publicaciones: [],
    proyectos: [],
    people: [],
  },

  {
    id: 3,
    nombre: "Sistemas Inteligentes",
    descripcion: `<h2>Sistemas Inteligentes</h2>
    
    <p>Los <strong>Sistemas Inteligentes</strong> integran técnicas de inteligencia artificial para simular comportamientos inteligentes que resuelvan problemas complejos de manera autónoma.</p>
    
    <h3>Líneas de Trabajo</h3>
    <ul>
      <li>Machine Learning y Deep Learning</li>
      <li>Sistemas expertos y sistemas de recomendación</li>
      <li>Algoritmos evolutivos y optimización</li>
      <li>Redes neuronales artificiales</li>
      <li>Aprendizaje por refuerzo</li>
      <li>Visión por computadora</li>
    </ul>
    
    <h3>Metodologías</h3>
    <ul>
      <li>Aprendizaje supervisado y no supervisado</li>
      <li>Reinforcement learning</li>
      <li>Transfer learning</li>
      <li>Ensemble methods</li>
      <li>Explainable AI (XAI)</li>
    </ul>
    
    <h3>Aplicaciones</h3>
    <p>Desarrollo de sistemas de diagnóstico médico asistido, optimización de procesos industriales, sistemas de recomendación personalizados y análisis predictivo para diferentes dominios.</p>`,

    imagen: {
      id: 3,
      url: "/placeholder.svg?height=300&width=500",
      alternativeText: "Sistemas inteligentes y machine learning",
    },

    publicaciones: [],
    proyectos: [],
    people: [],
  },

  {
    id: 4,
    nombre: "Robótica y Sistemas Embebidos",
    descripcion: `<h2>Robótica y Sistemas Embebidos</h2>
    
    <p>Investigación en el diseño, desarrollo y control de <strong>robots autónomos</strong> y <strong>sistemas embebidos</strong> para aplicaciones industriales, educativas y domésticas.</p>
    
    <h3>Áreas de Desarrollo</h3>
    <ul>
      <li>Robótica móvil autónoma</li>
      <li>Internet de las Cosas (IoT)</li>
      <li>Sistemas de control inteligente</li>
      <li>Visión por computadora aplicada a robótica</li>
      <li>Sensores y actuadores inteligentes</li>
      <li>Navegación y mapeo simultáneo (SLAM)</li>
    </ul>
    
    <h3>Plataformas y Tecnologías</h3>
    <ul>
      <li><strong>Arduino, Raspberry Pi</strong> para prototipado</li>
      <li><strong>ROS</strong> (Robot Operating System)</li>
      <li><strong>Microcontroladores ARM</strong> y ESP32</li>
      <li><strong>Sensores LIDAR, cámaras</strong> y sensores ambientales</li>
      <li><strong>Protocolos IoT</strong>: MQTT, LoRa, Zigbee</li>
    </ul>
    
    <h3>Proyectos en Desarrollo</h3>
    <p>Robot educativo para enseñanza de programación, sistema IoT para monitoreo agrícola, robots de asistencia para adultos mayores y drones autónomos para mapeo ambiental.</p>`,

    imagen: {
      id: 4,
      url: "/placeholder.svg?height=300&width=500",
      alternativeText: "Robótica y sistemas embebidos",
    },

    publicaciones: [],
    proyectos: [],
    people: [],
  },

  {
    id: 5,
    nombre: "Educación en Ciencias de la Computación",
    descripcion: `<h2>Educación en Ciencias de la Computación</h2>
    
    <p>Esta línea se enfoca en la <strong>innovación pedagógica</strong> y el desarrollo de metodologías efectivas para la enseñanza de conceptos de ciencias de la computación en diferentes niveles educativos.</p>
    
    <h3>Áreas de Investigación</h3>
    <ul>
      <li>Pedagogía digital y metodologías activas</li>
      <li>Gamificación en el aprendizaje de programación</li>
      <li>Plataformas de e-learning adaptativos</li>
      <li>Evaluación automática de código</li>
      <li>Pensamiento computacional</li>
      <li>Inclusión digital y accesibilidad</li>
    </ul>
    
    <h3>Tecnologías Educativas</h3>
    <ul>
      <li><strong>LMS personalizados</strong> (Moodle, Canvas)</li>
      <li><strong>Herramientas de programación visual</strong> (Scratch, Blockly)</li>
      <li><strong>Simuladores y entornos virtuales</strong></li>
      <li><strong>Sistemas de tutoría inteligente</strong></li>
      <li><strong>Realidad virtual y aumentada</strong> educativa</li>
    </ul>
    
    <h3>Impacto y Colaboraciones</h3>
    <p>Trabajamos con instituciones educativas de todos los niveles, desarrollando currículos, capacitando docentes y creando recursos didácticos que faciliten la comprensión de conceptos complejos de computación.</p>`,

    imagen: {
      id: 5,
      url: "/placeholder.svg?height=300&width=500",
      alternativeText: "Educación en ciencias de la computación",
    },

    publicaciones: [],
    proyectos: [],
    people: [],
  },

  {
    id: 6,
    nombre: "Lenguajes de Programación",
    descripcion: `<h2>Lenguajes de Programación</h2>
    
    <p>Investigación en el <strong>diseño, implementación y análisis</strong> de lenguajes de programación, compiladores y herramientas de desarrollo de software.</p>
    
    <h3>Áreas de Investigación</h3>
    <ul>
      <li>Diseño de lenguajes de dominio específico (DSL)</li>
      <li>Teoría de compiladores y optimización</li>
      <li>Análisis estático y verificación formal</li>
      <li>Sistemas de tipos avanzados</li>
      <li>Programación funcional y paradigmas emergentes</li>
      <li>Herramientas de desarrollo y IDEs</li>
    </ul>
    
    <h3>Tecnologías y Herramientas</h3>
    <ul>
      <li><strong>ANTLR, Yacc, Bison</strong> para generación de parsers</li>
      <li><strong>LLVM</strong> para backend de compiladores</li>
      <li><strong>Coq, Isabelle</strong> para verificación formal</li>
      <li><strong>Haskell, OCaml</strong> para investigación en programación funcional</li>
    </ul>
    
    <h3>Proyectos Actuales</h3>
    <p>Desarrollo de un lenguaje de programación educativo, herramientas de análisis de código para detección de vulnerabilidades, y compiladores optimizados para arquitecturas específicas.</p>`,

    imagen: {
      id: 6,
      url: "/placeholder.svg?height=300&width=500",
      alternativeText: "Lenguajes de programación y compiladores",
    },

    publicaciones: [],
    proyectos: [],
    people: [],
  },

  {
    id: 7,
    nombre: "Ética en Ciencias de la Computación",
    descripcion: `<h2>Ética en Ciencias de la Computación</h2>
    
    <p>Esta línea aborda los <strong>aspectos éticos y sociales</strong> del desarrollo y aplicación de tecnologías computacionales, promoviendo un enfoque responsable en la investigación y desarrollo tecnológico.</p>
    
    <h3>Temas de Investigación</h3>
    <ul>
      <li>Ética en inteligencia artificial y algoritmos</li>
      <li>Privacidad y protección de datos</li>
      <li>Sesgo algorítmico y equidad</li>
      <li>Transparencia y explicabilidad en IA</li>
      <li>Impacto social de la automatización</li>
      <li>Derechos digitales y ciudadanía digital</li>
    </ul>
    
    <h3>Marcos de Trabajo</h3>
    <ul>
      <li><strong>AI Ethics frameworks</strong> y principios de IA responsable</li>
      <li><strong>GDPR y regulaciones</strong> de protección de datos</li>
      <li><strong>Auditorías algorítmicas</strong> y evaluación de sesgo</li>
      <li><strong>Diseño centrado en el usuario</strong> y participativo</li>
    </ul>
    
    <h3>Actividades y Colaboraciones</h3>
    <p>Organizamos seminarios sobre ética tecnológica, colaboramos con organizaciones de derechos humanos, y desarrollamos guías para el desarrollo ético de software en diferentes sectores.</p>`,

    imagen: {
      id: 7,
      url: "/placeholder.svg?height=300&width=500",
      alternativeText: "Ética en ciencias de la computación",
    },

    publicaciones: [],
    proyectos: [],
    people: [],
  },
]

// ===== DATOS MOCK PARA LINEAS DE EXTENSION (Collection Type) =====
const mockLineasExtension = [
  {
    id: 1,
    nombre: "Tecnología Educativa",
    descripcion: `<h2>Tecnología Educativa</h2>
    
    <p>Esta línea de extensión se enfoca en el <strong>desarrollo e implementación de herramientas tecnológicas</strong> para mejorar los procesos de enseñanza-aprendizaje en instituciones educativas de la región.</p>
    
    <h3>Objetivos</h3>
    <ul>
      <li>Democratizar el acceso a la tecnología educativa</li>
      <li>Capacitar docentes en el uso de herramientas digitales</li>
      <li>Desarrollar software educativo adaptado a necesidades locales</li>
      <li>Promover la innovación pedagógica mediante la tecnología</li>
    </ul>
    
    <h3>Metodología</h3>
    <p>Trabajamos con un enfoque participativo que incluye:</p>
    <ol>
      <li><strong>Diagnóstico</strong> de necesidades tecnológicas</li>
      <li><strong>Diseño colaborativo</strong> de soluciones</li>
      <li><strong>Implementación</strong> y capacitación</li>
      <li><strong>Seguimiento</strong> y evaluación de impacto</li>
    </ol>`,

    imagen: {
      id: 8,
      url: "/placeholder.svg?height=300&width=500",
      alternativeText: "Tecnología educativa en acción",
    },

    instituciones:
      "Escuela Primaria N°123, Instituto Secundario San Martín, Centro de Formación Profesional, Universidad Nacional Regional, Jardín de Infantes Municipal, Escuela Técnica Industrial, Instituto Superior de Formación Docente",

    publicaciones: [], // Relación muchos a muchos
    proyectos: [], // Relación uno a muchos
  },

  {
    id: 2,
    nombre: "Sistemas de Información Comunitarios",
    descripcion: `<h2>Sistemas de Información Comunitarios</h2>
    
    <p>Implementación de <strong>sistemas de información</strong> para organizaciones comunitarias, ONGs locales y cooperativas, fortaleciendo su gestión y comunicación.</p>
    
    <h3>Servicios Ofrecidos</h3>
    <ul>
      <li>Desarrollo de sistemas de gestión organizacional</li>
      <li>Plataformas de comunicación comunitaria</li>
      <li>Sistemas de registro y seguimiento de actividades</li>
      <li>Herramientas de coordinación de voluntarios</li>
      <li>Capacitación en uso de tecnologías</li>
    </ul>
    
    <h3>Impacto Social</h3>
    <p>Nuestros sistemas han mejorado la eficiencia operativa de más de 20 organizaciones, facilitando la coordinación de actividades, el registro de beneficiarios y la comunicación con la comunidad.</p>`,

    imagen: {
      id: 9,
      url: "/placeholder.svg?height=300&width=500",
      alternativeText: "Sistemas comunitarios",
    },

    instituciones:
      "Fundación Esperanza, Centro Comunitario Norte, Cooperativa de Trabajo Unidos, ONG Manos Solidarias, Asociación de Vecinos Centro, Club Social y Deportivo, Biblioteca Popular Sarmiento",

    publicaciones: [],
    proyectos: [],
  },

  {
    id: 3,
    nombre: "Inclusión Digital",
    descripcion: `<h2>Inclusión Digital</h2>
    
    <p>Programas de <strong>capacitación en tecnologías digitales</strong> para adultos mayores, sectores vulnerables y comunidades con acceso limitado a la tecnología.</p>
    
    <h3>Programas Desarrollados</h3>
    <ul>
      <li>Alfabetización digital para adultos mayores</li>
      <li>Capacitación en herramientas básicas de computación</li>
      <li>Talleres de seguridad digital y privacidad</li>
      <li>Introducción a servicios digitales gubernamentales</li>
      <li>Uso de dispositivos móviles y aplicaciones</li>
    </ul>
    
    <h3>Metodología Inclusiva</h3>
    <p>Adaptamos nuestros métodos de enseñanza a las necesidades específicas de cada grupo, utilizando materiales didácticos accesibles y un enfoque gradual que respeta los tiempos de aprendizaje individuales.</p>`,

    imagen: {
      id: 10,
      url: "/placeholder.svg?height=300&width=500",
      alternativeText: "Inclusión digital",
    },

    instituciones:
      "Centro de Jubilados La Esperanza, Biblioteca Popular, Centro de Salud Municipal, Hogar de Ancianos San José, Centro de Día para Adultos Mayores, Parroquia San Francisco",

    publicaciones: [],
    proyectos: [],
  },

  {
    id: 4,
    nombre: "Desarrollo de Software Libre",
    descripcion: `<h2>Desarrollo de Software Libre</h2>
    
    <p>Creación y mantenimiento de <strong>software libre</strong> para instituciones públicas y organizaciones sin fines de lucro, promoviendo la soberanía tecnológica.</p>
    
    <h3>Principios</h3>
    <ul>
      <li>Promoción del software libre y código abierto</li>
      <li>Reducción de costos tecnológicos para organizaciones</li>
      <li>Transferencia de conocimiento y capacitación técnica</li>
      <li>Desarrollo colaborativo y sostenible</li>
    </ul>
    
    <h3>Proyectos Destacados</h3>
    <p>Hemos desarrollado sistemas de gestión municipal, plataformas educativas de código abierto, y herramientas de administración para organizaciones sociales, todas disponibles bajo licencias libres.</p>`,

    imagen: {
      id: 11,
      url: "/placeholder.svg?height=300&width=500",
      alternativeText: "Software libre",
    },

    instituciones:
      "Municipalidad Local, Secretaría de Educación Provincial, Hospital Regional, Defensoría del Pueblo, Registro Civil, Juzgado de Paz",

    publicaciones: [],
    proyectos: [],
  },
]

// ===== DATOS MOCK PARA NOVEDADES (Collection Type) =====
const mockNovedades = [
  {
    id: 1,
    Titulo: "Nueva Publicación en Revista Internacional de IA",
    Descripcion:
      "Nuestro equipo ha publicado un artículo sobre procesamiento de lenguaje natural en la revista IEEE Transactions on AI, destacando avances en modelos de comprensión de texto en español. El trabajo presenta una nueva arquitectura neuronal que mejora significativamente la precisión en tareas de análisis de sentimientos para textos en español, superando a modelos existentes en un 15%. Esta investigación es resultado de tres años de trabajo colaborativo entre nuestro grupo y universidades de Brasil y Chile.",
    Enlace: "https://ieeexplore.ieee.org/document/2024-nlp-spanish",
  },

  {
    id: 2,
    Titulo: "Participación en Conferencia Mundial de Inteligencia Artificial",
    Descripcion:
      "Presentación de tres ponencias magistrales en la conferencia ICAI 2024, incluyendo trabajos sobre ética en IA, sistemas inteligentes y robótica educativa. Nuestros investigadores fueron invitados como keynote speakers, compartiendo los resultados de nuestras investigaciones con más de 2000 participantes de 45 países. Las presentaciones abordaron temas cruciales como la implementación ética de IA en sistemas educativos y el desarrollo de robots sociales para asistencia a adultos mayores.",
    Enlace: "https://icai2024.org/keynotes/gilia-presentations",
  },

  {
    id: 3,
    Titulo: "Nuevo Proyecto Internacional de Investigación",
    Descripcion:
      "Inicio de proyecto colaborativo con universidades de Brasil y Chile sobre sistemas inteligentes adaptativos, financiado por el programa Horizon Europe. El proyecto, con un presupuesto de 2.5 millones de euros, se extenderá por cuatro años y tiene como objetivo desarrollar sistemas de IA que puedan adaptarse automáticamente a diferentes contextos culturales y lingüísticos. GILIA liderará el componente de procesamiento de lenguaje natural, aportando nuestra experiencia en modelos multilingües.",
    Enlace: "https://cordis.europa.eu/project/id/101234567",
  },

  {
    id: 4,
    Titulo: "Premio a la Innovación Tecnológica",
    Descripcion:
      "Reconocimiento nacional por el desarrollo de un sistema de traducción automática español-guaraní, promoviendo la preservación de lenguas originarias. El premio, otorgado por el Ministerio de Ciencia y Tecnología, reconoce el impacto social de nuestro trabajo en la preservación del patrimonio lingüístico. El sistema ya está siendo utilizado por comunidades guaraníes en Paraguay y Argentina, facilitando la comunicación intercultural y el acceso a servicios públicos.",
    Enlace: "https://mincyt.gob.ar/premios/innovacion-2024/gilia",
  },

  {
    id: 5,
    Titulo: "Lanzamiento de Plataforma Educativa",
    Descripcion:
      "Presentación oficial de nuestra plataforma de e-learning con IA integrada, diseñada para personalizar la experiencia de aprendizaje en ciencias de la computación. La plataforma utiliza algoritmos de machine learning para adaptar el contenido y la dificultad según el progreso individual de cada estudiante. Ya cuenta con más de 1000 usuarios registrados y está siendo implementada en 15 instituciones educativas de la región.",
    Enlace: "https://eduai.gilia.edu.ar",
  },

  {
    id: 6,
    Titulo: "Colaboración con Empresas Tecnológicas",
    Descripcion:
      "Establecimiento de alianzas estratégicas con empresas líderes en tecnología para el desarrollo de soluciones innovadoras en inteligencia artificial. Los acuerdos incluyen intercambio de investigadores, acceso a infraestructura de computación avanzada y desarrollo conjunto de productos. Estas colaboraciones fortalecen el vínculo entre la investigación académica y la aplicación industrial, asegurando que nuestros desarrollos tengan impacto real en el mercado.",
    Enlace: "https://gilia.edu.ar/noticias/alianzas-empresariales-2024",
  },
]

// ===== DATOS MOCK PARA OBJETIVOS (Collection Type) =====
const mockObjetivos = [
  {
    id: 1,
    titulo: "Excelencia en Investigación",
    descripcion: `<p>Desarrollar investigación de <strong>clase mundial</strong> en las áreas de inteligencia artificial, procesamiento de lenguaje natural y ciencias de la computación, contribuyendo al avance del conocimiento científico y tecnológico.</p>
    
    <p>Nos comprometemos a mantener los más altos estándares de calidad en nuestras investigaciones, publicando en revistas de primer nivel y participando activamente en conferencias internacionales. Buscamos que nuestros trabajos tengan impacto tanto en la comunidad académica como en la sociedad en general.</p>`,
  },

  {
    id: 2,
    titulo: "Formación de Recursos Humanos",
    descripcion: `<p>Formar <strong>investigadores altamente calificados</strong> en diferentes niveles académicos, desde estudiantes de grado hasta doctores, promoviendo la excelencia académica y el pensamiento crítico.</p>
    
    <p>Nuestro programa de formación incluye supervisión de tesis, becas de investigación, intercambios internacionales y participación en proyectos de vanguardia. Buscamos que nuestros egresados se conviertan en líderes en sus respectivos campos.</p>`,
  },

  {
    id: 3,
    titulo: "Transferencia Tecnológica",
    descripcion: `<p>Facilitar la <strong>transferencia de conocimiento</strong> y tecnología desde la universidad hacia el sector productivo y la sociedad, generando impacto económico y social positivo.</p>
    
    <p>Trabajamos en estrecha colaboración con empresas, organizaciones gubernamentales y sociales para asegurar que nuestras investigaciones se traduzcan en soluciones prácticas que beneficien a la comunidad.</p>`,
  },

  {
    id: 4,
    titulo: "Extensión Universitaria",
    descripcion: `<p>Desarrollar actividades de <strong>extensión universitaria</strong> que conecten nuestro conocimiento con las necesidades de la comunidad, promoviendo la inclusión digital y el acceso equitativo a la tecnología.</p>
    
    <p>Nuestros programas de extensión incluyen capacitación tecnológica, desarrollo de software para organizaciones sociales y promoción de la alfabetización digital en sectores vulnerables.</p>`,
  },

  {
    id: 5,
    titulo: "Colaboración Internacional",
    descripcion: `<p>Establecer y mantener <strong>redes de colaboración</strong> con instituciones académicas y centros de investigación de excelencia a nivel internacional, promoviendo el intercambio de conocimientos y experiencias.</p>
    
    <p>Participamos activamente en proyectos internacionales, intercambios de investigadores y programas de movilidad académica que enriquecen nuestra perspectiva y amplían nuestro impacto global.</p>`,
  },

  {
    id: 6,
    titulo: "Ética y Responsabilidad Social",
    descripcion: `<p>Promover el desarrollo <strong>ético y responsable</strong> de la tecnología, considerando siempre el impacto social, cultural y ambiental de nuestras investigaciones y desarrollos.</p>
    
    <p>Integramos consideraciones éticas en todos nuestros proyectos, promovemos la diversidad e inclusión en nuestro equipo, y trabajamos para que la tecnología sea una herramienta de equidad y justicia social.</p>`,
  },
]

// ===== PERSONAS (Collection Type) =====
const mockPersonas = [
  {
    id: 1,
    full_name: "Dr. Miguel García Rodríguez",
    biography:
      "Doctor en Ciencias de la Computación por la Universidad de Barcelona, especializado en ontologías y web semántica. Con más de 15 años de experiencia en investigación, ha dirigido múltiples proyectos internacionales y publicado más de 50 artículos en revistas de primer nivel. Actualmente lidera la línea de investigación en Ontologías y Web Semántica, enfocándose en el desarrollo de sistemas de representación del conocimiento para dominios específicos.",
    photo: [
      {
        id: 1,
        url: "/placeholder.svg?height=200&width=200",
        alternativeText: "Dr. Miguel García",
      },
    ],
    social_links: "mgarcia@universidad.edu.ar",
    role_person: "director",
    linea_investigacion: 1, // Relación muchos a uno
  },

  {
    id: 2,
    full_name: "Dra. Ana Martínez López",
    biography:
      "Doctora en Inteligencia Artificial por el MIT, especializada en procesamiento de lenguaje natural y análisis de sentimientos. Ha trabajado en empresas tecnológicas líderes antes de unirse al mundo académico. Sus investigaciones se centran en el desarrollo de modelos de lenguaje para idiomas con pocos recursos, particularmente lenguas originarias de América Latina.",
    photo: [
      {
        id: 2,
        url: "/placeholder.svg?height=200&width=200",
        alternativeText: "Dra. Ana Martínez",
      },
    ],
    social_links: "amartinez@universidad.edu.ar",
    role_person: "investigador",
    linea_investigacion: 2,
  },

  {
    id: 3,
    full_name: "Dr. Carlos López Fernández",
    biography:
      "Doctor en Ingeniería en Sistemas por la Universidad Politécnica de Madrid, especializado en machine learning y sistemas inteligentes. Ha sido investigador visitante en Stanford y el MIT. Sus trabajos se enfocan en el desarrollo de algoritmos de aprendizaje automático explicables y su aplicación en sistemas críticos como diagnóstico médico y sistemas financieros.",
    photo: [
      {
        id: 3,
        url: "/placeholder.svg?height=200&width=200",
        alternativeText: "Dr. Carlos López",
      },
    ],
    social_links: "clopez@universidad.edu.ar",
    role_person: "investigador",
    linea_investigacion: 3,
  },

  {
    id: 4,
    full_name: "Ing. Pedro Fernández Silva",
    biography:
      "Ingeniero en Electrónica con Maestría en Robótica por la Universidad de Tokio. Especializado en sistemas embebidos y robótica educativa. Ha desarrollado múltiples prototipos de robots para asistencia social y educación. Actualmente trabaja en proyectos de IoT aplicado a agricultura de precisión y sistemas de monitoreo ambiental.",
    photo: [
      {
        id: 4,
        url: "/placeholder.svg?height=200&width=200",
        alternativeText: "Ing. Pedro Fernández",
      },
    ],
    social_links: "pfernandez@universidad.edu.ar",
    role_person: "investigador",
    linea_investigacion: 4,
  },

  {
    id: 5,
    full_name: "Lic. María Rodríguez Gómez",
    biography:
      "Licenciada en Ciencias de la Educación con especialización en Tecnología Educativa. Magíster en Diseño Instruccional por la Universidad de Harvard. Se especializa en el desarrollo de metodologías innovadoras para la enseñanza de programación y pensamiento computacional. Ha capacitado a más de 500 docentes en el uso de tecnologías educativas.",
    photo: [
      {
        id: 5,
        url: "/placeholder.svg?height=200&width=200",
        alternativeText: "Lic. María Rodríguez",
      },
    ],
    social_links: "mrodriguez@universidad.edu.ar",
    role_person: "colaborador",
    linea_investigacion: 5,
  },

  {
    id: 6,
    full_name: "Lic. Juan Pérez Morales",
    biography:
      "Licenciado en Ciencias de la Computación con Maestría en Lenguajes de Programación por la Universidad de Cambridge. Especializado en diseño de compiladores y análisis estático de código. Ha contribuido a varios proyectos de código abierto y desarrollado herramientas de análisis de vulnerabilidades de software utilizadas por empresas de seguridad informática.",
    photo: [
      {
        id: 6,
        url: "/placeholder.svg?height=200&width=200",
        alternativeText: "Lic. Juan Pérez",
      },
    ],
    social_links: "jperez@universidad.edu.ar",
    role_person: "colaborador",
    linea_investigacion: 6,
  },

  {
    id: 7,
    full_name: "Dra. Laura González Vega",
    biography:
      "Doctora en Filosofía con especialización en Ética de la Tecnología por la Universidad de Oxford. Magíster en Ciencias de la Computación. Sus investigaciones se centran en los aspectos éticos del desarrollo de IA, privacidad de datos y justicia algorítmica. Ha asesorado a gobiernos y organizaciones internacionales en políticas de IA responsable.",
    photo: [
      {
        id: 7,
        url: "/placeholder.svg?height=200&width=200",
        alternativeText: "Dra. Laura González",
      },
    ],
    social_links: "lgonzalez@universidad.edu.ar",
    role_person: "investigador",
    linea_investigacion: 7,
  },

  {
    id: 8,
    full_name: "Carlos Silva Mendoza",
    biography:
      "Estudiante de Doctorado en Ciencias de la Computación, especializado en análisis de datos y machine learning. Ingeniero en Sistemas con experiencia en desarrollo de software. Su tesis doctoral se enfoca en técnicas de aprendizaje federado para preservación de privacidad en sistemas distribuidos. Ha publicado varios artículos en conferencias internacionales.",
    photo: [
      {
        id: 8,
        url: "/placeholder.svg?height=200&width=200",
        alternativeText: "Carlos Silva",
      },
    ],
    social_links: "csilva@universidad.edu.ar",
    role_person: "becario",
    linea_investigacion: 3,
  },

  {
    id: 9,
    full_name: "Laura González Torres",
    biography:
      "Estudiante de Maestría en Ciencias de la Computación, especializada en desarrollo web y experiencia de usuario. Licenciada en Diseño Gráfico con formación complementaria en programación. Trabaja en el desarrollo de interfaces accesibles para aplicaciones educativas y sistemas de gestión comunitaria.",
    photo: [
      {
        id: 9,
        url: "/placeholder.svg?height=200&width=200",
        alternativeText: "Laura González",
      },
    ],
    social_links: "lgonzalez.torres@universidad.edu.ar",
    role_person: "becario",
    linea_investigacion: 5,
  },

  {
    id: 10,
    full_name: "Roberto Silva Herrera",
    biography:
      "Estudiante de grado en Ciencias de la Computación, becario de investigación en el área de procesamiento de lenguaje natural. Se especializa en el desarrollo de chatbots y sistemas de diálogo. Ha participado en competencias internacionales de programación y contribuye al desarrollo de herramientas de código abierto para análisis de texto.",
    photo: [
      {
        id: 10,
        url: "/placeholder.svg?height=200&width=200",
        alternativeText: "Roberto Silva",
      },
    ],
    social_links: "rsilva@universidad.edu.ar",
    role_person: "becario",
    linea_investigacion: 2,
  },
]

// ===== DATOS MOCK PARA PROYECTOS (Collection Type) =====
const mockProyectos = [
  {
    id: 1,
    nombre: "Sistema de Análisis de Sentimientos en Redes Sociales",
    descripcion: `<h2>Sistema de Análisis de Sentimientos en Redes Sociales</h2>
    
    <p>Este proyecto tiene como objetivo <strong>desarrollar un sistema inteligente</strong> capaz de analizar la polaridad emocional en publicaciones de redes sociales utilizando técnicas avanzadas de procesamiento de lenguaje natural y aprendizaje automático.</p>
    
    <h3>Objetivos Específicos</h3>
    <ul>
      <li>Desarrollar algoritmos de clasificación de sentimientos con alta precisión</li>
      <li>Implementar técnicas de preprocesamiento de texto en español</li>
      <li>Crear una interfaz web intuitiva para visualización de resultados</li>
      <li>Evaluar el rendimiento del sistema con datasets reales</li>
    </ul>
    
    <h3>Metodología</h3>
    <p>El proyecto se desarrolla en cuatro fases principales:</p>
    <ol>
      <li><strong>Recolección de Datos:</strong> Extracción de datos de Twitter, Facebook e Instagram</li>
      <li><strong>Desarrollo del Modelo:</strong> Implementación de modelos de machine learning</li>
      <li><strong>Desarrollo de la Aplicación:</strong> Creación de interfaz web con React</li>
      <li><strong>Evaluación:</strong> Pruebas de rendimiento y validación con usuarios</li>
    </ol>
    
    <h3>Tecnologías Utilizadas</h3>
    <ul>
      <li>Python, TensorFlow, scikit-learn</li>
      <li>React, Node.js, PostgreSQL</li>
      <li>APIs de redes sociales</li>
      <li>Docker, Git, Jupyter Notebooks</li>
    </ul>`,

    linea_investigacion: 2, // Relación muchos a uno con PLN
    linea_extension: null,
  },

  {
    id: 2,
    nombre: "Traductor Automático Español-Guaraní",
    descripcion: `<h2>Traductor Automático Español-Guaraní</h2>
    
    <p>Desarrollo de un <strong>sistema de traducción automática bidireccional</strong> entre español y guaraní para preservar y promover lenguas originarias, facilitando la comunicación intercultural.</p>
    
    <h3>Motivación</h3>
    <p>El guaraní es hablado por más de 6 millones de personas, pero carece de herramientas tecnológicas adecuadas. Este proyecto busca llenar ese vacío desarrollando tecnología que preserve y promueva esta lengua originaria.</p>
    
    <h3>Desafíos Técnicos</h3>
    <ul>
      <li>Escasez de corpus paralelos español-guaraní</li>
      <li>Diferencias estructurales entre ambas lenguas</li>
      <li>Variaciones dialectales del guaraní</li>
      <li>Integración de conocimiento cultural en la traducción</li>
    </ul>
    
    <h3>Impacto Esperado</h3>
    <p>El sistema facilitará el acceso a servicios públicos, educación y comunicación para hablantes de guaraní, contribuyendo a la preservación de la diversidad lingüística.</p>`,

    linea_investigacion: 2, // PLN
    linea_extension: null,
  },

  {
    id: 3,
    nombre: "Chatbot Educativo Inteligente",
    descripcion: `<h2>Chatbot Educativo Inteligente</h2>
    
    <p>Implementación de un <strong>asistente virtual</strong> para responder consultas académicas utilizando procesamiento de lenguaje natural y técnicas de recuperación de información.</p>
    
    <h3>Características Principales</h3>
    <ul>
      <li>Comprensión de consultas en lenguaje natural</li>
      <li>Base de conocimiento actualizable</li>
      <li>Respuestas contextualizadas y personalizadas</li>
      <li>Integración con sistemas de gestión académica</li>
      <li>Soporte multimodal (texto, voz, imágenes)</li>
      </ul>
    
    <h3>Arquitectura del Sistema</h3>
    <p>El chatbot utiliza una arquitectura híbrida que combina modelos de lenguaje preentrenados con sistemas de recuperación de información específicos del dominio educativo.</p>`,

    linea_investigacion: 2, // PLN
    linea_extension: 1, // Tecnología Educativa
  },

  {
    id: 4,
    nombre: "Sistema Experto para Diagnóstico Médico",
    descripcion: `<h2>Sistema Experto para Diagnóstico Médico</h2>
    
    <p>Desarrollo de un <strong>sistema de inteligencia artificial</strong> para asistir en el diagnóstico médico, proporcionando explicaciones comprensibles sobre las decisiones tomadas.</p>
    
    <h3>Objetivos</h3>
    <ul>
      <li>Asistir a profesionales médicos en el proceso diagnóstico</li>
      <li>Proporcionar explicaciones claras y comprensibles</li>
      <li>Reducir errores de diagnóstico</li>
      <li>Facilitar el acceso a atención médica especializada</li>
    </ul>
    
    <h3>Metodología</h3>
    <p>El sistema combina técnicas de machine learning con sistemas basados en reglas, incorporando conocimiento médico experto y garantizando la explicabilidad de las decisiones.</p>`,

    linea_investigacion: 3, // Sistemas Inteligentes
    linea_extension: null,
  },

  {
    id: 5,
    nombre: "Robot Educativo para Enseñanza de Programación",
    descripcion: `<h2>Robot Educativo para Enseñanza de Programación</h2>
    
    <p>Desarrollo de un <strong>robot educativo</strong> diseñado específicamente para enseñar conceptos de programación y pensamiento computacional a estudiantes de diferentes niveles.</p>
    
    <h3>Características del Robot</h3>
    <ul>
      <li>Programación visual mediante bloques</li>
      <li>Sensores para interacción con el entorno</li>
      <li>Conectividad inalámbrica</li>
      <li>Plataforma de desarrollo web</li>
      <li>Materiales didácticos integrados</li>
    </ul>
    
    <h3>Impacto Educativo</h3>
    <p>El robot permite a los estudiantes ver inmediatamente los resultados de su código, facilitando la comprensión de conceptos abstractos de programación a través de experiencias tangibles.</p>`,

    linea_investigacion: 4, // Robótica
    linea_extension: 1, // Tecnología Educativa
  },

  {
    id: 6,
    nombre: "Sistema IoT para Monitoreo Agrícola",
    descripcion: `<h2>Sistema IoT para Monitoreo Agrícola</h2>
    
    <p>Implementación de un <strong>sistema de Internet de las Cosas</strong> para monitoreo inteligente de cultivos, optimizando el uso de recursos y mejorando la productividad agrícola.</p>
    
    <h3>Componentes del Sistema</h3>
    <ul>
      <li>Red de sensores ambientales</li>
      <li>Estaciones meteorológicas automatizadas</li>
      <li>Sistema de riego inteligente</li>
      <li>Plataforma de análisis de datos</li>
      <li>Aplicación móvil para agricultores</li>
    </ul>
    
    <h3>Beneficios</h3>
    <p>El sistema permite optimizar el uso de agua, detectar tempranamente plagas y enfermedades, y tomar decisiones basadas en datos para mejorar la productividad y sostenibilidad agrícola.</p>`,

    linea_investigacion: 4, // Robótica
    linea_extension: 2, // Sistemas Comunitarios
  },

  {
    id: 7,
    nombre: "Plataforma de E-learning Adaptativo",
    descripcion: `<h2>Plataforma de E-learning Adaptativo</h2>
    
    <p>Desarrollo de una <strong>plataforma educativa</strong> que utiliza inteligencia artificial para personalizar la experiencia de aprendizaje según las necesidades y progreso individual de cada estudiante.</p>
    
    <h3>Características Adaptativas</h3>
    <ul>
      <li>Análisis del estilo de aprendizaje individual</li>
      <li>Ajuste automático de dificultad</li>
      <li>Recomendación de contenidos personalizados</li>
      <li>Evaluación formativa continua</li>
      <li>Retroalimentación inteligente</li>
    </ul>
    
    <h3>Tecnologías Utilizadas</h3>
    <p>La plataforma integra algoritmos de machine learning, análisis de learning analytics, y técnicas de gamificación para crear una experiencia de aprendizaje envolvente y efectiva.</p>`,

    linea_investigacion: 5, // Educación
    linea_extension: 1, // Tecnología Educativa
  },

  {
    id: 8,
    nombre: "Compilador Educativo con Visualización",
    descripcion: `<h2>Compilador Educativo con Visualización</h2>
    
    <p>Desarrollo de un <strong>compilador educativo</strong> que incluye herramientas de visualización para ayudar a los estudiantes a comprender el proceso de compilación paso a paso.</p>
    
    <h3>Características Educativas</h3>
    <ul>
      <li>Visualización del análisis léxico y sintáctico</li>
      <li>Representación gráfica del árbol sintáctico</li>
      <li>Seguimiento de la generación de código</li>
      <li>Detección y explicación de errores</li>
      <li>Interfaz interactiva y amigable</li>
    </ul>
    
    <h3>Objetivo Pedagógico</h3>
    <p>Facilitar la comprensión de conceptos complejos de compiladores mediante visualizaciones interactivas que muestran cómo el código fuente se transforma en código ejecutable.</p>`,

    linea_investigacion: 6, // Lenguajes de Programación
    linea_extension: 1, // Tecnología Educativa
  },

  {
    id: 9,
    nombre: "Framework para Auditoría Algorítmica",
    descripcion: `<h2>Framework para Auditoría Algorítmica</h2>
    
    <p>Desarrollo de un <strong>marco de trabajo</strong> para evaluar la equidad, transparencia y responsabilidad de algoritmos de inteligencia artificial en diferentes dominios de aplicación.</p>
    
    <h3>Componentes del Framework</h3>
    <ul>
      <li>Métricas de equidad algorítmica</li>
      <li>Herramientas de detección de sesgo</li>
      <li>Evaluación de transparencia</li>
      <li>Análisis de impacto social</li>
      <li>Reportes automatizados de auditoría</li>
    </ul>
    
    <h3>Aplicaciones</h3>
    <p>El framework puede aplicarse en sistemas de contratación, aprobación de créditos, sistemas judiciales, y cualquier dominio donde los algoritmos tomen decisiones que afecten a las personas.</p>`,

    linea_investigacion: 7, // Ética
    linea_extension: null,
  },

  {
    id: 10,
    nombre: "Sistema de Gestión Escolar Integral",
    descripcion: `<h2>Sistema de Gestión Escolar Integral</h2>
    
    <p>Desarrollo de un <strong>sistema web completo</strong> para la gestión integral de instituciones educativas, incluyendo registro de estudiantes, calificaciones, asistencia y comunicación con padres.</p>
    
    <h3>Módulos del Sistema</h3>
    <ul>
      <li>Gestión de estudiantes y docentes</li>
      <li>Registro de calificaciones y asistencia</li>
      <li>Comunicación con padres y tutores</li>
      <li>Planificación académica</li>
      <li>Reportes y estadísticas</li>
      <li>Portal de pagos en línea</li>
    </ul>
    
    <h3>Beneficios</h3>
    <p>El sistema digitaliza y automatiza procesos administrativos, mejora la comunicación entre todos los actores educativos y proporciona información valiosa para la toma de decisiones.</p>`,

    linea_investigacion: null,
    linea_extension: 1, // Tecnología Educativa
  },
]

// ===== DATOS MOCK PARA PUBLICACIONES (Collection Type) =====
const mockPublicaciones = [
  {
    id: 1,
    titulo: "Deep Learning para Análisis de Sentimientos en Español: Un Enfoque Multimodal",
    autores: "<p><strong>García, M.</strong>, López, J., Martínez, A., Silva, R.</p>",
    tipo: "Artículo",
    publicacion: "IEEE Transactions on Artificial Intelligence",
    anio: 2024,
    enlace: "https://ieeexplore.ieee.org/document/2024-sentiment-spanish",
    editor: "IEEE Computer Society",
    pagina_libro: null,
    resumen: `<p>Este artículo presenta una nueva arquitectura neuronal para el análisis de sentimientos en textos en español que combina características textuales y contextuales. El modelo propuesto supera a los enfoques existentes en un 15% en precisión, utilizando un dataset de 100,000 tweets etiquetados manualmente.</p>
    
    <p>La investigación aborda los desafíos específicos del español, incluyendo variaciones dialectales, uso de jerga y expresiones idiomáticas. Los resultados demuestran la efectividad del enfoque multimodal para capturar matices emocionales complejos en textos cortos de redes sociales.</p>`,

    lineas_investigacion: [2], // PLN
    lineas_extension: [],
  },

  {
    id: 2,
    titulo: "Ontologías en Sistemas de Salud: Un Enfoque Práctico para la Interoperabilidad",
    autores: "<p><strong>Rodríguez, P.</strong>, Silva, C., García, M.</p>",
    tipo: "Capítulo de Libro",
    publicacion: "Advances in Health Informatics",
    anio: 2023,
    enlace: null,
    editor: "Editorial Académica Internacional",
    pagina_libro: "pp. 145-178",
    resumen: `<p>Este capítulo presenta metodologías para el desarrollo de ontologías médicas y su implementación en sistemas hospitalarios. Se describe un caso de estudio real donde la implementación de ontologías mejoró la interoperabilidad entre sistemas de información hospitalaria en un 40%.</p>
    
    <p>El trabajo incluye guías prácticas para la modelización de conocimiento médico, técnicas de validación de ontologías y estrategias de integración con sistemas legacy existentes.</p>`,

    lineas_investigacion: [1], // Ontologías
    lineas_extension: [],
  },

  {
    id: 3,
    titulo: "Algoritmos Evolutivos Multiobjetivo para Optimización Industrial: Aplicaciones en Manufactura",
    autores: "<p><strong>Fernández, L.</strong>, Torres, R., López, C.</p>",
    tipo: "Paper",
    publicacion: "Proceedings of the International Conference on Evolutionary Computation",
    anio: 2023,
    enlace: "https://link.springer.com/chapter/evolutionary-algorithms-2023",
    editor: "Springer",
    pagina_libro: null,
    resumen: `<p>Propuesta de nuevos algoritmos evolutivos para resolver problemas de optimización multiobjetivo en entornos industriales. Los algoritmos desarrollados muestran convergencia 30% más rápida que métodos tradicionales en problemas de scheduling de producción.</p>
    
    <p>Se presentan tres casos de estudio en diferentes industrias: automotriz, textil y alimentaria, demostrando la versatilidad y efectividad del enfoque propuesto.</p>`,

    lineas_investigacion: [3], // Sistemas Inteligentes
    lineas_extension: [],
  },

  {
    id: 4,
    titulo: "Robótica Educativa: Impacto en el Aprendizaje de Programación en Estudiantes de Secundaria",
    autores: "<p><strong>Fernández, P.</strong>, Ruiz, C., González, L.</p>",
    tipo: "Artículo",
    publicacion: "Computers & Education",
    anio: 2024,
    enlace: "https://www.sciencedirect.com/science/article/robotics-education-2024",
    editor: "Elsevier",
    pagina_libro: null,
    resumen: `<p>Estudio longitudinal sobre el impacto de robots educativos en el aprendizaje de conceptos de programación en estudiantes de secundaria. El estudio involucró a 240 estudiantes durante un año académico, comparando métodos tradicionales con robótica educativa.</p>
    
    <p>Los resultados muestran una mejora del 45% en la comprensión de conceptos de programación y un aumento del 60% en la motivación hacia las ciencias de la computación. El estudio también analiza diferencias de género y propone estrategias para promover la inclusión en STEM.</p>`,

    lineas_investigacion: [4, 5], // Robótica y Educación
    lineas_extension: [1], // Tecnología Educativa
  },

  {
    id: 5,
    titulo: "Ética en Inteligencia Artificial: Marco Teórico y Aplicaciones Prácticas",
    autores: "<p><strong>Martínez, A.</strong>, González, L., Pérez, J.</p>",
    tipo: "Libro",
    publicacion: "Ética en IA: Teoría y Práctica",
    anio: 2023,
    enlace: null,
    editor: "Universidad Nacional Press",
    pagina_libro: "320 páginas",
    resumen: `<p>Libro completo que aborda los aspectos éticos de la inteligencia artificial, incluyendo casos de estudio y propuestas de marcos regulatorios. La obra está dividida en tres partes: fundamentos teóricos, análisis de casos reales y propuestas de implementación.</p>
    
    <p>Se analizan temas como sesgo algorítmico, privacidad de datos, transparencia en sistemas de IA y el impacto social de la automatización. Incluye entrevistas con expertos internacionales y análisis de regulaciones en diferentes países.</p>`,

    lineas_investigacion: [7], // Ética
    lineas_extension: [],
  },

  {
    id: 6,
    titulo: "Sistemas de Recomendación Basados en Grafos de Conocimiento para E-commerce",
    autores: "<p><strong>Silva, R.</strong>, Pérez, J., García, M.</p>",
    tipo: "Paper",
    publicacion: "ACM Conference on Recommender Systems",
    anio: 2024,
    enlace: "https://dl.acm.org/doi/knowledge-graphs-recsys-2024",
    editor: "ACM",
    pagina_libro: null,
    resumen: `<p>Nuevo enfoque para sistemas de recomendación que utiliza grafos de conocimiento y embeddings semánticos para mejorar la precisión y explicabilidad de las recomendaciones. El método propuesto supera a sistemas baselines en un 20% en métricas de precisión.</p>
    
    <p>Se presenta una evaluación exhaustiva en tres dominios diferentes: libros, películas y productos electrónicos, demostrando la generalización del enfoque propuesto.</p>`,

    lineas_investigacion: [1, 3], // Ontologías y Sistemas Inteligentes
    lineas_extension: [],
  },

  {
    id: 7,
    titulo: "Compiladores Educativos: Herramientas Visuales para la Enseñanza de Lenguajes de Programación",
    autores: "<p><strong>López, C.</strong>, Fernández, P., Rodríguez, M.</p>",
    tipo: "Artículo",
    publicacion: "Journal of Educational Technology & Society",
    anio: 2023,
    enlace: "https://www.jets.net/ETS/journals/educational-compilers-2023",
    editor: "Educational Technology & Society",
    pagina_libro: null,
    resumen: `<p>Investigación sobre el desarrollo y evaluación de compiladores educativos con interfaces visuales para facilitar la comprensión de conceptos complejos de compilación. Se presenta una herramienta que visualiza el proceso completo desde código fuente hasta código objeto.</p>
    
    <p>La evaluación con 150 estudiantes muestra una mejora del 35% en la comprensión de conceptos de compiladores comparado con métodos tradicionales de enseñanza.</p>`,

    lineas_investigacion: [6, 5], // Lenguajes y Educación
    lineas_extension: [1], // Tecnología Educativa
  },

  {
    id: 8,
    titulo: "IoT en Agricultura de Precisión: Monitoreo Inteligente de Cultivos",
    autores: "<p><strong>Silva, C.</strong>, Fernández, P., Torres, R.</p>",
    tipo: "Artículo",
    publicacion: "Smart Agricultural Technology",
    anio: 2024,
    enlace: "https://www.sciencedirect.com/science/article/iot-agriculture-2024",
    editor: "Elsevier",
    pagina_libro: null,
    resumen: `<p>Desarrollo e implementación de un sistema IoT para monitoreo de cultivos que integra sensores ambientales, análisis de datos en tiempo real y sistemas de alerta temprana. El sistema fue probado en 5 fincas durante una temporada completa.</p>
    
    <p>Los resultados muestran una reducción del 25% en el uso de agua y un aumento del 18% en la productividad, demostrando el potencial de la tecnología IoT para la agricultura sostenible.</p>`,

    lineas_investigacion: [4], // Robótica
    lineas_extension: [2], // Sistemas Comunitarios
  },

  {
    id: 9,
    titulo: "Traducción Automática para Lenguas con Pocos Recursos: El Caso del Guaraní",
    autores: "<p><strong>Martínez, A.</strong>, García, M., Silva, R.</p>",
    tipo: "Paper",
    publicacion: "Conference on Empirical Methods in Natural Language Processing",
    anio: 2023,
    enlace: "https://aclanthology.org/2023.emnlp-guarani-translation",
    editor: "Association for Computational Linguistics",
    pagina_libro: null,
    resumen: `<p>Investigación sobre técnicas de traducción automática para lenguas con recursos limitados, específicamente español-guaraní. Se proponen métodos de aumento de datos y transfer learning para superar la escasez de corpus paralelos.</p>
    
    <p>El sistema desarrollado alcanza un BLEU score de 28.5, superando significativamente a sistemas anteriores y estableciendo un nuevo estado del arte para esta pareja de idiomas.</p>`,

    lineas_investigacion: [2], // PLN
    lineas_extension: [3], // Inclusión Digital
  },

  {
    id: 10,
    titulo: "Auditoría Algorítmica: Framework para Evaluación de Equidad en Sistemas de IA",
    autores: "<p><strong>González, L.</strong>, Martínez, A., López, C.</p>",
    tipo: "Artículo",
    publicacion: "AI and Ethics",
    anio: 2024,
    enlace: "https://link.springer.com/article/algorithmic-audit-framework-2024",
    editor: "Springer",
    pagina_libro: null,
    resumen: `<p>Propuesta de un framework comprehensivo para la auditoría de algoritmos de IA, enfocándose en métricas de equidad, transparencia y responsabilidad. El framework incluye herramientas automatizadas y metodologías de evaluación.</p>
    
    <p>Se presentan tres casos de estudio en sistemas de contratación, aprobación de créditos y justicia predictiva, demostrando la aplicabilidad del framework en diferentes dominios.</p>`,

    lineas_investigacion: [7, 3], // Ética y Sistemas Inteligentes
    lineas_extension: [],
  },
]

// ===== FUNCIONES PRINCIPALES DEL ASYNC MOCK =====
export const asyncMock = {
  // ===== ABOUT (Single Type) =====
  getAbout: async () => {
    await delay(800)
    // Poblar la relación con personas
    const aboutWithPeople = {
      ...mockAbout,
      people: mockPersonas.slice(0, 8), // Primeros 8 miembros del equipo
    }
    return { data: aboutWithPeople }
  },

  // ===== GLOBAL (Single Type) =====
  getGlobal: async () => {
    await delay(600)
    return { data: mockGlobal }
  },

  // ===== LINEAS DE INVESTIGACION (Collection Type) =====
  getLineasInvestigacion: async (filters = {}) => {
    await delay(900)
    let filteredLineas = [...mockLineasInvestigacion]

    // Poblar relaciones
    filteredLineas = filteredLineas.map((linea) => ({
      ...linea,
      people: mockPersonas.filter((persona) => persona.linea_investigacion === linea.id),
      proyectos: mockProyectos.filter((proyecto) => proyecto.linea_investigacion === linea.id),
      publicaciones: mockPublicaciones.filter((pub) => pub.lineas_investigacion.includes(linea.id)),
    }))

    if (filters.nombre) {
      filteredLineas = filteredLineas.filter((linea) =>
        linea.nombre.toLowerCase().includes(filters.nombre.toLowerCase()),
      )
    }

    return {
      data: filteredLineas,
      meta: {
        pagination: {
          pageCount: Math.ceil(filteredLineas.length / 10),
          total: filteredLineas.length,
        },
      },
    }
  },

  getLineaInvestigacion: async (id) => {
    await delay(700)
    const linea = mockLineasInvestigacion.find((l) => l.id === Number.parseInt(id))
    if (!linea) throw new Error("Línea de investigación no encontrada")

    // Poblar relaciones
    const lineaWithRelations = {
      ...linea,
      people: mockPersonas.filter((persona) => persona.linea_investigacion === linea.id),
      proyectos: mockProyectos.filter((proyecto) => proyecto.linea_investigacion === linea.id),
      publicaciones: mockPublicaciones.filter((pub) => pub.lineas_investigacion.includes(linea.id)),
    }

    return { data: lineaWithRelations }
  },

  // ===== LINEAS DE EXTENSION (Collection Type) =====
  getLineasExtension: async (filters = {}) => {
    await delay(800)
    let filteredLineas = [...mockLineasExtension]

    // Poblar relaciones
    filteredLineas = filteredLineas.map((linea) => ({
      ...linea,
      proyectos: mockProyectos.filter((proyecto) => proyecto.linea_extension === linea.id),
      publicaciones: mockPublicaciones.filter((pub) => pub.lineas_extension.includes(linea.id)),
    }))

    if (filters.nombre) {
      filteredLineas = filteredLineas.filter((linea) =>
        linea.nombre.toLowerCase().includes(filters.nombre.toLowerCase()),
      )
    }

    return {
      data: filteredLineas,
      meta: {
        pagination: {
          pageCount: Math.ceil(filteredLineas.length / 10),
          total: filteredLineas.length,
        },
      },
    }
  },

  getLineaExtension: async (id) => {
    await delay(700)
    const linea = mockLineasExtension.find((l) => l.id === Number.parseInt(id))
    if (!linea) throw new Error("Línea de extensión no encontrada")

    // Poblar relaciones
    const lineaWithRelations = {
      ...linea,
      proyectos: mockProyectos.filter((proyecto) => proyecto.linea_extension === linea.id),
      publicaciones: mockPublicaciones.filter((pub) => pub.lineas_extension.includes(linea.id)),
    }

    return { data: lineaWithRelations }
  },

  // ===== NOVEDADES (Collection Type) =====
  getNovedades: async (filters = {}) => {
    await delay(1000)
    let filteredNovedades = [...mockNovedades]

    if (filters.titulo) {
      filteredNovedades = filteredNovedades.filter((novedad) =>
        novedad.Titulo.toLowerCase().includes(filters.titulo.toLowerCase()),
      )
    }

    // Ordenar por fecha más reciente (simulada por ID)
    filteredNovedades.sort((a, b) => b.id - a.id)

    return {
      data: filteredNovedades,
      meta: {
        pagination: {
          pageCount: Math.ceil(filteredNovedades.length / 10),
          total: filteredNovedades.length,
        },
      },
    }
  },

  getNovedad: async (id) => {
    await delay(600)
    const novedad = mockNovedades.find((n) => n.id === Number.parseInt(id))
    if (!novedad) throw new Error("Novedad no encontrada")
    return { data: novedad }
  },

  // ===== OBJETIVOS (Collection Type) =====
  getObjetivos: async () => {
    await delay(700)
    return {
      data: mockObjetivos,
      meta: {
        pagination: {
          pageCount: 1,
          total: mockObjetivos.length,
        },
      },
    }
  },

  getObjetivo: async (id) => {
    await delay(600)
    const objetivo = mockObjetivos.find((o) => o.id === Number.parseInt(id))
    if (!objetivo) throw new Error("Objetivo no encontrada")
    return { data: objetivo }
  },

  // ===== PERSONAS (Collection Type) =====
  getPersonas: async (filters = {}) => {
    await delay(800)
    let filteredPersonas = [...mockPersonas]

    if (filters.role_person) {
      filteredPersonas = filteredPersonas.filter((persona) => persona.role_person === filters.role_person)
    }

    if (filters.linea_investigacion) {
      filteredPersonas = filteredPersonas.filter(
        (persona) => persona.linea_investigacion === Number.parseInt(filters.linea_investigacion),
      )
    }

    if (filters.full_name) {
      filteredPersonas = filteredPersonas.filter((persona) =>
        persona.full_name.toLowerCase().includes(filters.full_name.toLowerCase()),
      )
    }

    // Ordenar por rol: director, investigador, colaborador, becario
    const roleOrder = ["director", "investigador", "colaborador", "becario"]
    filteredPersonas.sort((a, b) => roleOrder.indexOf(a.role_person) - roleOrder.indexOf(b.role_person))

    return {
      data: filteredPersonas,
      meta: {
        pagination: {
          pageCount: Math.ceil(filteredPersonas.length / 10),
          total: filteredPersonas.length,
        },
      },
    }
  },

  getPersona: async (id) => {
    await delay(600)
    const persona = mockPersonas.find((p) => p.id === Number.parseInt(id))
    if (!persona) throw new Error("Persona no encontrada")

    // Agregar información de la línea de investigación
    const lineaInvestigacion = mockLineasInvestigacion.find((l) => l.id === persona.linea_investigacion)

    return {
      data: {
        ...persona,
        linea_investigacion_info: lineaInvestigacion,
      },
    }
  },

  // ===== PROYECTOS (Collection Type) =====
  getProyectos: async (filters = {}) => {
    await delay(900)
    let filteredProyectos = [...mockProyectos]

    if (filters.nombre) {
      filteredProyectos = filteredProyectos.filter((proyecto) =>
        proyecto.nombre.toLowerCase().includes(filters.nombre.toLowerCase()),
      )
    }

    if (filters.linea_investigacion) {
      filteredProyectos = filteredProyectos.filter(
        (proyecto) => proyecto.linea_investigacion === Number.parseInt(filters.linea_investigacion),
      )
    }

    if (filters.linea_extension) {
      filteredProyectos = filteredProyectos.filter(
        (proyecto) => proyecto.linea_extension === Number.parseInt(filters.linea_extension),
      )
    }

    // Poblar relaciones
    filteredProyectos = filteredProyectos.map((proyecto) => ({
      ...proyecto,
      linea_investigacion_info: proyecto.linea_investigacion
        ? mockLineasInvestigacion.find((l) => l.id === proyecto.linea_investigacion)
        : null,
      linea_extension_info: proyecto.linea_extension
        ? mockLineasExtension.find((l) => l.id === proyecto.linea_extension)
        : null,
    }))

    return {
      data: filteredProyectos,
      meta: {
        pagination: {
          pageCount: Math.ceil(filteredProyectos.length / 10),
          total: filteredProyectos.length,
        },
      },
    }
  },

  getProyecto: async (id) => {
    await delay(700)
    const proyecto = mockProyectos.find((p) => p.id === Number.parseInt(id))
    if (!proyecto) throw new Error("Proyecto no encontrado")

    // Poblar relaciones
    const proyectoWithRelations = {
      ...proyecto,
      linea_investigacion_info: proyecto.linea_investigacion
        ? mockLineasInvestigacion.find((l) => l.id === proyecto.linea_investigacion)
        : null,
      linea_extension_info: proyecto.linea_extension
        ? mockLineasExtension.find((l) => l.id === proyecto.linea_extension)
        : null,
    }

    return { data: proyectoWithRelations }
  },

  // ===== PUBLICACIONES (Collection Type) =====
  getPublicaciones: async (filters = {}) => {
    await delay(1000)
    let filteredPublicaciones = [...mockPublicaciones]

    if (filters.titulo) {
      filteredPublicaciones = filteredPublicaciones.filter((pub) =>
        pub.titulo.toLowerCase().includes(filters.titulo.toLowerCase()),
      )
    }

    if (filters.anio) {
      filteredPublicaciones = filteredPublicaciones.filter((pub) => pub.anio === Number.parseInt(filters.anio))
    }

    if (filters.tipo) {
      filteredPublicaciones = filteredPublicaciones.filter((pub) => pub.tipo === filters.tipo)
    }

    if (filters.autores) {
      filteredPublicaciones = filteredPublicaciones.filter((pub) =>
        pub.autores.toLowerCase().includes(filters.autores.toLowerCase()),
      )
    }

    if (filters.linea_investigacion) {
      filteredPublicaciones = filteredPublicaciones.filter((pub) =>
        pub.lineas_investigacion.includes(Number.parseInt(filters.linea_investigacion)),
      )
    }

    if (filters.linea_extension) {
      filteredPublicaciones = filteredPublicaciones.filter((pub) =>
        pub.lineas_extension.includes(Number.parseInt(filters.linea_extension)),
      )
    }

    // Ordenar por año descendente
    filteredPublicaciones.sort((a, b) => b.anio - a.anio)

    // Poblar relaciones
    filteredPublicaciones = filteredPublicaciones.map((pub) => ({
      ...pub,
      lineas_investigacion_info: pub.lineas_investigacion
        .map((lineaId) => mockLineasInvestigacion.find((l) => l.id === lineaId))
        .filter(Boolean),
      lineas_extension_info: pub.lineas_extension
        .map((lineaId) => mockLineasExtension.find((l) => l.id === lineaId))
        .filter(Boolean),
    }))

    return {
      data: filteredPublicaciones,
      meta: {
        pagination: {
          pageCount: Math.ceil(filteredPublicaciones.length / 10),
          total: filteredPublicaciones.length,
        },
      },
    }
  },

  getPublicacion: async (id) => {
    await delay(700)
    const publicacion = mockPublicaciones.find((p) => p.id === Number.parseInt(id))
    if (!publicacion) throw new Error("Publicación no encontrada")

    // Poblar relaciones
    const publicacionWithRelations = {
      ...publicacion,
      lineas_investigacion_info: publicacion.lineas_investigacion
        .map((lineaId) => mockLineasInvestigacion.find((l) => l.id === lineaId))
        .filter(Boolean),
      lineas_extension_info: publicacion.lineas_extension
        .map((lineaId) => mockLineasExtension.find((l) => l.id === lineaId))
        .filter(Boolean),
    }

    return { data: publicacionWithRelations }
  },

  // ===== FUNCIONES DE UTILIDAD =====

  // Búsqueda global
  searchGlobal: async (query, filters = {}) => {
    await delay(1200)
    const results = {
      lineas_investigacion: [],
      lineas_extension: [],
      proyectos: [],
      publicaciones: [],
      personas: [],
      novedades: [],
    }

    const searchTerm = query.toLowerCase()

    // Buscar en líneas de investigación
    results.lineas_investigacion = mockLineasInvestigacion.filter(
      (linea) =>
        linea.nombre.toLowerCase().includes(searchTerm) || linea.descripcion.toLowerCase().includes(searchTerm),
    )

    // Buscar en líneas de extensión
    results.lineas_extension = mockLineasExtension.filter(
      (linea) =>
        linea.nombre.toLowerCase().includes(searchTerm) || linea.descripcion.toLowerCase().includes(searchTerm),
    )

    // Buscar en proyectos
    results.proyectos = mockProyectos.filter(
      (proyecto) =>
        proyecto.nombre.toLowerCase().includes(searchTerm) || proyecto.descripcion.toLowerCase().includes(searchTerm),
    )

    // Buscar en publicaciones
    results.publicaciones = mockPublicaciones.filter(
      (pub) =>
        pub.titulo.toLowerCase().includes(searchTerm) ||
        pub.autores.toLowerCase().includes(searchTerm) ||
        pub.resumen.toLowerCase().includes(searchTerm),
    )

    // Buscar en personas
    results.personas = mockPersonas.filter(
      (persona) =>
        persona.full_name.toLowerCase().includes(searchTerm) || persona.biography.toLowerCase().includes(searchTerm),
    )

    // Buscar en novedades
    results.novedades = mockNovedades.filter(
      (novedad) =>
        novedad.Titulo.toLowerCase().includes(searchTerm) || novedad.Descripcion.toLowerCase().includes(searchTerm),
    )

    return {
      data: results,
      meta: {
        total_results: Object.values(results).reduce((sum, arr) => sum + arr.length, 0),
        query: query,
      },
    }
  },

  // Estadísticas del sistema
  getEstadisticas: async () => {
    await delay(800)
    return {
      data: {
        lineas_investigacion: mockLineasInvestigacion.length,
        lineas_extension: mockLineasExtension.length,
        proyectos: mockProyectos.length,
        publicaciones: mockPublicaciones.length,
        personas: mockPersonas.length,
        novedades: mockNovedades.length,
        publicaciones_por_anio: {
          2024: mockPublicaciones.filter((p) => p.anio === 2024).length,
          2023: mockPublicaciones.filter((p) => p.anio === 2023).length,
          2022: mockPublicaciones.filter((p) => p.anio === 2022).length,
        },
        personas_por_rol: {
          director: mockPersonas.filter((p) => p.role_person === "director").length,
          investigador: mockPersonas.filter((p) => p.role_person === "investigador").length,
          colaborador: mockPersonas.filter((p) => p.role_person === "colaborador").length,
          becario: mockPersonas.filter((p) => p.role_person === "becario").length,
        },
      },
    }
  },

  // Simulación de acciones de usuario
  simulateUserAction: async (action, data) => {
    await delay(500)
    console.log(`Simulating action: ${action}`, data)
    return { success: true, message: `Acción ${action} ejecutada correctamente` }
  },

  // Simulación de acceso al backoffice
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

  // Simulación de envío de formularios
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

// Exportar el objeto asyncMock
export default asyncMock
