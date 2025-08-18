"use client"

import { useState, useEffect } from "react"
import {
  AppstoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  UploadOutlined,
  DownloadOutlined,
  CalendarOutlined,
  FileImageOutlined,
  UserOutlined,
} from "@ant-design/icons"
import "../../../styles/admin-unified.css"

const AdminGaleria = () => {
  const [imagenes, setImagenes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")

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
        return "admin-unified-badge-active"
      case "Eventos":
        return "admin-unified-badge-active"
      case "Equipo":
        return "admin-unified-badge-active"
      case "Proyectos":
        return "admin-unified-badge-pending"
      case "Publicaciones":
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
          <p>Cargando galería...</p>
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
          <AppstoreOutlined />
          Galería de Imágenes
        </h1>
        <p className="admin-unified-subtitle">
          Gestiona las imágenes y recursos multimedia del sitio web GILIA. Organiza fotos de eventos, proyectos y
          equipo.
        </p>

        <button className="admin-unified-primary-btn">
          <UploadOutlined />
          Subir Imágenes
        </button>
      </div>

      <div className="admin-unified-filters">
        <div className="admin-unified-search">
          <SearchOutlined className="admin-unified-search-icon" />
          <input
            type="text"
            placeholder="Buscar por título, descripción o tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="admin-unified-filter-select"
        >
          <option value="all">Todas las categorías</option>
          <option value="Laboratorio">Laboratorio</option>
          <option value="Eventos">Eventos</option>
          <option value="Equipo">Equipo</option>
          <option value="Proyectos">Proyectos</option>
          <option value="Publicaciones">Publicaciones</option>
        </select>
      </div>

      {filteredImagenes.length === 0 ? (
        <div className="admin-unified-empty">
          <AppstoreOutlined className="admin-unified-empty-icon" />
          <h3 className="admin-unified-empty-title">No hay imágenes</h3>
          <p className="admin-unified-empty-description">
            {searchTerm || filterCategory !== "all"
              ? "No se encontraron resultados para los filtros aplicados."
              : "Comienza subiendo tu primera imagen a la galería."}
          </p>
          {!searchTerm && filterCategory === "all" && (
            <button className="admin-unified-primary-btn">
              <UploadOutlined />
              Subir Primera Imagen
            </button>
          )}
        </div>
      ) : (
        <div className="admin-unified-table-container">
          <table className="admin-unified-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Información</th>
                <th>Categoría</th>
                <th>Detalles Técnicos</th>
                <th>Autor</th>
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
                    <strong>{imagen.titulo}</strong>
                    <br />
                    <small style={{ color: "#64748b", lineHeight: "1.4" }}>
                      {imagen.descripcion.length > 60
                        ? `${imagen.descripcion.substring(0, 60)}...`
                        : imagen.descripcion}
                    </small>
                    <br />
                    <div style={{ marginTop: "0.25rem" }}>
                      {imagen.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            fontSize: "0.7rem",
                            color: "#667eea",
                            marginRight: "0.5rem",
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`admin-unified-badge ${getCategoriaColor(imagen.categoria)}`}>
                      {imagen.categoria}
                    </span>
                  </td>
                  <td>
                    <FileImageOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                    <small style={{ color: "#64748b" }}>
                      {imagen.formato} • {imagen.tamaño}
                      <br />
                      {imagen.dimensiones}
                    </small>
                  </td>
                  <td>
                    <UserOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                    <small style={{ color: "#64748b" }}>{imagen.autor}</small>
                  </td>
                  <td>
                    <CalendarOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                    <small style={{ color: "#64748b" }}>{new Date(imagen.fechaSubida).toLocaleDateString()}</small>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-table-btn admin-table-btn-view" title="Ver">
                        <EyeOutlined />
                      </button>
                      <button className="admin-table-btn admin-table-btn-view" title="Descargar">
                        <DownloadOutlined />
                      </button>
                      <button className="admin-table-btn admin-table-btn-edit" title="Editar">
                        <EditOutlined />
                      </button>
                      <button
                        className="admin-table-btn admin-table-btn-delete"
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
      )}
    </div>
  )
}

export default AdminGaleria
