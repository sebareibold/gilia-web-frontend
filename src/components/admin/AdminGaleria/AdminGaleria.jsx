"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  AppstoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  FilterOutlined,
  UploadOutlined,
  DownloadOutlined,
  UnorderedListOutlined,
  CalendarOutlined,
  FileImageOutlined,
  UserOutlined,
} from "@ant-design/icons"

const Galeria = () => {
  const [imagenes, setImagenes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid") // grid or list

  useEffect(() => {
    setTimeout(() => {
      setImagenes([
        {
          id: 1,
          titulo: "Laboratorio de IA",
          descripcion: "Espacio de trabajo del equipo de Inteligencia Artificial",
          categoria: "Laboratorio",
          url: "/placeholder.svg?height=300&width=400",
          fechaSubida: "2023-09-15",
          tamaño: "2.5 MB",
          dimensiones: "1920x1080",
          formato: "JPG",
          tags: ["laboratorio", "IA", "workspace"],
          autor: "Dr. María García",
        },
        {
          id: 2,
          titulo: "Conferencia IEEE 2023",
          descripcion: "Presentación del proyecto de blockchain en la conferencia IEEE",
          categoria: "Eventos",
          url: "/placeholder.svg?height=300&width=400",
          fechaSubida: "2023-11-20",
          tamaño: "3.1 MB",
          dimensiones: "2048x1536",
          formato: "PNG",
          tags: ["conferencia", "blockchain", "presentación"],
          autor: "Dr. Carlos Rodríguez",
        },
        {
          id: 3,
          titulo: "Equipo GILIA 2023",
          descripcion: "Foto oficial del equipo de investigación GILIA",
          categoria: "Equipo",
          url: "/placeholder.svg?height=300&width=400",
          fechaSubida: "2023-08-10",
          tamaño: "4.2 MB",
          dimensiones: "3000x2000",
          formato: "JPG",
          tags: ["equipo", "oficial", "grupo"],
          autor: "Fotografía profesional",
        },
        {
          id: 4,
          titulo: "Prototipo IoT",
          descripcion: "Dispositivo IoT desarrollado para monitoreo ambiental",
          categoria: "Proyectos",
          url: "/placeholder.svg?height=300&width=400",
          fechaSubida: "2023-12-05",
          tamaño: "1.8 MB",
          dimensiones: "1600x1200",
          formato: "JPG",
          tags: ["IoT", "prototipo", "sensores"],
          autor: "Ing. Fernando Castro",
        },
        {
          id: 5,
          titulo: "Simulación VR",
          descripcion: "Captura de pantalla del simulador de realidad virtual",
          categoria: "Proyectos",
          url: "/placeholder.svg?height=300&width=400",
          fechaSubida: "2023-10-30",
          tamaño: "2.9 MB",
          dimensiones: "1920x1080",
          formato: "PNG",
          tags: ["VR", "simulación", "medicina"],
          autor: "Dra. Sofia Hernández",
        },
        {
          id: 6,
          titulo: "Workshop Quantum Computing",
          descripcion: "Taller sobre computación cuántica para estudiantes",
          categoria: "Eventos",
          url: "/placeholder.svg?height=300&width=400",
          fechaSubida: "2023-07-22",
          tamaño: "3.5 MB",
          dimensiones: "2560x1440",
          formato: "JPG",
          tags: ["workshop", "quantum", "educación"],
          autor: "Dr. Juan Pérez",
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta imagen?")) {
      setImagenes(imagenes.filter((imagen) => imagen.id !== id))
    }
  }

  const filteredImagenes = imagenes.filter((imagen) => {
    const matchesSearch =
      imagen.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      imagen.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      imagen.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesFilter = filterCategory === "all" || imagen.categoria === filterCategory

    return matchesSearch && matchesFilter
  })

  const getCategoriaColor = (categoria) => {
    switch (categoria) {
      case "Laboratorio":
        return "#667eea"
      case "Eventos":
        return "#06b6d4"
      case "Equipo":
        return "#10b981"
      case "Proyectos":
        return "#f59e0b"
      case "Publicaciones":
        return "#ef4444"
      default:
        return "#64748b"
    }
  }

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <AppstoreOutlined style={{ fontSize: "2rem", marginRight: "1rem" }} />
          Cargando galería...
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
              <AppstoreOutlined style={{ marginRight: "0.5rem" }} />
              Galería de Imágenes
            </h1>
            <p className="admin-page-subtitle">
              Gestiona las imágenes y recursos multimedia del sitio web GILIA. Organiza fotos de eventos, proyectos y
              equipo.
            </p>
          </div>
          <div className="admin-page-actions">
            <Link to="/admin/galeria/subir" className="admin-btn admin-btn-primary">
              <UploadOutlined />
              Subir Imágenes
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="admin-content-card">
        <h3 style={{ fontSize: "1.25rem", fontWeight: "600", color: "#1e293b", marginBottom: "1.5rem" }}>
          Resumen de la Galería
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
              {imagenes.filter((i) => i.categoria === "Laboratorio").length}
            </div>
            <div style={{ color: "#64748b", fontWeight: "500" }}>Laboratorio</div>
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
              {imagenes.filter((i) => i.categoria === "Eventos").length}
            </div>
            <div style={{ color: "#64748b", fontWeight: "500" }}>Eventos</div>
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
              {imagenes.filter((i) => i.categoria === "Equipo").length}
            </div>
            <div style={{ color: "#64748b", fontWeight: "500" }}>Equipo</div>
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
              {imagenes.filter((i) => i.categoria === "Proyectos").length}
            </div>
            <div style={{ color: "#64748b", fontWeight: "500" }}>Proyectos</div>
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
              placeholder="Buscar por título, descripción o tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-form-input"
              style={{ paddingLeft: "3rem" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FilterOutlined style={{ color: "#64748b" }} />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="admin-form-select"
              style={{ minWidth: "180px" }}
            >
              <option value="all">Todas las categorías</option>
              <option value="Laboratorio">Laboratorio</option>
              <option value="Eventos">Eventos</option>
              <option value="Equipo">Equipo</option>
              <option value="Proyectos">Proyectos</option>
              <option value="Publicaciones">Publicaciones</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className={`admin-btn ${viewMode === "grid" ? "admin-btn-primary" : "admin-btn-warning"}`}
              style={{ padding: "0.5rem", minWidth: "auto" }}
              onClick={() => setViewMode("grid")}
              title="Vista en cuadrícula"
            >
              <AppstoreOutlined />
            </button>
            <button
              className={`admin-btn ${viewMode === "list" ? "admin-btn-primary" : "admin-btn-warning"}`}
              style={{ padding: "0.5rem", minWidth: "auto" }}
              onClick={() => setViewMode("list")}
              title="Vista en lista"
            >
              <UnorderedListOutlined />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      {filteredImagenes.length === 0 ? (
        <div className="admin-content-card">
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <AppstoreOutlined />
            </div>
            <h3 className="admin-empty-title">No hay imágenes</h3>
            <p className="admin-empty-description">
              {searchTerm || filterCategory !== "all"
                ? "No se encontraron resultados para los filtros aplicados."
                : "Comienza subiendo tu primera imagen a la galería."}
            </p>
            {!searchTerm && filterCategory === "all" && (
              <Link to="/admin/galeria/subir" className="admin-btn admin-btn-primary">
                <UploadOutlined />
                Subir Primera Imagen
              </Link>
            )}
          </div>
        </div>
      ) : viewMode === "grid" ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "1.5rem" }}>
          {filteredImagenes.map((imagen) => (
            <div key={imagen.id} className="admin-content-card">
              {/* Imagen */}
              <div style={{ position: "relative", marginBottom: "1.5rem" }}>
                <img
                  src={imagen.url || "/placeholder.svg"}
                  alt={imagen.titulo}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "12px",
                    border: "1px solid rgba(102, 126, 234, 0.1)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <button
                    className="admin-btn admin-btn-primary"
                    style={{ padding: "0.5rem", minWidth: "auto", fontSize: "0.8rem" }}
                    title="Ver imagen completa"
                  >
                    <EyeOutlined />
                  </button>
                  <button
                    className="admin-btn admin-btn-success"
                    style={{ padding: "0.5rem", minWidth: "auto", fontSize: "0.8rem" }}
                    title="Descargar"
                  >
                    <DownloadOutlined />
                  </button>
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    left: "0.75rem",
                  }}
                >
                  <span
                    style={{
                      padding: "0.25rem 0.75rem",
                      borderRadius: "20px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      backgroundColor: `${getCategoriaColor(imagen.categoria)}`,
                      color: "#ffffff",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {imagen.categoria}
                  </span>
                </div>
              </div>

              {/* Información principal */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: "600", color: "#1e293b", margin: "0 0 0.5rem 0" }}>
                  {imagen.titulo}
                </h3>
                <p style={{ color: "#64748b", margin: "0 0 1rem 0", fontSize: "0.9rem", lineHeight: "1.4" }}>
                  {imagen.descripcion}
                </p>
              </div>

              {/* Metadatos */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: "600", color: "#64748b", marginBottom: "0.75rem" }}>
                  Información Técnica
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.85rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <FileImageOutlined style={{ color: "#667eea", width: "14px" }} />
                    <span style={{ color: "#64748b" }}>
                      <strong>Formato:</strong> {imagen.formato}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "#64748b" }}>
                      <strong>Tamaño:</strong> {imagen.tamaño}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ color: "#64748b" }}>
                      <strong>Dimensiones:</strong> {imagen.dimensiones}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <CalendarOutlined style={{ color: "#f59e0b", width: "14px" }} />
                    <span style={{ color: "#64748b" }}>{new Date(imagen.fechaSubida).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: "600", color: "#64748b", marginBottom: "0.5rem" }}>
                  Etiquetas
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {imagen.tags.map((tag, index) => (
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
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(102, 126, 234, 0.1)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem" }}>
                  <UserOutlined style={{ color: "#64748b", width: "14px" }} />
                  <span style={{ color: "#64748b" }}>Por: {imagen.autor}</span>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="admin-btn admin-btn-warning"
                    style={{ padding: "0.5rem", minWidth: "auto", fontSize: "0.8rem" }}
                    title="Editar"
                  >
                    <EditOutlined />
                  </button>
                  <button
                    className="admin-btn admin-btn-danger"
                    style={{ padding: "0.5rem", minWidth: "auto", fontSize: "0.8rem" }}
                    title="Eliminar"
                    onClick={() => handleDelete(imagen.id)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="admin-content-card">
          <div className="admin-table">
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Información</th>
                  <th>Categoría</th>
                  <th>Detalles Técnicos</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredImagenes.map((imagen) => (
                  <tr key={imagen.id}>
                    <td>
                      <img
                        src={imagen.url || "/placeholder.svg"}
                        alt={imagen.titulo}
                        style={{
                          width: "80px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: "1px solid rgba(102, 126, 234, 0.1)",
                        }}
                      />
                    </td>
                    <td>
                      <div>
                        <div style={{ fontWeight: "600", marginBottom: "0.25rem", color: "#1e293b" }}>
                          {imagen.titulo}
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                          {imagen.descripcion.length > 60
                            ? `${imagen.descripcion.substring(0, 60)}...`
                            : imagen.descripcion}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "0.25rem" }}>
                          Por: {imagen.autor}
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          padding: "0.25rem 0.75rem",
                          borderRadius: "20px",
                          fontSize: "0.75rem",
                          fontWeight: "500",
                          backgroundColor: `${getCategoriaColor(imagen.categoria)}15`,
                          color: getCategoriaColor(imagen.categoria),
                          border: `1px solid ${getCategoriaColor(imagen.categoria)}30`,
                        }}
                      >
                        {imagen.categoria}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: "0.85rem", color: "#64748b" }}>
                        <div>
                          {imagen.formato} • {imagen.tamaño}
                        </div>
                        <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{imagen.dimensiones}</div>
                      </div>
                    </td>
                    <td style={{ fontSize: "0.85rem", color: "#64748b" }}>
                      {new Date(imagen.fechaSubida).toLocaleDateString()}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          className="admin-btn admin-btn-primary"
                          style={{ padding: "0.4rem", minWidth: "auto", fontSize: "0.8rem" }}
                          title="Ver"
                        >
                          <EyeOutlined />
                        </button>
                        <button
                          className="admin-btn admin-btn-success"
                          style={{ padding: "0.4rem", minWidth: "auto", fontSize: "0.8rem" }}
                          title="Descargar"
                        >
                          <DownloadOutlined />
                        </button>
                        <button
                          className="admin-btn admin-btn-warning"
                          style={{ padding: "0.4rem", minWidth: "auto", fontSize: "0.8rem" }}
                          title="Editar"
                        >
                          <EditOutlined />
                        </button>
                        <button
                          className="admin-btn admin-btn-danger"
                          style={{ padding: "0.4rem", minWidth: "auto", fontSize: "0.8rem" }}
                          title="Eliminar"
                          onClick={() => handleDelete(imagen.id)}
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
    </div>
  )
}

export default Galeria
