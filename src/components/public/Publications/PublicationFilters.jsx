import {
  CalendarOutlined,
  TagOutlined,
  UserOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "./PublicationFilters.css";

export default function PublicationFilters({ filtro, onChange, onClear }) {
  return (
    <div className="publication-filters-container">
      <div className="publication-filter-group">
        <div className="publication-filter-item">
          <label>
            <CalendarOutlined /> Año
          </label>
          <input
            type="number"
            name="anio"
            placeholder="Ej: 2024"
            value={filtro.anio || ""}
            onChange={onChange}
            className="publication-filter-input"
          />
        </div>
        <div className="publication-filter-item">
          <label>
            <TagOutlined /> Tipo
          </label>
          <select
            name="tipo"
            value={filtro.tipo || ""}
            onChange={onChange}
            className="publication-filter-input"
          >
            <option value="">Todos los tipos</option>
            <option value="Artículo">Artículo</option>
            <option value="Capítulo de Libro">Capítulo de Libro</option>
            <option value="Paper">Paper</option>
            <option value="Libro">Libro</option>
            <option value="Informe Técnico">Informe Técnico</option>
            <option value="Tesis">Tesis</option>
          </select>
        </div>
       
      </div>
      <div className="publication-filter-group">
        <div className="publication-filter-item">
          <label>
            <UserOutlined /> Autor
          </label>
          <input
            type="text"
            name="autores"
            placeholder="Buscar por autor"
            value={filtro.autores || ""}
            onChange={onChange}
            className="publication-filter-input"
          />
        </div>
      </div>
      <button
        className="publication-filter-clear"
        onClick={onClear}
        title="Limpiar filtros"
      >
        <CloseCircleOutlined /> Limpiar
      </button>
    </div>
  );
}
