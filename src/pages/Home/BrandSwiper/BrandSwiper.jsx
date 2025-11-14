import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  fetchBrands,
  selectBrands,
  selectBrandsError,
  selectBrandsLoading,
} from "../../../redux/slice/productSlice";
import { useShopNavigation } from "../useShopNavigation";
import styles from "./BrandSwiper.module.scss";
import { swiperConfig } from "../TopCategories/swiperConfig";
import SectionWrapper from "../SectionWrapper";

const BrandSwiper = memo(() => {
  const dispatch = useDispatch();

  const brands = useSelector(selectBrands);
  const loading = useSelector(selectBrandsLoading);
  const error = useSelector(selectBrandsError);
  const { goToShop } = useShopNavigation();

  console.log(brands);

  const handleBrandClick = (brand) => {
    goToShop({ brand });
  };

  return (
    <SectionWrapper
      title="Show by brand"
      loading={loading}
      error={error}
      onRetry={() => dispatch(fetchBrands())}
      data={brands}
    >
      {brands.length > 0 && (
        <div className="container ">
          <Swiper
            {...swiperConfig}
            spaceBetween={25}
            breakpoints={{
              ...swiperConfig.breakpoints,
              1024: { slidesPerView: 7 },
              768: { slidesPerView: 5 },
              576: { slidesPerView: 3 },
              0: { slidesPerView: 3 },
            }}
            loop={brands.length >= 6}
            pagination={{
              clickable: true,
            }}
          >
            {brands.map((brand) => (
              <SwiperSlide key={brand.id}>
                <div
                  role="link"
                  className={styles.brandBox}
                  onClick={() => handleBrandClick(brand.brand)}
                  aria-label={`Filter products by ${brand.brand}`}
                >
                  <p className={styles.brandName}>{brand.brand}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </SectionWrapper>
  );
});

BrandSwiper.displayName = "BrandSwiper";

export default BrandSwiper;
