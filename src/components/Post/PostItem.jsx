"use client"
import { useTheme } from "../../context/ThemeContext"

const getTypeClass = (tipo) => {
  const typeMap = {
    Artículo: "type-articulo",
    "Capítulo de Libro": "type-capitulo",
    Paper: "type-paper",
    "Informe Técnico": "type-informe",
    Tesis: "type-tesis",
    Libro: "type-libro",
  }
  return typeMap[tipo] || "type-articulo"
}

const PostItem = ({ publicacion }) => {
  const { theme } = useTheme()

  return (
    <div className="publication-item">
      <div className="publication-header">
        <div style={{ flex: 1 }}>
          <h3 className="publication-title">{publicacion.titulo || "Título no disponible"}</h3>
          <p className="publication-meta">
            {publicacion.autores || "Autores no disponibles"} • {publicacion.anio || "Año no disponible"}
          </p>
        </div>
        <span className={`publication-type ${getTypeClass(publicacion.tipo)}`}>
          {publicacion.tipo || "Tipo no disponible"}
        </span>
      </div>

      {(publicacion.enlace ||
        publicacion.editor ||
        publicacion.pagina_libro ||
        publicacion.resumen ||
        publicacion.linea_investigacions ||
        publicacion.linea_extensions) && (
        <div className="publication-details">
          {publicacion.enlace && (
            <div className="publication-detail">
              <strong>Enlace:</strong>{" "}
              <a href={publicacion.enlace} target="_blank" rel="noopener noreferrer" className="publication-link">
                Ver publicación
              </a>
            </div>
          )}
          {publicacion.editor && (
            <div className="publication-detail">
              <strong>Editor:</strong> {publicacion.editor}
            </div>
          )}
          {publicacion.pagina_libro && (
            <div className="publication-detail">
              <strong>Página del Libro:</strong> {publicacion.pagina_libro}
            </div>
          )}
          {publicacion.resumen && (
            <div className="publication-detail">
              <strong>Resumen:</strong> {publicacion.resumen}
            </div>
          )}
          {publicacion.linea_investigacions && (
            <div className="publication-detail">
              <strong>Línea de Investigación:</strong> {publicacion.linea_investigacions}
            </div>
          )}
          {publicacion.linea_extensions && (
            <div className="publication-detail">
              <strong>Línea de Extensión:</strong> {publicacion.linea_extensions}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PostItem
