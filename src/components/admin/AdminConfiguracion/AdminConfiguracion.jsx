"use client"

import { useState } from "react"
import {
  SettingOutlined,
  SaveOutlined,
  ReloadOutlined,
  SecurityScanOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  BellOutlined,
} from "@ant-design/icons"

const Configuracion = () => {
  const [config, setConfig] = useState({
    sitio: {
      nombre: "GILIA - Grupo de Investigación",
      descripcion: "Grupo de Investigación en Inteligencia Artificial y Tecnologías Emergentes",
      url: "https://gilia.example.com",
      email: "contacto@gilia.com",
      telefono: "+34 123 456 789",
      direccion: "Universidad Ejemplo, Campus Norte, Edificio A",
    },
    sistema: {
      mantenimiento: false,
      registroPublico: true,
      moderacionComentarios: true,
      backupAutomatico: true,
      notificacionesEmail: true,
    },
    seguridad: {
      sesionExpiracion: 24,
      intentosLogin: 5,
      dobleFactorAuth: false,
      logActividad: true,
    },
    notificaciones: {
      nuevasPublicaciones: true,
      nuevosProyectos: true,
      cambiosEquipo: true,
      mantenimiento: true,
    },
  })

  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleInputChange = (section, field, value) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    // Simular guardado
    setTimeout(() => {
      setLoading(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }, 1000)
  }

  const handleReset = () => {
    if (window.confirm("¿Estás seguro de que deseas restablecer la configuración?")) {
      // Restablecer a valores por defecto
      window.location.reload()
    }
  }

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-page-header">
        <h1 className="admin-page-title">
          <SettingOutlined style={{ marginRight: "0.5rem" }} />
          Configuración del Sistema
        </h1>
        <p className="admin-page-subtitle">
          Administra la configuración general del sitio web, seguridad, notificaciones y preferencias del sistema.
        </p>
        <div className="admin-page-actions">
          <button
            className={`admin-btn ${saved ? "admin-btn-success" : "admin-btn-primary"}`}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? <ReloadOutlined style={{ animation: "spin 1s linear infinite" }} /> : <SaveOutlined />}
            {saved ? "Guardado" : loading ? "Guardando..." : "Guardar Cambios"}
          </button>
          <button className="admin-btn admin-btn-warning" onClick={handleReset}>
            <ReloadOutlined />
            Restablecer
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gap: "2rem" }}>
        {/* Configuración del Sitio */}
        <div className="admin-content-card">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#1e293b",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <GlobalOutlined style={{ color: "#667eea" }} />
            Información del Sitio
          </h2>

          <div className="admin-form">
            <div
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}
            >
              <div className="admin-form-group">
                <label className="admin-form-label">Nombre del Sitio</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={config.sitio.nombre}
                  onChange={(e) => handleInputChange("sitio", "nombre", e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">URL del Sitio</label>
                <input
                  type="url"
                  className="admin-form-input"
                  value={config.sitio.url}
                  onChange={(e) => handleInputChange("sitio", "url", e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Email de Contacto</label>
                <input
                  type="email"
                  className="admin-form-input"
                  value={config.sitio.email}
                  onChange={(e) => handleInputChange("sitio", "email", e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Teléfono</label>
                <input
                  type="tel"
                  className="admin-form-input"
                  value={config.sitio.telefono}
                  onChange={(e) => handleInputChange("sitio", "telefono", e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Descripción</label>
              <textarea
                className="admin-form-textarea"
                value={config.sitio.descripcion}
                onChange={(e) => handleInputChange("sitio", "descripcion", e.target.value)}
                rows={3}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Dirección</label>
              <textarea
                className="admin-form-textarea"
                value={config.sitio.direccion}
                onChange={(e) => handleInputChange("sitio", "direccion", e.target.value)}
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Configuración del Sistema */}
        <div className="admin-content-card">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#1e293b",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <DatabaseOutlined style={{ color: "#10b981" }} />
            Sistema
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  color: "#64748b",
                  marginBottom: "1rem",
                }}
              >
                Estado del Sitio
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={config.sistema.mantenimiento}
                    onChange={(e) => handleInputChange("sistema", "mantenimiento", e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                  />
                  <span style={{ color: "#1e293b" }}>Modo mantenimiento</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={config.sistema.registroPublico}
                    onChange={(e) => handleInputChange("sistema", "registroPublico", e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                  />
                  <span style={{ color: "#1e293b" }}>Permitir registro público</span>
                </label>
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  color: "#64748b",
                  marginBottom: "1rem",
                }}
              >
                Funcionalidades
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={config.sistema.moderacionComentarios}
                    onChange={(e) => handleInputChange("sistema", "moderacionComentarios", e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                  />
                  <span style={{ color: "#1e293b" }}>Moderación de comentarios</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={config.sistema.backupAutomatico}
                    onChange={(e) => handleInputChange("sistema", "backupAutomatico", e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                  />
                  <span style={{ color: "#1e293b" }}>Backup automático</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={config.sistema.notificacionesEmail}
                    onChange={(e) => handleInputChange("sistema", "notificacionesEmail", e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                  />
                  <span style={{ color: "#1e293b" }}>Notificaciones por email</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Configuración de Seguridad */}
        <div className="admin-content-card">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#1e293b",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <SecurityScanOutlined style={{ color: "#ef4444" }} />
            Seguridad
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  color: "#64748b",
                  marginBottom: "1rem",
                }}
              >
                Autenticación
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="admin-form-group">
                  <label className="admin-form-label">Expiración de sesión (horas)</label>
                  <input
                    type="number"
                    className="admin-form-input"
                    value={config.seguridad.sesionExpiracion}
                    onChange={(e) =>
                      handleInputChange("seguridad", "sesionExpiracion", Number.parseInt(e.target.value))
                    }
                    min="1"
                    max="168"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Intentos de login máximos</label>
                  <input
                    type="number"
                    className="admin-form-input"
                    value={config.seguridad.intentosLogin}
                    onChange={(e) => handleInputChange("seguridad", "intentosLogin", Number.parseInt(e.target.value))}
                    min="3"
                    max="10"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  color: "#64748b",
                  marginBottom: "1rem",
                }}
              >
                Opciones Avanzadas
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={config.seguridad.dobleFactorAuth}
                    onChange={(e) => handleInputChange("seguridad", "dobleFactorAuth", e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                  />
                  <span style={{ color: "#1e293b" }}>Autenticación de doble factor</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={config.seguridad.logActividad}
                    onChange={(e) => handleInputChange("seguridad", "logActividad", e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                  />
                  <span style={{ color: "#1e293b" }}>Registro de actividad</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Configuración de Notificaciones */}
        <div className="admin-content-card">
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#1e293b",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <BellOutlined style={{ color: "#f59e0b" }} />
            Notificaciones
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  color: "#64748b",
                  marginBottom: "1rem",
                }}
              >
                Notificaciones de Contenido
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={config.notificaciones.nuevasPublicaciones}
                    onChange={(e) => handleInputChange("notificaciones", "nuevasPublicaciones", e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                  />
                  <span style={{ color: "#1e293b" }}>Nuevas publicaciones</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={config.notificaciones.nuevosProyectos}
                    onChange={(e) => handleInputChange("notificaciones", "nuevosProyectos", e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                  />
                  <span style={{ color: "#1e293b" }}>Nuevos proyectos</span>
                </label>
              </div>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "500",
                  color: "#64748b",
                  marginBottom: "1rem",
                }}
              >
                Notificaciones del Sistema
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={config.notificaciones.cambiosEquipo}
                    onChange={(e) => handleInputChange("notificaciones", "cambiosEquipo", e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                  />
                  <span style={{ color: "#1e293b" }}>Cambios en el equipo</span>
                </label>

                <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={config.notificaciones.mantenimiento}
                    onChange={(e) => handleInputChange("notificaciones", "mantenimiento", e.target.checked)}
                    style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                  />
                  <span style={{ color: "#1e293b" }}>Mantenimiento programado</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Información del Sistema */}
        <div className="admin-content-card">
          <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#1e293b", marginBottom: "1.5rem" }}>
            Información del Sistema
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            <div
              style={{
                padding: "1rem",
                background: "rgba(102, 126, 234, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(102, 126, 234, 0.2)",
              }}
            >
              <h4 style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Versión</h4>
              <p style={{ color: "#1e293b", fontSize: "1.1rem", fontWeight: "500", margin: 0 }}>v2.1.0</p>
            </div>

            <div
              style={{
                padding: "1rem",
                background: "rgba(16, 185, 129, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}
            >
              <h4 style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Último Backup</h4>
              <p style={{ color: "#1e293b", fontSize: "1.1rem", fontWeight: "500", margin: 0 }}>Hace 2 horas</p>
            </div>

            <div
              style={{
                padding: "1rem",
                background: "rgba(245, 158, 11, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(245, 158, 11, 0.2)",
              }}
            >
              <h4 style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Espacio Usado</h4>
              <p style={{ color: "#1e293b", fontSize: "1.1rem", fontWeight: "500", margin: 0 }}>2.3 GB / 10 GB</p>
            </div>

            <div
              style={{
                padding: "1rem",
                background: "rgba(16, 185, 129, 0.1)",
                borderRadius: "12px",
                border: "1px solid rgba(16, 185, 129, 0.2)",
              }}
            >
              <h4 style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Estado</h4>
              <p style={{ color: "#10b981", fontSize: "1.1rem", fontWeight: "500", margin: 0 }}>Operativo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Configuracion
