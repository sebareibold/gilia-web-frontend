"use client"

import { useEffect, useState, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { useTheme } from "../../context/ThemeContext"
import { marked } from "marked"
import Loader from "../Loader/Loader"
import { API_BASE_URL } from "../../config/apiConfig"
import {
  FolderOutlined,
  BookOutlined,
  BankOutlined,
  TeamOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"
import "../shared/FuturisticStyles.css"

const LineaExtensionDetail = () => {
  const { id } = useParams()
  const [linea, setLinea] = useState(null)
  const [showProjects, setShowProjects] = useState(false)
  const projectListRef = useRef(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchLineaExtensionDetail = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/linea-extensions/${id}`)
        if (!response.ok) throw new Error("Error al cargar los datos")
        const data = await response.json()
        setLinea(data.data)
      } catch (error) {
        console.error(error)
        // Mock data para demostración
        setLinea({
          id: Number.parseInt(id),
          nombre: "Tecnología Educativa",
          descripcion: `# Tecnología Educativa

Esta línea de extensión se enfoca en el **desarrollo e implementación de herramientas tecnológicas** para mejorar los procesos de enseñanza-aprendizaje en instituciones educativas de la región.

## Objetivos

- Democratizar el acceso a la tecnología educativa
- Capacitar docentes en el uso de herramientas digitales
- Desarrollar software educativo adaptado a necesidades locales
- Promover la innovación pedagógica mediante la tecnología

## Metodología

Trabajamos con un enfoque participativo que incluye:

1. **Diagnóstico** de necesidades tecnológicas
2. **Diseño colaborativo** de soluciones
3. **Implementación** y capacitación
4. **Seguimiento** y evaluación de impacto`,
          instituciones:
            "Escuela Primaria N°123, Instituto Secundario San Martín, Centro de Formación Profesional, Universidad Nacional",
          proyectos: [
            {
              id: 1,
              nombre: "Plataforma de Gestión Escolar",
              descripcion:
                "Sistema web para la gestión integral de instituciones educativas, incluyendo registro de estudiantes, calificaciones, asistencia y comunicación con padres.",
            },
            {
              id: 2,
              nombre: "Aulas Virtuales Interactivas",
              descripcion:
                "Desarrollo de entornos virtuales de aprendizaje con herramientas de gamificación y evaluación automática.",
            },
            {
              id: 3,
              nombre: "Capacitación Docente Digital",
              descripción:
                "Programa de formación continua para docentes en el uso de tecnologías educativas y metodologías digitales.",
            },
          ],
        })
      }
    }
    fetchLineaExtensionDetail()
  }, [id])

  if (!linea) {
    return (
      <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="futuristic-loading">
          <Loader />
        </div>
      </div>
    )
  }

  const descripcionHTML = marked(linea.descripcion || "")

  const handleToggleProjects = () => {
    const newState = !showProjects
    setShowProjects(newState)

    if (!showProjects) {
      setTimeout(() => {
        if (projectListRef.current) {
          projectListRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }

  return (
    <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div className="futuristic-card" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="futuristic-badge" style={{ marginBottom: "1rem" }}>
            <BankOutlined style={{ marginRight: "0.5rem" }} />
            Línea de Extensión
          </div>

          <h1 className="futuristic-title">{linea.nombre}</h1>
        </div>

        {/* Content */}
        <div className="futuristic-card" style={{ marginBottom: "2rem" }}>
          <div
            style={{
              fontSize: "1rem",
              lineHeight: "1.6",
              color: "var(--colorTextSecondary)",
            }}
            dangerouslySetInnerHTML={{ __html: descripcionHTML }}
          />
        </div>

        {/* Instituciones */}
        {linea.instituciones && (
          <div className="futuristic-card" style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "var(--colorTextBase)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <BankOutlined />
              Escuelas e Instituciones Participantes
            </h2>

            <div className="futuristic-list-item">
              <p style={{ color: "var(--colorTextSecondary)", margin: 0, lineHeight: "1.6" }}>{linea.instituciones}</p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="futuristic-card" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: "600",
              color: "var(--colorTextBase)",
              marginBottom: "1.5rem",
            }}
          >
            Explora más sobre esta línea
          </h2>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            <button onClick={handleToggleProjects} className="futuristic-btn">
              <FolderOutlined />
              Ver proyectos
            </button>

            <Link to="/post" state={{ linea: linea.nombre }} className="futuristic-btn">
              <BookOutlined />
              Ver publicaciones
            </Link>

            <div className="futuristic-btn" style={{ cursor: "default" }}>
              <TeamOutlined />
              Contactar equipo
            </div>
          </div>
        </div>

        {/* Projects List */}
        {showProjects && linea.proyectos?.length > 0 && (
          <div ref={projectListRef} className="futuristic-card">
            <h2
              style={{
                fontSize: "1.3rem",
                fontWeight: "600",
                color: "var(--colorTextBase)",
                marginBottom: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <FolderOutlined />
              Proyectos Activos
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {linea.proyectos.map((proyecto) => (
                <div key={proyecto.id} className="futuristic-list-item">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          color: "var(--colorTextBase)",
                          marginBottom: "0.5rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <CheckCircleOutlined style={{ color: "var(--colorTextSecondary)" }} />
                        {proyecto.nombre}
                      </h3>

                      <p style={{ color: "var(--colorTextSecondary)", margin: 0, lineHeight: "1.5" }}>
                        {proyecto.descripcion}
                      </p>
                    </div>

                    <Link to={`/proyecto/${proyecto.id}`} className="futuristic-btn" style={{ marginLeft: "1rem" }}>
                      Ver detalles
                      <ArrowRightOutlined />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LineaExtensionDetail
