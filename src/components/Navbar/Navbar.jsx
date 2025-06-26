"use client"

import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Drawer, Button } from "antd"
import {
  MenuOutlined,
  BulbOutlined,
  MoonOutlined,
  TranslationOutlined,
  SettingOutlined,
  DownOutlined,
} from "@ant-design/icons"
import { useTheme } from "../../context/ThemeContext"
import "./Navbar.css"
import { Link, useLocation } from "react-router-dom"
import { API_BASE_URL } from "../../config/apiConfig"

const Navbar = ({ activeSection, setActiveSection }) => {
  const [visible, setVisible] = useState(false)
  const [esCelular, setEsCelular] = useState(window.innerWidth < 968)
  const { theme, toggleTheme } = useTheme()
  const [lineas, setLineas] = useState([])
  const location = useLocation()

  // Determine current theme
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchLineas = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/linea-investigacions`)
        const result = await response.json()
        console.log("Líneas recibidas:", result)

        if (result.data && Array.isArray(result.data)) {
          setLineas(result.data)
        }
      } catch (error) {
        console.error("Error al obtener las líneas:", error)
      }
    }

    fetchLineas()
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setEsCelular(window.innerWidth < 968)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleMenuItemClick = (section) => {
    setActiveSection(section)
    if (esCelular) {
      setVisible(false)
    }
  }

  const handleBackofficeAccess = () => {
    alert("Acceso al backoffice - Funcionalidad simulada")
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const isResearchLineActive = () => {
    return location.pathname.includes("/lineas-de-investigacion/")
  }

  return (
    <nav className="futuristic-navbar" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="navbar-grid">
        {/* Logo */}
        <div className="futuristic-logo">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }} onClick={() => handleMenuItemClick("home")}>
            GILIA
          </Link>
        </div>

        {/* Desktop Navigation */}
        {!esCelular && (
          <div className="futuristic-nav">
            <Link
              to="/"
              className={`nav-item-futuristic ${isActive("/") ? "active" : ""}`}
              onClick={() => handleMenuItemClick("home")}
            >
              Inicio
            </Link>

            <div className="research-dropdown">
              <div className={`nav-item-futuristic dropdown-trigger ${isResearchLineActive() ? "active" : ""}`}>
                Investigación
                <DownOutlined style={{ fontSize: "10px" }} />
              </div>
              <div className="dropdown-content">
                {lineas.map((linea) => (
                  <Link
                    key={linea.id}
                    to={`/lineas-de-investigacion/${linea.id}`}
                    className="dropdown-item"
                    onClick={() => handleMenuItemClick(`linea-${linea.id}`)}
                  >
                    {linea.nombre}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/post"
              className={`nav-item-futuristic ${isActive("/post") ? "active" : ""}`}
              onClick={() => handleMenuItemClick("publications")}
            >
              Publicaciones
            </Link>

            <Link
              to="/linea-extension"
              className={`nav-item-futuristic ${isActive("/linea-extension") ? "active" : ""}`}
              onClick={() => handleMenuItemClick("extension")}
            >
              Extensión
            </Link>

            <Link
              to="/about-us"
              className={`nav-item-futuristic ${isActive("/about-us") ? "active" : ""}`}
              onClick={() => handleMenuItemClick("about-us")}
            >
              Equipo
            </Link>

            <Link
              to="/galery"
              className={`nav-item-futuristic ${isActive("/galery") ? "active" : ""}`}
              onClick={() => handleMenuItemClick("galery")}
            >
              Galería
            </Link>
          </div>
        )}

        {/* Desktop Actions */}
        {!esCelular && (
          <div className="nav-actions-futuristic">
            <button onClick={handleBackofficeAccess} className="admin-btn" title="Panel de administración">
              <SettingOutlined />
            </button>
            <button onClick={toggleTheme} className="action-btn" title="Cambiar tema">
              {isDarkTheme ? <BulbOutlined /> : <MoonOutlined />}
            </button>
            <button className="action-btn" title="Idioma">
              <TranslationOutlined />
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        {esCelular && (
          <Button
            className="mobile-menu-trigger"
            type="text"
            icon={<MenuOutlined style={{ fontSize: "18px" }} />}
            onClick={() => setVisible(true)}
          />
        )}
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: isDarkTheme ? "#ffffff" : "#000000",
            }}
          >
            <span
              style={{
                fontFamily: "Anurati-gilia",
                fontSize: "1.3rem",
                letterSpacing: "2px",
                color: isDarkTheme ? "#ffffff" : "#000000",
              }}
            >
              GILIA
            </span>
          </div>
        }
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        className="mobile-drawer"
        data-theme={isDarkTheme ? "dark" : "light"}
        width={280}
      >
        <div>
          <Link to="/" className="mobile-nav-item" onClick={() => handleMenuItemClick("home")}>
            Inicio
          </Link>

          <div className="mobile-research-section">
            <div className="mobile-research-title">Líneas de Investigación</div>
            {lineas.map((linea) => (
              <Link
                key={linea.id}
                to={`/lineas-de-investigacion/${linea.id}`}
                className="mobile-research-item"
                onClick={() => handleMenuItemClick(`linea-${linea.id}`)}
              >
                {linea.nombre}
              </Link>
            ))}
          </div>

          <Link to="/post" className="mobile-nav-item" onClick={() => handleMenuItemClick("publications")}>
            Publicaciones
          </Link>

          <Link to="/linea-extension" className="mobile-nav-item" onClick={() => handleMenuItemClick("extension")}>
            Extensión
          </Link>

          <Link to="/about-us" className="mobile-nav-item" onClick={() => handleMenuItemClick("about-us")}>
            Equipo
          </Link>

          <Link to="/galery" className="mobile-nav-item" onClick={() => handleMenuItemClick("galery")}>
            Galería
          </Link>

          <div className="mobile-actions">
            <button onClick={handleBackofficeAccess} className="action-btn" title="Panel de administración">
              <SettingOutlined />
            </button>
            <button onClick={toggleTheme} className="action-btn" title="Cambiar tema">
              {isDarkTheme ? <BulbOutlined /> : <MoonOutlined />}
            </button>
            <button className="action-btn" title="Idioma">
              <TranslationOutlined />
            </button>
          </div>
        </div>
      </Drawer>
    </nav>
  )
}

Navbar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
}

export default Navbar
