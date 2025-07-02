import PropTypes from "prop-types"
import { useState } from "react"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

export default function SimpleCarousel({ items, renderItem, itemsPerPage = 3 }) {
  const [start, setStart] = useState(0)
  const canPrev = start > 0
  const canNext = start + itemsPerPage < items.length

  const handlePrev = () => {
    if (canPrev) setStart(start - itemsPerPage)
  }
  const handleNext = () => {
    if (canNext) setStart(start + itemsPerPage)
  }

  const visibleItems = items.slice(start, start + itemsPerPage)

  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", alignItems: "stretch" }}>
        {visibleItems.map((item, idx) => (
          <div key={item.id || idx} style={{ flex: 1, minWidth: 0 }}>
            {renderItem(item)}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
        <button
          onClick={handlePrev}
          disabled={!canPrev}
          className="carousel-nav-btn"
          style={{ opacity: canPrev ? 1 : 0.3, cursor: canPrev ? "pointer" : "not-allowed" }}
          aria-label="Anterior"
        >
          <LeftOutlined />
        </button>
        <button
          onClick={handleNext}
          disabled={!canNext}
          className="carousel-nav-btn"
          style={{ opacity: canNext ? 1 : 0.3, cursor: canNext ? "pointer" : "not-allowed" }}
          aria-label="Siguiente"
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  )
}

SimpleCarousel.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
} 