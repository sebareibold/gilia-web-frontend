"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"
import { BranchesOutlined, ArrowRightOutlined, BankOutlined } from "@ant-design/icons"
import asyncMock from "../../../../asyncMock"

const LineaExtensionList = () => {
  const [lineas, setLineas] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchLineasExtension = async () => {
      try {
        const response = await asyncMock.getLineasExtension()
        setLineas(response.data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchLineasExtension()
  }, [])

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
              {lineas.map((linea) => (
                <div key={linea.id} className="news-card">
                  <div className="news-image-container">
                    <img
                      src={linea.imagen?.url || "/placeholder.svg?height=200&width=350"}
                      alt={linea.nombre}
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

                    <h3 className="news-title">{linea.nombre}</h3>

                    <p className="news-description">
                      {typeof linea.descripcion === "string" && linea.descripcion.length > 150
                        ? `${linea.descripcion.slice(0, 150)}...`
                        : linea.descripcion || "Sin descripción disponible"}
                    </p>

                    <div className="news-actions">
                      <Link to={`/linea-extension/${linea.id}`} className="news-btn-primary">
                        <span>Ver más</span>
                        <ArrowRightOutlined />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
