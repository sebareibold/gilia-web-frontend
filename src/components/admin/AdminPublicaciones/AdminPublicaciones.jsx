"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  BookOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
} from "@ant-design/icons"

const Publicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    setTimeout(() => {
      setPublicaciones([
        {
          id: 1,
          titulo: "Machine Learning Applications in Quantum Computing",
          autores: ["Dr. María García", "Dr. Juan Pérez", "Ing. Ana López"],
          tipo: "Journal Article",
          revista: "Nature Quantum Information",
          fechaPublicacion: "2023-09-15",
          estado: "Publicado",
          doi: "10.1038/s41534-023-00123-4",
          citas: 15,
        },
        {
          id: 2,
          titulo: "Blockchain Security in IoT Networks: A Comprehensive Survey",
          autores: ["Dr. Carlos Rodríguez", "Dra. Laura Martínez"],
          tipo: "Conference Paper",
          revista: "IEEE International Conference on IoT",
          fechaPublicacion: "2023-11-20",
          estado: "Aceptado",
          doi: "10.1109/IoT.2023.456789",
          citas: 8,
        },
        {
          id: 3,
          titulo: "Virtual Reality in Medical Education: Current Trends and Future Prospects",
          autores: ["Dra. Sofia Hernández", "Dr. Miguel Torres", "Ing. Patricia Silva"],
          tipo: "Review Article",
          revista: "Medical Education Technology",
          fechaPublicacion: "2023-08-10",
          estado: "Publicado",
          doi: "10.1016/j.medt.2023.08.001",
          citas: 23,
        },
        {
          id: 4,
          titulo: "Artificial Intelligence Ethics in Healthcare Applications",
          autores: ["Dr. Roberto Vega", "Dra. Carmen Ruiz"],
          tipo: "Book Chapter",
          revista: "AI Ethics Handbook - Springer",
          fechaPublicacion: "2023-12-05",
          estado: "En revisión",
          doi: "Pendiente",
          citas: 0,
        },
        {
          id: 5,
          titulo: "Cybersecurity Frameworks for Smart Cities",
          autores: ["Ing. Fernando Castro", "Dr. Elena Morales", "Dra. Isabel Jiménez"],
          tipo: "Journal Article",
          revista: "Smart Cities Journal",
          fechaPublicacion: "2023-10-30",
          estado: "Publicado",
          doi: "10.1080/23789689.2023.2123456",
          citas: 12,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
      setPublicaciones(publicaciones.filter((pub) => pub.id !== id))
    }
  }

  const filteredPublicaciones = publicaciones.filter((pub) => {
    const matchesSearch =
      pub.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.autores.some((autor) => autor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.revista.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterType === "all" || pub.tipo === filterType

    return matchesSearch && matchesFilter
  })

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "Publicado":
        return "#43e97b"
      case "Aceptado":
        return "#667eea"
      case "En revisión":
        return "#ffa726"
      case "Rechazado":
        return "#f5576c"
      default:
        return "#764ba2"
    }
  }

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case "Journal Article":
        return "#667eea"
      case "Conference Paper":
        return "#f093fb"
      case "Book Chapter":
        return "#43e97b"
      case "Review Article":
        return "#ffa726"
      default:
        return "#764ba2"
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <BookOutlined style={{ fontSize: "2rem", marginRight: "1rem" }} />
          Cargando publicaciones...
        </div>
      </div>
    )
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">
          <BookOutlined style={{ marginRight: "0.5rem" }} />
          Publicaciones
        </h1>
        <p className="admin-page-subtitle">
          Gestiona las publicaciones científicas del grupo GILIA. Administra artículos, papers, capítulos de libros y
          otras contribuciones académicas.
        </p>
        <div className="admin-page-actions">
          <Link to="/admin/publicaciones/crear" className="admin-btn admin-btn-primary">
            <PlusOutlined />
            Nueva Publicación
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
              placeholder="Buscar por título, autor o revista..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-form-input"
              style={{ paddingLeft: "3rem" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FilterOutlined style={{ color: "rgba(255, 255, 255, 0.8)" }} />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="admin-form-select"
              style={{ minWidth: "200px" }}
            >
              <option value="all">Todos los tipos</option>
              <option value="Journal Article">Artículos de revista</option>
              <option value="Conference Paper">Papers de conferencia</option>
              <option value="Book Chapter">Capítulos de libro</option>
              <option value="Review Article">Artículos de revisión</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredPublicaciones.length === 0 ? (
        <div className="admin-content-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <BookOutlined />
            </div>
            <h3 className="admin-empty-title">No hay publicaciones</h3>
            <p className="admin-empty-description">
              {searchTerm || filterType !== "all"
                ? "No se encontraron resultados para los filtros aplicados."
                : "Comienza agregando tu primera publicación."}
            </p>
            {!searchTerm && filterType === "all" && (
              <Link to="/admin/publicaciones/crear" className="admin-btn admin-btn-primary">
                <PlusOutlined />
                Agregar Primera Publicación
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {filteredPublicaciones.map((pub) => (
            <div key={pub.id} className="admin-content-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        backgroundColor: `${getTipoColor(pub.tipo)}20`,
                        color: getTipoColor(pub.tipo),
                        border: `1px solid ${getTipoColor(pub.tipo)}40`,
                      }}
                    >
                      {pub.tipo}
                    </span>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "20px",
                        fontSize: "0.75rem",
                        fontWeight: "500",
                        backgroundColor: `${getEstadoColor(pub.estado)}20`,
                        color: getEstadoColor(pub.estado),
                        border: `1px solid ${getEstadoColor(pub.estado)}40`,
                      }}
                    >
                      {pub.estado}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#ffffff", margin: "0 0 0.5rem 0" }}>
                    {pub.titulo}
                  </h3>

                  <p style={{ color: "rgba(255, 255, 255, 0.8)", margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>
                    <strong>Autores:</strong> {pub.autores.join(", ")}
                  </p>

                  <p style={{ color: "rgba(255, 255, 255, 0.8)", margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}>
                    <strong>Revista/Conferencia:</strong> {pub.revista}
                  </p>

                  <div style={{ display: "flex", gap: "2rem", fontSize: "0.85rem", color: "rgba(255, 255, 255, 0.7)" }}>
                    <span>
                      <strong>Fecha:</strong> {new Date(pub.fechaPublicacion).toLocaleDateString()}
                    </span>
                    <span>
                      <strong>DOI:</strong> {pub.doi}
                    </span>
                    <span>
                      <strong>Citas:</strong> {pub.citas}
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
                    onClick={() => handleDelete(pub.id)}
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
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#43e97b", marginBottom: "0.5rem" }}>
              {publicaciones.filter((p) => p.estado === "Publicado").length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>Publicadas</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#667eea", marginBottom: "0.5rem" }}>
              {publicaciones.filter((p) => p.estado === "Aceptado").length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>Aceptadas</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#ffa726", marginBottom: "0.5rem" }}>
              {publicaciones.filter((p) => p.estado === "En revisión").length}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>En Revisión</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "700", color: "#f093fb", marginBottom: "0.5rem" }}>
              {publicaciones.reduce((acc, p) => acc + p.citas, 0)}
            </div>
            <div style={{ color: "rgba(255, 255, 255, 0.8)" }}>Total Citas</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Publicaciones
