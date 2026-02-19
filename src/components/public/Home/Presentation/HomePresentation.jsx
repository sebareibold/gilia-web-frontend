"use client"
import { 
  ArrowRightOutlined, 
  BookOutlined,
  ApiOutlined,
  EyeOutlined
} from "@ant-design/icons"
import { useTheme } from "../../../../contexts/ThemeContext"
import { useTranslation } from "react-i18next"
import TranslatedText from "../../../../components/common/TranslatedText/TranslatedText"
import "./HomePresentation.css"
import { useState, useEffect } from "react"
import { getResearchLines, getExtensionLines } from "../../../../services"

function shuffleArray(array) {
  // Algoritmo de Fisher-Yates
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// Hook para detectar mobile
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);
  return isMobile;
}

export default function HomePresentation() {
  const { theme, isDarkTheme } = useTheme()
  const { t } = useTranslation()


  const isMobile = useIsMobile();
  const [showFloating, setShowFloating] = useState(false)
  const [researchLines, setResearchLines] = useState([])
  const [extensionLines, setExtensionLines] = useState([])
  // Nombres de métodos utilizados desde services/index.js

  useEffect(() => {
    const timeout = setTimeout(() => setShowFloating(true), 1200)
    // Cargar líneas de investigación y extensión
    getResearchLines().then(res => {
      const data = Array.isArray(res) ? res : (res?.data || [])
      console.log('Líneas de Investigación:', data)
      setResearchLines(data)
    })
    getExtensionLines().then(res => {
      const data = Array.isArray(res) ? res : (res?.data || [])
      console.log('Líneas de Extensión:', data)
      setExtensionLines(data)
    })
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

  // Seleccionar las 8 líneas con nombre más corto (de ambas listas), sin duplicados y aleatorias
  const uniqueLinesMap = new Map();
  [...researchLines.map(l => ({...l, tipo: 'Investigación'})),
   ...extensionLines.map(l => ({...l, tipo: 'Extensión'}))]
    .forEach(l => {
      const key = (l.title || l.nombre || l.titulo || '').trim();
      if (key && !uniqueLinesMap.has(key)) {
        uniqueLinesMap.set(key, { ...l, titulo: key });
      }
    });
  // Mezclar aleatoriamente y tomar 8
  const floatingLines = shuffleArray(Array.from(uniqueLinesMap.values())).slice(0, 8)

  // Para mobile, solo 2 cards: la primera y la segunda
  const floatingLinesMobile = floatingLines.slice(0, 2)

  return (
    <section className="home-presentation" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="home-container">
        {/* Carrusel Superior (solo mobile) - De Izquierda a Derecha */}
        {isMobile && showFloating && (
          <div className="hero-carousel-wrapper hero-carousel-top">
            <div className="hero-carousel-track track-left-to-right">
              {/* Duplicamos los items para efecto infinito */}
              {[...floatingLines, ...floatingLines].map((line, idx) => (
                <div key={`top-${idx}`} className="carousel-card">
                  <div className="carousel-icon">
                    {line.tipo === 'Investigación' ? <EyeOutlined /> : <ApiOutlined />}
                  </div>
                  <div className="carousel-content">
                    <span className="carousel-title">
                      <TranslatedText>{line.title || line.nombre || ''}</TranslatedText>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contenido principal centrado */}
        <div className="hero-content-centered">
          <h1 className="hero-title">
            <span className="hero-title-normal">{t('home.heroTitlePart1')}</span>
            <span className="hero-title-highlight">{t('home.heroTitleHighlight1')}</span>
            <span className="hero-title-normal">{t('home.heroTitleConnector')}</span>
            <span className="hero-title-highlight">{t('home.heroTitleHighlight2')}</span>
          </h1>

          <p className="hero-description">
            {t('home.heroDescription')}
          </p>

          <div className="hero-actions">
            <button className="hero-btn-primary" onClick={handleExploreClick}>
              <span>{t('home.exploreResearch')}</span>
              <ArrowRightOutlined />
            </button>
            <button className="hero-btn-secondary" onClick={handleWatchDemo}>
              <BookOutlined />
              <span>{t('home.viewPublications')}</span>
            </button>
          </div>
        </div>

        {/* Carrusel Inferior (solo mobile) - De Derecha a Izquierda */}
        {isMobile && showFloating && (
          <div className="hero-carousel-wrapper hero-carousel-bottom">
            <div className="hero-carousel-track track-right-to-left">
              {/* Duplicamos los items para efecto infinito */}
              {[...floatingLines, ...floatingLines].map((line, idx) => (
                <div key={`bottom-${idx}`} className="carousel-card">
                  <div className="carousel-icon">
                    {line.tipo === 'Investigación' ? <EyeOutlined /> : <ApiOutlined />}
                  </div>
                  <div className="carousel-content">
                    <span className="carousel-title">
                      <TranslatedText>{line.title || line.nombre || ''}</TranslatedText>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Cards flotantes normales (desktop) */}
        {!isMobile && showFloating && (
          <div className="floating-cards-container">
            {floatingLines.map((line, idx) => {
              const text = line.title || line.nombre || line.titulo || ''
              // Ancho mínimo 140px, máximo 260px, proporcional al largo del texto
              const minW = 140, maxW = 260
              const width = Math.max(minW, Math.min(maxW, minW + text.length * 7))
              return (
                <div
                  key={`${line.tipo}-${line.id}`}
                  className={`floating-element floating-element-${idx+1}`}
                  style={{ animationDelay: `${0.2 + idx*0.2}s`, width }}
                >
                  <div className="floating-card">
                    <div className="floating-icon">
                      {line.tipo === 'Investigación' ? <EyeOutlined className="floating-icon-svg" /> : <ApiOutlined className="floating-icon-svg" />}
                    </div>
                    <div className="floating-content">
                      <div className="floating-title"><TranslatedText>{text}</TranslatedText></div>
                      <div className="floating-subtitle">{line.tipo === 'Investigación' ? t('home.research') : t('home.extensionLabel')}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
