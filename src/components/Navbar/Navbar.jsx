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
import { useTheme } from "../../contexts/ThemeContext"
import { Link, useLocation } from "react-router-dom"
import { API_BASE_URL } from "../../config/apiConfig"
import "./Navbar.css"

const Navbar = ({ activeSection, setActiveSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [lineas, setLineas] = useState([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchLineas = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/linea-investigacions`)
        const result = await response.json()
        if (result.data && Array.isArray(result.data)) {
          setLineas(result.data)
        }
      } catch (error) {
        console.error("Error al obtener las líneas:", error)
        // Fallback con datos mock
        setLineas([
          { id: 1, nombre: "Ontologías y Web Semántica" },
          { id: 2, nombre: "Procesamiento de Lenguaje Natural" },
          { id: 3, nombre: "Sistemas Inteligentes" },
          { id: 4, nombre: "Robótica y Sistemas Embebidos" },
          { id: 5, nombre: "Educación en Ciencias de la Computación" },
          { id: 6, nombre: "Lenguajes de Programación" },
          { id: 7, nombre: "Ética en Ciencias de la Computación" },
        ])
      }
    }

    fetchLineas()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100

      setScrolled(scrollTop > 50)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
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

  const handleMenuItemClick = (section) => {
    setActiveSection(section)
    setMobileMenuOpen(false)
  }

  const handleBackofficeAccess = () => {
    window.location.href = "/admin/dashboard"
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const isResearchLineActive = () => {
    return location.pathname.includes("/lineas-de-investigacion/")
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
      active: isResearchLineActive(),
      dropdown: lineas.map((linea) => ({
        label: linea.nombre,
        path: `/lineas-de-investigacion/${linea.id}`,
      })),
    },
    {
      label: "Publicaciones",
      path: "/post",
      icon: <BookOutlined />,
      active: isActive("/post"),
    },
    {
      label: "Extensión",
      path: "/linea-extension",
      icon: <BranchesOutlined />,
      active: isActive("/linea-extension"),
    },
    {
      label: "Equipo",
      path: "/about-us",
      icon: <TeamOutlined />,
      active: isActive("/about-us"),
    },
    {
      label: "Galería",
      path: "/galery",
      icon: <PictureOutlined />,
      active: isActive("/galery"),
    },
  ]

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scroll" : ""}`} data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo" onClick={() => handleMenuItemClick("home")}>
            <div className="navbar-logo-icon">G</div>
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
                          onClick={() => handleMenuItemClick(`linea-${dropdownIndex + 1}`)}
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
                    onClick={() => handleMenuItemClick(item.label.toLowerCase())}
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

        {/* Barra de progreso de scroll */}
        <div className="navbar-progress" style={{ width: `${scrollProgress}%` }}></div>
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
                        onClick={() => handleMenuItemClick(`linea-${dropdownIndex + 1}`)}
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
                  onClick={() => handleMenuItemClick(item.label.toLowerCase())}
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
