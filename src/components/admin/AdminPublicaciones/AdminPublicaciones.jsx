"use client"

import { useState, useEffect } from "react"
import {
  BookOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import "../../../styles/admin-unified.css"

const AdminPublicaciones = () => {
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

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case "Publicado":
        return "admin-unified-badge-active"
      case "Aceptado":
        return "admin-unified-badge-active"
      case "En revisión":
        return "admin-unified-badge-pending"
      case "Rechazado":
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
          <p>Cargando publicaciones...</p>
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
          <BookOutlined />
          Publicaciones
        </h1>
        <p className="admin-unified-subtitle">
          Gestiona las publicaciones científicas del grupo GILIA. Administra artículos, papers, capítulos de libros y
          otras contribuciones académicas.
        </p>

        <button className="admin-unified-primary-btn">
          <PlusOutlined />
          Nueva Publicación
        </button>
      </div>

      <div className="admin-unified-filters">
        <div className="admin-unified-search">
          <SearchOutlined className="admin-unified-search-icon" />
          <input
            type="text"
            placeholder="Buscar por título, autor o revista..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="admin-unified-filter-select"
        >
          <option value="all">Todos los tipos</option>
          <option value="Journal Article">Artículos de revista</option>
          <option value="Conference Paper">Papers de conferencia</option>
          <option value="Book Chapter">Capítulos de libro</option>
          <option value="Review Article">Artículos de revisión</option>
        </select>
      </div>

      {filteredPublicaciones.length === 0 ? (
        <div className="admin-unified-empty">
          <BookOutlined className="admin-unified-empty-icon" />
          <h3 className="admin-unified-empty-title">No hay publicaciones</h3>
          <p className="admin-unified-empty-description">
            {searchTerm || filterType !== "all"
              ? "No se encontraron resultados para los filtros aplicados."
              : "Comienza agregando tu primera publicación."}
          </p>
          {!searchTerm && filterType === "all" && (
            <button className="admin-unified-primary-btn">
              <PlusOutlined />
              Agregar Primera Publicación
            </button>
          )}
        </div>
      ) : (
        <div className="admin-unified-table-container">
          <table className="admin-unified-table">
            <thead>
              <tr>
                <th>Título</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Revista/Conferencia</th>
                <th>Fecha</th>
                <th>Citas</th>
                <th>DOI</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPublicaciones.map((pub) => (
                <tr key={pub.id}>
                  <td>
                    <strong>{pub.titulo}</strong>
                    <br />
                    <small style={{ color: "#64748b" }}>{pub.autores.join(", ")}</small>
                  </td>
                  <td>
                    <span className="admin-unified-badge admin-unified-badge-active">{pub.tipo}</span>
                  </td>
                  <td>
                    <span className={`admin-unified-badge ${getEstadoBadgeClass(pub.estado)}`}>{pub.estado}</span>
                  </td>
                  <td>{pub.revista}</td>
                  <td>{new Date(pub.fechaPublicacion).toLocaleDateString()}</td>
                  <td>{pub.citas}</td>
                  <td>
                    <small style={{ color: "#64748b" }}>{pub.doi}</small>
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
                        onClick={() => handleDelete(pub.id)}
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

export default AdminPublicaciones
