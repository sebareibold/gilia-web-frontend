"use client"

import { useParams } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"
import asyncMock from "../../../../asyncMock"
import { marked } from "marked"
import SimpleCarousel from "./SimpleCarousel"
import SequentialLoader from "../../shared/SequentialLoader/SequentialLoader"
import { UserOutlined, ArrowRightOutlined, ShareAltOutlined, CalendarOutlined } from "@ant-design/icons"

const DetallesLineaDeInvestigacion = () => {
  const { id } = useParams()
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  // Definir los loaders en el orden que queremos que aparezcan
  const loaders = [
    {
      fetchFunction: () => asyncMock.getLineaInvestigacion(id),
      dependencies: [id],
      options: { delay: 0 }
    },
    {
      fetchFunction: async () => {
        const linea = await asyncMock.getLineaInvestigacion(id)
        return asyncMock.getPublicaciones({ linea: linea.data.nombre })
      },
      dependencies: [id],
      options: { delay: 100 }
    }
  ]

  // Renderizar el contenido cuando todo esté cargado
  const renderContent = (allData, loaderStates, { allVisible, progress }) => {
    const [lineaResponse, publicacionesResponse] = allData
    const linea = lineaResponse?.data
    const publicaciones = publicacionesResponse?.data || []
    const proyectos = linea?.proyectos || []
    const integrantes = linea?.people || []

    const descripcionHTML = marked(linea?.descripcion || "")

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
            alt={integrante.full_name}
            className="news-image"
          />
          <div className="news-image-overlay">
            <UserOutlined />
          </div>
        </div>
        <div className="news-content" style={{ width: "100%", textAlign: "center" }}>
          <span className="news-category" style={{ background: "#4CAF50", color: "white", marginBottom: 8, fontSize: "0.95rem", borderRadius: 8, padding: "2px 12px", display: "inline-block" }}>{integrante.role_person}</span>
          <h3 className="news-title" style={{ fontSize: "1.1rem", marginBottom: 8, fontWeight: 700 }}>{integrante.full_name}</h3>
          <p className="news-description" style={{ fontSize: "0.98rem", color: "#bdbdbd", marginBottom: 0 }}>{integrante.biography || "Miembro del equipo de investigación."}</p>
        </div>
      </div>
    )

    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container" style={{ maxWidth: 1400, margin: "0 auto" }}>
          {/* Título - Aparece PRIMERO */}
          <div className="section-header" style={{ opacity: allVisible ? 1 : 0, transform: allVisible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}>
            <h2 className="section-title">{linea?.nombre}</h2>
          </div>
          
          {/* Descripción - Aparece SEGUNDO */}
          <div className="carousel-container" style={{ 
            marginBottom: "2rem", 
            opacity: allVisible ? 1 : 0, 
            transform: allVisible ? 'translateY(0)' : 'translateY(20px)', 
            transition: 'all 0.6s ease 0.2s' 
          }}>
            <div
              style={{ fontSize: "1rem", lineHeight: "1.6", color: "var(--color-text-secondary)" }}
              dangerouslySetInnerHTML={{ __html: descripcionHTML }}
            />
          </div>

          {/* Publicaciones - Aparece TERCERO */}
          {publicaciones.length > 0 && (
            <div className="multi-card-carousel" style={{ 
              opacity: allVisible ? 1 : 0, 
              transform: allVisible ? 'translateY(0)' : 'translateY(20px)', 
              transition: 'all 0.6s ease 0.4s' 
            }}>
              <div className="carousel-container">
                <h3 className="section-title" style={{ textAlign: "center", margin: "32px 0 24px 0", fontSize: "2rem", padding: "0.5em 0" }}>Publicaciones</h3>
                <SimpleCarousel items={publicaciones} renderItem={renderPublicacion} itemsPerPage={3} />
              </div>
            </div>
          )}
          
          {/* Integrantes - Aparece CUARTO */}
          <div className="multi-card-carousel" style={{ 
            opacity: allVisible ? 1 : 0, 
            transform: allVisible ? 'translateY(0)' : 'translateY(20px)', 
            transition: 'all 0.6s ease 0.6s' 
          }}>
            <div className="carousel-container">
              <h3 className="section-title" style={{ textAlign: "center", margin: "32px 0 24px 0", fontSize: "2rem", padding: "0.5em 0" }}>Integrantes</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
                {integrantes && integrantes.length > 0 ? (
                  integrantes.map(renderIntegrante)
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

  // Renderizar skeleton personalizado
  const renderSkeleton = (loaderStates, progress) => (
    <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container" style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Skeleton del título */}
        <div className="section-header">
          <div className="skeleton-title" style={{ height: "3rem", background: "var(--color-border-light)", borderRadius: "8px", marginBottom: "2rem" }} />
        </div>
        
        {/* Skeleton de la descripción */}
        <div style={{ marginBottom: "2rem" }}>
          <div className="skeleton-line" style={{ height: "1rem", background: "var(--color-border-light)", borderRadius: "4px", marginBottom: "1rem" }} />
          <div className="skeleton-line" style={{ height: "1rem", background: "var(--color-border-light)", borderRadius: "4px", marginBottom: "1rem", width: "80%" }} />
          <div className="skeleton-line" style={{ height: "1rem", background: "var(--color-border-light)", borderRadius: "4px", width: "60%" }} />
        </div>
        
        {/* Skeleton de las secciones */}
        <div style={{ display: "grid", gap: "3rem" }}>
          <div>
            <div className="skeleton-title" style={{ height: "2.5rem", background: "var(--color-border-light)", borderRadius: "8px", marginBottom: "1.5rem", width: "200px", margin: "0 auto 1.5rem" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {[1, 2, 3].map(i => (
                <div key={i} className="skeleton-card" style={{ height: "300px", background: "var(--color-border-light)", borderRadius: "12px" }} />
              ))}
            </div>
          </div>
          
          <div>
            <div className="skeleton-title" style={{ height: "2.5rem", background: "var(--color-border-light)", borderRadius: "8px", marginBottom: "1.5rem", width: "200px", margin: "0 auto 1.5rem" }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center" }}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="skeleton-card" style={{ width: "220px", height: "280px", background: "var(--color-border-light)", borderRadius: "12px" }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  return (
    <SequentialLoader
      loaders={loaders}
      renderContent={renderContent}
      renderSkeleton={renderSkeleton}
      delayBetweenElements={300}
      showProgress={true}
      onComplete={(data) => console.log('✅ Línea de investigación cargada completamente:', data)}
      onError={(errors) => console.error('❌ Error al cargar línea de investigación:', errors)}
    />
  )
}

export default DetallesLineaDeInvestigacion
