"use client"

import { useState, useEffect } from "react"
import {
  BranchesOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
} from "@ant-design/icons"
import "../../../styles/admin-unified.css"

const AdminProyectos = () => {
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

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case "Completado":
        return "admin-unified-badge-active"
      case "En progreso":
        return "admin-unified-badge-active"
      case "Planificado":
        return "admin-unified-badge-pending"
      case "Pausado":
        return "admin-unified-badge-inactive"
      case "Cancelado":
        return "admin-unified-badge-inactive"
      default:
        return "admin-unified-badge-pending"
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando proyectos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-unified-page">
      <div className="admin-unified-decorations">
        <div className="admin-floating-element admin-floating-element-1"></div>
        <div className="admin-floating-element admin-floating-element-2"></div>
        <div className="admin-floating-element admin-floating-element-3"></div>
      </div>

      <div className="admin-unified-header">
        <h1 className="admin-unified-title">
          <BranchesOutlined />
          Proyectos de Investigación
        </h1>
        <p className="admin-unified-subtitle">
          Gestiona los proyectos de investigación del grupo GILIA. Controla el progreso, presupuestos y equipos de
          trabajo de cada proyecto.
        </p>

        <button className="admin-unified-primary-btn">
          <PlusOutlined />
          Nuevo Proyecto
        </button>
      </div>

      <div className="admin-unified-filters">
        <div className="admin-unified-search">
          <SearchOutlined className="admin-unified-search-icon" />
          <input
            type="text"
            placeholder="Buscar proyectos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="admin-unified-filter-select"
        >
          <option value="all">Todos los estados</option>
          <option value="Planificado">Planificado</option>
          <option value="En progreso">En progreso</option>
          <option value="Completado">Completado</option>
          <option value="Pausado">Pausado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>

      {filteredProyectos.length === 0 ? (
        <div className="admin-unified-empty">
          <BranchesOutlined className="admin-unified-empty-icon" />
          <h3 className="admin-unified-empty-title">No hay proyectos</h3>
          <p className="admin-unified-empty-description">
            {searchTerm || filterStatus !== "all"
              ? "No se encontraron resultados para los filtros aplicados."
              : "Comienza creando tu primer proyecto de investigación."}
          </p>
          {!searchTerm && filterStatus === "all" && (
            <button className="admin-unified-primary-btn">
              <PlusOutlined />
              Crear Primer Proyecto
            </button>
          )}
        </div>
      ) : (
        <div className="admin-unified-table-container">
          <table className="admin-unified-table">
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Estado</th>
                <th>Responsable</th>
                <th>Línea de Investigación</th>
                <th>Progreso</th>
                <th>Presupuesto</th>
                <th>Fechas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProyectos.map((proyecto) => (
                <tr key={proyecto.id}>
                  <td>
                    <strong>{proyecto.titulo}</strong>
                    <br />
                    <small style={{ color: "#64748b", lineHeight: "1.4" }}>
                      {proyecto.descripcion.substring(0, 80)}...
                    </small>
                  </td>
                  <td>
                    <span className={`admin-unified-badge ${getEstadoBadgeClass(proyecto.estado)}`}>
                      {proyecto.estado}
                    </span>
                  </td>
                  <td>
                    <TeamOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                    {proyecto.responsable}
                    <br />
                    <small style={{ color: "#64748b" }}>Equipo: {proyecto.equipo.length} miembros</small>
                  </td>
                  <td>
                    <small style={{ color: "#64748b" }}>{proyecto.lineaInvestigacion}</small>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div
                        style={{
                          width: "60px",
                          height: "6px",
                          backgroundColor: "rgba(102, 126, 234, 0.1)",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${proyecto.progreso}%`,
                            height: "100%",
                            backgroundColor:
                              proyecto.progreso >= 80 ? "#10b981" : proyecto.progreso >= 50 ? "#667eea" : "#f59e0b",
                            borderRadius: "3px",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{proyecto.progreso}%</span>
                    </div>
                  </td>
                  <td>
                    <DollarOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                    {formatCurrency(proyecto.presupuesto)}
                  </td>
                  <td>
                    <CalendarOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                    <small style={{ color: "#64748b" }}>
                      {new Date(proyecto.fechaInicio).toLocaleDateString()} -{" "}
                      {new Date(proyecto.fechaFin).toLocaleDateString()}
                    </small>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-table-btn admin-table-btn-view" title="Ver detalles">
                        <EyeOutlined />
                      </button>
                      <button className="admin-table-btn admin-table-btn-edit" title="Editar">
                        <EditOutlined />
                      </button>
                      <button
                        className="admin-table-btn admin-table-btn-delete"
                        title="Eliminar"
                        onClick={() => handleDelete(proyecto.id)}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminProyectos
