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
  ArrowLeftOutlined,
  SaveOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  GithubOutlined,
  LinkedinOutlined,
  UserOutlined,
} from "@ant-design/icons"

const AdminEquipo = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // "list" | "edit"
  const [currentMember, setCurrentMember] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

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

  const emptyMember = {
    name: "",
    lastname: "",
    email: "",
    phone: "",
    academicRole: "",
    title: "",
    githubLink: "",
    linkedinLink: "",
    isAuthor: false,
    bio: "",
  };

  const handleOpenModal = (member = null) => {
    setCurrentMember(member
      ? {
          ...member,
          name: member.name || "",
          lastname: member.lastname || "",
          email: member.email || "",
          phone: member.phone || "",
          academicRole: member.academicRole || member.category || "",
          title: member.title || "",
          githubLink: member.githubLink || "",
          linkedinLink: member.linkedinLink || "",
          isAuthor: member.isAuthor ?? false,
          bio: member.bio || "",
        }
      : { ...emptyMember }
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
        onOk: () => {
          setViewMode("list");
          setCurrentMember(null);
        },
      });
    } else {
      setViewMode("list");
      setCurrentMember(null);
    }
  };

  const isDirty = () => {
    if (!currentMember) return false;
    const original = teamMembers.find(m => m.id === currentMember.id) || emptyMember;
    return JSON.stringify(currentMember) !== JSON.stringify(original);
  };

  const handleSave = async () => {
    const isUpdating = currentMember && currentMember.id;
    setIsSaving(true);
    try {
      // Simulation
      console.log("Saving team member:", currentMember);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      notification.success({
        message: `Miembro ${isUpdating ? 'Actualizado' : 'Creado'}`,
        description: `El miembro del equipo se ha ${isUpdating ? 'actualizado' : 'creado'} correctamente.`,
      });
      fetchMembers();
      setViewMode("list");
      setCurrentMember(null);
    } catch (error) {
      console.error("Error al guardar el miembro:", error);
      notification.error({
        message: 'Error al Guardar',
        description: `No se pudo ${isUpdating ? 'actualizar' : 'crear'} el miembro del equipo.`,
      });
    } finally {
      setIsSaving(false);
    }
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

  // Roles únicos usando academicRole
  const roles = ["all", ...new Set(teamMembers.map(m => m.academicRole || m.category).filter(Boolean))];

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

      {viewMode === "list" ? (
        <>
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
            <div className="modern-table-container">
              <table className="modern-admin-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Título</th>
                    <th>Rol Académico</th>
                    <th>Email</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id}>
                      <td data-label="Nombre">
                        <strong>{member.name} {member.lastname}</strong>
                      </td>
                      <td data-label="Título">
                        {member.title || "—"}
                      </td>
                      <td data-label="Rol Académico">
                        <span className="status-badge pending">
                          {member.academicRole || member.category || "—"}
                        </span>
                      </td>
                      <td data-label="Email">
                        <MailOutlined style={{ marginRight: "0.5rem", color: "#64748b" }} />
                        {member.email}
                      </td>
                      <td className="actions-cell">
                        <div className="modern-actions">
                          <button className="btn-action btn-action-edit" title="Editar" onClick={() => handleOpenModal(member)}>
                            <EditOutlined /> Modificar
                          </button>
                          <button className="btn-action btn-action-delete" title="Eliminar" onClick={() => handleDelete(member.id)}>
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
        <TeamMemberEditor 
          member={currentMember}
          setMember={setCurrentMember}
          onSave={handleSave}
          onCancel={() => handleCloseEditor()}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};

const TeamMemberEditor = ({ member, setMember, onSave, onCancel, isSaving }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMember(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="admin-editor-container">
      <div className="admin-editor-header">
        <div className="admin-editor-header-left">
          <div className="admin-editor-breadcrumb" onClick={onCancel}>
            <ArrowLeftOutlined /> Volver al listado
          </div>
          <h2 className="admin-editor-title">
            {member.id ? `Editando: ${member.name} ${member.lastname}` : "Nueva Persona"}
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

          {/* Datos personales */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title"><SettingOutlined /> Datos Personales</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="admin-editor-row-2">
                <div className="editor-form-group">
                  <label className="editor-label">Nombre</label>
                  <input type="text" name="name" className="editor-input"
                    value={member.name} onChange={handleChange} required />
                </div>
                <div className="editor-form-group">
                  <label className="editor-label">Apellido</label>
                  <input type="text" name="lastname" className="editor-input"
                    value={member.lastname} onChange={handleChange} required />
                </div>
              </div>
              <div className="editor-form-group">
                <label className="editor-label">Biografía</label>
                <textarea
                  name="bio"
                  className="editor-textarea"
                  style={{ minHeight: '140px' }}
                  value={member.bio}
                  onChange={handleChange}
                  placeholder="Breve reseña personal y profesional..."
                />
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title"><MailOutlined /> Contacto</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="admin-editor-row-2">
                <div className="editor-form-group">
                  <label className="editor-label">Email Institucional</label>
                  <input type="email" name="email" className="editor-input"
                    value={member.email} onChange={handleChange} />
                </div>
                <div className="editor-form-group">
                  <label className="editor-label"><PhoneOutlined /> Teléfono</label>
                  <input type="text" name="phone" className="editor-input"
                    value={member.phone} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          {/* Redes */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title"><InfoCircleOutlined /> Redes y Enlaces</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="editor-form-group">
                <label className="editor-label"><GithubOutlined /> Perfil de GitHub</label>
                <input type="text" name="githubLink" className="editor-input"
                  value={member.githubLink} onChange={handleChange} placeholder="https://github.com/..." />
              </div>
              <div className="editor-form-group">
                <label className="editor-label"><LinkedinOutlined /> Perfil de LinkedIn</label>
                <input type="text" name="linkedinLink" className="editor-input"
                  value={member.linkedinLink} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
              </div>
            </div>
          </div>

        </div>

        <div className="admin-editor-sidebar">

          {/* Rol académico */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title"><UserOutlined /> Rol Académico</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="editor-form-group">
                <label className="editor-label">Título</label>
                <input type="text" name="title" className="editor-input"
                  value={member.title} onChange={handleChange}
                  placeholder="Ej:  APU, Lic., Ing., Dr., Mg." />
              </div>
              <div className="editor-form-group">
                <label className="editor-label">Rol / Cargo</label>
                <input type="text" name="academicRole" className="editor-input"
                  value={member.academicRole} onChange={handleChange}
                  placeholder="Ej: Investigador, Director, Tesista" />
              </div>
              <div className="editor-form-group" style={{ marginBottom: 0 }}>
                <label className="editor-checkbox-item" style={{ border: 'none', background: 'transparent', padding: '0.25rem 0', gap: '0.75rem' }}>
                  <input
                    type="checkbox"
                    name="isAuthor"
                    checked={member.isAuthor}
                    onChange={handleChange}
                    style={{ width: 16, height: 16, accentColor: '#3b82f6' }}
                  />
                  <span style={{ fontWeight: 500, color: '#334155' }}>Es autor de publicaciones</span>
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default AdminEquipo
