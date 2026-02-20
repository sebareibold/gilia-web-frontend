"use client"

import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useTheme } from "../../../contexts/ThemeContext"
import { useTranslation } from "react-i18next"
import { marked } from "marked"
import { getExtensionLineById } from "../../../services"
import { FolderOutlined, BankOutlined, BranchesOutlined } from "@ant-design/icons"
import TranslatedText from "../../common/TranslatedText/TranslatedText"
import { useLanguageNavigation } from "../../../hooks/useLanguageNavigation"
import SimpleCarousel from "../ResearchLineDetails/SimpleCarousel"

import "../ResearchLineDetails/ResearchLineDetails.css";

const LineaExtensionDetail = () => {
  const { id } = useParams()
  const [extensionLine, setExtensionLine] = useState(null)
  const { theme, isDarkTheme } = useTheme()
  const { t } = useTranslation()
  const { langPath } = useLanguageNavigation()
  // Nombre del método de servicios utilizado desde services/index.js
  const EXTENSION_LINE_SERVICE_METHOD = "getExtensionLineById"

  useEffect(() => {
    const fetchExtensionLineDetail = async () => {
      try {
        const response = await getExtensionLineById(id)
        // response shape expected: { data: { ... } }
        setExtensionLine(response.data)
      } catch (error) {
        console.error("Error fetching extension line details:", error)
        setExtensionLine(null)
      }
    }
    fetchExtensionLineDetail()
  }, [id])

  if (!extensionLine) {
    return (
      <section className="exploration-section h-screen" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="exploration-container">
          <div className="carousel-loading">
            <div className="loading-spinner" />
            <span className="loading-text">{t('extensionDetails.loading')}</span>
          </div>
        </div>
      </section>
    )
  }

  const descriptionHTML = marked(extensionLine.description || extensionLine.descripcion || "")

  // Render para cada proyecto (igual que en detalles de investigación)
  const renderProject = (project) => {
    const name = project.title || project.nombre || t('extensionDetails.noName')
    const description = project.description || project.descripcion || t('extensionDetails.noDescription')
    // Truncar la descripción a 20 palabras
    const palabras = description.split(" ")
    const descripcionCorta = palabras.length > 20 ? palabras.slice(0, 20).join(" ") + " ..." : description
    return (
      <div className="news-card flex flex-col h-full justify-start p-6">
        <div className="news-image-container mb-4.5">
          <img src="/placeholder.svg?height=200&width=350" alt={name} className="news-image" />
          <div className="news-image-overlay" />
        </div>
        <div className="news-content flex-1 flex flex-col justify-between">
          <h3 className="news-title text-lg font-bold mb-2"><TranslatedText>{name}</TranslatedText></h3>
          <p className="news-description news-meta-text mb-0"><TranslatedText>{descripcionCorta}</TranslatedText></p>
          <div className="news-actions mt-4">
            <Link to={langPath(`/projects/${project.id}`)} className="news-btn-primary w-full flex items-center justify-center gap-2">
              <span>{t('extensionDetails.viewProject')}</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="exploration-section min-h-screen" data-theme={isDarkTheme ? "dark" : "light"}>
      <div className="exploration-container max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="section-header">
           <h2 className="section-title animate-fade-inUp-0-8"><TranslatedText>{extensionLine.title || extensionLine.titulo}</TranslatedText></h2>
        </div>
          
        {/* Descripción */}
        <div 
          className="carousel-container mb-8 animate-fade-inUp-1 markdown-content"
          dangerouslySetInnerHTML={{ __html: descriptionHTML }}
        />
        
        {/* Instituciones */}
        {extensionLine.institutions || extensionLine.instituciones ? (
          <div className="multi-card-carousel">
            <div className="carousel-container">
              <h3 className="title-research-line text-center p-6 text-4xl">
                <BankOutlined style={{ marginRight: 8 }} />{t('extensionDetails.institutions')}
              </h3>
              <div className="news-card p-6 text-center">
                <div className="news-content">
                  <p className="markdown-content m-0">
                    {extensionLine.institutions || extensionLine.instituciones}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Proyectos */}
        <div className="multi-card-carousel">
            <div className="carousel-container">
              <h3 className="title-research-line text-center p-6 text-4xl">
                {t('extensionDetails.projects')}
              </h3>
              {extensionLine.projects && extensionLine.projects.length > 0 ? (
                <SimpleCarousel items={extensionLine.projects} renderItem={renderProject} itemsPerPage={3} />
              ) : (
                <div className="news-meta-text text-center animate-fade-inUp-1">
                 {t('researchLine.noProjects')}
               </div>
              )}
            </div>
          </div>
      </div>
    </section>
  )
}

export default LineaExtensionDetail
