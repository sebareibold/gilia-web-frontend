"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext"
import { BranchesOutlined, ArrowRightOutlined } from "@ant-design/icons"
import { API_BASE_URL } from "../../config/apiConfig"
import Loader from "../Loader/Loader"
import "../shared/FuturisticStyles.css"

const LineaExtensionList = () => {
  const [lineas, setLineas] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchLineasExtension = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/linea-extensions/`)
        if (!response.ok) throw new Error("Error al cargar los datos")
        const data = await response.json()
        setLineas(data.data || [])
      } catch (error) {
        console.error(error)
        // Mock data para demostración
        setLineas([
          {
            id: 1,
            nombre: "Tecnología Educativa",
            descripcion:
              "Desarrollo de herramientas tecnológicas para mejorar los procesos de enseñanza-aprendizaje en instituciones educativas.",
            imagen: { url: "/placeholder.svg?height=200&width=300" },
          },
          {
            id: 2,
            nombre: "Sistemas de Información Comunitarios",
            descripcion: "Implementación de sistemas de información para organizaciones comunitarias y ONGs locales.",
            imagen: { url: "/placeholder.svg?height=200&width=300" },
          },
          {
            id: 3,
            nombre: "Inclusión Digital",
            descripcion:
              "Programas de capacitación en tecnologías digitales para adultos mayores y sectores vulnerables.",
            imagen: { url: "/placeholder.svg?height=200&width=300" },
          },
          {
            id: 4,
            nombre: "Desarrollo de Software Libre",
            descripcion:
              "Creación y mantenimiento de software libre para instituciones públicas y organizaciones sin fines de lucro.",
            imagen: { url: "/placeholder.svg?height=200&width=300" },
          },
        ])
      } finally {
        setLoading(false)
      }
    }
    fetchLineasExtension()
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
            <BranchesOutlined style={{ marginRight: "0.5rem" }} />
            Extensión Universitaria
          </div>

          <h1 className="futuristic-title">Líneas de Extensión</h1>

          <p className="futuristic-subtitle">
            Proyectos que conectan la universidad con la comunidad, aplicando conocimientos de ciencias de la
            computación para resolver problemas sociales y promover el desarrollo tecnológico inclusivo.
          </p>
        </div>

        {/* Grid de líneas */}
        <div className="futuristic-grid futuristic-grid-3">
          {lineas.map((linea) => (
            <div key={linea.id} className="futuristic-card" style={{ height: "100%" }}>
              {linea.imagen?.url && (
                <div style={{ marginBottom: "1rem" }}>
                  <img
                    src={`${API_BASE_URL}${linea.imagen.url}`}
                    alt={linea.nombre}
                    style={{
                      width: "100%",
                      height: "180px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    color: "var(--colorTextBase)",
                    marginBottom: "0.5rem",
                    lineHeight: "1.3",
                  }}
                >
                  {linea.nombre}
                </h3>

                <p
                  style={{
                    color: "var(--colorTextSecondary)",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    marginBottom: "1.5rem",
                    flex: 1,
                  }}
                >
                  {linea.descripcion.length > 150 ? `${linea.descripcion.slice(0, 150)}...` : linea.descripcion}
                </p>

                <Link
                  to={`/linea-extension/${linea.id}`}
                  className="futuristic-btn"
                  style={{ alignSelf: "flex-start" }}
                >
                  Ver más
                  <ArrowRightOutlined />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="futuristic-card" style={{ marginTop: "2rem", textAlign: "center" }}>
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: "600",
              color: "var(--colorTextBase)",
              marginBottom: "1.5rem",
            }}
          >
            Impacto de Nuestras Líneas de Extensión
          </h2>

          <div className="futuristic-grid futuristic-grid-4">
            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "600", color: "var(--colorTextBase)" }}>25+</div>
              <div style={{ color: "var(--colorTextSecondary)", fontSize: "0.9rem" }}>Proyectos Activos</div>
            </div>

            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "600", color: "var(--colorTextBase)" }}>500+</div>
              <div style={{ color: "var(--colorTextSecondary)", fontSize: "0.9rem" }}>Beneficiarios</div>
            </div>

            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "600", color: "var(--colorTextBase)" }}>15</div>
              <div style={{ color: "var(--colorTextSecondary)", fontSize: "0.9rem" }}>Instituciones</div>
            </div>

            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "600", color: "var(--colorTextBase)" }}>8</div>
              <div style={{ color: "var(--colorTextSecondary)", fontSize: "0.9rem" }}>Años de Experiencia</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LineaExtensionList
