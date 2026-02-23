
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
import { motion } from "framer-motion";

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
      {/* Decorative floating symbols */}
      <div className="admin-login-decor" aria-hidden="true">
        <div className="decor-circle c1"></div>
        <div className="decor-circle c2"></div>
        <div className="decor-circle c3"></div>
        <div className="decor-circle c4"></div>
        <div className="decor-circle c5"></div>
        <svg className="decor-svg s1" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect x="4" y="4" width="20" height="20" rx="4" stroke="rgba(99,102,241,0.14)" strokeWidth="1.5"/>
        </svg>
        <svg className="decor-svg s2" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L22 12L12 22L2 12Z" stroke="rgba(99,102,241,0.12)" strokeWidth="1.5"/>
        </svg>
        <svg className="decor-svg s3" width="22" height="22" viewBox="0 0 22 22" fill="none">
          <polygon points="11,2 20,18 2,18" stroke="rgba(99,102,241,0.1)" strokeWidth="1.5" fill="none"/>
        </svg>
        <svg className="decor-svg s4" width="30" height="30" viewBox="0 0 30 30" fill="none">
          <line x1="15" y1="4" x2="15" y2="26" stroke="rgba(99,102,241,0.1)" strokeWidth="1.5"/>
          <line x1="4" y1="15" x2="26" y2="15" stroke="rgba(99,102,241,0.1)" strokeWidth="1.5"/>
        </svg>
      </div>

      {/* Centered Login Card */}
      <motion.div
        className="admin-login-card"
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="admin-login-header">
          <div className="admin-logo">G</div>
          <h1 className="admin-login-title">GILIA Admin</h1>
          <p className="admin-login-subtitle">
            Accede al panel de administración
          </p>
        </div>

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
                placeholder="name@example.com"
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
      </motion.div>
    </div>
  );
};

export default AdminLogin;
