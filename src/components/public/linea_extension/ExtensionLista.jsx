"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"
import { BranchesOutlined, ArrowRightOutlined, BankOutlined } from "@ant-design/icons"
import { dataService } from "../../../services/dataService"

const LineaExtensionList = () => {
  const [lineas, setLineas] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"
  const [visibleCount, setVisibleCount] = useState(6)

  useEffect(() => {
    const fetchLineasExtension = async () => {
      try {
        const response = await dataService.getLineasExtension()
        setLineas(response.data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchLineasExtension()
  }, [])

  const visibleLineas = lineas.slice(0, visibleCount)
  const hasMore = visibleCount < lineas.length

  if (loading) {
    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="carousel-loading">
            <div className="loading-spinner" />
            <span className="loading-text">Cargando líneas de extensión...</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container">
        {/* Header */}
        <div className="section-header">

          <h2 className="section-title">Líneas de Extensión</h2>
          <p className="section-description">
            Proyectos que conectan la universidad con la comunidad, aplicando conocimientos de ciencias de la
            computación para resolver problemas sociales y promover el desarrollo tecnológico inclusivo.
          </p>
        </div>

        {/* Grid de líneas */}
        <div className="multi-card-carousel">
          <div className="carousel-container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "2rem",
              }}
            >
              {visibleLineas.map((linea) => (
                <div key={linea.idLineaExtension} className="news-card">
                  <div className="news-image-container">
                    <img
                      src={linea.imagen?.url || "/placeholder.svg?height=200&width=350"}
                      alt={linea.titulo}
                      className="news-image"
                    />
                    <div className="news-image-overlay">
                      <BranchesOutlined />
                    </div>
                  </div>

                  <div className="news-content">
                    <div className="news-meta">
                      <span className="news-category">Extensión</span>
                      <div className="news-views">
                        <BankOutlined />
                        <span>Activa</span>
                      </div>
                    </div>

                    <h3 className="news-title">{linea.titulo}</h3>

                    <p className="news-description">
                      {typeof linea.descripcion === "string" && linea.descripcion.length > 150
                        ? `${linea.descripcion.slice(0, 150)}...`
                        : linea.descripcion || "Sin descripción disponible"}
                    </p>

                    <div className="news-actions">
                      <Link to={`/extension/${linea.idLineaExtension}`} className="news-btn-primary">
                        <span>Ver más</span>
                        <ArrowRightOutlined />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Botón Ver más */}
          {hasMore && (
            <div className="load-more-container">
              <button
                className="load-more-btn"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                aria-label="Cargar más líneas de extensión"
              >
                <span>Ver más líneas de extensión</span>
              </button>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="carousel-container" style={{ marginTop: "2rem", textAlign: "center" }}>
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "var(--color-text-primary)",
              marginBottom: "1.5rem",
            }}
          >
            Impacto de Nuestras Líneas de Extensión
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2rem",
            }}
          >
            <div className="news-card" style={{ textAlign: "center", padding: "2rem" }}>
              <div
                style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "0.5rem" }}
              >
                25+
              </div>
              <div style={{ color: "var(--color-text-secondary)", fontSize: "1rem", fontWeight: "500" }}>
                Proyectos Activos
              </div>
            </div>

            <div className="news-card" style={{ textAlign: "center", padding: "2rem" }}>
              <div
                style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "0.5rem" }}
              >
                500+
              </div>
              <div style={{ color: "var(--color-text-secondary)", fontSize: "1rem", fontWeight: "500" }}>
                Beneficiarios
              </div>
            </div>

            <div className="news-card" style={{ textAlign: "center", padding: "2rem" }}>
              <div
                style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "0.5rem" }}
              >
                15
              </div>
              <div style={{ color: "var(--color-text-secondary)", fontSize: "1rem", fontWeight: "500" }}>
                Instituciones
              </div>
            </div>

            <div className="news-card" style={{ textAlign: "center", padding: "2rem" }}>
              <div
                style={{ fontSize: "2.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "0.5rem" }}
              >
                8
              </div>
              <div style={{ color: "var(--color-text-secondary)", fontSize: "1rem", fontWeight: "500" }}>
                Años de Experiencia
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LineaExtensionList
