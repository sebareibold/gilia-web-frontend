"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { EyeOutlined, EyeInvisibleOutlined, UserOutlined, LockOutlined } from "@ant-design/icons"

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const success = await login(formData.email, formData.password)
      if (success) {
        navigate("/admin/lineas")
      } else {
        setError("Credenciales inválidas")
      }
    } catch (error) {
      setError("Error al iniciar sesión. Intenta nuevamente.")
      console.error("Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      {/* Contenedor principal */}
      <div className="admin-login-container">
        <div className="admin-login-card">
          {/* Header con logo */}
          <div className="admin-login-header">
            <div className="admin-logo">
              <span>G</span>
            </div>
            <h1 className="admin-login-title">Panel de Administración</h1>
            <p className="admin-login-subtitle">Ingresa tus credenciales para continuar</p>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="admin-error-message">
              <span>{error}</span>
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="admin-input-group">
              <label className="admin-input-label">Usuario</label>
              <div className="admin-input-container">
                <UserOutlined className="admin-input-icon" />
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="admin-input-field"
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label className="admin-input-label">Contraseña</label>
              <div className="admin-input-container">
                <LockOutlined className="admin-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="admin-input-field"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="admin-password-toggle"
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="admin-login-button"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          {/* Enlace de regreso */}
          <div className="admin-back-link">
            <a href="/" className="admin-back-button">
              ← Volver al sitio público
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
