"use client"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useTheme } from "../../../contexts/ThemeContext"
import { dataService } from "/src/services/dataService.js";
import { marked } from "marked"
import SimpleCarousel from "./SimpleCarousel"
import { UserOutlined, ArrowRightOutlined, ShareAltOutlined, CalendarOutlined } from "@ant-design/icons"

const DetallesLineaDeInvestigacion = () => {
  const [linea, setLinea] = useState(null)
  const [proyectos, setProyectos] = useState([])
  const [publicaciones, setPublicaciones] = useState([])
  const { id } = useParams()
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchData = async () => {
      try {
                const response = await dataService.getLineaInvestigacionById(id);
        setLinea(response.data)
        setProyectos(response.data.proyectos || [])
        setPublicaciones(response.data.publicaciones || [])
      } catch {
        setLinea(null)
      }
    }
    fetchData()
  }, [id])

  if (!linea) {
    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="carousel-loading">
            <div className="loading-spinner" />
            <span className="loading-text">Cargando línea de investigación...</span>
          </div>
        </div>
      </section>
    )
  }

  const descripcionHTML = marked(linea.descripcion || "")

  // Render para cada proyecto
  const renderProyecto = (proyecto) => (
    <div className="news-card" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "flex-start", padding: 24 }}>
      <div className="news-image-container" style={{ marginBottom: 18 }}>
        <img src="/placeholder.svg?height=200&width=350" alt={proyecto.nombre} className="news-image" />
        <div className="news-image-overlay" />
      </div>
      <div className="news-content" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <h3 className="news-title" style={{ fontSize: "1.1rem", marginBottom: 8, fontWeight: 700 }}>{proyecto.nombre}</h3>
        <p className="news-description" style={{ fontSize: "0.98rem", color: "#bdbdbd", marginBottom: 0 }}>{proyecto.descripcion}</p>
      </div>
    </div>
  )

  // Render para cada publicación
  const renderPublicacion = (pub) => (
    <div className="news-card" style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "flex-start", padding: 36, minWidth: 380, maxWidth: 500, margin: "0 auto" }}>
      <div className="news-content" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div className="news-meta" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span className="news-category" style={{ background: "#2196F3", color: "white", alignSelf: "flex-start", fontSize: "0.8rem", borderRadius: 8, padding: "2px 12px" }}>{pub.tipo}</span>
          <div className="news-views" style={{ display: "flex", alignItems: "center", gap: 4, background: "#e3e9f7", color: "#1a237e", borderRadius: 8, padding: "2px 12px", fontWeight: 700, fontSize: 15, boxShadow: "0 1px 4px #0001" }}>
            <CalendarOutlined style={{ fontSize: 16, marginRight: 4 }} />
            <span>{pub.anio}</span>
          </div>
        </div>
        <h3 className="news-title" style={{ fontSize: "1.1rem", marginBottom: 8, fontWeight: 700 }}>{pub.titulo}</h3>
        <div className="news-meta" style={{ fontSize: "0.92rem", color: "var(--color-text-secondary)", marginBottom: 8, fontWeight: 500 }}>
          <div dangerouslySetInnerHTML={{ __html: pub.autores }} />
        </div>
        {pub.publicacion && (
          <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: 8, fontStyle: "italic" }}>
            Publicado en: {pub.publicacion}
          </div>
        )}
        <div className="news-description" style={{ fontSize: "0.98rem", color: "#bdbdbd", marginBottom: 0 }}>
          <div dangerouslySetInnerHTML={{ __html: pub.resumen }} />
        </div>
        <div className="news-actions" style={{ marginTop: 18, display: "flex", gap: 12, alignItems: "center" }}>
          {pub.enlace ? (
            <a href={pub.enlace} target="_blank" rel="noopener noreferrer" className="news-btn-primary" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontWeight: 600, fontSize: 13 }}>
              <span>Ver publicación</span>
              <ArrowRightOutlined />
            </a>
          ) : (
            <div className="news-btn-primary" style={{ opacity: 0.5, cursor: "not-allowed", flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontWeight: 600, fontSize: 16 }}>
              <span>No disponible</span>
            </div>
          )}
          <button className="news-btn-secondary" aria-label="Compartir publicación" style={{ padding: 10, borderRadius: 8, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShareAltOutlined />
          </button>
        </div>
      </div>
    </div>
  )

  // Render para cada integrante
  const renderIntegrante = (integrante) => (
    <div className="news-card" style={{ minWidth: 220, display: "flex", flexDirection: "column", alignItems: "center", padding: 24 }}>
      <div className="news-image-container" style={{ marginBottom: 14, width: "100%" }}>
        <img
          src={integrante.photo?.[0]?.url || "/placeholder.svg?height=200&width=300"}
          alt={`${integrante.nombre} ${integrante.apellido}`}
          className="news-image"
        />
        <div className="news-image-overlay">
          <UserOutlined />
        </div>
      </div>
      <div className="news-content" style={{ width: "100%", textAlign: "center" }}>
        <span className="news-category" style={{ background: "#4CAF50", color: "white", marginBottom: 8, fontSize: "0.95rem", borderRadius: 8, padding: "2px 12px", display: "inline-block" }}>{integrante.especialidad}</span>
        <h3 className="news-title" style={{ fontSize: "1.1rem", marginBottom: 8, fontWeight: 700 }}>{`${integrante.nombre} ${integrante.apellido}`}</h3>
        <p className="news-description" style={{ fontSize: "0.98rem", color: "#bdbdbd", marginBottom: 0 }}>{integrante.lugarDeTrabajo || "Miembro del equipo de investigación."}</p>
      </div>
    </div>
  )

  return (
    <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container" style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Título */}
        <div className="section-header">
          <h2 className="section-title">{linea.titulo}</h2>
        </div>
        {/* Descripción */}
        <div className="carousel-container" style={{ marginBottom: "2rem" }}>
          <div
            style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--color-text-secondary)" }}
            dangerouslySetInnerHTML={{ __html: descripcionHTML }}
          />
        </div>

        {/* Publicaciones */}
        {publicaciones.length > 0 && (
          <div className="multi-card-carousel">
            <div className="carousel-container">
              <h3 className="section-title" style={{ textAlign: "center", margin: "32px 0 24px 0", fontSize: "2rem", padding: "0.5em 0" }}>Publicaciones</h3>
              <SimpleCarousel items={publicaciones} renderItem={renderPublicacion} itemsPerPage={3} />
            </div>
          </div>
        )}
        {/* Integrantes */}
        <div className="multi-card-carousel">
          <div className="carousel-container">
            <h3 className="section-title" style={{ textAlign: "center", margin: "32px 0 24px 0", fontSize: "2rem", padding: "0.5em 0" }}>Integrantes</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
              {linea.personas && linea.personas.length > 0 ? (
                linea.personas.map(renderIntegrante)
              ) : (
                <div style={{ color: "#aaa" }}>No hay integrantes registrados.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetallesLineaDeInvestigacion
