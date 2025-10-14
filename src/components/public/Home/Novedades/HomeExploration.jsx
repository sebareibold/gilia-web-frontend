"use client"

import { useState, useEffect, useRef } from "react"
import {
  ArrowRightOutlined,
  BulbOutlined,
  BookOutlined,
  ExperimentOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  StarOutlined,
  ShareAltOutlined,
  EyeOutlined,
  FireOutlined,
  TrophyOutlined,
  TeamOutlined,
  DownOutlined,
} from "@ant-design/icons"
import { useTheme } from "../../../../contexts/ThemeContext"
import "./HomeExploration.css"
import { dataService } from "/src/services/dataService.js";

// Array de iconos para rotar con más variedad
const newsIcons = [
  BulbOutlined,
  BookOutlined,
  ExperimentOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  StarOutlined,
  FireOutlined,
  TrophyOutlined,
  TeamOutlined,
]

export default function HomeExploration() {
  const [novedades, setNovedades] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleCount, setVisibleCount] = useState(3) // Mostrar 3 novedades inicialmente (1 fila)
  const [loadingMore, setLoadingMore] = useState(false)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  // Animación de aparición
  const [animatedCards, setAnimatedCards] = useState(new Set())
  const cardRefs = useRef([])

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setAnimatedCards(prev => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2 }
    )
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })
    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [novedades, visibleCount])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Obtener datos desde asyncMock
                const response = await dataService.getNovedades();
        setNovedades(response.data)
      } catch (err) {
        console.error("Error detallado al obtener datos:", err)
        setError(err.message || "Ocurrió un error al cargar las novedades.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleLoadMore = () => {
    setLoadingMore(true)
    // Simular carga asíncrona
    setTimeout(() => {
      setVisibleCount(prev => prev + 6) // Cargar 6 novedades más (2 filas de 3)
      setLoadingMore(false)
    }, 800)
  }

  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`
    }
    return views.toString()
  }

  const getVisibleNovedades = () => {
    return novedades.slice(0, visibleCount)
  }

  const hasMoreNovedades = () => {
    return visibleCount < novedades.length
  }

  if (loading) {
    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="carousel-loading">
            <div className="loading-spinner" />
            <span className="loading-text">Cargando las últimas novedades...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error || !novedades || novedades.length === 0) {
    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="section-header">
            <div className="section-badge">
              <ExperimentOutlined />
              <span>Novedades</span>
            </div>
            <h2 className="section-title">No hay novedades disponibles</h2>
            <p className="section-description">
              Vuelve a consultar más tarde para ver las últimas actualizaciones de nuestro equipo de investigación.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const visibleNovedades = getVisibleNovedades()

  return (
    <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container">
        {/* Header de sección */}
        <div className="section-header">
          <div className="section-badge">
            <StarOutlined />
            <span>Últimas Novedades</span>
          </div>
          <h2 className="section-title">Descubre Nuestros Últimos Avances</h2>
          <p className="section-description">
            Mantente al día con nuestras investigaciones más recientes, publicaciones destacadas y logros
            revolucionarios en inteligencia artificial, procesamiento de lenguaje natural y tecnologías emergentes.
          </p>
        </div>

        {/* Grid de novedades */}
        <div className="news-grid-container">
          <div className="news-grid">
            {visibleNovedades.map((novedad, index) => {
              const NewsIcon = newsIcons[index % newsIcons.length]
              const isAnimated = animatedCards.has(index)
              return (
                <div 
                  key={novedad.idNovedad} 
                  ref={el => cardRefs.current[index] = el}
                  data-index={index}
                  className={`news-card${isAnimated ? ' animated' : ''}`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Imagen */}
                  <div className="news-image-container">
                    <img
                      src={novedad.imagen || "/placeholder.svg?height=300&width=400"}
                      alt={novedad.titulo}
                      className="news-image"
                      loading="lazy"
                    />
                    <div className="news-image-overlay">
                      <NewsIcon />
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="news-content">
                    <div className="news-meta">
                                                                </div>

                    <h3 className="news-title">{novedad.titulo}</h3>

                    <p className="news-description">{novedad.descripcion}</p>

                    <div className="news-actions">
                      <a
                        href={novedad.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="news-btn-primary"
                      >
                        <span>Leer más</span>
                        <ArrowRightOutlined />
                      </a>
                      <button className="news-btn-secondary" aria-label="Compartir noticia">
                        <ShareAltOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Botón "Ver más" */}
          {hasMoreNovedades() && (
            <div className="load-more-container">
              <button
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={loadingMore}
                aria-label="Cargar más novedades"
              >
                {loadingMore ? (
                  <>
                    <div className="loading-spinner-small" />
                    <span>Cargando...</span>
                  </>
                ) : (
                  <>
                    <span>Ver más novedades</span>
                    <DownOutlined />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
