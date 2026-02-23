"use client";

import { useState, useEffect } from "react";
import { getProjects, getResearchLines, getTeamMembers, saveProject, deleteProject } from "../../../services";
import ReactMarkdown from "react-markdown";
import { notification, Modal } from "antd";
import {
  BranchesOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
  SettingOutlined,
  CalendarOutlined,
  TeamOutlined,
  ApartmentOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const AdminProyectos = () => {
  const [projects, setProjects] = useState([]);
  const [researchLines, setResearchLines] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // "list" | "edit"
  const [currentProyecto, setCurrentProyecto] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchProyectos();
    fetchRelatedData();
  }, []);

  const fetchProyectos = async () => {
    setLoading(true);
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
      notification.error({
        message: "Error de Carga",
        description:
          "No se pudieron cargar los proyectos. Por favor, intente de nuevo más tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedData = async () => {
    try {
      const [linesRes, membersRes] = await Promise.all([
        getResearchLines(),
        getTeamMembers(),
      ]);
      setResearchLines(linesRes.data || []);
      setTeamMembers(membersRes.data || []);
    } catch (error) {
      console.error("Error al cargar datos relacionados:", error);
    }
  };

  const emptyProject = {
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "Planificado",
    researchLines: [],
    personas: [],
  };

  const handleOpenModal = (proyecto = null) => {
    setCurrentProyecto(proyecto
      ? { ...proyecto, researchLines: proyecto.researchLines || [], personas: proyecto.personas || [] }
      : { ...emptyProject });
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
          setCurrentProyecto(null);
        },
      });
    } else {
      setViewMode("list");
      setCurrentProyecto(null);
    }
  };

  const isDirty = () => {
    if (!currentProyecto) return false;
    const original = projects.find(p => p.id === currentProyecto.id) || emptyProject;
    return JSON.stringify(currentProyecto) !== JSON.stringify(original);
  };

  const handleSave = async () => {
    const isUpdating = currentProyecto && currentProyecto.id;
    setIsSaving(true);
    try {
      // Simulation
      console.log("Saving project:", currentProyecto);
      await saveProject(currentProyecto);
      
      notification.success({
        message: `Proyecto ${isUpdating ? "Actualizado" : "Creado"}`,
        description: `El proyecto se ha ${isUpdating ? "actualizado" : "creado"} correctamente.`,
      });
      fetchProyectos();
      setViewMode("list");
      setCurrentProyecto(null);
    } catch (error) {
      console.error("Error al guardar el proyecto:", error);
      notification.error({ message: "Error al Guardar" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "¿Estás seguro de que deseas eliminar este proyecto?",
      content: "Esta acción no se puede deshacer.",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          await deleteProject(id);
          setProyectos((prev) => prev.filter((p) => p.id !== id));
          notification.success({
            message: "Proyecto Eliminado",
            description: "El proyecto ha sido eliminado correctamente.",
          });
        } catch (error) {
          console.error("Error al eliminar el proyecto:", error);
          notification.error({
            message: "Error al Eliminar",
            description: "No se pudo eliminar el proyecto.",
          });
        }
      },
    });
  };

  const filteredProyectos = projects;

  // Funcion que permite asignarle un estilo segun el estado
  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case "Completado":
      case "En progreso":
        return "active";
      case "Planificado":
        return "pending";
      case "Pausado":
      case "Cancelado":
        return "inactive";
      default:
        return "pending";
    }
  };

  /* const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount);
  }; */

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando proyectos...</p>
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
              <BranchesOutlined />
              Proyectos de Investigación
            </h1>
            <p className="admin-unified-subtitle">
              Gestiona los proyectos de investigación del grupo GILIA. Controla el
              progreso, presupuestos e integrantes de cada proyecto.
            </p>

            <button className="admin-unified-primary-btn" onClick={() => handleOpenModal()}>
              <PlusOutlined />
              Nuevo Proyecto
            </button>
          </div>

          <div className="admin-unified-filters">
            <div className="admin-unified-search">
              <SearchOutlined className="admin-unified-search-icon" />
              <input
                type="text"
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="admin-unified-filter-select"
            >
              <option value="all">Todos los estados</option>
              <option value="Planificado">Planificado</option>
              <option value="En progreso">En progreso</option>
              <option value="Completado">Completado</option>
              <option value="Pausado">Pausado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          {filteredProyectos.length === 0 ? (
            <div className="admin-unified-empty">
              <BranchesOutlined className="admin-unified-empty-icon" />
              <h3 className="admin-unified-empty-title">No hay proyectos</h3>
              <p className="admin-unified-empty-description">
                {searchTerm || filterStatus !== "all"
                  ? "No se encontraron resultados para los filtros aplicados."
                  : "Comienza creando tu primer proyecto de investigación."}
              </p>
              {!searchTerm && filterStatus === "all" && (
                <button
                  className="admin-unified-primary-btn"
                  onClick={() => handleOpenModal()}
                >
                  <PlusOutlined />
                  Crear Primer Proyecto
                </button>
              )}
            </div>
          ) : (
            <div className="modern-table-container">
              <table className="modern-admin-table">
                <thead>
                  <tr>
                    <th>Nombre del Proyecto</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProyectos.map((proy) => (
                    <tr key={proy.id}>
                      <td data-label="Nombre del Proyecto">
                        <strong>{proy.name}</strong>
                      </td>
                      <td data-label="Estado">
                        <span className={`status-badge ${getEstadoBadgeClass(proy.status)}`}>
                          {proy.status}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <div className="modern-actions">
                          <button
                            className="btn-action btn-action-view"
                            title="Ver"
                            onClick={() => handleOpenModal(proy)}
                          >
                            <EyeOutlined /> Ver
                          </button>
                          <button
                            className="btn-action btn-action-edit"
                            title="Modificar"
                            onClick={() => handleOpenModal(proy)}
                          >
                            <EditOutlined /> Modificar
                          </button>
                          <button
                            className="btn-action btn-action-delete"
                            title="Eliminar"
                            onClick={() => handleDelete(proy.id)}
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
        <ProjectEditor 
          proyecto={currentProyecto}
          setProyecto={setCurrentProyecto}
          onSave={handleSave}
          onCancel={() => handleCloseEditor()}
          isSaving={isSaving}
          allResearchLines={researchLines}
          allTeamMembers={teamMembers}
        />
      )}
    </div>
  );
};

