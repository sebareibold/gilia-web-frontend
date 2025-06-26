"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext"
import {
  BookOutlined,
  ExperimentOutlined,
  ArrowRightOutlined,
  UserOutlined,
  ProjectOutlined,
  StarOutlined,
} from "@ant-design/icons"
import Loader from "../Loader/Loader"
import asyncMock from "../../../asyncMock"
import "../shared/FuturisticStyles.css"

const ResearchLinesContainer = () => {
  const [lineas, setLineas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchLineas = async () => {
      setLoading(true)
      setError(null)
      try {
        // Simular llamada a API usando asyncMock
        const response = await asyncMock.getLineasInvestigacion()
        setLineas(response.data || [])
      } catch (err) {
        console.error("Error al obtener líneas de investigación:", err)
        setError(err.message || "Error al cargar las líneas de investigación.")
      } finally {
        setLoading(false)
      }
    }

    fetchLineas()
  }, [])

  if (loading) {
    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="carousel-loading">
            <Loader />
            <span className="loading-text">Cargando líneas de investigación...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error || !lineas || lineas.length === 0) {
    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="section-header">
            <div className="section-badge">
              <ExperimentOutlined />
              <span>Investigación</span>
            </div>
            <h2 className="section-title">No hay líneas disponibles</h2>
            <p className="section-description">
              Vuelve a consultar más tarde para ver nuestras líneas de investigación.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container">
        {/* Header de sección */}
        <div className="section-header">
          <div className="section-badge">
            <ExperimentOutlined />
            <span>Nuestras Líneas de Investigación</span>
          </div>
          <h2 className="section-title">Explorando las Fronteras del Conocimiento</h2>
          <p className="section-description">
            Descubre nuestras 7 líneas de investigación especializadas en inteligencia artificial, procesamiento de
            lenguaje natural, robótica, ética computacional y tecnologías emergentes que están transformando el futuro.
          </p>
        </div>

        {/* Grid de líneas de investigación */}
        <div className="research-lines-grid">
          {lineas.map((linea, index) => (
            <div key={linea.id} className="research-line-card" style={{ animationDelay: `${index * 0.1}s` }}>
              {/* Imagen de la línea */}
              <div className="research-line-image-container">
                <img
                  src={linea.imagen?.url || "/placeholder.svg?height=300&width=400"}
                  alt={linea.nombre}
                  className="research-line-image"
                  loading="lazy"
                />
                <div className="research-line-image-overlay">
                  <ExperimentOutlined />
                </div>
              </div>

              {/* Contenido */}
              <div className="research-line-content">
                <div className="research-line-meta">
                  <span className="research-line-category">Línea de Investigación</span>
                  <div className="research-line-stats">
                    <div className="research-line-stat">
                      <UserOutlined />
                      <span>{linea.people?.length || 0}</span>
                    </div>
                    <div className="research-line-stat">
                      <ProjectOutlined />
                      <span>{linea.proyectos?.length || 0}</span>
                    </div>
                    <div className="research-line-stat">
                      <BookOutlined />
                      <span>{linea.publicaciones?.length || 0}</span>
                    </div>
                  </div>
                </div>

                <h3 className="research-line-title">{linea.nombre}</h3>

                <div
                  className="research-line-description"
                  dangerouslySetInnerHTML={{
                    __html:
                      linea.descripcion?.replace(/<[^>]*>/g, "").substring(0, 200) + "..." ||
                      "Descripción no disponible",
                  }}
                />

                <div className="research-line-actions">
                  <Link to={`/lineas-de-investigacion/${linea.id}`} className="research-line-btn-primary">
                    <span>Explorar línea</span>
                    <ArrowRightOutlined />
                  </Link>
                  <div className="research-line-btn-secondary" title="Línea destacada">
                    <StarOutlined />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="research-stats-section">
          <div className="research-stats-header">
            <h3 className="research-stats-title">Impacto de Nuestras Investigaciones</h3>
            <p className="research-stats-description">
              Datos que reflejan nuestro compromiso con la excelencia académica y la innovación tecnológica.
            </p>
          </div>

          <div className="research-stats-grid">
            <div className="research-stat-card">
              <div className="research-stat-icon">
                <ExperimentOutlined />
              </div>
              <span className="research-stat-number">{lineas.length}</span>
              <span className="research-stat-label">Líneas Activas</span>
            </div>
            <div className="research-stat-card">
              <div className="research-stat-icon">
                <UserOutlined />
              </div>
              <span className="research-stat-number">
                {lineas.reduce((total, linea) => total + (linea.people?.length || 0), 0)}
              </span>
              <span className="research-stat-label">Investigadores</span>
            </div>
            <div className="research-stat-card">
              <div className="research-stat-icon">
                <ProjectOutlined />
              </div>
              <span className="research-stat-number">
                {lineas.reduce((total, linea) => total + (linea.proyectos?.length || 0), 0)}+
              </span>
              <span className="research-stat-label">Proyectos</span>
            </div>
            <div className="research-stat-card">
              <div className="research-stat-icon">
                <BookOutlined />
              </div>
              <span className="research-stat-number">
                {lineas.reduce((total, linea) => total + (linea.publicaciones?.length || 0), 0)}+
              </span>
              <span className="research-stat-label">Publicaciones</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResearchLinesContainer
