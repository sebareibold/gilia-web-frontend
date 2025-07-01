"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  BranchesOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  CalendarOutlined,
  TeamOutlined,
  DollarOutlined,
} from "@ant-design/icons"

const Proyectos = () => {
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    setTimeout(() => {
      setProyectos([
        {
          id: 1,
          titulo: "Sistema de IA para Diagnóstico Médico",
          descripcion:
            "Desarrollo de un sistema de inteligencia artificial para asistir en el diagnóstico médico temprano",
          estado: "En progreso",
          fechaInicio: "2023-01-15",
          fechaFin: "2024-12-31",
          presupuesto: 150000,
          responsable: "Dr. María García",
          equipo: ["Dr. Juan Pérez", "Ing. Ana López", "Dra. Carmen Silva"],
          progreso: 65,
          lineaInvestigacion: "Inteligencia Artificial y Machine Learning",
        },
        {
          id: 2,
          titulo: "Plataforma Blockchain para Votación Electrónica",
          descripcion: "Implementación de una plataforma segura de votación electrónica basada en blockchain",
          estado: "Completado",
          fechaInicio: "2022-06-01",
          fechaFin: "2023-05-31",
          presupuesto: 200000,
          responsable: "Dr. Carlos Rodríguez",
          equipo: ["Dra. Laura Martínez", "Ing. Roberto Vega"],
          progreso: 100,
          lineaInvestigacion: "Ciberseguridad y Blockchain",
        },
        {
          id: 3,
          titulo: "Red IoT para Monitoreo Ambiental",
          descripcion: "Desarrollo de una red de sensores IoT para monitoreo en tiempo real de variables ambientales",
          estado: "En progreso",
          fechaInicio: "2023-03-20",
          fechaFin: "2024-06-30",
          presupuesto: 120000,
          responsable: "Ing. Fernando Castro",
          equipo: ["Dr. Elena Morales", "Dra. Isabel Jiménez", "Ing. Patricia Silva"],
          progreso: 40,
          lineaInvestigacion: "Internet de las Cosas (IoT)",
        },
        {
          id: 4,
          titulo: "Simulador VR para Entrenamiento Quirúrgico",
          descripción: "Creación de un simulador de realidad virtual para entrenamiento de procedimientos quirúrgicos",
          estado: "Planificado",
          fechaInicio: "2024-01-15",
          fechaFin: "2025-01-15",
          presupuesto: 180000,
          responsable: "Dra. Sofia Hernández",
          equipo: ["Dr. Miguel Torres", "Ing. Luis Ramírez"],
          progreso: 5,
          lineaInvestigacion: "Realidad Virtual y Aumentada",
        },
        {
          id: 5,
          titulo: "Algoritmos Cuánticos para Optimización",
          descripcion: "Investigación y desarrollo de algoritmos cuánticos para problemas de optimización compleja",
          estado: "En progreso",
          fechaInicio: "2023-08-01",
          fechaFin: "2024-12-31",
          presupuesto: 250000,
          responsable: "Dr. Roberto Vega",
          equipo: ["Dra. Carmen Ruiz", "Dr. Antonio López"],
          progreso: 30,
          lineaInvestigacion: "Computación Cuántica",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este proyecto?")) {
      setProyectos(proyectos.filter((proyecto) => proyecto.id !== id))
    }
  }

  const filteredProyectos = proyectos.filter((proyecto) => {
    const matchesSearch =
      proyecto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.responsable.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || proyecto.estado === filterStatus

    return matchesSearch && matchesFilter
  })

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Completado":
        return "#43e97b"
      case "En progreso":
        return "#667eea"
      case "Planificado":
        return "#ffa726"
      case "Pausado":
        return "#f5576c"
      case "Cancelado":
        return "#ff4d4f"
      default:
        return "#764ba2"
    }
  }

  const getProgresoColor = (progreso) => {
    if (progreso >= 80) return "#43e97b"
    if (progreso >= 50) return "#667eea"
    if (progreso >= 25) return "#ffa726"
    return "#f5576c"
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <BranchesOutlined style={{ fontSize: "2rem", marginRight: "1rem" }} />
          Cargando proyectos...
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">
          <BranchesOutlined style={{ marginRight: "0.5rem" }} />
          Proyectos de Investigación
        </h1>
        <p className="admin-page-subtitle">
          Gestiona los proyectos de investigación del grupo GILIA. Controla el progreso, presupuestos y equipos de
          trabajo de cada proyecto.
        </p>
        <div className="admin-page-actions">
          <Link to="/admin/proyectos/crear" className="admin-btn admin-btn-primary">
            <PlusOutlined />
            Nuevo Proyecto
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="admin-content-card">
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: "300px" }}>
            <SearchOutlined
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "rgba(255, 255, 255, 0.5)",
              }}
            />
            <input
              type="text"
              placeholder="Buscar proyectos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-form-input"
              style={{ paddingLeft: "3rem" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FilterOutlined style={{ color: "rgba(255, 255, 255, 0.8)" }} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="admin-form-select"
              style={{ minWidth: "180px" }}
            >
              <option value="all">Todos los estados</option>
              <option value="Planificado">Planificado</option>
              <option value="En progreso">En progreso</option>
              <option value="Completado">Completado</option>
              <option value="Pausado">Pausado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredProyectos.length === 0 ? (
        <div className="admin-content-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <BranchesOutlined />
            </div>
            <h3 className="admin-empty-title">No hay proyectos</h3>
            <p className="admin-empty-description">
              {searchTerm || filterStatus !== "all"
                ? "No se encontraron resultados para los filtros aplicados."
                : "Comienza creando tu primer proyecto de investigación."}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Link to="/admin/proyectos/crear" className="admin-btn admin-btn-primary">
                <PlusOutlined />
                Crear Primer Proyecto
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {filteredProyectos.map((proyecto) => (
            <div key={proyecto.id} className="admin-content-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        backgroundColor: `${getEstadoColor(proyecto.estado)}20`,
                        color: getEstadoColor(proyecto.estado),
                        border: `1px solid ${getEstadoColor(proyecto.estado)}40`,
                      }}
                    >
                      {proyecto.estado}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.6)" }}>
                      {proyecto.lineaInvestigacion}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#ffffff", margin: "0 0 0.5rem 0" }}>
                    {proyecto.titulo}
                  </h3>

                  <p style={{ color: "rgba(255, 255, 255, 0.8)", margin: "0 0 1rem 0", fontSize: "0.9rem" }}>
                    {proyecto.descripcion}
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
                      <TeamOutlined style={{ color: "#667eea" }} />
                      <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                        <strong>Responsable:</strong> {proyecto.responsable}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
                      <CalendarOutlined style={{ color: "#f093fb" }} />
                      <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                        <strong>Duración:</strong> {new Date(proyecto.fechaInicio).toLocaleDateString()} -{" "}
                        {new Date(proyecto.fechaFin).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
                      <DollarOutlined style={{ color: "#43e97b" }} />
                      <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                        <strong>Presupuesto:</strong> {formatCurrency(proyecto.presupuesto)}
                      </span>
                    </div>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.8)" }}>
                        Progreso del proyecto
                      </span>
                      <span
                        style={{ fontSize: "0.85rem", fontWeight: "600", color: getProgresoColor(proyecto.progreso) }}
                      >
                        {proyecto.progreso}%
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "8px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${proyecto.progreso}%`,
                          height: "100%",
                          backgroundColor: getProgresoColor(proyecto.progreso),
                          borderRadius: "4px",
                          transition: "width 0.3s ease",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: "rgba(255, 255, 255, 0.8)",
                        marginBottom: "0.25rem",
                        display: "block",
                      }}
                    >
                      <strong>Equipo:</strong>
                    </span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                      {proyecto.equipo.map((miembro, index) => (
                        <span
                          key={index}
                          style={{
                            padding: "0.2rem 0.6rem",
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                            borderRadius: "12px",
                            fontSize: "0.75rem",
                            color: "rgba(255, 255, 255, 0.8)",
                          }}
                        >
                          {miembro}
                        </span>
                      ))}
                    </div>
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
                    onClick={() => handleDelete(proyecto.id)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Footer */}
      <div className="admin-content-card">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#667eea", marginBottom: "0.5rem" }}>
              {proyectos.filter((p) => p.estado === "En progreso").length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>En Progreso</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#43e97b", marginBottom: "0.5rem" }}>
              {proyectos.filter((p) => p.estado === "Completado").length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>Completados</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#ffa726", marginBottom: "0.5rem" }}>
              {proyectos.filter((p) => p.estado === "Planificado").length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>Planificados</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#f093fb", marginBottom: "0.5rem" }}>
              {formatCurrency(proyectos.reduce((acc, p) => acc + p.presupuesto, 0))}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>Presupuesto Total</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Proyectos
