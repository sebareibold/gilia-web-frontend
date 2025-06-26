import React from "react";
import { API_BASE_URL } from "../../../config/apiConfig";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Mousewheel,
  Keyboard,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const SeccionGalery = ({ section }) => {
  return (
    <div key={section.id} className="mb-12">
      <h2 className="text-2xl font-bold text-center mb-[2%]">
        {section.titulo}
      </h2>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 1000,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        mousewheel
        keyboard
        modules={[
          EffectCoverflow,
          Pagination,
          Navigation,
          Mousewheel,
          Keyboard,
        ]}
        className="pb-12 pt-4"
      >
        {section.imagenes.map((img, idx) => (
          <SwiperSlide
            key={idx}
            style={{
              border: "none",
              boxShadow: "none",
            }}
            className="!w-auto !h-[60vh] flex items-center justify-center custom-swiper-slide"
          >
            <div className="flex items-center justify-center h-full">
              <img
                src={`${API_BASE_URL}${img.url}`}
                alt={img.descripcion || `Imagen ${idx + 1}`}
                className="max-w-[80vw] max-h-[90%] w-auto h-auto object-contain rounded-2xl shadow-lg"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SeccionGalery;
