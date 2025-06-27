"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { apiService } from "../../services/api"
import {
  ExperimentOutlined,
  FileTextOutlined,
  TeamOutlined,
  PictureOutlined,
  BranchesOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons"

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    lineasInvestigacion: 0,
    publicaciones: 0,
    proyectos: 0,
    miembros: 0,
    extensiones: 0,
    imagenes: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiService.getDashboardStats()
        if (response.success) {
          setStats(response.data)
        }
      } catch (error) {
        console.error("Error al cargar estadísticas:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statsCards = [
    {
      title: "Líneas de Investigación",
      value: stats.lineasInvestigacion,
      icon: <ExperimentOutlined />,
      color: "from-blue-500 to-blue-600",
      link: "/admin/lineas",
    },
    {
      title: "Publicaciones",
      value: stats.publicaciones,
      icon: <FileTextOutlined />,
      color: "from-green-500 to-green-600",
      link: "/admin/publicaciones",
    },
    {
      title: "Proyectos",
      value: stats.proyectos,
      icon: <BranchesOutlined />,
      color: "from-purple-500 to-purple-600",
      link: "/admin/proyectos",
    },
    {
      title: "Miembros del Equipo",
      value: stats.miembros,
      icon: <TeamOutlined />,
      color: "from-orange-500 to-orange-600",
      link: "/admin/equipo",
    },
    {
      title: "Extensiones",
      value: stats.extensiones,
      icon: <BranchesOutlined />,
      color: "from-teal-500 to-teal-600",
      link: "/admin/extensiones",
    },
    {
      title: "Imágenes en Galería",
      value: stats.imagenes,
      icon: <PictureOutlined />,
      color: "from-pink-500 to-pink-600",
      link: "/admin/galeria",
    },
  ]

  const quickActions = [
    {
      title: "Nueva Línea de Investigación",
      description: "Agregar una nueva línea de investigación",
      icon: <ExperimentOutlined />,
      link: "/admin/lineas/nueva",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Nueva Publicación",
      description: "Crear una nueva publicación",
      icon: <FileTextOutlined />,
      link: "/admin/publicaciones/nueva",
      color: "from-green-500 to-green-600",
    },
    {
      title: "Nuevo Miembro",
      description: "Agregar un miembro al equipo",
      icon: <TeamOutlined />,
      link: "/admin/equipo/nuevo",
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Subir Imágenes",
      description: "Agregar imágenes a la galería",
      icon: <PictureOutlined />,
      link: "/admin/galeria/subir",
      color: "from-pink-500 to-pink-600",
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-white text-opacity-80">Bienvenido al panel de administración de GILIA</p>
        </div>
        <Link
          to="/"
          className="flex items-center px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors text-white"
        >
          <EyeOutlined className="mr-2" />
          Ver Sitio Público
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        {statsCards.map((card, index) => (
          <Link key={index} to={card.link} className="admin-stat-card group">
            <div
              className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center text-white text-xl mb-4 mx-auto`}
            >
              {card.icon}
            </div>
            <div className="admin-stat-number">{card.value}</div>
            <div className="admin-stat-label">{card.title}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link} className="admin-card group">
              <div
                className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center text-white text-xl mb-4`}
              >
                {action.icon}
              </div>
              <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600">{action.description}</p>
              <div className="mt-4 flex items-center text-blue-600 text-sm font-medium">
                <PlusOutlined className="mr-1" />
                Crear nuevo
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Actividad Reciente</h2>
        <div className="admin-card">
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <ExperimentOutlined className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Nueva línea de investigación creada</p>
                  <p className="text-sm text-gray-600">Hace 2 horas</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <FileTextOutlined className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Publicación actualizada</p>
                  <p className="text-sm text-gray-600">Hace 5 horas</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <TeamOutlined className="text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Nuevo miembro agregado al equipo</p>
                  <p className="text-sm text-gray-600">Hace 1 día</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
