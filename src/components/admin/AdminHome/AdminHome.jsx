"use client"

import { useState } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import {
  DashboardOutlined,
  TeamOutlined,
  ProjectOutlined,
  FileTextOutlined,
  ExperimentOutlined,
  PictureOutlined,
} from "@ant-design/icons"
import "./AdminHome.css"

const AdminHome = () => {
  const { user } = useAuth()

  const [recentActivities] = useState([
    {
      id: 1,
      type: "project",
      title: "Nuevo proyecto de IA agregado",
      description: "Sistema de reconocimiento de patrones",
      time: "Hace 2 horas",
      icon: <ProjectOutlined />,
    },
    {
      id: 2,
      type: "publication",
      title: "Publicación actualizada",
      description: "Machine Learning en Medicina",
      time: "Hace 4 horas",
      icon: <FileTextOutlined />,
    },
    {
      id: 3,
      type: "team",
      title: "Nuevo miembro del equipo",
      description: "Dr. María González se unió al equipo",
      time: "Hace 1 día",
      icon: <TeamOutlined />,
    },
    {
      id: 4,
      type: "gallery",
      title: "Imágenes agregadas",
      description: "5 nuevas imágenes del laboratorio",
      time: "Hace 2 días",
      icon: <PictureOutlined />,
    },
  ])

  const quickActions = [
    {
      title: "Gestionar Equipo",
      description: "Agregar o editar miembros del equipo",
      icon: <TeamOutlined />,
      path: "/admin/equipo",
      color: "blue",
    },
    {
      title: "Nuevo Proyecto",
      description: "Crear un nuevo proyecto de investigación",
      icon: <ProjectOutlined />,
      path: "/admin/proyectos",
      color: "green",
    },
    {
      title: "Líneas de Investigación",
      description: "Administrar áreas de investigación",
      icon: <ExperimentOutlined />,
      path: "/admin/lineas-investigacion",
      color: "purple",
    },
    {
      title: "Publicaciones",
      description: "Gestionar artículos y publicaciones",
      icon: <FileTextOutlined />,
      path: "/admin/publicaciones",
      color: "orange",
    },
  ]

  return (
    <div className="admin-home">
      {/* Header Section */}
      <div className="admin-home-header">
        <div className="admin-welcome">
          <div className="admin-welcome-content">
            <h1 className="admin-welcome-title">Bienvenido, {user?.name || "Administrador"}</h1>
            <p className="admin-welcome-subtitle">Panel de control del Grupo de Investigación GILIA</p>
          </div>
          <div className="admin-welcome-icon">
            <DashboardOutlined />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-quick-actions-section">
        <h2 className="admin-section-title">Acciones Rápidas</h2>
        <div className="admin-quick-actions-grid">
          {quickActions.map((action, index) => (
            <div key={index} className={`admin-quick-action-card ${action.color}`}>
              <div className="admin-quick-action-icon">{action.icon}</div>
              <div className="admin-quick-action-content">
                <h3 className="admin-quick-action-title">{action.title}</h3>
                <p className="admin-quick-action-description">{action.description}</p>
              </div>
              <button className="admin-quick-action-button">Ir a sección</button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="admin-activity-section">
        <h2 className="admin-section-title">Actividad Reciente</h2>
        <div className="admin-activity-list">
          {recentActivities.map((activity) => (
            <div key={activity.id} className={`admin-activity-item ${activity.type}`}>
              <div className="admin-activity-icon">{activity.icon}</div>
              <div className="admin-activity-content">
                <h4 className="admin-activity-title">{activity.title}</h4>
                <p className="admin-activity-description">{activity.description}</p>
                <span className="admin-activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="admin-system-section">
        <h2 className="admin-section-title">Estado del Sistema</h2>
        <div className="admin-system-grid">
          <div className="admin-system-card">
            <div className="admin-system-header">
              <h3>Rendimiento</h3>
              <div className="admin-system-status good">Excelente</div>
            </div>
            <div className="admin-system-progress">
              <div className="admin-progress-bar">
                <div className="admin-progress-fill" style={{ width: "92%" }}></div>
              </div>
              <span className="admin-progress-text">92%</span>
            </div>
          </div>

          <div className="admin-system-card">
            <div className="admin-system-header">
              <h3>Almacenamiento</h3>
              <div className="admin-system-status warning">Moderado</div>
            </div>
            <div className="admin-system-progress">
              <div className="admin-progress-bar">
                <div className="admin-progress-fill warning" style={{ width: "68%" }}></div>
              </div>
              <span className="admin-progress-text">68%</span>
            </div>
          </div>

          <div className="admin-system-card">
            <div className="admin-system-header">
              <h3>Seguridad</h3>
              <div className="admin-system-status good">Seguro</div>
            </div>
            <div className="admin-system-progress">
              <div className="admin-progress-bar">
                <div className="admin-progress-fill" style={{ width: "98%" }}></div>
              </div>
              <span className="admin-progress-text">98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
