"use client"

import { useState, useEffect } from "react"
import { getResearchLines } from "../../../services"
import { notification, Modal } from "antd"
import {
  ExperimentOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  TeamOutlined,
  ProjectOutlined,
} from "@ant-design/icons"
import "./AdminResearchLines.css"

// Minimal adapter: map read ops to services/index.js and stub write ops
const dataService = {
  getLineasInvestigacion: getResearchLines,
  deleteLineaInvestigacion: async (id) => ({ success: true, id }),
  updateLineaInvestigacion: async (id, payload) => ({ success: true, data: { id, ...payload } }),
  createLineaInvestigacion: async (payload) => ({ success: true, data: { id: Date.now(), ...payload } }),
}

const AdminLineasInvestigacion = () => {
  const [lineas, setLineas] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentLinea, setCurrentLinea] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchLineas();
  }, []);

  const fetchLineas = async () => {
    setLoading(true);
    try {
      const response = await dataService.getLineasInvestigacion();
      setLineas(response.data);
    } catch (error) {
            console.error("Error al obtener las líneas de investigación:", error);
      notification.error({
        message: 'Error de Carga',
        description: 'No se pudieron cargar las líneas de investigación. Por favor, intente de nuevo más tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar esta línea de investigación?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await dataService.deleteLineaInvestigacion(id);
          setLineas((prevLineas) => prevLineas.filter((linea) => linea.id !== id));
          notification.success({
            message: 'Línea Eliminada',
            description: 'La línea de investigación ha sido eliminada correctamente.',
          });
        } catch (error) {
          console.error("Error al eliminar la línea de investigación:", error);
          notification.error({
            message: 'Error al Eliminar',
            description: 'No se pudo eliminar la línea de investigación.',
          });
        }
      },
    });
  };

  const handleOpenModal = (linea = null) => {
    setCurrentLinea(linea);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentLinea(null);
    setIsModalOpen(false);
  };

      const handleSave = async (formData) => {
    const isUpdating = currentLinea && currentLinea.id;
    setIsSaving(true);
    try {
            if (isUpdating) {
        await dataService.updateLineaInvestigacion(currentLinea.id, formData);
      } else {
        await dataService.createLineaInvestigacion(formData);
      }
      notification.success({
        message: `Línea ${isUpdating ? 'Actualizada' : 'Creada'}`,
        description: `La línea de investigación se ha ${isUpdating ? 'actualizado' : 'creado'} correctamente.`,
      });
      fetchLineas(); // Recargar la lista
      handleCloseModal();
    } catch (error) {
            console.error("Error al guardar la línea de investigación:", error);
      notification.error({
        message: 'Error al Guardar',
        description: `No se pudo ${isUpdating ? 'actualizar' : 'crear'} la línea de investigación.`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const filteredLineas = lineas.filter(
    (linea) =>
      linea.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      linea.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
        )

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case "Activa":
        return "admin-unified-badge-active"
      case "En desarrollo":
        return "admin-unified-badge-pending"
      case "Pausada":
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
          <p>Cargando líneas de investigación...</p>
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
          <ExperimentOutlined />
          Líneas de Investigación
        </h1>
        <p className="admin-unified-subtitle">
          Gestiona las líneas de investigación del grupo GILIA. Aquí puedes crear, editar y organizar las diferentes
          áreas de investigación.
        </p>

        <button className="admin-unified-primary-btn" onClick={() => handleOpenModal()}>
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
          <h3 className="admin-unified-empty-title">No hay líneas de investigación</h3>
          <p className="admin-unified-empty-description">
            {searchTerm
              ? "No se encontraron resultados para tu búsqueda."
              : "Comienza creando tu primera línea de investigación."}
          </p>
          {!searchTerm && (
            <button className="admin-unified-primary-btn" onClick={() => handleOpenModal()}>
              <PlusOutlined />
              Crear Primera Línea
            </button>
          )}
        </div>
      ) : (
        <div className="admin-card-grid">
          {filteredLineas.map((linea) => (
            <div key={linea.id} className="admin-item-card">
              <img src={linea.imagen_de_fondo || '/imagenRandom.png'} alt={linea.titulo} className="admin-item-card-image" />
              <div className="admin-item-card-body">
                <h3 className="admin-item-card-title">{linea.titulo}</h3>
                <p className="admin-item-card-description">
                  {linea.descripcion.substring(0, 120)}...
                </p>
              </div>
              <div className="admin-item-card-footer">
                <span className={`admin-unified-badge ${getEstadoBadgeClass(linea.estado)}`}>
                  {linea.estado}
                </span>
                <div className="admin-item-card-actions">
                  <button className="admin-table-btn admin-table-btn-edit" title="Editar" onClick={() => handleOpenModal(linea)}>
                    <EditOutlined />
                  </button>
                  <button className="admin-table-btn admin-table-btn-delete" title="Eliminar" onClick={() => handleDelete(linea.id)}>
                    <DeleteOutlined />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && <FormModal linea={currentLinea} onSave={handleSave} onClose={handleCloseModal} isSaving={isSaving} />}
    </div>
  )
}

const FormModal = ({ linea, onSave, onClose, isSaving }) => {
  const [formData, setFormData] = useState(
    linea || {
      titulo: "",
      descripcion: "",
      estado: "activa",
      imagen_de_fondo: "",
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
      title={<h2>{linea ? 'Editar' : 'Nueva'} Línea de Investigación</h2>}
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
          <label className="form-label">Estado</label>
          <select name="estado" value={formData.estado} onChange={handleChange} className="form-input">
            <option value="Activa">Activa</option>
            <option value="En desarrollo">En Desarrollo</option>
            <option value="Pausada">Pausada</option>
          </select>
        </div>
        <div className="form-group" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
          <label className="form-label">URL de la Imagen de Fondo</label>
          <input type="text" name="imagen_de_fondo" value={formData.imagen_de_fondo} onChange={handleChange} className="form-input" />
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

export default AdminLineasInvestigacion