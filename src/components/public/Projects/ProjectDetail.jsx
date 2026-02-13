import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { CalendarOutlined, TagOutlined } from "@ant-design/icons";
import { marked } from "marked";
import Loader from "../../common/Loader/Loader";
import { getResearchLineById } from "../../../services";
import "../../../styles/FuturisticStyles.css";
import "./ProjectDetail.css";

const ProyectoDetail = () => {
  const { id } = useParams();
  const [researchLine, setResearchLine] = useState(null);
  const { theme, isDarkTheme } = useTheme();
;
  // Nombre del método de servicios utilizado desde services/index.js
  const RESEARCH_LINE_SERVICE_METHOD = "getResearchLineById";

  useEffect(() => {
    const fetchResearchLine = async () => {
      try {
        const response = await getResearchLineById(id);
        setResearchLine(response.data);
      } catch {
        setResearchLine(null);
      }
    };
    fetchResearchLine();
  }, [id]);

  if (!researchLine) {
    return (
      <div
        className="futuristic-container"
        data-theme={isDarkTheme ? "dark" : "light"}
      >
        <div className="futuristic-loading">
          <Loader />
        </div>
      </div>
    );
  }

  const nombre = researchLine.title || researchLine.nombre || "Proyecto sin nombre";
  const descripcionHTML = marked(
    researchLine.description || researchLine.descripcion || "Sin descripción disponible"
  );
  const estado = researchLine.status || researchLine.estado || "Sin dato";
  const fechaInicio = researchLine.startDate || researchLine.fechaInicio || "Sin dato";
  const fechaFin = researchLine.endDate || researchLine.fechaFin || "Sin dato";
  const lineaExtension =
    researchLine.line ||
    researchLine.linea ||
    researchLine.lineaNombre ||
    researchLine.linea_extension ||
    researchLine.lineaExtension ||
    "Sin línea";

  return (
    <div className="project-detail-bg" data-theme={isDarkTheme ? "dark" : "light"}>
      <div style={{ maxWidth: "950px", margin: "0 auto", padding: "2rem 0" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div className="project-badge-glass">{lineaExtension}</div>
          <h1
            className="project-title-gradient"
            style={{ marginBottom: "1.2rem" }}
          >
            {nombre}
          </h1>
        </div>
        {/* Project Info */}
        <div
          className="futuristic-grid futuristic-grid-3"
          style={{ gap: "2.2rem", marginBottom: "2.5rem" }}
        >
          {/* Card Inicio */}
          <div className="project-info-card">
            <div className="project-info-icon">
              <CalendarOutlined />
            </div>
            <div className="project-info-title">Inicio</div>
            <div className="project-info-value">
              {fechaInicio}
            </div>
          </div>
          {/* Card Finalización */}
          <div className="project-info-card">
            <div className="project-info-icon">
              <CalendarOutlined />
            </div>
            <div className="project-info-title">Finalización</div>
            <div className="project-info-value">
              {fechaFin}
            </div>
          </div>
          {/* Card Estado */}
          <div className="project-info-card">
            <div className="project-info-icon">
              <TagOutlined />
            </div>
            <div className="project-info-title">Estado</div>
            <div className="project-status-pill">{estado}</div>
          </div>
        </div>
        {/* Content */}
        <div style={{ padding: "2.2rem 2rem", marginBottom: 0 }}>
          <div
            className="project-description-text"
            dangerouslySetInnerHTML={{ __html: descripcionHTML }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProyectoDetail;
