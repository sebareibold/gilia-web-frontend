"use client"
import { 
  ArrowRightOutlined, 
  BookOutlined,
  ApiOutlined,
  EyeOutlined
} from "@ant-design/icons"
import { useTheme } from "../../../../contexts/ThemeContext"
import "./HomePresentation.css"
import { useState, useEffect } from "react"
import { dataService } from '../../../../services/dataService'

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
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  const isMobile = useIsMobile();
  const [showFloating, setShowFloating] = useState(false)
  const [researchLines, setResearchLines] = useState([])
  const [extensionLines, setExtensionLines] = useState([])

  useEffect(() => {
    const timeout = setTimeout(() => setShowFloating(true), 1200)
    
    // Cargar líneas de investigación y extensión en paralelo para evitar recargas
    const loadData = async () => {
      try {
        const [researchRes, extensionRes] = await Promise.all([
          dataService.getResearchLines(),
          dataService.getExtensionLines()
        ])
        
        setResearchLines(researchRes.data?.data || researchRes.data || [])
        setExtensionLines(extensionRes.data?.data || extensionRes.data || [])
      } catch (error) {
        console.error('Error loading research/extension lines:', error)
        setResearchLines([])
        setExtensionLines([])
      }
    }
    
    loadData()
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
      const key = (l.nombre || l.title)?.trim();
      if (key && !uniqueLinesMap.has(key)) {
        uniqueLinesMap.set(key, l);
      }
    });
  // Mezclar aleatoriamente y tomar 8
  const floatingLines = shuffleArray(Array.from(uniqueLinesMap.values())).slice(0, 8)

  // Para mobile, solo 2 cards: la primera y la segunda
  const floatingLinesMobile = floatingLines.slice(0, 2)

  return (
    <section className="home-presentation" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="home-container">
        {/* Card flotante arriba del título (solo mobile) */}
        {isMobile && showFloating && floatingLinesMobile[0] && (
          <div className="floating-cards-container floating-mobile-top">
            <div
              key={`${floatingLinesMobile[0].tipo}-${floatingLinesMobile[0].id}`}
              className={`floating-element floating-element-1`}
              style={{ animationDelay: `0.2s`, width: Math.max(140, Math.min(260, 140 + (floatingLinesMobile[0].nombre || floatingLinesMobile[0].title || '').length * 7)) }}
            >
              <div className="floating-card">
                <div className="floating-icon">
                  {floatingLinesMobile[0].tipo === 'Investigación' ? <EyeOutlined className="floating-icon-svg" /> : <ApiOutlined className="floating-icon-svg" />}
                </div>
                <div className="floating-content">
                  <div className="floating-title">{floatingLinesMobile[0].nombre || floatingLinesMobile[0].title || ''}</div>
                  <div className="floating-subtitle">{floatingLinesMobile[0].tipo}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Contenido principal centrado */}
        <div className="hero-content-centered">
          <h1 className="hero-title">
            <span className="hero-title-normal">Grupo de Investigación en </span>
            <span className="hero-title-highlight">Lenguajes</span>
            <span className="hero-title-normal"> y </span>
            <span className="hero-title-highlight">Inteligencia Artificial</span>
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

        {/* Card flotante abajo del título (solo mobile) */}
        {isMobile && showFloating && floatingLinesMobile[1] && (
          <div className="floating-cards-container floating-mobile-bottom">
            <div
              key={`${floatingLinesMobile[1].tipo}-${floatingLinesMobile[1].id}`}
              className={`floating-element floating-element-2`}
              style={{ animationDelay: `0.4s`, width: Math.max(140, Math.min(260, 140 + (floatingLinesMobile[1].nombre || floatingLinesMobile[1].title || '').length * 7)) }}
            >
              <div className="floating-card">
                <div className="floating-icon">
                  {floatingLinesMobile[1].tipo === 'Investigación' ? <EyeOutlined className="floating-icon-svg" /> : <ApiOutlined className="floating-icon-svg" />}
                </div>
                <div className="floating-content">
                  <div className="floating-title">{floatingLinesMobile[1].nombre || floatingLinesMobile[1].title || ''}</div>
                  <div className="floating-subtitle">{floatingLinesMobile[1].tipo}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Cards flotantes normales (desktop) */}
        {!isMobile && showFloating && (
          <div className="floating-cards-container">
            {floatingLines.map((line, idx) => {
              const text = line.nombre || line.title || ''
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
                      <div className="floating-title">{text}</div>
                      <div className="floating-subtitle">{line.tipo}</div>
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
