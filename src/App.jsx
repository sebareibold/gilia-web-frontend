import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import PublicLayout from "./layouts/PublicLayout/PublicLayout";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import ProtectedRoute from "./components/common/ProtectedRouter/ProtectedRoute";
import LanguageWrapper from "./components/common/LanguageWrapper/LanguageWrapper";
import { useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";

// Componentes publicos
import HomeContainer from "./components/public/Home/HomeContainer/HomeContainer";
import AboutUs from "./components/public/AboutUs/AboutUs";
import GalleryContainer from "./components/public/Gallery/GalleryContainer/GalleryContainer";
import PostList from "./components/public/Publications/PostList";
import Projects from "./components/public/Projects/Projects";
import ExtensionList from "./components/public/extension/ExtensionList";
import ResearchLineDetails from "./components/public/ResearchLineDetails/ResearchLineDetails";
import ExtensionDetails from "./components/public/extension/ExtensionDetails";
import ProjectDetail from "./components/public/Projects/ProjectDetail";

// Componentes admin (lazy loading)
const AdminLogin = lazy(
  () => import("./components/admin/AdminLogin/AdminLogin")
);
const AdminHome = lazy(() => import("./components/admin/AdminHome/AdminHome"));
const AdminResearchLines = lazy(
  () => import("./components/admin/AdminResearchLines/AdminResearchLines")
);
const AdminPublications = lazy(
  () => import("./components/admin/AdminPublications/AdminPublications")
);
const AdminProjects = lazy(
  () => import("./components/admin/AdminProjects/AdminProjects")
);
const AdminTeam = lazy(() => import("./components/admin/AdminTeam/AdminTeam"));
const AdminGallery = lazy(
  () => import("./components/admin/AdminGallery/AdminGallery")
);
const AdminStaticContent = lazy(
  () => import("./components/admin/AdminStaticContent/AdminStaticContent")
);
const AdminExtensionLines = lazy(
  () => import("./components/admin/AdminExtensionLines/AdminExtensionLines")
);
const AdminNews = lazy(
  () => import("./components/admin/AdminNews/AdminNews")
);
const AdminUsers = lazy(
  () => import("./components/admin/AdminUsers/AdminUsers")
);

import "./App.css";

// Componente para scroll al inicio al cambiar de pagina
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * Componente para redirigir la raiz "/" al idioma guardado.
 * Si el usuario tiene un idioma guardado en localStorage, redirige a /:lang/
 * Si no, redirige a /es/ por defecto
 */
function RedirectToLanguage() {
  const savedLang = localStorage.getItem('language') || 'es';
  return <Navigate to={`/${savedLang}/`} replace />;
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<div />}>
            <Routes>
              {/* Redireccion raiz al idioma guardado */}
              <Route path="/" element={<RedirectToLanguage />} />

              {/* Rutas publicas con prefijo de idioma /:lang/ */}
              <Route path="/:lang" element={<LanguageWrapper />}>
                <Route element={<PublicLayout />}>
                  <Route index element={<HomeContainer />} />
                  <Route path="about" element={<AboutUs />} />
                  <Route path="gallery" element={<GalleryContainer />} />
                  <Route path="posts" element={<PostList />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/:id" element={<ProjectDetail />} />
                  <Route path="extentions-lines" element={<ExtensionList />} />
                  <Route
                    path="research-lines/:id"
                    element={<ResearchLineDetails />}
                  />
                  <Route
                    path="extentions-lines/:id"
                    element={<ExtensionDetails />}
                  />
                </Route>
              </Route>

              {/* Login admin (sin prefijo de idioma) */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Rutas admin protegidas */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminHome />} />
                <Route path="lines" element={<AdminResearchLines />} />
                <Route
                  path="extentions-lines"
                  element={<AdminExtensionLines />}
                />
                <Route path="posts" element={<AdminPublications />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="team" element={<AdminTeam />} />
                <Route path="gallery" element={<AdminGallery />} />
                <Route path="news" element={<AdminNews />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="content" element={<AdminStaticContent />} />
              </Route>

              {/* Ruta catch-all: redirige a raiz */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
