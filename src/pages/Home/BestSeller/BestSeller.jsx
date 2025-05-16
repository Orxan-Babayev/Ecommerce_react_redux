import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import {
  fetchBestSellers,
  selectBestSellers,
} from "../../../redux/slice/productSlice";
import styles from "./BestSeller.module.scss";

const BestSeller = () => {
  const dispatch = useDispatch();
  const bestSellers = useSelector(selectBestSellers);
  const { loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchBestSellers());
  }, [dispatch]);

  return (
    <div className={styles.items}>
      <div className={styles.header}>
        <h3 className={styles.main}>Best Sellers</h3>
      </div>
      <div className={styles.container}>
        {bestSellers.length ? (
          <Swiper
            style={{
              "--swiper-navigation-size": "25px",
            }}
            slidesPerView={4}
            spaceBetween={10}
            loop={bestSellers.length >= 4} // Loop only if enough products
            navigation={true}
            modules={[Navigation]}
            className={styles.swiper}
          >
            {bestSellers.map((product) => (
              <SwiperSlide key={product.id}>
                <div className={styles.item}>
                  <Link to={`/product/${product.id}`}>
                    <div className={styles.imageWrapper}>
                      <img
                        className={styles.img}
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                      />
                    </div>
                    <div className={styles.card}>
                      <h3 className={styles.title}>{product.title}</h3>
                      <span className={styles.price}>
                        ${Number(product.price).toFixed(2)}
                      </span>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : error ? (
          <div className={styles.error} aria-live="assertive">
            Error: {error}
          </div>
        ) : loading ? (
          <div className={styles.loader} aria-live="polite">
            Loading...
          </div>
        ) : (
          <div className={styles.empty} aria-live="polite">
            No best sellers found
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
