"use client"

import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { useTheme } from "../../contexts/ThemeContext"
import "../../styles/admin-theme.css"

const AdminLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()

  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        navigate("/admin/dashboard")
      } else {
        setError("Credenciales inválidas. Por favor, intenta de nuevo.")
      }
    } catch (error) {
      setError("Error al iniciar sesión. Por favor, intenta de nuevo.")
      console.error("Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-container" data-theme={isDarkTheme ? "dark" : "light"}>
      <form onSubmit={handleSubmit} className="admin-login-form">
        <h1 className="admin-login-title">Acceso Administrativo</h1>

        <div className="admin-form-group">
          <label htmlFor="email" className="admin-form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="admin-form-input"
            placeholder="admin@gilia.com"
            required
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="password" className="admin-form-label">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="admin-form-input"
            placeholder="••••••••"
            required
          />
        </div>

        {error && <div className="admin-error-message">{error}</div>}

        <button type="submit" className="admin-login-btn" disabled={loading}>
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
