import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  fetchBrands,
  selectBrands,
  toggleBrand,
} from "../../../redux/slice/productSlice";
import styles from "./BrandSwiper.module.scss";

const BrandSwiper = () => {
  const dispatch = useDispatch();
  const brands = useSelector(selectBrands);
  const { loading, error } = useSelector((state) => state.product);

  // Fetch brands on mount
  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  // Handle brand click
  const handleBrandClick = (brandName) => {
    dispatch(toggleBrand(brandName));
  };

  return (
    <section className={styles.brandSwiper}>
      <h2 className={styles.header}>Shop by Brand</h2>
      {brands.length ? (
        <Swiper
          style={{ "--swiper-navigation-size": "25px" }}
          spaceBetween={10}
          slidesPerView={7}
          loop={brands.length >= 7}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Navigation]}
          className={styles.swiper}
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id} className={styles.brand}>
              <Link
                to="/shop"
                className={styles.brandLink}
                onClick={() => handleBrandClick(brand.brand)}
                aria-label={`Filter products by ${brand.brand}`}
              >
                <div className={styles.background}>
                  <span className={styles.brandName}>{brand.brand}</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : error ? (
        <div className={styles.error} aria-live="assertive">
          Error: {error}
        </div>
      ) : loading ? (
        <div className={styles.loader} aria-live="polite">
          Loading brands...
        </div>
      ) : (
        <div className={styles.empty} aria-live="polite">
          No brands available
        </div>
      )}
    </section>
  );
};

export default BrandSwiper;
