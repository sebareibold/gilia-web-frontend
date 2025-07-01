"use client"

import { useState, useEffect } from "react"
import {
  TeamOutlined,
  GlobalOutlined,
  MailOutlined,
  LinkedinOutlined,
  BulbOutlined,
  RocketOutlined,
  ExperimentOutlined,
  StarOutlined,
} from "@ant-design/icons"
import { useTheme } from "../../../contexts/ThemeContext"
import Loader from "../Loader/Loader"
import "./Nosotros.css"

// Mock data mejorado para el equipo
const mockTeamData = {
  about: {
    mision:
      "Desarrollar soluciones innovadoras en inteligencia artificial y procesamiento de lenguaje natural que contribuyan al avance científico y tecnológico, con un enfoque especial en lenguas con recursos limitados y aplicaciones socialmente relevantes.",
    vision:
      "Ser un grupo de investigación de referencia internacional en IA y lenguajes, reconocido por la excelencia académica, la innovación tecnológica y el impacto social de nuestras contribuciones.",
    valores: [
      "Excelencia académica",
      "Innovación tecnológica",
      "Colaboración internacional",
      "Impacto social",
      "Ética en IA",
    ],
  },
  people: [
    {
      id: 1,
      nombre: "Dr. María Elena Rodríguez",
      cargo: "Directora del Grupo",
      email: "maria.rodriguez@gilia.edu.ar",
      imagen: "/placeholder.svg?height=120&width=120",
      descripcion:
        "Especialista en procesamiento de lenguaje natural con más de 15 años de experiencia. Lidera proyectos de investigación en traducción automática y análisis de sentimientos.",
      especialidades: ["NLP", "Machine Learning", "Traducción Automática", "Análisis de Sentimientos"],
      linkedin: "https://linkedin.com/in/maria-rodriguez",
      github: "https://github.com/mrodriguez",
      activo: true,
    },
    {
      id: 2,
      nombre: "Dr. Carlos Mendoza",
      cargo: "Investigador Senior",
      email: "carlos.mendoza@gilia.edu.ar",
      imagen: "/placeholder.svg?height=120&width=120",
      descripcion:
        "Experto en sistemas inteligentes y robótica educativa. Ha publicado más de 50 artículos en revistas internacionales de primer nivel.",
      especialidades: ["Robótica", "Sistemas Inteligentes", "IA Educativa", "Computer Vision"],
      linkedin: "https://linkedin.com/in/carlos-mendoza",
      github: "https://github.com/cmendoza",
      activo: true,
    },
    {
      id: 3,
      nombre: "Dra. Ana Sofía López",
      cargo: "Investigadora Postdoctoral",
      email: "ana.lopez@gilia.edu.ar",
      imagen: "/placeholder.svg?height=120&width=120",
      descripcion:
        "Especializada en ética de la inteligencia artificial y sistemas de recomendación. Coordina proyectos de colaboración internacional.",
      especialidades: ["Ética en IA", "Sistemas de Recomendación", "Fairness", "Explainable AI"],
      linkedin: "https://linkedin.com/in/ana-lopez",
      twitter: "https://twitter.com/ana_lopez_ai",
      activo: true,
    },
    {
      id: 4,
      nombre: "Mg. Roberto Silva",
      cargo: "Investigador Junior",
      email: "roberto.silva@gilia.edu.ar",
      imagen: "/placeholder.svg?height=120&width=120",
      descripcion:
        "Doctorando en ciencias de la computación, enfocado en deep learning y redes neuronales para procesamiento de texto.",
      especialidades: ["Deep Learning", "Neural Networks", "Text Mining", "Python"],
      github: "https://github.com/rsilva",
      twitter: "https://twitter.com/roberto_silva",
      activo: true,
    },
    {
      id: 5,
      nombre: "Lic. Valentina Torres",
      cargo: "Desarrolladora de Software",
      email: "valentina.torres@gilia.edu.ar",
      imagen: "/placeholder.svg?height=120&width=120",
      descripcion:
        "Especialista en desarrollo de aplicaciones web y móviles para proyectos de investigación. Experta en tecnologías modernas de frontend y backend.",
      especialidades: ["React", "Node.js", "Python", "UI/UX Design"],
      github: "https://github.com/vtorres",
      linkedin: "https://linkedin.com/in/valentina-torres",
      activo: true,
    },
    {
      id: 6,
      nombre: "Ing. Diego Ramírez",
      cargo: "Administrador de Sistemas",
      email: "diego.ramirez@gilia.edu.ar",
      imagen: "/placeholder.svg?height=120&width=120",
      descripcion:
        "Responsable de la infraestructura tecnológica del grupo. Especialista en cloud computing y administración de clusters de cómputo de alto rendimiento.",
      especialidades: ["DevOps", "Cloud Computing", "Docker", "Kubernetes"],
      linkedin: "https://linkedin.com/in/diego-ramirez",
      github: "https://github.com/dramirez",
      activo: true,
    },
  ],
  objectives: [
    {
      id: 1,
      titulo: "Investigación de Vanguardia",
      descripcion:
        "Desarrollar investigación de alta calidad en inteligencia artificial, con especial énfasis en procesamiento de lenguaje natural y sistemas inteligentes adaptativos.",
      icono: "BulbOutlined",
    },
    {
      id: 2,
      titulo: "Formación de Recursos Humanos",
      descripcion:
        "Formar investigadores y profesionales altamente capacitados en IA, contribuyendo al desarrollo del capital humano en ciencia y tecnología.",
      icono: "TeamOutlined",
    },
    {
      id: 3,
      titulo: "Transferencia Tecnológica",
      descripcion:
        "Transferir conocimiento y tecnología al sector productivo y social, generando impacto real en la sociedad a través de nuestras innovaciones.",
      icono: "RocketOutlined",
    },
    {
      id: 4,
      titulo: "Colaboración Internacional",
      descripcion:
        "Establecer y mantener colaboraciones estratégicas con instituciones de investigación de prestigio internacional para potenciar nuestro impacto.",
      icono: "GlobalOutlined",
    },
  ],
}

