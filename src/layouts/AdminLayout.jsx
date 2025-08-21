import { Outlet } from "react-router-dom"
import { Suspense, useState, useCallback, useEffect } from "react"
import AdminSidebar from "../components/admin/AdminSideBar/AdminSideBar"
import "../styles/admin-theme.css"

const AdminPageSkeleton = () => (
  <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-pulse">
    {/* Header skeleton */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <div className="h-6 sm:h-8 bg-gray-700/50 rounded-lg w-48 sm:w-64 mb-2"></div>
        <div className="h-3 sm:h-4 bg-gray-700/30 rounded w-64 sm:w-96"></div>
      </div>
    </div>

    {/* Content skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4 sm:p-6">
          <div className="flex items-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700/50 rounded-xl mr-3 sm:mr-4"></div>
            <div className="flex-1">
              <div className="h-4 sm:h-6 bg-gray-700/50 rounded w-12 sm:w-16 mb-2"></div>
              <div className="h-3 sm:h-4 bg-gray-700/30 rounded w-16 sm:w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Large content skeleton */}
    <div className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4 sm:p-6">
      <div className="h-4 sm:h-6 bg-gray-700/50 rounded w-32 sm:w-48 mb-4"></div>
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 sm:h-16 bg-gray-700/30 rounded-lg"></div>
        ))}
      </div>
    </div>
  </div>
)

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024 // lg breakpoint
      setIsMobile(mobile)

      // Cerrar sidebar móvil automáticamente cuando se cambia a desktop
      if (!mobile && isSidebarOpen) {
        setIsSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [isSidebarOpen])

  // Función para manejar el toggle de la sidebar en móvil
  const handleSidebarToggle = useCallback((isOpen) => {
    setIsSidebarOpen(isOpen)
    console.log("Sidebar móvil toggled:", isOpen)
  }, [])

  // Función para manejar el colapso de la sidebar en desktop
  const handleSidebarCollapse = useCallback((isCollapsed) => {
    setIsSidebarCollapsed(isCollapsed)
    console.log("Sidebar desktop collapsed:", isCollapsed)
  }, [])

  // Funciones para calcular márgenes y paddings dinámicos
  const getMainContentMargin = () => {
    if (isMobile) {
      return "0px" // Sin margen en móvil
    }
    return isSidebarCollapsed ? "80px" : "280px" // Margen dinámico en desktop
  }

  // Función para calcular el padding del contenido principal
  const getMainContentPadding = () => {
    if (isMobile) {
      return "1rem" // Padding reducido en móvil
    }
    return isSidebarCollapsed ? "2rem 3rem" : "2rem 1.5rem" // Padding adaptativo en desktop
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Componente SideBar la Navegacion*/}
      <AdminSidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={handleSidebarToggle}
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={handleSidebarCollapse}
      />

      <div
        className="transition-all duration-300 ease-in-out"
        style={{
          marginLeft: getMainContentMargin(),
          paddingTop: isMobile ? "80px" : "0px", // Espacio para navbar móvil
        }}
      >
        <main
          className="transition-all duration-300 ease-in-out min-h-screen"
          style={{
            padding: getMainContentPadding(),
            width: isMobile ? "100%" : `calc(100vw - ${getMainContentMargin()})`,
            maxWidth: "100%",
            overflow: "hidden",
          }}
        >
          <div
            className="transition-all duration-300 ease-in-out w-full"
            style={{
              maxWidth: isSidebarCollapsed && !isMobile ? "1400px" : "1200px",
              margin: "0 auto",
            }}
          > 

            <Suspense fallback={<AdminPageSkeleton />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout


/*   

================= COMENTARIOS =================

Este componente AdminLayout maneja la estructura principal
del layout de administración, puntualmente utiliza un sidebar
para la navegación y un sistema de responsive design para
adaptarse a diferentes tamaños de pantalla. Incluye un
skeleton de carga para mejorar la experiencia del usuario
mientras se cargan los contenidos.

El componente nuevo es "AdminPageSkeleton", que proporciona
un esqueleto de carga visualmente atractivo y funcional
para las páginas de administración, mejorando la UX durante
la carga de datos. Es responsible de calcular márgenes y paddings
dinámicos según el estado del sidebar y el tamaño de pantalla,
asegurando una experiencia fluida tanto en dispositivos móviles
como en desktop. Tambien sirve para la carga asincronica de contenido 
de los hijos.


 */