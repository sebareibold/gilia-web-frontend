import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  HomeOutlined,
  LogoutOutlined,
  ExperimentOutlined,
  BranchesOutlined,
  BookOutlined,
  UserOutlined,
  AppstoreOutlined,
  LeftOutlined,
  RightOutlined,
  MenuOutlined,
  ProjectOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./AdminLayout.css";
import "../../styles/AdminCommon.css";

// Items del menu, con sus iconos y etiquetas correspondientes
const MENU_ITEMS = [
  {
    key: "",
    icon: <HomeOutlined />,
    label: "Inicio",
  },
  {
    key: "lines",
    icon: <ExperimentOutlined />,
    label: "Líneas de Investigación",
  },
  {
    key: "extentions-lines",
    icon: <ProjectOutlined />,
    label: "Líneas de Extensión",
  },
  {
    key: "posts",
    icon: <BookOutlined />,
    label: "Publicaciones",
  },
  {
    key: "projects",
    icon: <BranchesOutlined />,
    label: "Proyectos",
  },
  {
    key: "team",
    icon: <UserOutlined />,
    label: "Equipo",
  },
  /*
  {
    key: "gallery",
    icon: <AppstoreOutlined />,
    label: "Galería",
  }, 
  */
  {
    key: "configuration",
    icon: <SettingOutlined />,
    label: "Configuración",
  },
];

// Utilizada para usar el menu del movil
const useMobileMenu = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return { mobileMenuOpen, setMobileMenuOpen };
};

// Funcion para utilizar los styles termiandos en el body
const useBodyStyles = () => {
  useEffect(() => {
    const originalPadding = document.body.style.paddingTop;
    const originalBackground = document.body.style.background;
    const originalColor = document.body.style.color;

    document.body.style.paddingTop = "0px";
    document.body.style.background = "transparent";
    document.body.style.color = "#1e293b";

    return () => {
      document.body.style.paddingTop = originalPadding;
      document.body.style.background = originalBackground;
      document.body.style.color = originalColor;
    };
  }, []);
};

// Navbar mobile
const MobileAppBar = ({ user, isMenuOpen, onToggleMenu }) => (
  <div className="mobile-appbar">
    <div className="mobile-appbar-content">
      <div className="mobile-user-display">
        <span className="mobile-username">{user?.name || "Admin"}</span>
      </div>
      <button
        className="mobile-menu-toggle"
        onClick={onToggleMenu}
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        <MenuOutlined />
      </button>
    </div>

    {isMenuOpen && (
      <div className="mobile-dropdown-menu">
        {MENU_ITEMS.map((item) => (
          <Link
            key={item.key}
            to={item.key}
            className="mobile-dropdown-item"
            onClick={onToggleMenu}
          >
            <span className="mobile-item-icon">{item.icon}</span>
            <span className="mobile-item-label">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={() => {
            onToggleMenu();
            // handleLogout will be passed from parent
          }}
          className="mobile-dropdown-item mobile-logout"
        >
          <LogoutOutlined className="mobile-item-icon" />
          <span className="mobile-item-label">Cerrar Sesión</span>
        </button>
      </div>
    )}
  </div>
);

/* 
const MobileMenuButton = ({ isOpen, onToggle }) => (
  <button className="mobile-hamburger-button" onClick={onToggle} aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}>
    <div className={`hamburger-lines ${isOpen ? "open" : ""}`}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </button>
) */

const UserHeader = ({ user, sidebarOpen, onToggleSidebar }) => (
  <div className="admin-user-header">
    {/* Esto se muestra si esta expandida la sidebar */}
    <div
      className={`admin-user-info-inline ${sidebarOpen ? "expanded" : "collapsed"}`}
    >
      {sidebarOpen && (
        <div className="admin-user-details">
          <p className={`admin-user-name ${sidebarOpen ? "expanded" : "collapsed"}`}>{user?.name || "Admin"}</p>
          <p className="admin-user-email">{user?.email || "admin@gilia.com"}</p>
        </div>
      )}
    </div>

    {/* Boton para poder expantir o contraer*/}
    <button
      className= {`admin-sidebar-toggle  ${sidebarOpen ? "expanded" : "collapsed"}`}
      onClick={onToggleSidebar}
      title={sidebarOpen ? "Plegar sidebar" : "Expandir sidebar"}
      aria-label={sidebarOpen ? "Plegar sidebar" : "Expandir sidebar"}
    >
      {sidebarOpen ? <LeftOutlined /> : <RightOutlined />}
    </button>
  </div>
);

// ========= SideBar ==========
const Navigation = ({ currentPath }) => {
  // Normalizar la ruta actual: remover parametros de consulta, hashes y asegurar que empiece con /
  const normalizedCurrentPath = (currentPath || "")
    .split("?")[0] // Remover parámetros de consulta
    .split("#")[0] // Remover hashes
    .replace(/\/$/, "") // Remover trailing slash
    .replace(/^\/*/, "/"); // Asegurar que empiece con /

  // Función para determinar si un ítem esta activo
  const isActive = (itemKey) => {
    if (itemKey === "") {
      return (
        normalizedCurrentPath === "/admin" ||
        normalizedCurrentPath === "/admin/"
      );
    }
    return (
      normalizedCurrentPath === `/admin/${itemKey}` ||
      normalizedCurrentPath.endsWith(`/admin/${itemKey}`)
    );
  };

  return (
    <nav className="admin-navigation">
      {MENU_ITEMS.map((item) => {

        const itemPath = item.key === "" ? "/admin" : `/admin/${item.key}`;
        const isItemActive = isActive(item.key);

        return (
          <Link
            key={itemPath}
            to={itemPath}
            className={`admin-nav-item ${isItemActive ? "active" : ""}`}
            title={item.label}
          >
            <span className="admin-nav-icon">{item.icon}</span>
            <span className="admin-nav-label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

// Componente para poder retirase del backoffice
const LogoutSection = ({ onLogout }) => (
  <div className="admin-logout-section">
    <button
      onClick={onLogout}
      className="admin-logout-button"
      title="Cerrar Sesión"
      aria-label="Cerrar Sesión"
    >
      <LogoutOutlined className="admin-nav-icon" />
      <span className="admin-nav-label">Cerrar Sesión</span>
    </button>
  </div>
);

// Componente principal - Layout del backoffice
const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu();

  useBodyStyles();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="admin-layout-gradient admin-theme">
      {/*  <div className="mobile-only">
          <MobileAppBar user={user} isMenuOpen={mobileMenuOpen} onToggleMenu={toggleMobileMenu} />
        </div>

        {mobileMenuOpen && <div className="mobile-simple-overlay" onClick={() => setMobileMenuOpen(false)} />} */}

      <aside
        className={`admin-sidebar-transparent ${mobileMenuOpen ? "mobile-open" : ""} ${!sidebarOpen ? "collapsed" : "stable"}`}
      >
        <div className="admin-sidebar-content">
          <UserHeader
            user={user}
            sidebarOpen={sidebarOpen}
            onToggleSidebar={toggleSidebar}
          />

          <Navigation currentPath={location.pathname} />

          <LogoutSection onLogout={handleLogout} />
        </div>
      </aside>

      <div className={`admin-main-wrapper ${!sidebarOpen ? "collapsed" : ""}`}>
        <main className="admin-page-content">
            <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
