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
import { useTranslation } from "react-i18next"
import { useLanguageNavigation } from "../../../hooks/useLanguageNavigation"
import TranslatedText from "../../../components/common/TranslatedText/TranslatedText"
import "./Navbar.css"
import { getResearchLines } from "../../../services"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [researchLines, setResearchLines] = useState([])
  const { theme, toggleTheme, isDarkTheme } = useTheme()
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const { langPath, toggleLanguage, currentLang } = useLanguageNavigation()

  useEffect(() => {
    const fetchLines = async () => {
      try {
        const res = await getResearchLines()
        // res puede ser array o {data: array} segun la implementacion; soportamos ambos
        const lines = Array.isArray(res) ? res : (res?.data || [])
        setResearchLines(lines)
      } catch (error) {
        console.error("Error al obtener las lineas:", error)
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

  const isActive = (path) => {
    return location.pathname === path || location.pathname === langPath(path)
  }

  const navigationItems = [
    {
      label: t("navbar.home"),
      path: langPath("/"),
      icon: <HomeOutlined />,
      active: isActive("/"),
    },
    {
      label: t("navbar.research"),
      icon: <ExperimentOutlined />,
      active: location.pathname.includes("/research-lines"),
      dropdown: researchLines.map((line) => ({
        label: line.title || line.nombre,
        path: langPath(`/research-lines/${line.id}`),
      })),
    },
    {
      label: t("navbar.publications"),
      path: langPath("/posts"),
      icon: <BookOutlined />,
      active: isActive("/posts"),
    },
    {
      label: t("navbar.extension"),
      path: langPath("/extentions-lines"),
      icon: <BranchesOutlined />,
      active: isActive("/extentions-lines"),
    },
    {
      label: t("navbar.team"),
      path: langPath("/about"),
      icon: <TeamOutlined />,
      active: isActive("/about"),
    },
  ]

  return (
    <>
      <nav className="navbar" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to={langPath("/")} className="navbar-logo" onClick={() => handleMenuItemClick()}>
            <span>GILIA</span>
          </Link>

          {/* Navegacion principal - Desktop */}
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
                          <TranslatedText>{dropdownItem.label}</TranslatedText>
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

            <button onClick={toggleTheme} className="navbar-action-btn" title={t("navbar.changeTheme")}>
              {isDarkTheme ? <BulbOutlined /> : <MoonOutlined />}
            </button>
            <button onClick={toggleLanguage} className="navbar-action-btn" title={t("navbar.language")}>
              <TranslationOutlined />
              <span style={{ fontSize: "0.7rem", marginLeft: "4px", fontWeight: "600", textTransform: "uppercase" }}>
                {currentLang === 'es' ? 'EN' : 'ES'}
              </span>
            </button>
          </div>

          {/* Boton menu movil */}
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

      {/* Menu movil */}
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
                        <TranslatedText>{dropdownItem.label}</TranslatedText>
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

          <button onClick={toggleTheme} className="btn btn-secondary btn-sm">
            {isDarkTheme ? <BulbOutlined /> : <MoonOutlined />}
            {t("navbar.theme")}
          </button>
          <button onClick={toggleLanguage} className="btn btn-secondary btn-sm">
            <TranslationOutlined />
            {currentLang === 'es' ? 'English' : 'Espanol'}
          </button>
        </div>
      </div>

      {/* Overlay para cerrar menu movil */}
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
