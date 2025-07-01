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
  ReadOutlined,
  SolutionOutlined,
  StarOutlined,
  FilterOutlined,
} from "@ant-design/icons"

const AdminEquipo = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingMember, setEditingMember] = useState(null)

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
        image: "/placeholder.svg?height=80&width=80",
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
        image: "/placeholder.svg?height=80&width=80",
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
        image: "/placeholder.svg?height=80&width=80",
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
        image: "/placeholder.svg?height=80&width=80",
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
        image: "/placeholder.svg?height=80&width=80",
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

  const getRoleColor = (role) => {
    const colors = {
      Director: "director",
      "Investigador Senior": "senior",
      Investigador: "researcher",
      "Investigador Junior": "junior",
      Desarrollador: "developer",
    }
    return colors[role] || "default"
  }

  const stats = {
    total: teamMembers.length,
    directors: teamMembers.filter((m) => m.role === "Director").length,
    researchers: teamMembers.filter((m) => m.role.includes("Investigador")).length,
    developers: teamMembers.filter((m) => m.role === "Desarrollador").length,
    totalProjects: teamMembers.reduce((sum, m) => sum + m.projects, 0),
    totalPublications: teamMembers.reduce((sum, m) => sum + m.publications, 0),
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
        <p>Cargando equipo...</p>
      </div>
    )
  }

  return (
    <div className="admin-equipo">
      {/* Header */}
      <div className="admin-equipo-header">
        <div className="admin-header-content">
          <h1 className="admin-page-title">
            <TeamOutlined className="admin-title-icon" />
            Gestión del Equipo
          </h1>
          <p className="admin-page-subtitle">Administra los miembros del equipo de investigación GILIA</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => setShowAddModal(true)}>
          <PlusOutlined /> Agregar Miembro
        </button>
      </div>

      {/* Stats Overview */}
      <div className="admin-stats-overview">
        <div className="admin-stat-card total">
          <div className="admin-stat-icon">
            <TeamOutlined />
          </div>
          <div className="admin-stat-content">
            <h3>{stats.total}</h3>
            <p>Total Miembros</p>
          </div>
        </div>

        <div className="admin-stat-card directors">
          <div className="admin-stat-icon">
            <StarOutlined />
          </div>
          <div className="admin-stat-content">
            <h3>{stats.directors}</h3>
            <p>Directores</p>
          </div>
        </div>

        <div className="admin-stat-card researchers">
          <div className="admin-stat-icon">
            <ReadOutlined />
          </div>
          <div className="admin-stat-content">
            <h3>{stats.researchers}</h3>
            <p>Investigadores</p>
          </div>
        </div>

        <div className="admin-stat-card projects">
          <div className="admin-stat-icon">
            <SolutionOutlined />
          </div>
          <div className="admin-stat-content">
            <h3>{stats.totalProjects}</h3>
            <p>Proyectos Activos</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-filters-section">
        <div className="admin-search-container">
          <SearchOutlined className="admin-search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o departamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-search-input"
          />
        </div>

        <div className="admin-filter-container">
          <FilterOutlined className="admin-filter-icon" />
          <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="admin-filter-select">
            {roles.map((role) => (
              <option key={role} value={role}>
                {role === "all" ? "Todos los roles" : role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="admin-team-grid">
        {filteredMembers.map((member) => (
          <div key={member.id} className="admin-team-card">
            <div className="admin-team-card-header">
              <div className="admin-member-avatar">
                <img src={member.image || "/placeholder.svg"} alt={member.name} />
              </div>
              <div className="admin-member-basic">
                <h3 className="admin-member-name">{member.name}</h3>
                <span className={`admin-member-role ${getRoleColor(member.role)}`}>{member.role}</span>
              </div>
              <div className="admin-member-actions">
                <button className="admin-action-btn edit" onClick={() => setEditingMember(member)} title="Editar">
                  <EditOutlined />
                </button>
                <button className="admin-action-btn delete" title="Eliminar">
                  <DeleteOutlined />
                </button>
              </div>
            </div>

            <div className="admin-team-card-body">
              <div className="admin-member-info">
                <div className="admin-info-section">
                  <h4>Información de Contacto</h4>
                  <div className="admin-info-item">
                    <MailOutlined />
                    <span>{member.email}</span>
                  </div>
                  <div className="admin-info-item">
                    <PhoneOutlined />
                    <span>{member.phone}</span>
                  </div>
                </div>

                <div className="admin-info-section">
                  <h4>Detalles Académicos</h4>
                  <div className="admin-info-item">
                    <SolutionOutlined />
                    <span>{member.department}</span>
                  </div>
                  <div className="admin-info-item">
                    <ReadOutlined />
                    <span>{member.education}</span>
                  </div>
                </div>

                <div className="admin-info-section">
                  <h4>Especialización</h4>
                  <p className="admin-specialization">{member.specialization}</p>
                </div>

                <div className="admin-member-stats">
                  <div className="admin-member-stat">
                    <span className="admin-stat-number">{member.projects}</span>
                    <span className="admin-stat-label">Proyectos</span>
                  </div>
                  <div className="admin-member-stat">
                    <span className="admin-stat-number">{member.publications}</span>
                    <span className="admin-stat-label">Publicaciones</span>
                  </div>
                  <div className="admin-member-stat">
                    <span className="admin-stat-number">{member.experience}</span>
                    <span className="admin-stat-label">Experiencia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <div className="admin-empty-state">
          <TeamOutlined className="admin-empty-icon" />
          <h3>No se encontraron miembros</h3>
          <p>No hay miembros que coincidan con los criterios de búsqueda.</p>
        </div>
      )}
    </div>
  )
}

export default AdminEquipo
