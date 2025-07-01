"use client"
import { 
  ArrowRightOutlined, 
  BookOutlined,
  RobotOutlined,
  ApiOutlined,
  ThunderboltOutlined,
  EyeOutlined,
  BarChartOutlined,
  BulbOutlined,
  SettingOutlined,
  WifiOutlined
} from "@ant-design/icons"
import { useTheme } from "../../../contexts/ThemeContext"
import "./HomePresentation.css"
import { useState, useEffect } from "react"

export default function HomePresentation() {
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  const [showFloating, setShowFloating] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShowFloating(true), 1200)
    return () => clearTimeout(timeout)
  }, [])

  const handleExploreClick = () => {
    const explorationSection = document.querySelector(".exploration-section")
    if (explorationSection) {
      explorationSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleWatchDemo = () => {
    window.location.href = "/post"
  }

  return (
    <section className="home-presentation" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="home-container">
        {/* Contenido principal centrado */}
        <div className="hero-content-centered">
          <h1 className="hero-title">
            <span className="hero-title-normal">Grupo de Investigación en </span>
            <span className="hero-title-highlight">Inteligencia Artificial</span>
            <span className="hero-title-normal"> y </span>
            <span className="hero-title-highlight">Lenguajes</span>
          </h1>

          <p className="hero-description">
            Desarrollamos soluciones innovadoras en inteligencia artificial y procesamiento de lenguaje natural.
          </p>

          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={handleExploreClick}>
              <span>Explorar Investigación</span>
              <ArrowRightOutlined />
            </button>
            <button className="hero-btn-secondary" onClick={handleWatchDemo}>
              <BookOutlined />
              <span>Ver Publicaciones</span>
            </button>
          </div>
        </div>

        {/* Cards flotantes con líneas de investigación */}
        {showFloating && (
          <div className="floating-cards-container">
            {/* Card 1 - Machine Learning */}
            <div className="floating-element floating-element-1" style={{ animationDelay: "0.2s" }}>
              <div className="floating-card">
                <div className="floating-icon">
                  <ThunderboltOutlined className="floating-icon-svg" />
                </div>
                <div className="floating-content">
                  <div className="floating-title">IA Avanzada</div>
                  <div className="floating-subtitle">Machine Learning</div>
                </div>
              </div>
            </div>

            {/* Card 2 - NLP */}
            <div className="floating-element floating-element-2" style={{ animationDelay: "0.4s" }}>
              <div className="floating-card">
                <div className="floating-icon">
                  <ApiOutlined className="floating-icon-svg" />
                </div>
                <div className="floating-content">
                  <div className="floating-title">Procesamiento NLP</div>
                  <div className="floating-subtitle">Natural Language Processing</div>
                </div>
              </div>
            </div>

            {/* Card 3 - Deep Learning */}
            <div className="floating-element floating-element-3" style={{ animationDelay: "0.6s" }}>
              <div className="floating-card">
                <div className="floating-icon">
                  <BulbOutlined className="floating-icon-svg" />
                </div>
                <div className="floating-content">
                  <div className="floating-title">Deep Learning</div>
                  <div className="floating-subtitle">Redes Neuronales Profundas</div>
                </div>
              </div>
            </div>

            {/* Card 4 - Computer Vision */}
            <div className="floating-element floating-element-4" style={{ animationDelay: "0.8s" }}>
              <div className="floating-card">
                <div className="floating-icon">
                  <EyeOutlined className="floating-icon-svg" />
                </div>
                <div className="floating-content">
                  <div className="floating-title">Computer Vision</div>
                  <div className="floating-subtitle">Visión por Computadora</div>
                </div>
              </div>
            </div>

            {/* Card 5 - Data Science */}
            <div className="floating-element floating-element-5" style={{ animationDelay: "1.0s" }}>
              <div className="floating-card">
                <div className="floating-icon">
                  <BarChartOutlined className="floating-icon-svg" />
                </div>
                <div className="floating-content">
                  <div className="floating-title">Data Science</div>
                  <div className="floating-subtitle">Ciencia de Datos</div>
                </div>
              </div>
            </div>

            {/* Card 6 - Sistemas Inteligentes */}
            <div className="floating-element floating-element-6" style={{ animationDelay: "1.2s" }}>
              <div className="floating-card">
                <div className="floating-icon">
                  <SettingOutlined className="floating-icon-svg" />
                </div>
                <div className="floating-content">
                  <div className="floating-title">Sistemas IA</div>
                  <div className="floating-subtitle">Inteligencia Artificial</div>
                </div>
              </div>
            </div>

            {/* Card 7 - Robótica */}
            <div className="floating-element floating-element-7" style={{ animationDelay: "1.4s" }}>
              <div className="floating-card">
                <div className="floating-icon">
                  <RobotOutlined className="floating-icon-svg" />
                </div>
                <div className="floating-content">
                  <div className="floating-title">Robótica</div>
                  <div className="floating-subtitle">Automatización Inteligente</div>
                </div>
              </div>
            </div>

            {/* Card 8 - IoT */}
            <div className="floating-element floating-element-8" style={{ animationDelay: "1.6s" }}>
              <div className="floating-card">
                <div className="floating-icon">
                  <WifiOutlined className="floating-icon-svg" />
                </div>
                <div className="floating-content">
                  <div className="floating-title">Internet de las Cosas</div>
                  <div className="floating-subtitle">Conectividad Inteligente</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
