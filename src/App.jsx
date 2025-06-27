import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { AuthProvider } from "./contexts/AuthContext"

// Layouts
import PublicLayout from "./layouts/PublicLayout"
import AdminLayout from "./layouts/AdminLayout"

// Public Components (existing)
import HomeContainer from "./components/Home/HomeContainer/HomeContainer"
import AboutUs from "./components/AboutUs/AboutUs"
import LinesDetailContainer from "./components/research_line_Detail/LinesDetailContainer"
import ExtensionLista from "./components/linea_extension/ExtensionLista"
import PostList from "./components/Post/PostList"
import Proyectos from "./components/Proyectos/Proyectos"
import GaleryContainer from "./components/Galery/GaleryContainer/GaleryContainer"
import Objectives from "./components/Objectives/Objectives"

// Admin Components
import AdminLogin from "./components/admin/AdminLogin"
import AdminDashboard from "./components/admin/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"

// Styles
import "./App.css"

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<PublicLayout />}>
                <Route index element={<HomeContainer />} />
                <Route path="about-us" element={<AboutUs />} />
                <Route path="post" element={<PostList />} />
                <Route path="galery" element={<GaleryContainer />} />
                <Route path="lineas-de-investigacion/:id" element={<LinesDetailContainer />} />
                <Route path="linea-extension" element={<ExtensionLista />} />
                <Route path="proyectos" element={<Proyectos />} />
                <Route path="objectives" element={<Objectives />} />
              </Route>

              {/* Admin Login (outside of protected routes) */}
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
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />

                {/* Placeholders for admin components - to be implemented */}
                <Route
                  path="lineas"
                  element={<div className="text-white">Gestión de Líneas de Investigación - Por implementar</div>}
                />
                <Route
                  path="publicaciones"
                  element={<div className="text-white">Gestión de Publicaciones - Por implementar</div>}
                />
                <Route
                  path="proyectos"
                  element={<div className="text-white">Gestión de Proyectos - Por implementar</div>}
                />
                <Route path="equipo" element={<div className="text-white">Gestión de Equipo - Por implementar</div>} />
                <Route
                  path="galeria"
                  element={<div className="text-white">Gestión de Galería - Por implementar</div>}
                />
                <Route
                  path="configuracion"
                  element={<div className="text-white">Configuración - Por implementar</div>}
                />
              </Route>

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
