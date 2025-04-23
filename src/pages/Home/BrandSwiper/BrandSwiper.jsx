import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import brand1 from '../../../assets/brand1.avif'
import brand2 from '../../../assets/brand2.avif'
import brand3 from '../../../assets/brand3.avif'
import brand4 from '../../../assets/brand4.avif'
import brand5 from '../../../assets/brand5.avif'
import brand6 from '../../../assets/brand6.avif'
import brand7 from '../../../assets/brand7.avif'
import style from './BrandSwiper.module.scss'


const brand = [
{brand: brand1},
{brand: brand2},
{brand: brand3},
{brand: brand4},
{brand: brand5},
{brand: brand6},
{brand: brand7}

]

const Brandswiper = () => {
   
    return (
        <div >
        <Swiper  style = {{"--swiper-navigation-size":"25px"}} 
        spaceBetween={10}
        slidesPerView={7}
           
        loop = {true}
        pagination={{
          clickable: true,
          loop: true

        }}

        cssMode={true}
        navigation={true}
        modules={[ Navigation]}
      
      >
            {brand.map((brand, index) => (
                <SwiperSlide key={index}   className={style.brand} >
                    <div  className={style.background}>
                        <img src={brand.brand} alt=""  className={style.brandimg}  />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        </div>
    );
};

export default Brandswiper;