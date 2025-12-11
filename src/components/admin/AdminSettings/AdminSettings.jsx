"use client"

import { useState, useEffect } from "react"
import { notification } from "antd"
import { dataService } from "../../../services/dataService"
import {
  SettingOutlined,
  SaveOutlined,
  ReloadOutlined,
  SecurityScanOutlined,
  GlobalOutlined,
  DatabaseOutlined,
  UserOutlined, // Importar el nuevo ícono
} from "@ant-design/icons"
import "./AdminSettings.css"

const AdminConfiguracion = () => {
  // Estado para la configuración general
  const [initialConfig, setInitialConfig] = useState(null)
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Estado para el perfil del administrador
  const [profile, setProfile] = useState({
    nombre: "",
    password: "",
    confirmPassword: "",
  })
  const [profileSaving, setProfileSaving] = useState(false)

  // Cargar configuración general y datos del perfil
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Cargar configuración del sitio
        const configResponse = await dataService.getConfiguracion()
        setConfig(configResponse.data)
        setInitialConfig(configResponse.data)

        // Cargar datos del usuario actual (admin)
        const userResponse = await dataService.getMe() // Asume que este servicio existe
        setProfile((prev) => ({ ...prev, nombre: userResponse.data.nombre }))
      } catch (error) {
        notification.error({ message: "Error al cargar los datos" })
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Handlers para la configuración general
  const handleInputChange = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveConfig = async () => {
    setSaving(true)
    try {
      await dataService.updateConfiguracion(config)
      setInitialConfig(config)
      notification.success({ message: "Configuración guardada con éxito" })
    } catch (error) {
      notification.error({ message: "Error al guardar la configuración" })
    } finally {
      setSaving(false)
    }
  }

  const handleResetConfig = () => {
    if (window.confirm("¿Descartar cambios no guardados?")) {
      setConfig(initialConfig)
      notification.info({ message: "Cambios descartados" })
    }
  }

  // Handlers para el perfil del administrador
  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleProfileSave = async () => {
    if (profile.password && profile.password !== profile.confirmPassword) {
      notification.error({ message: "Las contraseñas no coinciden" })
      return
    }

    setProfileSaving(true)
    try {
      const dataToUpdate = { nombre: profile.nombre }
      if (profile.password) {
        dataToUpdate.password = profile.password
      }
      await dataService.updateProfile(dataToUpdate) // Asume que este servicio existe
      notification.success({ message: "Perfil actualizado con éxito" })
      setProfile((prev) => ({ ...prev, password: "", confirmPassword: "" }))
    } catch (error) {
      notification.error({ message: "Error al actualizar el perfil" })
    } finally {
      setProfileSaving(false)
    }
  }

  if (loading) return <p>Cargando...</p>
  if (!config) return <p>No se pudo cargar la configuración.</p>

  
  return (
    <div className="admin-unified-page">
      {/* Decoraciones y Header */}
      <div className="admin-unified-decorations">
        <div className="admin-floating-element admin-floating-element-1"></div>
        <div className="admin-floating-element admin-floating-element-2"></div>
        <div className="admin-floating-element admin-floating-element-3"></div>
      </div>

      <div className="admin-unified-header">
        <h1 className="admin-unified-title">
          <SettingOutlined />
          Configuración
        </h1>
        <p className="admin-unified-subtitle">
          Gestiona la configuración del sitio y tu perfil de administrador.
        </p>
      </div>

      {/* Sección Perfil de Administrador */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">
            <UserOutlined style={{ color: "#3b82f6" }} />
            Perfil de Administrador
          </h2>
        </div>
        <div className="admin-card-body">
          {/* Campo Nombre */}
          <div className="form-group">
            <label className="form-label">Nombre</label>
            <div className="form-control-wrapper">
              <input
                type="text"
                value={profile.nombre}
                onChange={(e) => handleProfileChange("nombre", e.target.value)}
                className="form-input"
              />
              <p className="form-description">Tu nombre de usuario.</p>
            </div>
          </div>

          {/* Campo Nueva Contraseña */}
          <div className="form-group">
            <label className="form-label">Nueva Contraseña</label>
            <div className="form-control-wrapper">
              <input
                type="password"
                value={profile.password}
                onChange={(e) => handleProfileChange("password", e.target.value)}
                className="form-input"
                placeholder="Dejar en blanco para no cambiar"
              />
              <p className="form-description">Introduce una nueva contraseña si deseas cambiarla.</p>
            </div>
          </div>

          {/* Campo Confirmar Contraseña */}
          <div className="form-group">
            <label className="form-label">Confirmar Contraseña</label>
            <div className="form-control-wrapper">
              <input
                type="password"
                value={profile.confirmPassword}
                onChange={(e) => handleProfileChange("confirmPassword", e.target.value)}
                className="form-input"
                placeholder="Repite la nueva contraseña"
              />
              <p className="form-description">Confirma tu nueva contraseña.</p>
            </div>
          </div>
        </div>
        <div className="admin-card-footer">
          <button
            className={`admin-unified-primary-btn`}
            onClick={handleProfileSave}
            disabled={profileSaving}
          >
            {profileSaving ? <ReloadOutlined spin /> : <SaveOutlined />}
            {profileSaving ? "Guardando Perfil..." : "Guardar Perfil"}
          </button>
        </div>
      </div>

      {/* Sección Información del Sitio */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">
            <GlobalOutlined style={{ color: "#667eea" }} />
            Información del Sitio
          </h2>
        </div>
        <div className="admin-card-body">
          {Object.keys(config).map((key) => (
            <div className="form-group" key={key}>
              <label className="form-label">{key.replace(/_/g, ' ')}</label>
              <div className="form-control-wrapper">
                <input
                  type="text"
                  value={config[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="admin-card-footer">
          <button
            className={`admin-unified-primary-btn`}
            onClick={handleSaveConfig}
            disabled={saving}
          >
            {saving ? <ReloadOutlined spin /> : <SaveOutlined />}
            {saving ? "Guardando..." : "Guardar Configuración"}
          </button>
        </div>
      </div>

      {/* Otras secciones (Sistema, Seguridad) pueden ir aquí */}

    </div>
  )
}

export default AdminConfiguracion
