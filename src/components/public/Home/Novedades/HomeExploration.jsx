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
  LeftOutlined,
  RightOutlined,
  ShareAltOutlined,
  EyeOutlined,
  FireOutlined,
  TrophyOutlined,
  TeamOutlined,
} from "@ant-design/icons"
import { useTheme } from "../../../../contexts/ThemeContext"
import "./HomeExploration.css"
import asyncMock from '../../../../../asyncMock'

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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [cardsPerView, setCardsPerView] = useState(3)
  const [isAnimating, setIsAnimating] = useState(false)
  const autoPlayRef = useRef(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  // Determinar cuántas cards mostrar según el tamaño de pantalla
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1200) {
        setCardsPerView(3)
      } else if (window.innerWidth >= 768) {
        setCardsPerView(2)
      } else {
        setCardsPerView(1)
      }
    }

    updateCardsPerView()
    window.addEventListener("resize", updateCardsPerView)
    return () => window.removeEventListener("resize", updateCardsPerView)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Obtener datos desde asyncMock
        const response = await asyncMock.getNovedades()
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

  // Auto-play del carrusel
  useEffect(() => {
    if (novedades.length > 0 && !isTransitioning) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const maxIndex = Math.max(0, novedades.length - cardsPerView)
          const newIndex = prevIndex >= maxIndex ? 0 : prevIndex + 1
          
          // Ejecutar animaciones escalonadas en auto-play
          setIsAnimating(true)
          setTimeout(() => {
            setIsAnimating(false)
          }, 1000) // Tiempo para que terminen las animaciones escalonadas
          
          return newIndex
        })
      }, 8000) // Aumentado de 6000ms a 8000ms (8 segundos)

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current)
        }
      }
    }
  }, [novedades.length, isTransitioning, cardsPerView])

  const handleTransition = (newIndex) => {
    const maxIndex = Math.max(0, novedades.length - cardsPerView)
    if (isTransitioning || newIndex === currentIndex || newIndex < 0 || newIndex > maxIndex) return

    // Pausar auto-play durante transición manual
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    setIsTransitioning(true)
    setIsAnimating(true)
    setCurrentIndex(newIndex)

    // Resetear el estado de transición y animación
    setTimeout(() => {
      setIsTransitioning(false)
      setTimeout(() => {
        setIsAnimating(false)
      }, 1000) // Aumentado de 600ms a 1000ms para animaciones más lentas
    }, 600) // Aumentado de 400ms a 600ms para transición más lenta
  }

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? Math.max(0, novedades.length - cardsPerView) : currentIndex - 1
    handleTransition(newIndex)
  }

  const handleNext = () => {
    const maxIndex = Math.max(0, novedades.length - cardsPerView)
    const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
    handleTransition(newIndex)
  }

  const handleIndicatorClick = (index) => {
    handleTransition(index)
  }

  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`
    }
    return views.toString()
  }

  const getVisibleCards = () => {
    return novedades.slice(currentIndex, currentIndex + cardsPerView)
  }

  const getTotalSlides = () => {
    return Math.max(0, novedades.length - cardsPerView + 1)
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

  const visibleCards = getVisibleCards()
  const totalSlides = getTotalSlides()

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

        {/* Carrusel multi-card */}
        <div className="multi-card-carousel">
          {/* Controles de navegación */}
          <div className="carousel-navigation">
            <button
              className="carousel-nav-btn carousel-nav-prev"
              onClick={handlePrevious}
              disabled={isTransitioning}
              aria-label="Noticias anteriores"
            >
              <LeftOutlined />
            </button>
            <button
              className="carousel-nav-btn carousel-nav-next"
              onClick={handleNext}
              disabled={isTransitioning}
              aria-label="Siguientes noticias"
            >
              <RightOutlined />
            </button>
          </div>

          <div className="carousel-container">
            {/* Track del carrusel */}
            <div className="carousel-track">
              {visibleCards.map((novedad, index) => {
                const NewsIcon = newsIcons[(currentIndex + index) % newsIcons.length]
                return (
                  <div 
                    key={`${novedad.id}-${currentIndex}`} 
                    className={`carousel-slide ${isAnimating ? 'carousel-slide-animating' : ''}`}
                    style={{
                      animationDelay: isAnimating ? `${index * 0.15}s` : '0s'
                    }}
                  >
                    <div className="news-card">
                      {/* Imagen */}
                      <div className="news-image-container">
                        <img
                          src={novedad.imagen || "/placeholder.svg?height=300&width=400"}
                          alt={novedad.Titulo}
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
                          <span className="news-category">{novedad.categoria}</span>
                          <div className="news-views">
                            <EyeOutlined />
                            <span>{formatViews(novedad.vistas)}</span>
                          </div>
                        </div>

                        <h3 className="news-title">{novedad.Titulo}</h3>

                        <p className="news-description">{novedad.Descripcion}</p>

                        <div className="news-actions">
                          <a
                            href={novedad.Enlace}
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
                  </div>
                )
              })}
            </div>
          </div>

          {/* Indicadores */}
          {totalSlides > 1 && (
            <div className="carousel-indicators">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
                  onClick={() => handleIndicatorClick(index)}
                  disabled={isTransitioning}
                  aria-label={`Ir al grupo de noticias ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
