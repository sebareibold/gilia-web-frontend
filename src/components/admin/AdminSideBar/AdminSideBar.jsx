import { NavLink } from "react-router-dom"
import { LogOut, User, Menu } from "lucide-react"
import {
  AppstoreOutlined,
  UserOutlined,
  HomeOutlined,
  ExperimentOutlined,
  BranchesOutlined,
  BookOutlined,
} from "@ant-design/icons"
import "../../../styles/admin-theme.css"
import { useAuth } from "../../../contexts/AuthContext"

export default function AdminSidebar() {
  const { logout, user } = useAuth()

  const navItems = [
    {
      href: "/admin",
      icon: HomeOutlined,
      name: "Inicio",
    },
    {
      href: "/admin/lineas",
      icon: ExperimentOutlined,
      name: "Líneas de Investigación",
    },
    {
      href: "/admin/publicaciones",
      icon: BookOutlined,
      name: "Publicaciones",
    },
    {
      href: "/admin/proyectos",
      icon: BranchesOutlined,
      name: "Proyectos",
    },
    {
      href: "/admin/equipo",
      icon: UserOutlined,
      name: "Equipo",
    },
    {
      href: "/admin/galeria",
      icon: AppstoreOutlined,
      name: "Galería",
    },
  ]

  // Componente de barra de navegación móvil
  // Este componente se muestra solo en pantallas pequeñas (móvil)
  const MobileNavbar = () => (
    <div className="mobile-navbar lg:hidden">
      {/* Patrón de fondo */}
      <div className="mobile-navbar-bg-pattern"></div>
      <div className="mobile-navbar-bg-gradient"></div>

      <div className="mobile-navbar-content">
        {/* Logo */}
        <div className="mobile-navbar-logo">
          <div className="logo-icon">
            <div className="logo-icon-inner"></div>
          </div>
          <h1 className="logo-text">
            ADMIN<span className="logo-text-admin"> Panel</span>
          </h1>
        </div>

        {/* Botón de menú hamburguesa - SOLO PARA MÓVIL */}
        <button
          className="mobile-menu-button"
          aria-label="Abrir menú de navegación"
        >
          <div className="mobile-menu-button-bg"></div>
          <div className="mobile-menu-button-icon">
          </div>
        </button>
      </div>

      {/* Menú desplegable móvil con overlay */}
      {(
        <>
          {/* Overlay para cerrar el menú al hacer clic fuera */}
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />

          <div className="mobile-dropdown">
            <div className="mobile-dropdown-bg"></div>

            <div className="mobile-dropdown-content">
              {/* Items de navegación */}
              {navItems.map((item, index) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `mobile-nav-item ${isActive ? "mobile-nav-item-active" : "mobile-nav-item-inactive"}`
                  }
                  style={{ "--item-index": index }}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && <div className="mobile-nav-item-active-bg"></div>}
                      <item.icon className={`nav-icon ${isActive ? "nav-icon-active" : ""}`} />
                      <span className="nav-text">{item.name}</span>
                    </>
                  )}
                </NavLink>
              ))}

              {/* Información del usuario */}
              {user && (
                <div className="mobile-user-info">
                  <div className="user-info-content">
                    <div className="user-avatar">
                      <User className="user-avatar-icon" />
                    </div>
                    <div className="user-details">
                      <p className="user-name">{user.username || user.email?.split("@")[0] || "Admin"}</p>
                      <p className="user-role">Administrador</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botón de cerrar sesión */}
              <button
                onClick={() => {
                  logout()
                }}
                className="mobile-logout-button"
              >
                <LogOut className="logout-icon" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )

  // Componente de barra lateral para escritorio
  // Este componente se muestra solo en pantallas grandes (desktop)
  const DesktopSidebar = () => (
    <div
      className={`desktop-sidebar hidden lg:flex`}
    >

      {/* Header con botón de colapsar */}
      <div className="desktop-sidebar-header">
        <div className="desktop-sidebar-header-content">
          {/* Información del usuario */}
          {user && (
            <div className="desktop-user-info" title= {user.username} >
              <div
                className="desktop-user-info-content"
              >
                <div className="desktop-user-avatar">
                  <User className="desktop-user-avatar-icon" />
                </div>
                <div className={`desktop-user-details`}>
                  <p className="desktop-user-name">{user.username || user.email?.split("@")[0] || "Admin"}</p>
                  <p className="desktop-user-role">Administrador</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navegación */}
      <nav className="desktop-nav">
        <ul role="list" className="desktop-nav-list">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                className={
                  `desktop-nav-item`
                }
                title={item.name}
              >
                {({ isActive }) => (
                  <>
                    {isActive && <div className="desktop-nav-item-active-bg"></div>}
                    <item.icon className={`desktop-nav-icon ${isActive ? "desktop-nav-icon-active" : ""}`} />
                    <span className={`desktop-nav-text `}>
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sección inferior con logout */}
      <div className="desktop-sidebar-footer">
        <button
          onClick={logout}
          className={`desktop-logout-button `}
          title={ "Cerrar Sesión"}
        >
          <LogOut className="desktop-logout-icon" />
          <span className={`desktop-logout-text `}>
            Cerrar Sesión
          </span>
        </button>
      </div>
    </div>
  )

  /* 
  
  En si se retornan los 2 componenetes MobileNavbar y DesktopSidebar 
  como componentes independientes que se renderizan condicionalmente 
  según el tamaño de pantalla. MobileNavbar se muestra en pantallas 
  pequeñas (móvil) y DesktopSidebar en pantallas grandes (desktop).
  Esto es gracias a las clases dadas en Css.
  
  */

  return (
    <>
      <MobileNavbar />
      <DesktopSidebar />
    </>
  )
}


/* * AdminSidebar Component 

## 1. **Estructura del Sidebar Adaptable**

Primero creé un sistema de estado que controla si el sidebar está expandido o colapsado:

- Usé `useState` para manejar `isExpanded` (true/false)
- Implementé `useEffect` para detectar cambios de tamaño de pantalla
- En móvil (< 1024px) el sidebar se comporta como overlay
- En desktop se mantiene fijo al lado izquierdo


## 2. **Sistema de Clases CSS Dinámicas**

El sidebar cambia sus clases según el estado:

- **Expandido**: `w-[280px]` (280px de ancho)
- **Colapsado**: `w-[80px]` (80px de ancho)
- **Móvil**: `fixed inset-y-0 left-0 z-50` con overlay oscuro


## 3. **Layout Principal Adaptable**

El contenido principal se ajusta automáticamente:

- **Desktop expandido**: `ml-[280px]` (margen izquierdo de 280px)
- **Desktop colapsado**: `ml-[80px]` (margen izquierdo de 80px)
- **Móvil**: `ml-0 pt-16` (sin margen, con padding superior para navbar)


## 4. **Navbar Móvil con Hamburguesa**

Solo aparece en móviles (< 1024px):

- Navbar fijo en la parte superior con `fixed top-0 left-0 right-0`
- Botón hamburguesa que abre un menú desplegable
- Menú con overlay que cubre toda la pantalla
- Se cierra automáticamente al hacer clic fuera o navegar


## 5. **Transiciones Suaves**

Agregué transiciones CSS para todos los cambios:

- `transition-all duration-300 ease-in-out` para el sidebar
- `transition-all duration-300 ease-in-out` para el contenido principal
- Animaciones escalonadas en los elementos del menú móvil


## 6. **Detección Automática de Pantalla**

Implementé un listener que:

- Detecta cuando la pantalla cambia de móvil a desktop
- Cierra automáticamente el sidebar móvil al cambiar a desktop
- Ajusta los estilos según el tamaño actual


*/