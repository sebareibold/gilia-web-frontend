"use client"

import { useEffect, useState } from "react"
import { useTheme } from "../../../../contexts/ThemeContext"
import { PictureOutlined, EyeOutlined, CameraOutlined, ExpandOutlined, CloseOutlined } from "@ant-design/icons"
import { API_BASE_URL } from "../../../../config/apiConfig"
import Loader from "../../Loader/Loader"

import "./ContenedorGaleria.css"
import { dataService } from "../../../../services/dataService"

const Galery = () => {
  const [gallerySections, setGallerySections] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true)
      try {
        const res = await dataService.getGalleryItems()
        setGallerySections(res.data)
      } catch (err) {
        console.error("Error al obtener la galería:", err)
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

    fetchGallery()
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

  return (
    <div className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container">
        {/* Header Principal */}
        <div className="section-header">
          <div className="section-badge">
            <PictureOutlined />
            Galería Visual
          </div>
          
          <h2 className="section-title">Galería</h2>
          <p className="section-description">
            Explora nuestros espacios de trabajo, eventos, conferencias y proyectos a través de esta colección visual
            que documenta la actividad y el crecimiento de nuestro grupo de investigación.
          </p>
        </div>

        {/* Secciones de Galería */}
        <div className="gallery-sections-container">
          {gallerySections.map((section) => (
            <div key={section.id} className="gallery-section">
              {/* Header de Sección */}
              <div className="gallery-section-header">
                {/* Badge de cantidad de imágenes con estilo del botón explorar */}
                <div className="gallery-count-badge">
                  <CameraOutlined />
                  {section.imagenes?.length || 0} imágenes
                </div>

                {/* Título con gradiente de colores */}
                <h3 className="gallery-section-title">
                  <EyeOutlined />
                  {section.titulo}
                </h3>

                {/* Descripción */}
                {section.descripcion && (
                  <p className="gallery-section-description">
                    {section.descripcion}
                  </p>
                )}
              </div>

              {/* Grid de Imágenes */}
              <div className="gallery-grid">
                {section.imagenes?.map((img, imgIndex) => (
                  <div
                    key={img.id}
                    className="gallery-card"
                    onClick={() => openModal(img, section)}
                    style={{ animationDelay: `${imgIndex * 0.1}s` }}
                  >
                    {/* Línea vertical azul */}
                    <div className="gallery-card-line"></div>

                    {/* Contenedor de imagen */}
                    <div className="gallery-image-container">
                      <img
                        src={img.url.startsWith("http") ? img.url : `${API_BASE_URL}${img.url}`}
                        alt={img.descripcion || `Imagen ${img.id}`}
                        className="gallery-image"
                        loading="lazy"
                      />

                      {/* Ícono de expansión */}
                      <div className="gallery-expand-icon">
                        <ExpandOutlined />
                      </div>
                    </div>

                    {/* Información de la imagen - Solo descripción */}
                    <div className="gallery-card-info">
                      <h4 className="gallery-card-title">
                        {img.descripcion || "Sin descripción"}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {gallerySections.length === 0 && (
          <div className="gallery-empty-state">
            <PictureOutlined />
            <h3>No hay imágenes disponibles</h3>
            <p>Próximamente estaremos agregando más contenido visual</p>
          </div>
        )}

        {/* Modal */}
        {selectedImage && (
          <div className="gallery-modal" onClick={closeModal}>
            <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
              {/* Botón Cerrar */}
              <button className="gallery-modal-close" onClick={closeModal}>
                <CloseOutlined />
              </button>

              {/* Imagen Grande */}
              <img
                src={selectedImage.url.startsWith("http") ? selectedImage.url : `${API_BASE_URL}${selectedImage.url}`}
                alt={selectedImage.descripcion}
                className="gallery-modal-image"
              />

              {/* Información de la Imagen */}
              <div className="gallery-modal-info">
                <div className="gallery-modal-section">
                  {selectedImage.sectionTitle}
                </div>
                <h3 className="gallery-modal-title">
                  {selectedImage.descripcion}
                </h3>
                {selectedImage.fecha && (
                  <div className="gallery-modal-date">
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
    </div>
  )
}

export default Galery
