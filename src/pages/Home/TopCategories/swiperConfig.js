import { Navigation, Mousewheel } from "swiper/modules";

export const swiperConfig = {
  style: { "--swiper-navigation-size": "2rem" },

  // Base = Desktop
  slidesPerView: 5,
  spaceBetween: 25,

  // "Shrink down" overrides for smaller screens
  breakpoints: {
    1200: { slidesPerView: 5, spaceBetween: 25 }, // ≥1200px = full desktop
    992: { slidesPerView: 4, spaceBetween: 20 }, // laptops
    768: { slidesPerView: 3, spaceBetween: 15 }, // tablets
    576: { slidesPerView: 2, spaceBetween: 10 }, // large phones
    0: { slidesPerView: 1, spaceBetween: 8 }, // small phones
  },

  navigation: true,
  modules: [Navigation, Mousewheel],
};
