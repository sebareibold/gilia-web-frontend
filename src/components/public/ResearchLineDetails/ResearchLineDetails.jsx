import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { getResearchLineById } from "../../../services";
import { marked } from "marked";
import SimpleCarousel from "./SimpleCarousel";
import {
  UserOutlined,
  ArrowRightOutlined,
  ShareAltOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "./ResearchLineDetails.css";

const ResearchLineDetails = () => {
  const [researchLine, setResearchLine] = useState(null);
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);
  const { id } = useParams();
  const { theme } = useTheme();
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a";
  // Nombre del método de servicios utilizado desde services/index.js

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getResearchLineById(id);
        const data = response.data || {};
        setResearchLine(data);
        setProjects(data.projects || data.proyectos || []);
        setPublications(data.publications || data.publicaciones || []);
      } catch {
        setResearchLine(null);
      }
    };
    fetchData();
  }, [id]);

  if (!researchLine) {
    return (
      <section
        className="exploration-section h-screen"
        data-theme={isDarkTheme ? "dark" : "light"}
      >
        <div className="exploration-container">
          <div className="carousel-loading">
            <div className="loading-spinner" />
            <span className="loading-text">
              Cargando línea de investigación...
            </span>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("es-AR", {
      year: "numeric",
      month: "short",
    });
  };

  const getProjectStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    if (today < start) return "Futuro";
    if (end && today > end) return "Finalizó";
    return "En curso";
  };

  // Render para cada proyecto
  const renderProyecto = (proyecto) => (
    <div className="news-card flex flex-col h-full justify-start p-6">
      {/* Imagen */}
      <div className="news-image-container mb-4.5">
        <img
          src="/placeholder.svg?height=200&width=350"
          alt={proyecto.title || proyecto.nombre}
          className="news-image"
        />
        <div className="news-image-overlay" />
      </div>

      {/* Seccionde Informacion, nombre, descripcion, fecha inicio, fecha fin, estado */}
      <div className="news-content flex-1 flex flex-col justify-between">
        <h3 className="news-title text-lg font-bold mb-2">{proyecto.name}</h3>
        <p className="news-description text-[0.98rem] text-[#bdbdbd] mb-0">
          {proyecto.description}
        </p>
        <div className="mt-3 text-[0.9rem] text-[#bdbdbd] leading-[1.3]">
          {/* Rango de fechas */}
          <div>
            {formatDate(proyecto.startDate)} —{" "}
            {proyecto.endDate ? formatDate(proyecto.endDate) : "Actualidad"}
          </div>

          {/* Estado */}
          <div className="font-semibold mt-0.5">
            {getProjectStatus(proyecto.startDate, proyecto.endDate)}
          </div>
        </div>
      </div>
    </div>
  );

  // Render para cada publicación
  const renderPublicacion = (pub) => (
    <div className="news-card flex flex-col h-full justify-start p-6 min-w-[380px] max-w-[500px] mx-auto">
      <div className="news-content flex-1 flex flex-col justify-between">
        <div className="news-meta flex items-center justify-between mb-2">
          <span className="news-category bg-[#2196F3] text-white self-start text-xs rounded-lg px-3 py-0.5">
            {pub.type || pub.tipo}
          </span>
          <div className="news-views flex items-center gap-1 bg-[#e3e9f7] text-[#1a237e] rounded-lg px-3 py-0.5 font-bold text-[15px] shadow-sm">
            <CalendarOutlined className="text-base mr-1" />
            <span>{pub.year || pub.anio}</span>
          </div>
        </div>
        <h3 className="news-title text-lg font-bold mb-2">
          {pub.title || pub.titulo}
        </h3>
        <div className="news-meta text-[0.92rem] text-[var(--color-text-secondary)] mb-2 font-medium">
          <div
            dangerouslySetInnerHTML={{ __html: pub.authors || pub.autores }}
          />
        </div>
        {(pub.journal || pub.publicacion) && (
          <div className="text-xs text-[var(--color-text-muted)] mb-2 italic">
            Publicado en: {pub.journal || pub.publicacion}
          </div>
        )}
        <div className="news-description text-[0.98rem] text-[#bdbdbd] mb-0">
          <div
            dangerouslySetInnerHTML={{ __html: pub.summary || pub.resumen }}
          />
        </div>
        <div className="news-actions mt-4.5 flex gap-3 items-center">
          {pub.link || pub.enlace ? (
            <a
              href={pub.link || pub.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="news-btn-primary flex-1 flex items-center justify-center gap-2 font-semibold text-xs"
            >
              <span>Ver publicación</span>
              <ArrowRightOutlined />
            </a>
          ) : (
            <div className="news-btn-primary opacity-50 cursor-not-allowed flex-1 flex items-center justify-center gap-2 font-semibold text-base">
              <span>No disponible</span>
            </div>
          )}
          <button
            className="news-btn-secondary p-2.5 rounded-lg text-lg flex items-center justify-center"
            aria-label="Compartir publicación"
          >
            <ShareAltOutlined />
          </button>
        </div>
      </div>
    </div>
  );

  // Render para cada integrante
  const renderIntegrante = (integrante) => (
    <div className="news-card min-w-[220px] flex flex-col items-center p-6">
      <div className="news-image-container mb-3.5 w-full">
        <img
          src={
            integrante.photo?.[0]?.url ||
            "/placeholder.svg?height=200&width=300"
          }
          alt={`${integrante.full_name || `${integrante.nombre || ""} ${integrante.apellido || ""}`}`}
          className="news-image"
        />
        <div className="news-image-overlay">
          <UserOutlined />
        </div>
      </div>
      <div className="news-content w-full text-center">
        <span className="news-category bg-[#4CAF50] text-white mb-2 text-[0.95rem] rounded-lg px-3 py-0.5 inline-block">
          {integrante.specialty || integrante.especialidad}
        </span>
        <h3 className="news-title text-lg font-bold mb-2">
          {integrante.full_name ||
            `${integrante.nombre || ""} ${integrante.apellido || ""}`}
        </h3>
        <p className="news-description text-[0.98rem] text-[#bdbdbd] mb-0">
          {integrante.workplace ||
            integrante.lugarDeTrabajo ||
            "Miembro del equipo de investigación."}
        </p>
      </div>
    </div>
  );

  return (
    <section
      className="exploration-section min-h-screen"
      data-theme={isDarkTheme ? "dark" : "light"}
    >
      <div className="exploration-container max-w-[1400px] mx-auto">
        {/* Título */}
        <div className="section-header">
          <h2 className="section-title animate-fade-inUp-0-8 ">{researchLine.title}</h2>
        </div>
        {/* Descripción */}
        <div className="carousel-container mb-8 animate-fade-inUp-1  ">
          {researchLine.description}
        </div>

        {/* Proyectos */}
        <div className="multi-card-carousel">
          <div className="carousel-container">
            <h3 className="title-research-line text-center p-6 text-4xl ">
              Proyectos
            </h3>
            {projects.length > 0 ? (
              <SimpleCarousel
                items={projects}
                renderItem={renderProyecto}
                itemsPerPage={3}
              />
            ) : (
              <div className="text-[#aaa] text-center animate-fade-inUp-1">
                No hay proyectos registrados.
              </div>
            )}
          </div>
        </div>

        {/* Publicaciones */}

        <div className="multi-card-carousel">
          <div className="carousel-container">
            <h3 className="title-research-line text-center text-4xl p-6">
              Publicaciones
            </h3>
            {publications.length > 0 ? (
              <SimpleCarousel
                items={publications}
                renderItem={renderPublicacion}
                itemsPerPage={3}
              />
            ) : (
              <div className="text-[#aaa] text-center animate-fade-inUp-1">
                No hay publicaciones registradas.
              </div>
            )}
          </div>
        </div>

        {/* Integrantes */}
        <div className="multi-card-carousel">
          <div className="carousel-container">
            <h3 className="title-research-line text-center text-4xl p-6">
              Integrantes
            </h3>
            <div className="flex flex-wrap gap-8 justify-center">
              {(researchLine.people || researchLine.personas) &&
              (researchLine.people || researchLine.personas).length > 0 ? (
                (researchLine.people || researchLine.personas).map(
                  renderIntegrante
                )
              ) : (
                <div className="text-[#aab] text-center animate-fade-inUp-1">
                  No hay integrantes registrados.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchLineDetails;

/* =================== Notas ===================
   Esta sección documenta la lógica de estilo y animación aplicada.

   - Las animaciones se controlan mediante las clases 
     `animate-fade-inUp-x-y`, donde `x` y `y` representan variantes
     predefinidas con distintos parámetros de duración o desplazamiento.

   - El objetivo es unificar y estandarizar el efecto de aparición,
     logrando una animación más suave, consistente y visualmente limpia.

   - Tambien se puede observar que utilizan las 3 secciones carrusel, el cual es
   un componente implementado en simpleCorusel.
*/