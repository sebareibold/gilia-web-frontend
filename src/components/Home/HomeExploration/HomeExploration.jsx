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
} from "@ant-design/icons"
import { useTheme } from "../../../context/ThemeContext"
import Loader from "../../Loader/Loader"
import "./HomeExploration.css"

// Mock data para novedades con imágenes
const mockNovedades = [
  {
    id: 1,
    Titulo: "Nueva Publicación en Revista Internacional de IA",
    Descripcion:
      "Nuestro equipo ha publicado un artículo sobre procesamiento de lenguaje natural en la revista IEEE Transactions on AI, destacando avances en modelos de comprensión de texto en español.",
    Enlace: "https://www.ieee.org/publications/",
    imagen: "/imagenRandom.png?height=200&width=300",
  },
  {
    id: 2,
    Titulo: "Participación en Conferencia Mundial de Inteligencia Artificial",
    Descripcion:
      "Presentación de tres ponencias magistrales en la conferencia ICAI 2024, incluyendo trabajos sobre ética en IA, sistemas inteligentes y robótica educativa.",
    Enlace: "https://www.icai-conference.org/",
    imagen: "/imagenRandom.png?height=200&width=300",
  },
  {
    id: 3,
    Titulo: "Nuevo Proyecto Internacional de Investigación",
    Descripcion:
      "Inicio de proyecto colaborativo con universidades de Brasil y Chile sobre sistemas inteligentes adaptativos, financiado por el programa Horizon Europe.",
    Enlace: "https://ec.europa.eu/programmes/horizon2020/",
    imagen: "/imagenRandom.png?height=200&width=300",
  },
  {
    id: 4,
    Titulo: "Premio a la Innovación Tecnológica",
    Descripcion:
      "Reconocimiento nacional por el desarrollo de un sistema de traducción automática español-guaraní, promoviendo la preservación de lenguas originarias.",
    Enlace: "https://www.conicet.gov.ar/",
    imagen: "/imagenRandom.png?height=200&width=300",
  },
  {
    id: 5,
    Titulo: "Lanzamiento de Plataforma Educativa",
    Descripcion:
      "Presentación oficial de nuestra plataforma de e-learning con IA integrada, diseñada para personalizar la experiencia de aprendizaje en ciencias de la computación.",
    Enlace: "https://www.edx.org/",
    imagen: "/imagenRandom.png?height=200&width=300",
  },
  {
    id: 6,
    Titulo: "Colaboración con Empresas Tecnológicas",
    Descripcion:
      "Establecimiento de alianzas estratégicas con empresas líderes en tecnología para el desarrollo de soluciones innovadoras en inteligencia artificial.",
    Enlace: "https://www.google.com/ai/",
    imagen: "/imagenRandom.png?height=200&width=300",
  },
]

// Array de iconos para rotar
const newsIcons = [BulbOutlined, BookOutlined, ExperimentOutlined, RocketOutlined, ThunderboltOutlined, StarOutlined]

