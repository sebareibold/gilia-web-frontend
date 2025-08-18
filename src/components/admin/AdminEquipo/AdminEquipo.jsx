"use client"

import { useState, useEffect } from "react"
import {
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons"
import "../../../styles/admin-unified.css"

const AdminEquipo = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")

  // Mock data
  useEffect(() => {
    const mockMembers = [
      {
        id: 1,
        name: "Dr. Ana María González",
        email: "ana.gonzalez@gilia.com",
        phone: "+57 300 123 4567",
        role: "Director",
        department: "Inteligencia Artificial",
        specialization: "Machine Learning, Deep Learning",
        education: "PhD en Ciencias de la Computación",
        experience: "15 años",
        projects: 8,
        publications: 25,
        status: "active",
        joinDate: "2020-01-15",
      },
      {
        id: 2,
        name: "Dr. Carlos Rodríguez",
        email: "carlos.rodriguez@gilia.com",
        phone: "+57 301 234 5678",
        role: "Investigador Senior",
        department: "Robótica",
        specialization: "Robótica Autónoma, Visión Computacional",
        education: "PhD en Ingeniería Mecatrónica",
        experience: "12 años",
        projects: 6,
        publications: 18,
        status: "active",
        joinDate: "2020-03-20",
      },
      {
        id: 3,
        name: "Dra. Laura Martínez",
        email: "laura.martinez@gilia.com",
        phone: "+57 302 345 6789",
        role: "Investigador",
        department: "Procesamiento de Lenguaje Natural",
        specialization: "NLP, Análisis de Sentimientos",
        education: "PhD en Lingüística Computacional",
        experience: "8 años",
        projects: 4,
        publications: 12,
        status: "active",
        joinDate: "2021-06-10",
      },
      {
        id: 4,
        name: "Ing. Miguel Torres",
        email: "miguel.torres@gilia.com",
        phone: "+57 303 456 7890",
        role: "Desarrollador",
        department: "Desarrollo de Software",
        specialization: "Full Stack Development, DevOps",
        education: "Maestría en Ingeniería de Software",
        experience: "5 años",
        projects: 10,
        publications: 3,
        status: "active",
        joinDate: "2022-01-15",
      },
      {
        id: 5,
        name: "Dra. Sofia Herrera",
        email: "sofia.herrera@gilia.com",
        phone: "+57 304 567 8901",
        role: "Investigador Junior",
        department: "Bioinformática",
        specialization: "Análisis de Datos Genómicos",
        education: "PhD en Bioinformática",
        experience: "3 años",
        projects: 2,
        publications: 8,
        status: "active",
        joinDate: "2023-02-01",
      },
    ]

    setTimeout(() => {
      setTeamMembers(mockMembers)
      setLoading(false)
    }, 1000)
  }, [])

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || member.role === filterRole
    return matchesSearch && matchesRole
  })

  const roles = ["all", "Director", "Investigador Senior", "Investigador", "Investigador Junior", "Desarrollador"]

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando equipo...</p>
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
          <TeamOutlined />
          Gestión del Equipo
        </h1>
        <p className="admin-unified-subtitle">Administra los miembros del equipo de investigación GILIA</p>

        <button className="admin-unified-primary-btn">
          <PlusOutlined /> Agregar Miembro
        </button>
      </div>

      <div className="admin-unified-filters">
        <div className="admin-unified-search">
          <SearchOutlined className="admin-unified-search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o departamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="admin-unified-filter-select"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role === "all" ? "Todos los roles" : role}
            </option>
          ))}
        </select>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="admin-unified-empty">
          <TeamOutlined className="admin-unified-empty-icon" />
          <h3 className="admin-unified-empty-title">No se encontraron miembros</h3>
          <p className="admin-unified-empty-description">
            No hay miembros que coincidan con los criterios de búsqueda.
          </p>
        </div>
      ) : (
        <div className="admin-unified-table-container">
          <table className="admin-unified-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Departamento</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Proyectos</th>
                <th>Publicaciones</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td>
                    <strong>{member.name}</strong>
                    <br />
                    <small style={{ color: "#64748b" }}>{member.education}</small>
                  </td>
                  <td>
                    <span className={`admin-unified-badge admin-unified-badge-active`}>{member.role}</span>
                  </td>
                  <td>{member.department}</td>
                  <td>
                    <MailOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                    {member.email}
                  </td>
                  <td>
                    <PhoneOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                    {member.phone}
                  </td>
                  <td>{member.projects}</td>
                  <td>{member.publications}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-table-btn admin-table-btn-edit" title="Editar">
                        <EditOutlined />
                      </button>
                      <button className="admin-table-btn admin-table-btn-delete" title="Eliminar">
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

export default AdminEquipo
