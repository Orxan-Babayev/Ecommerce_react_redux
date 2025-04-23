
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './TopSeller.module.scss'
import product1 from '../../../assets/topseller1.jpg'
import product2 from '../../../assets/topseller2.jpg'
import product3 from '../../../assets/topseller3.jpg'
import product4 from '../../../assets/topseller4.jpg'
import product5 from '../../../assets/product4.jpg'
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


const TopSeller = () => {

    return ( 
        <>
          <div className={styles.items}>
               <div className={styles.header}>
                    <h3 className={styles.main}> Top Seller </h3>
                </div>

         <div className={styles.container}>
               
                
   
        <Swiper
            style={{
                "--swiper-navigation-size": "25px"
            }}
            slidesPerView={4}
            spaceBetween={10}
            loop ={true}
            navigation={true}
            modules={[Navigation]}
        >

         
            
                    <SwiperSlide  >
                        <div className={styles.item}>
                            <Link>
                                <div>
                                    <img className={styles.img} src={product1} alt="" />
                                    <div> </div>
                                </div>
                                <div className={styles.card}>
                                    <h3 className={styles.title}>High Heel Black Sandal</h3>
                                    <span className={styles.price}>$120.00</span>
                                    <ul></ul>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide  >
                        <div className={styles.item}>
                            <Link>
                                <div>
                                    <img className={styles.img} src={product2} alt="" />
                                    <div> </div>
                                </div>
                                <div className={styles.card}>
                                    <h3 className={styles.title}>Long Sleeve Top Black</h3>
                                    <span className={styles.price}>$40.00</span>
                                    <ul></ul>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide  >

                        <div className={styles.item}>
                            <Link>
                                <div>
                                    <img className={styles.img} src={product3} alt="" />
                                    <div> </div>
                                </div>
                                <div className={styles.card}>
                                    <h3 className={styles.title}>Zip-through hoodie set</h3>
                                    <span className={styles.price}>$83.00</span>
                                    <ul></ul>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide  >
                        <div className={styles.item}>
                            <Link>
                                <div>
                                    <img className={styles.img} src={product4} alt="" />
                                    <div> </div>
                                </div>
                                <div className={styles.card}>
                                    <h3 className={styles.title}>Solid Cargo Pant</h3>
                                    <span className={styles.price}>$90.00</span>
                                    <ul></ul>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide  >
                        <div className={styles.item}>
                            <Link>
                                <div>
                                    <img className={styles.img} src={product5} alt="" />
                                    <div> </div>
                                </div>
                                <div className={styles.card}>
                                    <h3 className={styles.title}>Everyday Tube Top Ribbed</h3>
                                    <span className={styles.price}>$180.00</span>
                                    <ul></ul>
                                </div>
                            </Link>
                        </div>
                    </SwiperSlide>
  

        </Swiper>
        
     </div> 
     </div> 
</>
    )
}

export default TopSeller










