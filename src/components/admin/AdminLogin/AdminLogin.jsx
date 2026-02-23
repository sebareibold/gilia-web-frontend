
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
import Illustration from "../../../Assets/admin/login-illustration.png";

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
    <div className="admin-login-layout">
      {/* Left Column: Visual/Illustrative */}
      <motion.div 
        className="admin-login-visual"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="visual-content">
          <img src={Illustration} alt="GILIA Admin Illustration" className="login-illustration" />
          <div className="visual-decor">
            <div className="decor-circle circle-1"></div>
            <div className="decor-circle circle-2"></div>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Login Form */}
      <motion.div 
        className="admin-login-form-side"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="admin-login-card">
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
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
