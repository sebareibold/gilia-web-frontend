"use client"

import { useState, useEffect } from "react"
import { getProjects, getProjectById } from "../../services"
import { notification, Modal } from "antd"
import {
  BranchesOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
} from "@ant-design/icons"
import "./AdminProjects.css"

// Minimal adapter: map read ops to services/index.js and stub write ops
const dataService = {
  getProyectos: getProjects,
  getProyectoById: getProjectById,
  updateProyecto: async (id, payload) => ({ success: true, data: { id, ...payload } }),
  createProyecto: async (payload) => ({ success: true, data: { id: Date.now(), ...payload } }),
  deleteProyecto: async (id) => ({ success: true, id }),
}

const AdminProyectos = () => {
  const [proyectos, setProyectos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentProyecto, setCurrentProyecto] = useState(null)

  useEffect(() => {
    fetchProyectos();
  }, []);

  const fetchProyectos = async () => {
    setLoading(true);
    try {
      const response = await dataService.getProyectos();
      setProyectos(response.data);
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
      notification.error({
        message: 'Error de Carga',
        description: 'No se pudieron cargar los proyectos. Por favor, intente de nuevo más tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (proyecto = null) => {
    setCurrentProyecto(proyecto ? { ...proyecto } : { titulo: '', descripcion: '', estado: 'Planificado', fechaInicio: '', fechaFin: '' });
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setCurrentProyecto(null);
  };

  const handleSave = async () => {
    try {
      if (currentProyecto.id) {
        // Actualizar
        const response = await dataService.updateProyecto(currentProyecto.id, currentProyecto);
        setProyectos((prev) => prev.map((p) => (p.id === currentProyecto.id ? response.data : p)));
        notification.success({ message: 'Proyecto Actualizado' });
      } else {
        // Crear
        const response = await dataService.createProyecto(currentProyecto);
        setProyectos((prev) => [...prev, response.data]);
        notification.success({ message: 'Proyecto Creado' });
      }
      handleCancelModal();
    } catch (error) {
      console.error("Error al guardar el proyecto:", error);
      notification.error({ message: 'Error al Guardar' });
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar este proyecto?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await dataService.deleteProyecto(id);
          setProyectos((prev) => prev.filter((p) => p.id !== id));
          notification.success({
            message: 'Proyecto Eliminado',
            description: 'El proyecto ha sido eliminado correctamente.',
          });
        } catch (error) {
          console.error("Error al eliminar el proyecto:", error);
          notification.error({
            message: 'Error al Eliminar',
            description: 'No se pudo eliminar el proyecto.',
          });
        }
      },
    });
  };

  const filteredProyectos = proyectos.filter((proyecto) => {
    const matchesSearch =
      (proyecto.titulo?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (proyecto.descripcion?.toLowerCase() || '').includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || proyecto.estado === filterStatus

    return matchesSearch && matchesFilter
  })

  const getEstadoBadgeClass = (estado) => {
    switch (estado) {
      case "Completado":
        return "admin-unified-badge-active"
      case "En progreso":
        return "admin-unified-badge-active"
      case "Planificado":
        return "admin-unified-badge-pending"
      case "Pausado":
        return "admin-unified-badge-inactive"
      case "Cancelado":
        return "admin-unified-badge-inactive"
      default:
        return "admin-unified-badge-pending"
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando proyectos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-unified-page">
      <div className="admin-unified-decorations">
        <div className="admin-floating-element admin-floating-element-1"></div>
        <div className="admin-floating-element admin-floating-element-2"></div>
        <div className="admin-floating-element admin-floating-element-3"></div>
      </div>

      <div className="admin-unified-header">
        <h1 className="admin-unified-title">
          <BranchesOutlined />
          Proyectos de Investigación
        </h1>
        <p className="admin-unified-subtitle">
          Gestiona los proyectos de investigación del grupo GILIA. Controla el progreso, presupuestos y equipos de
          trabajo de cada proyecto.
        </p>

        <button className="admin-unified-primary-btn">
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
            <button className="admin-unified-primary-btn" onClick={() => handleOpenModal()}>
              <PlusOutlined />
              Crear Primer Proyecto
            </button>
          )}
        </div>
      ) : (
        <div className="admin-unified-table-container">
          <table className="admin-unified-table">
            <thead>
              <tr>
                <th>Proyecto</th>
                <th>Estado</th>
                <th>Fechas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProyectos.map((proyecto) => (
                <tr key={proyecto.id}>
                  <td>
                    <strong>{proyecto.titulo}</strong>
                    <br />
                    <small style={{ color: "#64748b", lineHeight: "1.4" }}>
                      {proyecto.descripcion?.substring(0, 80)}...
                    </small>
                  </td>
                  <td>
                    <span className={`admin-unified-badge ${getEstadoBadgeClass(proyecto.estado)}`}>
                      {proyecto.estado}
                    </span>
                  </td>
                  <td>
                    <CalendarOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                    <small style={{ color: "#64748b" }}>
                      {new Date(proyecto.fechaInicio).toLocaleDateString()} -{" "}
                      {new Date(proyecto.fechaFin).toLocaleDateString()}
                    </small>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-table-btn admin-table-btn-view" title="Ver detalles">
                        <EyeOutlined />
                      </button>
                      <button
                        className="admin-table-btn admin-table-btn-edit"
                        title="Editar"
                        onClick={() => handleOpenModal(proyecto)}
                      >
                        <EditOutlined />
                      </button>
                      <button
                        className="admin-table-btn admin-table-btn-delete"
                        title="Eliminar"
                        onClick={() => handleDelete(proyecto.id)}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        title={currentProyecto?.id ? "Editar Proyecto" : "Nuevo Proyecto"}
        visible={isModalOpen}
        onOk={handleSave}
        onCancel={handleCancelModal}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <form className="admin-unified-form">
          <div className="admin-unified-form-group">
            <label>Título</label>
            <input
              type="text"
              value={currentProyecto?.titulo || ''}
              onChange={(e) => setCurrentProyecto({ ...currentProyecto, titulo: e.target.value })}
            />
          </div>
          <div className="admin-unified-form-group">
            <label>Descripción</label>
            <textarea
              rows="4"
              value={currentProyecto?.descripcion || ''}
              onChange={(e) => setCurrentProyecto({ ...currentProyecto, descripcion: e.target.value })}
            />
          </div>
          <div className="admin-unified-form-group">
            <label>Estado</label>
            <select
              value={currentProyecto?.estado || 'Planificado'}
              onChange={(e) => setCurrentProyecto({ ...currentProyecto, estado: e.target.value })}
            >
              <option value="Planificado">Planificado</option>
              <option value="En progreso">En progreso</option>
              <option value="Completado">Completado</option>
              <option value="Pausado">Pausado</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
          <div className="admin-unified-form-group">
            <label>Fecha de Inicio</label>
            <input
              type="date"
              value={currentProyecto?.fechaInicio ? new Date(currentProyecto.fechaInicio).toISOString().split('T')[0] : ''}
              onChange={(e) => setCurrentProyecto({ ...currentProyecto, fechaInicio: e.target.value })}
            />
          </div>
          <div className="admin-unified-form-group">
            <label>Fecha de Fin</label>
            <input
              type="date"
              value={currentProyecto?.fechaFin ? new Date(currentProyecto.fechaFin).toISOString().split('T')[0] : ''}
              onChange={(e) => setCurrentProyecto({ ...currentProyecto, fechaFin: e.target.value })}
            />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AdminProyectos
