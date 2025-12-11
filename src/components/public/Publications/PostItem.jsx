"use client"

// Context and hooks
import { useTheme } from "../../context/ThemeContext"

/**
 * Returns the appropriate Tailwind classes based on publication type
 * @param {string} tipo - The type of publication
 * @returns {string} Tailwind classes for the publication type badge
 */
const getTypeClasses = (tipo) => {
  const typeMap = {
    "Artículo": "bg-pink-600",
    "Capítulo de Libro": "bg-purple-600",
    "Paper": "bg-blue-500",
    "Informe Técnico": "bg-green-500",
    "Tesis": "bg-yellow-600",
    "Libro": "bg-orange-500",
  }
  return typeMap[tipo] || "bg-gray-500"
}

/**
 * PostItem Component - Displays a single publication item
 * 
 * @param {Object} props - Component props
 * @param {Object} props.publicacion - Publication data to display
 */
const PostItem = ({ publicacion }) => {
  const { theme } = useTheme()
  const isDark = theme?.token?.backgroundColor === "#0a0a0a"

  return (
    <div className={`rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg ${
      isDark ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* Publication Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className={`text-xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              {publicacion.title}s
            </h3>
            <p className={`text-sm ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {publicacion.autores || "Autores no disponibles"} 
            </p>
          </div>
          <span 
            className={`ml-4 px-3 py-1 rounded-full text-xs font-semibold text-white ${
              getTypeClasses(publicacion.tipo)
            }`}
          >
            {publicacion.tipo || "Tipo no disponible"}
          </span>
        </div>

      {/* Publication Details - Only render if there are details to show */}
      {(publicacion.enlace ||
        publicacion.editor ||
        publicacion.pagina_libro ||
        publicacion.resumen ||
        publicacion.linea_investigacions ||
        publicacion.linea_extensions) && (
        <div className="p-6 space-y-4">
          {/* Publication Link */}
          {publicacion.enlace && (
            <div className="flex flex-wrap items-center text-sm">
              <span className="font-semibold mr-2">Enlace:</span>
              <a 
                href={publicacion.enlace} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                Ver publicación
              </a>
            </div>
          )}
          
          {/* Editor */}
          {publicacion.editor && (
            <div className="text-sm">
              <span className="font-semibold">Editor:</span>{" "}
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{publicacion.editor}</span>
            </div>
          )}
          
          {/* Book Page */}
          {publicacion.pagina_libro && (
            <div className="text-sm">
              <span className="font-semibold">Página del Libro:</span>{" "}
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{publicacion.pagina_libro}</span>
            </div>
          )}
          
          {/* Summary */}
          {publicacion.resumen && (
            <div className="text-sm">
              <p className="font-semibold mb-1">Resumen:</p>
              <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>{publicacion.resumen}</p>
            </div>
          )}
          
          {/* Research Line */}
          {publicacion.linea_investigacions && (
            <div className="text-sm">
              <span className="font-semibold">Línea de Investigación:</span>{" "}
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{publicacion.linea_investigacions}</span>
            </div>
          )}
          
          {/* Extension Line */}
          {publicacion.linea_extensions && (
            <div className="text-sm">
              <span className="font-semibold">Línea de Extensión:</span>{" "}
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{publicacion.linea_extensions}</span>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  )
}

export default PostItem
