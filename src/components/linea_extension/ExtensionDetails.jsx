"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext"
import { marked } from "marked"
import asyncMock from "../../../asyncMock"
import {
  FolderOutlined,
  BookOutlined,
  BankOutlined,
  TeamOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  BranchesOutlined,
  StarOutlined,
} from "@ant-design/icons"

const LineaExtensionDetail = () => {
  const { id } = useParams()
  const [linea, setLinea] = useState(null)
  const [showProjects, setShowProjects] = useState(false)
  const projectListRef = useRef(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchLineaExtensionDetail = async () => {
      try {
        const response = await asyncMock.getLineaExtension(id)
        setLinea(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLineaExtensionDetail()
  }, [id])

  if (!linea) {
    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="carousel-loading">
            <div className="loading-spinner" />
            <span className="loading-text">Cargando línea de extensión...</span>
          </div>
        </div>
      </section>
    )
  }

  const descripcionHTML = marked(linea.descripcion || "")

  const handleToggleProjects = () => {
    const newState = !showProjects
    setShowProjects(newState)

    if (!showProjects) {
      setTimeout(() => {
        if (projectListRef.current) {
          projectListRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }

  return (
    <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <BranchesOutlined />
            <span>Línea de Extensión</span>
          </div>
          <h2 className="section-title">{linea.nombre}</h2>
          <p className="section-description">
            Conoce los detalles de esta línea de extensión, sus objetivos, metodología y el impacto que genera en la
            comunidad.
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

        {/* Instituciones */}
        {linea.instituciones && (
          <div className="carousel-container" style={{ marginBottom: "2rem" }}>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "var(--color-text-primary)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <BankOutlined />
              Escuelas e Instituciones Participantes
            </h3>

            <div className="news-card">
              <div className="news-content">
                <p style={{ color: "var(--color-text-secondary)", margin: 0, lineHeight: "1.6", textAlign: "center" }}>
                  {linea.instituciones}
                </p>
              </div>
            </div>
          </div>
        )}

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

            <div className="news-btn-primary" style={{ cursor: "default" }}>
              <TeamOutlined />
              <span>Contactar equipo</span>
            </div>
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
                Proyectos Activos
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
      </div>
    </section>
  )
}

export default LineaExtensionDetail
