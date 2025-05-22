// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import {
//   fetchBestSellers,
//   selectBestSellers,
// } from "../../../redux/slice/productSlice";
// import styles from "./BestSeller.module.scss";
// import Spinner from "../../Shop/Spinner";
// import NoData from "../../Shop/NoData";
// import Error from "../../Shop/Error";

// const BestSeller = () => {
//   const dispatch = useDispatch();
//   const bestSellers = useSelector(selectBestSellers);
//   const { loading, error } = useSelector((state) => state.product);

//   useEffect(() => {
//     dispatch(fetchBestSellers());
//   }, [dispatch]);

//   return (
//     <>
//       {loading && <Spinner primary="5rem" />}
//       {error && <Error error={error} onRetry={fetchBestSellers} />}
//       {!loading && !error && !bestSellers.length ? (
//         <NoData />
//       ) : (
//         <div className={styles.items}>
//           <div className={styles.header}>
//             <h3 className={styles.main}>Best Sellers</h3>
//           </div>
//           <div className={styles.container}>
//             <Swiper
//               style={{
//                 "--swiper-navigation-size": "25px",
//               }}
//               slidesPerView={4}
//               spaceBetween={10}
//               loop={bestSellers.length >= 4} // Loop only if enough products
//               navigation={true}
//               modules={[Navigation]}
//               className={styles.swiper}
//             >
//               {bestSellers.map((product) => (
//                 <SwiperSlide key={product.id}>
//                   <div className={styles.item}>
//                     <Link to={`/product/${product.id}`}>
//                       <div className={styles.imageWrapper}>
//                         <img
//                           className={styles.img}
//                           src={product.image}
//                           alt={product.title}
//                           loading="lazy"
//                         />
//                       </div>
//                       <div className={styles.card}>
//                         <h3 className={styles.title}>{product.title}</h3>
//                         <span className={styles.price}>
//                           ${Number(product.price).toFixed(2)}
//                         </span>
//                       </div>
//                     </Link>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default BestSeller;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import {
  fetchBestSellers,
  selectBestSellers,
} from "../../../redux/slice/productSlice";
import SectionWrapper from "../SectionWrapper";
import Product from "../../Shop/Product";
import { swiperConfig } from "../TopCategories/swiperConfig";
import styles from "./BestSeller.module.scss";

const BestSeller = () => {
  const dispatch = useDispatch();
  const bestSellers = useSelector(selectBestSellers);
  const { loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchBestSellers());
  }, [dispatch]);

  return (
    <SectionWrapper
      title="Best Sellers"
      loading={loading}
      error={error}
      onRetry={() => dispatch(fetchBestSellers())}
      data={bestSellers}
    >
      <div className={styles.container}>
        <Swiper
          {...swiperConfig}
          loop={bestSellers.length >= swiperConfig.slidesPerView}
          className={styles.swiper}
        >
          {bestSellers.map((product) => (
            <SwiperSlide key={product.id}>
              <Product product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </SectionWrapper>
  );
};

export default BestSeller;
