
import PropTypes from "prop-types"
import { ArrowRightOutlined, UserOutlined } from "@ant-design/icons"
import "./Card.css"

const Card = ({ titulo, descripcion, autor, link, activa, onClick }) => {
  return (
    <div className={`research-card ${activa ? "active" : ""}`} onClick={onClick}>
      <div className="card-header">
        <h3 className="card-title">{titulo}</h3>
        <p className="card-subtitle">Línea de Investigación</p>
      </div>

      <p className="card-description">{descripcion}</p>

      <div className="card-footer">
        <a href={link} className="card-btn" onClick={(e) => e.stopPropagation()}>
          Ver más
          <ArrowRightOutlined />
        </a>

        <div className="card-meta">
          <UserOutlined />
          <span>{autor}</span>
        </div>
      </div>
    </div>
  )
}

Card.propTypes = {
  titulo: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  autor: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  activa: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Card
