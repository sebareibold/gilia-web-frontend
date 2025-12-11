import { useState, useEffect, useRef } from "react"
import {
  ArrowRightOutlined,
  BulbOutlined,
  BookOutlined,
  ExperimentOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  StarOutlined,
  ShareAltOutlined,
  FireOutlined,
  TrophyOutlined,
  TeamOutlined,
  DownOutlined,
} from "@ant-design/icons"
import { useTheme } from "../../../../contexts/ThemeContext"
import "./HomeExploration.css"
import { getNews } from "../../../../services"

// Array de iconos para rotar con más variedad
const newsIcons = [
  BulbOutlined,
  BookOutlined,
  ExperimentOutlined,
  RocketOutlined,
  ThunderboltOutlined,
  StarOutlined,
  FireOutlined,
  TrophyOutlined,
  TeamOutlined,
]

export default function HomeExploration() {
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visibleCount, setVisibleCount] = useState(3) // Show 3 news initially (1 row)
  const [loadingMore, setLoadingMore] = useState(false)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  // Appear animation
  const [animatedCards, setAnimatedCards] = useState(new Set())
  const cardRefs = useRef([])

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setAnimatedCards(prev => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2 }
    )
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })
    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [newsItems, visibleCount])

  // Service method name used from services/index.js
  const NEWS_SERVICE_METHOD = "getNews"

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await getNews()
        setNewsItems(response.data)
      } catch (err) {
        console.error("Error fetching news:", err)
        setError(err.message || "An error occurred while loading news.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleLoadMore = () => {
    setLoadingMore(true)
    // Simulate async load
    setTimeout(() => {
      setVisibleCount(prev => prev + 6) // Load 6 more (2 rows of 3)
      setLoadingMore(false)
    }, 800)
  }

  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`
    }
    return views.toString()
  }

  const getVisibleNews = () => {
    return newsItems.slice(0, visibleCount)
  }

  const hasMoreNews = () => {
    return visibleCount < newsItems.length
  }

  if (loading) {
    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="carousel-loading">
            <div className="loading-spinner" />
            <span className="loading-text">Cargando las últimas novedades...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error || !newsItems || newsItems.length === 0) {
    return (
      <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="section-header">
            <div className="section-badge">
              <ExperimentOutlined />
              <span>News</span>
            </div>
            <h2 className="section-title">No news available</h2>
            <p className="section-description">
              Please check back later to see the latest updates from our research team.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const visibleNews = getVisibleNews()

  return (
    <section className="exploration-section" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container">
        {/* Section header */}
        <div className="section-header">
          <div className="section-badge">
            <StarOutlined />
            <span>Latest News</span>
          </div>
          <h2 className="section-title">Discover Our Latest Advances</h2>
          <p className="section-description">
            Stay up to date with our latest research, featured publications, and breakthroughs in AI, NLP, and emerging technologies.
          </p>
        </div>

        {/* News grid */}
        <div className="news-grid-container">
          <div className="news-grid">
            {visibleNews.map((item, index) => {
              const NewsIcon = newsIcons[index % newsIcons.length]
              const isAnimated = animatedCards.has(index)
              return (
                <div 
                  key={item.id} 
                  ref={el => cardRefs.current[index] = el}
                  data-index={index}
                  className={`news-card${isAnimated ? ' animated' : ''}`}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Image */}
                  <div className="news-image-container">
                    <img
                      src={item.image || "/placeholder.svg?height=300&width=400"}
                      alt={item.title}
                      className="news-image"
                      loading="lazy"
                    />
                    <div className="news-image-overlay">
                      <NewsIcon />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="news-content">
                    <div className="news-meta">
                    </div>

                    <h3 className="news-title">{item.title}</h3>

                    <p className="news-description">{item.description}</p>

                    <div className="news-actions">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="news-btn-primary"
                      >
                        <span>Read more</span>
                        <ArrowRightOutlined />
                      </a>
                      <button className="news-btn-secondary" aria-label="Share news">
                        <ShareAltOutlined />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Load more button */}
          {hasMoreNews() && (
            <div className="load-more-container">
              <button
                className="load-more-btn"
                onClick={handleLoadMore}
                disabled={loadingMore}
                aria-label="Load more news"
              >
                {loadingMore ? (
                  <>
                    <div className="loading-spinner-small" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>See more news</span>
                    <DownOutlined />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
