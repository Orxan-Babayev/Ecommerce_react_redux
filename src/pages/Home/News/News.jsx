import React from "react";
import { Link } from "react-router-dom";
import styles from "./News.module.scss";
import blog1 from "../../../assets/blog-img1.jpg";
import blog2 from "../../../assets/blog-img2.jpg";
import blog3 from "../../../assets/blog-img3.jpg";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const News = () => {
  return (
    <>
      <div className={styles.items}>
        <div className={styles.header}>
          <h3 className={styles.main}> News & Articles</h3>
        </div>

        <div className={styles.container}>
          <Swiper
            style={{
              "--swiper-navigation-size": "25px",
            }}
            slidesPerView={3}
            spaceBetween={30}
            loop={true}
            cssMode={true}
            mousewheel={true}
            navigation={true}
            modules={[Navigation, Mousewheel]}
          >
            <SwiperSlide>
              <div className={styles.item}>
                <Link>
                  <div>
                    <img className={styles.img} src={blog1} alt="" />
                    <div> </div>
                  </div>
                  <div className={styles.card}>
                    <h3 className={styles.title}>
                      Match outfits with other significant
                    </h3>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.item}>
                <Link>
                  <div>
                    <img className={styles.img} src={blog2} alt="" />
                    <div> </div>
                  </div>
                  <div className={styles.card}>
                    <h3 className={styles.title}>
                      Fresh work outfits for new year
                    </h3>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
            <SwiperSlide className={styles.item}>
              <div className={styles.item}>
                <Link>
                  <div>
                    <img className={styles.img} src={blog3} alt="" />
                    <div> </div>
                  </div>
                  <div className={styles.card}>
                    <h3 className={styles.title}>
                      Spotlights the new role models
                    </h3>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default News;
