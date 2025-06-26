"use client"

import { useEffect, useState } from "react"
import { useTheme } from "../../../context/ThemeContext"
import { PictureOutlined, EyeOutlined } from "@ant-design/icons"
import { API_BASE_URL } from "../../../config/apiConfig"
import SeccionGalery from "../SeccionGalery/SeccionGalery"
import Loader from "../../Loader/Loader"
import "../../shared/FuturisticStyles.css"

const Galery = () => {
  const [gallerySections, setGallerySections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        console.log(`${API_BASE_URL}/api/galerias`)

        const response = await fetch(`${API_BASE_URL}/api/galerias`)
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status} ${response.statusText}`)
        }
        const data = await response.json()
        console.log("Datos de la galería obtenidos:", data)
        setGallerySections(data)
      } catch (error) {
        console.error("Error al cargar galería:", error)
        // Mock data para demostración
        setGallerySections([
          {
            id: 1,
            titulo: "Conferencias y Eventos",
            imagenes: [
              {
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Conferencia Internacional de IA 2024",
              },
              {
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Workshop de Procesamiento de Lenguaje Natural",
              },
              {
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Seminario de Ética en Computación",
              },
              {
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Presentación de Proyectos de Investigación",
              },
            ],
          },
          {
            id: 2,
            titulo: "Laboratorios y Espacios de Trabajo",
            imagenes: [
              {
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Laboratorio de Inteligencia Artificial",
              },
              {
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Sala de Servidores y Computación",
              },
              {
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Espacio de Trabajo Colaborativo",
              },
              {
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Área de Desarrollo de Software",
              },
            ],
          },
          {
            id: 3,
            titulo: "Proyectos y Demostraciones",
            imagenes: [
              {
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Demo de Sistema de Reconocimiento de Voz",
              },
              {
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Prototipo de Robot Educativo",
              },
              {
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Interfaz de Sistema de Recomendación",
              },
              {
                url: "/placeholder.svg?height=400&width=600",
                descripcion: "Visualización de Datos de Investigación",
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

  if (loading) {
    return (
      <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="futuristic-loading">
          <Loader />
        </div>
      </div>
    )
  }

  return (
    <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div className="futuristic-card" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="futuristic-badge" style={{ marginBottom: "1rem" }}>
            <PictureOutlined style={{ marginRight: "0.5rem" }} />
            Galería Visual
          </div>

          <h1 className="futuristic-title">Galería de Imágenes</h1>

          <p className="futuristic-subtitle">
            Explora nuestros espacios de trabajo, eventos, conferencias y proyectos a través de esta colección visual
            que documenta la actividad y el crecimiento de nuestro grupo de investigación.
          </p>
        </div>

        {/* Stats */}
        <div className="futuristic-card" style={{ marginBottom: "2rem" }}>
          <div className="futuristic-grid futuristic-grid-4">
            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "600", color: "var(--colorTextBase)" }}>
                {gallerySections.length}
              </div>
              <div style={{ color: "var(--colorTextSecondary)", fontSize: "0.9rem" }}>Secciones</div>
            </div>

            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "600", color: "var(--colorTextBase)" }}>
                {gallerySections.reduce((total, section) => total + (section.imagenes?.length || 0), 0)}
              </div>
              <div style={{ color: "var(--colorTextSecondary)", fontSize: "0.9rem" }}>Imágenes</div>
            </div>

            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "600", color: "var(--colorTextBase)" }}>50+</div>
              <div style={{ color: "var(--colorTextSecondary)", fontSize: "0.9rem" }}>Eventos</div>
            </div>

            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "600", color: "var(--colorTextBase)" }}>5</div>
              <div style={{ color: "var(--colorTextSecondary)", fontSize: "0.9rem" }}>Años</div>
            </div>
          </div>
        </div>

        {/* Gallery Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {gallerySections.map((section) => (
            <div key={section.id} className="futuristic-card">
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "var(--colorTextBase)",
                  marginBottom: "1.5rem",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <EyeOutlined />
                {section.titulo}
              </h2>

              <SeccionGalery section={section} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Galery
