import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import styles from './Swiper.module.scss';
import { Navigation, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';


export default function App() {
  return (
    <>
      <div>
        <Swiper
        style={{
          "--swiper-navigation-size":"25px"
        }}
          slidesPerView={1}
          spaceBetween={-1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          cssMode={true}
          navigation={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation,  Mousewheel, Keyboard, Autoplay]}
          className={styles.swiper}

        >
          <SwiperSlide className={styles.slide1}>
            <section className={styles.section}>
            <div className={styles.container}>
              <p className={styles.main}>
                Handmade  | Hand Carved Coffee
              </p>
              <p className={styles.as}>
                As rich and unique as the coffee beans it is intended for, this little scoop will make your morning ritual a special occasion every day.

              </p>
              <p className={styles.button}>

                Discover now
              </p>

            </div>
          </section>
          </SwiperSlide>
          <SwiperSlide className={styles.slide2}>
            <section className={styles.section}>
            <div className={styles.container}>
              <p className={styles.main}>
                Think different  | Do otherwise
              </p>
              <p className={styles.as}>
                As rich and unique as the coffee beans it is intended for, this little scoop will make your morning ritual a special occasion every day.

              </p>
              <p className={styles.button}>

                Discover now
              </p>

            </div>
          </section></SwiperSlide>
        </Swiper>
       
      </div>
    </>
  );
}