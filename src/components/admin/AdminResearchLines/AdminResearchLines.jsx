import { useState, useEffect } from "react";
import { getResearchLines, getProjects, getPublications, getNews, getTools } from "../../../services";
import { notification, Modal, Select } from "antd";
import ReactMarkdown from "react-markdown";
import {
  ExperimentOutlined,
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
  PictureOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  LinkOutlined,
  CloudUploadOutlined,
  CloseOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";

// Assuming LineEditor is a sub-component or the edit view logic is directly within AdminLineasInvestigacion
// This JSX block needs to be placed within the conditional rendering for viewMode === "edit"
// For the purpose of this edit, I'm placing it where it would logically fit if LineEditor was a separate component
// or if the edit view was a large block within the main component.
// Since the provided code snippet for the edit view is incomplete, I'll integrate the new sections
// into the main component's render logic for the "edit" view.

const AdminLineasInvestigacion = () => {
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list"); // "list" | "edit"
  const [currentLinea, setCurrentLinea] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Lists for relationships
  const [projectsList, setProjectsList] = useState([]);
  const [publicationsList, setPublicationsList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [toolsList, setToolsList] = useState([]);

  useEffect(() => {
    fetchLineas();
    fetchRelatedEntities();
  }, []);

  const fetchRelatedEntities = async () => {
    try {
      const [projRes, pubRes, newsRes, toolRes] = await Promise.all([
        getProjects(),
        getPublications(),
        getNews(),
        getTools()
      ]);
      setProjectsList(projRes.data || []);
      setPublicationsList(pubRes.data || []);
      setNewsList(newsRes.data || []);
      setToolsList(toolRes.data || []);
    } catch (error) {
      console.error("Error fetching related entities:", error);
    }
  };

  const fetchLineas = async () => {
    setLoading(true);
    try {
      const response = await getResearchLines();
      // Ensure images is always an array of objects { url, caption }
      const mappedData = response.data.map(l => {
        let rawImages = Array.isArray(l.images) ? l.images : (l.image ? [l.image] : []);
        return {
          ...l,
          images: rawImages.map(img => 
            typeof img === 'string' ? { url: img, caption: "" } : img
          )
        };
      });
      setLines(mappedData);
    } catch (error) {
      console.error("Error al obtener las líneas de investigación:", error);
      notification.error({
        message: "Error de Carga",
        description: "No se pudieron cargar las líneas de investigación.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (linea = null) => {
    setCurrentLinea(linea ? { ...linea } : { 
      title: "", 
      type: "Investigación",
      description: "", 
      images: [],
      status: "Activa",
      relatedNews: [],
      relatedTools: [],
      relatedProjects: [],
      relatedPublications: []
    });
    setViewMode("edit");
  };

  const handleCloseEditor = (force = false) => {
    if (!force && isDirty()) {
      Modal.confirm({
        title: "Cambios sin guardar",
        content: "¿Estás seguro de que deseas salir? Se perderán los cambios realizados.",
        okText: "Descartar",
        cancelText: "Seguir editando",
        onOk: () => {
          setViewMode("list");
          setCurrentLinea(null);
        },
      });
    } else {
      setViewMode("list");
      setCurrentLinea(null);
    }
  };

  const isDirty = () => {
    if (!currentLinea) return false;
    const original = lines.find(l => l.id === currentLinea.id) || {
      title: "", 
      type: "Investigación",
      description: "", 
      images: [],
      status: "Activa",
      relatedNews: [],
      relatedTools: [],
      relatedProjects: [],
      relatedPublications: []
    };
    
    return JSON.stringify(currentLinea) !== JSON.stringify(original);
  };

  const handleSave = async () => {
    const isUpdating = currentLinea && currentLinea.id;
    setIsSaving(true);
    try {
      // Simulation
      console.log("Saving payload:", currentLinea);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      notification.success({
        message: `Línea ${isUpdating ? "Actualizada" : "Creada"}`,
        description: `La línea de investigación se ha ${isUpdating ? "actualizado" : "creado"} correctamente.`,
      });
      fetchLineas();
      setViewMode("list");
      setCurrentLinea(null);
    } catch (error) {
      console.error("Error al guardar la línea de investigación:", error);
      notification.error({
        message: "Error al Guardar",
        description: `No se pudo ${isUpdating ? "actualizar" : "crear"} la línea de investigación.`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const filteredLineas = lines.filter(l => 
    l.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Activa": return "active";
      case "En desarrollo": return "pending";
      case "Pausada": return "inactive";
      default: return "pending";
    }
  };

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando líneas de investigación...</p>
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
            <h1 className="admin-unified-title">
              <ExperimentOutlined />
              Líneas de Investigación
            </h1>
            <p className="admin-unified-subtitle">
              Gestiona las líneas de investigación del grupo GILIA. 
              Modelo simplificado: Título, Tipo, Descripción (Markdown), Imágenes y Estado.
            </p>

            <button
              className="admin-unified-primary-btn"
              onClick={() => handleOpenModal()}
            >
              <PlusOutlined />
              Nueva Línea de Investigación
            </button>
          </div>

          <div className="admin-unified-filters">
            <div className="admin-unified-search">
              <SearchOutlined className="admin-unified-search-icon" />
              <input
                type="text"
                placeholder="Buscar líneas de investigación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredLineas.length === 0 ? (
            <div className="admin-unified-empty">
              <ExperimentOutlined className="admin-unified-empty-icon" />
              <h3 className="admin-unified-empty-title">Sin resultados</h3>
              <p className="admin-unified-empty-description">
                No se encontraron líneas que coincidan con la búsqueda.
              </p>
            </div>
          ) : (
            <div className="modern-table-container">
              <table className="modern-admin-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Tipo</th>
                    <th>Imágenes</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLineas.map((linea) => (
                    <tr key={linea.id}>
                      <td data-label="Título">
                        <strong>{linea.title}</strong>
                      </td>
                      <td data-label="Tipo">
                        <span className="status-badge pending">
                          {linea.type === "Investigación" ? "Line Research" : "Line Extension"}
                        </span>
                      </td>
                      <td data-label="Imágenes">
                        <span className="status-badge inactive">
                          {linea.images?.length || 0} fotos
                        </span>
                      </td>
                      <td data-label="Estado">
                        <span className={`status-badge ${getStatusBadgeClass(linea.status)}`}>
                          {linea.status}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <div className="modern-actions">
                          <button
                            className="btn-action btn-action-view"
                            title="Ver"
                            onClick={() => handleOpenModal(linea)}
                          >
                            <EyeOutlined /> Ver
                          </button>
                          <button
                            className="btn-action btn-action-edit"
                            title="Modificar"
                            onClick={() => handleOpenModal(linea)}
                          >
                            <EditOutlined /> Modificar
                          </button>
                          <button
                            className="btn-action btn-action-delete"
                            title="Eliminar"
                          >
                            <DeleteOutlined /> Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      ) : (
        <LineEditor 
          linea={currentLinea} 
          setLinea={setCurrentLinea}
          onSave={handleSave} 
          onCancel={() => handleCloseEditor()}
          isSaving={isSaving}
          projectsList={projectsList}
          publicationsList={publicationsList}
          newsList={newsList}
          toolsList={toolsList}
        />
      )}
    </div>
  );
};

const ImageManager = ({ images, setImages }) => {
  const [addMode, setAddMode] = useState("upload"); // "upload" | "url"
  const [urlInput, setUrlInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  // Sync activeIndex if images are removed
  useEffect(() => {
    if (images.length === 0) {
      setActiveIndex(0);
    } else if (activeIndex >= images.length) {
      setActiveIndex(images.length - 1);
    }
  }, [images.length, activeIndex]);

  const handleUrlAdd = () => {
    if (urlInput.trim()) {
      const newImages = [...images, { url: urlInput.trim(), caption: "" }];
      setImages(newImages);
      setUrlInput("");
      setActiveIndex(newImages.length - 1);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      const newImages = [...images, { url: fakeUrl, caption: "" }];
      setImages(newImages);
      setActiveIndex(newImages.length - 1);
    }
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const updateCaption = (e) => {
    const updated = [...images];
    updated[activeIndex].caption = e.target.value;
    setImages(updated);
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImg = images[activeIndex];

  return (
    <div className="gallery-carousel-manager">
      <div className="carousel-main-section">
        <div className="carousel-viewer-container">
          {images.length > 0 ? (
            <div className="carousel-active-wrapper">
              <div className="carousel-display">
                <img src={currentImg.url} alt="Active" className="carousel-main-img" />
                
                {images.length > 1 && (
                  <>
                    <button className="carousel-nav-btn prev" onClick={prevImage}>
                      <LeftOutlined />
                    </button>
                    <button className="carousel-nav-btn next" onClick={nextImage}>
                      <RightOutlined />
                    </button>
                  </>
                )}

                <button className="carousel-delete-btn" onClick={() => removeImage(activeIndex)}>
                  <DeleteOutlined />
                </button>

                <div className="carousel-pagination">
                  {images.map((_, i) => (
                    <span 
                      key={i} 
                      className={`pagination-dot ${i === activeIndex ? 'active' : ''}`}
                      onClick={() => setActiveIndex(i)}
                    />
                  ))}
                </div>
              </div>

              <div className="carousel-caption-section">
                <label className="editor-label">Pie de imagen ({activeIndex + 1}/{images.length})</label>
                <input 
                  type="text"
                  className="gallery-caption-input-large"
                  placeholder="Escribe un pie de imagen descriptivo..."
                  value={currentImg.caption || ""}
                  onChange={updateCaption}
                />
              </div>
            </div>
          ) : (
            <div className="carousel-empty-state">
              <PictureOutlined />
              <p>No hay imágenes en la galería aún</p>
            </div>
          )}
        </div>

        <div className="carousel-controls-sidebar">
          <div className="add-image-tabs-compact">
            <button 
              className={`add-image-tab-compact-btn ${addMode === 'upload' ? 'active' : ''}`}
              onClick={() => setAddMode('upload')}
            >
              <CloudUploadOutlined /> Subir
            </button>
            <button 
              className={`add-image-tab-compact-btn ${addMode === 'url' ? 'active' : ''}`}
              onClick={() => setAddMode('url')}
            >
              <LinkOutlined /> URL
            </button>
          </div>

          <div className="add-image-content-compact">
            {addMode === 'upload' ? (
              <label className="upload-dropzone-compact">
                <input type="file" hidden onChange={handleFileUpload} accept="image/*" />
                <PlusOutlined />
                <span>Agregar Imagen</span>
              </label>
            ) : (
              <div className="image-url-input-compact">
                <input 
                  type="text" 
                  className="editor-input-compact" 
                  placeholder="Pegar URL..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleUrlAdd()}
                />
                <button className="admin-unified-primary-btn compact" onClick={handleUrlAdd}>
                  <PlusOutlined />
                </button>
              </div>
            )}
          </div>

          {images.length > 0 && (
            <div className="carousel-thumbnails-preview">
              {images.map((img, i) => (
                <div 
                  key={i} 
                  className={`thumb-preview-item ${i === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(i)}
                >
                  <img src={img.url} alt={`Thumb ${i}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const LineEditor = ({ 
  linea, setLinea, onSave, onCancel, isSaving,
  projectsList, publicationsList, newsList, toolsList 
}) => {
  const [editorTab, setEditorTab] = useState("write"); // "write" | "preview"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinea(prev => ({ ...prev, [name]: value }));
  };

  const setImages = (newImages) => {
    setLinea(prev => ({ ...prev, images: newImages }));
  };

  return (
    <div className="admin-editor-container">
      <div className="admin-editor-header">
        <div className="admin-editor-header-left">
          <div className="admin-editor-breadcrumb" onClick={onCancel}>
            <ArrowLeftOutlined /> Volver al listado
          </div>
          <h2 className="admin-editor-title">
            {linea.id ? `Editando: ${linea.title}` : "Nueva Línea"}
          </h2>
        </div>
        <div className="admin-editor-actions">
          <button className="btn-action btn-action-edit" onClick={onCancel} style={{ marginRight: '0.5rem' }}>
            Cancelar
          </button>
          <button className="admin-unified-primary-btn" onClick={onSave} disabled={isSaving}>
            <SaveOutlined /> {isSaving ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </div>

      <div className="admin-editor-layout">
        {/* Seccion General */}
        <div className="admin-editor-card">
          <div className="admin-editor-card-header">
            <h3 className="admin-editor-card-title"><SettingOutlined /> Configuración Básica</h3>
          </div>
          <div className="admin-editor-card-body">
            <div className="editor-form-group">
              <label className="editor-label">Título de la Línea</label>
              <input 
                type="text" 
                name="title"
                className="editor-input" 
                value={linea.title} 
                onChange={handleChange}
                placeholder="Ej: Inteligencia Artificial..."
              />
            </div>
          </div>
        </div>

        {/* Seccion Clasificación y Estado */}
        <div className="admin-editor-card">
          <div className="admin-editor-card-header">
            <h3 className="admin-editor-card-title">Clasificación y Estado</h3>
          </div>
          <div className="admin-editor-card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div className="editor-form-group" style={{ marginBottom: 0 }}>
              <label className="editor-label"><InfoCircleOutlined /> Tipo de Línea</label>
              <select 
                name="type"
                className="editor-select" 
                value={linea.type} 
                onChange={handleChange}
              >
                <option value="Investigación">Line Research</option>
                <option value="Extensión">Line Extension</option>
              </select>
            </div>
            <div className="editor-form-group" style={{ marginBottom: 0 }}>
              <label className="editor-label">Estado Actual</label>
              <select 
                name="status"
                className="editor-select" 
                value={linea.status} 
                onChange={handleChange}
              >
                <option value="Activa">Activa</option>
                <option value="En desarrollo">En Desarrollo</option>
                <option value="Pausada">Pausada</option>
              </select>
            </div>
          </div>
        </div>

        {/* Seccion Markdown Editor */}
        <div className="admin-editor-card">
          <div className="admin-editor-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="admin-editor-card-title"><EditOutlined /> Descripción Detallada</h3>
            <div className="markdown-editor-controls">
              <button 
                className={`editor-tab-btn ${editorTab === 'write' ? 'active' : ''}`}
                onClick={() => setEditorTab('write')}
              >
                <EditOutlined /> Escribir
              </button>
              <button 
                className={`editor-tab-btn ${editorTab === 'preview' ? 'active' : ''}`}
                onClick={() => setEditorTab('preview')}
              >
                <EyeOutlined /> Vista Previa
              </button>
            </div>
          </div>
          <div className="admin-editor-card-body">
            {editorTab === 'write' ? (
              <div className="markdown-editor-pane">
                <textarea 
                  name="description"
                  className="markdown-textarea"
                  value={linea.description}
                  onChange={handleChange}
                  placeholder="Escribe aquí usando lenguaje Markdown..."
                />
              </div>
            ) : (
              <div className="markdown-preview-pane">
                <div className="markdown-preview-content">
                  <ReactMarkdown>{linea.description || "*No hay contenido para mostrar*"}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Seccion Galerìa de Imágenes */}
        <div className="admin-editor-card">
          <div className="admin-editor-card-header">
            <h3 className="admin-editor-card-title"><PictureOutlined /> Galería de Imágenes</h3>
          </div>
          <div className="admin-editor-card-body">
            <ImageManager images={linea.images} setImages={setImages} />
          </div>
        </div>

        {/* Sección de Relaciones (Publicaciones, Herramientas, Proyectos, Noticias) */}
        <div className="admin-editor-card">
          <div className="admin-editor-card-header">
            <h3 className="admin-editor-card-title">Asociaciones y Relaciones</h3>
          </div>
          <div className="admin-editor-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div className="editor-form-group">
                <label className="editor-label">Proyectos Relacionados</label>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Seleccionar proyectos..."
                  value={linea.relatedProjects || []}
                  onChange={(val) => setLinea(prev => ({ ...prev, relatedProjects: val }))}
                  options={projectsList.map(p => ({ label: p.name, value: p.id }))}
                  optionFilterProp="label"
                />
              </div>
              <div className="editor-form-group">
                <label className="editor-label">Publicaciones Relacionadas</label>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Seleccionar publicaciones..."
                  value={linea.relatedPublications || []}
                  onChange={(val) => setLinea(prev => ({ ...prev, relatedPublications: val }))}
                  options={publicationsList.map(p => ({ label: p.title, value: p.id }))}
                  optionFilterProp="label"
                />
              </div>
              <div className="editor-form-group" style={{ marginBottom: 0 }}>
                <label className="editor-label">Noticias Relacionadas</label>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Seleccionar noticias..."
                  value={linea.relatedNews || []}
                  onChange={(val) => setLinea(prev => ({ ...prev, relatedNews: val }))}
                  options={newsList.map(n => ({ label: n.title, value: n.id }))}
                  optionFilterProp="label"
                />
              </div>
              <div className="editor-form-group" style={{ marginBottom: 0 }}>
                <label className="editor-label">Herramientas Relacionadas</label>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Seleccionar herramientas..."
                  value={linea.relatedTools || []}
                  onChange={(val) => setLinea(prev => ({ ...prev, relatedTools: val }))}
                  options={toolsList.map(t => ({ label: t.name, value: t.id }))}
                  optionFilterProp="label"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLineasInvestigacion;
