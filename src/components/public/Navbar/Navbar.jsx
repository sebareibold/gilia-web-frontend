"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  BulbOutlined,
  MoonOutlined,
  TranslationOutlined,
  SettingOutlined,
  DownOutlined,
  ExperimentOutlined,
  BookOutlined,
  BranchesOutlined,
  TeamOutlined,
  PictureOutlined,
  HomeOutlined,
} from "@ant-design/icons"
import { useTheme } from "../../../contexts/ThemeContext"
import { Link, useLocation } from "react-router-dom"
import "./Navbar.css"
import { dataService } from "../../../services/dataService"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [researchLines, setResearchLines] = useState([])
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchLines = async () => {
      try {
        const res = await dataService.getResearchLines()
        setResearchLines(res.data)
      } catch (error) {
        console.error("Error al obtener las líneas:", error)
      }
    }
    fetchLines()
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const handleMenuItemClick = () => {
    setMobileMenuOpen(false)
  }

  const handleBackofficeAccess = () => {
    window.location.href = "/admin/login"
  }

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    return location.pathname.startsWith(path)
  }

  const navigationItems = [
    {
      label: "Inicio",
      path: "/",
      icon: <HomeOutlined />,
      active: isActive("/"),
    },
    {
      label: "Investigación",
      icon: <ExperimentOutlined />,
      active: location.pathname.startsWith("/research-lines"),
      dropdown: researchLines.map((linea) => ({
        label: linea.nombre,
        path: `/research-lines/${linea.id}`,
      })),
    },
    {
      label: "Publicaciones",
      path: "/posts",
      icon: <BookOutlined />,
      active: isActive("/posts"),
    },
    {
      label: "Extensión",
      path: "/extension",
      icon: <BranchesOutlined />,
      active: location.pathname.startsWith("/extension"),
    },
    {
      label: "Equipo",
      path: "/about",
      icon: <TeamOutlined />,
      active: isActive("/about"),
    },
    {
      label: "Galería",
      path: "/gallery",
      icon: <PictureOutlined />,
      active: isActive("/gallery"),
    },
  ]

  return (
    <>
      <nav className="navbar" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={() => handleMenuItemClick()}>
            <span>GILIA</span>
          </Link>

          {/* Navegación principal - Desktop */}
          <ul className="navbar-nav">
            {navigationItems.map((item, index) => (
              <li key={index} className="navbar-nav-item">
                {item.dropdown ? (
                  <div className="navbar-dropdown">
                    <div className={`navbar-nav-link ${item.active ? "active" : ""}`}>
                      {item.icon}
                      <span>{item.label}</span>
                      <DownOutlined style={{ fontSize: "10px" }} />
                    </div>
                    <div className="navbar-dropdown-content">
                      {item.dropdown.map((dropdownItem, dropdownIndex) => (
                        <Link
                          key={dropdownIndex}
                          to={dropdownItem.path}
                          className="navbar-dropdown-item"
                          onClick={() => handleMenuItemClick()}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`navbar-nav-link ${item.active ? "active" : ""}`}
                    onClick={() => handleMenuItemClick()}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Acciones - Desktop */}
          <div className="navbar-actions">
            <button onClick={handleBackofficeAccess} className="navbar-action-btn" title="Panel de administración">
              <SettingOutlined />
            </button>
            <button onClick={toggleTheme} className="navbar-action-btn" title="Cambiar tema">
              {isDarkTheme ? <BulbOutlined /> : <MoonOutlined />}
            </button>
            <button className="navbar-action-btn" title="Idioma">
              <TranslationOutlined />
            </button>
          </div>

          {/* Botón menú móvil */}
          <button
            className={`navbar-mobile-toggle ${mobileMenuOpen ? "active" : ""}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={`navbar-mobile-menu ${mobileMenuOpen ? "active" : ""}`}
        data-theme={isDarkTheme ? "dark" : "light"}
      >
        <div className="navbar-mobile-nav">
          {navigationItems.map((item, index) => (
            <div key={index} className="navbar-mobile-nav-item">
              {item.dropdown ? (
                <>
                  <div className={`navbar-mobile-nav-link ${item.active ? "active" : ""}`}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <div className="navbar-mobile-dropdown">
                    {item.dropdown.map((dropdownItem, dropdownIndex) => (
                      <Link
                        key={dropdownIndex}
                        to={dropdownItem.path}
                        className="navbar-mobile-dropdown-item"
                        onClick={() => handleMenuItemClick()}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`navbar-mobile-nav-link ${item.active ? "active" : ""}`}
                  onClick={() => handleMenuItemClick()}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="navbar-mobile-actions">
          <button onClick={handleBackofficeAccess} className="btn btn-secondary btn-sm">
            <SettingOutlined />
            Admin
          </button>
          <button onClick={toggleTheme} className="btn btn-secondary btn-sm">
            {isDarkTheme ? <BulbOutlined /> : <MoonOutlined />}
            Tema
          </button>
          <button className="btn btn-secondary btn-sm">
            <TranslationOutlined />
            Idioma
          </button>
        </div>
      </div>

      {/* Overlay para cerrar menú móvil */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[998]" onClick={() => setMobileMenuOpen(false)} />
      )}
    </>
  )
}

Navbar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
}

export default Navbar
