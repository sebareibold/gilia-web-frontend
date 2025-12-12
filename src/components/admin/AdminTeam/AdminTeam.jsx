"use client"

import { useState, useEffect } from "react"
import { getTeamMembers } from "../../../services"
import { notification, Modal } from "antd"
import {
  MailOutlined,
  PhoneOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons"
import "./AdminTeam.css"

const AdminEquipo = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentMember, setCurrentMember] = useState(null)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await getTeamMembers();
      // Adaptación de datos: el backend devuelve `nombre` y `apellido`
      const adaptedMembers = response.data;
      setTeamMembers(adaptedMembers);
      console.log(adaptedMembers);
    } catch (error) {
      console.error("Error al obtener los miembros del equipo:", error);
      notification.error({
        message: 'Error de Carga',
        description: 'No se pudieron cargar los miembros del equipo. Por favor, intente de nuevo más tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (member = null) => {
    setCurrentMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentMember(null);
    setIsModalOpen(false);
  };

  const handleSave = async (formData) => {
    const isUpdating = currentMember && currentMember.id;
    setIsSaving(true);
   /*  try {
      if (isUpdating) {
        await dataService.updatePersona(currentMember.id, formData);
      } else {
        await dataService.createPersona(formData);
      }
      notification.success({
        message: `Miembro ${isUpdating ? 'Actualizado' : 'Creado'}`,
        description: `El miembro del equipo se ha ${isUpdating ? 'actualizado' : 'creado'} correctamente.`,
      });
      fetchMembers();
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar el miembro:", error);
      notification.error({
        message: 'Error al Guardar',
        description: `No se pudo ${isUpdating ? 'actualizar' : 'crear'} el miembro del equipo.`,
      });
    } finally {
      setIsSaving(false);
    } */
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar este miembro del equipo?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      /* onOk: async () => {
        try {
          await dataService.deletePersona(id);
          setTeamMembers((prev) => prev.filter((member) => member.id !== id));
          notification.success({
            message: 'Miembro Eliminado',
            description: 'El miembro del equipo ha sido eliminado correctamente.',
          });
        } catch (error) {
          console.error("Error al eliminar el miembro:", error);
          notification.error({
            message: 'Error al Eliminar',
            description: 'No se pudo eliminar el miembro del equipo.',
          });
        }
      }, */
    });
  };

  const filteredMembers = teamMembers;

    // Extraer roles únicos de los miembros del equipo, usando 'especialidad'
  const roles = ["all", ...new Set(teamMembers.map(member => member.especialidad).filter(Boolean))];

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando equipo...</p>
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
          <TeamOutlined />
          Gestión del Equipo
        </h1>
        <p className="admin-unified-subtitle">Administra los miembros del equipo de investigación GILIA</p>

        <button className="admin-unified-primary-btn" onClick={() => handleOpenModal()}>
          <PlusOutlined /> Agregar Miembro
        </button>
      </div>

      <div className="admin-unified-filters">
        <div className="admin-unified-search">
          <SearchOutlined className="admin-unified-search-icon" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o departamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="admin-unified-filter-select"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role === "all" ? "Todos los roles" : role}
            </option>
          ))}
        </select>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="admin-unified-empty">
          <TeamOutlined className="admin-unified-empty-icon" />
          <h3 className="admin-unified-empty-title">No se encontraron miembros</h3>
          <p className="admin-unified-empty-description">
            No hay miembros que coincidan con los criterios de búsqueda.
          </p>
        </div>
      ) : (
        <div className="admin-unified-table-container">
          <table className="admin-unified-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>

                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td>
                    <strong>{member.name}</strong> {" "}
                    <strong>{member.lastname}</strong>
                  </td>
                  <td>
                    <MailOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                    {member.email}
                  </td>
                  <td>
                    <PhoneOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                    {member.phone}
                  </td>

                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-table-btn admin-table-btn-edit" title="Editar" onClick={() => handleOpenModal(member)}>
                        <EditOutlined />
                      </button>
                      <button className="admin-table-btn admin-table-btn-delete" title="Eliminar" onClick={() => handleDelete(member.id)}>
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

      {isModalOpen && <FormModal member={currentMember} onSave={handleSave} onClose={handleCloseModal} isSaving={isSaving} />}
    </div>
  )
}

const FormModal = ({ member, onSave, onClose, isSaving }) => {
  const [formData, setFormData] = useState(
    member || {
      nombre: "",
      apellido: "",
      especialidad: "",
      lugar_trabajo: "",
      lugar_nacimiento: "",
      email: "",
      phone: "",
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
    <div className="admin-unified-modal-backdrop">
      <div className="admin-unified-modal">
        <h2>{member ? "Editar" : "Nuevo"} Miembro del Equipo</h2>
        <form onSubmit={handleSubmit}>
          <div className="admin-unified-form-group">
            <label>Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>
          <div className="admin-unified-form-group">
            <label>Apellido</label>
            <input type="text" name="apellido" value={formData.apellido} onChange={handleChange} required />
          </div>
          <div className="admin-unified-form-group">
            <label>Especialidad (Rol)</label>
            <input type="text" name="especialidad" value={formData.especialidad} onChange={handleChange} />
          </div>
          <div className="admin-unified-form-group">
            <label>Lugar de Trabajo (Departamento)</label>
            <input type="text" name="lugar_trabajo" value={formData.lugar_trabajo} onChange={handleChange} />
          </div>
          <div className="admin-unified-form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="admin-unified-form-group">
            <label>Teléfono</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="admin-unified-modal-actions">
            <button type="button" className="admin-unified-secondary-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="admin-unified-primary-btn" disabled={isSaving}>
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEquipo
