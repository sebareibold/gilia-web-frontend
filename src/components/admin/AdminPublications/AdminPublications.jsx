"use client";

import { useState, useEffect } from "react";
import { getPublications, getTeamMembers, getResearchLines, getExtensionLines } from "../../../services";
import { notification, Modal, Select, Radio } from "antd";
import ReactMarkdown from "react-markdown";
import {
  BookOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
  CloseOutlined,
  LinkOutlined,
  TagsOutlined,
  TeamOutlined,
  SettingOutlined,
  CalendarOutlined,
  InfoCircleOutlined,
  ExperimentOutlined,
  ProjectOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";

const AdminPublicaciones = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // "list" | "edit"
  const [currentPublicacion, setCurrentPublicacion] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Relationship lists
  const [teamList, setTeamList] = useState([]);
  const [researchLinesList, setResearchLinesList] = useState([]);
  const [extensionLinesList, setExtensionLinesList] = useState([]);

  useEffect(() => {
    fetchPublicaciones();
    fetchRelatedEntities();
  }, []);

  const fetchRelatedEntities = async () => {
    try {
      const [teamRes, resLinesRes, extLinesRes] = await Promise.all([
        getTeamMembers(),
        getResearchLines(),
        getExtensionLines()
      ]);
      setTeamList(teamRes.data || []);
      setResearchLinesList(resLinesRes.data || []);
      setExtensionLinesList(extLinesRes.data || []);
    } catch (error) {
      console.error("Error fetching related entities for publications:", error);
    }
  };

  const fetchPublicaciones = async () => {
    setLoading(true);
    try {
      const response = await getPublications();
      setPosts(response.data);
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
      notification.error({
        message: "Error de Carga",
        description:
          "No se pudieron cargar las publicaciones. Por favor, intente de nuevo más tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (publicacion = null) => {
    setCurrentPublicacion(publicacion ? { 
      ...publicacion,
      resourceType: publicacion.document ? "file" : "link"
    } : { 
      title: "", 
      type: "Articulo",
      description: "", 
      publicationLink: "", 
      document: null,
      resourceType: "link",
      date: "",
      personas: [],
      researchLines: [],
      extensionLines: []
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
          setCurrentPublicacion(null);
        },
      });
    } else {
      setViewMode("list");
      setCurrentPublicacion(null);
    }
  };

  const isDirty = () => {
    if (!currentPublicacion) return false;
    const original = posts.find(p => p.id === currentPublicacion.id) || {
      title: "", 
      description: "", 
      link: "", 
      authors: [], 
      tags: [],
      date: "",
      status: "Publicada"
    };
    
    return JSON.stringify(currentPublicacion) !== JSON.stringify(original);
  };

  const handleSave = async () => {
    const isUpdating = currentPublicacion && currentPublicacion.id;
    setIsSaving(true);
    
    // Cleanup mutually exclusive fields
    const publicationData = { ...currentPublicacion };
    if (publicationData.resourceType === 'link') {
      publicationData.document = null;
    } else {
      publicationData.publicationLink = "";
    }
    // Remove temporary UI field
    delete publicationData.resourceType;

    try {
      // Simulation
      console.log("Saving publication:", publicationData);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      notification.success({
        message: `Publicación ${isUpdating ? "Actualizada" : "Creada"}`,
        description: `La publicación se ha ${isUpdating ? "actualizado" : "creado"} correctamente.`,
      });
      fetchPublicaciones();
      setViewMode("list");
      setCurrentPublicacion(null);
    } catch (error) {
      console.error("Error al guardar la publicación:", error);
      notification.error({
        message: "Error al Guardar",
        description: `No se pudo ${isUpdating ? "actualizar" : "crear"} la publicación.`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "¿Estás seguro de que deseas eliminar esta publicación?",
      content: "Esta acción no se puede deshacer.",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => {
        /* Simulation */
        notification.success({
          message: "Publicación Eliminada",
          description: "La publicación ha sido eliminada correctamente.",
        });
        setPosts(prev => prev.filter(p => p.id !== id));
      },
    });
  };

  const filteredPublicaciones = posts;

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando publicaciones...</p>
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
              <BookOutlined />
              Publicaciones
            </h1>
            <p className="admin-unified-subtitle">
              Gestiona las publicaciones científicas del grupo GILIA. Administra
              artículos, papers, capítulos de libros y otras contribuciones
              académicas.
            </p>

            <button
              className="admin-unified-primary-btn"
              onClick={() => handleOpenModal()}
            >
              <PlusOutlined />
              Nueva Publicación
            </button>
          </div>

          <div className="admin-unified-filters">
            <div className="admin-unified-search">
              <SearchOutlined className="admin-unified-search-icon" />
              <input
                type="text"
                placeholder="Buscar por título o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredPublicaciones.length === 0 ? (
            <div className="admin-unified-empty">
              <BookOutlined className="admin-unified-empty-icon" />
              <h3 className="admin-unified-empty-title">No hay publicaciones</h3>
              <p className="admin-unified-empty-description">
                {searchTerm || filterType !== "all"
                  ? "No se encontraron resultados para los filtros aplicados."
                  : "Comienza agregando tu primera publicación."}
              </p>
              {!searchTerm && filterType === "all" && (
                <button 
                  className="admin-unified-primary-btn"
                  onClick={() => handleOpenModal()}
                >
                  <PlusOutlined />
                  Agregar Primera Publicación
                </button>
              )}
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
                  {filteredPublicaciones.map((post) => (
                    <tr key={post.id}>
                      <td data-label="Título">
                        <strong>{post.title}</strong>
                      </td>
                      <td data-label="Tipo">
                        <span className="status-badge pending">{post.type || "Articulo"}</span>
                      </td>
                      <td data-label="Fecha">
                        <span className="news-views">{post.date || "-"}</span>
                      </td>
                      <td className="actions-cell">
                        <div className="modern-actions">
                          <button
                            className="btn-action btn-action-view"
                            title="Ver"
                            onClick={() => handleOpenModal(post)}
                          >
                            <EyeOutlined /> Ver
                          </button>
                          <button
                            className="btn-action btn-action-edit"
                            title="Modificar"
                            onClick={() => handleOpenModal(post)}
                          >
                            <EditOutlined /> Modificar
                          </button>
                          <button
                            className="btn-action btn-action-delete"
                            title="Eliminar"
                            onClick={() => handleDelete(post.id)}
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
        <PublicationEditor 
          pub={currentPublicacion}
          setPub={setCurrentPublicacion}
          onSave={handleSave}
          onCancel={() => handleCloseEditor()}
          isSaving={isSaving}
          teamList={teamList}
          researchLinesList={researchLinesList}
          extensionLinesList={extensionLinesList}
        />
      )}
    </div>
  );
};

const PublicationEditor = ({ 
  pub, setPub, onSave, onCancel, isSaving,
  teamList, researchLinesList, extensionLinesList 
}) => {
  const [editorTab, setEditorTab] = useState("write");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPub(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPub(prev => ({ ...prev, document: file.name }));
    }
  };

  return (
    <div className="admin-editor-container">
      <div className="admin-editor-header">
        <div className="admin-editor-header-left">
          <div className="admin-editor-breadcrumb" onClick={onCancel}>
            <ArrowLeftOutlined /> Volver al listado
          </div>
          <h2 className="admin-editor-title">
            {pub.id ? `Editando Publicación: ${pub.title}` : "Nueva Publicación"}
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
        {/* Seccion Info Basica */}
        <div className="admin-editor-card">
          <div className="admin-editor-card-header">
            <h3 className="admin-editor-card-title"><SettingOutlined /> Información General</h3>
          </div>
          <div className="admin-editor-card-body">
            <div className="editor-form-group">
              <label className="editor-label">Título de la Publicación</label>
              <input 
                type="text" 
                name="title"
                className="editor-input" 
                value={pub.title} 
                onChange={handleChange}
                placeholder="Ej: Análisis de Algoritmos..."
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              <div className="editor-form-group" style={{ marginBottom: 0 }}>
                <label className="editor-label"><CalendarOutlined /> Fecha de Publicación</label>
                <input 
                  type="date" 
                  name="date"
                  className="editor-input" 
                  value={pub.date} 
                  onChange={handleChange}
                />
              </div>
              <div className="editor-form-group" style={{ marginBottom: 0 }}>
                <label className="editor-label"><InfoCircleOutlined /> Tipo</label>
                <select 
                  name="type"
                  className="editor-select"
                  value={pub.type}
                  onChange={handleChange}
                >
                  <option value="Articulo">Artículo</option>
                  <option value="Libro">Libro / Capítulo</option>
                  <option value="Tesis">Tesis</option>
                  <option value="Conferencia">Conferencia / Paper</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Seccion Markdown Editor */}
        <div className="admin-editor-card">
          <div className="admin-editor-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="admin-editor-card-title"><EditOutlined /> Descripción / Resumen (Markdown)</h3>
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
                  value={pub.description}
                  onChange={handleChange}
                  placeholder="Escribe el resumen usando Markdown..."
                />
              </div>
            ) : (
              <div className="markdown-preview-pane">
                <div className="markdown-preview-content">
                  <ReactMarkdown>{pub.description || "*No hay contenido para mostrar*"}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recursos y Enlaces */}
        <div className="admin-editor-card">
          <div className="admin-editor-card-header">
            <h3 className="admin-editor-card-title"><LinkOutlined /> Recursos de la Publicación</h3>
          </div>
          <div className="admin-editor-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'start' }}>
              <div className="editor-form-group" style={{ marginBottom: 0 }}>
                <label className="editor-label">Elija el recurso a mostrar</label>
                <Radio.Group 
                  value={pub.resourceType} 
                  onChange={(e) => setPub(prev => ({ ...prev, resourceType: e.target.value }))}
                  buttonStyle="solid"
                  className="admin-radio-group-modern"
                >
                  <Radio.Button value="link" style={{ padding: '0 20px' }}>Enlace Externo</Radio.Button>
                  <Radio.Button value="file" style={{ padding: '0 20px' }}>Archivo PDF</Radio.Button>
                </Radio.Group>
                <p className="editor-help-text" style={{ marginTop: '0.5rem', color: '#64748b', fontSize: '0.85rem' }}>
                  <InfoCircleOutlined /> Seleccione qué medio se utilizará para que los usuarios accedan a la publicación.
                </p>
              </div>

              <div className="editor-form-group" style={{ marginBottom: 0 }}>
                {pub.resourceType === 'link' ? (
                  <>
                    <label className="editor-label">Enlace Externo (Paper, DOI, etc)</label>
                    <input 
                      type="url" 
                      name="publicationLink"
                      className="editor-input" 
                      value={pub.publicationLink} 
                      onChange={handleChange}
                      placeholder="https://doi.org/..."
                    />
                  </>
                ) : (
                  <>
                    <label className="editor-label">Documento Asociado (PDF/Doc)</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <label className="admin-unified-primary-btn compact" style={{ cursor: 'pointer', margin: 0 }}>
                        <input type="file" hidden onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                        <PlusOutlined /> {pub.document ? "Cambiar Archivo" : "Subir Archivo"}
                      </label>
                      {pub.document && (
                        <span className="status-badge active">
                          <FilePdfOutlined /> {pub.document}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Relaciones */}
        <div className="admin-editor-card">
          <div className="admin-editor-card-header">
            <h3 className="admin-editor-card-title"><TagsOutlined /> Asociaciones y Relaciones</h3>
          </div>
          <div className="admin-editor-card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div className="editor-form-group">
                <label className="editor-label"><TeamOutlined /> Autores (Personas)</label>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Seleccionar autores..."
                  value={pub.personas || []}
                  onChange={(val) => setPub(prev => ({ ...prev, personas: val }))}
                  options={teamList.map(t => ({ label: `${t.name} ${t.lastname}`, value: t.id }))}
                  optionFilterProp="label"
                />
              </div>
              <div className="editor-form-group">
                <label className="editor-label"><ExperimentOutlined /> Líneas de Investigación</label>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Seleccionar líneas..."
                  value={pub.researchLines || []}
                  onChange={(val) => setPub(prev => ({ ...prev, researchLines: val }))}
                  options={researchLinesList.map(l => ({ label: l.title, value: l.id }))}
                  optionFilterProp="label"
                />
              </div>
              <div className="editor-form-group" style={{ marginBottom: 0 }}>
                <label className="editor-label"><ProjectOutlined /> Líneas de Extensión</label>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Seleccionar líneas..."
                  value={pub.extensionLines || []}
                  onChange={(val) => setPub(prev => ({ ...prev, extensionLines: val }))}
                  options={extensionLinesList.map(l => ({ label: l.title, value: l.id }))}
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
/* 
const FormModal = ({ publicacion, onSave, onClose, isSaving }) => {
  const [formData, setFormData] = useState(
    publicacion || {
      titulo: "",
      descripcion: "",
      link: "",
      archivo_de_publicacion: "", // Campo para futuro uso de carga de archivos
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal
      title={<h2>{publicacion ? "Editar" : "Nueva"} Publicación</h2>}
      open={isModalOpen}
      onCancel={onClose}
      footer={null}
      centered
    >
      <form
        onSubmit={handleSubmit}
        className="admin-card-body"
        style={{ padding: "1rem 0" }}
      >
        <div
          className="form-group"
          style={{ flexDirection: "column", alignItems: "stretch" }}
        >
          <label className="form-label">Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div
          className="form-group"
          style={{ flexDirection: "column", alignItems: "stretch" }}
        >
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            className="form-input"
            rows={4}
          ></textarea>
        </div>
        <div
          className="form-group"
          style={{ flexDirection: "column", alignItems: "stretch" }}
        >
          <label className="form-label">Link a la Publicación</label>
          <input
            type="url"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div
          className="admin-card-footer"
          style={{ textAlign: "right", paddingTop: "1.5rem" }}
        >
          <button
            type="button"
            className="admin-table-btn"
            onClick={onClose}
            style={{ marginRight: "0.5rem" }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="admin-unified-primary-btn"
            disabled={isSaving}
          >
            {isSaving ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}; */

export default AdminPublicaciones;