export default function HomeExploration() {
  const [novedades, setNovedades] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false)
  const autoPlayRef = useRef(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        // Simular llamada a API
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Por ahora usar mock data
        setNovedades(mockNovedades)
        // Marcar como cargado inicialmente después de un pequeño delay
        setTimeout(() => setHasInitiallyLoaded(true), 1500)
      } catch (err) {
        console.error("Error detallado al obtener datos:", err)
        setError(err.message || "Ocurrió un error al cargar las novedades.")
        setNovedades(mockNovedades) // Fallback a mock data
        setTimeout(() => setHasInitiallyLoaded(true), 1500)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Auto-play del carrusel
  useEffect(() => {
    if (novedades.length > 0 && hasInitiallyLoaded && !isTransitioning) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % novedades.length)
      }, 50000)

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current)
        }
      }
    }
  }, [novedades.length, hasInitiallyLoaded, isTransitioning])

  const handleTransition = (newIndex) => {
    if (isTransitioning || newIndex === currentIndex) return

    // Pausar auto-play durante transición manual
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }

    setIsTransitioning(true)
    setCurrentIndex(newIndex)

    // Resetear el estado de transición
    setTimeout(() => {
      setIsTransitioning(false)
    }, 600) // Duración más corta para mejor UX
  }

  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? novedades.length - 1 : currentIndex - 1
    handleTransition(newIndex)
  }

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % novedades.length
    handleTransition(newIndex)
  }

  const handleIndicatorClick = (index) => {
    handleTransition(index)
  }

  // Función para obtener las 3 cards visibles sin cambiar keys
  const getVisibleCards = () => {
    if (novedades.length === 0) return []

    const cards = []
    for (let i = 0; i < 3; i++) {
      const dataIndex = (currentIndex - 1 + i + novedades.length) % novedades.length
      const position = i === 0 ? "left" : i === 1 ? "center" : "right"

      cards.push({
        data: novedades[dataIndex],
        position: position,
        iconIndex: dataIndex,
        // Key estable basado en la posición, no en el contenido
        key: `position-${i}`,
        dataId: novedades[dataIndex].id,
      })
    }
    return cards
  }

  if (loading) {
    return (
      <div className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="loading-container">
            <Loader />
            <p className="loading-text">Cargando novedades...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="error-container">
            <div className="news-icon">
              <ExperimentOutlined />
            </div>
            <h2 className="error-title">Error al cargar novedades</h2>
            <p className="error-text">No se pudieron cargar las novedades.</p>
            <p className="error-details">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!novedades || novedades.length === 0) {
    return (
      <div className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="error-container">
            <div className="news-icon">
              <BookOutlined />
            </div>
            <h2 className="error-title">No hay novedades</h2>
            <p className="error-text">Vuelve a consultar más tarde.</p>
          </div>
        </div>
      </div>
    )
  }

  const visibleCards = getVisibleCards()

  return (
    <div className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container">
        <div className="section-header">
          <p className="section-subtitle">Últimas</p>
          <h2 className="section-title">Novedades</h2>
          <p className="section-description">
            Mantente al día con nuestras investigaciones, publicaciones y avances en inteligencia artificial y
            procesamiento de lenguaje natural.
          </p>
        </div>

        <div className={`custom-carousel-container ${hasInitiallyLoaded ? "loaded" : ""}`}>
          {/* Botón anterior */}
          <button
            className="carousel-nav-btn carousel-nav-prev"
            onClick={handlePrevious}
            aria-label="Anterior"
            disabled={isTransitioning}
          >
            <LeftOutlined />
          </button>

          {/* Cards del carrusel */}
          <div className={`carousel-track ${isTransitioning ? "transitioning" : ""}`}>
            {visibleCards.map((card) => {
              const IconComponent = newsIcons[card.iconIndex % newsIcons.length]

              return (
                <div
                  key={card.key} // Key estable basado en posición
                  className={`carousel-card carousel-card-${card.position} ${hasInitiallyLoaded ? "loaded" : ""}`}
                  data-id={card.dataId} // Para debugging
                >
                  <div className="news-content">
                    {/* Imagen de la novedad */}
                    <div className="news-image-container">
                      <img src={card.data.imagen || "/placeholder.svg"} alt={card.data.Titulo} className="news-image" />
                    </div>

                    <div className="news-text-content">
                      <h3 className="news-title">{card.data.Titulo || "Título no disponible"}</h3>

                      <p className="news-description">{card.data.Descripcion || "Descripción no disponible."}</p>

                      <div className="news-cta">
                        <a
                          className="news-btn"
                          href={card.data.Enlace || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Ver Más
                          <ArrowRightOutlined />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Botón siguiente */}
          <button
            className="carousel-nav-btn carousel-nav-next"
            onClick={handleNext}
            aria-label="Siguiente"
            disabled={isTransitioning}
          >
            <RightOutlined />
          </button>
        </div>

        {/* Indicadores de posición */}
        <div className="carousel-indicators">
          {novedades.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleIndicatorClick(index)}
              aria-label={`Ir a novedad ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
