"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  ExperimentOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  TeamOutlined,
  ProjectOutlined,
  CalendarOutlined,
} from "@ant-design/icons"

const LineasInvestigacion = () => {
  const [lineas, setLineas] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  // Datos simulados
  useEffect(() => {
    setTimeout(() => {
      setLineas([
        {
          id: 1,
          titulo: "Inteligencia Artificial y Machine Learning",
          descripcion:
            "Investigación en algoritmos de aprendizaje automático, redes neuronales profundas y aplicaciones de IA en diversos sectores industriales y académicos.",
          estado: "Activa",
          fechaCreacion: "2023-01-15",
          miembros: 5,
          proyectos: 3,
          objetivos: [
            "Desarrollar algoritmos de ML más eficientes",
            "Aplicar IA en diagnóstico médico",
            "Investigar redes neuronales explicables",
          ],
          responsable: "Dr. María García",
        },
        {
          id: 2,
          titulo: "Computación Cuántica",
          descripcion:
            "Desarrollo de algoritmos cuánticos, investigación en criptografía post-cuántica y aplicaciones de computación cuántica en optimización.",
          estado: "Activa",
          fechaCreacion: "2023-03-20",
          miembros: 3,
          proyectos: 2,
          objetivos: [
            "Implementar algoritmos cuánticos de optimización",
            "Desarrollar protocolos de criptografía cuántica",
            "Estudiar corrección de errores cuánticos",
          ],
          responsable: "Dr. Juan Pérez",
        },
        {
          id: 3,
          titulo: "Ciberseguridad y Blockchain",
          descripcion:
            "Investigación en seguridad informática, tecnologías blockchain, criptografía avanzada y sistemas distribuidos seguros.",
          estado: "En desarrollo",
          fechaCreacion: "2023-06-10",
          miembros: 4,
          proyectos: 1,
          objetivos: [
            "Mejorar protocolos de consenso blockchain",
            "Desarrollar sistemas de autenticación seguros",
            "Investigar privacidad en redes distribuidas",
          ],
          responsable: "Dr. Carlos Rodríguez",
        },
        {
          id: 4,
          titulo: "Internet de las Cosas (IoT)",
          descripcion:
            "Desarrollo de sistemas IoT para ciudades inteligentes, redes de sensores, edge computing y aplicaciones industriales.",
          estado: "Activa",
          fechaCreacion: "2023-02-28",
          miembros: 6,
          proyectos: 4,
          objetivos: [
            "Crear redes de sensores eficientes",
            "Implementar edge computing en IoT",
            "Desarrollar aplicaciones para smart cities",
          ],
          responsable: "Ing. Fernando Castro",
        },
        {
          id: 5,
          titulo: "Realidad Virtual y Aumentada",
          descripcion:
            "Aplicaciones de VR/AR en educación, medicina, entretenimiento y simulación de procesos industriales complejos.",
          estado: "Pausada",
          fechaCreacion: "2022-11-05",
          miembros: 2,
          proyectos: 1,
          objetivos: [
            "Desarrollar simuladores médicos en VR",
            "Crear herramientas educativas en AR",
            "Investigar interfaces hápticas avanzadas",
          ],
          responsable: "Dra. Sofia Hernández",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta línea de investigación?")) {
      setLineas(lineas.filter((linea) => linea.id !== id))
    }
  }

  const filteredLineas = lineas.filter(
    (linea) =>
      linea.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      linea.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      linea.responsable.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Activa":
        return "#10b981"
      case "En desarrollo":
        return "#f59e0b"
      case "Pausada":
        return "#ef4444"
      default:
        return "#667eea"
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <ExperimentOutlined style={{ fontSize: "2rem", marginRight: "1rem" }} />
          Cargando líneas de investigación...
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1 className="admin-page-title">
              <ExperimentOutlined style={{ marginRight: "0.5rem" }} />
              Líneas de Investigación
            </h1>
            <p className="admin-page-subtitle">
              Gestiona las líneas de investigación del grupo GILIA. Aquí puedes crear, editar y organizar las diferentes
              áreas de investigación.
            </p>
          </div>
          <div className="admin-page-actions">
            <Link to="/admin/lineas/crear" className="admin-btn admin-btn-primary">
              <PlusOutlined />
              Nueva Línea de Investigación
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="admin-content-card">
        <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1e293b", marginBottom: "1.5rem" }}>
          Resumen de Líneas de Investigación
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              background: "rgba(16, 185, 129, 0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(16, 185, 129, 0.2)",
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#10b981", marginBottom: "0.5rem" }}>
              {lineas.filter((l) => l.estado === "Activa").length}
            </div>
            <div style={{ color: "#64748b", fontWeight: "500" }}>Líneas Activas</div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              background: "rgba(245, 158, 11, 0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(245, 158, 11, 0.2)",
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#f59e0b", marginBottom: "0.5rem" }}>
              {lineas.filter((l) => l.estado === "En desarrollo").length}
            </div>
            <div style={{ color: "#64748b", fontWeight: "500" }}>En Desarrollo</div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              background: "rgba(102, 126, 234, 0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(102, 126, 234, 0.2)",
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#667eea", marginBottom: "0.5rem" }}>
              {lineas.reduce((acc, l) => acc + l.miembros, 0)}
            </div>
            <div style={{ color: "#64748b", fontWeight: "500" }}>Total Miembros</div>
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              background: "rgba(6, 182, 212, 0.1)",
              borderRadius: "12px",
              border: "1px solid rgba(6, 182, 212, 0.2)",
            }}
          >
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#06b6d4", marginBottom: "0.5rem" }}>
              {lineas.reduce((acc, l) => acc + l.proyectos, 0)}
            </div>
            <div style={{ color: "#64748b", fontWeight: "500" }}>Total Proyectos</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="admin-content-card">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <SearchOutlined
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
              }}
            />
            <input
              type="text"
              placeholder="Buscar líneas de investigación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-form-input"
              style={{ paddingLeft: "3rem" }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredLineas.length === 0 ? (
        <div className="admin-content-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <ExperimentOutlined />
            </div>
            <h3 className="admin-empty-title">No hay líneas de investigación</h3>
            <p className="admin-empty-description">
              {searchTerm
                ? "No se encontraron resultados para tu búsqueda."
                : "Comienza creando tu primera línea de investigación."}
            </p>
            {!searchTerm && (
              <Link to="/admin/lineas/crear" className="admin-btn admin-btn-primary">
                <PlusOutlined />
                Crear Primera Línea
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {filteredLineas.map((linea) => (
            <div key={linea.id} className="admin-content-card">
              {/* Header de la línea */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        backgroundColor: `${getEstadoColor(linea.estado)}15`,
                        color: getEstadoColor(linea.estado),
                        border: `1px solid ${getEstadoColor(linea.estado)}30`,
                      }}
                    >
                      {linea.estado}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.85rem",
                        color: "#64748b",
                      }}
                    >
                      <CalendarOutlined style={{ width: "14px" }} />
                      <span>Creada: {new Date(linea.fechaCreacion).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1e293b", margin: "0 0 0.5rem 0" }}>
                    {linea.titulo}
                  </h3>

                  <p style={{ color: "#64748b", margin: "0 0 1rem 0", fontSize: "0.9rem", lineHeight: "1.5" }}>
                    {linea.descripcion}
                  </p>

                  {/* Responsable */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      fontSize: "0.85rem",
                      color: "#667eea",
                      marginBottom: "1rem",
                    }}
                  >
                    <TeamOutlined style={{ width: "14px" }} />
                    <span>
                      <strong>Responsable:</strong> {linea.responsable}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
                  <button
                    className="admin-btn admin-btn-primary"
                    style={{ padding: "0.5rem", minWidth: "auto" }}
                    title="Ver detalles"
                  >
                    <EyeOutlined />
                  </button>
                  <button
                    className="admin-btn admin-btn-warning"
                    style={{ padding: "0.5rem", minWidth: "auto" }}
                    title="Editar"
                  >
                    <EditOutlined />
                  </button>
                  <button
                    className="admin-btn admin-btn-danger"
                    style={{ padding: "0.5rem", minWidth: "auto" }}
                    title="Eliminar"
                    onClick={() => handleDelete(linea.id)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>

              {/* Estadísticas */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem",
                    background: "rgba(102, 126, 234, 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <TeamOutlined style={{ color: "#667eea", fontSize: "1.2rem" }} />
                  <div>
                    <div style={{ fontSize: "1.25rem", fontWeight: "600", color: "#667eea" }}>{linea.miembros}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Miembros</div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem",
                    background: "rgba(6, 182, 212, 0.1)",
                    borderRadius: "8px",
                  }}
                >
                  <ProjectOutlined style={{ color: "#06b6d4", fontSize: "1.2rem" }} />
                  <div>
                    <div style={{ fontSize: "1.25rem", fontWeight: "600", color: "#06b6d4" }}>{linea.proyectos}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>Proyectos</div>
                  </div>
                </div>
              </div>

              {/* Objetivos */}
              <div>
                <h4 style={{ fontSize: "0.9rem", fontWeight: "600", color: "#64748b", marginBottom: "0.75rem" }}>
                  Objetivos Principales
                </h4>
                <ul
                  style={{ margin: 0, paddingLeft: "1.5rem", color: "#64748b", fontSize: "0.85rem", lineHeight: "1.5" }}
                >
                  {linea.objetivos.map((objetivo, index) => (
                    <li key={index} style={{ marginBottom: "0.25rem" }}>
                      {objetivo}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LineasInvestigacion
