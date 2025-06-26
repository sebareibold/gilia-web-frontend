"use client"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import "../shared/FuturisticStyles.css"

const PostPagination = ({ pagina, setPagina, totalPaginas }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <button
        disabled={pagina === 1}
        onClick={() => setPagina(pagina - 1)}
        className="futuristic-btn"
        style={{
          opacity: pagina === 1 ? 0.5 : 1,
          cursor: pagina === 1 ? "not-allowed" : "pointer",
        }}
      >
        <LeftOutlined />
        Anterior
      </button>

      <div className="futuristic-badge" style={{ padding: "0.5rem 1rem" }}>
        Página {pagina} de {totalPaginas}
      </div>

      <button
        disabled={pagina === totalPaginas}
        onClick={() => setPagina(pagina + 1)}
        className="futuristic-btn"
        style={{
          opacity: pagina === totalPaginas ? 0.5 : 1,
          cursor: pagina === totalPaginas ? "not-allowed" : "pointer",
        }}
      >
        Siguiente
        <RightOutlined />
      </button>
    </div>
  )
}

export default PostPagination
