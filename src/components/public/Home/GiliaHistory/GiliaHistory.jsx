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
import { useTranslation } from "react-i18next"
import "./HistoriaGilia.css"

export default function HistoriaGilia() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedItems, setAnimatedItems] = useState(new Set())
  const { theme, isDarkTheme } = useTheme()
  const { t } = useTranslation()

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
      year: "2010",
      title: t('history.timeline.2010.title'),
      description: t('history.timeline.2010.description'),
      icon: RocketOutlined,
      achievements: t('history.timeline.2010.achievements', { returnObjects: true })
    },
    {
      year: "2012",
      title: t('history.timeline.2012.title'),
      description: t('history.timeline.2012.description'),
      icon: BulbOutlined,
      achievements: t('history.timeline.2012.achievements', { returnObjects: true })
    },
    {
      year: "2015",
      title: t('history.timeline.2015.title'),
      description: t('history.timeline.2015.description'),
      icon: TeamOutlined,
      achievements: t('history.timeline.2015.achievements', { returnObjects: true })
    },
    {
      year: "2018",
      title: t('history.timeline.2018.title'),
      description: t('history.timeline.2018.description'),
      icon: ExperimentOutlined,
      achievements: t('history.timeline.2018.achievements', { returnObjects: true })
    },
    {
      year: "2021",
      title: t('history.timeline.2021.title'),
      description: t('history.timeline.2021.description'),
      icon: TrophyOutlined,
      achievements: t('history.timeline.2021.achievements', { returnObjects: true })
    },
    {
      year: "2024",
      title: t('history.timeline.2024.title'),
      description: t('history.timeline.2024.description'),
      icon: GlobalOutlined,
      achievements: t('history.timeline.2024.achievements', { returnObjects: true })
    }
  ]

  return (
    <section className={`historia-section ${isVisible ? 'visible' : ''}`} data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="historia-container">
        {/* Header de sección */}
        <div className="section-header">
          <div className="section-badge">
            <BookOutlined />
            <span>{t('history.badge')}</span>
          </div>
          <h2 className="section-title">{t('history.title')}</h2>
          <p className="section-description">
            {t('history.description')}
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
                        <span>{t('history.mainAchievements')}</span>
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