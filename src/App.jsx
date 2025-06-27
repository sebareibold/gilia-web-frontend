"use client"

import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useTheme } from "./contexts/ThemeContext"
import { AuthProvider } from "./contexts/AuthContext"

// Layouts
import PublicLayout from "./layouts/PublicLayout"
import AdminLayout from "./layouts/AdminLayout"

// Componentes públicos (existentes)
import AboutUs from "./components/AboutUs/AboutUs"
import HomeContainer from "./components/Home/HomeContainer/HomeContainer"
import LinesDetailContainer from "./components/research_line_Detail/LinesDetailContainer"
import ResearchLinesContainer from "./components/research_line_Detail/LinesDetailContainer"
import PostsList from "./components/Post/PostList"
import ExtensionList from "./components/linea_extension/ExtensionLista"
import ExtensionDetails from "./components/linea_extension/ExtensionDetails"
import Galery from "./components/Galery/GaleryContainer/GaleryContainer"
import ProyectoDetail from "./components/Proyectos/Proyectos"

// Componentes de administración
import AdminLogin from "./components/admin/AdminLogin"
import AdminDashboard from "./components/admin/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"

import "./App.css"

function App() {
  const { theme } = useTheme()

  useEffect(() => {
    Object.entries(theme.token).forEach(([key, value]) => {
      document.body.style.setProperty(`--${key}`, value)
    })
    document.body.style.overflowX = "hidden"
  }, [theme])

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route
            path="/"
            element={
              <PublicLayout>
                <HomeContainer />
              </PublicLayout>
            }
          />

          <Route
            path="/lineas-de-investigacion"
            element={
              <PublicLayout>
                <ResearchLinesContainer />
              </PublicLayout>
            }
          />

          <Route
            path="/lineas-de-investigacion/:id"
            element={
              <PublicLayout>
                <LinesDetailContainer />
              </PublicLayout>
            }
          />

          <Route
            path="/post"
            element={
              <PublicLayout>
                <PostsList />
              </PublicLayout>
            }
          />

          <Route
            path="/linea-extension"
            element={
              <PublicLayout>
                <ExtensionList />
              </PublicLayout>
            }
          />

          <Route
            path="/linea-extension/:id"
            element={
              <PublicLayout>
                <ExtensionDetails />
              </PublicLayout>
            }
          />

          <Route
            path="/about-us"
            element={
              <PublicLayout>
                <AboutUs />
              </PublicLayout>
            }
          />

          <Route
            path="/galery"
            element={
              <PublicLayout>
                <Galery />
              </PublicLayout>
            }
          />

          <Route
            path="/proyecto/:id"
            element={
              <PublicLayout>
                <ProyectoDetail />
              </PublicLayout>
            }
          />

          {/* Rutas de administración */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Placeholder para otras rutas de admin */}
          <Route
            path="/admin/research-lines"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <div className="admin-card">
                    <h2>Gestión de Líneas de Investigación</h2>
                    <p>Aquí se implementará la gestión de líneas de investigación.</p>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/posts"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <div className="admin-card">
                    <h2>Gestión de Publicaciones</h2>
                    <p>Aquí se implementará la gestión de publicaciones.</p>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/extensions"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <div className="admin-card">
                    <h2>Gestión de Extensión</h2>
                    <p>Aquí se implementará la gestión de proyectos de extensión.</p>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/team"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <div className="admin-card">
                    <h2>Gestión del Equipo</h2>
                    <p>Aquí se implementará la gestión del equipo.</p>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <div className="admin-card">
                    <h2>Gestión de Galería</h2>
                    <p>Aquí se implementará la gestión de la galería.</p>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <div className="admin-card">
                    <h2>Configuración</h2>
                    <p>Aquí se implementará la configuración del sistema.</p>
                  </div>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* Redirección por defecto para rutas de admin */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

          {/* Ruta 404 */}
          <Route
            path="*"
            element={
              <PublicLayout>
                <div style={{ textAlign: "center", padding: "50px" }}>
                  <h1>404 - Página no encontrada</h1>
                  <p>La página que buscas no existe.</p>
                </div>
              </PublicLayout>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
