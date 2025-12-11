"use client"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useTheme } from "../../../contexts/ThemeContext"
import { ProjectOutlined, CalendarOutlined, TeamOutlined, TagOutlined } from "@ant-design/icons"
import { marked } from "marked"
import Loader from "../common/Loader/Loader"
import "../../../styles/FuturisticStyles.css"
import { getProjectById } from "../../../services"

const ProyectoDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // Nombre del método de servicios utilizado desde services/index.js
  const PROJECT_SERVICE_METHOD = "getProjectById"

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getProjectById(id)
        setProject(res.data)
      } catch (err) {
        setError("Error al obtener el proyecto")
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProject()
  }, [id])

  if (!project) {
    return (
      <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="futuristic-loading">
          <Loader />
        </div>
      </div>
    )
  }

  const descripcionHTML = marked(project.description || project.descripcion || "")

  return (
    <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div className="futuristic-card" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="futuristic-badge" style={{ marginBottom: "1rem" }}>
            <ProjectOutlined style={{ marginRight: "0.5rem" }} />
            Proyecto de Investigación
          </div>

          <h1 className="futuristic-title">{project.title || project.nombre}</h1>
        </div>

        {/* Project Info */}
        <div className="futuristic-card" style={{ marginBottom: "2rem" }}>
          <div className="futuristic-grid futuristic-grid-4">
            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <CalendarOutlined
                style={{ fontSize: "1.5rem", color: "var(--colorTextSecondary)", marginBottom: "0.5rem" }}
              />
              <div style={{ fontSize: "0.9rem", color: "var(--colorTextBase)", fontWeight: "600" }}>Inicio</div>
              <div style={{ fontSize: "0.8rem", color: "var(--colorTextSecondary)" }}>
                {project.startDate || project.fechaInicio || "Marzo 2024"}
              </div>
            </div>

            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <CalendarOutlined
                style={{ fontSize: "1.5rem", color: "var(--colorTextSecondary)", marginBottom: "0.5rem" }}
              />
              <div style={{ fontSize: "0.9rem", color: "var(--colorTextBase)", fontWeight: "600" }}>Finalización</div>
              <div style={{ fontSize: "0.8rem", color: "var(--colorTextSecondary)" }}>
                {project.endDate || project.fechaFin || "Agosto 2025"}
              </div>
            </div>

            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <TeamOutlined
                style={{ fontSize: "1.5rem", color: "var(--colorTextSecondary)", marginBottom: "0.5rem" }}
              />
              <div style={{ fontSize: "0.9rem", color: "var(--colorTextBase)", fontWeight: "600" }}>Responsable</div>
              <div style={{ fontSize: "0.8rem", color: "var(--colorTextSecondary)" }}>
                {project.responsable || project.owner || "Dr. María García"}
              </div>
            </div>

            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <TagOutlined style={{ fontSize: "1.5rem", color: "var(--colorTextSecondary)", marginBottom: "0.5rem" }} />
              <div style={{ fontSize: "0.9rem", color: "var(--colorTextBase)", fontWeight: "600" }}>Estado</div>
              <div className="futuristic-badge" style={{ fontSize: "0.65rem" }}>
                {project.status || project.estado || "En Progreso"}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="futuristic-card">
          <div
            style={{
              fontSize: "1rem",
              lineHeight: "1.7",
              color: "var(--colorTextSecondary)",
            }}
            dangerouslySetInnerHTML={{ __html: descripcionHTML }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProyectoDetail
