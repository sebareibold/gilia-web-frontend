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
import { useTheme } from "../../../contexts/ThemeContext"
import "./HomeExploration.css"

// Mock data para novedades mejorado sin fechas
const mockNovedades = [
  {
    id: 1,
    Titulo: "Revolucionario Modelo de IA para Procesamiento de Lenguaje Natural",
    Descripcion:
      "Desarrollo de un modelo de inteligencia artificial que supera a los enfoques existentes en un 15% en tareas de comprensión de texto y análisis de sentimientos para el español.",
    Enlace: "https://www.ieee.org/publications/",
    imagen: "/imagenRandom.png",
    categoria: "Investigación",
    vistas: 1250,
    destacado: true,
  },
  {
    id: 2,
    Titulo: "Participación Destacada en ICAI 2024",
    Descripcion:
      "Tres ponencias magistrales sobre ética en IA, sistemas adaptativos y robótica educativa. Nuestros investigadores fueron keynote speakers principales.",
    Enlace: "https://www.icai-conference.org/",
    imagen: "/imagenRandom.png",
    categoria: "Conferencia",
    vistas: 890,
    destacado: false,
  },
  {
    id: 3,
    Titulo: "Proyecto Horizon Europe Multinacional",
    Descripcion:
      "Colaboración internacional con universidades de Brasil y Chile, financiado con 2.5 millones de euros para desarrollar sistemas inteligentes adaptativos.",
    Enlace: "https://ec.europa.eu/programmes/horizon2020/",
    imagen: "/imagenRandom.png",
    categoria: "Proyecto",
    vistas: 2100,
    destacado: true,
  },
  {
    id: 4,
    Titulo: "Premio Nacional: Traductor Español-Guaraní",
    Descripcion:
      "Reconocimiento del Ministerio de Ciencia por desarrollar el primer sistema de traducción automática que preserva lenguas originarias digitalmente.",
    Enlace: "https://www.conicet.gov.ar/",
    imagen: "/imagenRandom.png",
    categoria: "Premio",
    vistas: 1750,
    destacado: false,
  },
  {
    id: 5,
    Titulo: "Plataforma Educativa con IA Personalizada",
    Descripcion:
      "Lanzamiento exitoso de nuestra plataforma de e-learning que adapta contenido y metodología según el perfil de cada estudiante. Más de 1000 usuarios activos.",
    Enlace: "https://www.edx.org/",
    imagen: "/imagenRandom.png",
    categoria: "Lanzamiento",
    vistas: 3200,
    destacado: true,
  },
  {
    id: 6,
    Titulo: "Colaboración Internacional en Robótica",
    Descripcion:
      "Nuevo proyecto de investigación en robótica educativa con universidades europeas, enfocado en el desarrollo de asistentes pedagógicos inteligentes.",
    Enlace: "https://www.robotics-education.org/",
    imagen: "/imagenRandom.png",
    categoria: "Colaboración",
    vistas: 980,
    destacado: false,
  },
  {
    id: 7,
    Titulo: "Avances en Procesamiento de Voz",
    Descripcion:
      "Desarrollo de tecnologías de reconocimiento y síntesis de voz para dialectos regionales, mejorando la accesibilidad tecnológica en comunidades locales.",
    Enlace: "https://www.speech-tech.org/",
    imagen: "/imagenRandom.png",
    categoria: "Tecnología",
    vistas: 1420,
    destacado: true,
  },
  {
    id: 8,
    Titulo: "Publicación en Nature AI",
    Descripcion:
      "Artículo científico sobre redes neuronales explicables publicado en una de las revistas más prestigiosas del campo de la inteligencia artificial.",
    Enlace: "https://www.nature.com/",
    imagen: "/imagenRandom.png",
    categoria: "Publicación",
    vistas: 2850,
    destacado: true,
  },
]

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
        // Simular llamada a API
        await new Promise((resolve) => setTimeout(resolve, 1200))
        setNovedades(mockNovedades)
      } catch (err) {
        console.error("Error detallado al obtener datos:", err)
        setError(err.message || "Ocurrió un error al cargar las novedades.")
        setNovedades(mockNovedades) // Fallback a mock data
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
          return prevIndex >= maxIndex ? 0 : prevIndex + 1
        })
      }, 6000)

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
    setCurrentIndex(newIndex)

    // Resetear el estado de transición
    setTimeout(() => {
      setIsTransitioning(false)
    }, 800)
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
          <div className="carousel-container">
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
            

            {/* Track del carrusel */}
            <div className="carousel-track">
              {visibleCards.map((novedad, index) => {
                const NewsIcon = newsIcons[(currentIndex + index) % newsIcons.length]
                return (
                  <div key={`${novedad.id}-${currentIndex}`} className="carousel-slide">
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
