"use client"

import { useState } from "react"
import {
  SettingOutlined,
  SaveOutlined,
  ReloadOutlined,
  SecurityScanOutlined,
  GlobalOutlined,
  DatabaseOutlined,
} from "@ant-design/icons"
import "../../../styles/admin-unified.css"

const AdminConfiguracion = () => {
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
    <div className="admin-unified-page">
      <div className="admin-unified-decorations">
        <div className="admin-floating-element admin-floating-element-1"></div>
        <div className="admin-floating-element admin-floating-element-2"></div>
        <div className="admin-floating-element admin-floating-element-3"></div>
      </div>

      <div className="admin-unified-header">
        <h1 className="admin-unified-title">
          <SettingOutlined />
          Configuración del Sistema
        </h1>
        <p className="admin-unified-subtitle">
          Administra la configuración general del sitio web, seguridad, notificaciones y preferencias del sistema.
        </p>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            className={`admin-unified-primary-btn ${saved ? "admin-btn-success" : ""}`}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? <ReloadOutlined style={{ animation: "spin 1s linear infinite" }} /> : <SaveOutlined />}
            {saved ? "Guardado" : loading ? "Guardando..." : "Guardar Cambios"}
          </button>
          <button
            className="admin-unified-primary-btn"
            style={{ background: "linear-gradient(135deg, rgba(245, 158, 11, 0.9), rgba(245, 158, 11, 0.8))" }}
            onClick={handleReset}
          >
            <ReloadOutlined />
            Restablecer
          </button>
        </div>
      </div>

      <div className="admin-unified-table-container">
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

        <table className="admin-unified-table">
          <thead>
            <tr>
              <th>Configuración</th>
              <th>Valor Actual</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Nombre del Sitio</strong>
              </td>
              <td>
                <input
                  type="text"
                  value={config.sitio.nombre}
                  onChange={(e) => handleInputChange("sitio", "nombre", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#1e293b",
                  }}
                />
              </td>
              <td>Nombre que aparece en el sitio web</td>
            </tr>
            <tr>
              <td>
                <strong>URL del Sitio</strong>
              </td>
              <td>
                <input
                  type="url"
                  value={config.sitio.url}
                  onChange={(e) => handleInputChange("sitio", "url", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#1e293b",
                  }}
                />
              </td>
              <td>Dirección web principal</td>
            </tr>
            <tr>
              <td>
                <strong>Email de Contacto</strong>
              </td>
              <td>
                <input
                  type="email"
                  value={config.sitio.email}
                  onChange={(e) => handleInputChange("sitio", "email", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#1e293b",
                  }}
                />
              </td>
              <td>Email principal de contacto</td>
            </tr>
            <tr>
              <td>
                <strong>Teléfono</strong>
              </td>
              <td>
                <input
                  type="tel"
                  value={config.sitio.telefono}
                  onChange={(e) => handleInputChange("sitio", "telefono", e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#1e293b",
                  }}
                />
              </td>
              <td>Número de teléfono de contacto</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="admin-unified-table-container">
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
          Configuración del Sistema
        </h2>

        <table className="admin-unified-table">
          <thead>
            <tr>
              <th>Opción</th>
              <th>Estado</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Modo Mantenimiento</strong>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={config.sistema.mantenimiento}
                  onChange={(e) => handleInputChange("sistema", "mantenimiento", e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                />
              </td>
              <td>Activa el modo mantenimiento del sitio</td>
            </tr>
            <tr>
              <td>
                <strong>Registro Público</strong>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={config.sistema.registroPublico}
                  onChange={(e) => handleInputChange("sistema", "registroPublico", e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                />
              </td>
              <td>Permite registro de nuevos usuarios</td>
            </tr>
            <tr>
              <td>
                <strong>Backup Automático</strong>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={config.sistema.backupAutomatico}
                  onChange={(e) => handleInputChange("sistema", "backupAutomatico", e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                />
              </td>
              <td>Realiza copias de seguridad automáticas</td>
            </tr>
            <tr>
              <td>
                <strong>Notificaciones Email</strong>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={config.sistema.notificacionesEmail}
                  onChange={(e) => handleInputChange("sistema", "notificacionesEmail", e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                />
              </td>
              <td>Envía notificaciones por correo electrónico</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="admin-unified-table-container">
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
          Configuración de Seguridad
        </h2>

        <table className="admin-unified-table">
          <thead>
            <tr>
              <th>Configuración</th>
              <th>Valor</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Expiración de Sesión</strong>
              </td>
              <td>
                <input
                  type="number"
                  value={config.seguridad.sesionExpiracion}
                  onChange={(e) => handleInputChange("seguridad", "sesionExpiracion", Number.parseInt(e.target.value))}
                  min="1"
                  max="168"
                  style={{
                    width: "80px",
                    padding: "0.5rem",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#1e293b",
                  }}
                />
                <span style={{ marginLeft: "0.5rem", color: "#64748b" }}>horas</span>
              </td>
              <td>Tiempo antes de cerrar sesión automáticamente</td>
            </tr>
            <tr>
              <td>
                <strong>Intentos de Login</strong>
              </td>
              <td>
                <input
                  type="number"
                  value={config.seguridad.intentosLogin}
                  onChange={(e) => handleInputChange("seguridad", "intentosLogin", Number.parseInt(e.target.value))}
                  min="3"
                  max="10"
                  style={{
                    width: "80px",
                    padding: "0.5rem",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    borderRadius: "6px",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#1e293b",
                  }}
                />
              </td>
              <td>Máximo número de intentos de login fallidos</td>
            </tr>
            <tr>
              <td>
                <strong>Autenticación 2FA</strong>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={config.seguridad.dobleFactorAuth}
                  onChange={(e) => handleInputChange("seguridad", "dobleFactorAuth", e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                />
              </td>
              <td>Requiere autenticación de doble factor</td>
            </tr>
            <tr>
              <td>
                <strong>Log de Actividad</strong>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={config.seguridad.logActividad}
                  onChange={(e) => handleInputChange("seguridad", "logActividad", e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "#667eea" }}
                />
              </td>
              <td>Registra todas las actividades del sistema</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminConfiguracion
