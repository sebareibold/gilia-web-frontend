"use client"

import { useState } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import {
  DashboardOutlined,
  FileTextOutlined,
  TeamOutlined,
  PictureOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
  ExperimentOutlined,
  BranchesOutlined,
} from "@ant-design/icons"
import "../styles/admin-theme.css"

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const { user, logout } = useAuth()
  const { theme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const isDarkTheme = theme.token?.backgroundColor === "#0a0a0a"

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/lineas",
      icon: <ExperimentOutlined />,
      label: "Líneas de Investigación",
    },
    {
      key: "/admin/publicaciones",
      icon: <FileTextOutlined />,
      label: "Publicaciones",
    },
    {
      key: "/admin/proyectos",
      icon: <BranchesOutlined />,
      label: "Proyectos",
    },
    {
      key: "/admin/equipo",
      icon: <TeamOutlined />,
      label: "Equipo",
    },
    {
      key: "/admin/galeria",
      icon: <PictureOutlined />,
      label: "Galería",
    },
    {
      key: "/admin/configuracion",
      icon: <SettingOutlined />,
      label: "Configuración",
    },
  ]

  return (
    <div className={`admin-layout ${isDarkTheme ? "dark" : ""}`}>
      {/* Sidebar */}
      <aside className={`admin-sidebar ${isDarkTheme ? "dark" : ""} ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              G
            </div>
            {!sidebarCollapsed && <span className="ml-3 text-xl font-bold">GILIA Admin</span>}
          </div>

          {/* User Info */}
          {!sidebarCollapsed && (
            <div className="mb-8 p-4 bg-white bg-opacity-20 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">{user?.name?.charAt(0) || "A"}</span>
                </div>
                <div className="ml-3">
                  <p className="font-medium">{user?.name || "Admin"}</p>
                  <p className="text-sm opacity-70">{user?.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.key}
                className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.key
                    ? "bg-white bg-opacity-20 text-blue-600"
                    : "hover:bg-white hover:bg-opacity-10"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="mt-8 pt-8 border-t border-white border-opacity-20">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-red-500 hover:bg-opacity-20 transition-all duration-200 text-red-600"
            >
              <LogoutOutlined className="text-lg" />
              {!sidebarCollapsed && <span className="ml-3">Cerrar Sesión</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white bg-opacity-10 backdrop-blur-lg border-b border-white border-opacity-20 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <MenuOutlined />
            </button>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
              >
                Ver Sitio Público
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <div className="admin-main-content">
            <Outlet />
          </div>
        </main>
      </div>

      <style jsx>{`
        .admin-sidebar {
          width: ${sidebarCollapsed ? "80px" : "280px"};
          transition: width 0.3s ease;
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          z-index: 1000;
        }

        .admin-layout {
          display: flex;
          min-height: 100vh;
        }

        .admin-layout .flex-1 {
          margin-left: ${sidebarCollapsed ? "80px" : "280px"};
          transition: margin-left 0.3s ease;
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            width: ${sidebarCollapsed ? "0" : "280px"};
            transform: translateX(${sidebarCollapsed ? "-100%" : "0"});
          }

          .admin-layout .flex-1 {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default AdminLayout
