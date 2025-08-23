"use client"

import { useMemo } from "react"
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
import { dataService } from "../../../services/dataService"
import { useParallelFetch } from "../../../hooks/useOptimizedFetch"

const iconMap = {
  BulbOutlined: BulbOutlined,
  TeamOutlined: TeamOutlined,
  RocketOutlined: RocketOutlined,
  GlobalOutlined: GlobalOutlined,
  ExperimentOutlined: ExperimentOutlined,
  StarOutlined: StarOutlined,
}

export default function AboutUs() {
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  // Use optimized parallel fetch for better performance
  const { 
    data, 
    loading, 
    errors, 
    refetch 
  } = useParallelFetch(
    {
      about: () => dataService.getAboutInfo(),
      objectives: () => dataService.getObjectives(),
      team: () => dataService.getTeamMembers()
    },
    [], // No dependencies
    {
      staggerDelay: 50 // Small stagger to ensure title loads before team
    }
  )

  const aboutData = data.about?.about
  const objectives = data.objectives?.data || []
  const team = data.team?.data || []
  const hasErrors = Object.keys(errors).length > 0

  // Memoize team render to prevent unnecessary re-renders
  const teamMembersSection = useMemo(() => {
    if (!data.team || team.length === 0) return null
    
    return (
      <div className="team-grid">
        {team.map((member, index) => (
          <div 
            key={member.id} 
            className="team-member-card"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
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
                  {(member.especialidades || []).map((specialty, index) => (
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
    )
  }, [data.team, team])

  if (loading) {
    return (
      <section className="about-us-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="about-container">
          <div className="about-header">
            <h2 className="about-title">Conoce a GILIA</h2>
            <div className="loading-placeholder">
              <Loader />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (hasErrors && !data.about) {
    return (
      <section className="about-us-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="about-container">
          <div className="about-header">
            <h2 className="about-title">Error al cargar información</h2>
            <p className="about-description">
              No se pudo cargar la información del equipo. Por favor, intenta nuevamente más tarde.
            </p>
            <button 
              className="btn btn-primary" 
              onClick={refetch}
              style={{ marginTop: 'var(--space-4)' }}
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="about-us-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="about-container">
        {/* Header - Loads first */}
        {data.about && aboutData && (
          <div className="about-header">
            <h2 className="about-title">Conoce a GILIA</h2>
            <p className="about-description">{aboutData.mision}</p>
          </div>
        )}

        {/* Team Members Grid - Loads after header */}
        {teamMembersSection}

        {/* Objectives Section - Loads with header */}
        {data.objectives && objectives.length > 0 && (
          <div className="objectives-section">
            <div className="objectives-header">
              <h3 className="objectives-title">Nuestros Objetivos</h3>
              <p className="objectives-description">
                Los pilares fundamentales que guían nuestra investigación y desarrollo en inteligencia artificial.
              </p>
            </div>

            <div className="objectives-grid">
              {objectives.map((objective, index) => {
                const IconComponent = iconMap[objective.icono] || BulbOutlined
                return (
                  <div 
                    key={objective.id} 
                    className="objective-card"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
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
        )}

        {/* Team Statistics - Loads after team */}
        {data.team && team.length > 0 && (
          <div className="team-stats">
            {[
              { icon: TeamOutlined, value: team.length, label: "Miembros" },
              { icon: BulbOutlined, value: 150, label: "Publicaciones" },
              { icon: RocketOutlined, value: 25, label: "Proyectos" },
              { icon: StarOutlined, value: 8, label: "Reconocimientos" }
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="team-stat"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="team-stat-icon">
                  <stat.icon />
                </div>
                <span className="team-stat-number">{stat.value}</span>
                <span className="team-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
