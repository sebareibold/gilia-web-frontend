"use client"

import { useState } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import {
  TeamOutlined,
  ProjectOutlined,
  FileTextOutlined,
  ExperimentOutlined,
  PictureOutlined,
  PlusOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
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
      {/* Elementos decorativos futuristas */}
      <div className="admin-home-decorations">
        <div className="floating-element floating-element-1"></div>
        <div className="floating-element floating-element-2"></div>
        <div className="floating-element floating-element-3"></div>
      </div>

      <div className="admin-home-header">
        <div className="admin-welcome-text">
          <div className="admin-welcome-badge">
            <span>Panel de Control</span>
          </div>
          <h1 className="admin-welcome-title">Bienvenido, {user?.name || "Administrador"}</h1>
          <p className="admin-welcome-subtitle">Sistema de Gestión del Grupo de Investigación G.I.L.I.A </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-quick-actions-section">
        <h2 className="admin-section-title">
          <span>Acciones Rápidas</span>
        </h2>
        <div className="admin-quick-actions-grid">
          {quickActions.map((action, index) => (
            <div key={index} className={`admin-quick-action-card ${action.color}`}>
              <div className="admin-quick-action-header">
                <div className="admin-quick-action-icon">{action.icon}</div>
              </div>
              <div className="admin-quick-action-content">
                <h3 className="admin-quick-action-title">{action.title}</h3>
                <p className="admin-quick-action-description">{action.description}</p>
              </div>

              <div className="admin-action-buttons">
                <button className="admin-action-btn admin-action-add">
                  <PlusOutlined />
                  <span>Agregar</span>
                </button>
                <button className="admin-action-btn admin-action-view">
                  <EyeOutlined />
                  <span>Ver</span>
                </button>
                <button className="admin-action-btn admin-action-edit">
                  <EditOutlined />
                  <span>Editar</span>
                </button>
                <button className="admin-action-btn admin-action-delete">
                  <DeleteOutlined />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities 
      <div className="admin-recent-activities-section">
        <h2 className="admin-section-title">
          <span>Actividad Reciente</span>
        </h2>
        <div className="admin-activities-timeline">
          {recentActivities.map((activity, index) => (
            <div key={activity.id} className="admin-activity-item">
              <div className="admin-activity-icon">{activity.icon}</div>
              <div className="admin-activity-content">
                <h4 className="admin-activity-title">{activity.title}</h4>
                <p className="admin-activity-description">{activity.description}</p>
                <span className="admin-activity-time">{activity.time}</span>
              </div>
              <div className="admin-activity-line"></div>
            </div>
          ))}
        </div>
      </div>
      */}
    </div>
  )
}

export default AdminHome
