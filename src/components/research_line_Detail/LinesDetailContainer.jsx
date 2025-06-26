"use client"

import { useParams, Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { useTheme } from "../../context/ThemeContext"
import {
  BookOutlined,
  FolderOutlined,
  TeamOutlined,
  ExperimentOutlined,
  ArrowRightOutlined,
  UserOutlined,
} from "@ant-design/icons"
import Loader from "../Loader/Loader"
import { API_BASE_URL } from "../../config/apiConfig"
import { marked } from "marked"
import "../shared/FuturisticStyles.css"

const ListLineasContainer = () => {
  const [linea, setLinea] = useState(null)
  const [showProjects, setShowProjects] = useState(false)
  const [showIntegrants, setShowIntegrants] = useState(false)
  const projectListRef = useRef(null)
  const integrantsListRef = useRef(null)
  const { id } = useParams()
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/linea-investigacions/${id}`)
        const data = await response.json()
        setLinea(data.data)
        console.log("investigacion personas: ", data.data.people[0]?.full_name)
      } catch (error) {
        console.error("Error al obtener la línea de investigación:", error)
        // Mock data para demostración
        setLinea({
          id: Number.parseInt(id),
          nombre: "Procesamiento de Lenguaje Natural",
          descripcion: `# Procesamiento de Lenguaje Natural

El **Procesamiento del Lenguaje Natural (PLN)** es una disciplina dentro de la inteligencia artificial que se dedica a la interacción entre las computadoras y el lenguaje humano.

## Objetivos de Investigación

- Desarrollar algoritmos para el análisis sintáctico y semántico
- Crear modelos de comprensión de texto en español
- Implementar sistemas de traducción automática
- Investigar técnicas de análisis de sentimientos

## Áreas de Trabajo

### Análisis de Texto
Desarrollo de herramientas para el procesamiento automático de documentos, extracción de información y clasificación de textos.

### Modelos de Lenguaje
Investigación en arquitecturas de redes neuronales para la generación y comprensión de texto natural.

### Aplicaciones Prácticas
Implementación de chatbots, sistemas de recomendación y herramientas de análisis de redes sociales.`,
          people: [
            {
              id: 1,
              full_name: "Dr. María García",
              role_person: "Director",
            },
            {
              id: 2,
              full_name: "Lic. Juan Pérez",
              role_person: "Investigador",
            },
            {
              id: 3,
              full_name: "Ing. Ana López",
              role_person: "Colaborador",
            },
            {
              id: 4,
              full_name: "Carlos Rodríguez",
              role_person: "Becario",
            },
          ],
          proyectos: [
            {
              id: 1,
              nombre: "Análisis de Sentimientos en Redes Sociales",
              descripcion:
                "Desarrollo de un sistema para analizar la polaridad emocional en publicaciones de redes sociales utilizando técnicas de aprendizaje automático.",
            },
            {
              id: 2,
              nombre: "Traductor Automático Español-Guaraní",
              descripcion:
                "Creación de un sistema de traducción automática bidireccional entre español y guaraní para preservar y promover lenguas originarias.",
            },
            {
              id: 3,
              nombre: "Chatbot Educativo Inteligente",
              descripcion:
                "Implementación de un asistente virtual para responder consultas académicas utilizando procesamiento de lenguaje natural.",
            },
          ],
        })
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    if (showProjects && projectListRef.current) {
      setTimeout(() => {
        projectListRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }, [showProjects])

  useEffect(() => {
    if (showIntegrants && integrantsListRef.current) {
      setTimeout(() => {
        integrantsListRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }, 100)
    }
  }, [showIntegrants])

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
    if (newState) setShowIntegrants(false)
  }

  const handleToggleIntegrants = () => {
    const newState = !showIntegrants
    setShowIntegrants(newState)
    if (newState) setShowProjects(false)
  }

  return (
    <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div className="futuristic-card" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="futuristic-badge" style={{ marginBottom: "1rem" }}>
            <ExperimentOutlined style={{ marginRight: "0.5rem" }} />
            Línea de Investigación
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

            <button onClick={handleToggleIntegrants} className="futuristic-btn">
              <TeamOutlined />
              Ver integrantes
            </button>
          </div>
        </div>

        {/* Projects List */}
        {showProjects && linea.proyectos?.length > 0 && (
          <div ref={projectListRef} className="futuristic-card" style={{ marginBottom: "2rem" }}>
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
              Proyectos de Investigación
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
                        }}
                      >
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

        {/* Integrants List */}
        {showIntegrants && linea.people?.length > 0 && (
          <div ref={integrantsListRef} className="futuristic-card">
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
              <TeamOutlined />
              Integrantes del Equipo
            </h2>

            <div className="futuristic-grid futuristic-grid-2">
              {linea.people.map((integrante) => (
                <div key={integrante.id} className="futuristic-list-item">
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "rgba(255, 255, 255, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <UserOutlined style={{ fontSize: "1.5rem", color: "var(--colorTextSecondary)" }} />
                    </div>

                    <div>
                      <h3
                        style={{
                          fontSize: "1rem",
                          fontWeight: "600",
                          color: "var(--colorTextBase)",
                          marginBottom: "0.2rem",
                        }}
                      >
                        {integrante.full_name}
                      </h3>

                      <div className="futuristic-badge" style={{ fontSize: "0.65rem" }}>
                        {integrante.role_person}
                      </div>
                    </div>
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

export default ListLineasContainer
