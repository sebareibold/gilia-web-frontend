import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import PublicLayout from "./layouts/PublicLayout"
import AdminLayout from "./layouts/AdminLayout"
import ProtectedRoute from "./components/ProtectedRoute"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

// Public Components
import HomeContainer from "./components/public/Home/ContenedorHome/HomeContainer"
import Nosotros from "./components/public/Nosotros/Nosotros"
import GaleryContainer from "./components/public/Galeria/ContenedorGaleria/ContenedorGaleria"
import PostList from "./components/public/Publicaciones/PostList"
import Proyectos from "./components/public/Proyectos/Proyectos"
import ExtensionLista from "./components/public/linea_extension/ExtensionLista"
import LinesDetailContainer from "./components/public/DetallesLineaDeInvestigación/DetallesLineaDeInvestigación"
import ExtensionDetails from "./components/public/linea_extension/ExtensionDetails"

// Admin Components
import AdminLogin from "./components/admin/AdminLogin/AdminLogin"
import AdminHome from "./components/admin/AdminHome/AdminHome"
import LineasInvestigacion from "./components/admin/AdminLineasInvestigacion/AdminLineasInvestigacion"
import Publicaciones from "./components/admin/AdminPublicaciones/AdminPublicaciones"
import ProyectosAdmin from "./components/admin/AdminProyectos/AdminProyectos"
import Equipo from "./components/admin/AdminEquipo/AdminEquipo"
import Galeria from "./components/admin/AdminGaleria/AdminGaleria"
import Configuracion from "./components/admin/AdminConfiguracion/AdminConfiguracion"

import "./App.css"

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomeContainer />} />
              <Route path="about" element={<Nosotros />} />
              <Route path="gallery" element={<GaleryContainer />} />
              <Route path="posts" element={<PostList />} />
              <Route path="projects" element={<Proyectos />} />
              <Route path="research-lines" element={<ExtensionLista />} />
              <Route path="research-lines/:id" element={<LinesDetailContainer />} />
              <Route path="extension/:id" element={<ExtensionDetails />} />
            </Route>

            {/* Admin Login */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="lineas" element={<LineasInvestigacion />} />
              <Route path="publicaciones" element={<Publicaciones />} />
              <Route path="proyectos" element={<ProyectosAdmin />} />
              <Route path="equipo" element={<Equipo />} />
              <Route path="galeria" element={<Galeria />} />
              <Route path="configuracion" element={<Configuracion />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
