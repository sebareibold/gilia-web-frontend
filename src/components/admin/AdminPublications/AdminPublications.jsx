"use client"

import { useState, useEffect } from "react"
import { dataService } from "../../../services/dataService"
import { notification, Modal } from "antd"
import {
  BookOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons"
import "../../../styles/admin-unified.css"

const AdminPublicaciones = () => {
  const [publicaciones, setPublicaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPublicacion, setCurrentPublicacion] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchPublicaciones();
  }, []);

  const fetchPublicaciones = async () => {
    setLoading(true);
    try {
      const response = await dataService.getPublicaciones();
      setPublicaciones(response.data);
    } catch (error) {
      console.error("Error al obtener las publicaciones:", error);
      notification.error({
        message: 'Error de Carga',
        description: 'No se pudieron cargar las publicaciones. Por favor, intente de nuevo más tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (publicacion = null) => {
    setCurrentPublicacion(publicacion);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentPublicacion(null);
    setIsModalOpen(false);
  };

  const handleSave = async (formData) => {
    const isUpdating = currentPublicacion && currentPublicacion.id;
    setIsSaving(true);
    try {
      if (isUpdating) {
        await dataService.updatePublicacion(currentPublicacion.id, formData);
      } else {
        await dataService.createPublicacion(formData);
      }
      notification.success({
        message: `Publicación ${isUpdating ? 'Actualizada' : 'Creada'}`,
        description: `La publicación se ha ${isUpdating ? 'actualizado' : 'creado'} correctamente.`,
      });
      fetchPublicaciones();
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar la publicación:", error);
      notification.error({
        message: 'Error al Guardar',
        description: `No se pudo ${isUpdating ? 'actualizar' : 'crear'} la publicación.`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar esta publicación?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await dataService.deletePublicacion(id);
          setPublicaciones((prev) => prev.filter((pub) => pub.id !== id));
          notification.success({
            message: 'Publicación Eliminada',
            description: 'La publicación ha sido eliminada correctamente.',
          });
        } catch (error) {
          console.error("Error al eliminar la publicación:", error);
          notification.error({
            message: 'Error al Eliminar',
            description: 'No se pudo eliminar la publicación.',
          });
        }
      },
    });
  };

  const filteredPublicaciones = publicaciones.filter((pub) => {
    const matchesSearch =
      (pub.titulo?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (pub.descripcion?.toLowerCase() || '').includes(searchTerm.toLowerCase());

    // El filtro por tipo se elimina temporalmente hasta que el campo exista en el backend
    const matchesFilter = true; // filterType === "all" || pub.tipo === filterType

    return matchesSearch && matchesFilter
  })

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case "Publicado":
        return "admin-unified-badge-active"
      case "Aceptado":
        return "admin-unified-badge-active"
      case "En revisión":
        return "admin-unified-badge-pending"
      case "Rechazado":
        return "admin-unified-badge-inactive"
      default:
        return "admin-unified-badge-pending"
    }
  }

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando publicaciones...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`admin-unified-page ${isModalOpen ? 'admin-page-blurred' : ''}`}>
      <div className="admin-unified-decorations">
        <div className="admin-floating-element admin-floating-element-1"></div>
        <div className="admin-floating-element admin-floating-element-2"></div>
        <div className="admin-floating-element admin-floating-element-3"></div>
      </div>

      <div className="admin-unified-header">
        <h1 className="admin-unified-title">
          <BookOutlined />
          Publicaciones
        </h1>
        <p className="admin-unified-subtitle">
          Gestiona las publicaciones científicas del grupo GILIA. Administra artículos, papers, capítulos de libros y
          otras contribuciones académicas.
        </p>

        <button className="admin-unified-primary-btn" onClick={() => handleOpenModal()}>
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

        {/* Filtro por tipo deshabilitado temporalmente */}
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
            <button className="admin-unified-primary-btn">
              <PlusOutlined />
              Agregar Primera Publicación
            </button>
          )}
        </div>
      ) : (
        <div className="admin-card-grid">
          {filteredPublicaciones.map((pub) => (
            <div key={pub.id} className="admin-item-card">
              <div className="admin-item-card-body">
                <h3 className="admin-item-card-title">{pub.titulo}</h3>
                <p className="admin-item-card-description">
                  {pub.descripcion?.substring(0, 150)}...
                </p>
              </div>
              <div className="admin-item-card-footer">
                <a href={pub.link} target="_blank" rel="noopener noreferrer" className="admin-table-btn">Ver Link</a>
                <div className="admin-item-card-actions">
                  <button className="admin-table-btn admin-table-btn-edit" title="Editar" onClick={() => handleOpenModal(pub)}>
                    <EditOutlined />
                  </button>
                  <button className="admin-table-btn admin-table-btn-delete" title="Eliminar" onClick={() => handleDelete(pub.id)}>
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && <FormModal publicacion={currentPublicacion} onSave={handleSave} onClose={handleCloseModal} isSaving={isSaving} />}
    </div>
  )
}

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
      <form onSubmit={handleSubmit} className="admin-card-body" style={{ padding: '1rem 0' }}>
        <div className="form-group" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <label className="form-label">Título</label>
          <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required className="form-input" />
        </div>
        <div className="form-group" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <label className="form-label">Descripción</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required className="form-input" rows={4}></textarea>
        </div>
        <div className="form-group" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <label className="form-label">Link a la Publicación</label>
          <input type="url" name="link" value={formData.link} onChange={handleChange} className="form-input" />
        </div>
        <div className="admin-card-footer" style={{ textAlign: 'right', paddingTop: '1.5rem' }}>
          <button type="button" className="admin-table-btn" onClick={onClose} style={{ marginRight: '0.5rem' }}>Cancelar</button>
          <button type="submit" className="admin-unified-primary-btn" disabled={isSaving}>
            {isSaving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AdminPublicaciones
