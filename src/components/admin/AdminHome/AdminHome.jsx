"use client";

import { Link } from "react-router-dom";
import {
  TeamOutlined,
  ProjectOutlined,
  FileTextOutlined,
  ExperimentOutlined,
  NotificationOutlined,
  ReadOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import "./AdminHome.css";

const AdminHome = () => {
  const quickAccessCards = [
    {
      title: "Usuarios",
      description: "Gestionar cuentas y roles de usuario.",
      icon: <TeamOutlined />,
      path: "/admin/usuarios",
      color: "blue",
    },
    {
      title: "Novedades",
      description: "Crear y administrar noticias y eventos.",
      icon: <NotificationOutlined />,
      path: "/admin/novedades",
      color: "orange",
    },
    {
      title: "Publicaciones",
      description: "Administrar artículos y publicaciones.",
      icon: <FileTextOutlined />,
      path: "/admin/publicaciones",
      color: "green",
    },
    {
      title: "Líneas de Investigación",
      description: "Definir y actualizar líneas de investigación.",
      icon: <ExperimentOutlined />,
      path: "/admin/investigacion",
      color: "purple",
    },
    {
      title: "Líneas de Extensión",
      description: "Gestionar proyectos y actividades de extensión.",
      icon: <ProjectOutlined />,
      path: "/admin/extension",
      color: "cyan",
    },
    {
      title: "Contenido del Sitio",
      description: "Editar secciones como 'Nosotros' u 'Objetivos'.",
      icon: <ReadOutlined />,
      path: "/admin/contenido",
      color: "red",
    },
  ];

  return (
    <div className="admin-home">
      {/* Seccion de Header (Bienvenida y contexto) */}
      <div className="admin-home-header">
        <div className="admin-welcome-text">
          <div className="admin-welcome-badge">
            <span>Panel de Control</span>
          </div>
          <h1 className="admin-welcome-title">Bienvenido, Administrador</h1>
          <p className="admin-welcome-subtitle">
            Sistema de Gestión del Grupo de Investigación G.I.L.I.A
          </p>
        </div>
      </div>

      {/* Seccion de accesos directos */}
      <div className="admin-quick-actions-section">
        <h2 className="admin-section-title">
          <span>Accesos Directos</span>
        </h2>
        <div className="admin-quick-actions-grid">
          {quickAccessCards.map((card, index) => (
            <Link
              to={card.path}
              key={index}
              className={`admin-quick-action-card ${card.color}`}
            >
              <div className="admin-quick-action-header">
                <div className={`admin-quick-action-icon`}>{card.icon}</div>
              </div>
              <h3 className="admin-quick-action-title">{card.title}</h3>
              <p className="admin-quick-action-description">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
