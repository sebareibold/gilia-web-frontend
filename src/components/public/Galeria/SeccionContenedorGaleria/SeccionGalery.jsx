"use client"
import { API_BASE_URL } from "../../../config/apiConfig"
import { ExpandOutlined, CalendarOutlined } from "@ant-design/icons"


const SeccionGalery = ({ section, onImageClick }) => {
  if (!section || !section.imagenes) {
    return null
  }

  return (
    <div className="news-carousel-container">
      <div className="news-carousel-grid">
        {section.imagenes.map((img) => (
          <div
            key={img.id}
            className="news-card gallery-image-card"
            style={{ cursor: "pointer", overflow: "hidden" }}
            onClick={() => onImageClick && onImageClick(img, section)}
          >
            <div className="news-card-header">
              <div
                className="news-card-category"
                style={{
                  backgroundColor: section.color || "#3b82f6",
                  color: "white",
                }}
              >
                {img.categoria || "Imagen"}
              </div>
            </div>

            <div
              className="gallery-image-container"
              style={{
                position: "relative",
                height: "200px",
                overflow: "hidden",
                borderRadius: "8px",
                margin: "1rem 0",
              }}
            >
              <img
                src={img.url.startsWith("http") ? img.url : `${API_BASE_URL}${img.url}`}
                alt={img.descripcion || `Imagen ${img.id}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                loading="lazy"
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)"
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)"
                }}
              />
              <div
                className="gallery-overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    backgroundColor: "rgba(255,255,255,0.9)",
                    borderRadius: "50%",
                    padding: "0.75rem",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <ExpandOutlined style={{ color: "#333", fontSize: "1.2rem" }} />
                </div>
              </div>
            </div>

            <div className="news-card-content">
              <h4 className="news-card-title" style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                {img.descripcion || "Sin descripción"}
              </h4>
              {img.fecha && (
                <div className="news-card-meta">
                  <CalendarOutlined style={{ marginRight: "0.5rem" }} />
                  {new Date(img.fecha).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
            </div>

            <div className="news-card-footer">
              <button className="news-btn-secondary">
                <ExpandOutlined style={{ marginRight: "0.5rem" }} />
                Ver Completa
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .gallery-image-card:hover .gallery-overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

export default SeccionGalery
