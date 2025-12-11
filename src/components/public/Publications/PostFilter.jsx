"use client"

// Prop type validation
import PropTypes from "prop-types"

// Icons from antd
import { CalendarOutlined, TagOutlined, BranchesOutlined } from "@ant-design/icons"

/**
 * PostFilter Component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.filtro - Current filter state
 * @param {Function} props.setFiltro - Function to update filter state
 * @param {Function} props.setPagina - Function to reset pagination
 */
const PostFilter = ({ filtro, setFiltro, setPagina }) => {
  /**
   * Handle filter change and reset pagination to first page
   * @param {Event} e - The change event from form inputs
   */
  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value })
    setPagina(1)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Year Filter */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
          <CalendarOutlined className="mr-2" />
          Año de Publicación
        </label>
        <div className="relative">
          <input
            type="number"
            name="anio"
            placeholder="Ej: 2024"
            value={filtro.anio || ""}
            onChange={handleFiltroChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Publication Type Filter */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
          <TagOutlined className="mr-2" />
          Tipo de Publicación
        </label>
        <div className="relative">
          <select 
            name="tipo" 
            value={filtro.tipo || ""} 
            onChange={handleFiltroChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none"
          >
            <option value="">Todos los tipos</option>
            <option value="Artículo">Artículo</option>
            <option value="Capitulo de Libro">Capítulo de Libro</option>
            <option value="Paper">Paper</option>
            <option value="Informe Tecnico">Informe Técnico</option>
            <option value="Tesis">Tesis</option>
            <option value="Libro">Libro</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Research Line Filter */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
          <BranchesOutlined className="mr-2" />
          Línea de Investigación
        </label>
        <div className="relative">
          <input
            type="text"
            name="linea"
            placeholder="Ej: Procesamiento de Lenguaje Natural"
            value={filtro.linea || ""}
            onChange={handleFiltroChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
    </div>
  )
}

PostFilter.propTypes = {
  filtro: PropTypes.shape({
    anio: PropTypes.string,
    tipo: PropTypes.string,
    linea: PropTypes.string,
  }).isRequired,
  setFiltro: PropTypes.func.isRequired,
  setPagina: PropTypes.func.isRequired,
}

export default PostFilter
