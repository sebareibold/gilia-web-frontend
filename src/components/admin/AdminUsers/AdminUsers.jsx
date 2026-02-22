"use client";

import { useState, useEffect } from "react";
import { getUsers, saveUser, deleteUser } from "../../../services";
import { notification, Modal } from "antd";
import {
  LockOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ArrowLeftOutlined,
  SaveOutlined,
  SettingOutlined,
  MailOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleFilled,
} from "@ant-design/icons";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list"); // "list" | "edit"
  const [currentUser, setCurrentUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data || []);
    } catch (error) {
      notification.error({ message: "Error al cargar usuarios" });
    } finally {
      setLoading(false);
    }
  };

  const emptyUser = {
    email: "",
    password: "",
    role: "editor",
    is_active: true,
  };

  const handleOpenEditor = (user = null) => {
    setCurrentUser(
      user
        ? { ...user, password: "" } // nunca pre-rellenar la contraseña
        : { ...emptyUser }
    );
    setViewMode("edit");
  };

  const handleCloseEditor = () => {
    setViewMode("list");
    setCurrentUser(null);
  };

  const handleSave = async () => {
    const isUpdating = currentUser && currentUser.id;
    setIsSaving(true);
    try {
      await saveUser(currentUser);
      notification.success({
        message: `Usuario ${isUpdating ? "Actualizado" : "Creado"}`,
        description: `El usuario se ha ${isUpdating ? "actualizado" : "creado"} correctamente.`,
      });
      fetchUsers();
      handleCloseEditor();
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
      notification.error({ message: "Error al Guardar" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "¿Estás seguro de que deseas eliminar este usuario?",
      content: "Esta acción no se puede deshacer.",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: async () => {
        try {
          await deleteUser(id);
          notification.success({ message: "Usuario eliminado correctamente." });
          fetchUsers();
        } catch (e) {
          notification.error({ message: "Error al eliminar" });
        }
      },
    });
  };

  const filteredUsers = users.filter((u) =>
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando usuarios...</p>
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
              <LockOutlined />
              Gestión de Usuarios
            </h1>
            <p className="admin-unified-subtitle">
              Administrá las cuentas con acceso al backoffice de GILIA.
            </p>
            <div className="admin-status-banner" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', marginBottom: '1.5rem', color: '#64748b', fontSize: '0.9rem' }}>
              <InfoCircleFilled style={{ color: '#3b82f6', fontSize: '1.1rem' }} />
              <span>La creación y modificación de usuarios no está habilitada en esta versión.</span>
            </div>
          </div>

          <div className="admin-unified-filters">
            <div className="admin-unified-search">
              <SearchOutlined className="admin-unified-search-icon" />
              <input
                type="text"
                placeholder="Buscar por email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="admin-unified-empty">
              <LockOutlined className="admin-unified-empty-icon" />
              <h3 className="admin-unified-empty-title">Sin usuarios</h3>
              <p className="admin-unified-empty-description">
                No se encontraron usuarios que coincidan con la búsqueda.
              </p>
            </div>
          ) : (
            <div className="modern-table-container">
              <table className="modern-admin-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td data-label="Email">
                        <strong>{user.email}</strong>
                      </td>
                      <td data-label="Rol">
                        <span className={`status-badge ${user.role === "admin" ? "active" : "pending"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td data-label="Estado">
                        {user.is_active ? (
                          <span className="status-badge active">
                            <CheckCircleOutlined style={{ marginRight: "0.3rem" }} />
                            Activo
                          </span>
                        ) : (
                          <span className="status-badge inactive">
                            <CloseCircleOutlined style={{ marginRight: "0.3rem" }} />
                            Inactivo
                          </span>
                        )}
                      </td>
                      <td className="actions-cell">
                        <div className="modern-actions">
                          <button
                            className="btn-action btn-action-edit disabled"
                            disabled
                            title="Función no habilitada"
                            style={{ opacity: 0.5, cursor: 'not-allowed' }}
                          >
                            <EditOutlined /> Modificar
                          </button>
                          <button
                            className="btn-action btn-action-delete"
                            onClick={() => handleDelete(user.id)}
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

          {/* Información de Roles */}
          <div className="admin-editor-card" style={{ marginTop: '2rem', maxWidth: '800px' }}>
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title">
                <InfoCircleFilled style={{ color: '#3b82f6' }} /> Información sobre Roles y Permisos
              </h3>
            </div>
            <div className="admin-editor-card-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ color: '#1e293b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="status-badge active" style={{ padding: '2px 8px' }}>Admin</span>
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                    <strong>Control total:</strong> Gestión de todos los contenidos, usuarios, roles y configuraciones globales del sistema.
                  </p>
                </div>
                <div>
                  <h4 style={{ color: '#1e293b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="status-badge pending" style={{ padding: '2px 8px' }}>Editor</span>
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                    <strong>Gestión de contenido:</strong> Creación y edición de Proyectos, Líneas, Equipo y Novedades. Sin acceso a usuarios.
                  </p>
                </div>
                <div>
                  <h4 style={{ color: '#1e293b', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="status-badge" style={{ padding: '2px 8px', background: '#f1f5f9', color: '#475569' }}>Developer</span>
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: '1.5' }}>
                    <strong>Acceso técnico:</strong> Visualización de logs, estadísticas del sistema y herramientas de mantenimiento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <UserEditor
          user={currentUser}
          setUser={setCurrentUser}
          onSave={handleSave}
          onCancel={handleCloseEditor}
          isSaving={isSaving}
        />
      )}
    </div>
  );
};

const UserEditor = ({ user, setUser, onSave, onCancel, isSaving }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <div className="admin-editor-container">
      <div className="admin-editor-header">
        <div className="admin-editor-header-left">
          <div className="admin-editor-breadcrumb" onClick={onCancel}>
            <ArrowLeftOutlined /> Volver al listado
          </div>
          <h2 className="admin-editor-title">
            {user.id ? `Editando: ${user.email}` : "Nuevo Usuario"}
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

          {/* Credenciales */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title"><SettingOutlined /> Credenciales</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="editor-form-group">
                <label className="editor-label"><MailOutlined /> Email</label>
                <input
                  type="email"
                  name="email"
                  className="editor-input"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="usuario@gilia.com"
                />
              </div>
              <div className="editor-form-group">
                <label className="editor-label">
                  <LockOutlined /> {user.id ? "Nueva Contraseña (dejar vacío para no cambiar)" : "Contraseña"}
                </label>
                <input
                  type="password"
                  name="password"
                  className="editor-input"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="admin-editor-sidebar">

          {/* Rol y estado */}
          <div className="admin-editor-card">
            <div className="admin-editor-card-header">
              <h3 className="admin-editor-card-title">Rol y Estado</h3>
            </div>
            <div className="admin-editor-card-body">
              <div className="editor-form-group">
                <label className="editor-label">Rol</label>
                <select
                  name="role"
                  className="editor-select"
                  value={user.role}
                  onChange={handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="developer">Developer</option>
                </select>
              </div>
              <div className="editor-form-group" style={{ marginBottom: 0 }}>
                <label
                  className="editor-checkbox-item"
                  style={{ border: "none", background: "transparent", padding: "0.25rem 0", gap: "0.75rem" }}
                >
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={user.is_active}
                    onChange={handleChange}
                    style={{ width: 16, height: 16, accentColor: "#22c55e" }}
                  />
                  <span style={{ fontWeight: 500, color: "#334155" }}>Usuario activo</span>
                </label>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
