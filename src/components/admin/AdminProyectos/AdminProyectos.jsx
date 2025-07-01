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
  UserOutlined,
  BarChartOutlined,
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
            "Desarrollo de un sistema de inteligencia artificial para asistir en el diagnóstico médico temprano utilizando técnicas de deep learning y análisis de imágenes médicas.",
          estado: "En progreso",
          fechaInicio: "2023-01-15",
          fechaFin: "2024-12-31",
          presupuesto: 150000,
          responsable: "Dr. María García",
          equipo: ["Dr. Juan Pérez", "Ing. Ana López", "Dra. Carmen Silva"],
          progreso: 65,
          lineaInvestigacion: "Inteligencia Artificial y Machine Learning",
          objetivos: [
            "Desarrollar algoritmos de detección temprana",
            "Integrar con sistemas hospitalarios existentes",
            "Validar con datos clínicos reales",
          ],
        },
        {
          id: 2,
          titulo: "Plataforma Blockchain para Votación Electrónica",
          descripcion:
            "Implementación de una plataforma segura de votación electrónica basada en blockchain que garantice transparencia, inmutabilidad y privacidad del voto.",
          estado: "Completado",
          fechaInicio: "2022-06-01",
          fechaFin: "2023-05-31",
          presupuesto: 200000,
          responsable: "Dr. Carlos Rodríguez",
          equipo: ["Dra. Laura Martínez", "Ing. Roberto Vega"],
          progreso: 100,
          lineaInvestigacion: "Ciberseguridad y Blockchain",
          objetivos: [
            "Implementar protocolo de consenso seguro",
            "Desarrollar interfaz de usuario intuitiva",
            "Realizar pruebas piloto en elecciones locales",
          ],
        },
        {
          id: 3,
          titulo: "Red IoT para Monitoreo Ambiental",
          descripcion:
            "Desarrollo de una red de sensores IoT para monitoreo en tiempo real de variables ambientales en áreas urbanas y rurales.",
          estado: "En progreso",
          fechaInicio: "2023-03-20",
          fechaFin: "2024-06-30",
          presupuesto: 120000,
          responsable: "Ing. Fernando Castro",
          equipo: ["Dr. Elena Morales", "Dra. Isabel Jiménez", "Ing. Patricia Silva"],
          progreso: 40,
          lineaInvestigacion: "Internet de las Cosas (IoT)",
          objetivos: [
            "Desplegar red de sensores distribuidos",
            "Implementar sistema de alertas automáticas",
            "Crear dashboard de visualización de datos",
          ],
        },
        {
          id: 4,
          titulo: "Simulador VR para Entrenamiento Quirúrgico",
          descripcion:
            "Creación de un simulador de realidad virtual para entrenamiento de procedimientos quirúrgicos complejos con feedback háptico.",
          estado: "Planificado",
          fechaInicio: "2024-01-15",
          fechaFin: "2025-01-15",
          presupuesto: 180000,
          responsable: "Dra. Sofia Hernández",
          equipo: ["Dr. Miguel Torres", "Ing. Luis Ramírez"],
          progreso: 5,
          lineaInvestigacion: "Realidad Virtual y Aumentada",
          objetivos: [
            "Desarrollar simulaciones realistas",
            "Integrar feedback háptico avanzado",
            "Validar con profesionales médicos",
          ],
        },
        {
          id: 5,
          titulo: "Algoritmos Cuánticos para Optimización",
          descripcion:
            "Investigación y desarrollo de algoritmos cuánticos para resolver problemas de optimización compleja en logística y finanzas.",
          estado: "En progreso",
          fechaInicio: "2023-08-01",
          fechaFin: "2024-12-31",
          presupuesto: 250000,
          responsable: "Dr. Roberto Vega",
          equipo: ["Dra. Carmen Ruiz", "Dr. Antonio López"],
          progreso: 30,
          lineaInvestigacion: "Computación Cuántica",
          objetivos: [
            "Implementar algoritmos QAOA",
            "Optimizar para hardware cuántico actual",
            "Comparar con métodos clásicos",
          ],
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
        return "#10b981"
      case "En progreso":
        return "#667eea"
      case "Planificado":
        return "#f59e0b"
      case "Pausado":
        return "#ef4444"
      case "Cancelado":
        return "#ef4444"
      default:
        return "#64748b"
    }
  }

  const getProgresoColor = (progreso) => {
    if (progreso >= 80) return "#10b981"
    if (progreso >= 50) return "#667eea"
    if (progreso >= 25) return "#f59e0b"
    return "#ef4444"
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
              <BranchesOutlined style={{ marginRight: "0.5rem" }} />
              Proyectos de Investigación
            </h1>
            <p className="admin-page-subtitle">
              Gestiona los proyectos de investigación del grupo GILIA. Controla el progreso, presupuestos y equipos de
              trabajo de cada proyecto.
            </p>
          </div>
          <div className="admin-page-actions">
            <Link to="/admin/proyectos/crear" className="admin-btn admin-btn-primary">
              <PlusOutlined />
              Nuevo Proyecto
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="admin-content-card">
        <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1e293b", marginBottom: "1.5rem" }}>
          Resumen de Proyectos
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem" }}>
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
              {proyectos.filter((p) => p.estado === "En progreso").length}
            </div>
            <div style={{ color: "#64748b", fontWeight: "500" }}>En Progreso</div>
          </div>
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
              {proyectos.filter((p) => p.estado === "Completado").length}
            </div>
            <div style={{ color: "#64748b", fontWeight: "500" }}>Completados</div>
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
              {proyectos.filter((p) => p.estado === "Planificado").length}
            </div>
            <div style={{ color: "#64748b", fontWeight: "500" }}>Planificados</div>
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
              {formatCurrency(proyectos.reduce((acc, p) => acc + p.presupuesto, 0))}
            </div>
            <div style={{ color: "#64748b", fontWeight: "500" }}>Presupuesto Total</div>
          </div>
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
                color: "#94a3b8",
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
            <FilterOutlined style={{ color: "#64748b" }} />
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
              {/* Header del proyecto */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        backgroundColor: `${getEstadoColor(proyecto.estado)}15`,
                        color: getEstadoColor(proyecto.estado),
                        border: `1px solid ${getEstadoColor(proyecto.estado)}30`,
                      }}
                    >
                      {proyecto.estado}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#64748b",
                        background: "rgba(102, 126, 234, 0.1)",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        border: "1px solid rgba(102, 126, 234, 0.2)",
                      }}
                    >
                      {proyecto.lineaInvestigacion}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1e293b", margin: "0 0 0.5rem 0" }}>
                    {proyecto.titulo}
                  </h3>

                  <p style={{ color: "#64748b", margin: "0 0 1rem 0", fontSize: "0.9rem", lineHeight: "1.5" }}>
                    {proyecto.descripcion}
                  </p>
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

              {/* Información del proyecto */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: "600", color: "#64748b", marginBottom: "0.75rem" }}>
                    Información General
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.85rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <UserOutlined style={{ color: "#667eea", width: "14px" }} />
                      <span style={{ color: "#64748b" }}>
                        <strong>Responsable:</strong> {proyecto.responsable}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <CalendarOutlined style={{ color: "#06b6d4", width: "14px" }} />
                      <span style={{ color: "#64748b" }}>
                        <strong>Duración:</strong> {new Date(proyecto.fechaInicio).toLocaleDateString()} -{" "}
                        {new Date(proyecto.fechaFin).toLocaleDateString()}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <DollarOutlined style={{ color: "#10b981", width: "14px" }} />
                      <span style={{ color: "#64748b" }}>
                        <strong>Presupuesto:</strong> {formatCurrency(proyecto.presupuesto)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: "0.9rem", fontWeight: "600", color: "#64748b", marginBottom: "0.75rem" }}>
                    Progreso del Proyecto
                  </h4>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Completado</span>
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
                        backgroundColor: "rgba(102, 126, 234, 0.1)",
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
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
                    <BarChartOutlined style={{ color: getProgresoColor(proyecto.progreso), width: "14px" }} />
                    <span style={{ color: "#64748b" }}>
                      Estado:{" "}
                      <strong style={{ color: getProgresoColor(proyecto.progreso) }}>
                        {proyecto.progreso >= 80
                          ? "Casi completado"
                          : proyecto.progreso >= 50
                            ? "En buen progreso"
                            : proyecto.progreso >= 25
                              ? "En desarrollo"
                              : "Iniciando"}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              {/* Objetivos */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: "600", color: "#64748b", marginBottom: "0.75rem" }}>
                  Objetivos del Proyecto
                </h4>
                <ul
                  style={{ margin: 0, paddingLeft: "1.5rem", color: "#64748b", fontSize: "0.85rem", lineHeight: "1.5" }}
                >
                  {proyecto.objetivos.map((objetivo, index) => (
                    <li key={index} style={{ marginBottom: "0.25rem" }}>
                      {objetivo}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Equipo */}
              <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(102, 126, 234, 0.1)" }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: "600", color: "#64748b", marginBottom: "0.75rem" }}>
                  <TeamOutlined style={{ marginRight: "0.5rem" }} />
                  Equipo de Trabajo
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {proyecto.equipo.map((miembro, index) => (
                    <span
                      key={index}
                      style={{
                        padding: "0.25rem 0.75rem",
                        backgroundColor: "rgba(102, 126, 234, 0.1)",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        color: "#667eea",
                        border: "1px solid rgba(102, 126, 234, 0.2)",
                      }}
                    >
                      {miembro}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Proyectos
