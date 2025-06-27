"use client"
import { BulbOutlined, ArrowRightOutlined, PlayCircleOutlined } from "@ant-design/icons"
import { useTheme } from "../../../context/ThemeContext"
import "./HomePresentation.css"

export default function HomePresentation() {
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  const handleExploreClick = () => {
    const explorationSection = document.querySelector(".exploration-section")
    if (explorationSection) {
      explorationSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleWatchDemo = () => {
    alert("Demo de video - Funcionalidad por implementar")
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
              <PlayCircleOutlined />
              <span>Ver Demo</span>
            </button>
          </div>
        </div>

        {/* Cards flotantes con líneas de investigación */}
        <div className="floating-cards-container">
          {/* Card 1 - Machine Learning */}
          <div className="floating-element floating-element-1">
            <div className="floating-card">
              <div className="floating-icon">
                <span className="icon-letter">ML</span>
              </div>
              <div className="floating-content">
                <div className="floating-title">IA Avanzada</div>
                <div className="floating-subtitle">Machine Learning</div>
              </div>
            </div>
          </div>

          {/* Card 2 - NLP */}
          <div className="floating-element floating-element-2">
            <div className="floating-card">
              <div className="floating-icon">
                <span className="icon-letter">NLP</span>
              </div>
              <div className="floating-content">
                <div className="floating-title">Procesamiento NLP</div>
                <div className="floating-subtitle">Natural Language Processing</div>
              </div>
            </div>
          </div>

          {/* Card 3 - Deep Learning */}
          <div className="floating-element floating-element-3">
            <div className="floating-card">
              <div className="floating-icon">
                <span className="icon-letter">DL</span>
              </div>
              <div className="floating-content">
                <div className="floating-title">Deep Learning</div>
                <div className="floating-subtitle">Redes Neuronales Profundas</div>
              </div>
            </div>
          </div>

          {/* Card 4 - Computer Vision */}
          <div className="floating-element floating-element-4">
            <div className="floating-card">
              <div className="floating-icon">
                <span className="icon-letter">CV</span>
              </div>
              <div className="floating-content">
                <div className="floating-title">Computer Vision</div>
                <div className="floating-subtitle">Visión por Computadora</div>
              </div>
            </div>
          </div>

          {/* Card 5 - Data Science */}
          <div className="floating-element floating-element-5">
            <div className="floating-card">
              <div className="floating-icon">
                <span className="icon-letter">DS</span>
              </div>
              <div className="floating-content">
                <div className="floating-title">Data Science</div>
                <div className="floating-subtitle">Ciencia de Datos</div>
              </div>
            </div>
          </div>

          {/* Card 6 - Sistemas Inteligentes */}
          <div className="floating-element floating-element-6">
            <div className="floating-card">
              <div className="floating-icon">
                <span className="icon-letter">IA</span>
              </div>
              <div className="floating-content">
                <div className="floating-title">Sistemas IA</div>
                <div className="floating-subtitle">Inteligencia Artificial</div>
              </div>
            </div>
          </div>

          {/* Card 7 - Robótica */}
          <div className="floating-element floating-element-7">
            <div className="floating-card">
              <div className="floating-icon">
                <span className="icon-letter">RB</span>
              </div>
              <div className="floating-content">
                <div className="floating-title">Robótica</div>
                <div className="floating-subtitle">Automatización Inteligente</div>
              </div>
            </div>
          </div>

          {/* Card 8 - IoT - Movida más arriba */}
          <div className="floating-element floating-element-8">
            <div className="floating-card">
              <div className="floating-icon">
                <span className="icon-letter">IoT</span>
              </div>
              <div className="floating-content">
                <div className="floating-title">Internet de las Cosas</div>
                <div className="floating-subtitle">Conectividad Inteligente</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
