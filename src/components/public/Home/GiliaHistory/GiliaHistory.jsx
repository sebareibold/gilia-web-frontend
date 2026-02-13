import { useState, useEffect, useRef } from "react"
import {
  BookOutlined,
  TeamOutlined,
  RocketOutlined,
  TrophyOutlined,
  StarOutlined,
  BulbOutlined,
  ExperimentOutlined,
  GlobalOutlined,
} from "@ant-design/icons"
import { useTheme } from "../../../../contexts/ThemeContext"
import "./HistoriaGilia.css"

export default function HistoriaGilia() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedItems, setAnimatedItems] = useState(new Set())
  const { theme, isDarkTheme } = useTheme()

  const timelineRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.querySelector(".historia-section")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  useEffect(() => {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setAnimatedItems(prev => new Set([...prev, index]))
          }
        })
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    timelineRefs.current.forEach((ref) => {
      if (ref) {
        timelineObserver.observe(ref)
      }
    })

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) {
          timelineObserver.unobserve(ref)
        }
      })
    }
  }, [])

  const historiaData = [
    {
      year: "2018",
      title: "Fundación de Gilia",
      description: "Nacimiento del grupo de investigación con la visión de revolucionar la inteligencia artificial y el procesamiento de lenguaje natural.",
      icon: RocketOutlined,
      achievements: ["Primer equipo de investigadores", "Establecimiento de líneas de investigación", "Colaboraciones iniciales"]
    },
    {
      year: "2019",
      title: "Primeros Avances",
      description: "Desarrollo de proyectos pioneros en NLP y establecimiento de metodologías de investigación innovadoras.",
      icon: BulbOutlined,
      achievements: ["Primeras publicaciones científicas", "Proyectos de investigación activos", "Red de colaboradores"]
    },
    {
      year: "2020",
      title: "Expansión y Crecimiento",
      description: "Ampliación del equipo y diversificación de líneas de investigación con enfoque en tecnologías emergentes.",
      icon: TeamOutlined,
      achievements: ["Crecimiento del equipo", "Nuevas líneas de investigación", "Reconocimientos académicos"]
    },
    {
      year: "2021",
      title: "Innovación Tecnológica",
      description: "Desarrollo de soluciones innovadoras en IA y establecimiento como referente en la comunidad científica.",
      icon: ExperimentOutlined,
      achievements: ["Patentes y desarrollos tecnológicos", "Colaboraciones internacionales", "Premios y reconocimientos"]
    },
    {
      year: "2022",
      title: "Liderazgo en IA",
      description: "Consolidación como grupo líder en investigación de inteligencia artificial y procesamiento de lenguaje natural.",
      icon: TrophyOutlined,
      achievements: ["Liderazgo en proyectos nacionales", "Publicaciones de alto impacto", "Formación de investigadores"]
    },
    {
      year: "2023",
      title: "Impacto Global",
      description: "Expansión internacional y contribución significativa al avance de las tecnologías de IA a nivel mundial.",
      icon: GlobalOutlined,
      achievements: ["Colaboraciones globales", "Impacto en la industria", "Innovación continua"]
    }
  ]

  return (
    <section className={`historia-section ${isVisible ? 'visible' : ''}`} data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="historia-container">
        {/* Header de sección */}
        <div className="section-header">
          <div className="section-badge">
            <BookOutlined />
            <span>Nuestra Historia</span>
          </div>
          <h2 className="section-title">La Historia de Gilia</h2>
          <p className="section-description">
            Descubre el viaje de transformación e innovación que ha llevado a Gilia a convertirse en un referente 
            mundial en inteligencia artificial y procesamiento de lenguaje natural.
          </p>
        </div>

        {/* Timeline de la historia */}
        <div className="historia-timeline">
          {historiaData.map((item, index) => {
            const isAnimated = animatedItems.has(index)
            return (
              <div 
                key={item.year} 
                ref={el => timelineRefs.current[index] = el}
                data-index={index}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} ${isAnimated ? 'animated' : ''}`}
                style={{ 
                  animationDelay: `${index * 0.3}s`,
                  '--animation-order': index
                }}
              >
                <div className="timeline-dot">
                  <span className="timeline-label">{item.year}</span>
                </div>
                <div className="timeline-content">
                  <div className="timeline-details">
                    <h3 className={`timeline-title ${isAnimated ? 'title-animated' : ''}`}>{item.title}</h3>
                    <p className={`timeline-description ${isAnimated ? 'description-animated' : ''}`}>{item.description}</p>
                    <div className={`timeline-achievements ${isAnimated ? 'achievements-animated' : ''}`}>
                      <h4 className="achievements-title">
                        <TrophyOutlined />
                        <span>Logros Principales</span>
                      </h4>
                      <ul className="achievements-list">
                        {item.achievements.map((achievement, achievementIndex) => (
                          <li 
                            key={achievementIndex} 
                            className={`achievement-item ${isAnimated ? 'achievement-animated' : ''}`}
                            style={{ animationDelay: `${(index * 0.3) + (achievementIndex * 0.1)}s` }}
                          >
                            <StarOutlined />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>


      </div>
    </section>
  )
} 