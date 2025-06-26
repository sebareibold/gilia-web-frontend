"use client"

import { useEffect, useState } from "react"
import { useTheme } from "../../context/ThemeContext"
import { BookOutlined, FilterOutlined, SearchOutlined } from "@ant-design/icons"
import { API_BASE_URL } from "../../config/apiConfig"
import PostItem from "./PostItem"
import PostFilter from "./PostFilter"
import PostPagination from "./PostPagination"
import Loader from "../Loader/Loader"
import { useLocation } from "react-router-dom"
import "../shared/FuturisticStyles.css"

const PostList = () => {
  const { state } = useLocation()
  const linea = state?.linea || ""
  const [publicaciones, setPublicaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagina, setPagina] = useState(1)
  const [filtro, setFiltro] = useState({ anio: "", tipo: "", linea: linea })
  const [totalPaginas, setTotalPaginas] = useState(1)
  const { theme } = useTheme()
  const isDarkTheme = theme.token.backgroundColor === "#0a0a0a"

  useEffect(() => {
    const fetchPublicaciones = async () => {
      setLoading(true)
      try {
        const queryParams = {
          "pagination[page]": pagina,
          "pagination[pageSize]": 10,
          sort: "createdAt:desc",
        }

        if (filtro.anio) {
          queryParams["filters[anio][$eq]"] = filtro.anio
        }
        if (filtro.tipo) {
          queryParams["filters[tipo][$eq]"] = filtro.tipo
        }
        if (filtro.linea) {
          console.log("Filtrando por línea:", filtro.linea)
          queryParams["filters[linea_investigacions][nombre][$containsi]"] = filtro.linea
        }

        const query = new URLSearchParams(queryParams).toString()
        const response = await fetch(`${API_BASE_URL}/api/publicacions?${query}`)
        const data = await response.json()

        setPublicaciones(data.data || [])
        setTotalPaginas(data.meta?.pagination?.pageCount || 1)
      } catch (err) {
        console.error("Error fetching publicaciones:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPublicaciones()
  }, [pagina, filtro])

  return (
    <div className="futuristic-container" data-theme={isDarkTheme ? "dark" : "light"}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div className="futuristic-card" style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div className="futuristic-badge" style={{ marginBottom: "1rem" }}>
            <BookOutlined style={{ marginRight: "0.5rem" }} />
            Investigación Académica
          </div>

          <h1 className="futuristic-title">Publicaciones</h1>

          <p className="futuristic-subtitle">
            Explora nuestras investigaciones, artículos y contribuciones académicas en el campo de la inteligencia
            artificial y procesamiento de lenguaje natural.
          </p>
        </div>

        {/* Filters */}
        <div className="futuristic-card" style={{ marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "var(--colorTextBase)",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FilterOutlined />
            Filtros de Búsqueda
          </h2>
          <PostFilter filtro={filtro} setFiltro={setFiltro} setPagina={setPagina} />
        </div>

        {/* Content */}
        {loading ? (
          <div className="futuristic-loading">
            <Loader />
            <h3 style={{ color: "var(--colorTextBase)", marginTop: "1rem" }}>Cargando publicaciones...</h3>
            <p style={{ color: "var(--colorTextSecondary)" }}>Por favor espera mientras obtenemos los datos.</p>
          </div>
        ) : publicaciones.length === 0 ? (
          <div className="futuristic-card" style={{ textAlign: "center", padding: "3rem" }}>
            <SearchOutlined style={{ fontSize: "3rem", color: "var(--colorTextSecondary)", marginBottom: "1rem" }} />
            <h3 style={{ color: "var(--colorTextBase)", marginBottom: "0.5rem" }}>No hay publicaciones</h3>
            <p style={{ color: "var(--colorTextSecondary)" }}>
              No se encontraron publicaciones con los filtros aplicados.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {publicaciones.map((pub) => (
              <PostItem key={pub.id} publicacion={pub} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPaginas > 1 && (
          <div className="futuristic-card" style={{ marginTop: "2rem" }}>
            <PostPagination pagina={pagina} setPagina={setPagina} totalPaginas={totalPaginas} />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostList
