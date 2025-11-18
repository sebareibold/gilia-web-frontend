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
import Loader from "../common/Loader/Loader"
import "./AboutUs.css"
import { getAboutInfo, getObjectives, getTeamMembers } from "../../services"

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
  const [objectives, setObjectives] = useState([])
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"
  // Nombres de métodos utilizados desde services/index.js
  const ABOUT_SERVICE_METHOD = "getAboutInfo"
  const OBJECTIVES_SERVICE_METHOD = "getObjectives"
  const TEAM_SERVICE_METHOD = "getTeamMembers"

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const aboutRes = await getAboutInfo()
        const objRes = await getObjectives()
        const teamRes = await getTeamMembers()

        setAboutData(aboutRes.about)
        setObjectives(objRes.data)
        setTeam(teamRes.data)

        setTimeout(() => {
          animateStats()
        }, 500)
      } catch (err) {
        console.error("Error al obtener datos del equipo:", err)
        setError(err.message || "Error al cargar la información del equipo")
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
          <p className="about-description">{aboutData?.mission || aboutData?.mision}</p>
        </div>

        {/* Grid de miembros del equipo */}
        <div className="team-grid">
          {team.map((member) => (
            <div key={member.id} className="team-member-card">
              {/* Header de la card con avatar y estado */}
              <div className="card-header-section">
                <div className="member-avatar-container">
                  <div className="avatar-background">
                    <img src={member.image || member.imagen || "/placeholder.svg"} alt={member.name || member.nombre} className="member-avatar" />
                  </div>
                  {(member.active || member.activo) && <div className="member-status" />}
                </div>
                
                <div className="member-basic-info">
                  <h3 className="member-name">{member.name || member.nombre}</h3>
                  <div className="member-role">{member.role || member.cargo}</div>
                </div>
              </div>

              {/* Contenido principal */}
              <div className="card-content-section">
                <div className="member-description-container">
                  <p className="member-description">{member.description || member.descripcion}</p>
                </div>

                <div className="member-specialties-container">
                  <h4 className="specialties-title">Especialidades</h4>
                  <div className="member-specialties">
                    {(member.specialties || member.especialidades || []).map((specialty, index) => (
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
            {objectives.map((objective) => {
              const iconKey = objective.icon || objective.icono
              const IconComponent = iconMap[iconKey] || BulbOutlined
              return (
                <div key={objective.id} className="objective-card">
                  <div className="objective-icon">
                    <IconComponent />
                  </div>
                  <h4 className="objective-title">{objective.title || objective.titulo}</h4>
                  <p className="objective-description">{objective.description || objective.descripcion}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
