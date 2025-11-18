import PropTypes from "prop-types";
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// Este componente es un carrusel se utiliza en lineas de investigacion
export default function SimpleCarousel({
  items,
  renderItem,
  itemsPerPage = 3,
}) {
  const [start, setStart] = useState(0);
  const canPrev = start > 0;
  const canNext = start + itemsPerPage < items.length;

  // Handlers para avanzar y retroceder en el carrusel
  const handlePrev = () => {
    if (canPrev) setStart(start - itemsPerPage);
  };
  const handleNext = () => {
    if (canNext) setStart(start + itemsPerPage);
  };

  const visibleItems = items.slice(start, start + itemsPerPage);

  return (
    <div className="w-full">
      {/* Contenido del carrusel (Cards)*/}
      <div className="flex justify-center gap-8 items-stretch">
        {visibleItems.map((item, idx) => (
          <div key={item.id || idx} className="flex-1 min-w-0">
            {renderItem(item)}
          </div>
        ))}
      </div>

      {/* Controles de navegación del carrusel (botones Anterior / Siguiente) */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={handlePrev}
          disabled={!canPrev}
          className={`carousel-nav-btn ${
            canPrev ? "opacity-100 cursor-pointer" : "opacity-30 cursor-not-allowed"
          }`}
          aria-label="Anterior"
        >
          <LeftOutlined />
        </button>

        <button
          onClick={handleNext}
          disabled={!canNext}
          className={`carousel-nav-btn ${
            canNext ? "opacity-100 cursor-pointer" : "opacity-30 cursor-not-allowed"
          }`}
          aria-label="Siguiente"
        >
          <RightOutlined />
        </button>
      </div>
    </div>
  );
}

SimpleCarousel.propTypes = {
  items: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
};
