"use client"

import { useParams } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"
import { ProjectOutlined, CalendarOutlined, TeamOutlined, TagOutlined } from "@ant-design/icons"
import { marked } from "marked"
import SequentialLoader from "../../shared/SequentialLoader/SequentialLoader"
import { dataService } from "../../../services/dataService"

const ProyectoDetail = () => {
  const { id } = useParams()
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  // Definir los loaders en el orden que queremos que aparezcan
  const loaders = [
    {
      fetchFunction: () => dataService.getProject(id),
      dependencies: [id],
      options: { delay: 0 }
    }
  ]

  // Renderizar el contenido cuando todo esté cargado
  const renderContent = (allData, loaderStates, { allVisible, progress }) => {
    const [projectResponse] = allData
    const project = projectResponse?.data

    if (!project) {
      return (
        <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
          <div className="futuristic-error">
            <h3>Proyecto no encontrado</h3>
            <p>El proyecto solicitado no existe o ha sido eliminado.</p>
          </div>
        </div>
      )
    }

    const descripcionHTML = marked(project.descripcion || "")

    return (
      <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Header - Aparece PRIMERO */}
          <div 
            className="futuristic-card" 
            style={{ 
              textAlign: "center", 
              marginBottom: "2rem",
              opacity: allVisible ? 1 : 0,
              transform: allVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease'
            }}
          >
            <div className="futuristic-badge" style={{ marginBottom: "1rem" }}>
              <ProjectOutlined style={{ marginRight: "0.5rem" }} />
              Proyecto de Investigación
            </div>
            <h1 className="futuristic-title">{project.nombre}</h1>
          </div>

          {/* Project Info - Aparece SEGUNDO */}
          <div 
            className="futuristic-card" 
            style={{ 
              marginBottom: "2rem",
              opacity: allVisible ? 1 : 0,
              transform: allVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.2s'
            }}
          >
            <div className="futuristic-grid futuristic-grid-4">
              <div className="futuristic-list-item" style={{ textAlign: "center" }}>
                <CalendarOutlined
                  style={{ fontSize: "1.5rem", color: "var(--colorTextSecondary)", marginBottom: "0.5rem" }}
                />
                <div style={{ fontSize: "0.9rem", color: "var(--colorTextBase)", fontWeight: "600" }}>Inicio</div>
                <div style={{ fontSize: "0.8rem", color: "var(--colorTextSecondary)" }}>
                  {project.fechaInicio || "Marzo 2024"}
                </div>
              </div>

              <div className="futuristic-list-item" style={{ textAlign: "center" }}>
                <CalendarOutlined
                  style={{ fontSize: "1.5rem", color: "var(--colorTextSecondary)", marginBottom: "0.5rem" }}
                />
                <div style={{ fontSize: "0.9rem", color: "var(--colorTextBase)", fontWeight: "600" }}>Finalización</div>
                <div style={{ fontSize: "0.8rem", color: "var(--colorTextSecondary)" }}>
                  {project.fechaFin || "Agosto 2025"}
                </div>
              </div>

              <div className="futuristic-list-item" style={{ textAlign: "center" }}>
                <TeamOutlined
                  style={{ fontSize: "1.5rem", color: "var(--colorTextSecondary)", marginBottom: "0.5rem" }}
                />
                <div style={{ fontSize: "0.9rem", color: "var(--colorTextBase)", fontWeight: "600" }}>Responsable</div>
                <div style={{ fontSize: "0.8rem", color: "var(--colorTextSecondary)" }}>
                  {project.responsable || "Dr. María García"}
                </div>
              </div>

              <div className="futuristic-list-item" style={{ textAlign: "center" }}>
                <TagOutlined style={{ fontSize: "1.5rem", color: "var(--colorTextSecondary)", marginBottom: "0.5rem" }} />
                <div style={{ fontSize: "0.9rem", color: "var(--colorTextBase)", fontWeight: "600" }}>Estado</div>
                <div className="futuristic-badge" style={{ fontSize: "0.65rem" }}>
                  {project.estado || "En Progreso"}
                </div>
              </div>
            </div>
          </div>

          {/* Content - Aparece TERCERO */}
          <div 
            className="futuristic-card"
            style={{
              opacity: allVisible ? 1 : 0,
              transform: allVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease 0.4s'
            }}
          >
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

  // Renderizar skeleton personalizado
  const renderSkeleton = (loaderStates, progress) => (
    <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Skeleton del header */}
        <div className="futuristic-card" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="skeleton-badge" style={{ height: "2rem", background: "var(--color-border-light)", borderRadius: "8px", marginBottom: "1rem", width: "200px", margin: "0 auto 1rem" }} />
          <div className="skeleton-title" style={{ height: "3rem", background: "var(--color-border-light)", borderRadius: "8px" }} />
        </div>

        {/* Skeleton de la información del proyecto */}
        <div className="futuristic-card" style={{ marginBottom: "2rem" }}>
          <div className="futuristic-grid futuristic-grid-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="futuristic-list-item" style={{ textAlign: "center" }}>
                <div className="skeleton-icon" style={{ height: "1.5rem", background: "var(--color-border-light)", borderRadius: "4px", marginBottom: "0.5rem", width: "1.5rem", margin: "0 auto 0.5rem" }} />
                <div className="skeleton-label" style={{ height: "0.9rem", background: "var(--color-border-light)", borderRadius: "4px", marginBottom: "0.5rem", width: "80px", margin: "0 auto 0.5rem" }} />
                <div className="skeleton-value" style={{ height: "0.8rem", background: "var(--color-border-light)", borderRadius: "4px", width: "60px", margin: "0 auto" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Skeleton del contenido */}
        <div className="futuristic-card">
          <div style={{ display: "grid", gap: "1rem" }}>
            <div className="skeleton-line" style={{ height: "1rem", background: "var(--color-border-light)", borderRadius: "4px" }} />
            <div className="skeleton-line" style={{ height: "1rem", background: "var(--color-border-light)", borderRadius: "4px", width: "90%" }} />
            <div className="skeleton-line" style={{ height: "1rem", background: "var(--color-border-light)", borderRadius: "4px", width: "75%" }} />
            <div className="skeleton-line" style={{ height: "1rem", background: "var(--color-border-light)", borderRadius: "4px", width: "85%" }} />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <SequentialLoader
      loaders={loaders}
      renderContent={renderContent}
      renderSkeleton={renderSkeleton}
      delayBetweenElements={200}
      showProgress={true}
      onComplete={(data) => console.log('✅ Proyecto cargado completamente:', data)}
      onError={(errors) => console.error('❌ Error al cargar proyecto:', errors)}
    />
  )
}

export default ProyectoDetail
