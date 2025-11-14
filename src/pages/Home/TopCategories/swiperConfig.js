import { Navigation, Mousewheel } from "swiper/modules";

export const swiperConfig = {
  style: { "--swiper-navigation-size": "rem" },

  // Base = Desktop
  slidesPerView: 4,
  spaceBetween: 20,

  // "Shrink down" overrides for smaller screens
  breakpoints: {
    1024: { slidesPerView: 4, spaceBetween: 20 }, // ≥1200px = full desktop
    768: { slidesPerView: 3, spaceBetween: 20 }, // laptops
    576: { slidesPerView: 2, spaceBetween: 20 }, // large phones
    0: { slidesPerView: 1, spaceBetween: 20 }, // small phones
  },

  navigation: true,
  modules: [Navigation, Mousewheel],
};
