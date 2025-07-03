"use client"

import { useEffect, useState, useRef } from "react"
import { useTheme } from "../../../contexts/ThemeContext"
import {
  SearchOutlined,
  ShareAltOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
} from "@ant-design/icons"
import asyncMock from "../../../../asyncMock"
import { useLocation } from "react-router-dom"
import PublicationFilters from './PublicationFilters'
import './PublicationFilters.css'

const PostList = () => {
  const { state } = useLocation()
  const linea = state?.linea || ""
  const [publicaciones, setPublicaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagina, setPagina] = useState(1)
  const [filtro, setFiltro] = useState({ anio: "", tipo: "", linea: linea })
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"
  const [visibleCount, setVisibleCount] = useState(6)
  const [animatedIndexes, setAnimatedIndexes] = useState(new Set())
  const cardRefs = useRef([])
  const filterRef = useRef(null)
  const headerRef = useRef(null)
  const loadMoreRef = useRef(null)

  const visiblePublicaciones = publicaciones.slice(0, visibleCount)
  const hasMore = visibleCount < publicaciones.length

  useEffect(() => {
    const fetchPublicaciones = async () => {
      setLoading(true)
      try {
        const response = await asyncMock.getPublicaciones(filtro)
        setPublicaciones(response.data || [])
      } catch (err) {
        console.error("Error fetching publicaciones:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPublicaciones()
  }, [pagina, filtro])

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index
            setAnimatedIndexes((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2 }
    )
    // Header
    if (headerRef.current) observer.observe(headerRef.current)
    // Filtros
    if (filterRef.current) observer.observe(filterRef.current)
    // Cards
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })
    // Botón ver más
    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current)
      if (filterRef.current) observer.unobserve(filterRef.current)
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current)
    }
  }, [visiblePublicaciones, hasMore])

  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value })
    setPagina(1)
    setVisibleCount(6)
  }

  const handleClearFilters = () => {
    setFiltro({ anio: '', tipo: '', autores: '' })
    setPagina(1)
    setVisibleCount(6)
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
        <div
          className={`section-header${animatedIndexes.has('header') ? ' animated' : ''}`}
          ref={headerRef}
          data-index="header"
          style={{ animationDelay: '0.1s' }}
        >
          <h2 className="section-title">Publicaciones Científicas</h2>
          <p className="section-description">
            Explora nuestras investigaciones, artículos y contribuciones académicas en el campo de la inteligencia
            artificial, procesamiento de lenguaje natural y tecnologías emergentes.
          </p>
        </div>

        {/* Filtros */}
        <div
          ref={filterRef}
          data-index="filters"
          className={`filters-animated${animatedIndexes.has('filters') ? ' animated' : ''}`}
          style={{ animationDelay: '0.2s' }}
        >
          <PublicationFilters filtro={filtro} onChange={handleFiltroChange} onClear={handleClearFilters} />
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
                {visiblePublicaciones.map((pub, idx) => (
                  <div
                    key={pub.id}
                    ref={el => cardRefs.current[idx] = el}
                    data-index={idx}
                    className={`news-card${animatedIndexes.has(idx.toString()) ? ' animated' : ''}`}
                    style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                  >
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
            {/* Botón Ver más */}
            {hasMore && (
              <div
                className={`load-more-container${animatedIndexes.has('loadmore') ? ' animated' : ''}`}
                ref={loadMoreRef}
                data-index="loadmore"
                style={{ animationDelay: `${0.3 + visiblePublicaciones.length * 0.1}s` }}
              >
                <button
                  className="load-more-btn"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  aria-label="Cargar más publicaciones"
                >
                  <span>Ver más publicaciones</span>
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
