import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import {
  fetchBestSellers,
  selectBestSellersData,
  selectBestSellersError,
  selectBestSellersLoading,
} from "../../../redux/slice/productSlice";
import SectionWrapper from "../SectionWrapper";
import Product from "../../Shop/Product";
import { swiperConfig } from "../TopCategories/swiperConfig";
import styles from "./BestSeller.module.scss";
import { memo } from "react";

const BestSeller = memo(() => {
  const dispatch = useDispatch();

  const bestSellers = useSelector(selectBestSellersData);
  const loading = useSelector(selectBestSellersLoading);
  const error = useSelector(selectBestSellersError);

  return (
    <SectionWrapper
      title="Best Sellers"
      loading={loading}
      error={error}
      onRetry={() => dispatch(fetchBestSellers())}
      data={bestSellers}
    >
      {bestSellers.length > 0 && (
        <div className="container">
          <Swiper
            {...swiperConfig}
            slidesPerView={4}
            spaceBetween={20}
            // loop={bestSellers.length >= swiperConfig.slidesPerView}
            className={styles.swiper}
          >
            {bestSellers.map((product) => (
              <SwiperSlide key={product.id}>
                <Product product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </SectionWrapper>
  );
});

BestSeller.displayName = "BestSeller";

export default BestSeller;
