import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ThemeProvider } from "./contexts/ThemeContext"
import PublicLayout from "./layouts/PublicLayout"
import AdminLayout from "./layouts/AdminLayout"
import ProtectedRoute from "./components/common/ProtectedRoute"
import { useEffect, lazy, Suspense } from "react"
import { useLocation } from "react-router-dom"

// Public Components
import HomeContainer from "./components/public/Home/HomeContainer/HomeContainer"
import AboutUs from "./components/public/AboutUs/AboutUs"
import GalleryContainer from "./components/public/Gallery/GalleryContainer/GalleryContainer"
import PostList from "./components/public/Publications/PostList"
import Projects from "./components/public/Projects/Projects"
import ExtensionList from "./components/public/extension/ExtensionList"
import ResearchLineDetails from "./components/public/ResearchLineDetails/ResearchLineDetails"
import ExtensionDetails from "./components/public/extension/ExtensionDetails"
import ProjectDetail from "./components/public/Projects/ProjectDetail"

// Admin Components 
const AdminLogin = lazy(() => import("./components/admin/AdminLogin/AdminLogin"))
const AdminHome = lazy(() => import("./components/admin/AdminHome/AdminHome"))
const AdminResearchLines = lazy(() => import("./components/admin/AdminResearchLines/AdminResearchLines"))
const AdminPublications = lazy(() => import("./components/admin/AdminPublications/AdminPublications"))
const AdminProjects = lazy(() => import("./components/admin/AdminProjects/AdminProjects"))
const AdminTeam = lazy(() => import("./components/admin/AdminTeam/AdminTeam"))
const AdminGallery = lazy(() => import("./components/admin/AdminGallery/AdminGallery"))
const AdminSettings = lazy(() => import("./components/admin/AdminSettings/AdminSettings"))
const AdminExtensionLines = lazy(() => import("./components/admin/AdminExtensionLines/AdminExtensionLines"))

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
          <Suspense fallback={<div />}> 
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<HomeContainer />} />
              <Route path="about" element={<AboutUs />} />
              <Route path="gallery" element={<GalleryContainer />} />
              <Route path="posts" element={<PostList />} />
              <Route path="projects" element={<Projects />} />
              <Route path="projects/:id" element={<ProjectDetail />} />
              <Route path="research-lines" element={<ExtensionList />} />
              <Route path="research-lines/:id" element={<ResearchLineDetails />} />
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
                            <Route path="lineas" element={<AdminResearchLines />} />
              <Route path="lineas-extension" element={<AdminExtensionLines />} />
              <Route path="publicaciones" element={<AdminPublications />} />
              <Route path="proyectos" element={<AdminProjects />} />
              <Route path="equipo" element={<AdminTeam />} />
              <Route path="galeria" element={<AdminGallery />} />
              <Route path="configuracion" element={<AdminSettings />} />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
