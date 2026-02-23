
import { useState, useEffect } from "react";
import { getNews, getResearchLines, getExtensionLines } from "../../../services";
import ReactMarkdown from "react-markdown";
import { notification, Modal } from "antd";
import {
  BellOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
  SettingOutlined,
  LinkOutlined,
  FileTextOutlined,
  CalendarOutlined,
  ApartmentOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const AdminNews = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // "list" | "edit"
  const [currentNews, setCurrentNews] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [researchLines, setResearchLines] = useState([]);
  const [extensionLines, setExtensionLines] = useState([]);

  useEffect(() => {
    fetchNews();
    fetchRelated();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await getNews();
      setNewsList(response.data || response || []);
    } catch (error) {
      console.error("Error al obtener las novedades:", error);
      notification.error({ message: "Error de Carga", description: "No se pudieron cargar las novedades." });
    } finally {
      setLoading(false);
    }
  };

  const fetchRelated = async () => {
    try {
      const [rlRes, elRes] = await Promise.all([getResearchLines(), getExtensionLines()]);
      setResearchLines(rlRes.data || rlRes || []);
      setExtensionLines(elRes.data || elRes || []);
    } catch (e) {
      console.error("Error cargando datos relacionados:", e);
    }
  };

  const emptyNews = {
    title: "",
    summary: "",
    date: "",
    image: "",
    // Tipo "externa": se redirige a otro sitio mediante `link`
    // Tipo "interna": se muestra la `description` en detalle en la propia web
    type: "externa", // "externa" | "interna"
    link: "",        // solo para tipo externa
    description: "", // solo para tipo interna
    relatedResearchLines: [],
    relatedExtensionLines: [],
  };

  const handleOpenEditor = (item = null) => {
    setCurrentNews(
      item
        ? {
            ...item,
            type: item.type || (item.link ? "externa" : "interna"),
            relatedResearchLines: item.relatedResearchLines || [],
            relatedExtensionLines: item.relatedExtensionLines || [],
          }
        : { ...emptyNews }
    );
    setViewMode("edit");
  };

  const handleCloseEditor = (force = false) => {
    if (!force && isDirty()) {
      Modal.confirm({
        title: "Cambios sin guardar",
        content: "¿Estás seguro de que deseas salir? Se perderán los cambios realizados.",
        okText: "Descartar",
        cancelText: "Seguir editando",
        onOk: () => { setViewMode("list"); setCurrentNews(null); },
      });
    } else {
      setViewMode("list");
      setCurrentNews(null);
    }
  };

  const isDirty = () => {
    if (!currentNews) return false;
    const original = newsList.find((n) => n.id === currentNews.id) || emptyNews;
    return JSON.stringify(currentNews) !== JSON.stringify(original);
  };

  const handleSave = async () => {
    const isUpdating = currentNews && currentNews.id;
    setIsSaving(true);
    try {
      console.log("Saving news:", currentNews);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      notification.success({
        message: `Novedad ${isUpdating ? "Actualizada" : "Creada"}`,
        description: `La novedad se ha ${isUpdating ? "actualizado" : "creado"} correctamente.`,
      });
      fetchNews();
      setViewMode("list");
      setCurrentNews(null);
    } catch (error) {
      notification.error({ message: "Error al Guardar" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "¿Estás seguro de que deseas eliminar esta novedad?",
      content: "Esta acción no se puede deshacer.",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => { /* TODO: servicio */ },
    });
  };

  const filteredNews = newsList.filter((item) => {
    const matchSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType =
      filterType === "all" ||
      (item.type || (item.link ? "externa" : "interna")) === filterType;
    return matchSearch && matchType;
  });

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando novedades...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-unified-page">
      <div className="admin-unified-decorations">
        <div className="admin-floating-element admin-floating-element-1"></div>
        <div className="admin-floating-element admin-floating-element-2"></div>
        <div className="admin-floating-element admin-floating-element-3"></div>
      </div>

      {viewMode === "list" ? (
        <>
          <div className="admin-unified-header">
            <h1 className="admin-unified-title"><BellOutlined /> Gestión de Novedades</h1>
            <p className="admin-unified-subtitle">
              Administrá las novedades del grupo GILIA. Podés crear novedades con enlace externo o con contenido propio.
            </p>
            <button className="admin-unified-primary-btn" onClick={() => handleOpenEditor()}>
              <PlusOutlined /> Nueva Novedad
            </button>
          </div>

          <div className="admin-unified-filters">
            <div className="admin-unified-search">
              <SearchOutlined className="admin-unified-search-icon" />
              <input
                type="text"
                placeholder="Buscar por título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="admin-unified-filter-select"
            >
              <option value="all">Todos los tipos</option>
              <option value="externa">Con enlace externo</option>
              <option value="interna">Con contenido propio</option>
            </select>
          </div>

          {filteredNews.length === 0 ? (
            <div className="admin-unified-empty">
              <BellOutlined className="admin-unified-empty-icon" />
              <h3 className="admin-unified-empty-title">Sin novedades</h3>
              <p className="admin-unified-empty-description">
                {searchTerm || filterType !== "all"
                  ? "No se encontraron resultados."
                  : "Todavía no hay novedades cargadas."}
              </p>
            </div>
          ) : (
            <div className="modern-table-container">
              <table className="modern-admin-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNews.map((item) => {
                    const tipo = item.type || (item.link ? "externa" : "interna");
                    return (
                      <tr key={item.id}>
                        <td data-label="Título"><strong>{item.title}</strong></td>
                        <td data-label="Tipo">
                          <span className={`status-badge ${tipo === "externa" ? "pending" : "active"}`}>
                            {tipo === "externa" ? <><LinkOutlined /> Enlace externo</> : <><FileTextOutlined /> Contenido propio</>}
                          </span>
                        </td>
                        <td data-label="Fecha">{item.date || "—"}</td>
                        <td className="actions-cell">
                          <div className="modern-actions">
                            <button className="btn-action btn-action-edit" onClick={() => handleOpenEditor(item)}>
                              <EditOutlined /> Modificar
                            </button>
                            <button className="btn-action btn-action-delete" onClick={() => handleDelete(item.id)}>
                              <DeleteOutlined /> Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <NewsEditor
          news={currentNews}
          setNews={setCurrentNews}
          onSave={handleSave}
          onCancel={() => handleCloseEditor()}
          isSaving={isSaving}
          allResearchLines={researchLines}
          allExtensionLines={extensionLines}
        />
      )}
    </div>
  );
};

/* ======================================================
   Editor de Novedad
   ====================================================== */
const NewsEditor = ({ news, setNews, onSave, onCancel, isSaving, allResearchLines = [], allExtensionLines = [] }) => {
  const [editorTab, setEditorTab] = useState("write");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Al cambiar el tipo limpiamos el campo del otro tipo
    if (name === "type") {
      setNews((prev) => ({
        ...prev,
        type: value,
        link: value === "interna" ? "" : prev.link,
        description: value === "externa" ? "" : prev.description,
      }));
      return;
    }
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const toggleRL = (id) => {
    setNews((prev) => {
      const current = prev.relatedResearchLines || [];
      return {
        ...prev,
        relatedResearchLines: current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id],
      };
    });
  };

  const toggleEL = (id) => {
    setNews((prev) => {
      const current = prev.relatedExtensionLines || [];
      return {
        ...prev,
        relatedExtensionLines: current.includes(id)
          ? current.filter((x) => x !== id)
          : [...current, id],
      };
    });
  };

  const selectedRL = news.relatedResearchLines || [];
  const selectedEL = news.relatedExtensionLines || [];
  const isExterna = news.type === "externa";

  return (
    <div className="admin-editor-container">
      <div className="admin-editor-header">
        <div className="admin-editor-header-left">
          <div className="admin-editor-breadcrumb" onClick={onCancel}>
            <ArrowLeftOutlined /> Volver al listado
          </div>
          <h2 className="admin-editor-title">
            {news.id ? `Editando: ${news.title}` : "Nueva Novedad"}
          </h2>
        </div>
        <div className="admin-editor-actions">
          <button className="btn-action btn-action-edit" onClick={onCancel} style={{ marginRight: "0.5rem" }}>
            Cancelar
          </button>
          <button className="admin-unified-primary-btn" onClick={onSave} disabled={isSaving}>
            <SaveOutlined /> {isSaving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      

      <div className="admin-editor-layout">
        <div className="admin-editor-main">

          {/* Datos principales */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title"><SettingOutlined /> Información Principal</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="editor-form-group">
                <label className="editor-label">Título</label>
                <input type="text" name="title" className="editor-input"
                  value={news.title} onChange={handleChange}
                  placeholder="Título de la novedad..." />
              </div>
              <div className="editor-form-group">
                <label className="editor-label">Resumen (summary)</label>
                <textarea name="summary" className="editor-textarea" style={{ minHeight: "90px" }}
                  value={news.summary} onChange={handleChange}
                  placeholder="Breve descripción que se muestra en el listado..." />
              </div>
            </div>
          </div>

          {/* Tipo de novedad */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title">Tipo de Novedad</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="editor-form-group" style={{ marginBottom: 0 }}>
                <label className="editor-label">¿Cómo se presenta esta novedad?</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <label className={`editor-checkbox-item${!isExterna ? "" : " editor-checkbox-item--checked"}`}>
                    <input type="radio" name="type" value="externa"
                      checked={isExterna} onChange={handleChange}
                      style={{ width: 16, height: 16, accentColor: "#3b82f6" }} />
                    <span>
                      <strong><LinkOutlined /> Enlace externo</strong>
                      <br />
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Redirige a otra página (facultad, etc.)</span>
                    </span>
                  </label>
                  <label className={`editor-checkbox-item${isExterna ? "" : " editor-checkbox-item--checked"}`}>
                    <input type="radio" name="type" value="interna"
                      checked={!isExterna} onChange={handleChange}
                      style={{ width: 16, height: 16, accentColor: "#3b82f6" }} />
                    <span>
                      <strong><FileTextOutlined /> Contenido propio</strong>
                      <br />
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Se muestra en detalle en GILIA</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Campo condicional: link o description */}
          {isExterna ? (
            <div className="admin-editor-card">
              <div className="admin-editor-card-header">
                <h3 className="admin-editor-card-title"><LinkOutlined /> Enlace Externo</h3>
              </div>
              <div className="admin-editor-card-body">
                <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 0, marginBottom: "0.75rem" }}>
                  Esta novedad redirigirá al usuario a la URL indicada (por ejemplo, el sitio de la facultad).
                </p>
                <div className="editor-form-group" style={{ marginBottom: 0 }}>
                  <label className="editor-label">URL de la noticia</label>
                  <input type="text" name="link" className="editor-input"
                    value={news.link} onChange={handleChange}
                    placeholder="https://fi.uncoma.edu.ar/..." />
                </div>
              </div>
            </div>
          ) : (
            <div className="admin-editor-card">
              <div className="admin-editor-card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 className="admin-editor-card-title"><FileTextOutlined /> Descripción Detallada</h3>
                <div className="markdown-editor-controls">
                  <button
                    className={`editor-tab-btn ${editorTab === "write" ? "active" : ""}`}
                    onClick={() => setEditorTab("write")}
                  >
                    <EditOutlined /> Escribir
                  </button>
                  <button
                    className={`editor-tab-btn ${editorTab === "preview" ? "active" : ""}`}
                    onClick={() => setEditorTab("preview")}
                  >
                    <EyeOutlined /> Vista Previa
                  </button>
                </div>
              </div>
              <div className="admin-editor-card-body">
                {editorTab === "write" ? (
                  <div className="markdown-editor-pane">
                    <textarea
                      name="description"
                      className="markdown-textarea"
                      value={news.description}
                      onChange={handleChange}
                      placeholder="Escribí aquí el contenido completo usando Markdown..."
                    />
                  </div>
                ) : (
                  <div className="markdown-preview-pane">
                    <div className="markdown-preview-content">
                      <ReactMarkdown>{news.description || "*No hay contenido para mostrar*"}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Líneas de Investigación */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title"><ApartmentOutlined /> Líneas de Investigación</h3>
            </div>
            <div className="admin-editor-card-body">
              <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 0, marginBottom: "0.75rem" }}>
                Asociá esta novedad con líneas de investigación relacionadas.
              </p>
              <div className="editor-checkbox-list">
                {allResearchLines.map((line) => {
                  const checked = selectedRL.includes(line.id);
                  return (
                    <label key={line.id} className={`editor-checkbox-item${checked ? " editor-checkbox-item--checked" : ""}`}>
                      <input type="checkbox" checked={checked} onChange={() => toggleRL(line.id)} />
                      <span>{line.title}</span>
                    </label>
                  );
                })}
                {allResearchLines.length === 0 && (
                  <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Cargando líneas...</p>
                )}
              </div>
            </div>
          </div>

          {/* Líneas de Extensión */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title"><ApartmentOutlined /> Líneas de Extensión</h3>
            </div>
            <div className="admin-editor-card-body">
              <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 0, marginBottom: "0.75rem" }}>
                Asociá esta novedad con líneas de extensión relacionadas.
              </p>
              <div className="editor-checkbox-list">
                {allExtensionLines.map((line) => {
                  const checked = selectedEL.includes(line.id);
                  return (
                    <label key={line.id} className={`editor-checkbox-item${checked ? " editor-checkbox-item--checked" : ""}`}>
                      <input type="checkbox" checked={checked} onChange={() => toggleEL(line.id)} />
                      <span>{line.title}</span>
                    </label>
                  );
                })}
                {allExtensionLines.length === 0 && (
                  <p style={{ color: "#64748b", fontSize: "0.85rem" }}>Cargando líneas...</p>
                )}
              </div>
            </div>
          </div>

        </div>

        <div className="admin-editor-sidebar">

          

          {/* Metadatos */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title"><CalendarOutlined /> Metadatos</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="editor-form-group">
                <label className="editor-label"><CalendarOutlined /> Fecha</label>
                <input type="date" name="date" className="editor-input"
                  value={news.date ? news.date.split("T")[0] : ""}
                  onChange={handleChange} />
              </div>
              <div className="editor-form-group" style={{ marginBottom: 0 }}>
                <label className="editor-label">URL de Imagen</label>
                <input type="text" name="image" className="editor-input"
                  value={news.image} onChange={handleChange}
                  placeholder="/images/novedad.png o URL externa..." />
              </div>
            </div>
          </div>

          {/* Resumen de relaciones */}
          {(selectedRL.length > 0 || selectedEL.length > 0) && (
            <div className="admin-editor-card">
              <div className="admin-editor-card-header">
                <h3 className="admin-editor-card-title">Relaciones Seleccionadas</h3>
              </div>
              <div className="admin-editor-card-body">
                {selectedRL.length > 0 && (
                  <div style={{ marginBottom: "0.75rem" }}>
                    <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
                      Investigación ({selectedRL.length})
                    </p>
                    {selectedRL.map((id) => {
                      const l = allResearchLines.find((x) => x.id === id);
                      return l ? <span key={id} className="tag-chip" style={{ marginBottom: "0.25rem", display: "inline-block" }}>{l.title}</span> : null;
                    })}
                  </div>
                )}
                {selectedEL.length > 0 && (
                  <div>
                    <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
                      Extensión ({selectedEL.length})
                    </p>
                    {selectedEL.map((id) => {
                      const l = allExtensionLines.find((x) => x.id === id);
                      return l ? <span key={id} className="tag-chip" style={{ marginBottom: "0.25rem", display: "inline-block" }}>{l.title}</span> : null;
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminNews;
