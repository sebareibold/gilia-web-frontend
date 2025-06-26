"use client"

import { useState, useEffect } from "react"
import {
  TeamOutlined,
  BookOutlined,
  ExperimentOutlined,
  BulbOutlined,
  ArrowRightOutlined,
  PlayCircleOutlined,
  DownOutlined,
} from "@ant-design/icons"
import { useTheme } from "../../../context/ThemeContext"
import "./HomePresentation.css"

export default function HomePresentation() {
  const [stats, setStats] = useState({
    projects: 0,
    publications: 0,
    researchers: 0,
  })
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  // Animación de contadores
  useEffect(() => {
    const animateCounter = (target, key, duration = 2000) => {
      const start = 0
      const increment = target / (duration / 16)
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        setStats((prev) => ({ ...prev, [key]: Math.floor(current) }))
      }, 16)
    }

    const timer = setTimeout(() => {
      animateCounter(25, "projects")
      animateCounter(150, "publications")
      animateCounter(12, "researchers")
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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
        <div className="hero-content">
          {/* Contenido principal */}
          <div className="hero-text">
            <div className="hero-badge">
              <BulbOutlined />
              <span>Investigación de Vanguardia</span>
            </div>

            <h1 className="hero-title">
              Grupo de Investigación en <span className="hero-title-highlight">Inteligencia Artificial</span> y
              Lenguajes
            </h1>

            <p className="hero-description">
              Desarrollamos soluciones innovadoras en inteligencia artificial, procesamiento de lenguaje natural y
              sistemas inteligentes. Nuestro equipo multidisciplinario trabaja en proyectos que impactan positivamente
              en la sociedad y avanzan el conocimiento científico.
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

            {/* Estadísticas */}
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-number">{stats.projects}+</span>
                <span className="hero-stat-label">Proyectos Activos</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">{stats.publications}+</span>
                <span className="hero-stat-label">Publicaciones</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-number">{stats.researchers}</span>
                <span className="hero-stat-label">Investigadores</span>
              </div>
            </div>
          </div>

          {/* Sección visual */}
          <div className="hero-visual">
            <div className="hero-image-container">
              <img src="/placeholder.svg?height=500&width=500" alt="GILIA Research Group" className="hero-image" />
            </div>

            {/* Elementos flotantes */}
            <div className="floating-element floating-element-1">
              <div className="floating-card">
                <div className="floating-icon">
                  <ExperimentOutlined />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>IA Avanzada</div>
                  <div style={{ fontSize: "12px", opacity: 0.7 }}>Machine Learning</div>
                </div>
              </div>
            </div>

            <div className="floating-element floating-element-2">
              <div className="floating-card">
                <div className="floating-icon">
                  <BookOutlined />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>NLP</div>
                  <div style={{ fontSize: "12px", opacity: 0.7 }}>Procesamiento</div>
                </div>
              </div>
            </div>

            <div className="floating-element floating-element-3">
              <div className="floating-card">
                <div className="floating-icon">
                  <TeamOutlined />
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Colaboración</div>
                  <div style={{ fontSize: "12px", opacity: 0.7 }}>Internacional</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  )
}
