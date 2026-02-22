"use client";

import { Link } from "react-router-dom";
import {
  TeamOutlined,
  ProjectOutlined,
  FileTextOutlined,
  ExperimentOutlined,
  NotificationOutlined,
  PictureOutlined,
  BranchesOutlined,
  UserOutlined,
  ArrowRightOutlined,
  InfoCircleOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Card, Space, Divider } from "antd";
import "./AdminHome.css";

const AdminHome = () => {
  const adminSections = [
    {
      title: "Novedades y Eventos",
      description: "Publicá noticias, eventos y actualizaciones del grupo. Podés usar links externos o contenido interno en Markdown.",
      icon: <NotificationOutlined />,
      path: "/admin/news",
      color: "#f59e0b", // Amber
      actions: ["Ver", "Editar", "Eliminar"]
    },
    {
      title: "Proyectos",
      description: "Gestioná los proyectos de investigación activos y finalizados, vinculándolos con el equipo y las líneas.",
      icon: <ProjectOutlined />,
      path: "/admin/projects",
      color: "#3b82f6", // Blue
      actions: ["Ver", "Editar", "Eliminar"]
    },
    {
      title: "Equipo",
      description: "Administrá los integrantes del grupo GILIA, sus roles académicos, bio y perfiles profesionales.",
      icon: <TeamOutlined />,
      path: "/admin/team",
      color: "#8b5cf6", // Violet
      actions: ["Ver", "Editar", "Eliminar"]
    },
    {
      title: "Contenido Estático",
      description: "Editá los textos del Banner principal, el lema, la historia del grupo y los objetivos institucionales.",
      icon: <FileTextOutlined />,
      path: "/admin/content",
      color: "#10b981", // Emerald
      actions: ["Ver", "Editar"]
    },
    {
      title: "Publicaciones Científicas",
      description: "Cargá y categorizá papers, artículos y tesis. Relacionalos con integrantes y líneas de investigación.",
      icon: <BookOutlinedWrapper />,
      path: "/admin/posts",
      color: "#ec4899", // Pink
      actions: ["Ver", "Editar", "Eliminar"]
    },
    {
      title: "Líneas de Investigación",
      description: "Definí las áreas principales donde el grupo genera conocimiento y avance científico.",
      icon: <ExperimentOutlined />,
      path: "/admin/lines",
      color: "#6366f1", // Indigo
      actions: ["Ver", "Editar", "Eliminar"]
    },
    {
      title: "Gallería y Multimedia",
      description: "Gestioná el contenido visual del laboratorio, eventos y presentaciones en video.",
      icon: <PictureOutlined />,
      path: "/admin/gallery",
      color: "#f43f5e", // Rose
      actions: ["Ver", "Editar", "Eliminar"]
    },
    {
      title: "Usuarios del Sistema",
      description: "Controlá quién tiene acceso al panel de administración y cuáles son sus permisos (Admin, Editor, Dev).",
      icon: <UserOutlined />,
      path: "/admin/users",
      color: "#475569", // Slate
      actions: ["Ver", "Editar", "Eliminar"]
    }
  ];

  return (
    <div className="admin-home">
      {/* HEADER DE BIENVENIDA */}
      <div className="admin-home-header">
        <div className="admin-welcome-text">
          <div className="admin-welcome-badge">
            <DashboardOutlined /> <span>Panel Administrativo GILIA</span>
          </div>
          <h1 className="admin-welcome-title">¡Hola de nuevo!</h1>
          <p className="admin-welcome-subtitle">
            Desde aquí podés gestionar todo el ecosistema digital del Grupo de Investigación.
          </p>
        </div>
      </div>

      {/* GUÍA RÁPIDA DE UX */}
      <div className="admin-quick-guide">
        <div className="guide-card">
          <div className="guide-icon"><InfoCircleOutlined /></div>
          <div className="guide-content">
            <h3>¿Cómo empezar?</h3>
            <p>Elegí una sección para empezar a editar. Los cambios se reflejarán en el sitio público una vez que los guardes.</p>
          </div>
        </div>
      </div>

      {/* ACCESOS DIRECTOS MEJORADOS */}
      <div className="admin-quick-actions-section">
        <div className="section-header-flex">
          <h2 className="admin-section-title">Accesos Directos</h2>
          <span className="section-tag">{adminSections.length} secciones habilitadas</span>
        </div>
        
        <div className="admin-cards-grid">
          {adminSections.map((section, idx) => (
            <Link to={section.path} key={idx} className="admin-action-card-wrapper">
              <div className="admin-action-card-v2" style={{ '--accent-color': section.color }}>
                <div className="card-top">
                  <div className="card-icon">{section.icon}</div>
                  <div className="card-arrow"><ArrowRightOutlined /></div>
                </div>
                <div className="card-body">
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                </div>
                <div className="card-footer">
                   {section.actions.map((act, i) => (
                     <span key={i} className="action-tag">{act}</span>
                   ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* PIE DE DASHBOARD */}
      <div className="admin-dashboard-footer">
        <Divider />
        <p>© {new Date().getFullYear()} GILIA Admin System • Diseñado para la excelencia académica</p>
      </div>
    </div>
  );
};

// Wrapper para BookOutlined que no está importado arriba
const BookOutlinedWrapper = () => (
    <svg viewBox="64 64 896 896" focusable="false" data-icon="book" width="1em" height="1em" fill="currentColor" aria-hidden="true">
        <path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-600 72h560v32H232v-32zm560 760H232V232h560v664zM272 312h480v48H272v-48zm0 136h480v48H272v-48zm0 136h480v48H272v-48z"></path>
    </svg>
);

export default AdminHome;
