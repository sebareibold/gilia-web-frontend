"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import {
  ExperimentOutlined,
  BookOutlined,
  BranchesOutlined,
  TeamOutlined,
  PictureOutlined,
  TrophyOutlined,
} from "@ant-design/icons"

const AdminDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    researchLines: 0,
    posts: 0,
    extensions: 0,
    teamMembers: 0,
    galleryItems: 0,
    projects: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Aquí puedes hacer llamadas a la API para obtener estadísticas
        // Por ahora, usamos datos simulados
        setStats({
          researchLines: 7,
          posts: 25,
          extensions: 12,
          teamMembers: 15,
          galleryItems: 48,
          projects: 18,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Líneas de Investigación",
      value: stats.researchLines,
      icon: <ExperimentOutlined />,
      color: "#1890ff",
    },
    {
      title: "Publicaciones",
      value: stats.posts,
      icon: <BookOutlined />,
      color: "#52c41a",
    },
    {
      title: "Proyectos de Extensión",
      value: stats.extensions,
      icon: <BranchesOutlined />,
      color: "#faad14",
    },
    {
      title: "Miembros del Equipo",
      value: stats.teamMembers,
      icon: <TeamOutlined />,
      color: "#722ed1",
    },
    {
      title: "Elementos de Galería",
      value: stats.galleryItems,
      icon: <PictureOutlined />,
      color: "#eb2f96",
    },
    {
      title: "Proyectos Totales",
      value: stats.projects,
      icon: <TrophyOutlined />,
      color: "#fa541c",
    },
  ]

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <div>Cargando estadísticas...</div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "600" }}>Dashboard</h1>
        <p style={{ margin: "8px 0 0 0", color: "var(--admin-text-secondary)" }}>
          Bienvenido de vuelta, {user?.name || user?.email}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        {statCards.map((card, index) => (
          <div
            key={index}
            className="admin-card"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "24px",
            }}
          >
            <div
              style={{
                fontSize: "32px",
                color: card.color,
                backgroundColor: `${card.color}15`,
                padding: "16px",
                borderRadius: "8px",
              }}
            >
              {card.icon}
            </div>
            <div>
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "600",
                  color: "var(--admin-text-primary)",
                }}
              >
                {card.value}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "var(--admin-text-secondary)",
                }}
              >
                {card.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h2 style={{ marginBottom: "16px" }}>Acciones Rápidas</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
          }}
        >
          <button className="admin-btn admin-btn-primary">Nueva Línea de Investigación</button>
          <button className="admin-btn admin-btn-primary">Nueva Publicación</button>
          <button className="admin-btn admin-btn-primary">Nuevo Proyecto de Extensión</button>
          <button className="admin-btn admin-btn-primary">Agregar Miembro del Equipo</button>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
