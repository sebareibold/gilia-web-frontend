"use client"

import { useParams, Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "../../contexts/ThemeContext"
import {
  BookOutlined,
  FolderOutlined,
  TeamOutlined,
  ExperimentOutlined,
  ArrowRightOutlined,
  UserOutlined,
  CheckCircleOutlined,
  StarOutlined,
} from "@ant-design/icons"
import asyncMock from "../../../asyncMock"
import { marked } from "marked"

const ListLineasContainer = () => {
  const [linea, setLinea] = useState(null)
  const [showProjects, setShowProjects] = useState(false)
  const [showIntegrants, setShowIntegrants] = useState(false)
  const projectListRef = useRef(null)
  const integrantsListRef = useRef(null)
  const { id } = useParams()
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await asyncMock.getLineaInvestigacion(id)
        setLinea(response.data)
      } catch (error) {
        console.error("Error al obtener la línea de investigación:", error)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    if (showProjects && projectListRef.current) {
      setTimeout(() => {
        projectListRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }, [showProjects])

  useEffect(() => {
    if (showIntegrants && integrantsListRef.current) {
      setTimeout(() => {
        integrantsListRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }, [showIntegrants])

  if (!linea) {
    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="carousel-loading">
            <div className="loading-spinner" />
            <span className="loading-text">Cargando línea de investigación...</span>
          </div>
        </div>
      </section>
    )
  }

  const descripcionHTML = marked(linea.descripcion || "")

  const handleToggleProjects = () => {
    const newState = !showProjects
    setShowProjects(newState)
    if (newState) setShowIntegrants(false)
  }

  const handleToggleIntegrants = () => {
    const newState = !showIntegrants
    setShowIntegrants(newState)
    if (newState) setShowProjects(false)
  }

  const getRoleColor = (role) => {
    const colors = {
      director: "#E91E63",
      investigador: "#2196F3",
      colaborador: "#4CAF50",
      becario: "#FF9800",
    }
    return colors[role] || "#6B7280"
  }

  return (
    <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">{linea.nombre}</h2>
          <p className="section-description">
            Explora los detalles de esta línea de investigación, sus proyectos activos, publicaciones científicas y el
            equipo de investigadores que la conforman.
          </p>
        </div>

        {/* Content */}
        <div className="carousel-container" style={{ marginBottom: "2rem" }}>
          <div
            style={{
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "var(--color-text-secondary)",
            }}
            dangerouslySetInnerHTML={{ __html: descripcionHTML }}
          />
        </div>

        {/* Actions */}
        <div className="carousel-container" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "var(--color-text-primary)",
              marginBottom: "1.5rem",
            }}
          >
            Explora más sobre esta línea
          </h3>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <button onClick={handleToggleProjects} className="news-btn-primary">
              <FolderOutlined />
              <span>Ver proyectos</span>
            </button>

            <Link to="/post" state={{ linea: linea.nombre }} className="news-btn-primary">
              <BookOutlined />
              <span>Ver publicaciones</span>
            </Link>

            <button onClick={handleToggleIntegrants} className="news-btn-primary">
              <TeamOutlined />
              <span>Ver integrantes</span>
            </button>
          </div>
        </div>

        {/* Projects List */}
        {showProjects && linea.proyectos?.length > 0 && (
          <div ref={projectListRef} className="multi-card-carousel">
            <div className="carousel-container">
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "var(--color-text-primary)",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <FolderOutlined />
                Proyectos de Investigación
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                  gap: "2rem",
                }}
              >
                {linea.proyectos.map((proyecto) => (
                  <div key={proyecto.id} className="news-card">
                    <div className="news-image-container">
                      <img src="/placeholder.svg?height=200&width=350" alt={proyecto.nombre} className="news-image" />
                      <div className="news-image-overlay">
                        <CheckCircleOutlined />
                      </div>
                    </div>

                    <div className="news-content">
                      <div className="news-meta">
                        <span className="news-category">Proyecto</span>
                        <div className="news-views">
                          <StarOutlined />
                          <span>Activo</span>
                        </div>
                      </div>

                      <h3 className="news-title">{proyecto.nombre}</h3>

                      <p className="news-description">{proyecto.descripcion}</p>

                      <div className="news-actions">
                        <Link to={`/proyecto/${proyecto.id}`} className="news-btn-primary">
                          <span>Ver detalles</span>
                          <ArrowRightOutlined />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Integrants List */}
        {showIntegrants && linea.people?.length > 0 && (
          <div ref={integrantsListRef} className="multi-card-carousel">
            <div className="carousel-container">
              <h3
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "var(--color-text-primary)",
                  marginBottom: "1.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                <TeamOutlined />
                Integrantes del Equipo
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "2rem",
                }}
              >
                {linea.people.map((integrante) => (
                  <div key={integrante.id} className="news-card">
                    <div className="news-image-container">
                      <img
                        src={integrante.photo?.[0]?.url || "/placeholder.svg?height=200&width=300"}
                        alt={integrante.full_name}
                        className="news-image"
                      />
                      <div className="news-image-overlay">
                        <UserOutlined />
                      </div>
                    </div>

                    <div className="news-content">
                      <div className="news-meta">
                        <span
                          className="news-category"
                          style={{
                            background: getRoleColor(integrante.role_person),
                            color: "white",
                          }}
                        >
                          {integrante.role_person}
                        </span>
                      </div>

                      <h3 className="news-title">{integrante.full_name}</h3>

                      <p className="news-description">
                        {integrante.biography || "Miembro del equipo de investigación especializado en esta línea."}
                      </p>

                      <div className="news-actions">
                        {integrante.social_links && (
                          <a href={`mailto:${integrante.social_links}`} className="news-btn-primary">
                            <span>Contactar</span>
                            <ArrowRightOutlined />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ListLineasContainer
