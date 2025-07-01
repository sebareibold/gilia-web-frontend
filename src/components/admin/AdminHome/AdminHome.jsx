import { Link } from "react-router-dom"
import {
  ExperimentOutlined,
  BookOutlined,
  BranchesOutlined,
  UserOutlined,
  AppstoreOutlined,
  EditOutlined,
  EyeOutlined,
  BarChartOutlined,
} from "@ant-design/icons"
import "./AdminHome.css"

const AdminHome = () => {
  // Datos simulados para las estadísticas
  const stats = [
    {
      title: "Líneas de Investigación",
      count: 8,
      icon: <ExperimentOutlined />,
      color: "#667eea",
    },
    {
      title: "Publicaciones",
      count: 24,
      icon: <BookOutlined />,
      color: "#764ba2",
    },
    {
      title: "Proyectos Activos",
      count: 12,
      icon: <BranchesOutlined />,
      color: "#f093fb",
    },
    {
      title: "Miembros del Equipo",
      count: 15,
      icon: <UserOutlined />,
      color: "#f5576c",
    },
  ]

  const sections = [
    {
      title: "Líneas de Investigación",
      description: "Gestiona las líneas de investigación del grupo, sus objetivos y metodologías.",
      icon: <ExperimentOutlined />,
      count: "8 líneas activas",
      color: "#667eea",
      actions: [
        { label: "Ver todas", to: "/admin/lineas", icon: <EyeOutlined /> },
        { label: "Crear nueva", to: "/admin/lineas/crear", icon: <ExperimentOutlined /> },
      ],
    },
    {
      title: "Publicaciones",
      description: "Administra artículos, papers y publicaciones científicas del grupo.",
      icon: <BookOutlined />,
      count: "24 publicaciones",
      color: "#764ba2",
      actions: [
        { label: "Ver todas", to: "/admin/publicaciones", icon: <EyeOutlined /> },
        { label: "Agregar nueva", to: "/admin/publicaciones/crear", icon: <BookOutlined /> },
      ],
    },
    {
      title: "Proyectos",
      description: "Controla los proyectos de investigación en curso y finalizados.",
      icon: <BranchesOutlined />,
      count: "12 proyectos activos",
      color: "#f093fb",
      actions: [
        { label: "Ver todos", to: "/admin/proyectos", icon: <EyeOutlined /> },
        { label: "Nuevo proyecto", to: "/admin/proyectos/crear", icon: <BranchesOutlined /> },
      ],
    },
    {
      title: "Equipo",
      description: "Gestiona los miembros del equipo, sus roles y perfiles académicos.",
      icon: <UserOutlined />,
      count: "15 miembros",
      color: "#f5576c",
      actions: [
        { label: "Ver equipo", to: "/admin/equipo", icon: <EyeOutlined /> },
        { label: "Agregar miembro", to: "/admin/equipo/crear", icon: <UserOutlined /> },
      ],
    },
    {
      title: "Galería",
      description: "Administra las imágenes y recursos multimedia del sitio web.",
      icon: <AppstoreOutlined />,
      count: "45 imágenes",
      color: "#4facfe",
      actions: [
        { label: "Ver galería", to: "/admin/galeria", icon: <EyeOutlined /> },
        { label: "Subir imágenes", to: "/admin/galeria/subir", icon: <AppstoreOutlined /> },
      ],
    },
    {
      title: "Configuración",
      description: "Ajusta la configuración general del sitio y preferencias del sistema.",
      icon: <BarChartOutlined />,
      count: "Sistema configurado",
      color: "#43e97b",
      actions: [{ label: "Ver configuración", to: "/admin/configuracion", icon: <EditOutlined /> }],
    },
  ]

  return (
    <div className="admin-home">
      {/* Header */}
      <div className="admin-home-header">
        <div className="admin-home-header-content">
          <h1 className="admin-home-title">Panel de Administración</h1>
          <p className="admin-home-subtitle">
            Bienvenido al sistema de gestión de contenido de GILIA. Desde aquí puedes administrar todos los aspectos del
            sitio web del grupo de investigación.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="admin-home-stats">
        <div className="admin-home-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="admin-stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
              <div className="admin-stat-icon" style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className="admin-stat-content">
                <div className="admin-stat-value">{stat.count}</div>
                <div className="admin-stat-title">{stat.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Sections */}
      <div className="admin-home-sections">
        <div className="admin-sections-grid">
          {sections.map((section, index) => (
            <div key={index} className="admin-section-card">
              <div className="admin-section-header">
                <div className="admin-section-icon" style={{ color: section.color }}>
                  {section.icon}
                </div>
                <div className="admin-section-info">
                  <h3 className="admin-section-title">{section.title}</h3>
                  <span
                    className="admin-section-count"
                    style={{ backgroundColor: `${section.color}20`, color: section.color }}
                  >
                    {section.count}
                  </span>
                </div>
              </div>
              <p className="admin-section-description">{section.description}</p>
              <div className="admin-section-actions">
                {section.actions.map((action, actionIndex) => (
                  <Link
                    key={actionIndex}
                    to={action.to}
                    className="admin-action-button"
                    style={{
                      borderColor: section.color,
                      color: section.color,
                    }}
                  >
                    {action.icon}
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminHome
