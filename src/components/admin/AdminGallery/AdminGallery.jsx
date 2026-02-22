"use client"

import { useState, useEffect } from "react";
import dataService from "../../../services/dataService";
import { notification, Modal } from "antd";
import {
  PictureOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
  CloseOutlined,
  TagsOutlined,
  SettingOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const AdminGaleria = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // "list" | "edit"
  const [currentItem, setCurrentItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await dataService.getGaleria();
      setImages(response.data);
    } catch (error) {
      console.error("Error al obtener la galería:", error);
      notification.error({
        message: "Error de Carga",
        description: "No se pudieron cargar las imágenes de la galería.",
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", ...new Set(images.map((img) => img.category))];

  const handleOpenModal = (item = null) => {
    setCurrentItem(item ? { ...item } : { 
      url: "", 
      title: "", 
      description: "", 
      category: "General",
      tags: []
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
          setCurrentItem(null);
        },
      });
    } else {
      setViewMode("list");
      setCurrentItem(null);
    }
  };

  const isDirty = () => {
    if (!currentItem) return false;
    const original = images.find(img => img.id === currentItem.id) || {
      url: "", 
      title: "", 
      description: "", 
      category: "General",
      tags: []
    };
    
    return JSON.stringify(currentItem) !== JSON.stringify(original);
  };

  const handleSave = async () => {
    const isUpdating = currentItem && currentItem.id;
    setIsSaving(true);
    try {
      // Simulation
      console.log("Saving gallery item:", currentItem);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      notification.success({
        message: `Imagen ${isUpdating ? "Actualizada" : "Agregada"}`,
        description: `La galería se ha ${isUpdating ? "actualizado" : "ampliado"} correctamente.`,
      });
      fetchImages();
      setViewMode("list");
      setCurrentItem(null);
    } catch (error) {
      console.error("Error al guardar en la galería:", error);
      notification.error({
        message: "Error al Guardar",
        description: `No se pudo ${isUpdating ? "actualizar" : "agregar"} la imagen.`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "¿Estás seguro de que deseas eliminar esta imagen?",
      content: "Esta acción no se puede deshacer.",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => {
        notification.success({
          message: "Imagen Eliminada",
          description: "La imagen ha sido eliminada correctamente.",
        });
        setImages(prev => prev.filter(img => img.id !== id));
      },
    });
  };

  const filteredImages = images.filter((img) => {
    const matchesSearch =
      img.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      img.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || img.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando galería...</p>
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
              <PictureOutlined />
              Galería Multimedia
            </h1>
            <p className="admin-unified-subtitle">
              Administra las imágenes y recursos visuales del grupo GILIA.
              Organiza por categorías y mantén actualizada la presencia visual.
            </p>

            <button
              className="admin-unified-primary-btn"
              onClick={() => handleOpenModal()}
            >
              <PlusOutlined />
              Agregar Imagen
            </button>
          </div>

          <div className="admin-unified-filters">
            <div className="admin-unified-search">
              <SearchOutlined className="admin-unified-search-icon" />
              <input
                type="text"
                placeholder="Buscar imágenes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="admin-unified-filter-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "all" ? "Todas las categorías" : cat}
                </option>
              ))}
            </select>
          </div>

          {filteredImages.length === 0 ? (
            <div className="admin-unified-empty">
              <PictureOutlined className="admin-unified-empty-icon" />
              <h3 className="admin-unified-empty-title">Galería vacía</h3>
              <p className="admin-unified-empty-description">
                {searchTerm || filterCategory !== "all"
                  ? "No hay imágenes que coincidan con los filtros."
                  : "Tu galería aún no tiene contenido visual."}
              </p>
            </div>
          ) : (
            <div className="modern-table-container">
              <table className="modern-admin-table">
                <thead>
                  <tr>
                    <th>Miniatura</th>
                    <th>Información</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredImages.map((img) => (
                    <tr key={img.id}>
                      <td data-label="Miniatura">
                        <img 
                          src={img.url} 
                          alt={img.title} 
                          style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                      </td>
                      <td data-label="Información">
                        <strong>{img.title}</strong>
                        <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>{img.description?.substring(0, 50)}...</p>
                      </td>
                      <td data-label="Categoría">
                        <span className="status-badge pending">{img.category}</span>
                      </td>
                      <td className="actions-cell">
                        <div className="modern-actions">
                          <button
                            className="btn-action btn-action-view"
                            title="Ver"
                            onClick={() => handleOpenModal(img)}
                          >
                            <EyeOutlined /> Ver
                          </button>
                          <button
                            className="btn-action btn-action-edit"
                            title="Modificar"
                            onClick={() => handleOpenModal(img)}
                          >
                            <EditOutlined /> Modificar
                          </button>
                          <button
                            className="btn-action btn-action-delete"
                            title="Eliminar"
                            onClick={() => handleDelete(img.id)}
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
        <GalleryItemEditor 
          item={currentItem}
          setItem={setCurrentItem}
          onSave={handleSave}
          onCancel={() => handleCloseEditor()}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};

const GalleryItemEditor = ({ item, setItem, onSave, onCancel, isSaving }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="admin-editor-container">
      <div className="admin-editor-header">
        <div className="admin-editor-header-left">
          <div className="admin-editor-breadcrumb" onClick={onCancel}>
            <ArrowLeftOutlined /> Volver a la galería
          </div>
          <h2 className="admin-editor-title">
            {item.id ? `Detalles de Imagen` : "Nueva Imagen"}
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
          {/* Seccion Info */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title"><SettingOutlined /> Información de la Imagen</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="editor-form-group">
                <label className="editor-label">Título / Alt Text</label>
                <input 
                  type="text" 
                  name="title"
                  className="editor-input" 
                  value={item.title} 
                  onChange={handleChange}
                  placeholder="Título descriptivo de la imagen..."
                />
              </div>
              <div className="editor-form-group">
                <label className="editor-label">Descripción larga</label>
                <textarea 
                  name="description"
                  className="editor-textarea" 
                  style={{ minHeight: '120px' }}
                  value={item.description} 
                  onChange={handleChange}
                  placeholder="Contexto adicional sobre la imagen..."
                />
              </div>
            </div>
          </div>

          {/* Gestión de Archivo */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title"><PictureOutlined /> Recurso Multimedia</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="editor-form-group">
                <label className="editor-label">URL de la Imagen</label>
                <input 
                  type="url" 
                  name="url"
                  className="editor-input" 
                  value={item.url} 
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
              <div className="image-upload-preview" style={{ maxWidth: '100%', height: '300px' }}>
                {item.url ? (
                  <img src={item.url} alt="Preview" style={{ objectFit: 'contain' }} />
                ) : (
                  <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                    <PlusOutlined style={{ fontSize: '2rem', marginBottom: '1rem' }} />
                    <p>Pega una URL o sube un archivo</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="admin-editor-sidebar">
          {/* Clasificación */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title">Clasificación</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="editor-form-group">
                <label className="editor-label"><InfoCircleOutlined /> Categoría</label>
                <select 
                  name="category"
                  className="editor-select"
                  value={item.category}
                  onChange={handleChange}
                >
                  <option value="General">General</option>
                  <option value="Eventos">Eventos</option>
                  <option value="Investigación">Investigación</option>
                  <option value="Equipo">Equipo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Etiquetas */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title"><TagsOutlined /> Etiquetas</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="tag-input-container">
                <input 
                  type="text" 
                  className="tag-input-field" 
                  placeholder="Agregar etiquetas..." 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-editor-footer">
        <button className="btn-action btn-action-edit" onClick={onCancel}>
          Cancelar
        </button>
        <button className="admin-unified-primary-btn" onClick={onSave} disabled={isSaving}>
          <SaveOutlined /> {isSaving ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </div>
  );
};

export default AdminGaleria;
