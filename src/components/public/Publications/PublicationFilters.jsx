import { useState, useRef, useEffect } from "react";
import { FilterOutlined, ClearOutlined, DownOutlined, CheckOutlined, UserOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const MultiSelect = ({ value = [], options, placeholder, onChange, name, selectedLabel }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleOption = (opt) => {
    const strOpt = String(opt);
    const newValue = value.includes(strOpt)
      ? value.filter((v) => v !== strOpt)
      : [...value, strOpt];
    onChange({ target: { name, value: newValue } });
  };

  const displayText = value.length === 0
    ? placeholder
    : selectedLabel;

  return (
    <div className="pub-custom-select" ref={ref}>
      <button
        type="button"
        className={`pub-select-trigger ${open ? "open" : ""} ${value.length > 0 ? "has-value" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span className={value.length === 0 ? "pub-select-placeholder" : "pub-select-text"}>
          {displayText}
        </span>
        <DownOutlined className={`pub-select-arrow ${open ? "rotated" : ""}`} />
      </button>
      {open && (
        <div className="pub-select-dropdown">
          {options.map((opt) => {
            const isSelected = value.includes(String(opt));
            return (
              <div
                key={opt}
                className={`pub-select-option ${isSelected ? "active" : ""}`}
                onClick={() => toggleOption(opt)}
              >
                <span>{opt}</span>
                {isSelected && <CheckOutlined className="pub-option-check" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const PublicationFilters = ({ filtro, onChange, onClear, availableTypes, availableYears, availableAuthors }) => {
  const { t } = useTranslation();
  const hasActiveFilters =
    (filtro.type && filtro.type.length > 0) ||
    (filtro.year && filtro.year.length > 0) ||
    (filtro.author && filtro.author.length > 0);

  return (
    <div className="pub-filters">
      <div className="pub-filters-row">
        {/* Type filter */}
        <div className="pub-filter-group">
          <label className="pub-filter-label">
            <FilterOutlined /> {t('publications.type')}
          </label>
          <MultiSelect
            name="type"
            value={filtro.type || []}
            options={availableTypes}
            placeholder={t('publications.allTypes')}
            selectedLabel={t('publications.selected', { count: (filtro.type || []).length })}
            onChange={onChange}
          />
        </div>

        {/* Year filter */}
        <div className="pub-filter-group">
          <label className="pub-filter-label">
            <FilterOutlined /> {t('publications.year')}
          </label>
          <MultiSelect
            name="year"
            value={filtro.year || []}
            options={availableYears}
            placeholder={t('publications.allYears')}
            selectedLabel={t('publications.selected', { count: (filtro.year || []).length })}
            onChange={onChange}
          />
        </div>

        {/* Author filter */}
        <div className="pub-filter-group">
          <label className="pub-filter-label">
            <UserOutlined /> {t('publications.author')}
          </label>
          <MultiSelect
            name="author"
            value={filtro.author || []}
            options={availableAuthors}
            placeholder={t('publications.allAuthors')}
            selectedLabel={t('publications.selected', { count: (filtro.author || []).length })}
            onChange={onChange}
          />
        </div>

        {/* Clear button */}
        {hasActiveFilters && (
          <button className="pub-filter-clear" onClick={onClear}>
            <ClearOutlined /> {t('publications.clearFilters')}
          </button>
        )}
      </div>

      {/* Active filter pills — grouped per category with | separator */}
      {hasActiveFilters && (
        <div className="pub-filter-active">
          {filtro.type && filtro.type.length > 0 && (
            <span className="pub-filter-pill">
              {t('publications.type')}: {filtro.type.join(" | ")}
            </span>
          )}
          {filtro.year && filtro.year.length > 0 && (
            <span className="pub-filter-pill">
              {t('publications.year')}: {filtro.year.join(" | ")}
            </span>
          )}
          {filtro.author && filtro.author.length > 0 && (
            <span className="pub-filter-pill">
              {t('publications.author')}: {filtro.author.join(" | ")}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default PublicationFilters;