const ProjectEditor = ({ proyecto, setProyecto, onSave, onCancel, isSaving, allResearchLines = [], allTeamMembers = [] }) => {
  const [editorTab, setEditorTab] = useState("write"); // "write" | "preview"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProyecto(prev => ({ ...prev, [name]: value }));
  };

  const selectedLines = proyecto.researchLines || [];
  const selectedPersonas = proyecto.personas || [];

  const toggleResearchLine = (id) => {
    if (selectedLines.includes(id)) {
      setProyecto(prev => ({ ...prev, researchLines: (prev.researchLines || []).filter(l => l !== id) }));
    } else {
      if (selectedLines.length >= 2) return; // máximo 2
      setProyecto(prev => ({ ...prev, researchLines: [...(prev.researchLines || []), id] }));
    }
  };

  const togglePersona = (id) => {
    if (selectedPersonas.includes(id)) {
      setProyecto(prev => ({ ...prev, personas: (prev.personas || []).filter(p => p !== id) }));
    } else {
      setProyecto(prev => ({ ...prev, personas: [...(prev.personas || []), id] }));
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
            {proyecto.id ? `Editando: ${proyecto.name}` : "Nuevo Proyecto"}
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
        <div className="admin-editor-main">

          {/* Información general */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title"><SettingOutlined /> Información General</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="editor-form-group">
                <label className="editor-label">Nombre del Proyecto</label>
                <input
                  type="text"
                  name="name"
                  className="editor-input"
                  value={proyecto.name}
                  onChange={handleChange}
                  placeholder="Ej: Desarrollo de App Móvil GILIA"
                />
              </div>
            </div>
          </div>

          {/* Descripción Markdown */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 className="admin-editor-card-title"><FileTextOutlined /> Descripción</h3>
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
                    value={proyecto.description}
                    onChange={handleChange}
                    placeholder="Escribe aquí usando lenguaje Markdown..."
                  />
                </div>
              ) : (
                <div className="markdown-preview-pane">
                  <div className="markdown-preview-content">
                    <ReactMarkdown>{proyecto.description || "*No hay contenido para mostrar*"}</ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Líneas de Investigación */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title">
                <ApartmentOutlined /> Líneas de Investigación
              </h3>
            </div>
            <div className="admin-editor-card-body">
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.75rem', marginTop: 0 }}>
                Seleccioná hasta <strong>2</strong> líneas de investigación relacionadas con este proyecto.
                {selectedLines.length >= 2 && (
                  <span style={{ color: '#f59e0b', marginLeft: '0.5rem' }}>Límite alcanzado.</span>
                )}
              </p>
              <div className="editor-checkbox-list">
                {allResearchLines.map(line => {
                  const checked = selectedLines.includes(line.id);
                  const disabled = !checked && selectedLines.length >= 2;
                  return (
                    <label
                      key={line.id}
                      className={`editor-checkbox-item${checked ? ' editor-checkbox-item--checked' : ''}${disabled ? ' editor-checkbox-item--disabled' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => toggleResearchLine(line.id)}
                      />
                      <span>{line.title}</span>
                    </label>
                  );
                })}
                {allResearchLines.length === 0 && (
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Cargando líneas...</p>
                )}
              </div>
            </div>
          </div>

          {/* Equipo del Proyecto */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title">
                <TeamOutlined /> Equipo del Proyecto
              </h3>
            </div>
            <div className="admin-editor-card-body">
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.75rem', marginTop: 0 }}>
                Seleccioná los integrantes que participan en este proyecto.
              </p>
              <div className="editor-checkbox-list">
                {allTeamMembers.map(member => {
                  const checked = selectedPersonas.includes(member.id);
                  return (
                    <label
                      key={member.id}
                      className={`editor-checkbox-item${checked ? ' editor-checkbox-item--checked' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => togglePersona(member.id)}
                      />
                      <span>{member.name} {member.lastname}</span>
                      {member.category && (
                        <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '0.5rem' }}>
                          — {member.category}
                        </span>
                      )}
                    </label>
                  );
                })}
                {allTeamMembers.length === 0 && (
                  <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Cargando integrantes...</p>
                )}
              </div>
            </div>
          </div>

        </div>

        <div className="admin-editor-sidebar">

          {/* Estado y fechas */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title">Estado y Cronograma</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="editor-form-group">
                <label className="editor-label">Estado</label>
                <select
                  name="status"
                  className="editor-select"
                  value={proyecto.status}
                  onChange={handleChange}
                >
                  <option value="Planificado">Planificado</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Completado">Completado</option>
                  <option value="Pausado">Pausado</option>
                  <option value="Cancelado">Cancelado</option>
                </select>
              </div>
              <div className="editor-form-group">
                <label className="editor-label"><CalendarOutlined /> Fecha de Inicio</label>
                <input
                  type="date"
                  name="startDate"
                  className="editor-input"
                  value={proyecto.startDate ? proyecto.startDate.split('T')[0] : ''}
                  onChange={handleChange}
                />
              </div>
              <div className="editor-form-group">
                <label className="editor-label"><CalendarOutlined /> Fecha de Fin</label>
                <input
                  type="date"
                  name="endDate"
                  className="editor-input"
                  value={proyecto.endDate ? proyecto.endDate.split('T')[0] : ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Resumen de selecciones */}
          {(selectedLines.length > 0 || selectedPersonas.length > 0) && (
            <div className="admin-editor-card">
              <div className="admin-editor-card-header">
                <h3 className="admin-editor-card-title">Resumen de Relaciones</h3>
              </div>
              <div className="admin-editor-card-body">
                {selectedLines.length > 0 && (
                  <div style={{ marginBottom: '0.75rem' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                      Líneas ({selectedLines.length}/2)
                    </p>
                    {selectedLines.map(id => {
                      const line = allResearchLines.find(l => l.id === id);
                      return line ? (
                        <span key={id} className="tag-chip" style={{ marginBottom: '0.25rem', display: 'inline-block' }}>{line.title}</span>
                      ) : null;
                    })}
                  </div>
                )}
                {selectedPersonas.length > 0 && (
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                      Integrantes ({selectedPersonas.length})
                    </p>
                    {selectedPersonas.map(id => {
                      const m = allTeamMembers.find(t => t.id === id);
                      return m ? (
                        <span key={id} className="tag-chip" style={{ marginBottom: '0.25rem', display: 'inline-block' }}>{m.name} {m.lastname}</span>
                      ) : null;
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

export default AdminProyectos;
