"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"
import { marked } from "marked"
import { getExtensionLineById } from "../../../services"
import { FolderOutlined, BankOutlined, BranchesOutlined } from "@ant-design/icons"
import SimpleCarousel from "../ResearchLineDetails/SimpleCarousel"

import "./ExtensionDetails.css"

const LineaExtensionDetail = () => {
  const { id } = useParams()
  const [extensionLine, setExtensionLine] = useState(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"
  // Nombre del método de servicios utilizado desde services/index.js
  const EXTENSION_LINE_SERVICE_METHOD = "getExtensionLineById"

  useEffect(() => {
    const fetchExtensionLineDetail = async () => {
      try {
        const response = await getExtensionLineById(id)
        // response shape expected: { data: { ... } }
        setExtensionLine(response.data)
      } catch (error) {
        console.error("Error fetching extension line details:", error)
        setExtensionLine(null)
      }
    }
    fetchExtensionLineDetail()
  }, [id])

  if (!extensionLine) {
    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="carousel-loading">
            <div className="loading-spinner" />
            <span className="loading-text">Cargando línea de extensión...</span>
          </div>
        </div>
      </section>
    )
  }

  const descriptionHTML = marked(extensionLine.description || extensionLine.descripcion || "")

  // Render para cada proyecto (igual que en detalles de investigación)
  const renderProject = (project) => {
    const name = project.title || project.nombre || "Proyecto sin nombre"
    const description = project.description || project.descripcion || "Sin descripción disponible"
    // Truncar la descripción a 20 palabras
    const palabras = description.split(" ")
    const descripcionCorta = palabras.length > 20 ? palabras.slice(0, 20).join(" ") + " ..." : description
    return (
      <div className="news-card" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "flex-start", padding: 20, minWidth: 320, maxWidth: 370, margin: "0 auto" }}>
        <div className="news-image-container" style={{ marginBottom: 14 }}>
          <img src="/placeholder.svg?height=200&width=350" alt={name} className="news-image" />
          <div className="news-image-overlay" />
        </div>
        <div className="news-content" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <h3 className="news-title" style={{ fontSize: "1rem", marginBottom: 8, fontWeight: 700 }}>{name}</h3>
          <p className="news-description" style={{ fontSize: "0.95rem", color: "#bdbdbd", marginBottom: 0 }}>{descripcionCorta}</p>
          <div className="news-actions" style={{ marginTop: 16 }}>
            <Link to={`/projects/${project.id}`} className="news-btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <span>Ver proyecto</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container" style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Full Screen Hero Section */}
        <div className="extension-hero">
          {/* Header */}
          <div className="section-header">
            <div className="section-badge">
              <BranchesOutlined />
              <span>Línea de Extensión</span>
            </div>
            <h2 className="section-title">{extensionLine.title || extensionLine.titulo}</h2>
            <p className="section-description">
              Conoce los detalles de esta línea de extensión, sus objetivos, metodología y el impacto que genera en la comunidad.
            </p>
          </div>
          {/* Descripción */}
          <div className="carousel-container extension-description-content" style={{ marginBottom: "2rem" }}>
            <div
              style={{ fontSize: "1.1rem", lineHeight: "1.8", color: "var(--color-text-secondary)" }}
              dangerouslySetInnerHTML={{ __html: descriptionHTML }}
            />
          </div>
        </div>
        {/* Instituciones */}
        {extensionLine.institutions || extensionLine.instituciones ? (
          <div className="carousel-container" style={{ marginBottom: "2rem" }}>
            <h3 className="section-title" style={{ textAlign: "center", margin: "32px 0 24px 0", fontSize: "1.35rem", padding: "0.5em 0" }}>
              <BankOutlined style={{ marginRight: 8 }} />Escuelas e Instituciones Participantes
            </h3>
            <div className="news-card">
              <div className="news-content">
                <p style={{ color: "var(--color-text-secondary)", margin: 0, lineHeight: "1.6", textAlign: "center" }}>
                  {extensionLine.institutions || extensionLine.instituciones}
                </p>
              </div>
            </div>
          </div>
        ) : null}
        {/* Proyectos */}
        {extensionLine.projects && extensionLine.projects.length > 0 && (
          <div className="multi-card-carousel">
            <div className="carousel-container">
              <h3 className="section-title" style={{ textAlign: "center", margin: "32px 0 24px 0", fontSize: "2rem", padding: "0.5em 0" }}>
                <FolderOutlined style={{ marginRight: 8 }} />Proyectos
              </h3>
              <SimpleCarousel items={extensionLine.projects} renderItem={renderProject} itemsPerPage={3} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default LineaExtensionDetail
