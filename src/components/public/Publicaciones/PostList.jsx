"use client"

import { useEffect, useState } from "react"
import { useTheme } from "../../../contexts/ThemeContext"
import {
  FilterOutlined,
  SearchOutlined,
  ShareAltOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  UserOutlined,
  TagOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons"
import asyncMock from "../../../../asyncMock"
import { useLocation } from "react-router-dom"

const PostList = () => {
  const { state } = useLocation()
  const linea = state?.linea || ""
  const [publicaciones, setPublicaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagina, setPagina] = useState(1)
  const [filtro, setFiltro] = useState({ anio: "", tipo: "", linea: linea })
  const [totalPaginas, setTotalPaginas] = useState(1)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchPublicaciones = async () => {
      setLoading(true)
      try {
        const response = await asyncMock.getPublicaciones(filtro)
        setPublicaciones(response.data || [])
        setTotalPaginas(response.meta?.pagination?.pageCount || 1)
      } catch (err) {
        console.error("Error fetching publicaciones:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPublicaciones()
  }, [pagina, filtro])

  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value })
    setPagina(1)
  }

  const getTypeColor = (tipo) => {
    const colors = {
      Artículo: "#E91E63",
      "Capítulo de Libro": "#9C27B0",
      Paper: "#2196F3",
      Libro: "#FF9800",
      "Informe Técnico": "#4CAF50",
      Tesis: "#795548",
    }
    return colors[tipo] || "#6B7280"
  }

  return (
    <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container">
        {/* Header */}
        <div className="section-header">

          <h2 className="section-title">Publicaciones Científicas</h2>
          <p className="section-description">
            Explora nuestras investigaciones, artículos y contribuciones académicas en el campo de la inteligencia
            artificial, procesamiento de lenguaje natural y tecnologías emergentes.
          </p>
        </div>

        {/* Filters */}
        <div className="carousel-container" style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "var(--color-text-primary)",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FilterOutlined />
            Filtros de Búsqueda
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                  color: "var(--color-text-primary)",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                <CalendarOutlined />
                Año de Publicación
              </label>
              <input
                type="number"
                name="anio"
                placeholder="Ej: 2024"
                value={filtro.anio || ""}
                onChange={handleFiltroChange}
                className="input"
              />
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                  color: "var(--color-text-primary)",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                <TagOutlined />
                Tipo de Publicación
              </label>
              <select name="tipo" value={filtro.tipo || ""} onChange={handleFiltroChange} className="input">
                <option value="">Todos los tipos</option>
                <option value="Artículo">Artículo</option>
                <option value="Capítulo de Libro">Capítulo de Libro</option>
                <option value="Paper">Paper</option>
                <option value="Libro">Libro</option>
                <option value="Informe Técnico">Informe Técnico</option>
                <option value="Tesis">Tesis</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.5rem",
                  color: "var(--color-text-primary)",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                <UserOutlined />
                Autor
              </label>
              <input
                type="text"
                name="autores"
                placeholder="Buscar por autor"
                value={filtro.autores || ""}
                onChange={handleFiltroChange}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="carousel-loading">
            <div className="loading-spinner" />
            <span className="loading-text">Cargando publicaciones...</span>
          </div>
        ) : publicaciones.length === 0 ? (
          <div className="carousel-container" style={{ textAlign: "center", padding: "3rem" }}>
            <SearchOutlined style={{ fontSize: "3rem", color: "var(--color-text-secondary)", marginBottom: "1rem" }} />
            <h3 style={{ color: "var(--color-text-primary)", marginBottom: "0.5rem" }}>No hay publicaciones</h3>
            <p style={{ color: "var(--color-text-secondary)" }}>
              No se encontraron publicaciones con los filtros aplicados.
            </p>
          </div>
        ) : (
          <div className="multi-card-carousel">
            <div className="carousel-container">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                  gap: "2rem",
                }}
              >
                {publicaciones.map((pub) => (
                  <div key={pub.id} className="news-card">
                    {/* Header de la publicación */}
                    <div className="news-content">
                      <div className="news-meta">
                        <span
                          className="news-category"
                          style={{
                            background: getTypeColor(pub.tipo),
                            color: "white",
                          }}
                        >
                          {pub.tipo}
                        </span>
                        <div className="news-views">
                          <CalendarOutlined />
                          <span>{pub.anio}</span>
                        </div>
                      </div>

                      <h3 className="news-title">{pub.titulo}</h3>

                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-text-secondary)",
                          marginBottom: "1rem",
                          fontWeight: "500",
                        }}
                      >
                        <div dangerouslySetInnerHTML={{ __html: pub.autores }} />
                      </div>

                      {pub.publicacion && (
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--color-text-muted)",
                            marginBottom: "1rem",
                            fontStyle: "italic",
                          }}
                        >
                          Publicado en: {pub.publicacion}
                        </div>
                      )}

                      <div className="news-description">
                        <div dangerouslySetInnerHTML={{ __html: pub.resumen }} />
                      </div>

                      <div className="news-actions">
                        {pub.enlace ? (
                          <a href={pub.enlace} target="_blank" rel="noopener noreferrer" className="news-btn-primary">
                            <span>Ver publicación</span>
                            <ArrowRightOutlined />
                          </a>
                        ) : (
                          <div className="news-btn-primary" style={{ opacity: 0.5, cursor: "not-allowed" }}>
                            <span>No disponible</span>
                          </div>
                        )}
                        <button className="news-btn-secondary" aria-label="Compartir publicación">
                          <ShareAltOutlined />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {totalPaginas > 1 && (
              <div className="carousel-navigation">
                <button
                  disabled={pagina === 1}
                  onClick={() => setPagina(pagina - 1)}
                  className="carousel-nav-btn"
                  style={{
                    opacity: pagina === 1 ? 0.3 : 1,
                    cursor: pagina === 1 ? "not-allowed" : "pointer",
                  }}
                >
                  <LeftOutlined />
                </button>

                <div
                  style={{
                    padding: "0.5rem 1rem",
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "0.5rem",
                    color: "var(--color-text-secondary)",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  }}
                >
                  Página {pagina} de {totalPaginas}
                </div>

                <button
                  disabled={pagina === totalPaginas}
                  onClick={() => setPagina(pagina + 1)}
                  className="carousel-nav-btn"
                  style={{
                    opacity: pagina === totalPaginas ? 0.3 : 1,
                    cursor: pagina === totalPaginas ? "not-allowed" : "pointer",
                  }}
                >
                  <RightOutlined />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default PostList
