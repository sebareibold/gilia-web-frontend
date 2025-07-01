import "./Loader.css"

const Loader = ({ text = "Cargando..." }) => {
  return (
    <div className="loader-container">
      <div className="modern-loader"></div>
      <div className="loader-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p className="loader-text">{text}</p>
    </div>
  )
}

export default Loader
