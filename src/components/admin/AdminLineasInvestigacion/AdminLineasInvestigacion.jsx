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
          descripcion: "Investigación en algoritmos de aprendizaje automático y redes neuronales",
          estado: "Activa",
          fechaCreacion: "2023-01-15",
          miembros: 5,
          proyectos: 3,
        },
        {
          id: 2,
          titulo: "Computación Cuántica",
          descripcion: "Desarrollo de algoritmos cuánticos y aplicaciones en criptografía",
          estado: "Activa",
          fechaCreacion: "2023-03-20",
          miembros: 3,
          proyectos: 2,
        },
        {
          id: 3,
          titulo: "Ciberseguridad y Blockchain",
          descripcion: "Investigación en seguridad informática y tecnologías distribuidas",
          estado: "En desarrollo",
          fechaCreacion: "2023-06-10",
          miembros: 4,
          proyectos: 1,
        },
        {
          id: 4,
          titulo: "Internet de las Cosas (IoT)",
          descripcion: "Desarrollo de sistemas IoT para ciudades inteligentes",
          estado: "Activa",
          fechaCreacion: "2023-02-28",
          miembros: 6,
          proyectos: 4,
        },
        {
          id: 5,
          titulo: "Realidad Virtual y Aumentada",
          descripcion: "Aplicaciones de VR/AR en educación y medicina",
          estado: "Pausada",
          fechaCreacion: "2022-11-05",
          miembros: 2,
          proyectos: 1,
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
      linea.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Activa":
        return "#43e97b"
      case "En desarrollo":
        return "#ffa726"
      case "Pausada":
        return "#f5576c"
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
        <h1 className="admin-page-title">
          <ExperimentOutlined style={{ marginRight: "0.5rem" }} />
          Líneas de Investigación
        </h1>
        <p className="admin-page-subtitle">
          Gestiona las líneas de investigación del grupo GILIA. Aquí puedes crear, editar y organizar las diferentes
          áreas de investigación.
        </p>
        <div className="admin-page-actions">
          <Link to="/admin/lineas/crear" className="admin-btn admin-btn-primary">
            <PlusOutlined />
            Nueva Línea de Investigación
          </Link>
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
                color: "rgba(255, 255, 255, 0.5)",
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
        <div className="admin-content-card">
          <div className="admin-table">
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Estado</th>
                  <th>Miembros</th>
                  <th>Proyectos</th>
                  <th>Fecha Creación</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredLineas.map((linea) => (
                  <tr key={linea.id}>
                    <td>
                      <div>
                        <div style={{ fontWeight: "600", marginBottom: "0.25rem" }}>{linea.titulo}</div>
                        <div style={{ fontSize: "0.85rem", opacity: 0.8 }}>
                          {linea.descripcion.length > 80
                            ? `${linea.descripcion.substring(0, 80)}...`
                            : linea.descripcion}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          fontWeight: "500",
                          backgroundColor: `${getEstadoColor(linea.estado)}20`,
                          color: getEstadoColor(linea.estado),
                          border: `1px solid ${getEstadoColor(linea.estado)}40`,
                        }}
                      >
                        {linea.estado}
                      </span>
                    </td>
                    <td>{linea.miembros}</td>
                    <td>{linea.proyectos}</td>
                    <td>{new Date(linea.fechaCreacion).toLocaleDateString()}</td>
                    <td>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Stats Footer */}
      <div className="admin-content-card">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#43e97b", marginBottom: "0.5rem" }}>
              {lineas.filter((l) => l.estado === "Activa").length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>Líneas Activas</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#ffa726", marginBottom: "0.5rem" }}>
              {lineas.filter((l) => l.estado === "En desarrollo").length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>En Desarrollo</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#667eea", marginBottom: "0.5rem" }}>
              {lineas.reduce((acc, l) => acc + l.miembros, 0)}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>Total Miembros</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#f093fb", marginBottom: "0.5rem" }}>
              {lineas.reduce((acc, l) => acc + l.proyectos, 0)}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>Total Proyectos</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LineasInvestigacion
