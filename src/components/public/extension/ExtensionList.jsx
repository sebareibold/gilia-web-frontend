"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"
import { BranchesOutlined, ArrowRightOutlined, BankOutlined } from "@ant-design/icons"
import { useTranslation } from "react-i18next"
import TranslatedText from "../../common/TranslatedText/TranslatedText"
import { useLanguageNavigation } from "../../../hooks/useLanguageNavigation"
import { getExtensionLines } from "../../../services"

const LineaExtensionList = () => {
  const [extensionLines, setExtensionLines] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme, isDarkTheme } = useTheme()
  const { t } = useTranslation()
  const { langPath } = useLanguageNavigation()
  const [visibleCount, setVisibleCount] = useState(6)
  // Nombre del método de servicios utilizado desde services/index.js
  const EXTENSION_LINES_SERVICE_METHOD = "getExtensionLines"

  useEffect(() => {
    const fetchExtensionLines = async () => {
      try {
        const response = await getExtensionLines()
        setExtensionLines(response.data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchExtensionLines()
  }, [])

  const visibleExtensionLines = extensionLines.slice(0, visibleCount)
  const hasMore = visibleCount < extensionLines.length

  if (loading) {
    return (
      <section className="exploration-section h-screen" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="carousel-loading">
            <div className="loading-spinner" />
            <span className="loading-text">{t('extensionLines.loading')}</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="exploration-section min-h-screen" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container">
        {/* Header */}
        <div className="section-header">

          <h2 className="section-title">{t('extensionLines.title')}</h2>
          <p className="section-description">
            {t('extensionLines.description')}
          </p>
        </div>

        {/* Grid de líneas */}
        <div className="multi-card-carousel">
          <div className="carousel-container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "2rem",
              }}
            >
              {visibleExtensionLines.map((item) => (
                <div key={item.id || item.idLineaExtension} className="news-card">
                  <div className="news-image-container">
                    <img
                      src={item.image?.url || item.imagen?.url || "/placeholder.svg?height=200&width=350"}
                      alt={item.title || item.titulo}
                      className="news-image"
                    />
                    <div className="news-image-overlay">
                      <BranchesOutlined />
                    </div>
                  </div>

                  <div className="news-content">
                    <div className="news-meta">
                      <span className="news-category">{t('extensionLines.extension')}</span>
                      <div className="news-views">
                        <BankOutlined />
                        <span>{t('extensionLines.active')}</span>
                      </div>
                    </div>

                    <h3 className="news-title"><TranslatedText>{item.title || item.titulo}</TranslatedText></h3>

                    <p className="news-description">
                      <TranslatedText>
                      {typeof (item.description || item.descripcion) === "string" && (item.description || item.descripcion).length > 150
                        ? `${(item.description || item.descripcion).slice(0, 150)}...`
                        : item.description || item.descripcion || t('extensionLines.noDescription')}
                      </TranslatedText>
                    </p>

                    <div className="news-actions">
                      <Link to={langPath(`/extension/${item.id || item.idLineaExtension}`)} className="news-btn-primary">
                        <span>{t('extensionLines.viewMore')}</span>
                        <ArrowRightOutlined />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Botón Ver más */}
          {hasMore && (
            <div className="load-more-container">
              <button
                className="load-more-btn"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                aria-label="Cargar más líneas de extensión"
              >
                <span>{t('extensionLines.loadMore')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default LineaExtensionList
