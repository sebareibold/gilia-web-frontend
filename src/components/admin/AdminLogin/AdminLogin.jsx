"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext"
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import "../../../styles/admin-theme.css"

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const success = await login(credentials.email, credentials.password)
      if (success) {
        navigate("/admin")
      } else {
        setError("Credenciales incorrectas. Usa admin / admin123")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field, value) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }))
    if (error) setError("")
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-logo">G</div>
            <h1 className="admin-login-title">GILIA Admin</h1>
            <p className="admin-login-subtitle">Accede al panel de administración</p>
          </div>

          {error && <div className="admin-error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="admin-input-group">
              <label htmlFor="email" className="admin-input-label">
                Usuario
              </label>
              <div className="admin-input-container">
                <UserOutlined className="admin-input-icon" />
                <input
                  id="email"
                  type="text"
                  className="admin-input-field"
                  placeholder="admin"
                  value={credentials.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="admin-input-group">
              <label htmlFor="password" className="admin-input-label">
                Contraseña
              </label>
              <div className="admin-input-container">
                <LockOutlined className="admin-input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="admin-input-field"
                  placeholder="admin123"
                  value={credentials.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="admin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>
            </div>

            <button type="submit" className="admin-login-button" disabled={loading}>
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="admin-back-link">
            <Link to="/" className="admin-back-button">
              ← Volver al sitio web
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
