"use client"
import { CalendarOutlined, TagOutlined, BranchesOutlined } from "@ant-design/icons"
import "../shared/FuturisticStyles.css"

const PostFilter = ({ filtro, setFiltro, setPagina }) => {
  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value })
    setPagina(1)
  }

  return (
    <div className="futuristic-grid futuristic-grid-3">
      <div>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
            color: "var(--colorTextBase)",
            fontSize: "0.9rem",
            fontWeight: "500",
          }}
        >
          <CalendarOutlined />
          Año de Publicación
        </label>
        <input
          type="number"
          name="anio"
          placeholder="Ej: 2024"
          value={filtro.anio || ""}
          onChange={handleFiltroChange}
          className="futuristic-input"
        />
      </div>

      <div>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
            color: "var(--colorTextBase)",
            fontSize: "0.9rem",
            fontWeight: "500",
          }}
        >
          <TagOutlined />
          Tipo de Publicación
        </label>
        <select name="tipo" value={filtro.tipo || ""} onChange={handleFiltroChange} className="futuristic-input">
          <option value="">Todos los tipos</option>
          <option value="Artículo">Artículo</option>
          <option value="Capitulo de Libro">Capítulo de Libro</option>
          <option value="Paper">Paper</option>
          <option value="Informe Tecnico">Informe Técnico</option>
          <option value="Tesis">Tesis</option>
          <option value="Libro">Libro</option>
        </select>
      </div>

      <div>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "0.5rem",
            color: "var(--colorTextBase)",
            fontSize: "0.9rem",
            fontWeight: "500",
          }}
        >
          <BranchesOutlined />
          Línea de Investigación
        </label>
        <input
          type="text"
          name="linea"
          placeholder="Ej: Procesamiento de Lenguaje Natural"
          value={filtro.linea || ""}
          onChange={handleFiltroChange}
          className="futuristic-input"
        />
      </div>
    </div>
  )
}

export default PostFilter
