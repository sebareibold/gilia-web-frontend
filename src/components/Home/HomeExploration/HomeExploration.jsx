"use client"

import { useState, useEffect } from "react"
import {
  ArrowRightOutlined,
  BulbOutlined,
  BookOutlined,
  ExperimentOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  StarOutlined,
} from "@ant-design/icons"
import { useTheme } from "../../../context/ThemeContext"
import { API_BASE_URL } from "../../../config/apiConfig"
import Loader from "../../Loader/Loader"
import "./HomeExploration.css"

// Swiper
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination, Navigation, Mousewheel, Keyboard, Autoplay } from "swiper/modules"

import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"

const STRAPI_API_ENDPOINT = `${API_BASE_URL}/api/novedads`

// Array expandido de iconos futuristas para rotar
const newsIcons = [BulbOutlined, BookOutlined, ExperimentOutlined, RocketOutlined, ThunderboltOutlined, StarOutlined]

export default function HomeExploration() {
  const [novedades, setNovedades] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(STRAPI_API_ENDPOINT)

        if (!response.ok) {
          let errorData
          try {
            errorData = await response.json()
          } catch (parseError) {
            errorData = { message: response.statusText }
          }
          throw new Error(
            `HTTP error! status: ${response.status} - ${errorData?.error?.message || errorData?.message || "Error desconocido"}`,
          )
        }

        const result = await response.json()
        console.log("Datos recibidos de Strapi:", result)

        if (result && Array.isArray(result.data)) {
          setNovedades(result.data)
        } else {
          console.warn("La estructura de datos recibida no es la esperada:", result)
          setNovedades([])
        }
      } catch (err) {
        console.error("Error detallado al obtener datos:", err)
        setError(err.message || "Ocurrió un error al cargar las novedades.")
        // Mock data para demostración
        setNovedades([
          {
            id: 1,
            Titulo: "Nueva Publicación en Revista Internacional de IA",
            Descripcion:
              "Nuestro equipo ha publicado un artículo sobre procesamiento de lenguaje natural en la revista IEEE Transactions on AI, destacando avances en modelos de comprensión de texto en español.",
            Enlace: "#",
          },
          {
            id: 2,
            Titulo: "Participación en Conferencia Mundial de Inteligencia Artificial",
            Descripcion:
              "Presentación de tres ponencias magistrales en la conferencia ICAI 2024, incluyendo trabajos sobre ética en IA, sistemas inteligentes y robótica educativa.",
            Enlace: "#",
          },
          {
            id: 3,
            Titulo: "Nuevo Proyecto Internacional de Investigación",
            Descripcion:
              "Inicio de proyecto colaborativo con universidades de Brasil y Chile sobre sistemas inteligentes adaptativos, financiado por el programa Horizon Europe.",
            Enlace: "#",
          },
          {
            id: 4,
            Titulo: "Premio a la Innovación Tecnológica",
            Descripcion:
              "Reconocimiento nacional por el desarrollo de un sistema de traducción automática español-guaraní, promoviendo la preservación de lenguas originarias.",
            Enlace: "#",
          },
          {
            id: 5,
            Titulo: "Lanzamiento de Plataforma Educativa",
            Descripcion:
              "Presentación oficial de nuestra plataforma de e-learning con IA integrada, diseñada para personalizar la experiencia de aprendizaje en ciencias de la computación.",
            Enlace: "#",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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

        <div className="news-carousel-container">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            initialSlide={novedades.length > 0 ? Math.floor(novedades.length / 2) : 0}
            slidesPerView={"auto"}
            spaceBetween={30}
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={novedades.length > 1}
            modules={[EffectCoverflow, Pagination, Navigation, Mousewheel, Keyboard, Autoplay]}
            className="news-swiper"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
                coverflowEffect: {
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                },
              },
              768: {
                slidesPerView: "auto",
                spaceBetween: 30,
                coverflowEffect: {
                  rotate: 15,
                  stretch: 0,
                  depth: 200,
                  modifier: 1,
                },
              },
            }}
          >
            {novedades.map((novedad, index) => {
              const IconComponent = newsIcons[index % newsIcons.length]

              return (
                <SwiperSlide
                  key={novedad.id}
                  data-history={novedad.titulo || `novedad-${novedad.id}`}
                  className="news-slide"
                  style={{
                    width: "350px",
                    height: "auto",
                  }}
                >
                  <div className="news-content">
                    <div className="news-icon">
                      <IconComponent />
                    </div>

                    <h3 className="news-title">{novedad?.Titulo || "Título no disponible"}</h3>

                    <p className="news-description">{novedad?.Descripcion || "Descripción no disponible."}</p>

                    <div className="news-cta">
                      <a
                        className="news-btn"
                        href={novedad?.Enlace || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Ver Más
                        <ArrowRightOutlined />
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {/* Estadísticas adicionales */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            marginTop: "3rem",
          }}
        >
          <div
            className="news-slide"
            style={{
              minHeight: "auto",
              padding: "1.5rem",
              textAlign: "center",
              cursor: "default",
            }}
          >
            <div className="news-icon" style={{ margin: "0 auto 1rem auto" }}>
              <BookOutlined />
            </div>
            <h4
              style={{
                color: "var(--colorTextBase)",
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              50+
            </h4>
            <p
              style={{
                color: "var(--colorTextSecondary)",
                fontSize: "0.9rem",
                margin: 0,
              }}
            >
              Publicaciones
            </p>
          </div>

          <div
            className="news-slide"
            style={{
              minHeight: "auto",
              padding: "1.5rem",
              textAlign: "center",
              cursor: "default",
            }}
          >
            <div className="news-icon" style={{ margin: "0 auto 1rem auto" }}>
              <ExperimentOutlined />
            </div>
            <h4
              style={{
                color: "var(--colorTextBase)",
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              25+
            </h4>
            <p
              style={{
                color: "var(--colorTextSecondary)",
                fontSize: "0.9rem",
                margin: 0,
              }}
            >
              Proyectos Activos
            </p>
          </div>

          <div
            className="news-slide"
            style={{
              minHeight: "auto",
              padding: "1.5rem",
              textAlign: "center",
              cursor: "default",
            }}
          >
            <div className="news-icon" style={{ margin: "0 auto 1rem auto" }}>
              <RocketOutlined />
            </div>
            <h4
              style={{
                color: "var(--colorTextBase)",
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              15+
            </h4>
            <p
              style={{
                color: "var(--colorTextSecondary)",
                fontSize: "0.9rem",
                margin: 0,
              }}
            >
              Investigadores
            </p>
          </div>

          <div
            className="news-slide"
            style={{
              minHeight: "auto",
              padding: "1.5rem",
              textAlign: "center",
              cursor: "default",
            }}
          >
            <div className="news-icon" style={{ margin: "0 auto 1rem auto" }}>
              <StarOutlined />
            </div>
            <h4
              style={{
                color: "var(--colorTextBase)",
                fontSize: "1.5rem",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              8+
            </h4>
            <p
              style={{
                color: "var(--colorTextSecondary)",
                fontSize: "0.9rem",
                margin: 0,
              }}
            >
              Años de Experiencia
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
