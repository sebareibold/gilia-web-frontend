"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"
import {
  DashboardOutlined,
  ExperimentOutlined,
  BookOutlined,
  BranchesOutlined,
  TeamOutlined,
  PictureOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
  BulbOutlined,
  MoonOutlined,
} from "@ant-design/icons"
import "../styles/admin-theme.css"

const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

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
      key: "/admin/research-lines",
      icon: <ExperimentOutlined />,
      label: "Líneas de Investigación",
    },
    {
      key: "/admin/posts",
      icon: <BookOutlined />,
      label: "Publicaciones",
    },
    {
      key: "/admin/extensions",
      icon: <BranchesOutlined />,
      label: "Extensión",
    },
    {
      key: "/admin/team",
      icon: <TeamOutlined />,
      label: "Equipo",
    },
    {
      key: "/admin/gallery",
      icon: <PictureOutlined />,
      label: "Galería",
    },
    {
      key: "/admin/settings",
      icon: <SettingOutlined />,
      label: "Configuración",
    },
  ]

  return (
    <div className="admin-layout" data-theme={isDarkTheme ? "dark" : "light"}>
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "mobile-open" : ""}`}>
        <div className="admin-sidebar-logo">
          <Link to="/admin/dashboard">GILIA Admin</Link>
        </div>

        <nav className="admin-sidebar-menu">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.key}
              className={`admin-menu-item ${location.pathname === item.key ? "active" : ""}`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="admin-menu-item-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <button
              className="admin-btn admin-btn-secondary"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ display: "none" }}
            >
              <MenuOutlined />
            </button>
            <h1 className="admin-header-title">Panel de Administración</h1>
          </div>

          <div className="admin-header-actions">
            <button onClick={toggleTheme} className="admin-btn admin-btn-secondary" title="Cambiar tema">
              {isDarkTheme ? <BulbOutlined /> : <MoonOutlined />}
            </button>

            <div className="admin-user-info">
              <span>Bienvenido, {user?.name || user?.email}</span>
            </div>

            <button onClick={handleLogout} className="admin-logout-btn">
              <LogoutOutlined /> Cerrar Sesión
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="admin-content">{children}</main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[999] md:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default AdminLayout
