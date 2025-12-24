"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"
import { BranchesOutlined, ArrowRightOutlined, BankOutlined } from "@ant-design/icons"
import { getExtensionLines } from "../../../services"

const LineaExtensionList = () => {
  const [extensionLines, setExtensionLines] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"
  const [visibleCount, setVisibleCount] = useState(6)
  // Nombre del método de servicios utilizado desde services/index.js
  const EXTENSION_LINES_SERVICE_METHOD = "getExtensionLines"

  useEffect(() => {
    const fetchExtensionLines = async () => {
      try {
        const response = await getExtensionLines()
        setExtensionLines(response.data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchExtensionLines()
  }, [])

  const visibleExtensionLines = extensionLines.slice(0, visibleCount)
  const hasMore = visibleCount < extensionLines.length

  if (loading) {
    return (
      <section className="exploration-section h-screen" data-theme={isDarkTheme ? "dark" : "light"}>
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
    <section className="exploration-section min-h-screen" data-theme={isDarkTheme ? "dark" : "light"}>
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
              {visibleExtensionLines.map((item) => (
                <div key={item.id || item.idLineaExtension} className="news-card">
                  <div className="news-image-container">
                    <img
                      src={item.image?.url || item.imagen?.url || "/placeholder.svg?height=200&width=350"}
                      alt={item.title || item.titulo}
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

                    <h3 className="news-title">{item.title || item.titulo}</h3>

                    <p className="news-description">
                      {typeof (item.description || item.descripcion) === "string" && (item.description || item.descripcion).length > 150
                        ? `${(item.description || item.descripcion).slice(0, 150)}...`
                        : item.description || item.descripcion || "Sin descripción disponible"}
                    </p>

                    <div className="news-actions">
                      <Link to={`/extension/${item.id || item.idLineaExtension}`} className="news-btn-primary">
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
      </div>
    </section>
  )
}

export default LineaExtensionList
