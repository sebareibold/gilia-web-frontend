"use client"

import { useState, useEffect } from "react"
import {
  ExperimentOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  TeamOutlined,
  ProjectOutlined,
} from "@ant-design/icons"
import "../../../styles/admin-unified.css"

const AdminLineasInvestigacion = () => {
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

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case "Activa":
        return "admin-unified-badge-active"
      case "En desarrollo":
        return "admin-unified-badge-pending"
      case "Pausada":
        return "admin-unified-badge-inactive"
      default:
        return "admin-unified-badge-pending"
    }
  }

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando líneas de investigación...</p>
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
          <ExperimentOutlined />
          Líneas de Investigación
        </h1>
        <p className="admin-unified-subtitle">
          Gestiona las líneas de investigación del grupo GILIA. Aquí puedes crear, editar y organizar las diferentes
          áreas de investigación.
        </p>

        <button className="admin-unified-primary-btn">
          <PlusOutlined />
          Nueva Línea de Investigación
        </button>
      </div>

      <div className="admin-unified-filters">
        <div className="admin-unified-search">
          <SearchOutlined className="admin-unified-search-icon" />
          <input
            type="text"
            placeholder="Buscar líneas de investigación..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredLineas.length === 0 ? (
        <div className="admin-unified-empty">
          <ExperimentOutlined className="admin-unified-empty-icon" />
          <h3 className="admin-unified-empty-title">No hay líneas de investigación</h3>
          <p className="admin-unified-empty-description">
            {searchTerm
              ? "No se encontraron resultados para tu búsqueda."
              : "Comienza creando tu primera línea de investigación."}
          </p>
          {!searchTerm && (
            <button className="admin-unified-primary-btn">
              <PlusOutlined />
              Crear Primera Línea
            </button>
          )}
        </div>
      ) : (
        <div className="admin-unified-table-container">
          <table className="admin-unified-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Estado</th>
                <th>Responsable</th>
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
                    <strong>{linea.titulo}</strong>
                    <br />
                    <small style={{ color: "#64748b", lineHeight: "1.4" }}>
                      {linea.descripcion.substring(0, 100)}...
                    </small>
                  </td>
                  <td>
                    <span className={`admin-unified-badge ${getEstadoBadgeClass(linea.estado)}`}>{linea.estado}</span>
                  </td>
                  <td>
                    <TeamOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                    {linea.responsable}
                  </td>
                  <td>{linea.miembros}</td>
                  <td>
                    <ProjectOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                    {linea.proyectos}
                  </td>
                  <td>{new Date(linea.fechaCreacion).toLocaleDateString()}</td>
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
      )}
    </div>
  )
}

export default AdminLineasInvestigacion