const iconMap = {
  BulbOutlined: BulbOutlined,
  TeamOutlined: TeamOutlined,
  RocketOutlined: RocketOutlined,
  GlobalOutlined: GlobalOutlined,
  ExperimentOutlined: ExperimentOutlined,
  StarOutlined: StarOutlined,
}

export default function AboutUs() {
  const [aboutData, setAboutData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Simular llamada a API
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setAboutData(mockTeamData)

        // Animar estadísticas
        setTimeout(() => {
          animateStats()
        }, 500)
      } catch (err) {
        console.error("Error al obtener datos del equipo:", err)
        setError(err.message || "Error al cargar la información del equipo")
        setAboutData(mockTeamData) // Fallback
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const animateStats = () => {
    const targets = { members: 6, publications: 150, projects: 25, awards: 8 }
    const duration = 2000
    const steps = 60

    Object.keys(targets).forEach((key) => {
      const target = targets[key]
      const increment = target / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        // setStats((prev) => ({ ...prev, [key]: Math.floor(current) }))
      }, duration / steps)
    })
  }

  if (loading) {
    return (
      <section className="about-us-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="about-container">
          <Loader />
        </div>
      </section>
    )
  }

  if (error || !aboutData) {
    return (
      <section className="about-us-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="about-container">
          <div className="about-header">
            <h2 className="about-title">Error al cargar información</h2>
            <p className="about-description">
              No se pudo cargar la información del equipo. Por favor, intenta nuevamente más tarde.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="about-us-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="about-container">
        {/* Header */}
        <div className="about-header">
          
          <h2 className="about-title">Conoce a GILIA</h2>
          <p className="about-description">{aboutData.about.mision}</p>
        </div>

        {/* Grid de miembros del equipo */}
        <div className="team-grid">
          {aboutData.people.map((member) => (
            <div key={member.id} className="team-member-card">
              {/* Header de la card con avatar y estado */}
              <div className="card-header-section">
                <div className="member-avatar-container">
                  <div className="avatar-background">
                    <img src={member.imagen || "/placeholder.svg"} alt={member.nombre} className="member-avatar" />
                  </div>
                  {member.activo && <div className="member-status" />}
                </div>
                
                <div className="member-basic-info">
                  <h3 className="member-name">{member.nombre}</h3>
                  <div className="member-role">{member.cargo}</div>
                </div>
              </div>

              {/* Contenido principal */}
              <div className="card-content-section">
                <div className="member-description-container">
                  <p className="member-description">{member.descripcion}</p>
                </div>

                <div className="member-specialties-container">
                  <h4 className="specialties-title">Especialidades</h4>
                  <div className="member-specialties">
                    {member.especialidades.map((specialty, index) => (
                      <span key={index} className="specialty-tag">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer con contactos */}
              <div className="card-footer-section">
                <div className="member-contact">
                  <a href={`mailto:${member.email}`} className="contact-btn primary-contact" title="Email">
                    <MailOutlined />
                    <span>Email</span>
                  </a>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-btn primary-contact"
                      title="LinkedIn"
                    >
                      <LinkedinOutlined />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Sección de objetivos */}
        <div className="objectives-section">
          <div className="objectives-header">
            <h3 className="objectives-title">Nuestros Objetivos</h3>
            <p className="objectives-description">
              Los pilares fundamentales que guían nuestra investigación y desarrollo en inteligencia artificial.
            </p>
          </div>

          <div className="objectives-grid">
            {aboutData.objectives.map((objective) => {
              const IconComponent = iconMap[objective.icono] || BulbOutlined
              return (
                <div key={objective.id} className="objective-card">
                  <div className="objective-icon">
                    <IconComponent />
                  </div>
                  <h4 className="objective-title">{objective.titulo}</h4>
                  <p className="objective-description">{objective.descripcion}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
