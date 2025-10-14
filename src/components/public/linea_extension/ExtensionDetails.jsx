"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"
import { marked } from "marked"
import { dataService } from "/src/services/dataService.js";
import { FolderOutlined, BankOutlined, BranchesOutlined } from "@ant-design/icons"
import SimpleCarousel from "../DetallesLineaDeInvestigación/SimpleCarousel"

const LineaExtensionDetail = () => {
  const { id } = useParams()
  const [linea, setLinea] = useState(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchLineaExtensionDetail = async () => {
      try {
                const response = await dataService.getLineaExtensionById(id);
        setLinea(response.data);
      } catch (error) {
        console.error("Error fetching extension line details:", error);
        setLinea(null);
      }
    };
    fetchLineaExtensionDetail()
  }, [id])

  if (!linea) {
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

  const descripcionHTML = marked(linea.descripcion || "")

  // Render para cada proyecto (igual que en detalles de investigación)
  const renderProyecto = (proyecto) => {
    const nombre = proyecto.nombre || proyecto.title || "Proyecto sin nombre"
    const descripcion = proyecto.descripcion || proyecto.description || "Sin descripción disponible"
    // Truncar la descripción a 20 palabras
    const palabras = descripcion.split(" ")
    const descripcionCorta = palabras.length > 20 ? palabras.slice(0, 20).join(" ") + " ..." : descripcion
    return (
      <div className="news-card" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "flex-start", padding: 20, minWidth: 320, maxWidth: 370, margin: "0 auto" }}>
        <div className="news-image-container" style={{ marginBottom: 14 }}>
          <img src="/placeholder.svg?height=200&width=350" alt={nombre} className="news-image" />
          <div className="news-image-overlay" />
        </div>
        <div className="news-content" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <h3 className="news-title" style={{ fontSize: "1rem", marginBottom: 8, fontWeight: 700 }}>{nombre}</h3>
          <p className="news-description" style={{ fontSize: "0.95rem", color: "#bdbdbd", marginBottom: 0 }}>{descripcionCorta}</p>
          <div className="news-actions" style={{ marginTop: 16 }}>
            <Link to={`/projects/${proyecto.id}`} className="news-btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
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
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <BranchesOutlined />
            <span>Línea de Extensión</span>
          </div>
          <h2 className="section-title">{linea.titulo}</h2>
          <p className="section-description">
            Conoce los detalles de esta línea de extensión, sus objetivos, metodología y el impacto que genera en la comunidad.
          </p>
        </div>
        {/* Descripción */}
        <div className="carousel-container" style={{ marginBottom: "2rem" }}>
          <div
            style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--color-text-secondary)" }}
            dangerouslySetInnerHTML={{ __html: descripcionHTML }}
          />
        </div>
        {/* Instituciones */}
        {linea.instituciones && (
          <div className="carousel-container" style={{ marginBottom: "2rem" }}>
            <h3 className="section-title" style={{ textAlign: "center", margin: "32px 0 24px 0", fontSize: "1.35rem", padding: "0.5em 0" }}>
              <BankOutlined style={{ marginRight: 8 }} />Escuelas e Instituciones Participantes
            </h3>
            <div className="news-card">
              <div className="news-content">
                <p style={{ color: "var(--color-text-secondary)", margin: 0, lineHeight: "1.6", textAlign: "center" }}>
                  {linea.instituciones}
                </p>
              </div>
            </div>
          </div>
        )}
        {/* Proyectos */}
        {linea.proyectos && linea.proyectos.length > 0 && (
          <div className="multi-card-carousel">
            <div className="carousel-container">
              <h3 className="section-title" style={{ textAlign: "center", margin: "32px 0 24px 0", fontSize: "2rem", padding: "0.5em 0" }}>
                <FolderOutlined style={{ marginRight: 8 }} />Proyectos
              </h3>
              <SimpleCarousel items={linea.proyectos} renderItem={renderProyecto} itemsPerPage={3} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default LineaExtensionDetail
