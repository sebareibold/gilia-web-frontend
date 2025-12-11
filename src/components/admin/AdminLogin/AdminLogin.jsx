"use client";

import React, { useState } from 'react';
import './AdminLogin.css';
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await login(credentials);
      if (result.success) {
        navigate("/admin");
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setCredentials((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (error) setError("");
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        {/* Seccion  de Logo y descripcion */}
        <div className="admin-login-header">
          <div className="admin-logo">G</div>
          <h1 className="admin-login-title">GILIA Admin</h1>
          <p className="admin-login-subtitle">
            Accede al panel de administración
          </p>
        </div>

        {/* Seccion  de Formulario */}
        <form onSubmit={handleSubmit} className="admin-login-form">

          {/* Entrada de email de usuario */}
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
                placeholder="name@example.com"
                value={credentials.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Entrada de contraseña */}
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
                placeholder="name123"
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
          {error && <div className="admin-error-message">{error}</div>}
          <button
            type="submit"
            className="admin-login-button"
            disabled={loading}
          >
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
  );
};

export default AdminLogin;
