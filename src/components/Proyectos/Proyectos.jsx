"use client"

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useTheme } from "../../contexts/ThemeContext"
import { ProjectOutlined, CalendarOutlined, TeamOutlined, TagOutlined } from "@ant-design/icons"
import { API_BASE_URL } from "../../config/apiConfig"
import { marked } from "marked"
import Loader from "../Loader/Loader"
import "../shared/FuturisticStyles.css"

const ProyectoDetail = () => {
  const { id } = useParams()
  const [proyecto, setProyecto] = useState(null)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/proyectos/${id}`)
        const data = await response.json()
        setProyecto(data.proyecto)
      } catch (error) {
        console.error("Error al obtener el proyecto:", error)
        // Mock data para demostración
        setProyecto({
          id: Number.parseInt(id),
          nombre: "Sistema de Análisis de Sentimientos en Redes Sociales",
          descripcion: `# Sistema de Análisis de Sentimientos en Redes Sociales

## Resumen del Proyecto

Este proyecto tiene como objetivo **desarrollar un sistema inteligente** capaz de analizar la polaridad emocional en publicaciones de redes sociales utilizando técnicas avanzadas de procesamiento de lenguaje natural y aprendizaje automático.

## Objetivos Específicos

### Objetivo Principal
Crear una herramienta que permita a organizaciones y empresas comprender mejor la percepción pública sobre sus productos, servicios o campañas a través del análisis automatizado de sentimientos en redes sociales.

### Objetivos Secundarios
- **Desarrollar algoritmos** de clasificación de sentimientos con alta precisión
- **Implementar técnicas** de preprocesamiento de texto en español
- **Crear una interfaz** web intuitiva para visualización de resultados
- **Evaluar el rendimiento** del sistema con datasets reales

## Metodología

### Fase 1: Recolección de Datos
- Extracción de datos de Twitter, Facebook e Instagram
- Creación de datasets etiquetados manualmente
- Preprocesamiento y limpieza de datos

### Fase 2: Desarrollo del Modelo
- Implementación de modelos de machine learning (SVM, Random Forest, LSTM)
- Entrenamiento y validación cruzada
- Optimización de hiperparámetros

### Fase 3: Desarrollo de la Aplicación
- Diseño de arquitectura del sistema
- Desarrollo del backend con Python/Django
- Creación de interfaz web con React
- Implementación de APIs REST

### Fase 4: Evaluación y Despliegue
- Pruebas de rendimiento y escalabilidad
- Validación con usuarios finales
- Despliegue en producción

## Tecnologías Utilizadas

- **Lenguajes**: Python, JavaScript, HTML/CSS
- **Frameworks**: Django, React, TensorFlow, scikit-learn
- **Bases de datos**: PostgreSQL, Redis
- **APIs**: Twitter API, Facebook Graph API
- **Herramientas**: Docker, Git, Jupyter Notebooks

## Resultados Esperados

El sistema desarrollado permitirá:

1. **Análisis en tiempo real** de sentimientos en publicaciones
2. **Generación de reportes** detallados con métricas y visualizaciones
3. **Detección de tendencias** y patrones emocionales
4. **Alertas automáticas** para contenido con alta carga emocional negativa

## Impacto y Aplicaciones

Este proyecto tiene aplicaciones en múltiples sectores:

- **Marketing digital**: Monitoreo de campañas publicitarias
- **Atención al cliente**: Detección temprana de problemas
- **Investigación social**: Análisis de opinión pública
- **Política**: Seguimiento de percepción ciudadana

## Equipo de Trabajo

- **Director**: Dr. María García (Procesamiento de Lenguaje Natural)
- **Investigador Principal**: Lic. Juan Pérez (Machine Learning)
- **Desarrollador**: Ing. Ana López (Desarrollo Web)
- **Becario**: Carlos Rodríguez (Análisis de Datos)

## Cronograma

- **Inicio**: Marzo 2024
- **Duración**: 18 meses
- **Finalización estimada**: Agosto 2025

## Financiamiento

Proyecto financiado por:
- Universidad Nacional (60%)
- CONICET (30%)
- Empresa colaboradora (10%)`,
          fechaInicio: "2024-03-01",
          fechaFin: "2025-08-31",
          estado: "En Progreso",
          responsable: "Dr. María García",
          linea_investigacion: "Procesamiento de Lenguaje Natural",
        })
      }
    }

    fetchProyecto()
  }, [id])

  if (!proyecto) {
    return (
      <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
        <div className="futuristic-loading">
          <Loader />
        </div>
      </div>
    )
  }

  const descripcionHTML = marked(proyecto.descripcion || "")

  return (
    <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div className="futuristic-card" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="futuristic-badge" style={{ marginBottom: "1rem" }}>
            <ProjectOutlined style={{ marginRight: "0.5rem" }} />
            Proyecto de Investigación
          </div>

          <h1 className="futuristic-title">{proyecto.nombre}</h1>
        </div>

        {/* Project Info */}
        <div className="futuristic-card" style={{ marginBottom: "2rem" }}>
          <div className="futuristic-grid futuristic-grid-4">
            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <CalendarOutlined
                style={{ fontSize: "1.5rem", color: "var(--colorTextSecondary)", marginBottom: "0.5rem" }}
              />
              <div style={{ fontSize: "0.9rem", color: "var(--colorTextBase)", fontWeight: "600" }}>Inicio</div>
              <div style={{ fontSize: "0.8rem", color: "var(--colorTextSecondary)" }}>
                {proyecto.fechaInicio || "Marzo 2024"}
              </div>
            </div>

            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <CalendarOutlined
                style={{ fontSize: "1.5rem", color: "var(--colorTextSecondary)", marginBottom: "0.5rem" }}
              />
              <div style={{ fontSize: "0.9rem", color: "var(--colorTextBase)", fontWeight: "600" }}>Finalización</div>
              <div style={{ fontSize: "0.8rem", color: "var(--colorTextSecondary)" }}>
                {proyecto.fechaFin || "Agosto 2025"}
              </div>
            </div>

            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <TeamOutlined
                style={{ fontSize: "1.5rem", color: "var(--colorTextSecondary)", marginBottom: "0.5rem" }}
              />
              <div style={{ fontSize: "0.9rem", color: "var(--colorTextBase)", fontWeight: "600" }}>Responsable</div>
              <div style={{ fontSize: "0.8rem", color: "var(--colorTextSecondary)" }}>
                {proyecto.responsable || "Dr. María García"}
              </div>
            </div>

            <div className="futuristic-list-item" style={{ textAlign: "center" }}>
              <TagOutlined style={{ fontSize: "1.5rem", color: "var(--colorTextSecondary)", marginBottom: "0.5rem" }} />
              <div style={{ fontSize: "0.9rem", color: "var(--colorTextBase)", fontWeight: "600" }}>Estado</div>
              <div className="futuristic-badge" style={{ fontSize: "0.65rem" }}>
                {proyecto.estado || "En Progreso"}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="futuristic-card">
          <div
            style={{
              fontSize: "1rem",
              lineHeight: "1.7",
              color: "var(--colorTextSecondary)",
            }}
            dangerouslySetInnerHTML={{ __html: descripcionHTML }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProyectoDetail
