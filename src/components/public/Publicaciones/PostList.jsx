import { useEffect, useState, useRef } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import {
  SearchOutlined,
  ShareAltOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import asyncMock from "../../../../asyncMock";
import { useLocation } from "react-router-dom";
import PublicationFilters from "./PublicationFilters";
import "./PublicationFilters.css";
import "./PostList.css";

const PostList = () => {
  const { state } = useLocation();
  const linea = state?.linea || "";
  const [publicaciones, setPublicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagina, setPagina] = useState(1);
  const [filtro, setFiltro] = useState({ anio: "", tipo: "", linea: linea });
  const { theme } = useTheme();
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a";
  const [visibleCount, setVisibleCount] = useState(6); // Mantener paginación
  const [isReady, setIsReady] = useState(false); // Nuevo estado para controlar la animación

  useEffect(() => {
    const fetchPublicaciones = async () => {
      setLoading(true);
      setIsReady(false); // Reiniciar animación en cada carga
      try {
        const response = await asyncMock.getPublicaciones(filtro);
        setPublicaciones(response.data || []);
      } catch (err) {
        console.error("Error fetching publicaciones:", err);
        setPublicaciones([]);
      } finally {
        setLoading(false);
        // Pequeño retraso para asegurar que el DOM se actualice antes de animar
        setTimeout(() => setIsReady(true), 50);
      }
    };

    fetchPublicaciones();
  }, [pagina, filtro]);

  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
    setPagina(1);
    setVisibleCount(6);
  };

  const handleClearFilters = () => {
    setFiltro({ anio: "", tipo: "", autores: "" });
    setPagina(1);
    setVisibleCount(6);
  };

  const getTypeColor = (tipo) => {
    const colors = {
      Artículo: "#E91E63",
      "Capítulo de Libro": "#9C27B0",
      Paper: "#2196F3",
      Libro: "#FF9800",
      "Informe Técnico": "#4CAF50",
      Tesis: "#795548",
    };
    return colors[tipo] || "#6B7280";
  };

  const visiblePublicaciones = publicaciones.slice(0, visibleCount);
  const hasMore = visibleCount < publicaciones.length;

  return (
    <section
      className={`exploration-section ${isReady ? "is-loaded" : ""}`}
      data-theme={isDarkTheme ? "dark" : "light"}
    >
      <div className="exploration-container">
        {/* Header */}
        <div className="section-header">
          <h2 className="section-title">Publicaciones Científicas</h2>
          <p className="section-description">
            Explora nuestras investigaciones, artículos y contribuciones
            académicas en el campo de la inteligencia artificial, procesamiento
            de lenguaje natural y tecnologías emergentes.
          </p>
        </div>

        {/* Filtros */}
        <div className="filters-container">
          <PublicationFilters
            filtro={filtro}
            onChange={handleFiltroChange}
            onClear={handleClearFilters}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="carousel-loading">
            <div className="loading-spinner" />
            <span className="loading-text">Cargando publicaciones...</span>
          </div>
        ) : publicaciones.length === 0 ? (
          <div className="empty-state-container">
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
              No hay publicaciones
            </h3>
            <p style={{ color: "var(--color-text-secondary)" }}>
              No se encontraron publicaciones con los filtros aplicados.
            </p>
          </div>
        ) : (
          <div className="publications-content">
            <div className="carousel-container">
              <div className="publications-grid">
                {visiblePublicaciones.map((pub, idx) => (
                  <div key={pub.id} className="news-card">
                    {/* Header de la publicación */}
                    <div className="news-content">
                      <div className="news-meta">
                        <span
                          className="news-category"
                          style={{
                            background: getTypeColor(pub.tipo),
                            color: "white",
                          }}
                        >
                          {pub.tipo}
                        </span>
                        <div className="news-views">
                          <CalendarOutlined />
                          <span>{pub.anio}</span>
                        </div>
                      </div>

                      <h3 className="news-title">{pub.titulo}</h3>

                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-text-secondary)",
                          marginBottom: "1rem",
                          fontWeight: "500",
                        }}
                      >
                        <div
                          dangerouslySetInnerHTML={{ __html: pub.autores }}
                        />
                      </div>

                      {pub.publicacion && (
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--color-text-muted)",
                            marginBottom: "1rem",
                            fontStyle: "italic",
                          }}
                        >
                          Publicado en: {pub.publicacion}
                        </div>
                      )}

                      <div className="news-description">
                        <div
                          dangerouslySetInnerHTML={{ __html: pub.resumen }}
                        />
                      </div>

                      <div className="news-actions">
                        {pub.enlace ? (
                          <a
                            href={pub.enlace}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="news-btn-primary"
                          >
                            <span>Ver publicación</span>
                            <ArrowRightOutlined />
                          </a>
                        ) : (
                          <div
                            className="news-btn-primary"
                            style={{ opacity: 0.5, cursor: "not-allowed" }}
                          >
                            <span>No disponible</span>
                          </div>
                        )}
                        <button
                          className="news-btn-secondary"
                          aria-label="Compartir publicación"
                        >
                          <ShareAltOutlined />
                        </button>
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
                  aria-label="Cargar más publicaciones"
                >
                  <span>Ver más publicaciones</span>
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
