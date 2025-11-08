import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./Swiper.module.scss";
import {
  Navigation,
  Keyboard,
  Autoplay,
  EffectFade,
  Pagination,
} from "swiper/modules";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroSwiper = memo(() => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("/data/db.json")
      .then((res) => res.json())
      .then((data) => setSlides(data.swiper));
    // .catch((err) => console.error("Error loading slides:", err));
  }, []);

  return (
    <section className={styles.sectionHero}>
      <Swiper
        slidesPerView={1}
        loop={true}
        effect="fade" // Enable fade effect
        fadeEffect={{ crossFade: true }} // Smooth cross-fade
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        pagination={true}
        keyboard={true}
        modules={[Navigation, Pagination, Keyboard, Autoplay, EffectFade]}
        className={styles.swiper}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={` ${styles.section} ${styles.first}`}>
              {slide.image && (
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={styles.slide1}
                />
              )}
              {slide.description && (
                <p className={styles.secondary}>{slide.description}</p>
              )}
              <h3 className={styles.primary}>
                {slide.title.split("<br />").map((line, idx) => (
                  <span key={idx} className={styles.section}>
                    {line}
                    <br />
                  </span>
                ))}
              </h3>
              <div>
                {slide.buttons.map((btn, idx) => (
                  <Link key={idx} className={styles.button}>
                    {btn}
                  </Link>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </section>
  );
});
HeroSwiper.displayName = "HeroSwiper";

export default HeroSwiper;
