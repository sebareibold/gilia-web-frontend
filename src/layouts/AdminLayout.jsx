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
  MenuOutlined,
} from "@ant-design/icons"
import "../styles/admin-theme.css"

const MENU_ITEMS = [
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

const useMobileMenu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return { mobileMenuOpen, setMobileMenuOpen }
}

const useBodyStyles = () => {
  useEffect(() => {
    const originalPadding = document.body.style.paddingTop
    const originalBackground = document.body.style.background
    const originalColor = document.body.style.color

    document.body.style.paddingTop = "0px"
    document.body.style.background = "transparent"
    document.body.style.color = "#1e293b"

    return () => {
      document.body.style.paddingTop = originalPadding
      document.body.style.background = originalBackground
      document.body.style.color = originalColor
    }
  }, [])
}

const MobileAppBar = ({ user, isMenuOpen, onToggleMenu }) => (
  <div className="mobile-appbar">
    <div className="mobile-appbar-content">
      <div className="mobile-user-display">
        <span className="mobile-username">{user?.name || "Admin"}</span>
      </div>
      <button
        className="mobile-menu-toggle"
        onClick={onToggleMenu}
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        <MenuOutlined />
      </button>
    </div>

    {isMenuOpen && (
      <div className="mobile-dropdown-menu">
        {MENU_ITEMS.map((item) => (
          <Link key={item.key} to={item.key} className="mobile-dropdown-item" onClick={onToggleMenu}>
            <span className="mobile-item-icon">{item.icon}</span>
            <span className="mobile-item-label">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={() => {
            onToggleMenu()
            // handleLogout will be passed from parent
          }}
          className="mobile-dropdown-item mobile-logout"
        >
          <LogoutOutlined className="mobile-item-icon" />
          <span className="mobile-item-label">Cerrar Sesión</span>
        </button>
      </div>
    )}
  </div>
)

const MobileMenuButton = ({ isOpen, onToggle }) => (
  <button className="mobile-hamburger-button" onClick={onToggle} aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}>
    <div className={`hamburger-lines ${isOpen ? "open" : ""}`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </button>
)

const UserHeader = ({ user, sidebarOpen, onToggleSidebar }) => (
  <div className="admin-user-header">
    <div className={`admin-user-info-inline ${sidebarOpen ? "expanded" : "collapsed"}`}>
      {sidebarOpen && (
        <div className="admin-user-details">
          <p className="admin-user-name">{user?.name || "Admin"}</p>
          <p className="admin-user-email">{user?.email || "admin@gilia.com"}</p>
        </div>
      )}
    </div>

    <button
      className="admin-sidebar-toggle"
      onClick={onToggleSidebar}
      title={sidebarOpen ? "Plegar sidebar" : "Expandir sidebar"}
      aria-label={sidebarOpen ? "Plegar sidebar" : "Expandir sidebar"}
    >
      {sidebarOpen ? <LeftOutlined /> : <RightOutlined />}
    </button>
  </div>
)

const Navigation = ({ currentPath }) => (
  <nav className="admin-navigation">
    {MENU_ITEMS.map((item) => (
      <Link
        key={item.key}
        to={item.key}
        className={`admin-nav-item ${
          currentPath === item.key || (item.key === "/admin" && currentPath === "/admin") ? "active" : ""
        }`}
        title={item.label}
      >
        <span className="admin-nav-icon">{item.icon}</span>
        <span className="admin-nav-label">{item.label}</span>
      </Link>
    ))}
  </nav>
)

const LogoutSection = ({ onLogout }) => (
  <div className="admin-logout-section">
    <button onClick={onLogout} className="admin-logout-button" title="Cerrar Sesión" aria-label="Cerrar Sesión">
      <LogoutOutlined className="admin-nav-icon" />
      <span className="admin-nav-label">Cerrar Sesión</span>
    </button>
  </div>
)

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu()

  useBodyStyles()

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  return (
    <div className="admin-layout-gradient">
      <div className="mobile-only">
        <MobileAppBar user={user} isMenuOpen={mobileMenuOpen} onToggleMenu={toggleMobileMenu} />
      </div>

      {mobileMenuOpen && <div className="mobile-simple-overlay" onClick={() => setMobileMenuOpen(false)} />}

      <aside className={`admin-sidebar-transparent ${sidebarOpen ? "" : "collapsed"} desktop-only`}>
        <div className="admin-sidebar-content">
          <UserHeader user={user} sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />

          <Navigation currentPath={location.pathname} />

          <LogoutSection onLogout={handleLogout} />
        </div>
      </aside>

      <div className={`admin-main-wrapper ${sidebarOpen ? "expanded" : "collapsed"}`}>
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
