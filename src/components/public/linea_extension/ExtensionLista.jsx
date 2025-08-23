"use client"

import { useState, useMemo, useCallback } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"
import { BranchesOutlined, ArrowRightOutlined, BankOutlined } from "@ant-design/icons"
import { dataService } from "../../../services/dataService"
import { useOptimizedFetch } from "../../../hooks/useOptimizedFetch"
import '../Home/Novedades/HomeExploration.css'

const ExtensionLista = () => {
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"
  const [visibleCount, setVisibleCount] = useState(6)

  // Use optimized fetch hook for better performance and maintainability
  const { 
    data: response, 
    loading, 
    error, 
    refetch 
  } = useOptimizedFetch(
    () => dataService.getExtensionLines(),
    [], // No dependencies
    {
      onError: (error) => {
        console.error('Error fetching extension lines:', error)
      }
    }
  )

  const lineas = response?.data || []

  // Memoize visible lines to avoid recalculation on every render
  const visibleLineas = useMemo(() => lineas.slice(0, visibleCount), [lineas, visibleCount])
  const hasMore = useMemo(() => visibleCount < lineas.length, [visibleCount, lineas.length])

  // Memoize load more handler to prevent unnecessary re-renders
  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => prev + 6)
  }, [])

  if (loading) {
    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="section-header">
            <h2 className="section-title">Líneas de Extensión</h2>
            <p className="section-description">Cargando líneas de extensión...</p>
          </div>
          <div className="news-grid-container">
            <div className="news-grid">
              {/* Loading skeleton cards */}
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="news-card loading">
                  <div className="news-image-container loading"></div>
                  <div className="news-content">
                    <div className="news-meta loading"></div>
                    <div className="news-title loading"></div>
                    <div className="news-description loading"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="section-header">
            <h2 className="section-title">Líneas de Extensión</h2>
            <p className="section-description" style={{ color: 'var(--color-error)' }}>
              {typeof error === 'string' ? error : 'No se pudieron cargar las líneas de extensión'}
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
        <div className="news-grid-container">
          <div className="news-grid">
            {visibleLineas.map((linea) => (
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
                    <Link to={`/extension/${linea.id}`} className="news-btn-primary">
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
              onClick={handleLoadMore}
              aria-label="Cargar más líneas de extensión"
            >
              <span>Ver más líneas de extensión</span>
            </button>
          </div>
        )}

        {/* Stats Section */}
        <div className="extension-stats-section">
          <h3 className="extension-stats-title">
            Impacto de Nuestras Líneas de Extensión
          </h3>

          <div className="extension-stats-grid">
            {[
              { value: "25+", label: "Proyectos Activos" },
              { value: "500+", label: "Beneficiarios" },
              { value: "15", label: "Instituciones" },
              { value: "8", label: "Años de Experiencia" }
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="extension-stat-card"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className="extension-stat-value">
                  {stat.value}
                </div>
                <div className="extension-stat-label">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExtensionLista
