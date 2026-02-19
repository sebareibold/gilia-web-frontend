import {
  CalendarOutlined,
  TagOutlined,
  UserOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import "./PublicationFilters.css";

export default function PublicationFilters({ filtro, onChange, onClear }) {
  const { t } = useTranslation();

  return (
    <div className="publication-filters-container">
      <div className="publication-filter-group">
        <div className="publication-filter-item">
          <label>
            <CalendarOutlined /> {t("publications.year")}
          </label>
          <input
            type="number"
            name="anio"
            placeholder={t("publications.yearPlaceholder")}
            value={filtro.anio || ""}
            onChange={onChange}
            className="publication-filter-input"
          />
        </div>
        <div className="publication-filter-item">
          <label>
            <TagOutlined /> {t("publications.type")}
          </label>
          <select
            name="tipo"
            value={filtro.tipo || ""}
            onChange={onChange}
            className="publication-filter-input"
          >
            <option value="">{t("publications.allTypes")}</option>
            <option value="Artículo">{t("publications.article")}</option>
            <option value="Capítulo de Libro">{t("publications.bookChapter")}</option>
            <option value="Paper">{t("publications.paper")}</option>
            <option value="Libro">{t("publications.book")}</option>
            <option value="Informe Técnico">{t("publications.technicalReport")}</option>
            <option value="Tesis">{t("publications.thesis")}</option>
          </select>
        </div>
       
      </div>
      <div className="publication-filter-group">
        <div className="publication-filter-item">
          <label>
            <UserOutlined /> {t("publications.author")}
          </label>
          <input
            type="text"
            name="autores"
            placeholder={t("publications.searchByAuthor")}
            value={filtro.autores || ""}
            onChange={onChange}
            className="publication-filter-input"
          />
        </div>
      </div>
      <button
        className="publication-filter-clear"
        onClick={onClear}
        title={t("publications.clearFilters")}
      >
        <CloseCircleOutlined /> {t("publications.clearFilters")}
      </button>
    </div>
  );
}
