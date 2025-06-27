"use client"

import { useEffect, useState } from "react"
import { useTheme } from "../../../contexts/ThemeContext"
import { PictureOutlined, EyeOutlined, CameraOutlined, ExpandOutlined, CloseOutlined } from "@ant-design/icons"
import { API_BASE_URL } from "../../../config/apiConfig"
import Loader from "../../Loader/Loader"
import "../../shared/FuturisticStyles.css"
import "../../Home/HomeExploration/HomeExploration.css"

const Galery = () => {
  const [gallerySections, setGallerySections] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${API_BASE_URL}/api/galerias`)
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        setGallerySections(data)
      } catch (error) {
        console.error("Error al cargar galería:", error)
        // Mock data con imágenes de diferentes resoluciones
        setGallerySections([
          {
            id: 1,
            titulo: "Conferencias y Eventos",
            descripcion: "Momentos destacados de nuestras conferencias internacionales y eventos académicos",
            imagenes: [
              {
                id: 1,
                url: "/placeholder.svg?height=600&width=800",
                descripcion: "Conferencia Internacional de IA 2024 - Auditorio Principal",
                fecha: "2024-03-15",
              },
              {
                id: 2,
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Workshop de Procesamiento de Lenguaje Natural",
                fecha: "2024-02-20",
              },
              {
                id: 3,
                url: "/placeholder.svg?height=800&width=600",
                descripcion: "Seminario de Ética en Computación - Mesa Redonda",
                fecha: "2024-01-10",
              },
              {
                id: 4,
                url: "/placeholder.svg?height=500&width=700",
                descripcion: "Presentación de Proyectos de Investigación",
                fecha: "2024-04-05",
              },
              {
                id: 5,
                url: "/placeholder.svg?height=300&width=500",
                descripcion: "Networking Session - Coffee Break",
                fecha: "2024-03-16",
              },
              {
                id: 6,
                url: "/placeholder.svg?height=700&width=500",
                descripcion: "Poster Session - Estudiantes de Doctorado",
                fecha: "2024-03-17",
              },
            ],
          },
          {
            id: 2,
            titulo: "Laboratorios y Espacios de Trabajo",
            descripcion: "Nuestras instalaciones y espacios donde desarrollamos la investigación",
            imagenes: [
              {
                id: 7,
                url: "/placeholder.svg?height=600&width=900",
                descripcion: "Laboratorio de Inteligencia Artificial - Vista General",
                fecha: "2024-01-15",
              },
              {
                id: 8,
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Sala de Servidores y Computación de Alto Rendimiento",
                fecha: "2024-01-20",
              },
              {
                id: 9,
                url: "/placeholder.svg?height=500&width=800",
                descripcion: "Espacio de Trabajo Colaborativo - Área de Reuniones",
                fecha: "2024-02-01",
              },
              {
                id: 10,
                url: "/placeholder.svg?height=350&width=550",
                descripcion: "Área de Desarrollo de Software",
                fecha: "2024-02-10",
              },
              {
                id: 11,
                url: "/placeholder.svg?height=450&width=600",
                descripcion: "Laboratorio de Robótica",
                fecha: "2024-02-15",
              },
            ],
          },
          {
            id: 3,
            titulo: "Proyectos y Demostraciones",
            descripcion: "Prototipos y demostraciones de nuestros proyectos de investigación",
            imagenes: [
              {
                id: 12,
                url: "/placeholder.svg?height=500&width=700",
                descripcion: "Demo de Sistema de Reconocimiento de Voz",
                fecha: "2024-03-01",
              },
              {
                id: 13,
                url: "/placeholder.svg?height=600&width=400",
                descripcion: "Prototipo de Robot Educativo - NAO",
                fecha: "2024-03-05",
              },
              {
                id: 14,
                url: "/placeholder.svg?height=400&width=800",
                descripcion: "Interfaz de Sistema de Recomendación",
                fecha: "2024-03-10",
              },
              {
                id: 15,
                url: "/placeholder.svg?height=550&width=650",
                descripcion: "Visualización de Datos de Investigación",
                fecha: "2024-03-12",
              },
            ],
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const openModal = (image, section) => {
    setSelectedImage({ ...image, sectionTitle: section.titulo })
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  if (loading) {
    return (
      <div className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <Loader />
        </div>
      </div>
    )
  }

  const totalImages = gallerySections.reduce((total, section) => total + (section.imagenes?.length || 0), 0)

  return (
    <div className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container">


         {/* Header */}
        <div className="section-header">
          
          <h2 className="section-title">Galería</h2>
          <p className="section-description">
  Explora nuestros espacios de trabajo, eventos, conferencias y proyectos a través de esta colección visual
            que documenta la actividad y el crecimiento de nuestro grupo de investigación.
          </p>
        </div>

  

        {/* Secciones de Galería */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {gallerySections.map((section) => (
            <div key={section.id}>
              {/* Subtítulo de Sección */}
              <div style={{ marginBottom: "2rem", textAlign: "center" }}>
                <div
                  style={{
                    display: "inline-block",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "1rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    marginBottom: "1rem",
                  }}
                >
                  <CameraOutlined style={{ marginRight: "0.5rem" }} />
                  {section.imagenes?.length || 0} imágenes
                </div>

                <h2
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: "600",
                    color: "var(--colorTextBase)",
                    marginBottom: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  <EyeOutlined />
                  {section.titulo}
                </h2>

                {section.descripcion && (
                  <p
                    style={{
                      color: "var(--colorTextSecondary)",
                      fontSize: "1rem",
                      maxWidth: "700px",
                      margin: "0 auto",
                      lineHeight: "1.6",
                    }}
                  >
                    {section.descripcion}
                  </p>
                )}
              </div>

              {/* Grid de Imágenes */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                {section.imagenes?.map((img) => (
                  <div
                    key={img.id}
                    className="news-card"
                    style={{
                      position: "relative",
                      cursor: "pointer",
                      overflow: "hidden",
                      padding: "0",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => openModal(img, section)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-8px)"
                      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    {/* Imagen */}
                    <div style={{ position: "relative", height: "250px", overflow: "hidden" }}>
                      <img
                        src={img.url.startsWith("http") ? img.url : `${API_BASE_URL}${img.url}`}
                        alt={img.descripcion || `Imagen ${img.id}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                        loading="lazy"
                        onMouseEnter={(e) => {
                          e.target.style.transform = "scale(1.05)"
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = "scale(1)"
                        }}
                      />

                      {/* Overlay con ícono */}
                      <div
                        style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          backgroundColor: "rgba(0, 0, 0, 0.6)",
                          borderRadius: "50%",
                          padding: "0.5rem",
                          backdropFilter: "blur(10px)",
                          opacity: 0,
                          transition: "opacity 0.3s ease",
                        }}
                        className="expand-icon"
                      >
                        <ExpandOutlined style={{ color: "white", fontSize: "1rem" }} />
                      </div>
                    </div>

                    {/* Información */}
                    <div style={{ padding: "1.5rem" }}>
                      <h3
                        style={{
                          color: "var(--colorTextBase)",
                          fontSize: "1rem",
                          fontWeight: "600",
                          marginBottom: "0.5rem",
                          lineHeight: "1.4",
                        }}
                      >
                        {img.descripcion}
                      </h3>
                      {img.fecha && (
                        <div
                          style={{
                            fontSize: "0.85rem",
                            color: "var(--colorTextSecondary)",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem",
                          }}
                        >
                          <CameraOutlined />
                          {new Date(img.fecha).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {gallerySections.length === 0 && (
          <div className="news-card" style={{ textAlign: "center", padding: "3rem" }}>
            <PictureOutlined style={{ fontSize: "3rem", color: "var(--colorTextSecondary)", marginBottom: "1rem" }} />
            <h3 style={{ color: "var(--colorTextBase)", marginBottom: "0.5rem" }}>No hay imágenes disponibles</h3>
            <p style={{ color: "var(--colorTextSecondary)" }}>Próximamente estaremos agregando más contenido visual</p>
          </div>
        )}

        {/* Modal Simple */}
        {selectedImage && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: "2rem",
            }}
            onClick={closeModal}
          >
            <div
              style={{
                position: "relative",
                maxWidth: "90vw",
                maxHeight: "90vh",
                backgroundColor: "var(--colorBgContainer)",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.5)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón Cerrar */}
              <button
                onClick={closeModal}
                style={{
                  position: "absolute",
                  top: "1rem",
                  right: "1rem",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  border: "none",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 1001,
                  backdropFilter: "blur(10px)",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(0, 0, 0, 0.9)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "rgba(0, 0, 0, 0.7)"
                }}
              >
                <CloseOutlined style={{ color: "white", fontSize: "1.2rem" }} />
              </button>

              {/* Imagen Grande */}
              <img
                src={selectedImage.url.startsWith("http") ? selectedImage.url : `${API_BASE_URL}${selectedImage.url}`}
                alt={selectedImage.descripcion}
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "70vh",
                  objectFit: "contain",
                }}
              />

              {/* Información de la Imagen */}
              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "#3b82f6",
                    marginBottom: "0.5rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {selectedImage.sectionTitle}
                </div>
                <h3
                  style={{
                    color: "var(--colorTextBase)",
                    marginBottom: "0.5rem",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    lineHeight: "1.4",
                  }}
                >
                  {selectedImage.descripcion}
                </h3>
                {selectedImage.fecha && (
                  <div
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--colorTextSecondary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <CameraOutlined />
                    {new Date(selectedImage.fecha).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .news-card:hover .expand-icon {
          opacity: 1;
        }

        @media (max-width: 768px) {
          .exploration-container {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Galery
