"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  UserOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons"

const Equipo = () => {
  const [miembros, setMiembros] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  useEffect(() => {
    setTimeout(() => {
      setMiembros([
        {
          id: 1,
          nombre: "Dr. María García",
          email: "maria.garcia@gilia.com",
          telefono: "+34 123 456 789",
          rol: "Director",
          especialidad: "Inteligencia Artificial",
          fechaIngreso: "2020-01-15",
          estado: "Activo",
          proyectos: 5,
          publicaciones: 23,
          avatar: "/placeholder.svg?height=80&width=80",
          biografia:
            "Doctora en Ciencias de la Computación con especialización en Machine Learning y redes neuronales.",
        },
        {
          id: 2,
          nombre: "Dr. Juan Pérez",
          email: "juan.perez@gilia.com",
          telefono: "+34 123 456 790",
          rol: "Investigador Senior",
          especialidad: "Computación Cuántica",
          fechaIngreso: "2020-03-20",
          estado: "Activo",
          proyectos: 3,
          publicaciones: 18,
          avatar: "/placeholder.svg?height=80&width=80",
          biografia: "Especialista en algoritmos cuánticos y criptografía post-cuántica.",
        },
        {
          id: 3,
          nombre: "Dra. Laura Martínez",
          email: "laura.martinez@gilia.com",
          telefono: "+34 123 456 791",
          rol: "Investigador Senior",
          especialidad: "Ciberseguridad",
          fechaIngreso: "2021-06-10",
          estado: "Activo",
          proyectos: 4,
          publicaciones: 15,
          avatar: "/placeholder.svg?height=80&width=80",
          biografia: "Experta en seguridad de redes y tecnologías blockchain.",
        },
        {
          id: 4,
          nombre: "Ing. Ana López",
          email: "ana.lopez@gilia.com",
          telefono: "+34 123 456 792",
          rol: "Investigador Junior",
          especialidad: "Internet de las Cosas",
          fechaIngreso: "2022-01-15",
          estado: "Activo",
          proyectos: 2,
          publicaciones: 8,
          avatar: "/placeholder.svg?height=80&width=80",
          biografia: "Ingeniera especializada en sistemas IoT y redes de sensores.",
        },
        {
          id: 5,
          nombre: "Dr. Carlos Rodríguez",
          email: "carlos.rodriguez@gilia.com",
          telefono: "+34 123 456 793",
          rol: "Investigador Senior",
          especialidad: "Blockchain",
          fechaIngreso: "2020-09-01",
          estado: "Activo",
          proyectos: 3,
          publicaciones: 20,
          avatar: "/placeholder.svg?height=80&width=80",
          biografia: "Doctor en Informática con experiencia en tecnologías distribuidas.",
        },
        {
          id: 6,
          nombre: "Dra. Sofia Hernández",
          email: "sofia.hernandez@gilia.com",
          telefono: "+34 123 456 794",
          rol: "Investigador Senior",
          especialidad: "Realidad Virtual",
          fechaIngreso: "2021-02-28",
          estado: "Licencia",
          proyectos: 2,
          publicaciones: 12,
          avatar: "/placeholder.svg?height=80&width=80",
          biografia: "Especialista en aplicaciones de VR/AR en medicina y educación.",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este miembro del equipo?")) {
      setMiembros(miembros.filter((miembro) => miembro.id !== id))
    }
  }

  const filteredMiembros = miembros.filter((miembro) => {
    const matchesSearch =
      miembro.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      miembro.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      miembro.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterRole === "all" || miembro.rol === filterRole

    return matchesSearch && matchesFilter
  })

  const getRolColor = (rol) => {
    switch (rol) {
      case "Director":
        return "#f5576c"
      case "Investigador Senior":
        return "#667eea"
      case "Investigador Junior":
        return "#43e97b"
      case "Estudiante PhD":
        return "#ffa726"
      case "Colaborador":
        return "#f093fb"
      default:
        return "#764ba2"
    }
  }

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Activo":
        return "#43e97b"
      case "Licencia":
        return "#ffa726"
      case "Inactivo":
        return "#f5576c"
      default:
        return "#764ba2"
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <UserOutlined style={{ fontSize: "2rem", marginRight: "1rem" }} />
          Cargando equipo...
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">
          <UserOutlined style={{ marginRight: "0.5rem" }} />
          Equipo de Investigación
        </h1>
        <p className="admin-page-subtitle">
          Gestiona los miembros del equipo GILIA. Administra perfiles, roles y asignaciones de cada investigador.
        </p>
        <div className="admin-page-actions">
          <Link to="/admin/equipo/crear" className="admin-btn admin-btn-primary">
            <PlusOutlined />
            Agregar Miembro
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
              placeholder="Buscar por nombre, especialidad o email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-form-input"
              style={{ paddingLeft: "3rem" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FilterOutlined style={{ color: "rgba(255, 255, 255, 0.8)" }} />
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="admin-form-select"
              style={{ minWidth: "200px" }}
            >
              <option value="all">Todos los roles</option>
              <option value="Director">Director</option>
              <option value="Investigador Senior">Investigador Senior</option>
              <option value="Investigador Junior">Investigador Junior</option>
              <option value="Estudiante PhD">Estudiante PhD</option>
              <option value="Colaborador">Colaborador</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredMiembros.length === 0 ? (
        <div className="admin-content-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <UserOutlined />
            </div>
            <h3 className="admin-empty-title">No hay miembros del equipo</h3>
            <p className="admin-empty-description">
              {searchTerm || filterRole !== "all"
                ? "No se encontraron resultados para los filtros aplicados."
                : "Comienza agregando el primer miembro del equipo."}
            </p>
            {!searchTerm && filterRole === "all" && (
              <Link to="/admin/equipo/crear" className="admin-btn admin-btn-primary">
                <PlusOutlined />
                Agregar Primer Miembro
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "1.5rem" }}>
          {filteredMiembros.map((miembro) => (
            <div key={miembro.id} className="admin-content-card">
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0 }}>
                  <img
                    src={miembro.avatar || "/placeholder.svg"}
                    alt={miembro.nombre}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid rgba(255, 255, 255, 0.2)",
                    }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                      marginBottom: "0.5rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        padding: "0.2rem 0.6rem",
                        borderRadius: "12px",
                        fontSize: "0.7rem",
                        fontWeight: "500",
                        backgroundColor: `${getRolColor(miembro.rol)}20`,
                        color: getRolColor(miembro.rol),
                        border: `1px solid ${getRolColor(miembro.rol)}40`,
                      }}
                    >
                      {miembro.rol}
                    </span>
                    <span
                      style={{
                        padding: "0.2rem 0.6rem",
                        borderRadius: "12px",
                        fontSize: "0.7rem",
                        fontWeight: "500",
                        backgroundColor: `${getEstadoColor(miembro.estado)}20`,
                        color: getEstadoColor(miembro.estado),
                        border: `1px solid ${getEstadoColor(miembro.estado)}40`,
                      }}
                    >
                      {miembro.estado}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#ffffff", margin: "0 0 0.25rem 0" }}>
                    {miembro.nombre}
                  </h3>

                  <p style={{ color: "rgba(255, 255, 255, 0.8)", margin: "0 0 0.75rem 0", fontSize: "0.85rem" }}>
                    <strong>Especialidad:</strong> {miembro.especialidad}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                      marginBottom: "0.75rem",
                      fontSize: "0.8rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      <MailOutlined style={{ color: "#667eea" }} />
                      <span>{miembro.email}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "rgba(255, 255, 255, 0.7)",
                      }}
                    >
                      <PhoneOutlined style={{ color: "#f093fb" }} />
                      <span>{miembro.telefono}</span>
                    </div>
                  </div>

                  <p
                    style={{
                      color: "rgba(255, 255, 255, 0.7)",
                      margin: "0 0 0.75rem 0",
                      fontSize: "0.8rem",
                      lineHeight: "1.4",
                    }}
                  >
                    {miembro.biografia}
                  </p>

                  <div style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem", fontSize: "0.8rem" }}>
                    <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                      <strong>Proyectos:</strong> {miembro.proyectos}
                    </span>
                    <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                      <strong>Publicaciones:</strong> {miembro.publicaciones}
                    </span>
                    <span style={{ color: "rgba(255, 255, 255, 0.8)" }}>
                      <strong>Desde:</strong> {new Date(miembro.fechaIngreso).getFullYear()}
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      className="admin-btn admin-btn-primary"
                      style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                      title="Ver perfil"
                    >
                      <EyeOutlined />
                    </button>
                    <button
                      className="admin-btn admin-btn-warning"
                      style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                      title="Editar"
                    >
                      <EditOutlined />
                    </button>
                    <button
                      className="admin-btn admin-btn-danger"
                      style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                      title="Eliminar"
                      onClick={() => handleDelete(miembro.id)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
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
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#43e97b", marginBottom: "0.5rem" }}>
              {miembros.filter((m) => m.estado === "Activo").length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>Miembros Activos</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#667eea", marginBottom: "0.5rem" }}>
              {miembros.filter((m) => m.rol === "Investigador Senior").length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>Investigadores Senior</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#f093fb", marginBottom: "0.5rem" }}>
              {miembros.reduce((acc, m) => acc + m.proyectos, 0)}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>Total Proyectos</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#ffa726", marginBottom: "0.5rem" }}>
              {miembros.reduce((acc, m) => acc + m.publicaciones, 0)}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>Total Publicaciones</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Equipo
