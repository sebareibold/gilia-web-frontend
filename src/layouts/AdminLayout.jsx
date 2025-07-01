"use client"

import { useState, useEffect } from "react"
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import {
  SettingOutlined,
  LogoutOutlined,
  ExperimentOutlined,
  BranchesOutlined,
  BookOutlined,
  UserOutlined,
  AppstoreOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons"
import "../styles/admin-theme.css"

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const originalPadding = document.body.style.paddingTop
    const originalBackground = document.body.style.background
    const originalColor = document.body.style.color

    // Forzar tema claro para el área administrativa
    document.body.style.paddingTop = "0px"
    document.body.style.background = "transparent"
    document.body.style.color = "#000000"

    return () => {
      document.body.style.paddingTop = originalPadding
      document.body.style.background = originalBackground
      document.body.style.color = originalColor
    }
  }, [])

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  const menuItems = [
    {
      key: "/admin",
      icon: <AppstoreOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/lineas",
      icon: <ExperimentOutlined />,
      label: "Líneas de Investigación",
    },
    {
      key: "/admin/publicaciones",
      icon: <BookOutlined />,
      label: "Publicaciones",
    },
    {
      key: "/admin/proyectos",
      icon: <BranchesOutlined />,
      label: "Proyectos",
    },
    {
      key: "/admin/equipo",
      icon: <UserOutlined />,
      label: "Equipo",
    },
    {
      key: "/admin/galeria",
      icon: <AppstoreOutlined />,
      label: "Galería",
    },
    {
      key: "/admin/configuracion",
      icon: <SettingOutlined />,
      label: "Configuración",
    },
  ]

  return (
    <div className="admin-layout-gradient">
      {/* Sidebar */}
      <aside className={`admin-sidebar-transparent ${sidebarOpen ? "" : "collapsed"}`}>
        <div className="admin-sidebar-content">
          {/* Botón de plegar */}
          <button
            className="admin-sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "Plegar sidebar" : "Expandir sidebar"}
            aria-label={sidebarOpen ? "Plegar sidebar" : "Expandir sidebar"}
          >
            {sidebarOpen ? <LeftOutlined /> : <RightOutlined />}
          </button>

          {/* Logo */}
          <div className="admin-logo-section">
            <div className="admin-logo-icon">G</div>
            <span className="admin-logo-text">GILIA Admin</span>
          </div>

          {/* User Info */}
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              <span>{user?.name?.charAt(0) || "A"}</span>
            </div>
            <div className="admin-user-details">
              <p className="admin-user-name">{user?.name || "Admin"}</p>
              <p className="admin-user-email">{user?.email || "admin@gilia.com"}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="admin-navigation">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.key}
                className={`admin-nav-item ${
                  location.pathname === item.key || (item.key === "/admin" && location.pathname === "/admin")
                    ? "active"
                    : ""
                }`}
                title={item.label}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                <span className="admin-nav-label">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="admin-logout-section">
            <button
              onClick={handleLogout}
              className="admin-logout-button"
              title="Cerrar Sesión"
              aria-label="Cerrar Sesión"
            >
              <LogoutOutlined className="admin-nav-icon" />
              <span className="admin-nav-label">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main-wrapper" style={{ marginLeft: sidebarOpen ? "280px" : "80px" }}>
        {/* Page Content */}
        <main className="admin-page-content">
          <div className="admin-content-wrapper">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
