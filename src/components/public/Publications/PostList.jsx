import { useEffect, useState, useRef } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import {
  SearchOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getPublications } from "../../../services";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TranslatedText from "../../common/TranslatedText/TranslatedText";
import PublicationFilters from "./PublicationFilters";
import "./Post.css";

const PostList = () => {
  const { state } = useLocation();
  const linea = state?.linea || "";
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [filtro, setFiltro] = useState({ type: [], year: [], author: [], linea: linea });
  const { theme, isDarkTheme } = useTheme();
  const { t } = useTranslation();

  const [allPublicaciones, setAllPublicaciones] = useState([]); // Unfiltered for extracting options
  const [visibleCount, setVisibleCount] = useState(6);
  const [animatedIndexes, setAnimatedIndexes] = useState(new Set());
  const cardRefs = useRef([]);
  const filterRef = useRef(null);
  const headerRef = useRef(null);
  const loadMoreRef = useRef(null);

  const visiblePublicaciones = publicaciones.slice(0, visibleCount);
  const hasMore = visibleCount < publicaciones.length;

  // Load all publications once to extract filter options
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await getPublications({});
        setAllPublicaciones(response?.data || []);
      } catch (err) {
        console.error("Error fetching all publicaciones:", err);
      }
    };
    fetchAll();
  }, []);

  // Load filtered publications
  useEffect(() => {
    const fetchPublicaciones = async () => {
      setLoading(true);
      try {
        const response = await getPublications(filtro);
        setPublicaciones(response?.data || []);
      } catch (err) {
        console.error("Error fetching publicaciones:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicaciones();
  }, [pagina, filtro]);

  // Extract unique types and years from ALL publications
  const availableTypes = [...new Set(allPublicaciones.map((p) => p.type).filter(Boolean))].sort();
  const availableYears = [...new Set(
    allPublicaciones
      .map((p) => {
        const d = new Date(p.date);
        return !isNaN(d.getTime()) ? d.getFullYear() : null;
      })
      .filter(Boolean)
  )].sort((a, b) => b - a);

  // Extract unique individual authors from comma-separated strings
  const availableAuthors = [...new Set(
    allPublicaciones
      .flatMap((p) => (p.authors || "").split(",").map((a) => a.trim()))
      .filter(Boolean)
  )].sort();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            setAnimatedIndexes((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    if (filterRef.current) observer.observe(filterRef.current);
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (headerRef.current) observer.unobserve(headerRef.current);
      if (filterRef.current) observer.unobserve(filterRef.current);
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [visiblePublicaciones, hasMore]);

  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
    setPagina(1);
    setVisibleCount(6);
  };

  const handleClearFilters = () => {
    setFiltro({ type: [], year: [], author: [] });
    setPagina(1);
    setVisibleCount(6);
  };

  const getTypeColor = (type) => {
    const colors = {
      "Artículo": "#E91E63",
      "Capítulo de Libro": "#9C27B0",
      "Paper": "#2196F3",
      "Libro": "#FF9800",
      "Informe Técnico": "#4CAF50",
      "Tesis": "#795548",
    };
    return colors[type] || "#6B7280";
  };

  // Grouping logic: group by year extracted from date
  const groupedPublications = visiblePublicaciones.reduce((acc, pub) => {
    const dateStr = pub.date || "";
    const parsed = new Date(dateStr);
    const year = !isNaN(parsed.getTime()) ? parsed.getFullYear() : "Sin año";
    if (!acc[year]) acc[year] = [];
    acc[year].push(pub);
    return acc;
  }, {});

  const sortedYears = Object.keys(groupedPublications).sort((a, b) => b - a);

  return (
    <section
      className="exploration-section"
      data-theme={isDarkTheme ? "dark" : "light"}
    >
      <div className="exploration-container">
        {/* Header */}
        <div
          className={`section-header${animatedIndexes.has("header") ? " animated" : ""}`}
          ref={headerRef}
          data-index="header"
        >
          <h2 className="section-title">{t('publications.title')}</h2>
          <p className="post-section-description">
            {t('publications.description')}
          </p>
        </div>

        {/* Filtros */}
        <div
          ref={filterRef}
          data-index="filters"
          className={`filters-animated${animatedIndexes.has("filters") ? " animated" : ""}`}
          style={{ animationDelay: "0.2s" }}
        >
          <PublicationFilters
            filtro={filtro}
            onChange={handleFiltroChange}
            onClear={handleClearFilters}
            availableTypes={availableTypes}
            availableYears={availableYears}
            availableAuthors={availableAuthors}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="carousel-loading">
            <div className="loading-spinner" />
            <span className="loading-text">{t('publications.loading')}</span>
          </div>
        ) : publicaciones.length === 0 ? (
          <div
            className="carousel-container"
            style={{ textAlign: "center", padding: "3rem" }}
          >
            <SearchOutlined
              style={{
                fontSize: "3rem",
                color: "var(--color-text-secondary)",
                marginBottom: "1rem",
              }}
            />
            <h3
              style={{
                color: "var(--color-text-primary)",
                marginBottom: "0.5rem",
              }}
            >
               {t('publications.noPublications')}
            </h3>
            <p style={{ color: "var(--color-text-secondary)" }}>
              {t('publications.noPublicationsDescription')}
            </p>
          </div>
        ) : (
          <div className="publications-list-container">
            {sortedYears.map((year) => (
              <div key={year} className="publication-year-group">
                <h3 className="publication-year-header">{year}</h3>
                <div className="publication-year-list">
                  {groupedPublications[year].map((pub) => (
                    <div
                      key={pub.id}
                      className="publication-card"
                    >
                      {/* Col 1: Type & Date */}
                      <div className="pub-col-meta">
                        {pub.type && (
                          <span
                            className="publication-type-badge has-tooltip"
                            data-tooltip={`${t('publications.tooltipType')}: ${pub.type}`}
                            style={{
                              color: getTypeColor(pub.type),
                              borderColor: getTypeColor(pub.type),
                              backgroundColor: `${getTypeColor(pub.type)}15`,
                            }}
                          >
                            <TranslatedText>{pub.type}</TranslatedText>
                          </span>
                        )}
                        <div className="pub-date has-tooltip" data-tooltip={`${t('publications.tooltipDate')}: ${pub.date}`}>
                          <CalendarOutlined /> {pub.date}
                        </div>
                      </div>

                      {/* Col 2: Title & Description */}
                      <div className="pub-col-info">
                        <h4 className="pub-title has-tooltip" data-tooltip={`${t('publications.tooltipTitle')}: ${pub.title}`}>
                          <TranslatedText>{pub.title}</TranslatedText>
                        </h4>
                        <div className="pub-description has-tooltip" data-tooltip={`${t('publications.tooltipDescription')}: ${pub.description}`}>
                          <TranslatedText>{pub.description}</TranslatedText>
                        </div>
                      </div>

                      {/* Col 3: Authors */}
                      {pub.authors && (
                        <div className="pub-col-authors has-tooltip" data-tooltip={`${t('publications.tooltipAuthors')}: ${pub.authors}`}>
                          <UserOutlined className="pub-authors-icon" />
                          <span className="pub-authors-text">{pub.authors}</span>
                        </div>
                      )}

                      {/* Col 4: Actions */}
                      <div className="pub-col-actions">
                         <a 
                           href={pub.publicationLink || "#"} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className={`action-link-btn ${!pub.publicationLink ? "disabled" : ""}`}
                         >
                           {t('publications.viewPublication')} <ArrowRightOutlined />
                         </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Botón Ver más */}
            {hasMore && (
              <div
                className="load-more-container"
                ref={loadMoreRef}
                style={{ marginTop: "2rem" }}
              >
                <button
                  className="load-more-btn"
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  aria-label="Cargar más publicaciones"
                >
                  <span>{t('publications.loadMore')}</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PostList;
