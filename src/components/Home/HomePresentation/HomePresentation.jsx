"use client"

import { ArrowRightOutlined, BookOutlined, RocketOutlined, ExperimentOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { useTheme } from "../../../context/ThemeContext"
import "./HomePresentation.css"

// Configuración de estadísticas - fácil de actualizar
const RESEARCH_STATS = {
  researchLines: {
    value: 7,
    label: "Líneas de Investigación",
  },
  researchers: {
    value: 15,
    label: "Investigadores",
  },
  publications: {
    value: 50,
    label: "Publicaciones",
  },
  activeProjects: {
    value: 10,
    label: "Proyectos Activos",
  },
}

const HomePresentation = () => {
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  return (
    <div className="hero-container" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="hero-content">

        <h1 className="hero-title">
          Grupo de Investigación en
          <br />
          <span className="gradient-text">Lenguajes e IA</span>
        </h1>

        <p className="hero-subtitle">
          Exploramos las fronteras del conocimiento en procesamiento de lenguaje natural, sistemas inteligentes y
          tecnologías emergentes para construir el futuro de la computación y transformar la manera en que interactuamos
          con la tecnología.
        </p>

        <div className="hero-cta">
          <Link to="/lineas-de-investigacion" className="cta-primary">
            <ExperimentOutlined />
            Explorar Investigación
            <ArrowRightOutlined />
          </Link>
          <Link to="/post" className="cta-secondary">
            <BookOutlined />
            Ver Publicaciones
          </Link>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">{RESEARCH_STATS.researchLines.value}+</span>
            <span className="stat-label">{RESEARCH_STATS.researchLines.label}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{RESEARCH_STATS.researchers.value}+</span>
            <span className="stat-label">{RESEARCH_STATS.researchers.label}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{RESEARCH_STATS.publications.value}+</span>
            <span className="stat-label">{RESEARCH_STATS.publications.label}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{RESEARCH_STATS.activeProjects.value}+</span>
            <span className="stat-label">{RESEARCH_STATS.activeProjects.label}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePresentation
