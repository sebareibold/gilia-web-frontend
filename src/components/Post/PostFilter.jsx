"use client"
import PropTypes from "prop-types"
import { CalendarOutlined, TagOutlined, BranchesOutlined } from "@ant-design/icons"
import "../shared/FuturisticStyles.css"

const PostFilter = ({ filtro, setFiltro, setPagina }) => {
  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value })
    setPagina(1)
  }

  return (
    <div className="filter-grid">
      <div className="filter-input-group">
        <label className="filter-label">
          <CalendarOutlined />
          Año de Publicación
        </label>
        <div className="filter-input-card">
          <input
            type="number"
            name="anio"
            placeholder="Ej: 2024"
            value={filtro.anio || ""}
            onChange={handleFiltroChange}
          />
        </div>
      </div>

      <div className="filter-input-group">
        <label className="filter-label">
          <TagOutlined />
          Tipo de Publicación
        </label>
        <div className="filter-input-card">
          <select name="tipo" value={filtro.tipo || ""} onChange={handleFiltroChange}>
            <option value="">Todos los tipos</option>
            <option value="Artículo">Artículo</option>
            <option value="Capitulo de Libro">Capítulo de Libro</option>
            <option value="Paper">Paper</option>
            <option value="Informe Tecnico">Informe Técnico</option>
            <option value="Tesis">Tesis</option>
            <option value="Libro">Libro</option>
          </select>
        </div>
      </div>

      <div className="filter-input-group">
        <label className="filter-label">
          <BranchesOutlined />
          Línea de Investigación
        </label>
        <div className="filter-input-card">
          <input
            type="text"
            name="linea"
            placeholder="Ej: Procesamiento de Lenguaje Natural"
            value={filtro.linea || ""}
            onChange={handleFiltroChange}
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
